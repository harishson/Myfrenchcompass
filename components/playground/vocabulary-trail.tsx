"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Check, Coffee, RotateCw } from "lucide-react";
import { usePlayground } from "@/lib/playground-store";
import { cn } from "@/lib/utils";

type Card = { id: string; fr: string; en: string; ipa: string };

const DECK: Card[] = [
  { id: "cafe-1", fr: "un café", en: "a coffee", ipa: "œ̃ ka.fe" },
  { id: "cafe-2", fr: "l'addition", en: "the bill", ipa: "la.di.sjɔ̃" },
  { id: "cafe-3", fr: "une terrasse", en: "a terrace", ipa: "yn tɛ.ʁas" },
  { id: "cafe-4", fr: "commander", en: "to order", ipa: "kɔ.mɑ̃.de" },
  { id: "cafe-5", fr: "un croissant", en: "a croissant", ipa: "œ̃ kʁwa.sɑ̃" },
  { id: "cafe-6", fr: "l'eau plate", en: "still water", ipa: "lo plat" },
  { id: "cafe-7", fr: "sur place", en: "for here", ipa: "syʁ plas" },
  { id: "cafe-8", fr: "à emporter", en: "to take away", ipa: "a ɑ̃.pɔʁ.te" },
];

export function VocabularyTrail() {
  const reduce = useReducedMotion();
  const { knownCards, markCardKnown } = usePlayground();
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = DECK[i];
  const known = knownCards.includes(card.id);
  const knownCount = DECK.filter((c) => knownCards.includes(c.id)).length;

  const go = (dir: 1 | -1) => { setFlipped(false); setI((v) => (v + dir + DECK.length) % DECK.length); };

  return (
    <div className="rounded-3xl border border-foam/10 bg-ink-panel p-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-brass/40 text-brass">
            <Coffee className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-display text-xl text-foam">Café Trail</h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-foam-dim">Vocabulary deck</p>
          </div>
        </div>
        <span className="font-mono text-sm text-brass">{knownCount}/{DECK.length}</span>
      </div>

      {/* progress */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-foam/10">
        <motion.div className="h-full rounded-full bg-brass"
          initial={false} animate={{ width: `${(knownCount / DECK.length) * 100}%` }} transition={{ duration: 0.5 }} />
      </div>

      {/* flip card */}
      <div className="mt-8 [perspective:1200px]">
        <motion.button
          onClick={() => setFlipped((f) => !f)}
          className="relative block h-52 w-full rounded-2xl text-left [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: "easeInOut" }}
          aria-label="Flip card">
          {/* front (FR) */}
          <span className="absolute inset-0 grid place-items-center rounded-2xl border border-brass/30 bg-[radial-gradient(circle_at_50%_30%,#0055A4,#003A72)] [backface-visibility:hidden]">
            <span className="text-center">
              <span className="block font-display text-4xl text-foam" lang="fr">{card.fr}</span>
              <span className="mt-2 block font-mono text-sm text-foam-dim">/{card.ipa}/</span>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-brass">
                <RotateCw className="h-3 w-3" /> tap to reveal
              </span>
            </span>
          </span>
          {/* back (EN) */}
          <span className="absolute inset-0 grid place-items-center rounded-2xl border border-azimuth/40 bg-[radial-gradient(circle_at_50%_30%,#003A72,#002E5C)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-center">
              <span className="block font-display text-4xl text-foam">{card.en}</span>
              <span className="mt-2 block text-sm text-foam-dim" lang="fr">{card.fr}</span>
            </span>
          </span>
        </motion.button>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => go(-1)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-foam/15 text-foam transition-colors hover:border-brass/50">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button onClick={() => markCardKnown(card.id)} disabled={known}
          className={cn("inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all",
            known ? "cursor-default border border-verdigris/50 bg-verdigris/15 text-foam"
              : "bg-azimuth text-foam hover:bg-azimuth-lift")}>
          <Check className="h-4 w-4" /> {known ? "Learned" : "Mark as known (+5 XP)"}
        </button>

        <button onClick={() => go(1)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-foam/15 text-foam transition-colors hover:border-brass/50">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-foam-dim">
        Card {i + 1} of {DECK.length} · finish the deck to unlock the next region
      </p>
    </div>
  );
}
