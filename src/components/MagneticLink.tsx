import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type MagneticProps = HTMLMotionProps<'a'> & {
  children: ReactNode
  className?: string
  /** Max travel (px) the element can be pulled toward the cursor. */
  strength?: number
  href?: string
}

/**
 * Magnetic hover — the element drifts toward the cursor as it enters its
 * bounding box, then springs back when the cursor leaves.
 *
 * Implementation:
 *   - track raw cursor offset relative to the element's center,
 *   - feed it through a soft spring so motion never feels twitchy,
 *   - clamp the output range to `strength` px in each direction.
 *
 * Rendered as a motion.a so it can wrap CTAs without a wrapper hop.
 */
export function MagneticLink({
  children,
  className,
  strength = 14,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  // Raw motion values driven by pointer move.
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring smoothing — the larger the damping, the more "lazy" the pull.
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 })

  // Clamp the spring output to ±strength so we can compute from raw -0.5..0.5.
  const tx = useTransform(springX, [-0.5, 0.5], [-strength, strength])
  const ty = useTransform(springY, [-0.5, 0.5], [-strength, strength])

  return (
    <motion.a
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: tx, y: ty }}
      onPointerMove={(event) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const normX = (event.clientX - rect.left) / rect.width - 0.5
        const normY = (event.clientY - rect.top) / rect.height - 0.5
        x.set(normX)
        y.set(normY)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      {...props}
    >
      {children}
    </motion.a>
  )
}
