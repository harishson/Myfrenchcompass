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
    save: 'bg-[#EF4135] text-[#FFFFFF] border-2 border-[#FF7A70]',
    certified: 'bg-[#0055A4] text-[#FFFFFF] border-2 border-[#1466BE]',
    featured: 'bg-[#0055A4] text-[#FFFFFF] border-2 border-[#1466BE]',
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
