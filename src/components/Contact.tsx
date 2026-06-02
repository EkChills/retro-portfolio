import { motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { contact } from '~/lib/data'
import { easeOutExpo } from '~/lib/motion'

/**
 * Contact — rendered as a faux dark terminal.
 *
 * Highlights:
 *   - command lines animate in with a typing cursor delay,
 *   - form submit opens the user's default mail client with body pre-filled,
 *   - keyboard focus rings adopt the green prompt accent for cohesion.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="border-y-[3px] border-fg bg-fg-alt px-5 py-16 md:px-10 md:py-24 lg:py-[100px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        className="mx-auto max-w-[980px] overflow-hidden border-hard bg-term-bg font-mono text-term-fg shadow-hard-lg"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-term-divider bg-term-panel px-5 py-3.5">
          <div className="flex gap-2">
            <span className="h-3.5 w-3.5 rounded-full border-[2px] border-fg bg-term-red" />
            <span className="h-3.5 w-3.5 rounded-full border-[2px] border-fg bg-term-yellow" />
            <span className="h-3.5 w-3.5 rounded-full border-[2px] border-fg bg-term-emerald" />
          </div>
          <div className="text-[13px] font-semibold tracking-wide text-term-comment">
            ekene@portfolio: ~/contact
          </div>
          <div className="w-[42px]" />
        </div>

        {/* Body */}
        <div className="px-6 py-10 md:px-12 md:py-10">
          <TerminalLine delay={0.05}>
            <Prompt /> <Command>cat contact.txt</Command>
          </TerminalLine>

          <div className="mt-6 space-y-6">
            <TerminalLine delay={0.2}>
              <Label>$ whoami</Label>
              <br />
              <Output>{contact.whoami}</Output>
            </TerminalLine>

            <TerminalLine delay={0.35}>
              <Label>$ contact</Label>
              <br />
              <Output>email: </Output>
              <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
              <br />
              <Output>phone: </Output>
              <Link href={`tel:${contact.phoneTel}`}>{contact.phone}</Link>
              <br />
              <Output>github: </Output>
              <Link href={contact.github.href} external>
                {contact.github.label}
              </Link>
              <br />
              <Output>status: </Output>
              <span className="border-b border-dashed border-term-green pb-px text-term-green">
                {contact.status}
              </span>
            </TerminalLine>
          </div>

          <Divider />

          <TerminalLine delay={0.55}>
            <Prompt /> <Command>./send_message.sh</Command>
          </TerminalLine>

          <ContactForm />

          <Divider />

          <div className="text-[15px] leading-[1.9]">
            <Prompt />{' '}
            <span
              aria-hidden
              className="ml-1 inline-block h-[18px] w-2.5 align-middle bg-term-green animate-blink"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* Terminal atoms                                                    */
/* ---------------------------------------------------------------- */
function TerminalLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: easeOutExpo }}
      className="text-[15px] leading-[1.9]"
    >
      {children}
    </motion.div>
  )
}

const Prompt = () => (
  <span className="font-bold text-term-green">ekene@portfolio:~$</span>
)
const Command = ({ children }: { children: React.ReactNode }) => (
  <span className="text-term-fg">{children}</span>
)
const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold text-term-orange">{children}</span>
)
const Output = ({ children }: { children: React.ReactNode }) => (
  <span className="text-term-comment">{children}</span>
)
const Link = ({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: React.ReactNode
}) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    className="border-b border-dashed border-term-blue pb-px text-term-blue transition-colors hover:border-term-green hover:text-term-green"
  >
    {children}
  </a>
)
const Divider = () => <hr className="my-8 border-0 bg-term-divider h-px" />

/* ---------------------------------------------------------------- */
/* Form                                                              */
/* ---------------------------------------------------------------- */
function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.6, ease: easeOutExpo }}
      className="mt-6"
    >
      <div className="mb-5 grid gap-5 md:grid-cols-2">
        <Field
          label="name"
          id="f-name"
          value={name}
          onChange={setName}
          placeholder="your name"
        />
        <Field
          label="email"
          id="f-email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@domain.com"
        />
      </div>

      <Field
        label="message"
        id="f-msg"
        textarea
        value={message}
        onChange={setMessage}
        placeholder="what's on your mind?"
      />

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <motion.button
          type="submit"
          whileHover={{ x: -2, y: -2 }}
          whileTap={{ x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="inline-flex items-center gap-2.5 border-[2px] border-term-green bg-term-green px-6 py-3 font-mono text-sm font-bold text-term-bg transition-colors hover:bg-term-bg hover:text-term-green hover:shadow-[4px_4px_0_var(--color-term-green)]"
        >
          [ send ] → open mail client
        </motion.button>
        <span className="text-xs text-term-comment">
          // submit opens your default mail app with the message pre-filled
        </span>
      </div>
    </motion.form>
  )
}

/* ---------------------------------------------------------------- */
/* Form field                                                        */
/* ---------------------------------------------------------------- */
type FieldProps = {
  label: string
  id: string
  value: string
  onChange: (next: string) => void
  placeholder?: string
  type?: string
  textarea?: boolean
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea,
}: FieldProps) {
  const className =
    'w-full border-[2px] border-term-border bg-term-input px-4 py-3 font-mono text-sm text-term-fg outline-none transition-all duration-150 focus:border-term-green focus:bg-term-bg focus:shadow-[0_0_0_3px_rgba(126,231,135,0.15)]'

  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-[1.5px] text-term-orange">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className={`${className} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className={className}
        />
      )}
    </label>
  )
}
