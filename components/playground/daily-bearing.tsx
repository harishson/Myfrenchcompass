"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Flame, Check, ArrowRight, Sparkles } from "lucide-react";
import { usePlayground } from "@/lib/playground-store";
import { cn } from "@/lib/utils";

const POOL: { prompt: string; options: string[]; correct: number }[] = [
  { prompt: "« Merci » means…", options: ["Please", "Thank you", "Sorry", "Hello"], correct: 1 },
  { prompt: "Complete: « Nous ___ français. »", options: ["parle", "parlons", "parlez", "parlent"], correct: 1 },
  { prompt: "The feminine of « acteur » is…", options: ["acteuse", "actrice", "acteure", "actice"], correct: 1 },
  { prompt: "« Demain » means…", options: ["Yesterday", "Today", "Tomorrow", "Now"], correct: 2 },
  { prompt: "Choose the article: « ___ eau »", options: ["le", "la", "l'", "les"], correct: 2 },
];

export function DailyBearing() {
  const reduce = useReducedMotion();
  const { streak, doneToday, completeDaily } = usePlayground();
  const [phase, setPhase] = useState<"idle" | "playing" | "won">("idle");
  const [picked, setPicked] = useState<number | null>(null);
  const [showXp, setShowXp] = useState(false);

  const q = useMemo(() => POOL[Math.floor(Math.random() * POOL.length)], []);
  const flameScale = Math.min(1 + streak * 0.05, 1.8);

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) {
      setTimeout(() => {
        completeDaily();
        setShowXp(true);
        setPhase("won");
        setTimeout(() => setShowXp(false), 1600);
      }, 500);
    } else {
      setTimeout(() => setPicked(null), 700); // let them retry
    }
  };

  const done = doneToday || phase === "won";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-foam/10 bg-ink-panel p-8">
      {/* ambient ring */}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(192,138,45,.35), transparent 65%)" }} />

      <div className="relative flex flex-col items-center text-center">
        <h3 className="font-display text-2xl text-foam">Daily Bearing</h3>

        {/* flame + streak */}
        <div className="relative mt-6 flex items-center gap-3">
          <motion.div
            animate={reduce ? {} : { scale: [flameScale, flameScale * 1.08, flameScale], rotate: [-2, 2, -2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 1 }}>
            <Flame className={cn("h-10 w-10", streak > 0 ? "text-brass-soft" : "text-foam/30")}
              fill={streak > 0 ? "currentColor" : "none"} strokeWidth={1.5} />
          </motion.div>
          <span className="font-display text-6xl text-foam">{streak}</span>

          <AnimatePresence>
            {showXp && (
              <motion.span
                initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -28 }} exit={{ opacity: 0 }}
                className="absolute -right-10 top-0 font-mono text-sm font-bold text-brass">
                +10 XP
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-foam-dim">
          {streak === 1 ? "day on course" : "days on course"}
        </p>

        {/* week dots */}
        <div className="mt-5 flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={cn("h-2 w-2 rounded-full",
              i < Math.min(streak, 7) ? "bg-brass" : "bg-foam/12")} />
          ))}
        </div>

        <div className="mt-6 w-full max-w-sm">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-verdigris/40 bg-verdigris/10 px-5 py-5">
                <Check className="h-6 w-6 text-verdigris" />
                <p className="text-sm text-foam">Logged for today. Come back tomorrow to grow your flame.</p>
              </motion.div>
            ) : phase === "idle" ? (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm text-foam-dim">One micro-challenge keeps your streak alive.</p>
                <button onClick={() => setPhase("playing")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-azimuth px-6 py-3.5 text-sm font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift">
                  Start today's challenge <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-2 flex items-center justify-center gap-1 font-mono text-[11px] text-brass">
                  <Sparkles className="h-3 w-3" /> +10 XP
                </p>
              </motion.div>
            ) : (
              <motion.div key="playing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="font-display text-xl text-foam">{q.prompt}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => {
                    const isPicked = picked === idx, isCorrect = idx === q.correct;
                    return (
                      <button key={opt} onClick={() => choose(idx)} disabled={picked !== null}
                        className={cn("rounded-lg border px-3 py-3 text-sm text-foam transition-all",
                          picked === null && "border-foam/15 bg-ink hover:border-brass/50",
                          isPicked && isCorrect && "border-verdigris/60 bg-verdigris/15",
                          isPicked && !isCorrect && "border-red-400/50 bg-red-500/10")}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
