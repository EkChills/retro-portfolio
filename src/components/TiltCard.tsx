import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '~/lib/cn'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. Default 8. */
  maxTilt?: number
  /** Spring stiffness for the tilt. Default 300. */
  stiffness?: number
  /** Spring damping. Default 20. */
  damping?: number
  /** Show the cursor-following shine overlay. Default true. */
  shine?: boolean
  /** Shine overlay color. */
  shineColor?: string
}

/**
 * 3D tilt wrapper — tracks pointer position and applies perspective
 * rotation + a subtle gradient shine that follows the cursor.
 *
 * Uses `useMotionValue` + `useSpring` outside the React reconciler
 * for 60fps compositing. Respects `prefers-reduced-motion`.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
  stiffness = 300,
  damping = 20,
  shine = true,
  shineColor = 'rgba(255,255,255,0.12)',
}: TiltCardProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { stiffness, damping, mass: 0.4 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Map normalised 0..1 → degrees (top edge = +tilt, bottom = -tilt)
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt])

  // Shine gradient tracks cursor position
  const shineX = useTransform(springX, [0, 1], [0, 100])
  const shineY = useTransform(springY, [0, 1], [0, 100])

  // Opacity fades when cursor is near centre (0.5) and brightens at edges
  const shineOpacity = useTransform(
    springX,
    [0, 0.25, 0.5, 0.75, 1],
    [0.7, 0.3, 0, 0.3, 0.7],
  )

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  function handlePointerMove(e: React.PointerEvent) {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handlePointerLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="h-full w-full"
        style={{
          rotateX,
          rotateY,
          willChange: 'transform',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        {shine && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${shineColor}, transparent 60%)`,
              backgroundPosition: `${shineX}% ${shineY}%`,
              backgroundSize: '200% 200%',
              opacity: shineOpacity,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}
