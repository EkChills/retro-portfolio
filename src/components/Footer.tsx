import { motion } from 'motion/react'
import { footer } from '~/lib/data'

/**
 * Footer — primary brand band with copyright + social links.
 * Links lift on hover with a small underline reveal for polish.
 */
export function Footer() {
  return (
    <footer className="border-t-[3px] border-fg bg-primary px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div className="font-display text-sm text-fg-light">{footer.copy}</div>

        <div className="flex gap-4">
          {footer.links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="rounded-[8px] border-[2px] border-transparent px-4 py-2 text-sm font-extrabold text-fg-light transition-colors hover:border-fg hover:bg-fg-light hover:text-primary"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
