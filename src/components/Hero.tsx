import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { hero } from '~/lib/data'
import { easeOutExpo, float, lineMask, stagger } from '~/lib/motion'
import { Parallax } from '~/components/Parallax'
import { cn } from '~/lib/cn'

/**
 * Hero — the page's first impression.
 *
 * Composition:
 *   - parallax grid backdrop (slow Y-scroll transform)
 *   - eyebrow chip with a live pulse dot
 *   - 3-line heading where each line slides up inside its own mask
 *   - description, CTA pair, and stat bar
 *   - 3 floating cards tilted at competing angles, each with its own
 *     entry delay AND a continuous float loop
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax grid — moves a touch slower than the page itself, just enough
  // to give the background depth without making anyone seasick.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-bg px-5 pb-24 pt-[140px] lg:px-10 lg:pb-[100px]"
    >
      {/* Parallax grid backdrop */}
      <motion.div
        aria-hidden
        className="absolute inset-0 grid-backdrop"
        style={{ y: gridY, opacity: gridOpacity }}
      />

      {/* Soft radial wash anchored to the right — adds depth on big screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(circle_at_85%_30%,rgba(255,107,43,0.18),transparent_55%)]"
      />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Left column ------------------------------------------------ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1, 0.12)}
        >
          {/* Eyebrow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12, rotate: -1.5 },
              visible: {
                opacity: 1,
                y: 0,
                rotate: -1.5,
                transition: { duration: 0.6, ease: easeOutExpo },
              },
            }}
            className="mb-7 inline-flex items-center gap-2.5 border-hard bg-accent px-4 py-2 font-body text-xs font-extrabold uppercase tracking-[2.5px] text-fg-light shadow-hard-sm"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 rounded-full border-[2px] border-fg bg-success" />
              <motion.span
                aria-hidden
                className="h-2 w-2 rounded-full bg-success"
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />
            </span>
            {hero.eyebrow}
          </motion.div>

          {/* Heading — line-by-line mask reveal */}
          <h1 className="mb-7 font-display text-[clamp(52px,7vw,88px)] leading-[0.95] tracking-[-1.5px] text-fg-alt">
            {hero.heading.lines.map((line, idx) => (
              <span
                key={line}
                className="block overflow-hidden pb-1"
                aria-hidden={idx > 0 ? undefined : false}
              >
                <motion.span
                  className="block"
                  initial="hidden"
                  animate="visible"
                  variants={lineMask}
                  transition={{ delay: 0.25 + idx * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            {/* Highlight chip — also masked, slight rotation kept */}
            <span className="mt-2 block overflow-hidden">
              <motion.span
                className="inline-block -rotate-1 border-hard bg-primary px-4 text-fg-light shadow-hard"
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.9, ease: easeOutExpo }}
              >
                {hero.heading.highlight}
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.85, duration: 0.6, ease: easeOutExpo }}
            initial="hidden"
            animate="visible"
            className="mb-10 max-w-[540px] text-[19px] font-semibold leading-[1.55] text-fg-muted"
          >
            {hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 1.0, duration: 0.6, ease: easeOutExpo }}
            initial="hidden"
            animate="visible"
            className="mb-12 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href={hero.primaryCta.href}
              whileHover={{ x: -3, y: -3 }}
              whileTap={{ x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="inline-flex items-center gap-2.5 rounded-[12px] border-hard bg-primary px-8 py-4 font-body text-base font-extrabold text-fg-light shadow-hard transition-colors hover:bg-primary-dark"
            >
              {hero.primaryCta.label}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
            <motion.a
              href={hero.secondaryCta.href}
              whileHover={{ x: -3, y: -3 }}
              whileTap={{ x: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="inline-flex items-center gap-2.5 rounded-[12px] border-hard bg-bg px-8 py-4 font-body text-base font-extrabold text-fg-alt shadow-hard transition-colors hover:bg-surface-alt"
            >
              {hero.secondaryCta.label}
            </motion.a>
          </motion.div>

          {/* Stat row */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 1.15, duration: 0.6, ease: easeOutExpo }}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-8 border-t-[3px] border-fg pt-8"
          >
            {hero.meta.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-display text-[28px] leading-none text-fg-alt">
                  {m.value}
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-[1.5px] text-fg-muted">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — floating cards ----------------------------- */}
        <div className="relative h-[420px] w-full max-w-[500px] justify-self-center lg:h-[480px]">
          {hero.cards.map((card, idx) => (
            <FloatingCard key={card.label} card={card} index={idx} />
          ))}
        </div>
      </div>

      {/* Scroll hint — barely visible but lovely on big screens */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-extrabold uppercase tracking-[2px] text-fg-muted lg:flex"
      >
        <span>Scroll</span>
        <motion.span
          className="h-8 w-[2px] bg-fg-muted"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Floating card                                                     */
/* ---------------------------------------------------------------- */
type CardData = (typeof hero.cards)[number]

const positions = [
  // Top-left, slight CCW tilt
  'top-5 left-0 w-[240px] sm:w-[280px] -rotate-3 z-30',
  // Mid-right, CW tilt, pushed down
  'top-[140px] right-0 w-[220px] sm:w-[260px] rotate-[4deg] z-20',
  // Bottom-left, CCW tilt, sits on top of the stack
  'bottom-5 left-10 w-[200px] sm:w-[240px] -rotate-2 z-40',
]

// Each card gets a different parallax speed so they drift apart on scroll —
// the negative-speed card travels DOWN (foreground feel) while the others
// drift UP (background feel), producing depth without any 3D math.
const parallaxSpeeds = [0.35, -0.25, 0.5]

const tones: Record<CardData['tone'], string> = {
  surface: 'bg-surface text-fg-alt',
  secondary: 'bg-secondary text-fg-alt',
  primary: 'bg-primary text-fg-light',
}

function FloatingCard({ card, index }: { card: CardData; index: number }) {
  const isLight = card.tone === 'primary'

  return (
    // Outer Parallax owns the Y axis (drives `style.y` via useTransform).
    // The inner motion.div handles the entry + hover transforms — they
    // compose because Parallax only writes y/x/rotate, leaving scale free.
    <Parallax speed={parallaxSpeeds[index]} className={cn('absolute', positions[index])}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={float(0.4 + index * 0.18)}
        whileHover={{ scale: 1.05, transition: { duration: 0.4, ease: easeOutExpo } }}
        className={cn('border-hard p-5 shadow-hard-xl', tones[card.tone])}
      >
        <div
          className={cn(
            'mb-3 border-b-[2px] pb-2 font-display text-[11px] uppercase tracking-[2px]',
            isLight ? 'border-fg-light text-fg-light' : 'border-fg text-fg-alt'
          )}
        >
          {card.label}
        </div>
        <div className="flex flex-col gap-2">
          {card.rows.map((row) => (
            <div
              key={row}
              className={cn(
                'flex items-center gap-2.5 text-[13px] font-bold',
                isLight ? 'text-fg-light' : 'text-fg-alt'
              )}
            >
              <span
                className={cn(
                  'h-3 w-3 shrink-0 border-[2px]',
                  isLight ? 'border-fg-light' : 'border-fg'
                )}
              />
              <span>{row}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Parallax>
  )
}
