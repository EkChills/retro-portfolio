import { cn } from '~/lib/cn'

/**
 * Tiny chip used at the top of every section ("About Me", "Experience"…).
 * Inverts when placed on a darker background — switch via `tone`.
 */
export function SectionLabel({
  children,
  tone = 'dark',
  className,
}: {
  children: React.ReactNode
  tone?: 'dark' | 'invert'
  className?: string
}) {
  return (
    <p
      className={cn(
        'mb-5 inline-block border-hard px-5 py-2 font-display text-[13px] uppercase tracking-[3px]',
        tone === 'dark'
          ? 'bg-fg-alt text-fg-light'
          : 'bg-fg-alt text-secondary',
        className
      )}
    >
      {children}
    </p>
  )
}
