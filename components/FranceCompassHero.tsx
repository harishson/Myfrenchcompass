'use client'

/* =========================================================================
   FranceCompassHero — the compass reimagined as a living map of France.

   Layers (back to front), each parallaxing at its own rate so the scene
   reads as depth rather than as a flat illustration that wobbles:

     0. Ambient azimuth glow + atmospheric dust
     1. A stylised coastline of l'Hexagone + Corsica, with a faint
        lat/long grid — the compass's map, not just its backdrop.
     2. A plotted "expedition" route arriving from afar, passing near
        Lyon and Marseille waypoints, resting at a glowing Paris marker
        with a minimal line-art Eiffel Tower beside it.
     3. The compass rose itself: rotating brass instrument rings, an
        engraved rim inscription, a domed glass specular, and — where true
        north is traditionally marked on a nautical compass rose — a
        fleur-de-lis, doing double duty as a French emblem. The needle
        settles toward Paris on load, then drifts gently with the pointer.
     4. Drifting French words and accented letters, as if surfacing from
        the map. Foreground layer, so they move most.

   Parallax deltas are deliberately small (max ~14px) per the house motion
   rules; the goal is depth you feel rather than movement you notice.

   Fully static (no rotation / route / needle / drift motion) under
   prefers-reduced-motion, per the site's global motion policy.
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

const FRANCE_D =
  'M195,68 C230,66 258,78 268,92 C283,102 288,122 283,142 ' +
  'C300,158 306,182 296,206 C308,224 300,246 278,258 ' +
  'C284,272 268,280 250,270 C246,288 226,304 202,310 ' +
  'C182,315 166,304 176,288 C158,298 138,293 132,273 ' +
  'C118,265 104,249 100,227 C82,215 66,193 64,169 ' +
  'C62,147 78,131 96,125 C92,109 104,93 122,87 ' +
  'C118,73 138,65 158,67 C170,61 184,65 195,68 Z'

const ROUTE_D =
  'M378,392 C330,352 292,306 262,266 C232,228 216,196 205,152 C200,140 198,134 198,130'

const CITIES = {
  paris: { x: 198, y: 130 },
  lyon: { x: 232, y: 196 },
  marseille: { x: 258, y: 244 },
}

/* --- Foreground drift ------------------------------------------------------
   Positions are hand-placed to sit in the negative space around the compass
   and clear of the Paris/Lyon labels. `sm` items are hidden on narrow screens
   where the scene is too small to carry them. Values are static (never
   Math.random) so server and client markup agree.
   -------------------------------------------------------------------------- */
const FLOATING_WORDS: {
  text: string
  top: string
  left: string
  delay: number
  size: string
  smOnly?: boolean
}[] = [
  { text: 'Bonjour', top: '8%', left: '6%', delay: 0, size: 'text-[13px]' },
  { text: 'Merci', top: '20%', left: '78%', delay: 1.6, size: 'text-[12px]' },
  { text: 'Salut', top: '68%', left: '4%', delay: 3.1, size: 'text-[12px]' },
  { text: 'Oui', top: '86%', left: '30%', delay: 2.2, size: 'text-[11px]', smOnly: true },
  { text: 'Où', top: '40%', left: '90%', delay: 4.4, size: 'text-[11px]', smOnly: true },
  { text: 'Pourquoi', top: '90%', left: '58%', delay: 5.2, size: 'text-[12px]', smOnly: true },
  { text: 'Non', top: '54%', left: '86%', delay: 6.1, size: 'text-[11px]', smOnly: true },
  { text: 'Au revoir', top: '3%', left: '52%', delay: 7.0, size: 'text-[12px]', smOnly: true },
]

const ACCENT_LETTERS = [
  { char: 'É', top: '30%', left: '2%', delay: 0.8 },
  { char: 'Ç', top: '76%', left: '82%', delay: 2.9 },
  { char: 'Ô', top: '12%', left: '88%', delay: 4.9 },
  { char: 'Œ', top: '60%', left: '14%', delay: 6.6 },
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

function EiffelTower({ x, y }: { x: number; y: number }) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      stroke="var(--color-brass)"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.85"
    >
      <path d="M0,0 L-6,26 M0,0 L6,26 M-4,17 L4,17 M-2.4,9 L2.4,9 M0,-5 L0,0 M-1,-5 L1,-5" />
    </g>
  )
}

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
          <stop offset="0%" stopColor="#E8C68A" />
          <stop offset="38%" stopColor="var(--color-brass)" />
          <stop offset="62%" stopColor="#8A611C" />
          <stop offset="100%" stopColor="var(--color-brass-soft)" />
        </linearGradient>

        {/* Dished face — darker at the rim, so the plate reads as concave. */}
        <radialGradient id="fch-dish" cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#16283C" />
          <stop offset="70%" stopColor="var(--color-ink)" />
          <stop offset="100%" stopColor="#050B12" />
        </radialGradient>

        {/* The glass dome's specular sweep. */}
        <linearGradient id="fch-glass" x1="0.1" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <path id="fch-rim" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
      </defs>

      {/* dished plate under everything */}
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
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="url(#fch-glass)"
        className="pointer-events-none"
      />
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

  // One transform pair per depth. Background barely moves; foreground moves
  // most. Declared at the top level so hook order is always stable.
  const mapX = useTransform(sx, [-0.5, 0.5], [6, -6])
  const mapY = useTransform(sy, [-0.5, 0.5], [6, -6])
  const roseX = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const roseY = useTransform(sy, [-0.5, 0.5], [-9, 9])
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
        className="absolute inset-[18%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(192,138,45,.13), transparent 66%)' }}
      />

      {/* ---- 1 + 2. the map, route and waypoints -------------------------- */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { x: mapX, y: mapY }}
        role="img"
        aria-label="An illustrated map of France charting a route to Paris, via Lyon and Marseille"
      >
        <defs>
          <radialGradient id="fch-fill" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="var(--color-brass)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-brass)" stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* faint lat/long grid inside the frame */}
        <g stroke="var(--color-foam)" strokeOpacity="0.05">
          {[80, 140, 200, 260, 320].map((v) => (
            <g key={v}>
              <line x1={v} y1="30" x2={v} y2="370" />
              <line x1="30" y1={v} x2="370" y2={v} />
            </g>
          ))}
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

        {/* France — l'Hexagone */}
        <path d={FRANCE_D} fill="url(#fch-fill)" stroke="var(--color-brass)" strokeOpacity="0.45" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Corsica */}
        <ellipse cx="320" cy="352" rx="10" ry="16" fill="none" stroke="var(--color-brass)" strokeOpacity="0.4" strokeWidth="1.5" transform="rotate(18 320 352)" />

        {/* the plotted route (brass dashed, gently flowing) */}
        <path d={ROUTE_D} fill="none" stroke="var(--color-brass)" strokeOpacity="0.20" strokeWidth="2" />
        <motion.path
          d={ROUTE_D}
          fill="none"
          stroke="var(--color-brass-soft)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 8"
          animate={reduce ? {} : { strokeDashoffset: [0, -22] }}
          transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
        />
        {!reduce && (
          <circle r="3.5" fill="var(--color-azimuth)">
            <animateMotion dur="5.5s" repeatCount="indefinite" path={ROUTE_D} />
          </circle>
        )}

        {/* secondary waypoints — Lyon, Marseille */}
        <line x1={CITIES.lyon.x} y1={CITIES.lyon.y} x2={CITIES.paris.x} y2={CITIES.paris.y} stroke="var(--color-brass)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="1 4" />
        <line x1={CITIES.marseille.x} y1={CITIES.marseille.y} x2={CITIES.lyon.x} y2={CITIES.lyon.y} stroke="var(--color-brass)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="1 4" />
        <circle cx={CITIES.lyon.x} cy={CITIES.lyon.y} r="3" fill="var(--color-brass)" fillOpacity="0.8" />
        <circle cx={CITIES.lyon.x} cy={CITIES.lyon.y} r="6" fill="none" stroke="var(--color-brass)" strokeOpacity="0.3" strokeWidth="1" />
        <text x={CITIES.lyon.x + 8} y={CITIES.lyon.y + 3} fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" fill="var(--color-foam-dim)" opacity="0.7">LYON</text>
        <circle cx={CITIES.marseille.x} cy={CITIES.marseille.y} r="3" fill="var(--color-brass)" fillOpacity="0.8" />
        <circle cx={CITIES.marseille.x} cy={CITIES.marseille.y} r="6" fill="none" stroke="var(--color-brass)" strokeOpacity="0.3" strokeWidth="1" />
        <text x={CITIES.marseille.x + 8} y={CITIES.marseille.y + 3} fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.5" fill="var(--color-foam-dim)" opacity="0.7">MARSEILLE</text>

        <EiffelTower x={CITIES.paris.x + 30} y={CITIES.paris.y + 6} />

        {/* Paris waypoint (destination = azimuth accent) */}
        <g>
          {!reduce && (
            <motion.circle
              cx={CITIES.paris.x}
              cy={CITIES.paris.y}
              r="8"
              fill="none"
              stroke="var(--color-azimuth)"
              strokeWidth="2"
              animate={{ r: [8, 18], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, ease: 'easeOut', repeat: Infinity }}
            />
          )}
          <circle cx={CITIES.paris.x} cy={CITIES.paris.y} r="5.5" fill="var(--color-azimuth)" />
          <circle cx={CITIES.paris.x} cy={CITIES.paris.y} r="9" fill="none" stroke="var(--color-foam)" strokeOpacity="0.35" strokeWidth="1" />
          <text x={CITIES.paris.x - 14} y={CITIES.paris.y - 12} fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="var(--color-foam)" opacity="0.9" textAnchor="end">
            PARIS
          </text>
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
          Decorative only: the scene already has an accessible label on the
          map SVG, so this whole layer is hidden from assistive tech rather
          than read out as loose words.
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
                'absolute font-display italic tracking-wide text-brass-soft/45',
                w.size,
                w.smOnly ? 'hidden sm:block' : '',
              ].join(' ')}
              style={{ top: w.top, left: w.left }}
              animate={{ opacity: [0, 0.85, 0.85, 0], y: [8, -6, -10, -20] }}
              transition={{
                duration: 11,
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
              className="absolute hidden font-display text-[22px] text-brass/25 sm:block"
              style={{ top: l.top, left: l.left }}
              animate={{ opacity: [0, 0.7, 0], y: [6, -10, -18], rotate: [-4, 3, -2] }}
              transition={{
                duration: 13,
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
