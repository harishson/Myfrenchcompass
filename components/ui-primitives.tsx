"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Surface context — the structural fix for "invisible heading" and
 * "gray card" bugs. Children read the surface and pick correct colors
 * instead of relying on inherited --foreground (which was failing).
 * ------------------------------------------------------------------ */
type Surface = "ink" | "parchment";
const SurfaceContext = createContext<Surface>("parchment");
export const useSurface = () => useContext(SurfaceContext);

/* ---------------------------------- Container --------------------------------- */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[var(--container)] px-5 sm:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

/* ----------------------------------- Section ---------------------------------- *
 * ONE source of vertical rhythm. Never also set section padding on element
 * selectors (e.g. .cta) — that causes the specificity clashes that break spacing.
 * ------------------------------------------------------------------------------ */
export function Section({
  tone = "parchment",
  className,
  containerClassName,
  bleed = false,
  id,
  children,
}: {
  tone?: Surface;
  className?: string;
  containerClassName?: string;
  bleed?: boolean; // set true for full-bleed hero visuals
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <SurfaceContext.Provider value={tone}>
      <section
        id={id}
        className={cn(
          "relative w-full",
          !bleed && "py-[clamp(4rem,8vw,8rem)]",
          tone === "ink" && "on-ink",
          className,
        )}
      >
        {bleed ? children : <Container className={containerClassName}>{children}</Container>}
      </section>
    </SurfaceContext.Provider>
  );
}

/* ----------------------------------- Eyebrow ---------------------------------- */
export function Eyebrow({
  children,
  coord,
  className,
}: {
  children: React.ReactNode;
  coord?: string; // e.g. "N 48°51′ · E 2°21′"
  className?: string;
}) {
  return (
    <p className={cn("eyebrow text-brass", className)}>
      {coord && (
        <>
          <span className="text-brass">{coord}</span>
          <span className="mx-2 text-brass/50">—</span>
        </>
      )}
      {children}
    </p>
  );
}

/* -------------------------------- SectionHeading ------------------------------ *
 * Guaranteed-legible display heading. Foam on ink, ink-text on parchment.
 * Optional subtle *light* gradient (foam → brass-soft) that never goes dark.
 * ------------------------------------------------------------------------------ */
export function SectionHeading({
  as: Tag = "h2",
  gradient = false,
  center = false,
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  gradient?: boolean;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const surface = useSurface();
  return (
    <Tag
      className={cn(
        "font-display fs-3 leading-[1.05]",
        center && "text-center",
        surface === "ink" ? "text-foam" : "text-ink-text",
        // gradient stays in the LIGHT range on both surfaces so it can't disappear
        gradient &&
          "bg-gradient-to-br bg-clip-text text-transparent " +
            (surface === "ink"
              ? "from-foam via-foam to-brass-soft"
              : "from-ink-text via-ink-text to-brass"),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Lead({ center, className, children }: { center?: boolean; className?: string; children: React.ReactNode }) {
  const surface = useSurface();
  return (
    <p
      className={cn(
        "fs-1 max-w-[52ch] leading-relaxed",
        center && "mx-auto text-center",
        surface === "ink" ? "text-foam-dim" : "text-ink-dim",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ------------------------------------- Card ----------------------------------- *
 * SOLID surface-aware card. This is the fix for the washed-out gray panels:
 * no translucent/glass fill over parchment. Warm solid on light, panel on ink.
 * ------------------------------------------------------------------------------ */
export function Card({
  className,
  interactive = false,
  children,
}: {
  className?: string;
  interactive?: boolean;
  children: React.ReactNode;
}) {
  const surface = useSurface();
  return (
    <div
      className={cn(
        "rounded-[14px] border",
        surface === "ink"
          ? "border-foam/10 bg-ink-panel text-foam"
          : "border-ink-text/10 bg-card text-ink-text shadow-[var(--shadow-card)]",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 focus-within:-translate-y-1 " +
            (surface === "ink"
              ? "hover:border-brass/40 hover:bg-ink-panel2"
              : "hover:border-brass/40 hover:shadow-[var(--shadow-lift)]"),
        className,
      )}
    >
      {children}
    </div>
  );
}

/* --------------------------------- HeaderSpacer ------------------------------- *
 * Put at the very top of any page WITHOUT a full-bleed dark hero so content
 * isn't hidden under the fixed navbar. (Home uses hero padding instead.)
 * ------------------------------------------------------------------------------ */
export function HeaderSpacer() {
  return <div aria-hidden className="h-[var(--header-h)]" />;
}
