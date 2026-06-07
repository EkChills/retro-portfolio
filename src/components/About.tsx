import { motion } from 'motion/react'
import { about } from '~/lib/data'
import { BackgroundText } from '~/components/BackgroundText'
import { CountUp } from '~/components/CountUp'
import { Reveal } from '~/components/Reveal'
import { SectionLabel } from '~/components/SectionLabel'
import { TiltCard } from '~/components/TiltCard'
import { easeOutExpo, fadeUp3D, stagger } from '~/lib/motion'

/**
 * About — narrative paragraphs + a 4-stat grid.
 *
 * Stats use the CountUp primitive: each number ticks from 0 → target the
 * moment the card scrolls into view, with a one-shot guard so subsequent
 * scrolls don't re-trigger.
 */
export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-bg-darker px-5 py-16 md:px-10 md:py-24 lg:py-[100px]"
    >
      {/* Parallaxed ghost word — sits behind everything, drifts left as the */}
      {/* section scrolls past. `overflow-hidden` on the section clips the   */}
      {/* outer edges so the text can be larger than the viewport.           */}
      <BackgroundText
        direction="left"
        distance={320}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        textClassName="text-fg-alt/[0.05]"
      >
        EZEIFEOMA
      </BackgroundText>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel>{about.label}</SectionLabel>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[3fr_2fr]">
          {/* Narrative */}
          <div>
            <Reveal as="h2" variants={fadeUp3D} className="mb-4 font-display text-[clamp(36px,6vw,56px)] leading-[1.1] text-fg-alt">
              {about.title}
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger(0.15, 0.1)}
              className="space-y-5"
            >
              {about.paragraphs.map((p) => (
                <motion.p
                  key={p.slice(0, 24)}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: easeOutExpo },
                    },
                  }}
                  className="text-[18px] font-semibold leading-[1.7] text-fg-alt"
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>

          {/* Stat cards — staggered scale-in */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger(0.2, 0.12)}
            className="grid grid-cols-2 gap-4"
          >
            {about.stats.map((stat) => {
              // Strip the trailing "+" so the count-up animates the raw number,
              // then re-append it as a suffix at render time.
              const numeric = parseInt(stat.value, 10)
              const suffix = stat.value.replace(/[0-9]/g, '')

              return (
                <TiltCard key={stat.label} maxTilt={10} shine={false}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 24 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: easeOutExpo },
                    },
                  }}
                  whileHover={{ x: -3, y: -3 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="border-hard bg-surface p-6 text-center shadow-hard transition-shadow hover:shadow-[7px_7px_0_var(--color-border)]"
                >
                  <div className="mb-1 font-display text-[36px] text-primary">
                    <CountUp to={numeric} suffix={suffix} duration={1.4} />
                  </div>
                  <div className="text-[13px] font-bold uppercase tracking-[1px] text-fg-muted">
                    {stat.label}
                  </div>
                </motion.div>
                </TiltCard>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
