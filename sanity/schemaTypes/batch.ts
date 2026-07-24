import { defineType, defineField } from 'sanity'

/* The ONLY schema type on this project (brief): `batch`.
   Every field carries a plain-language `description` so a non-technical editor
   can fill it in confidently from the Studio. v5 defineType/defineField only —
   never the v2 object-literal format. */

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'TEF', 'TCF', 'DELF', 'DALF', 'Workshop']

const STATUS_EMOJI: Record<string, string> = {
  Open: '🟢',
  'Filling Fast': '🟠',
  Full: '⚪',
}

export const batch = defineType({
  name: 'batch',
  title: 'Upcoming Batch',
  type: 'document',
  fields: [
    defineField({
      name: 'courseName',
      title: 'Course name',
      type: 'string',
      description: 'The name students will see, e.g. "A2 — Elementary" or "TEF Preparation".',
      validation: (rule) => rule.required().error('Please give the batch a course name.'),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      description: 'Pick the CEFR level or exam this batch belongs to. Used for the level badge and for filtering.',
      options: {
        list: LEVELS.map((l) => ({ title: l, value: l })),
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Please choose a level.'),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      description: 'The day the batch begins. Batches automatically disappear from the website once this date has passed.',
      options: { dateFormat: 'DD MMMM YYYY' },
      validation: (rule) => rule.required().error('Please set a start date.'),
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
      description: 'Days and times, e.g. "Mon, Tue, Thu, Fri — 7:00–8:30 PM IST".',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'How long the batch runs, e.g. "8 weeks".',
    }),
    defineField({
      name: 'seatsAvailable',
      title: 'Seats available',
      type: 'number',
      description: 'How many seats are still open (0–50). Set to 0 and status to "Full" once it sells out.',
      validation: (rule) => rule.integer().min(0).max(50).error('Seats must be a whole number between 0 and 50.'),
    }),
    defineField({
      name: 'fees',
      title: 'Fees (₹)',
      type: 'number',
      description: 'Enter the number only — no ₹ sign, no commas. The website adds the ₹ and formatting for you.',
      validation: (rule) => rule.min(0).error('Fees cannot be negative.'),
    }),
    defineField({
      name: 'feeNote',
      title: 'Fee note (optional)',
      type: 'string',
      description: 'Optional line under the price, e.g. "Early-bird: ₹1,000 off until 20 July".',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration link',
      type: 'url',
      description: 'Where the "Reserve your seat" button goes — a form link, WhatsApp (https://wa.me/…), mailto: or tel: link.',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }).error('Enter a valid link (http, https, mailto or tel).'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Open = seats available · Filling Fast = almost full · Full = no seats left.',
      options: {
        list: [
          { title: 'Open', value: 'Open' },
          { title: 'Filling Fast', value: 'Filling Fast' },
          { title: 'Full', value: 'Full' },
        ],
        layout: 'radio',
      },
      initialValue: 'Open',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enrolDeadline',
      title: 'Enrolment deadline (optional)',
      type: 'date',
      description: 'Optional last date to register. Shown on the card if set.',
      options: { dateFormat: 'DD MMMM YYYY' },
    }),
  ],

  // Document-list preview: "A2 — Elementary · 🟢 Open · starts 3 August 2026"
  preview: {
    select: { title: 'courseName', status: 'status', startDate: 'startDate' },
    prepare({ title, status, startDate }) {
      const emoji = STATUS_EMOJI[status as string] || ''
      const when = startDate
        ? new Date(startDate as string).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : 'no date'
      return {
        title: title || 'Untitled batch',
        subtitle: `${emoji} ${status || '—'} · starts ${when}`,
      }
    },
  },

  orderings: [
    {
      title: 'Start date, soonest first',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
})
