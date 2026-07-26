import type { Metadata } from 'next'
import { LevelPage } from '@/components/LevelPage'
import { getLevel } from '@/lib/levels'

const level = getLevel('a2')!

export const metadata: Metadata = {
  title: `${level.code} — ${level.name} | French Compass`,
  description: level.promise,
  alternates: { canonical: '/courses/a2' },
  openGraph: { title: `${level.code} — ${level.name} | French Compass`, description: level.promise, type: 'website', siteName: 'French Compass', url: '/courses/a2' },
}

export default function Page() {
  return <LevelPage level={level} />
}
