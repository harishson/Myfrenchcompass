"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Compass, Check, X, ArrowRight, RotateCcw, MessageCircle, Sparkles } from "lucide-react";
import { usePlayground } from "@/lib/playground-store";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/contact";

type Q = { prompt: string; note?: string; options: string[]; correct: number; points: number };

const QUESTIONS: Q[] = [
  { prompt: "Complete: « Je ___ étudiant. »", options: ["suis", "es", "est", "sont"], correct: 0, points: 1 },
  { prompt: "« Bonjour » is used to say…", options: ["Hello", "Goodbye", "Thank you", "Please"], correct: 0, points: 1 },
  { prompt: "Passé composé: « Hier, j'___ au marché. »", options: ["vais", "suis allé", "irai", "allais"], correct: 1, points: 2 },
  { prompt: "« Il fait froid » means…", options: ["It is cold", "I am cold", "He is cold", "It is hot"], correct: 0, points: 2 },
  { prompt: "Complete: « Si j'avais le temps, je ___ voyager. »", options: ["vais", "voyagerais", "voyage", "ai voyagé"], correct: 1, points: 3 },
  { prompt: "Choose the pronoun: « Ce livre, je ___ ai lu. »", options: ["l'", "lui", "y", "en"], correct: 0, points: 3 },
  { prompt: "Subjonctif: « Il faut que tu ___ prêt. »", options: ["es", "sois", "seras", "étais"], correct: 1, points: 4 },
  { prompt: "« Bien que » is followed by the…", options: ["indicatif", "subjonctif", "conditionnel", "infinitif"], correct: 1, points: 4 },
];
const MAX = QUESTIONS.reduce((s, q) => s + q.points, 0); // 20

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type Level = (typeof LEVELS)[number];

function bandFor(points: number): Level {
  const p = points / MAX;
  if (p < 0.25) return "A1";
  if (p < 0.45) return "A2";
  if (p < 0.7) return "B1";
  if (p < 0.9) return "B2";
  return "C1";
}

const REC: Record<Level, { course: string; label: string; blurb: string; href: string }> = {
  A1: { course: "A1", label: "A1 Intensive Course", blurb: "Start from zero — alphabet, greetings, and everyday basics.", href: "/courses#core" },
  A2: { course: "A2", label: "A2 Intensive Course", blurb: "Build on the basics: past & future tense, daily situations.", href: "/courses#core" },
  B1: { course: "B1", label: "B1 Intensive Course", blurb: "Express opinions, narrate, and handle the unexpected.", href: "/courses#core" },
  B2: { course: "B2", label: "B2 Intensive Course", blurb: "Debate, nuance, academic & professional French — around CLB 7.", href: "/courses#core" },
  C1: { course: "DALF C1", label: "DALF C1 Masterclass", blurb: "Push toward near-native mastery and certification.", href: "/courses#masterclass" },
  C2: { course: "DALF C2", label: "DALF C2 Masterclass", blurb: "Reach the highest level of certified proficiency.", href: "/courses#masterclass" },
};
const WAYPOINT_LABEL: Record<Level, string> = {
  A1: "Departure", A2: "Coastal waters", B1: "Open sea", B2: "Deep water", C1: "High latitudes", C2: "True north",
};

function MiniRoute({ level }: { level: Level }) {
  const activeIdx = LEVELS.indexOf(level);
  return (
    <svg viewBox="0 0 520 90" className="w-full" role="img" aria-label={`Your level: ${level}`}>
      <line x1="30" y1="52" x2="490" y2="52" stroke="var(--color-brass)" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="2 7" />
      <motion.line x1="30" y1="52" x2={30 + (activeIdx / (LEVELS.length - 1)) * 460} y2="52"
        stroke="var(--color-brass-soft)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
      {LEVELS.map((lv, i) => {
        const x = 30 + (i / (LEVELS.length - 1)) * 460;
        const on = i <= activeIdx, isActive = i === activeIdx;
        return (
          <g key={lv} opacity={on ? 1 : 0.35}>
            {isActive && (
              <motion.circle cx={x} cy="52" r="10" fill="none" stroke="var(--color-azimuth)" strokeWidth="2"
                animate={{ r: [10, 20], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
            )}
            <circle cx={x} cy="52" r={isActive ? 7 : 5} fill={isActive ? "var(--color-azimuth)" : "var(--color-ink)"}
              stroke="var(--color-brass)" strokeWidth="2.5" />
            <text x={x} y="30" textAnchor="middle" fontFamily="var(--font-display)" fontSize="17"
              fill={isActive ? "var(--color-foam)" : "var(--color-foam-dim)"}>{lv}</text>
            {isActive && (
              <text x={x} y="78" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8"
                letterSpacing="1.5" fill="var(--color-foam-dim)">{WAYPOINT_LABEL[lv].toUpperCase()}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function PlacementQuiz() {
  const reduce = useReducedMotion();
  const { completeQuiz } = usePlayground();
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const scored = useRef(false);

  const q = QUESTIONS[i];
  const level = bandFor(points);

  const start = () => { setPhase("quiz"); setI(0); setPicked(null); setPoints(0); scored.current = false; };

  const choose = useCallback((idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) setPoints((p) => p + q.points);
  }, [picked, q]);

  const next = useCallback(() => {
    if (picked === null) return;
    if (i + 1 < QUESTIONS.length) { setI((v) => v + 1); setPicked(null); }
    else setPhase("result");
  }, [picked, i]);

  // score once on entering result
  useEffect(() => {
    if (phase === "result" && !scored.current) { scored.current = true; completeQuiz(level); }
  }, [phase, level, completeQuiz]);

  // keyboard: 1–4 to pick, Enter/→ to advance
  useEffect(() => {
    if (phase !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      if (picked === null && ["1", "2", "3", "4"].includes(e.key)) {
        const idx = Number(e.key) - 1; if (idx < q.options.length) choose(idx);
      } else if (picked !== null && (e.key === "Enter" || e.key === "ArrowRight")) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, picked, q, choose, next]);

  const waMsg = whatsappLink(
    `My placement result is ${level} (${WAYPOINT_LABEL[level]}). Which class should I join?`,
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-foam/10 bg-ink-panel">
      {/* top hairline accent */}
      <div className="h-1 w-full bg-gradient-to-r from-brass/0 via-brass/60 to-brass/0" />

      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {/* ---------------------------------- INTRO --------------------------------- */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} className="mx-auto max-w-xl text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brass/40 text-brass">
                <Compass className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-3xl text-foam sm:text-4xl">Find your bearing</h3>
              <p className="mt-3 text-foam-dim">
                Eight quick questions — about two minutes. Get your estimated French level and the
                course that fits. No signup.
              </p>
              <p className="eyebrow mt-4 text-brass">No signup · instant result · +20 XP</p>
              <button onClick={start}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-azimuth px-8 py-4 text-sm font-semibold text-foam shadow-[var(--glow-azimuth)] transition-colors hover:bg-azimuth-lift">
                Start the quiz <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ---------------------------------- QUIZ ---------------------------------- */}
          {phase === "quiz" && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* progress */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-foam-dim">
                  Question {i + 1} / {QUESTIONS.length}
                </span>
                <span className="font-mono text-xs text-brass">SET YOUR BEARING</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {QUESTIONS.map((_, idx) => (
                  <div key={idx} className={cn("h-1 flex-1 rounded-full transition-colors",
                    idx < i ? "bg-brass" : idx === i ? "bg-brass/60" : "bg-foam/10")} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={i}
                  initial={reduce ? {} : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? {} : { opacity: 0, x: -24 }} transition={{ duration: 0.28 }}
                  className="mt-8">
                  <h4 className="font-display text-2xl leading-snug text-foam sm:text-3xl">{q.prompt}</h4>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {q.options.map((opt, idx) => {
                      const isPicked = picked === idx;
                      const isCorrect = idx === q.correct;
                      const state =
                        picked === null ? "idle"
                          : isCorrect ? "correct"
                          : isPicked ? "wrong" : "muted";
                      return (
                        <button key={opt} onClick={() => choose(idx)} disabled={picked !== null}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all",
                            state === "idle" && "border-foam/15 bg-ink hover:border-brass/50 hover:bg-ink-panel2",
                            state === "correct" && "border-verdigris/60 bg-verdigris/15",
                            state === "wrong" && "border-red-400/50 bg-red-500/10",
                            state === "muted" && "border-foam/10 opacity-50",
                          )}>
                          <span className={cn(
                            "grid h-7 w-7 shrink-0 place-items-center rounded-md font-mono text-xs",
                            state === "idle" && "bg-foam/10 text-foam-dim group-hover:bg-brass/20 group-hover:text-brass-soft",
                            state === "correct" && "bg-verdigris/30 text-foam",
                            state === "wrong" && "bg-red-500/30 text-foam",
                            state === "muted" && "bg-foam/10 text-foam-dim",
                          )}>
                            {state === "correct" ? <Check className="h-4 w-4" /> :
                             state === "wrong" ? <X className="h-4 w-4" /> : idx + 1}
                          </span>
                          <span className="text-foam">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-foam-dim">
                      {picked === null ? "Tap an answer — or press 1–4" :
                       picked === q.correct ? "Correct." : "Not quite."}
                    </span>
                    <button onClick={next} disabled={picked === null}
                      className={cn("inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all",
                        picked === null ? "cursor-not-allowed bg-foam/10 text-foam-dim"
                          : "bg-azimuth text-foam hover:bg-azimuth-lift")}>
                      {i + 1 < QUESTIONS.length ? "Next" : "See result"} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* --------------------------------- RESULT --------------------------------- */}
          {phase === "result" && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} className="text-center">
              <p className="eyebrow text-brass">Your estimated level</p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="font-display text-6xl text-foam sm:text-7xl">{level}</span>
                <span className="rounded-full bg-azimuth/15 px-3 py-1 font-mono text-xs text-foam">
                  {WAYPOINT_LABEL[level]}
                </span>
              </div>

              <div className="mx-auto mt-8 max-w-lg">
                <MiniRoute level={level} />
              </div>

              {/* recommendation */}
              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-foam/10 bg-ink p-6 text-left">
                <div className="flex items-center gap-2 text-brass">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-mono text-xs uppercase tracking-widest">Recommended for you</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <h4 className="font-display text-2xl text-foam">{REC[level].label}</h4>
                  <span className="font-mono text-lg text-brass">{REC[level].course}</span>
                </div>
                <p className="mt-2 text-sm text-foam-dim">{REC[level].blurb}</p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link href={REC[level].href}
                    className="flex-1 rounded-lg bg-azimuth px-4 py-3 text-center text-sm font-semibold text-foam transition-colors hover:bg-azimuth-lift">
                    Book this class
                  </Link>
                  <a href={waMsg} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-foam/20 px-4 py-3 text-sm font-medium text-foam transition-colors hover:border-brass/60">
                    <MessageCircle className="h-4 w-4" /> Share on WhatsApp
                  </a>
                </div>
              </div>

              <button onClick={() => setPhase("intro")}
                className="mt-6 inline-flex items-center gap-2 text-sm text-foam-dim transition-colors hover:text-foam">
                <RotateCcw className="h-4 w-4" /> Retake the quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
