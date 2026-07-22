export interface Letter {
  letter: string
  phonetic: string
  name: string
  vowel: boolean
  accents?: string
  example: string
  translation: string
}

export const LETTERS: Letter[] = [
  { letter: 'A', phonetic: '/a/', name: 'a', vowel: true, accents: 'À à, Â â, Æ æ', example: 'avion', translation: 'plane' },
  { letter: 'B', phonetic: '/be/', name: 'bé', vowel: false, example: 'bateau', translation: 'boat' },
  { letter: 'C', phonetic: '/ʃ/, /k/ or /s/', name: 'cé', vowel: false, accents: 'Ç ç', example: 'chien', translation: 'dog' },
  { letter: 'D', phonetic: '/de/', name: 'dé', vowel: false, example: 'dauphin', translation: 'dolphin' },
  { letter: 'E', phonetic: '/ə/', name: 'e', vowel: true, accents: 'É é, È è, Ê ê, Ë ë, Œ œ', example: 'éléphant', translation: 'elephant' },
  { letter: 'F', phonetic: '/ɛf/', name: 'effe', vowel: false, example: 'fleur', translation: 'flower' },
  { letter: 'G', phonetic: '/ʒe/ or /g/', name: 'gé', vowel: false, example: 'grenouille', translation: 'frog' },
  { letter: 'H', phonetic: 'mostly silent, /aʃ/', name: 'ache', vowel: false, example: 'hibou', translation: 'owl' },
  { letter: 'I', phonetic: '/i/', name: 'i', vowel: true, accents: 'Î î, Ï ï', example: 'iglou', translation: 'igloo' },
  { letter: 'J', phonetic: '/ʒi/', name: 'ji', vowel: false, example: 'jus', translation: 'juice' },
  { letter: 'K', phonetic: '/ka/', name: 'ka', vowel: false, example: 'kangourou', translation: 'kangaroo' },
  { letter: 'L', phonetic: '/ɛl/', name: 'elle', vowel: false, example: 'lapin', translation: 'rabbit' },
  { letter: 'M', phonetic: '/ɛm/', name: 'emme', vowel: false, example: 'maison', translation: 'house' },
  { letter: 'N', phonetic: '/ɛn/', name: 'enne', vowel: false, example: 'nid', translation: 'nest' },
  { letter: 'O', phonetic: '/o/', name: 'o', vowel: true, accents: 'Ô ô', example: 'orange', translation: 'orange' },
  { letter: 'P', phonetic: '/pe/', name: 'pé', vowel: false, example: 'pomme', translation: 'apple' },
  { letter: 'Q', phonetic: '/ky/', name: 'qu', vowel: false, example: 'quatre', translation: 'four' },
  { letter: 'R', phonetic: '/ɛʁ/', name: 'erre', vowel: false, example: 'raisin', translation: 'grape' },
  { letter: 'S', phonetic: '/ɛs/', name: 'esse', vowel: false, example: 'souris', translation: 'mouse' },
  { letter: 'T', phonetic: '/te/', name: 'té', vowel: false, example: 'tortue', translation: 'turtle' },
  { letter: 'U', phonetic: '/y/', name: 'u', vowel: true, accents: 'Ù ù, Û û, Ü ü', example: 'uniforme', translation: 'uniform' },
  { letter: 'V', phonetic: '/ve/', name: 'vé', vowel: false, example: 'vache', translation: 'cow' },
  { letter: 'W', phonetic: '/dubləve/', name: 'double vé', vowel: false, example: 'wagon', translation: 'wagon' },
  { letter: 'X', phonetic: '/iks/', name: 'ixe', vowel: false, example: 'xylophone', translation: 'xylophone' },
  { letter: 'Y', phonetic: '/iɡʁɛk/', name: 'i grec', vowel: true, accents: 'Ÿ ÿ', example: 'yoyo', translation: 'yoyo' },
  { letter: 'Z', phonetic: '/zɛd/', name: 'zède', vowel: false, example: 'zèbre', translation: 'zebra' },
]

export const TRICKY_LETTERS = [
  {
    letter: 'E',
    tip: 'Pronounce the “e” like “euh” — think of the sound you make when you see something disgusting. It is soft and swallowed, not the sharp English “ee”.',
  },
  {
    letter: 'G',
    tip: 'Before e or i (genou), it is soft like “jeh” — stretch the j slightly, like the start of “Jerry”. Before u, o, a or a consonant (grenouille), it is hard, like the g in “Greg”.',
  },
  {
    letter: 'I',
    tip: 'Pronounce “i” like a long “ee”, as in see or bee — never the English “eye”.',
  },
  {
    letter: 'J',
    tip: 'Pronounced “jhee”: similar to the English g, but ending in an “ee” sound instead of “ay”.',
  },
  {
    letter: 'U',
    tip: 'The hardest one — a sound English does not have. Say “ee”, but round your lips as if saying “oo”. The “e-yooh” sound should come naturally.',
  },
  {
    letter: 'Y',
    tip: 'Very different from English. Say “ee-greck” as one smooth word — two distinct sounds, no pause between them.',
  },
  {
    letter: 'Œ',
    tip: 'A digraph pronounced like “oeh”, also called e dans l’o (“the e inside the o”). Inside a word it usually takes the sound of the letter that follows it.',
  },
]

export const ACCENTS = [
  { mark: 'é', name: 'e accent aigu', note: 'A closed, sharp “ay” sound.' },
  { mark: 'è', name: 'e accent grave', note: 'An open “eh” sound.' },
  { mark: 'ê', name: 'e accent circonflexe', note: 'Often marks a dropped historic “s”.' },
  { mark: 'ë', name: 'e tréma', note: 'Signals the vowel is pronounced separately.' },
]

export const ALPHABET_QUIZ = [
  {
    q: 'How is the letter “H” usually pronounced in French?',
    options: ['Hard, like English “h”', 'It is mostly silent', 'Like an “s”', 'Like a rolled “r”'],
    answer: 1,
    explain: 'H is mostly silent in French; its letter-name is “ache” /aʃ/.',
  },
  {
    q: 'Which letter is considered a vowel in French but not in English?',
    options: ['W', 'Y', 'H', 'J'],
    answer: 1,
    explain: 'French has six vowels — A, E, I, O, U and Y. Y is a vowel here.',
  },
  {
    q: 'The letter “G” before “e” or “i” is pronounced…',
    options: ['Hard, like in “Greg”', 'Soft, like “jeh” (Jerry)', 'Silent', 'Like a “k”'],
    answer: 1,
    explain: 'Before e/i it is soft (genou); before a/o/u/consonant it is hard (grenouille).',
  },
  {
    q: 'Which word means “owl” and starts with a silent letter?',
    options: ['hibou', 'iglou', 'jus', 'lapin'],
    answer: 0,
    explain: 'hibou (owl) begins with a silent H.',
  },
  {
    q: 'How many vowels does the French alphabet have?',
    options: ['Five', 'Six', 'Seven', 'Four'],
    answer: 1,
    explain: 'Six vowels and twenty consonants — Y counts as a vowel.',
  },
]
