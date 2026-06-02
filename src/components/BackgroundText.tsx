import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cn } from '~/lib/cn'

type BackgroundTextProps = {
  /** The text to display (single word reads best, e.g. "EZEIFEOMA"). */
  children: string
  /** Direction of horizontal pan: 'left' = drift right→left, 'right' = left→right. */
  direction?: 'left' | 'right'
  /** Distance (px) the band travels across its in-viewport lifetime. */
  distance?: number
  /** Tailwind classes for the wrapper band. */
  className?: string
  /** Tailwind classes layered onto the text itself (font size, color, opacity). */
  textClassName?: string
}

/**
 * Oversized decorative text that pans horizontally as the band scrolls
 * past the viewport — the kind of detail you see on agency reels and
 * Awwwards sites. Drives entirely off `useScroll` so it stays perfectly
 * locked to the user's scroll position (no time-based animation drift).
 *
 * Renders behind real content; the band itself is `overflow-hidden` so
 * the text can extend beyond the page bounds without triggering scroll.
 */
export function BackgroundText({
  children,
  direction = 'left',
  distance = 240,
  className,
  textClassName,
}: BackgroundTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map the band's full viewport pass to a horizontal translation.
  // `'left'`  starts pushed +distance and ends at -distance (drifts left).
  // `'right'` does the reverse.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [distance, -distance] : [-distance, distance]
  )

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none relative w-full overflow-hidden select-none',
        className
      )}
    >
      <motion.div
        style={{ x, willChange: 'transform' }}
        className="whitespace-nowrap"
      >
        <span
          className={cn(
            'block font-display uppercase leading-none tracking-tight',
            'text-[clamp(120px,22vw,360px)]',
            textClassName
          )}
        >
          {children}
        </span>
      </motion.div>
    </div>
  )
}
