import { motion } from 'motion/react'
import { skillGroups, type SkillGroup } from '~/lib/data'
import { Reveal } from '~/components/Reveal'
import { SectionLabel } from '~/components/SectionLabel'
import { easeOutBack, stagger, tagPop } from '~/lib/motion'

/**
 * Skills — five capability buckets, each rendered as a tag cloud.
 *
 * Animations:
 *   - whole grid uses scroll-triggered stagger,
 *   - tags inside each card pop in with a back-ease for a satisfying snap,
 *   - hover swaps the chip to the primary palette and lifts it by 2px.
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y-[3px] border-fg bg-secondary px-5 py-16 md:px-10 md:py-24 lg:py-[100px]"
    >
      {/* Subtle dotted backdrop to keep the yellow band from feeling flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,rgba(26,26,26,0.5)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel tone="invert">Tech Stack</SectionLabel>
        </Reveal>
        <Reveal as="h2" className="mb-4 font-display text-[clamp(36px,6vw,56px)] leading-[1.1] text-fg-alt">
          Tools of the trade
        </Reveal>
        <Reveal as="p" delay={0.1} className="mb-12 max-w-[700px] text-lg font-semibold leading-[1.6] text-fg-alt">
          A toolkit sharpened across fintech, AI, and enterprise software.
          These are the technologies I reach for daily to ship fast, scalable,
          and maintainable interfaces.
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.05, 0.1)}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Skill card                                                        */
/* ---------------------------------------------------------------- */
function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: easeOutBack },
        },
      }}
      whileHover={{ x: -3, y: -3 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="border-hard bg-surface p-7 shadow-hard transition-shadow hover:shadow-[7px_7px_0_var(--color-border)] md:p-8"
    >
      <h3 className="mb-5 inline-block border-hard-2 bg-surface-alt px-3.5 py-1.5 font-display text-sm uppercase tracking-[2px] text-primary">
        {group.title}
      </h3>

      <motion.div
        variants={stagger(0.05, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-wrap gap-2.5"
      >
        {group.tags.map((tag) => (
          <motion.span
            key={tag}
            variants={tagPop}
            whileHover={{ y: -2, scale: 1.02 }}
            className="cursor-default rounded-[8px] border-hard-2 bg-bg px-4 py-2 text-[13px] font-bold text-fg-alt transition-colors hover:border-fg hover:bg-primary hover:text-fg-light"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
