import type { Metadata } from 'next'
import { LevelPage } from '@/components/LevelPage'
import { getLevel } from '@/lib/levels'

const level = getLevel('b2')!

export const metadata: Metadata = {
  title: `${level.code} — ${level.name} | French Compass`,
  description: level.promise,
  alternates: { canonical: '/courses/b2' },
  openGraph: { title: `${level.code} — ${level.name} | French Compass`, description: level.promise, type: 'website' },
}

export default function Page() {
  return <LevelPage level={level} />
}
