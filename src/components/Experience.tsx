import { motion } from 'motion/react'
import { experiences, type Experience } from '~/lib/data'
import { BackgroundText } from '~/components/BackgroundText'
import { Parallax } from '~/components/Parallax'
import { Reveal } from '~/components/Reveal'
import { SectionLabel } from '~/components/SectionLabel'
import { easeOutExpo, stagger } from '~/lib/motion'

/**
 * Experience — a vertical list of role cards.
 *
 * Each card animates in via Reveal, then the bullet list inside fires its
 * own stagger on first view, so the eye moves down naturally rather than
 * being hit with a wall of text at once. A parallaxed ghost word drifts
 * across the section background, tying it visually to About.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24 lg:py-[100px]"
    >
      {/* Parallaxed ghost word — pans the opposite direction from About so */}
      {/* the page rhythm alternates as the reader scrolls.                  */}
      <BackgroundText
        direction="right"
        distance={280}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        textClassName="text-fg-alt/[0.04]"
      >
        EXPERIENCE
      </BackgroundText>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel>Experience</SectionLabel>
        </Reveal>
        <Reveal as="h2" className="mb-12 font-display text-[clamp(36px,6vw,56px)] leading-[1.1] text-fg-alt">
          Where I've been building
        </Reveal>

        <div className="flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp.company} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Card                                                              */
/* ---------------------------------------------------------------- */
function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  // Alternate parallax direction per card. Even cards rise slightly while
  // odd cards fall — the cards visually slide past each other as the user
  // scrolls the list, adding depth without breaking readability.
  const parallaxSpeed = index % 2 === 0 ? 0.15 : -0.15

  return (
    <Parallax speed={parallaxSpeed}>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: easeOutExpo,
        }}
        whileHover={{ x: -4, y: -4 }}
        className="border-hard bg-surface p-7 shadow-hard transition-shadow hover:shadow-[8px_8px_0_var(--color-border)] md:p-10"
      >
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-10">
          {/* Meta column */}
          <div className="border-b-[3px] border-fg pb-6 md:border-b-0 md:border-r-[3px] md:pb-0 md:pr-10">
            <div className="mb-2 font-display text-sm uppercase text-primary">
              {experience.company}
            </div>
            <div className="mb-2 font-display text-[22px] text-fg-alt">
              {experience.role}
            </div>
            <div className="mb-2 inline-block rounded-[8px] border-hard-2 bg-surface-alt px-3 py-1 text-sm font-bold text-fg-muted">
              {experience.period}
            </div>
            <div className="text-sm font-bold text-fg-muted">
              {experience.location}
            </div>
          </div>

          {/* Content column */}
          <div>
            <h3 className="mb-5 font-display text-base uppercase tracking-[1px] text-accent">
              {experience.project}
            </h3>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger(0.1, 0.06)}
              className="flex flex-col gap-3.5"
            >
              {experience.bullets.map((bullet) => (
                <motion.li
                  key={bullet.slice(0, 30)}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.45, ease: easeOutExpo },
                    },
                  }}
                  className="relative pl-6 text-base font-semibold leading-[1.6] text-fg-alt"
                >
                  {/* Triangle marker — colored to brand */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 font-extrabold text-primary"
                  >
                    ▸
                  </span>
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.article>
    </Parallax>
  )
}
