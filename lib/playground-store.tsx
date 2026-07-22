"use client";

/* Shared, persistent progress for the Playground. localStorage is fine here —
   this is a real Next.js app on Vercel, not a sandboxed preview artifact.
   Wrap the /playground page tree in <PlaygroundProvider>. */

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const KEY = "fc-playground-v1";
const XP_PER_LEVEL = 100;

type Persisted = {
  xp: number;
  streak: number;
  lastPlayed: string | null; // YYYY-MM-DD
  dailyEverDone: boolean;
  quizLevel: string | null;
  knownCards: string[];
};

const initial: Persisted = {
  xp: 0, streak: 0, lastPlayed: null, dailyEverDone: false, quizLevel: null, knownCards: [],
};

const LEVEL_TITLES = ["Explorer", "Navigator", "Voyager", "Pathfinder", "Cartographer", "Captain"];

const todayStr = () => new Date().toISOString().slice(0, 10);
const yesterdayStr = () => {
  const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10);
};

export type Badge = {
  id: string; name: string; hint: string; earned: boolean; icon: "flag" | "flame" | "trophy" | "compass" | "map";
};

type Ctx = {
  hydrated: boolean;
  xp: number;
  level: number;
  levelTitle: string;
  xpIntoLevel: number;
  xpForLevel: number;
  streak: number;
  doneToday: boolean;
  quizLevel: string | null;
  knownCards: string[];
  badges: Badge[];
  addXp: (n: number) => void;
  completeDaily: () => void;
  completeQuiz: (level: string) => void;
  markCardKnown: (id: string) => void;
  reset: () => void;
};

const PlaygroundContext = createContext<Ctx | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
    }
  }, [state, hydrated]);

  const addXp = useCallback((n: number) => setState((s) => ({ ...s, xp: s.xp + n })), []);

  const completeDaily = useCallback(() => {
    setState((s) => {
      const today = todayStr();
      if (s.lastPlayed === today) return s; // already done today
      const streak = s.lastPlayed === yesterdayStr() ? s.streak + 1 : 1;
      return { ...s, streak, lastPlayed: today, dailyEverDone: true, xp: s.xp + 10 };
    });
  }, []);

  const completeQuiz = useCallback((level: string) => {
    setState((s) => ({ ...s, quizLevel: level, xp: s.quizLevel ? s.xp : s.xp + 20 }));
  }, []);

  const markCardKnown = useCallback((id: string) => {
    setState((s) => (s.knownCards.includes(id) ? s : { ...s, knownCards: [...s.knownCards, id], xp: s.xp + 5 }));
  }, []);

  const reset = useCallback(() => setState(initial), []);

  const value = useMemo<Ctx>(() => {
    const level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
    const doneToday = state.lastPlayed === todayStr();
    const badges: Badge[] = [
      { id: "first-step", name: "First Step", hint: "Complete your first Daily Bearing", icon: "flag", earned: state.dailyEverDone },
      { id: "week-warrior", name: "Week Warrior", hint: "Reach a 7-day streak", icon: "flame", earned: state.streak >= 7 },
      { id: "month-master", name: "Month Master", hint: "Reach a 30-day streak", icon: "trophy", earned: state.streak >= 30 },
      { id: "quiz-taker", name: "Bearing Found", hint: "Complete the placement quiz", icon: "compass", earned: !!state.quizLevel },
      { id: "trailblazer", name: "Trailblazer", hint: "Learn 8 vocabulary cards", icon: "map", earned: state.knownCards.length >= 8 },
    ];
    return {
      hydrated,
      xp: state.xp,
      level,
      levelTitle: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
      xpIntoLevel: state.xp % XP_PER_LEVEL,
      xpForLevel: XP_PER_LEVEL,
      streak: state.streak,
      doneToday,
      quizLevel: state.quizLevel,
      knownCards: state.knownCards,
      badges,
      addXp, completeDaily, completeQuiz, markCardKnown, reset,
    };
  }, [state, hydrated, addXp, completeDaily, completeQuiz, markCardKnown, reset]);

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within <PlaygroundProvider>");
  return ctx;
}
