import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp } from '~/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Override the default fade-up variant. */
  variants?: Variants
  /** Delay (s) applied to the child variant. */
  delay?: number
  /** Whether the reveal should re-trigger on each enter. Defaults to false (one-shot). */
  once?: boolean
  /** Tag to render. Defaults to a `div`. */
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'h2' | 'h3' | 'p'
  className?: string
  /** Viewport margin offset — negative shifts the trigger earlier. */
  amount?: number
}

/**
 * Drop-in scroll reveal wrapper backed by `whileInView`.
 *
 * Use it anywhere you'd otherwise wire up an IntersectionObserver by hand.
 * One source of truth for "fade-up on scroll" across the page.
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  once = true,
  as = 'div',
  className,
  amount = 0.2,
}: RevealProps) {
  // `motion[as]` is the right runtime API, just typed permissively.
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  )
}
