import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
  variant?: 'ink' | 'parchment'
  id?: string
}

export function Section({
  children,
  className,
  dark = false,
  variant,
  id,
}: SectionProps) {
  const isInk = variant ? variant === 'ink' : dark
  return (
    <section
      id={id}
      className={cn(
        'py-section-spacing',
        isInk ? 'on-ink' : 'bg-parchment',
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-gutter">
        {children}
      </div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  centered?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-ink-text tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-ink-dim leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
