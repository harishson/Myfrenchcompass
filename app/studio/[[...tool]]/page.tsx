/* Embedded Sanity Studio, mounted at /studio. Because this route lives OUTSIDE
   app/(site), it does not inherit the marketing header, footer or contact dock.

   If Sanity isn't configured yet, we render a short setup note instead of
   crashing — see SANITY-SETUP.md. */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { sanityConfigured } from '../../../sanity/env'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1.5rem', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6, color: '#16233B' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Studio not configured yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and{' '}
          <code>NEXT_PUBLIC_SANITY_DATASET</code>) to your <code>.env.local</code>, then restart the dev server.
          Full steps are in <strong>SANITY-SETUP.md</strong> at the project root.
        </p>
      </div>
    )
  }
  return <NextStudio config={config} />
}
