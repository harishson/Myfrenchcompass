import { cn } from '@/lib/utils'

interface SealProps {
  children: React.ReactNode
  className?: string
  variant?: 'save' | 'certified' | 'featured'
}

export function Seal({ children, className, variant = 'save' }: SealProps) {
  const baseClasses =
    'absolute -right-3 -top-3 w-20 h-20 rounded-full flex items-center justify-center font-mono text-xs font-bold uppercase tracking-wider shadow-lg'

  const variantClasses = {
    save: 'bg-[#C08A2D] text-[#EDE6D6] border-2 border-[#D8AE63]',
    certified: 'bg-[#3E8F7C] text-[#EDE6D6] border-2 border-[#37628F]',
    featured: 'bg-[#2440E8] text-[#EDE6D6] border-2 border-[#3E59FF]',
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        'text-center text-[10px] leading-tight p-2',
        className
      )}
      aria-label={`${variant} seal`}
    >
      {children}
    </div>
  )
}
