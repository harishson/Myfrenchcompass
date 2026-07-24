import { client } from './client'
import { BATCHES_QUERY, type Batch } from './queries'

/* Server-only data access. All Sanity reads happen in Server Components and are
   tagged { next: { tags: ['batch'] } } (brief) so the webhook at
   /api/revalidate can revalidate them on publish — no redeploy needed.

   Never call this from a client component. */
export async function getBatches(): Promise<Batch[]> {
  if (!client) return [] // Sanity not configured yet → page shows empty state.
  try {
    return await client.fetch<Batch[]>(
      BATCHES_QUERY,
      {},
      { next: { tags: ['batch'] } },
    )
  } catch (err) {
    console.error('[sanity] getBatches failed:', err)
    return []
  }
}
