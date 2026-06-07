import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useEffect, useState } from 'react'
import { cn } from '~/lib/cn'
import { nav } from '~/lib/data'
import { easeOutExpo } from '~/lib/motion'
import { MagneticLink } from '~/components/MagneticLink'

/**
 * Site navigation.
 *
 * Behaviour:
 *   1. Scroll-aware shell — after 20px of scroll the bar gains a translucent
 *      backdrop blur, simulating depth without a hard color jump.
 *   2. Burger ↔ X morph — three rotating bars inside a relatively-positioned
 *      track so transforms stay GPU-only.
 *   3. Mobile drawer — expands from below the bar with a staggered link
 *      reveal. Closes on link tap, on Escape, and on viewport widening to lg.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Track scroll without re-rendering the whole tree on every frame.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  /* ---------------------------------------------------------------- */
  /* Drawer lifecycle                                                  */
  /* ---------------------------------------------------------------- */
  // Close on Escape — small detail, expected behaviour for any drawer.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close on resize to ≥ lg so the drawer never lingers after a rotation.
  useEffect(() => {
    if (!open) return
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [open])

  // Lock body scroll while the drawer is open — keeps focus on the menu.
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  return (
    <motion.nav
      // Slide in on first mount — page-load polish.
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-[150] border-b-[3px] border-fg transition-all duration-300',
        scrolled
          ? 'bg-secondary/85 backdrop-blur-md shadow-[0_4px_0_-1px_rgba(26,26,26,0.08)]'
          : 'bg-secondary'
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-5 lg:px-10">
        {/* Logo ----------------------------------------------------- */}
        <motion.a
          href="#"
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="border-hard bg-primary px-4 py-1.5 font-display text-[22px] text-fg-alt shadow-hard-sm sm:text-[24px]"
        >
          EKENE.
        </motion.a>

        {/* Desktop links ------------------------------------------- */}
        <ul className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              {item.cta ? (
                <MagneticLink
                  href={item.href}
                  strength={10}
                  className="rounded-[8px] border-hard bg-primary px-6 py-2.5 font-body text-[15px] font-extrabold text-fg-light shadow-hard-sm transition-colors hover:bg-primary-dark"
                >
                  {item.label}
                </MagneticLink>
              ) : (
                <a
                  href={item.href}
                  className="rounded-[8px] border-[3px] border-transparent px-5 py-2.5 font-body text-[15px] font-bold text-fg-alt transition-all duration-150 hover:border-fg-alt hover:bg-fg-alt hover:text-fg-light"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Burger ---------------------------------------------------- */}
        {/* IMPORTANT: the button is `relative` so the absolutely-positioned */}
        {/* bars inside the inner track resolve against it, not the nav.    */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-11 w-11 place-items-center border-hard bg-fg-alt shadow-hard-sm transition-transform active:scale-95 lg:hidden"
        >
          {/* Inner track sets the relative coordinate space for the bars */}
          <span className="relative block h-4 w-5">
            {/* Top bar — drops to center + rotates 45° */}
            <motion.span
              className="absolute left-0 right-0 top-0 block h-[3px] origin-center bg-fg-light"
              animate={open ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            {/* Middle bar — fades + shrinks horizontally */}
            <motion.span
              className="absolute left-0 right-0 top-[6.5px] block h-[3px] bg-fg-light"
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            {/* Bottom bar — rises to center + rotates -45° */}
            <motion.span
              className="absolute bottom-0 left-0 right-0 block h-[3px] origin-center bg-fg-light"
              animate={open ? { y: -6.5, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer --------------------------------------------- */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-drawer"
            key="mobile-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden border-t-[3px] border-fg bg-secondary lg:hidden"
          >
            <ul className="flex flex-col gap-2 px-5 py-5">
              {nav.map((item, idx) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + idx * 0.06,
                    duration: 0.4,
                    ease: easeOutExpo,
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-[8px] border-hard px-5 py-3 font-body text-base font-extrabold transition-colors',
                      item.cta
                        ? 'bg-primary text-fg-light shadow-hard-sm'
                        : 'bg-surface text-fg-alt shadow-hard-sm'
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
