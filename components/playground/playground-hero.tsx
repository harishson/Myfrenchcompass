"use client";

import { Zap, Flame, Trophy, ArrowDown } from "lucide-react";
import { usePlayground } from "@/lib/playground-store";
import { Eyebrow, SectionHeading } from "@/components/ui-primitives";



function HudChip({
  icon: Icon,
  value,
  label,
  ready,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  /** Persisted stats only exist after localStorage is read. */
  ready: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-foam/10 bg-ink-panel px-4 py-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-azimuth/15 text-brass-soft">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div>
        {/* Hold the slot until hydrated, otherwise a returning user watches
            their streak flash 0 → 12 on every page load. */}
        <div
          className="font-display text-xl leading-none text-foam transition-opacity duration-300"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {value}
          <span aria-hidden className="invisible">&nbsp;</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-foam-dim">{label}</div>
      </div>
    </div>
  );
}

export function PlaygroundHero() {
  const { level, levelTitle, xp, streak, hydrated } = usePlayground();
  return (
    <section className="on-ink relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(900px 500px at 82% 20%, rgba(36,64,232,.16), transparent 60%)" }} />
      <div className="mx-auto max-w-[var(--container)] items-center px-5 pb-16 pt-[calc(var(--header-h)+3.5rem)] sm:px-6 lg:px-10 lg:pb-24">
        <div>
          <Eyebrow>Le Parcours — Playground</Eyebrow>
          <SectionHeading as="h1" gradient className="mt-4 fs-4">
            Practice French,<br />the fun way.
          </SectionHeading>
          <p className="mt-5 max-w-[46ch] fs-1 leading-relaxed text-foam-dim">
            Find your level, build a daily streak, and collect badges as you go. Free, no signup —
            just you and the map.
          </p>

          {/* live HUD */}
          <div className="mt-8 flex flex-wrap gap-3">
            <HudChip icon={Trophy} value={`${level} · ${levelTitle}`} label="your rank" ready={hydrated} />
            <HudChip icon={Zap} value={`${xp} XP`} label="earned" ready={hydrated} />
            <HudChip icon={Flame} value={streak} label="day streak" ready={hydrated} />
          </div>

          <a href="#placement"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-azimuth px-6 py-3.5 text-sm font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift">
            Start with your bearing <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
