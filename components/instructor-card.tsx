"use client";

/* Upgraded "Your navigators". Fixes: (1) the plain letter-in-a-circle cards,
   (2) the invisible "Meet the guides" heading (now uses SectionHeading, which
   is guaranteed legible on ink). Drop in real photos via `photo`. */

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading, Eyebrow, Lead } from "@/components/ui-primitives";
import { cn } from "@/lib/utils";

type Instructor = {
  name: string;
  monogram: string;
  role: string;          // e.g. "Founder · C1 certified"
  bio: string;
  pins?: string[];       // immersion territories, e.g. ["France","Luxembourg","Switzerland"]
  tags?: string[];       // e.g. ["TEF / TCF Canada"]
  photo?: string;        // /instructors/harish.jpg
  href?: string;
};

const INSTRUCTORS: Instructor[] = [
  {
    name: "Harish Santhanam",
    monogram: "H",
    role: "Founder · C1 certified",
    bio: "Brings real-world French from three French-speaking countries into every class.",
    pins: ["France", "Luxembourg", "Switzerland"],
    href: "/about#harish",
  },
  {
    name: "Samyukta",
    monogram: "S",
    role: "C1 certified · 10 years",
    bio: "Gets learners the exact scores they need for immigration and admissions.",
    tags: ["TEF / TCF Canada specialist"],
    href: "/about#samyukta",
  },
  {
    name: "Balaji Sankar",
    monogram: "B",
    role: "C1 certified · Based in France",
    bio: "In-country immersion and native-level fluency, straight into your sessions.",
    pins: ["France"],
    href: "/about#balaji",
  },
];

function Medallion({ person }: { person: Instructor }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto h-36 w-36">
      {/* rotating tick ring */}
      <motion.svg
        viewBox="0 0 160 160" className="absolute inset-0 h-full w-full"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }} aria-hidden
      >
        <circle cx="80" cy="80" r="76" fill="none" stroke="var(--color-brass)" strokeOpacity="0.35" strokeWidth="1" />
        <g stroke="var(--color-brass)" strokeOpacity="0.5">
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i * 7.5 * Math.PI) / 180, major = i % 12 === 0;
            return <line key={i} x1={80 + (major ? 68 : 72) * Math.cos(a)} y1={80 + (major ? 68 : 72) * Math.sin(a)}
                         x2={80 + 76 * Math.cos(a)} y2={80 + 76 * Math.sin(a)} strokeWidth={major ? 1.3 : 0.6} />;
          })}
        </g>
      </motion.svg>

      {/* portrait / monogram */}
      <div className="absolute inset-[14px] overflow-hidden rounded-full border border-brass/50 bg-[radial-gradient(circle_at_50%_35%,#1b2c40,#0d1826)]">
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes="128px" className="object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <span className="font-display text-5xl text-brass-soft">{person.monogram}</span>
          </div>
        )}
      </div>

      {/* C1 seal */}
      <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-brass/50 bg-ink px-2.5 py-1">
        <BadgeCheck className="h-3.5 w-3.5 text-brass-soft" strokeWidth={2} />
        <span className="font-mono text-[10px] tracking-wider text-foam">C1</span>
      </div>
    </div>
  );
}

function InstructorCard({ person }: { person: Instructor }) {
  return (
    <Link
      href={person.href ?? "/about"}
      className={cn(
        "group relative flex flex-col items-center rounded-2xl border border-foam/10 bg-ink-panel p-8 text-center",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/40 hover:bg-ink-panel2",
        "focus-visible:-translate-y-1.5",
      )}
    >
      <span className="absolute right-4 top-4 text-foam-dim opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <Medallion person={person} />

      <h3 className="mt-8 font-display text-2xl text-foam">{person.name}</h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-brass">{person.role}</p>

      <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-foam-dim">{person.bio}</p>

      {/* immersion pins / tags */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {person.pins?.map((p) => (
          <span key={p} className="flex items-center gap-1 rounded-full border border-foam/15 px-2.5 py-1 text-xs text-foam/80">
            <MapPin className="h-3 w-3 text-brass-soft" strokeWidth={2} /> {p}
          </span>
        ))}
        {person.tags?.map((t) => (
          <span key={t} className="rounded-full bg-azimuth/15 px-2.5 py-1 text-xs font-medium text-foam">{t}</span>
        ))}
      </div>
    </Link>
  );
}

export function NavigatorsSection() {
  return (
    <Section tone="ink">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">Your navigators</Eyebrow>
        <SectionHeading center gradient className="mt-3 fs-3">
          Meet the guides
        </SectionHeading>
        <Lead center className="mt-4">Three C1 instructors. One mission: your fluency.</Lead>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {INSTRUCTORS.map((p) => (
          <InstructorCard key={p.name} person={p} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-foam/20 px-6 py-3 text-sm font-medium text-foam transition-colors hover:border-brass/60 hover:text-brass-soft">
          Read their stories <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
