import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, sanityConfigured } from '../env'

/* Read-only client. useCdn:false + a pinned apiVersion (brief). This site never
   writes to Sanity and never references an Editor/write token.

   The client is only built when a projectId is present, so the app still
   compiles and runs before Sanity is configured. */
export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null
