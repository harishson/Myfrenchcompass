/* =========================================================================
   Canonical level-page content — the six core CEFR levels, A1 → C2.
   Each level is authored to be genuinely DISTINCT (brief §4): a learner
   deciding between, say, B1 and B2 should be able to tell from the page which
   one they need — not just see the code swapped in a template.

   Facts (price/duration/sessions) align with lib/courses.ts; the value props,
   outcomes, syllabus and FAQs are written per level.
   ========================================================================= */

export type LevelLink = { label: string; href: string }

export type LevelData = {
  code: string
  slug: string
  name: string
  cefr: string
  promise: string
  who: string
  priceINR: number
  duration: string
  sessions: number
  classSize: string
  schedule: string
  outcomes: string[]
  syllabus: string[]
  comboTracks: LevelLink[]
  ebook?: LevelLink
  prev?: LevelLink
  next?: LevelLink
  faqs: { q: string; a: string }[]
}

export const PARIS_COORD = 'N 48°51′ · E 2°21′'

export const levels: LevelData[] = [
  {
    code: 'A1',
    slug: 'a1',
    name: 'Absolute Beginner',
    cefr: 'CEFR A1 · Breakthrough',
    promise: 'Your first bearing. From zero to your first real French conversations.',
    who: 'For complete beginners who have never studied French — or need to rebuild from the ground up.',
    priceINR: 8500,
    duration: '8 weeks',
    sessions: 12,
    classSize: '4–6 students',
    schedule: 'Tue & Thu · 7:00–8:30 PM IST',
    outcomes: [
      'Introduce yourself to a French colleague without freezing.',
      'Read a French menu and order confidently.',
      'Ask and answer simple questions about home, family and daily routine.',
      'Handle numbers, dates, prices and the clock in French.',
    ],
    syllabus: [
      'The French sound system & pronunciation foundations',
      'Greetings, introductions and politeness registers (tu / vous)',
      'Present tense of regular verbs and key irregulars (être, avoir, aller)',
      'Articles, gender and basic noun–adjective agreement',
      'Numbers, dates, time, prices; the immediate future (futur proche)',
      'Everyday scenarios: café, shopping, directions, small talk',
    ],
    comboTracks: [{ label: 'A1 + A2 Track — save 20%', href: '/courses/a1-a2-track' }],
    ebook: { label: 'A1 Vocabulary Book — 500 essential words', href: '/courses/ebook-a1-vocabulary' },
    next: { label: 'A2 — Elementary', href: '/courses/a2' },
    faqs: [
      { q: 'I have never studied French. Is this the right start?', a: 'Yes. A1 assumes zero prior knowledge — we begin with sounds and greetings and build from there. No preparation needed.' },
      { q: 'Do I need any materials?', a: 'Everything is provided digitally. The optional A1 Vocabulary Book is a helpful companion but not required.' },
      { q: 'What can I do after A1?', a: 'You move on to A2, or save with the A1 + A2 Track. A1 alone gets you survival French for travel and first encounters.' },
    ],
  },
  {
    code: 'A2',
    slug: 'a2',
    name: 'Elementary',
    cefr: 'CEFR A2 · Waystage',
    promise: 'Stop translating in your head. Handle everyday life in French with growing ease.',
    who: 'For learners who finished A1 (or know the basics) and want to move from memorising to communicating.',
    priceINR: 8500,
    duration: '8 weeks',
    sessions: 12,
    classSize: '4–6 students',
    schedule: 'Mon & Wed · 7:00–8:30 PM IST',
    outcomes: [
      'Handle a hotel check-in, ask for directions and understand the reply.',
      'Text a French-speaking friend about your day — in the past tense.',
      'Describe your background, work and plans in a few connected sentences.',
      'Get through everyday transactions without switching to English.',
    ],
    syllabus: [
      'The passé composé and imparfait — talking about the past',
      'Compound structures and connectors for longer sentences',
      'Everyday scenarios: travel, dining, appointments, shopping',
      'Reflexive verbs and daily-routine language',
      'Comparatives, quantities and expressing preferences',
      'Listening comprehension at natural elementary pace',
    ],
    comboTracks: [
      { label: 'A1 + A2 Track — save 20%', href: '/courses/a1-a2-track' },
      { label: 'A2 + B1 Track — save 15%', href: '/courses/a2-b1-track' },
      { label: 'A2 + B1 + B2 Master Track — save 17%', href: '/courses/a2-b1-b2-track' },
    ],
    ebook: { label: 'A2 Vocabulary Book — 750 practical words', href: '/courses/ebook-a2-vocabulary' },
    prev: { label: 'A1 — Absolute Beginner', href: '/courses/a1' },
    next: { label: 'B1 — Intermediate', href: '/courses/b1' },
    faqs: [
      { q: 'How is A2 different from A1?', a: 'A1 is survival phrases; A2 is where you start stringing ideas together and talking about the past and future — the jump from words to real communication.' },
      { q: 'Is A2 enough for travel to France?', a: 'A2 covers most tourist and everyday situations comfortably. For work or immigration you will want B1–B2.' },
      { q: 'Should I take the combined track?', a: 'If you already have a target date, the A2 + B1 Track keeps momentum and saves 15% versus taking them separately.' },
    ],
  },
  {
    code: 'B1',
    slug: 'b1',
    name: 'Intermediate',
    cefr: 'CEFR B1 · Threshold',
    promise: 'Become independent. Cope with most real-world situations on your own — the gateway to certification.',
    who: 'For learners past the basics who want true conversational independence and their first DELF/immigration-relevant level.',
    priceINR: 9500,
    duration: '10 weeks',
    sessions: 15,
    classSize: '4–6 students',
    schedule: 'Sat & Sun · 6:00–7:30 PM IST',
    outcomes: [
      'Describe a problem to a doctor; talk about your work experience in an interview.',
      'Follow the plot of a French film without subtitles for the easier scenes.',
      'Give opinions and reasons, and hold your side of a conversation.',
      'Reach the threshold for DELF B1 and the entry point for Canadian immigration scoring.',
    ],
    syllabus: [
      'The subjunctive mood — introduction and common triggers',
      'Nuanced past narration: passé composé vs imparfait in depth',
      'Expressing opinion, hypothesis and the conditional',
      'Workplace and administrative French basics',
      'Media comprehension: news, podcasts, short articles',
      'Structured discussion, debate and argument-building',
    ],
    comboTracks: [
      { label: 'A2 + B1 Track — save 15%', href: '/courses/a2-b1-track' },
      { label: 'A2 + B1 + B2 Master Track — save 17%', href: '/courses/a2-b1-b2-track' },
      { label: 'B1 + B2 Track — save 13%', href: '/courses/b1-b2-track' },
    ],
    ebook: { label: 'B1 Vocabulary Book — 1,200 words', href: '/courses/ebook-b1-vocabulary' },
    prev: { label: 'A2 — Elementary', href: '/courses/a2' },
    next: { label: 'B2 — Upper Intermediate', href: '/courses/b2' },
    faqs: [
      { q: 'Is B1 enough for Canada PR?', a: 'B1 is where French starts counting, but most Express Entry points come at B2 (CLB 7). B1 is the essential stepping stone to get there.' },
      { q: 'This is where I stalled last time. Why?', a: 'The B1 plateau is real — the grammar (subjunctive, conditional) gets abstract. Small classes and structured speaking practice are exactly what carry you through it.' },
      { q: 'Can I take DELF B1 after this?', a: 'Yes — B1 aligns to the DELF B1 standard. For a scored exam focus, pair it with our TEF/TCF preparation.' },
    ],
  },
  {
    code: 'B2',
    slug: 'b2',
    name: 'Upper Intermediate',
    cefr: 'CEFR B2 · Vantage',
    promise: 'The immigration and university standard. Argue, debate and work in French — reach CLB 7+.',
    who: 'For learners targeting Canadian PR, French-medium study or professional work — the single most common goal for Indian professionals.',
    priceINR: 10500,
    duration: '12 weeks',
    sessions: 18,
    classSize: '4–6 students',
    schedule: 'Tue & Thu · 6:00–7:30 PM IST',
    outcomes: [
      'Argue a point in a team meeting; write a formal email to a French institution.',
      'Understand news broadcasts and fast native speech without rewinding.',
      'Read and analyse articles, and defend a position with evidence.',
      'Satisfy CLB 7 for Express Entry — the most common French target for Canadian PR.',
    ],
    syllabus: [
      'Advanced grammar: full subjunctive, passive, reported speech',
      'Register and nuance — formal, academic and professional French',
      'Argumentation, persuasion and structured written expression',
      'Complex listening: debate, interview and broadcast media',
      'Literature and media analysis',
      'CLB 7 alignment and productive-skill precision',
    ],
    comboTracks: [
      { label: 'A2 + B1 + B2 Master Track — save 17%', href: '/courses/a2-b1-b2-track' },
      { label: 'B1 + B2 Track — save 13%', href: '/courses/b1-b2-track' },
      { label: 'B2 + TEF Combo — save 15%', href: '/courses/b2-tef-combo' },
    ],
    ebook: { label: 'B2 Vocabulary Book — 1,500 words', href: '/courses/ebook-b2-vocabulary' },
    prev: { label: 'B1 — Intermediate', href: '/courses/b1' },
    next: { label: 'C1 — DALF Masterclass', href: '/courses/c1' },
    faqs: [
      { q: 'Will B2 get me CLB 7?', a: 'B2 is aligned to CLB 7. To convert that into a scored TEF/TCF result, add exam preparation — or take the B2 + TEF Combo, built for exactly this pathway.' },
      { q: 'How is B2 different from B1?', a: 'B1 is coping independently; B2 is operating with precision — argument, nuance and register. B2 is the level institutions and employers actually ask for.' },
      { q: 'I need this for Express Entry. How long?', a: 'B2 runs 12 weeks. If you are starting lower, the A2 + B1 + B2 Master Track takes you all the way with no gaps.' },
    ],
  },
  {
    code: 'C1',
    slug: 'c1',
    name: 'DALF C1 Masterclass',
    cefr: 'CEFR C1 · Effective Operational Proficiency',
    promise: 'Advanced nuance and sophisticated expression — the level French universities and senior roles ask for.',
    who: 'For strong learners aiming at postgraduate admission, senior French-language roles, or the DALF C1 diploma.',
    priceINR: 14000,
    duration: '10 weeks',
    sessions: 15,
    classSize: '4–6 students',
    schedule: 'Flexible cohorts',
    outcomes: [
      'Sustain a complex spoken argument with nuance and appropriate register.',
      'Write structured, sophisticated texts — synthèse, essay, formal correspondence.',
      'Understand demanding native material: lectures, debates, literary texts.',
      'Perform to the DALF C1 standard, component by component.',
    ],
    syllabus: [
      'Advanced argumentation and the synthèse de documents',
      'Sophisticated written expression and cohesion devices',
      'Sustained oral production: exposé and structured debate',
      'Idiom, connotation and stylistic control',
      'Authentic materials: press, radio, literature',
      'DALF C1 exam format, timing and strategy per component',
    ],
    comboTracks: [],
    prev: { label: 'B2 — Upper Intermediate', href: '/courses/b2' },
    next: { label: 'C2 — DALF Masterclass', href: '/courses/c2' },
    faqs: [
      { q: 'Who actually needs C1?', a: 'C1 (DALF) is required by many French universities for postgraduate admission and by some employers for senior roles in French-speaking organisations.' },
      { q: 'Do I need B2 first?', a: 'You should hold a solid B2. This is a masterclass — it assumes strong French and sharpens it to near-native command.' },
      { q: 'Is the DALF diploma lifelong?', a: 'Yes. Unlike TEF/TCF, the DALF diploma never expires, which makes C1 a strong long-term credential.' },
    ],
  },
  {
    code: 'C2',
    slug: 'c2',
    name: 'DALF C2 Masterclass',
    cefr: 'CEFR C2 · Mastery',
    promise: 'The summit. Near-native sophistication, subtlety and style — the highest certification in the CEFR framework.',
    who: 'For those pursuing academic careers, translation, or roles where French is the primary professional language.',
    priceINR: 14000,
    duration: '10 weeks',
    sessions: 15,
    classSize: '4–6 students',
    schedule: 'Flexible cohorts',
    outcomes: [
      'Express yourself with the spontaneity and precision of an educated native speaker.',
      'Produce polished, argued writing across registers and genres.',
      'Grasp virtually everything heard or read, including implicit meaning and irony.',
      'Perform to the DALF C2 standard — the most demanding exam in the CEFR.',
    ],
    syllabus: [
      'Near-native oral fluency, spontaneity and stylistic range',
      'Advanced synthesis and critical written expression',
      'Literary and rhetorical analysis',
      'Command of nuance, irony, connotation and idiom',
      'Sustained argument under exam conditions',
      'DALF C2 exam format and component strategy',
    ],
    comboTracks: [],
    prev: { label: 'C1 — DALF Masterclass', href: '/courses/c1' },
    faqs: [
      { q: 'How rare is C2?', a: 'Few candidates pursue it. Those who do are typically aiming for academic careers, professional translation, or roles where French is the working language.' },
      { q: 'What level do I need to start?', a: 'A confident C1. C2 refines mastery rather than teaching new fundamentals — it is a performance masterclass.' },
      { q: 'Does the diploma expire?', a: 'No. The DALF C2 diploma is lifelong and signals complete mastery of French.' },
    ],
  },
]

export function getLevel(slug: string): LevelData | undefined {
  return levels.find((l) => l.slug === slug)
}

export const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
