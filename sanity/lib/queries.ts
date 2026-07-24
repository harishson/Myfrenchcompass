import { groq } from 'next-sanity'

/* Past batches disappear automatically: GROQ filters startDate >= now(), so the
   client never has to unpublish an old cohort (brief). Sorted soonest-first. */
export const BATCHES_QUERY = groq`
  *[_type == "batch" && defined(startDate) && startDate >= now()] | order(startDate asc) {
    _id,
    courseName,
    level,
    startDate,
    schedule,
    duration,
    seatsAvailable,
    fees,
    feeNote,
    registrationUrl,
    status,
    enrolDeadline
  }
`

export type Batch = {
  _id: string
  courseName: string
  level: string
  startDate: string
  schedule?: string
  duration?: string
  seatsAvailable?: number
  fees?: number
  feeNote?: string
  registrationUrl?: string
  status: 'Open' | 'Filling Fast' | 'Full'
  enrolDeadline?: string
}
