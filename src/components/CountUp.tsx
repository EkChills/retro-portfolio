import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from 'motion/react'
import { useEffect, useRef } from 'react'

type CountUpProps = {
  /** Numeric target. The "+" suffix is added back by `suffix` if provided. */
  to: number
  /** Render-side prefix (e.g. "$"). */
  prefix?: string
  /** Render-side suffix (e.g. "+", "%"). */
  suffix?: string
  /** Animation duration in seconds. */
  duration?: number
  className?: string
}

/**
 * Tween a number from 0 → `to` once the element scrolls into view.
 *
 * Backed by `useMotionValue` + `animate` (not React state) so the DOM updates
 * happen outside React's reconciler — keeps the count buttery-smooth even on
 * mid-tier laptops.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) =>
    `${prefix}${Math.round(latest)}${suffix}`
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, motionValue, to, duration])

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
    </span>
  )
}
