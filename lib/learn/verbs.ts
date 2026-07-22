export type Frequency = 'Most common' | 'Common' | 'Rare' | 'Literary'

export interface Tense {
  name: string
  frequency: Frequency
  meaning: string
  formation: string
  fr: string
  en: string
}

export interface Mood {
  id: string
  title: string
  tagline: string
  intro: string
  tenses: Tense[]
}

export const MOODS: Mood[] = [
  {
    id: 'indicative',
    title: 'The Indicative',
    tagline: 'Facts & reality',
    intro:
      'The indicative is the everyday mood — it states facts and describes what really happens, happened, or will happen. These are the tenses you will use most, so they are the foundation for everything that follows.',
    tenses: [
      {
        name: 'Présent',
        frequency: 'Most common',
        meaning: 'What is happening now, or general truths.',
        formation: 'Verb stem + present endings (-e/-es/-e… for -er verbs).',
        fr: 'Je parle français.',
        en: 'I speak French.',
      },
      {
        name: 'Passé composé',
        frequency: 'Most common',
        meaning: 'A completed action in the past.',
        formation: 'Present of avoir or être + past participle.',
        fr: "J'ai parlé au roi.",
        en: 'I spoke to the king.',
      },
      {
        name: 'Imparfait',
        frequency: 'Common',
        meaning: 'Ongoing, habitual or background actions in the past.',
        formation: 'Nous-stem + imperfect endings (-ais, -ais, -ait…).',
        fr: 'Je parlais chaque jour.',
        en: 'I used to speak every day.',
      },
      {
        name: 'Plus-que-parfait',
        frequency: 'Common',
        meaning: 'An action that happened before another past action.',
        formation: 'Imperfect of avoir or être + past participle.',
        fr: "J'avais déjà parlé.",
        en: 'I had already spoken.',
      },
      {
        name: 'Futur simple',
        frequency: 'Common',
        meaning: 'What will happen.',
        formation: 'Infinitive + future endings (-ai, -as, -a…).',
        fr: 'Je louerai une maison.',
        en: 'I will rent a house.',
      },
      {
        name: 'Futur antérieur',
        frequency: 'Common',
        meaning: 'What will have happened before a future point.',
        formation: 'Future of avoir or être + past participle.',
        fr: 'J’aurai parlé avant midi.',
        en: 'I will have spoken before noon.',
      },
      {
        name: 'Passé simple',
        frequency: 'Literary',
        meaning: 'A completed past action — but only in writing.',
        formation: 'Verb stem + passé simple endings.',
        fr: 'Il parla longuement.',
        en: 'He spoke at length.',
      },
    ],
  },
  {
    id: 'subjunctive',
    title: 'The Subjunctive',
    tagline: 'Emotion & uncertainty',
    intro:
      'The subjunctive expresses emotions and things that are possible but not certain. It only appears in sentences with two clauses, and is always introduced by qui or que — “that (someone) (does something).” You really only need the present and past; the other two are literary.',
    tenses: [
      {
        name: 'Présent du subjonctif',
        frequency: 'Common',
        meaning: 'Possibility, wish or emotion in the present.',
        formation: 'Que + verb stem + subjunctive endings (-e, -es, -e, -ions, -iez, -ent).',
        fr: 'Il faut que je goûte le dîner du roi.',
        en: 'It’s necessary that I taste the king’s dinner.',
      },
      {
        name: 'Passé du subjonctif',
        frequency: 'Common',
        meaning: 'A completed action viewed with emotion or doubt.',
        formation: 'Que + subjunctive present of avoir/être + past participle.',
        fr: 'Je suis heureux que tu aies mentionné cela.',
        en: 'I’m glad that you brought this up.',
      },
      {
        name: 'Imparfait du subjonctif',
        frequency: 'Literary',
        meaning: 'Same idea as the present subjunctive, in older writing.',
        formation: 'Que + passé-simple (il) stem + unique imperfect subjunctive endings.',
        fr: 'Il était urgent qu’il changeât ses pneus.',
        en: 'It was urgent that he change his tires.',
      },
      {
        name: 'Plus-que-parfait du subjonctif',
        frequency: 'Literary',
        meaning: 'A completed past action with doubt, in literary style.',
        formation: 'Que + imperfect subjunctive of avoir/être + past participle.',
        fr: 'Il ne pensait pas que vous eussiez lu sa lettre.',
        en: 'He did not think that you had read his letter.',
      },
    ],
  },
  {
    id: 'conditional',
    title: 'The Conditional',
    tagline: 'The “would” mood',
    intro:
      'The conditional is all about “would” — what someone would do, or would have done. The présent and passé (I) are genuinely useful; the second passé (II) is literary only.',
    tenses: [
      {
        name: 'Conditionnel présent',
        frequency: 'Common',
        meaning: 'What someone would do (but hasn’t).',
        formation: 'Infinitive + conditional endings (-ais, -ais, -ait, -ions, -iez, -aient).',
        fr: 'Je louerais une maison.',
        en: 'I would rent a house.',
      },
      {
        name: 'Conditionnel passé (I)',
        frequency: 'Common',
        meaning: 'What someone would have done, but didn’t.',
        formation: 'Conditional present of avoir/être + past participle.',
        fr: 'Tu serais sorti.',
        en: 'You would have gone out.',
      },
      {
        name: 'Conditionnel passé (II)',
        frequency: 'Literary',
        meaning: 'Same meaning as passé (I), reserved for literature.',
        formation: 'Imperfect subjunctive of avoir/être + past participle.',
        fr: 'Nous eussions parlé.',
        en: 'We would have talked.',
      },
    ],
  },
  {
    id: 'imperative',
    title: 'The Imperative',
    tagline: 'Commands',
    intro:
      'Imperatives are commands — “speak,” “sit,” “propose to me tonight.” They only exist for tu, nous and vous, because a command has to be aimed at someone directly.',
    tenses: [
      {
        name: 'Impératif présent',
        frequency: 'Common',
        meaning: 'A direct command in the present. (The tu form drops its -s.)',
        formation: 'Present-tense conjugation for tu / nous / vous.',
        fr: 'Parle ! Allons ! Demandez en mariage !',
        en: 'Speak! Let’s go! Propose!',
      },
      {
        name: 'Impératif passé',
        frequency: 'Rare',
        meaning: 'A command to have done something first — almost never used.',
        formation: 'Subjunctive present of avoir/être + past participle.',
        fr: 'Aie lavé les mains avant mon retour.',
        en: 'Have washed your hands before I get back.',
      },
    ],
  },
  {
    id: 'impersonal',
    title: 'The Impersonal',
    tagline: 'Forms that never change',
    intro:
      'Impersonal forms — infinitives and participles — do not change with the subject. They are the neutral building blocks that appear inside many other tenses.',
    tenses: [
      {
        name: 'Infinitif présent',
        frequency: 'Most common',
        meaning: 'A verb’s most neutral form: “to (verb).”',
        formation: 'The dictionary form itself.',
        fr: 'laver, manger, tenir, avoir',
        en: 'to wash, to eat, to hold, to have',
      },
      {
        name: 'Participe passé',
        frequency: 'Most common',
        meaning: 'The past form used across many compound tenses — like adding “-ed.”',
        formation: '-er → é, -ir → i, -re → u (plus many irregulars).',
        fr: 'parlé, fini, entendu',
        en: 'spoken, finished, heard',
      },
    ],
  },
]

export const SUBJUNCTIVE_ENDINGS = {
  headers: ['Subject', '-er / -re verbs', '-ir verbs'],
  rows: [
    ['je', '-e', '-isse'],
    ['tu', '-es', '-isses'],
    ['il / elle', '-e', '-isse'],
    ['nous', '-ions', '-issions'],
    ['vous', '-iez', '-issiez'],
    ['ils / elles', '-ent', '-issent'],
  ],
}

export const IRREGULAR_SUBJUNCTIVE = {
  headers: ['Subject', 'avoir', 'être'],
  rows: [
    ['que je', 'aie', 'sois'],
    ['que tu', 'aies', 'sois'],
    ['qu’il / elle', 'ait', 'soit'],
    ['que nous', 'ayons', 'soyons'],
    ['que vous', 'ayez', 'soyez'],
    ['qu’ils / elles', 'aient', 'soient'],
  ],
}

export const CONDITIONAL_CONJUGATION = {
  verb: 'louer (to rent)',
  headers: ['Subject', 'Conditionnel présent', 'Meaning'],
  rows: [
    ['je', 'louerais', 'I would rent'],
    ['tu', 'louerais', 'you would rent'],
    ['il / elle', 'louerait', 'he/she would rent'],
    ['nous', 'louerions', 'we would rent'],
    ['vous', 'loueriez', 'you (all) would rent'],
    ['ils / elles', 'loueraient', 'they would rent'],
  ],
}

export const PAST_PARTICIPLES = {
  headers: ['Infinitive ending', 'New ending', 'Example'],
  rows: [
    ['-er', '-é', 'parler → parlé'],
    ['-ir', '-i', 'finir → fini'],
    ['-re', '-u', 'entendre → entendu'],
  ],
}

export const VERB_FLASHCARDS = [
  { front: 'avoir → subjonctif', sub: 'que je…', back: 'aie', backSub: '“that I have”' },
  { front: 'être → subjonctif', sub: 'que je…', back: 'sois', backSub: '“that I be”' },
  { front: 'louer → conditionnel', sub: 'je…', back: 'louerais', backSub: '“I would rent”' },
  { front: 'parler → participe passé', sub: '-er verb', back: 'parlé', backSub: '“spoken”' },
  { front: 'finir → participe passé', sub: '-ir verb', back: 'fini', backSub: '“finished”' },
  { front: 'entendre → participe passé', sub: '-re verb', back: 'entendu', backSub: '“heard”' },
]

export const VERB_QUIZ = [
  {
    q: 'Which mood is used for emotions and things that are possible but not certain?',
    options: ['Indicative', 'Subjunctive', 'Imperative', 'Conditional'],
    answer: 1,
    explain: 'The subjunctive covers emotion and uncertainty, always introduced by qui/que.',
  },
  {
    q: 'The conditional mood is all about which English word?',
    options: ['“will”', '“would”', '“was”', '“must”'],
    answer: 1,
    explain: 'The conditional expresses “would” — what someone would (have) do(ne).',
  },
  {
    q: 'In the impératif présent, what happens to the “tu” form of an -er verb?',
    options: ['It adds an -s', 'It drops its -s', 'It becomes an infinitive', 'Nothing changes'],
    answer: 1,
    explain: 'The tu imperative of -er verbs drops the final -s: parle!',
  },
  {
    q: 'How is a regular -re verb turned into a past participle?',
    options: ['-re → -é', '-re → -i', '-re → -u', '-re → -is'],
    answer: 2,
    explain: 'entendre → entendu. Regular endings: -er→é, -ir→i, -re→u.',
  },
  {
    q: 'Which two tenses do you actually need from the subjunctive?',
    options: [
      'Imperfect and pluperfect',
      'Present and past',
      'Present and imperfect',
      'Past and pluperfect',
    ],
    answer: 1,
    explain: 'Present and past subjunctive are common; imperfect and pluperfect are literary.',
  },
  {
    q: 'Which subjunctive forms of avoir are correct for “que je / que tu”?',
    options: ['ai / as', 'aie / aies', 'aurai / auras', 'eus / eus'],
    answer: 1,
    explain: 'avoir subjunctive: aie, aies, ait, ayons, ayez, aient.',
  },
]
