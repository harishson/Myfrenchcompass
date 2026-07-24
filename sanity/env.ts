/* Sanity environment. Values come from .env.local — see SANITY-SETUP.md.
   apiVersion is PINNED to a fixed date string (brief requirement): bumping it is
   a deliberate act, never an accidental "latest". */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

/** True once the client has filled in a real project id. The site degrades
    gracefully (empty state) until then, so it builds and runs before Sanity
    is wired up. */
export const sanityConfigured = Boolean(projectId)
