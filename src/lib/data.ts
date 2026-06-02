/**
 * Portfolio content — the single source of truth for the entire page.
 *
 * Keeping copy out of components lets us:
 *   - swap content without touching JSX,
 *   - keep components tiny + presentational,
 *   - hand the file off as a CMS schema later if needed.
 */

export type NavLink = {
  label: string
  href: string
  cta?: boolean
}

export const nav: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Get in Touch', href: '#contact', cta: true },
]

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
export const hero = {
  eyebrow: 'Available for opportunities',
  heading: {
    lines: ['Frontend', 'Engineer.'],
    highlight: 'Ekene Ezeifeoma.',
  },
  description:
    'I craft scalable, high-performance web applications with Angular, React, and TypeScript. 3+ years shipping production-ready UIs at SystemSpecs and beyond.',
  primaryCta: { label: "Let's work together", href: '#contact' },
  secondaryCta: { label: 'View experience', href: '#experience' },
  meta: [
    { value: '3+', label: 'Years building' },
    { value: '2', label: 'Companies' },
    { value: '10+', label: 'Technologies' },
  ],
  cards: [
    {
      label: 'Current Role',
      tone: 'surface' as const,
      rows: ['SystemSpecs / Remita', 'Frontend Engineer', 'Lagos, Nigeria'],
    },
    {
      label: 'Focus Areas',
      tone: 'secondary' as const,
      rows: ['Angular & React', 'TypeScript', 'UI Architecture'],
    },
    {
      label: 'Status',
      tone: 'primary' as const,
      rows: ['Open to roles', 'Available now'],
    },
  ],
}

/* ---------------------------------------------------------------- */
/* About                                                             */
/* ---------------------------------------------------------------- */
export const about = {
  label: 'About Me',
  title: 'Building the web, one pixel at a time',
  paragraphs: [
    "I'm a Frontend Engineer based in Lagos, Nigeria, with 3+ years of experience building and maintaining scalable web applications. I specialize in Angular, React, and TypeScript, with a strong focus on frontend architecture and component-driven development.",
    "At SystemSpecs (Remita), I architect reusable UI libraries and build internal tools serving enterprise clients. I've shipped production features across fintech, AI-powered productivity tools, and learning management systems.",
    "I believe in clean code, performance optimization, and seamless collaboration. When I'm not coding, I'm exploring fintech trends or building side projects.",
  ],
  stats: [
    { value: '3+', label: 'Years Exp.' },
    { value: '2', label: 'Companies' },
    { value: '6+', label: 'Projects' },
    { value: '10+', label: 'Tech Stack' },
  ],
}

/* ---------------------------------------------------------------- */
/* Experience                                                        */
/* ---------------------------------------------------------------- */
export type Experience = {
  company: string
  role: string
  period: string
  location: string
  project: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    company: 'SystemSpecs',
    role: 'Frontend Engineer',
    period: 'Mar 2024 — Present',
    location: 'Lagos, Nigeria',
    project: 'Remita Payment Services',
    bullets: [
      'Built and maintained scalable frontend apps using Angular, React, and TypeScript with focus on modular architecture and performance',
      'Architected a reusable Angular-based UI library enabling consistent deployment across multiple internal and enterprise applications',
      'Developed a full-featured internal LMS including course enrollment, progress tracking, assessments, and analytics dashboards',
      'Integrated RESTful APIs for financial data querying and reporting tools, improving access to business insights',
      'Implemented real-time features using WebSockets for low-latency user interactions across conversational and dashboard systems',
      'Collaborated with backend and DevOps teams to ensure reliable data flow and production stability',
    ],
  },
  {
    company: 'Qucoon',
    role: 'Software Engineer',
    period: 'Sep 2022 — May 2023',
    location: 'Lagos, Nigeria',
    project: 'Internal Systems and Tools',
    bullets: [
      'Developed and maintained responsive web applications using Vue.js, TypeScript, and Tailwind CSS',
      'Integrated RESTful APIs built with Kotlin for employee onboarding and internal management systems',
      'Built an internal asset tracking system to manage hardware inventory, improving visibility and reducing allocation delays',
      'Designed and documented a reusable component library using Storybook, accelerating frontend development across products',
    ],
  },
]

/* ---------------------------------------------------------------- */
/* Skills                                                            */
/* ---------------------------------------------------------------- */
export type SkillGroup = { title: string; tags: string[] }

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend and UI',
    tags: [
      'React',
      'Next.js',
      'Angular',
      'Vue.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'React Native',
      'Expo',
      'Storybook',
    ],
  },
  {
    title: 'Testing and Quality',
    tags: ['Playwright', 'Cypress', 'Jest', 'React Testing Library', 'E2E Testing'],
  },
  {
    title: 'DevOps and Tools',
    tags: ['Git', 'GitHub Actions', 'CI/CD', 'Docker', 'Figma'],
  },
  {
    title: 'Backend Exposure',
    tags: ['NestJS', 'Node.js', 'Golang', 'Kotlin', 'Prisma ORM', 'REST APIs'],
  },
  {
    title: 'AI and Productivity',
    tags: ['Claude Code', 'GitHub Copilot', 'Agentic Workflows'],
  },
]

/* ---------------------------------------------------------------- */
/* Contact / Footer                                                  */
/* ---------------------------------------------------------------- */
export const contact = {
  email: 'ekeneezeifeomasam27@gmail.com',
  phone: '+234 916 442 0900',
  phoneTel: '+2349164420900',
  github: { label: 'github.com/ekchills', href: 'https://github.com/ekchills' },
  status: 'open to opportunities',
  whoami: 'Frontend Engineer @ SystemSpecs (Remita) — Lagos, Nigeria',
}

export const footer = {
  copy: `© ${new Date().getFullYear()} Ekene Ezeifeoma. All rights reserved.`,
  links: [
    { label: 'GitHub', href: contact.github.href, external: true },
    { label: 'Email', href: `mailto:${contact.email}`, external: false },
  ],
}
