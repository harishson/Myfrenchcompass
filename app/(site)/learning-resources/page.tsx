import type { Metadata } from "next";
import { Map, Headphones, Timer } from "lucide-react";
import { PlaygroundProvider } from "@/lib/playground-store";
import { Section, Eyebrow, SectionHeading, Lead } from "@/components/ui-primitives";
import { PlaygroundHero } from "@/components/playground/playground-hero";
import { PlacementQuiz } from "@/components/playground/placement-quiz";
import { DailyBearing } from "@/components/playground/daily-bearing";
import { VocabularyTrail } from "@/components/playground/vocabulary-trail";
import { ProgressBadges } from "@/components/playground/progress-badges";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Learning Resources — French Compass",
  description: "Find your French level, build a daily streak, and learn vocabulary — free, no signup.",
};

const SOON = [
  { icon: Map, title: "Vocabulary Trails", body: "More themed decks — travel, interviews, DELF topics. Unlock regions as you finish." },
  { icon: Timer, title: "Conjugation Compass", body: "Timed verb and gender drills. Track your personal best and climb the ladder." },
  { icon: Headphones, title: "Dictée & Listening", body: "Hear French, type what you understand. Level-graded practice for exam prep." },
];

export default function LearningResourcesPage() {
  return (
    <PlaygroundProvider>
      <PlaygroundHero />

      {/* Placement quiz */}
      <Section tone="ink" id="placement" className="pt-0">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Step 1 — orientation</Eyebrow>
          <SectionHeading center gradient className="mt-3">Find your bearing</SectionHeading>
          <Lead center className="mt-4">Two minutes to your estimated level and the class that fits.</Lead>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <PlacementQuiz />
        </div>
      </Section>

      {/* Daily + Vocabulary */}
      <Section tone="ink" className="pt-0">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Step 2 — build the habit</Eyebrow>
          <SectionHeading center gradient className="mt-3">Keep your streak alive</SectionHeading>
          <Lead center className="mt-4">A little every day beats a lot once in a while.</Lead>
        </div>
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          <DailyBearing />
          <VocabularyTrail />
        </div>
      </Section>

      {/* Progress */}
      <Section tone="ink" className="pt-0">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Your progress</Eyebrow>
          <SectionHeading center gradient className="mt-3">Chart how far you've come</SectionHeading>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <ProgressBadges />
        </div>
      </Section>

      {/* Coming soon (lucide icons, not emoji) */}
      <Section tone="ink" className="pt-0 pb-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading center className="fs-2">More trails coming soon</SectionHeading>
          <Lead center className="mt-3">Phase 2 adds even more ways to master French.</Lead>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SOON.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-foam/10 bg-ink-panel p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-brass/40 text-brass">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-xl text-foam">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foam-dim">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Every other route ends on the footer — Learning Resources was the one
          page that dead-ended with no navigation or contact details. */}
      <Footer />
    </PlaygroundProvider>
  );
}
