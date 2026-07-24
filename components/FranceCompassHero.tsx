'use client'

/* =========================================================================
   FranceCompassHero — the compass as the instrument, ringed by a quiet
   constellation of French motifs.

   Layers (back to front), each parallaxing at its own rate so the scene
   reads as depth rather than as a flat illustration that wobbles:

     0. Ambient azimuth/brass glow + atmospheric dust
     1. Engraved concentric guide rings and tick marks — the vintage
        instrument plate the motifs are set into
     2. A ring of minimalist French line-art (Eiffel Tower, Arc de Triomphe,
        Notre-Dame, lavender, croissant, baguette, grapes, street lamp,
        café, balloon), each breathing on its own slow cycle
     3. The compass rose: rotating brass instrument rings, an engraved rim
        inscription, a domed glass specular, and a fleur-de-lis at true
        north doing double duty as a French emblem. The needle settles
        toward Paris on load, then drifts with the pointer.
     4. Drifting French words and accented letters in the corners

   Design constraint: the compass is the focal point. Everything in layer 2
   sits at 18–42% opacity on a ring well clear of the rose, so it reads as
   atmosphere at a glance and rewards a second look. Parallax deltas stay
   under ~14px per the house motion rules.

   Fully static under prefers-reduced-motion.
   ========================================================================= */

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from 'motion/react'
import { springs } from '@/lib/animations'
import {
  EiffelTower,
  ArcDeTriomphe,
  NotreDame,
  HotAirBalloon,
  LavenderSprig,
  Croissant,
  Baguette,
  WineGrapes,
  WineGlass,
  Bicycle,
  StreetLamp,
  CafeCup,
  FleurOutline,
} from '@/components/hero/FrenchIcons'

/* --- l'Hexagone ------------------------------------------------------------
   A large, very faint France sits behind the whole scene as the chart the
   compass is laid on. Drawn in a 0–100 box and scaled at render.

   The previous attempt at this used a loose bézier blob that read as a cloud
   rather than a country; this traces the actual silhouette — the Brittany
   peninsula west, the Cotentin nub, the Alpine bulge east, the flat Pyrenean
   base — because at any opacity a wrong shape still reads as wrong.
   -------------------------------------------------------------------------- */
const HEXAGONE_D =
  'M47,3 C53,4 57,6 61,9 C66,12 71,16 76,20 C79,25 79,31 79,37 ' +
  'C82,39 85,42 85,46 C84,51 80,54 77,58 C80,62 83,66 83,70 ' +
  'C78,72 72,73 67,74 C61,76 57,77 54,79 C51,81 49,83 47,85 ' +
  'C41,85 34,83 27,80 C23,76 21,71 21,66 C17,61 14,56 11,52 ' +
  'C7,49 3,47 2,45 C5,42 8,41 11,40 C17,36 23,33 27,30 ' +
  'C25,27 23,24 23,21 C27,20 31,20 34,21 C37,17 40,14 42,11 ' +
  'C43,8 45,5 47,3 Z'

/* --- The constellation -----------------------------------------------------
   Placed on a ring around the rose (centre 200,200). Radius is varied per
   motif so the arrangement reads as a hand-drawn constellation rather than a
   clock face. `scale` compensates for how much visual weight each silhouette
   carries — the Tower is tall and thin, the balloon is round and heavy.
   -------------------------------------------------------------------------- */
type Motif = {
  key: string
  Icon: () => React.JSX.Element
  /** degrees clockwise from top */
  angle: number
  radius: number
  scale: number
  /** seconds, offsets the breathing cycle */
  delay: number
  /** hidden on the smallest screens, where the ring gets tight */
  dense?: boolean
}

/* Thirteen motifs at even ~27.7° intervals, so the ring reads as a complete
   constellation rather than a few survivors clustered on one side. Radius and
   scale vary per motif: the Tower is the anchor and sits largest at true
   north, directly above the rose's own fleur-de-lis. At r≈165 the arc between
   neighbours is ~80px against a ~36px glyph, so nothing can collide. */
const MOTIFS: Motif[] = [
  { key: 'eiffel', Icon: EiffelTower, angle: 0, radius: 168, scale: 1.3, delay: 0 },
  { key: 'balloon', Icon: HotAirBalloon, angle: 28, radius: 177, scale: 0.95, delay: 2.9, dense: true },
  { key: 'arc', Icon: ArcDeTriomphe, angle: 56, radius: 162, scale: 1.1, delay: 1.4 },
  { key: 'wineglass', Icon: WineGlass, angle: 84, radius: 174, scale: 0.9, delay: 5.6, dense: true },
  { key: 'grapes', Icon: WineGrapes, angle: 111, radius: 160, scale: 0.85, delay: 4.1, dense: true },
  { key: 'cafe', Icon: CafeCup, angle: 139, radius: 172, scale: 0.9, delay: 5.3 },
  { key: 'croissant', Icon: Croissant, angle: 166, radius: 163, scale: 0.95, delay: 1.9 },
  { key: 'bicycle', Icon: Bicycle, angle: 194, radius: 173, scale: 1.0, delay: 7.1, dense: true },
  { key: 'baguette', Icon: Baguette, angle: 222, radius: 164, scale: 0.95, delay: 3.4, dense: true },
  { key: 'notredame', Icon: NotreDame, angle: 250, radius: 175, scale: 1.15, delay: 0.7 },
  { key: 'lavender', Icon: LavenderSprig, angle: 277, radius: 161, scale: 0.95, delay: 4.8 },
  { key: 'lamp', Icon: StreetLamp, angle: 305, radius: 174, scale: 0.9, delay: 6.2, dense: true },
  { key: 'fleur', Icon: FleurOutline, angle: 333, radius: 163, scale: 0.85, delay: 3.9 },
]

/** Polar → cartesian, angle measured clockwise from twelve o'clock. */
function place(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: 200 + radius * Math.cos(rad),
    y: 200 + radius * Math.sin(rad),
  }
}

/* Star nodes sit at each motif, and hairlines chain them together — this is
   what turns a scatter of icons into something that reads as a chart. Chords
   are drawn between *neighbours only*, so the web never crosses the compass. */
const NODES = MOTIFS.map((m) => place(m.angle, m.radius))

/* --- Foreground drift ------------------------------------------------------
   Words live in the corners, which the motif ring leaves empty. Values are
   static (never Math.random) so server and client markup agree.
   -------------------------------------------------------------------------- */
const FLOATING_WORDS: {
  text: string
  top: string
  left: string
  delay: number
  size: string
  smOnly?: boolean
}[] = [
  // Set on the diagonals, inset from the accented letters that hold the
  // corners, so the two typographic layers never collide.
  { text: 'Bonjour', top: '15%', left: '5%', delay: 0, size: 'text-[13px]' },
  { text: 'Merci', top: '21%', left: '79%', delay: 2.4, size: 'text-[12px]' },
  { text: 'Salut', top: '78%', left: '4%', delay: 4.6, size: 'text-[12px]' },
  { text: 'Pourquoi', top: '83%', left: '70%', delay: 6.4, size: 'text-[12px]', smOnly: true },
]

/* The four corners the motif ring can never reach — accented letters claim
   them, so the composition reads square-to-corner instead of a circle adrift
   in a box. */
const ACCENT_LETTERS = [
  { char: 'É', top: '2%', left: '3%', delay: 1.1 },
  { char: 'À', top: '4%', left: '91%', delay: 3.6 },
  { char: 'Ç', top: '87%', left: '92%', delay: 5.9 },
  { char: 'Ô', top: '88%', left: '3%', delay: 7.7 },
]

/** Fixed dust field — deterministic so SSR and hydration match. */
const PARTICLES = [
  { cx: 62, cy: 96, r: 1.4, dur: 9, delay: 0 },
  { cx: 148, cy: 44, r: 1.0, dur: 11, delay: 1.2 },
  { cx: 286, cy: 78, r: 1.3, dur: 10, delay: 2.4 },
  { cx: 342, cy: 168, r: 0.9, dur: 12, delay: 0.6 },
  { cx: 40, cy: 222, r: 1.2, dur: 10.5, delay: 3.1 },
  { cx: 118, cy: 336, r: 1.1, dur: 9.5, delay: 1.8 },
  { cx: 268, cy: 330, r: 1.4, dur: 11.5, delay: 4.0 },
  { cx: 356, cy: 274, r: 1.0, dur: 10, delay: 2.0 },
  { cx: 204, cy: 22, r: 0.9, dur: 12.5, delay: 5.2 },
  { cx: 84, cy: 160, r: 1.0, dur: 11, delay: 3.7 },
]

function FleurDeLis() {
  return (
    <g fill="var(--color-brass)">
      <path d="M0,-16 C-4,-11 -4,-4 0,0 C4,-4 4,-11 0,-16 Z" />
      <path d="M0,-2 C-7,-4 -10,-10 -8,-15 C-12,-11 -13,-3 -6,2 C-4,3.5 -2,3.5 0,2 Z" />
      <path d="M0,-2 C7,-4 10,-10 8,-15 C12,-11 13,-3 6,2 C4,3.5 2,3.5 0,2 Z" />
      <rect x="-1.6" y="1.5" width="3.2" height="6" rx="1" />
      <path d="M-5,6.5 C-2,4.5 2,4.5 5,6.5 C2,9 -2,9 -5,6.5 Z" />
    </g>
  )
}

function CompassRoseCore({ reduce }: { reduce: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const angle = useMotionValue(-34)
  const needle = useSpring(angle, springs.needle)

  useEffect(() => {
    if (reduce) {
      angle.set(-8)
      return
    }
    const settle = animate(angle, -8, { duration: 1.2, ease: [0.16, 1, 0.3, 1] })
    return () => settle.stop()
  }, [reduce, angle])

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const deg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90
      angle.set(deg)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, angle])

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className="h-full w-full select-none"
      role="img"
      aria-label="Compass rose, needle resting toward Paris"
      style={{ filter: 'drop-shadow(0 18px 44px rgba(8, 16, 25, 0.55))' }}
    >
      <defs>
        <linearGradient id="fch-rose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brass-soft)" />
          <stop offset="100%" stopColor="var(--color-brass)" />
        </linearGradient>

        {/* Bezelled brass rim: light catches the upper-left, falls off lower-right. */}
        <linearGradient id="fch-bezel" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#FF7A70" />
          <stop offset="38%" stopColor="var(--color-brass)" />
          <stop offset="62%" stopColor="#B71C10" />
          <stop offset="100%" stopColor="var(--color-brass-soft)" />
        </linearGradient>

        {/* Dished face — darker at the rim, so the plate reads as concave. */}
        <radialGradient id="fch-dish" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#0055A4" />
          <stop offset="70%" stopColor="var(--color-ink)" />
          <stop offset="100%" stopColor="#002E5C" />
        </radialGradient>

        {/* The glass dome's specular sweep. */}
        <linearGradient id="fch-glass" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <path id="fch-rim" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
      </defs>

      <circle cx="100" cy="100" r="92" fill="url(#fch-dish)" />

      {/* rotating instrument ring */}
      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 140, ease: 'linear', repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="88" fill="none" stroke="url(#fch-bezel)" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="var(--color-brass)" strokeOpacity="0.45" strokeWidth="1" />
        <g stroke="var(--color-brass)" strokeOpacity="0.55">
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * 5 * Math.PI) / 180
            const major = i % 9 === 0
            const r1 = major ? 76 : 82
            const round = (n: number) => Math.round(n * 1000) / 1000
            return (
              <line
                key={i}
                x1={round(100 + r1 * Math.cos(a))}
                y1={round(100 + r1 * Math.sin(a))}
                x2={round(100 + 88 * Math.cos(a))}
                y2={round(100 + 88 * Math.sin(a))}
                strokeWidth={major ? 1.4 : 0.6}
              />
            )
          })}
        </g>
      </motion.g>

      {/* engraved rim inscription */}
      <text fill="var(--color-brass-soft)" fillOpacity="0.55" fontFamily="var(--font-mono)" fontSize="6.2" letterSpacing="3">
        <textPath href="#fch-rim" xlinkHref="#fch-rim" startOffset="2%">
          FRANCE · SET YOUR BEARING · A1 → C2 ·
        </textPath>
      </text>

      {/* rose star */}
      <g fill="url(#fch-rose)">
        <polygon points="100,24 107,100 100,116 93,100" />
        <polygon points="100,176 107,100 100,84 93,100" fillOpacity="0.5" />
        <polygon points="24,100 100,93 116,100 100,107" fillOpacity="0.5" />
        <polygon points="176,100 100,93 84,100 100,107" fillOpacity="0.5" />
        <g fillOpacity="0.3">
          <polygon points="46,46 100,96 96,100" />
          <polygon points="154,46 104,96 100,100" />
          <polygon points="154,154 104,104 100,100" />
          <polygon points="46,154 96,104 100,100" />
        </g>
      </g>

      {/* fleur-de-lis at true north — the traditional compass-rose mark */}
      <g transform="translate(100,33) scale(0.9)">
        <FleurDeLis />
      </g>

      <g fill="var(--color-foam)" fontFamily="var(--font-display)" fontSize="12" textAnchor="middle">
        <text x="100" y="193">S</text>
        <text x="191" y="105">E</text>
        <text x="9" y="105">O</text>
      </g>

      {/* needle */}
      <motion.g style={{ rotate: needle, transformOrigin: '100px 100px' }}>
        <polygon points="100,30 106,100 100,108 94,100" fill="var(--color-azimuth)" />
        <polygon points="100,170 106,100 100,92 94,100" fill="var(--color-foam)" fillOpacity="0.8" />
        <circle cx="100" cy="100" r="5" fill="var(--color-ink)" stroke="var(--color-brass)" strokeWidth="1.5" />
      </motion.g>

      {/* glass dome — drawn last so it sits over the instrument, never under */}
      <circle cx="100" cy="100" r="88" fill="url(#fch-glass)" className="pointer-events-none" />
    </svg>
  )
}

export function FranceCompassHero() {
  const reduce = useReducedMotion()
  const scene = useRef<HTMLDivElement>(null)

  // Normalised pointer position across the scene, -0.5 → 0.5.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, springs.pointer)
  const sy = useSpring(py, springs.pointer)

  // One transform pair per depth. Plate barely moves; motifs move more than
  // the rose so the ring feels nearer the viewer than the instrument.
  const plateX = useTransform(sx, [-0.5, 0.5], [5, -5])
  const plateY = useTransform(sy, [-0.5, 0.5], [5, -5])
  const motifX = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const motifY = useTransform(sy, [-0.5, 0.5], [-12, 12])
  const roseX = useTransform(sx, [-0.5, 0.5], [-7, 7])
  const roseY = useTransform(sy, [-0.5, 0.5], [-7, 7])
  const wordX = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const wordY = useTransform(sy, [-0.5, 0.5], [-14, 14])

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const el = scene.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const resetMove = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={scene}
      onPointerMove={handleMove}
      onPointerLeave={resetMove}
      onPointerCancel={resetMove}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      {/* ---- 0. atmosphere ------------------------------------------------ */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(36,64,232,.20), transparent 62%)' }}
      />
      <div
        aria-hidden
        className="absolute inset-[16%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(192,138,45,.14), transparent 66%)' }}
      />

      {/* ---- 1. engraved instrument plate --------------------------------- */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { x: plateX, y: plateY }}
        aria-hidden
      >
        {/* l'Hexagone — the chart the instrument is laid on. Scaled to 296px
            and centred, so it reaches past the rose and frames it rather than
            hiding underneath. Kept at 9% so it never competes. */}
        <g transform="translate(52, 52) scale(2.96)">
          <path
            d={HEXAGONE_D}
            fill="var(--color-brass)"
            fillOpacity="0.028"
            stroke="var(--color-brass)"
            strokeOpacity="0.13"
            strokeWidth="0.42"
            strokeLinejoin="round"
          />
        </g>

        <g fill="none" stroke="var(--color-brass)">
          <circle cx="200" cy="200" r="190" strokeOpacity="0.07" />
          <circle cx="200" cy="200" r="132" strokeOpacity="0.06" strokeDasharray="1 7" />
        </g>

        {/* graduation ticks on the outer ring — instrument, not decoration */}
        <g stroke="var(--color-brass)" strokeOpacity="0.16">
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i * 6 * Math.PI) / 180
            const major = i % 5 === 0
            const r1 = major ? 179 : 183
            const round = (n: number) => Math.round(n * 100) / 100
            return (
              <line
                key={i}
                x1={round(200 + r1 * Math.cos(a))}
                y1={round(200 + r1 * Math.sin(a))}
                x2={round(200 + 190 * Math.cos(a))}
                y2={round(200 + 190 * Math.sin(a))}
                strokeWidth={major ? 1.2 : 0.5}
              />
            )
          })}
        </g>

        {/* atmospheric dust — slow vertical drift, barely there */}
        {!reduce && (
          <g fill="var(--color-brass-soft)">
            {PARTICLES.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                animate={{ y: [0, -18, 0], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </g>
        )}
      </motion.svg>

      {/* ---- 2. the French constellation ---------------------------------- */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { x: motifX, y: motifY }}
        aria-hidden
      >
        {/* constellation web — chords between adjacent nodes */}
        <g stroke="var(--color-brass)" strokeOpacity="0.13" strokeWidth="0.7">
          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length]
            return (
              <line key={i} x1={n.x.toFixed(2)} y1={n.y.toFixed(2)} x2={next.x.toFixed(2)} y2={next.y.toFixed(2)} />
            )
          })}
        </g>

        {/* star nodes */}
        <g fill="var(--color-brass-soft)">
          {NODES.map((n, i) => (
            <motion.circle
              key={i}
              cx={n.x.toFixed(2)}
              cy={n.y.toFixed(2)}
              r="1.5"
              initial={reduce ? { opacity: 0.4 } : { opacity: 0.2 }}
              animate={reduce ? { opacity: 0.4 } : { opacity: [0.2, 0.65, 0.2] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }
              }
            />
          ))}
        </g>

        <g
          fill="none"
          stroke="var(--color-brass-soft)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {MOTIFS.map(({ key, Icon, angle, radius, scale, delay, dense }) => {
            const { x, y } = place(angle, radius)
            return (
              // IMPORTANT: placement lives on this static <g>, and the animated
              // <motion.g> is nested *inside* it. Motion writes a CSS transform,
              // which wholly overrides an SVG `transform` attribute on the same
              // element — putting both on one node silently collapsed every
              // motif onto the local origin and stacked them in a corner.
              <g
                key={key}
                className={dense ? 'hidden sm:block' : undefined}
                transform={`translate(${x.toFixed(2)}, ${y.toFixed(2)}) scale(${scale}) translate(-20, -20)`}
              >
                <motion.g
                  initial={reduce ? { opacity: 0.42 } : { opacity: 0 }}
                  animate={
                    reduce
                      ? { opacity: 0.42 }
                      : { opacity: [0.26, 0.58, 0.26], y: [0, -3, 0] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : { duration: 9, delay, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  <Icon />
                </motion.g>
              </g>
            )
          })}
        </g>
      </motion.svg>

      {/* ---- 3. compass centerpiece --------------------------------------- */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2"
        style={reduce ? undefined : { x: roseX, y: roseY }}
      >
        <CompassRoseCore reduce={!!reduce} />
      </motion.div>

      {/* ---- 4. drifting French ------------------------------------------
          Decorative only: the compass carries the accessible label, so this
          layer is hidden rather than read out as loose words.
          ------------------------------------------------------------------ */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ x: wordX, y: wordY }}
        >
          {FLOATING_WORDS.map((w) => (
            <motion.span
              key={w.text}
              className={[
                'absolute font-display italic tracking-wide text-brass-soft/40',
                w.size,
                w.smOnly ? 'hidden sm:block' : '',
              ].join(' ')}
              style={{ top: w.top, left: w.left }}
              animate={{ opacity: [0, 0.8, 0.8, 0], y: [8, -6, -10, -20] }}
              transition={{
                duration: 12,
                delay: w.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.22, 0.7, 1],
              }}
            >
              {w.text}
            </motion.span>
          ))}

          {ACCENT_LETTERS.map((l) => (
            <motion.span
              key={l.char}
              className="absolute font-display text-[26px] text-brass/30 sm:text-[32px]"
              style={{ top: l.top, left: l.left }}
              animate={{ opacity: [0, 0.75, 0], y: [6, -10, -18], rotate: [-4, 3, -2] }}
              transition={{
                duration: 14,
                delay: l.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {l.char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  )
}
