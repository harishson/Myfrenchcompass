/* =========================================================================
   Shared navigation config — single source of truth for the header, the
   mobile drawer, and the footer, so the brief's canonical order stays
   identical in all three places:

     Home → Courses → Upcoming Batches → Learning Resources → About →
     Testimonials → Contact
   ========================================================================= */

export type NavLink = { label: string; href: string }

/** Top-level order, applied identically to header / mobile / footer. */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Upcoming Batches', href: '/upcoming-batches' },
  { label: 'Learning Resources', href: '/learning-resources' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

/** The four columns of the Courses mega-menu. */
export type MegaColumn = { title: string; links: NavLink[] }

export const COURSES_MEGA: MegaColumn[] = [
  {
    title: 'Core Levels',
    links: [
      { label: 'A1 — Absolute Beginner', href: '/courses/a1' },
      { label: 'A2 — Elementary', href: '/courses/a2' },
      { label: 'B1 — Intermediate', href: '/courses/b1' },
      { label: 'B2 — Upper Intermediate', href: '/courses/b2' },
      { label: 'C1 — DALF Masterclass', href: '/courses/c1' },
      { label: 'C2 — DALF Masterclass', href: '/courses/c2' },
    ],
  },
  {
    title: 'Combination Tracks',
    links: [
      { label: 'A1 + A2 Track', href: '/courses/a1-a2-track' },
      { label: 'A2 + B1 Track', href: '/courses/a2-b1-track' },
      { label: 'A2 + B1 + B2 Master Track', href: '/courses/a2-b1-b2-track' },
      { label: 'B1 + B2 Track', href: '/courses/b1-b2-track' },
      { label: 'B2 + TEF Combo', href: '/courses/b2-tef-combo' },
    ],
  },
  {
    title: 'Exam Preparation',
    links: [
      { label: 'TEF Preparation', href: '/courses/tef-preparation' },
      { label: 'TCF Speaking & Writing', href: '/courses/tcf-speaking-writing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'French Conversation Workshop', href: '/courses/conversation-workshop' },
      { label: 'A1 Vocabulary Book', href: '/courses/ebook-a1-vocabulary' },
      { label: 'A2 Vocabulary Book', href: '/courses/ebook-a2-vocabulary' },
      { label: 'B1 Vocabulary Book', href: '/courses/ebook-b1-vocabulary' },
      { label: 'B2 Vocabulary Book', href: '/courses/ebook-b2-vocabulary' },
    ],
  },
]
