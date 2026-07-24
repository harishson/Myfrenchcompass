"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Flag, Flame, Trophy, Compass, Map, Lock, RotateCcw } from "lucide-react";
import { usePlayground, type Badge } from "@/lib/playground-store";
import { cn } from "@/lib/utils";

/**
 * Reset is destructive and irreversible — it overwrites localStorage, taking
 * the streak, XP and every badge with it. Make the user say it twice, and
 * let the armed state lapse so it can't sit primed for a stray click.
 */
function ResetButton({ onReset }: { onReset: () => void }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type="button"
      onClick={() => {
        if (armed) {
          onReset();
          setArmed(false);
        } else {
          setArmed(true);
        }
      }}
      onBlur={() => setArmed(false)}
      aria-label={
        armed
          ? "Confirm reset — this erases all progress"
          : "Reset all learning progress"
      }
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 font-mono text-[11px] uppercase tracking-wide transition-colors",
        armed
          ? "bg-red-500/15 text-red-300 hover:bg-red-500/25"
          : "text-foam-dim hover:text-foam",
      )}
    >
      <RotateCcw className="h-3 w-3" />
      {armed ? "Tap again to erase" : "Reset"}
    </button>
  );
}

const ICONS = { flag: Flag, flame: Flame, trophy: Trophy, compass: Compass, map: Map };

function LevelRing({ pct, level }: { pct: number; level: number }) {
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-foam)" strokeOpacity="0.1" strokeWidth="8" />
        <motion.circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-azimuth)" strokeWidth="8"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (c * pct) / 100 }}
          transition={{ duration: 0.9, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-brass">Level</div>
          <div className="font-display text-4xl text-foam">{level}</div>
        </div>
      </div>
    </div>
  );
}

function BadgeTile({ badge }: { badge: Badge }) {
  const Icon = ICONS[badge.icon];
  return (
    <div className={cn(
      "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all",
      badge.earned
        ? "border-brass/50 bg-[radial-gradient(circle_at_50%_30%,rgba(192,138,45,.18),transparent)] shadow-[var(--glow-brass)]"
        : "border-foam/10 bg-ink",
    )}>
      <div className={cn("relative grid h-14 w-14 place-items-center rounded-full border",
        badge.earned ? "border-brass/60 text-brass-soft" : "border-foam/15 text-foam/30")}>
        <Icon className="h-6 w-6" strokeWidth={1.75} />
        {!badge.earned && (
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-foam/15 bg-ink-panel">
            <Lock className="h-2.5 w-2.5 text-foam-dim" />
          </span>
        )}
      </div>
      <span className={cn("text-sm font-medium", badge.earned ? "text-foam" : "text-foam-dim")}>{badge.name}</span>
      <span className="text-[11px] leading-tight text-foam-dim">{badge.hint}</span>
    </div>
  );
}

export function ProgressBadges() {
  const { xp, level, levelTitle, xpIntoLevel, xpForLevel, streak, badges, reset, hydrated } =
    usePlayground();
  const pct = (xpIntoLevel / xpForLevel) * 100;
  const earned = badges.filter((b) => b.earned).length;

  return (
    // Everything in this panel is restored from localStorage. Fade the whole
    // block in once, rather than letting each badge visibly pop from locked to
    // earned a frame after mount.
    <div
      className="rounded-3xl border border-foam/10 bg-ink-panel p-8 transition-opacity duration-500"
      style={{ opacity: hydrated ? 1 : 0 }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <LevelRing pct={pct} level={level} />

        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-brass">Rank</p>
              <p className="font-display text-2xl text-foam">{levelTitle}</p>
            </div>
            <p className="font-mono text-sm text-foam-dim">{xp} XP total</p>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex justify-between font-mono text-xs text-foam-dim">
              <span>{xpIntoLevel} / {xpForLevel} XP</span>
              <span>Level {level + 1}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-foam/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-azimuth to-azimuth-lift"
                initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-foam/10 bg-ink px-3 py-3 text-center">
              <div className="font-display text-2xl text-foam">{streak}</div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-foam-dim">streak</div>
            </div>
            <div className="rounded-xl border border-foam/10 bg-ink px-3 py-3 text-center">
              <div className="font-display text-2xl text-foam">{earned}</div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-foam-dim">badges</div>
            </div>
            <div className="rounded-xl border border-foam/10 bg-ink px-3 py-3 text-center">
              <div className="font-display text-2xl text-foam">{xp}</div>
              <div className="font-mono text-[10px] uppercase tracking-wide text-foam-dim">xp</div>
            </div>
          </div>
        </div>
      </div>

      {/* badges */}
      <div className="mt-8 border-t border-foam/10 pt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl text-foam">Explorer badges</h3>
          <ResetButton onReset={reset} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {badges.map((b) => <BadgeTile key={b.id} badge={b} />)}
        </div>
      </div>
    </div>
  );
}
