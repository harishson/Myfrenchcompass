import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/* Sanity webhook → on-demand revalidation. When the client publishes a batch in
   the Studio, Sanity POSTs here; we revalidate the 'batch' cache tag and the
   live Upcoming Batches page updates WITHOUT a redeploy.

   parseBody verifies the request signature against SANITY_REVALIDATE_SECRET,
   which is passed as the SECOND argument (brief requirement). */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }
    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // Next 16 requires a cache-life profile as the second argument. 'max' is a
    // full purge, which is what a publish webhook wants — calling this with one
    // argument (the pre-16 signature) silently failed to revalidate anything.
    revalidateTag('batch', 'max')
    return NextResponse.json({ revalidated: true, tag: 'batch', now: Date.now() })
  } catch (err) {
    console.error('[revalidate] error:', err)
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
