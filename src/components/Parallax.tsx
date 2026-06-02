import { motion, useScroll, useTransform, type MotionStyle } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type ParallaxProps = {
  children: ReactNode
  /**
   * Travel speed.
   *   • Positive → element drifts UPWARD as you scroll down (background feel).
   *   • Negative → element drifts DOWNWARD (foreground feel).
   *   • Magnitude is multiplied by 100px of total travel across the element's
   *     in-viewport lifetime, so `0.3` ≈ 30px each way, `0.8` ≈ 80px.
   *
   * Keep most values between -0.6 and 0.6 — anything bigger reads as broken.
   */
  speed?: number
  /** Optional horizontal drift, same semantics as `speed`. */
  speedX?: number
  /** Optional rotation (deg) across the lifetime. */
  rotate?: number
  /** Optional scale delta. e.g. 0.1 = scales from 0.95 → 1.05. */
  scale?: number
  className?: string
  style?: MotionStyle
  as?: 'div' | 'span' | 'section'
  /**
   * Override the scroll trigger window. Defaults to the full viewport pass
   * (`['start end', 'end start']`) which is what you want 99 % of the time.
   */
  offset?: [string, string]
}

/**
 * Declarative parallax wrapper.
 *
 * Mounts a `useScroll` listener bound to the element's own bounding box, so
 * the parallax doesn't depend on the element's distance from the page top —
 * it always animates across its own viewport pass. That keeps the effect
 * looking right in every section regardless of where it lives on the page.
 *
 * Renders as a `motion.<as>` so it composes with siblings without an extra
 * wrapper element.
 */
export function Parallax({
  children,
  speed = 0.3,
  speedX = 0,
  rotate = 0,
  scale = 0,
  className,
  style,
  as = 'div',
  offset = ['start end', 'end start'],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // Cast — motion's offset string union is narrower than the public docs;
    // any "start|end + start|center|end" combo is valid at runtime.
    offset: offset as never,
  })

  // Each transform stays inert when its corresponding prop is 0, so an
  // unused channel costs nothing beyond a closure.
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])
  const x = useTransform(scrollYProgress, [0, 1], [speedX * 100, -speedX * 100])
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  const s = useTransform(scrollYProgress, [0, 1], [1 - scale, 1 + scale])

  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        ...style,
        y,
        x,
        rotate: r,
        scale: s,
        // Pre-hint the compositor — keeps multi-element parallax buttery
        // even when 3-4 elements are animating in the same frame.
        willChange: 'transform',
      }}
    >
      {children}
    </Tag>
  )
}
