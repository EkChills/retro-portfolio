import { motion, useScroll, useSpring } from 'motion/react'

/**
 * Thin, brand-coloured progress bar pinned to the very top of the viewport.
 * Drives off `useScroll().scrollYProgress` and a soft spring so the bar
 * doesn't feel jittery against the page's smooth-scroll behaviour.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[200] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  )
}
