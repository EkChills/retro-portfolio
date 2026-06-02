import type { Variants, Transition } from 'motion/react'

/**
 * Shared motion variants + easings.
 *
 * Every component imports from here so the page has *one* motion language:
 *   - the same ease curve everywhere,
 *   - the same enter distance,
 *   - the same stagger cadence,
 *   - the same hover-lift physics.
 *
 * That single-language consistency is what separates "agency grade" from
 * "the developer reached for framer-motion".
 */

/* ---------------------------------------------------------------- */
/* Easings                                                           */
/* ---------------------------------------------------------------- */
/**
 * Slightly overshot ease that feels mechanical but bouncy — pairs well
 * with the brutalist hard shadows. Values match Vercel's design system.
 */
export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1]
export const easeOutBack: Transition['ease'] = [0.34, 1.56, 0.64, 1]
export const easeInOut: Transition['ease'] = [0.65, 0, 0.35, 1]

/* ---------------------------------------------------------------- */
/* Entry — used by Reveal and one-off elements                       */
/* ---------------------------------------------------------------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

/* ---------------------------------------------------------------- */
/* Stagger containers                                                */
/* ---------------------------------------------------------------- */
/** Generic stagger container — children inherit timing from their own variant. */
export const stagger = (delay = 0, gap = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
})

/* ---------------------------------------------------------------- */
/* Hero text-reveal (per-line mask)                                  */
/* ---------------------------------------------------------------- */
/**
 * Heading lines slide up from inside a clipped mask. Mimics the "wipe"
 * reveal you see on Awwwards-tier portfolios — implemented with two
 * variants and a parent with overflow-hidden.
 */
export const lineMask: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: easeOutExpo },
  },
}

/* ---------------------------------------------------------------- */
/* Card hover physics                                                */
/* ---------------------------------------------------------------- */
/** The classic neo-brutalist press: nudge up-and-left, shadow grows. */
export const hoverPress = {
  whileHover: { x: -3, y: -3 },
  whileTap: { x: -1, y: -1, scale: 0.99 },
  transition: { type: 'spring', stiffness: 400, damping: 22 },
} as const

/* ---------------------------------------------------------------- */
/* Skill tag pop                                                     */
/* ---------------------------------------------------------------- */
export const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutBack },
  },
}

/* ---------------------------------------------------------------- */
/* Floating hero cards — continuous, subtle                          */
/* ---------------------------------------------------------------- */
export const float = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  },
})
