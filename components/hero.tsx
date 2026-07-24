"use client";

/* =========================================================================
   Home Hero — "Set your bearing"
   Enhancements requested:
   • Coordinates now point to PARIS (N 48°51′ · E 2°21′), not Madurai.
   • The compass is integrated into a story: a subtle France silhouette
     (l'Hexagone — France's own nickname, so a refined hexagonal outline reads
     as intentional + French, and avoids a crude hand-drawn border), an animated
     "route" arc that travels from afar up to a glowing Paris waypoint, and the
     compass needle resting toward Paris/North.
   • Drop in YOUR compass logo via <Hero logoSrc="/compass-logo.svg" />.
     Without it, an inline SVG compass rose is used. Either way the France +
     route + Paris storytelling renders around it.
   ========================================================================= */

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion, animate } from "motion/react";
import { useEffect } from "react";
import { Section, Eyebrow } from "@/components/ui-primitives";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  FranceCompass — France silhouette + route to Paris + compass centerpiece  */
/* -------------------------------------------------------------------------- */

const FRANCE_D =
  "M232,74 C186,74 138,100 96,150 C78,176 92,224 128,262 C150,300 172,320 200,332 " +
  "C240,322 268,312 288,288 C306,250 314,196 310,152 C300,116 272,88 232,74 Z";
const ROUTE_D = "M372,388 C320,350 280,300 250,258 C224,222 214,196 214,162";
const PARIS = { x: 214, y: 158 };

function FranceCompass({ logoSrc }: { logoSrc?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(36,64,232,.22), transparent 62%)" }}
      />

      {/* map + route layer */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" role="img"
           aria-label="A route across France to Paris">
        <defs>
          <radialGradient id="fc-fill" cx="50%" cy="42%" r="60%">
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

        {/* France — l'Hexagone */}
        <path d={FRANCE_D} fill="url(#fc-fill)" stroke="var(--color-brass)" strokeOpacity="0.45"
              strokeWidth="1.5" strokeLinejoin="round" />
        {/* Corsica */}
        <ellipse cx="324" cy="350" rx="10" ry="16" fill="none" stroke="var(--color-brass)"
                 strokeOpacity="0.4" strokeWidth="1.5" transform="rotate(18 324 350)" />

        {/* the plotted route (brass dashed, gently flowing) */}
        <path d={ROUTE_D} fill="none" stroke="var(--color-brass)" strokeOpacity="0.20" strokeWidth="2" />
        <motion.path
          d={ROUTE_D} fill="none" stroke="var(--color-brass-soft)" strokeWidth="2"
          strokeLinecap="round" strokeDasharray="3 8"
          animate={reduce ? {} : { strokeDashoffset: [0, -22] }}
          transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
        />
        {/* traveler dot */}
        {!reduce && (
          <circle r="3.5" fill="var(--color-azimuth)">
            <animateMotion dur="5.5s" repeatCount="indefinite" path={ROUTE_D} />
          </circle>
        )}

        {/* Paris waypoint (destination = azimuth accent) */}
        <g>
          {!reduce && (
            <motion.circle
              cx={PARIS.x} cy={PARIS.y} r="8" fill="none" stroke="var(--color-azimuth)"
              strokeWidth="2"
              animate={{ r: [8, 18], opacity: [0.7, 0] }}
              transition={{ duration: 2.2, ease: "easeOut", repeat: Infinity }}
            />
          )}
          <circle cx={PARIS.x} cy={PARIS.y} r="5.5" fill="var(--color-azimuth)" />
          <circle cx={PARIS.x} cy={PARIS.y} r="9" fill="none" stroke="var(--color-foam)" strokeOpacity="0.35" strokeWidth="1" />
          <text x={PARIS.x + 14} y={PARIS.y - 8} fontFamily="var(--font-mono)" fontSize="10"
                letterSpacing="2" fill="var(--color-foam)" opacity="0.85">PARIS</text>
        </g>
      </svg>

      {/* compass centerpiece */}
      <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2">
        {logoSrc ? (
          <motion.img
            src={logoSrc} alt="French Compass"
            className="h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(36,64,232,0.25)]"
            animate={reduce ? {} : { y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          />
        ) : (
          <CompassRose />
        )}
      </div>
    </div>
  );
}

/* Inline fallback compass rose (needle rests toward Paris / North). */
function CompassRose() {
  const reduce = useReducedMotion();
  const angle = useMotionValue(-34);
  const needle = useSpring(angle, { stiffness: 55, damping: 12 });

  useEffect(() => {
    if (reduce) { angle.set(-8); return; }
    const a = animate(angle, -8, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => a.stop();
  }, [reduce, angle]);

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Compass">
      <motion.g style={{ transformOrigin: "100px 100px" }}
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 140, ease: "linear", repeat: Infinity }}>
        <circle cx="100" cy="100" r="88" fill="var(--color-ink)" stroke="var(--color-brass)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="var(--color-brass)" strokeOpacity="0.45" strokeWidth="1" />
        <g stroke="var(--color-brass)" strokeOpacity="0.55">
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i * 5 * Math.PI) / 180, major = i % 9 === 0;
            const r1 = major ? 76 : 82;
            return <line key={i} x1={100 + r1 * Math.cos(a)} y1={100 + r1 * Math.sin(a)}
                         x2={100 + 88 * Math.cos(a)} y2={100 + 88 * Math.sin(a)}
                         strokeWidth={major ? 1.4 : 0.6} />;
          })}
        </g>
      </motion.g>

      {/* rose star */}
      <g fill="var(--color-brass)">
        <polygon points="100,20 107,100 100,118 93,100" />
        <polygon points="100,180 107,100 100,82 93,100" fillOpacity="0.5" />
        <polygon points="20,100 100,93 118,100 100,107" fillOpacity="0.5" />
        <polygon points="180,100 100,93 82,100 100,107" fillOpacity="0.5" />
        <g fillOpacity="0.3">
          <polygon points="44,44 100,96 96,100" /><polygon points="156,44 104,96 100,100" />
          <polygon points="156,156 104,104 100,100" /><polygon points="44,156 96,104 100,100" />
        </g>
      </g>

      <g fill="var(--color-foam)" fontFamily="var(--font-display)" fontSize="12" textAnchor="middle">
        <text x="100" y="15">N</text><text x="100" y="193">S</text>
        <text x="191" y="105">E</text><text x="9" y="105">O</text>
      </g>

      {/* needle */}
      <motion.g style={{ rotate: needle, transformOrigin: "100px 100px" }}>
        <polygon points="100,30 106,100 100,108 94,100" fill="var(--color-azimuth)" />
        <polygon points="100,170 106,100 100,92 94,100" fill="var(--color-foam)" fillOpacity="0.8" />
        <circle cx="100" cy="100" r="5" fill="var(--color-ink)" stroke="var(--color-brass)" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Hero                                     */
/* -------------------------------------------------------------------------- */

const STATS = [
  { v: "400+", l: "learners charted" },
  { v: "95%+", l: "exam success" },
  { v: "C1", l: "certified instructors" },
  { v: "A1 → C2", l: "full journey" },
];

export function Hero({ logoSrc }: { logoSrc?: string }) {
  return (
    <Section tone="ink" bleed className="overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(1100px 600px at 78% 28%, rgba(36,64,232,.16), transparent 60%)," +
            "radial-gradient(800px 500px at 8% 90%, rgba(192,138,45,.10), transparent 60%)",
        }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden>
          <defs>
            <pattern id="hero-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M44 0H0V44" fill="none" stroke="var(--color-foam)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-[var(--container)] items-center gap-10 px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pb-24 lg:pt-[calc(var(--header-h)+4rem)]">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <Eyebrow coord="N 48°51′ · E 2°21′">Set your bearing</Eyebrow>

          <h1 className="mt-5 font-display fs-5 leading-[0.98] text-foam">
            Chart your course<br />to fluent French.
          </h1>

          <p className="mt-6 max-w-[46ch] fs-1 leading-relaxed text-foam-dim">
            Live 90-minute classes with C1-certified instructors, and a clear route from your
            first <span lang="fr" className="italic text-foam">bonjour</span> to a DELF, DALF,
            or TEF/TCF score you can rely on.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact"
                  className="rounded-xl bg-azimuth px-6 py-3.5 text-sm font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift">
              Book a class
            </Link>
            <Link href="/learning-resources/placement"
                  className="rounded-xl border border-brass/60 px-6 py-3.5 text-sm font-semibold text-foam transition-colors hover:border-brass hover:bg-brass/10">
              Take the 2-min placement quiz
            </Link>
          </div>

          <p className="eyebrow mt-8 text-foam-dim">
            400+ learners · 95% exam success · immersion in FR · LU · CH
          </p>
        </div>

        {/* visual */}
        <div className="order-1 lg:order-2">
          <FranceCompass logoSrc={logoSrc} />
        </div>
      </div>

      {/* stat strip */}
      <div className="relative border-t border-foam/10">
        <div className="mx-auto grid max-w-[var(--container)] grid-cols-2 gap-y-6 px-5 py-8 sm:px-6 md:grid-cols-4 lg:px-10">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-mono text-2xl text-brass sm:text-3xl">{s.v}</div>
              <div className="eyebrow mt-1 text-foam-dim">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
