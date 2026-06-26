import type React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillItem {
  id:    string
  label: string
  role:  string
  icon:  React.ReactNode
  tools: string[]
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconCube = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 2L20 7v8l-9 5-9-5V7L11 2Z" />
    <line x1="11" y1="2"  x2="11" y2="11" />
    <line x1="2"  y1="7"  x2="11" y2="11" />
    <line x1="20" y1="7"  x2="11" y2="11" />
  </svg>
)

const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="7,7 3,11 7,15" />
    <polyline points="15,7 19,11 15,15" />
    <line x1="13" y1="4.5" x2="9" y2="17.5" />
  </svg>
)

const IconDiamond = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 2L20 11L11 20L2 11L11 2Z" />
    <circle cx="11" cy="11" r="3" />
    <line x1="11" y1="2"  x2="11" y2="8"  />
    <line x1="20" y1="11" x2="14" y2="11" />
  </svg>
)

const IconPen = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3l4 4-10 10H5v-4L15 3Z" />
    <line x1="12" y1="6" x2="16" y2="10" />
    <line x1="5"  y1="18" x2="2" y2="20" />
  </svg>
)

const IconPeople = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8"  cy="7"  r="3" />
    <circle cx="15" cy="8"  r="2.5" />
    <path d="M2 19c0-3.314 2.686-5 6-5s6 1.686 6 5" />
    <path d="M15 13c2.5 0 5 1.2 5 4" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILLS: SkillItem[] = [
  {
    id:    'blender',
    label: '3D & Animation',
    role:  'Character Animator / Technical Artist',
    icon:  <IconCube />,
    tools: ['Character rigging & skinning', 'Keyframe animation', 'UV mapping', 'Sculpting'],
  },
  {
    id:    'fullstack',
    label: 'Full-Stack Dev',
    role:  'Staff Software Engineer',
    icon:  <IconCode />,
    tools: ['TypeScript & React', 'Node.js & Python','System design', 'Code review & mentorship', 'Next.js & Vite'],
  },
  {
    id:    'product',
    label: 'Product Design',
    role:  'UI/UX Designer',
    icon:  <IconDiamond />,
    tools: ['Figma', 'Design systems', 'User research', 'Wireframing & prototyping', 'Accessibility'],
  },
  {
    id:    'brand',
    label: 'Brand Design',
    role:  'Brand Designer',
    icon:  <IconPen />,
    tools: ['Visual identity systems', 'Adobe Illustrator', 'Mascot design', 'Logo design'],
  },
  {
    id:    'soft',
    label: 'Soft Skills',
    role:  'Interpersonal Abilities',
    icon:  <IconPeople />,
    tools: ['Communication', 'Leadership & Mentorship', 'Cross-functional Collaboration', 'Problem Solving'],
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────
function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-8 h-full bg-bg-base border border-border">

      <span className="text-electric">{skill.icon}</span>

      <div className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-base font-bold tracking-tight text-text-primary">
            {skill.label}
          </h3>
          <p className="font-mono text-2xs font-light text-electric opacity-70 tracking-label uppercase">
            {skill.role}
          </p>
        </div>

        <ul className="flex flex-col list-none">
          {skill.tools.map(tool => (
            <li key={tool} className="font-mono text-xs font-light text-text-secondary">
              {tool}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section id="skills" className="relative z-10 border-t border-border">
      <div className="px-[clamp(1.5rem,4vw,3rem)] py-24 md:py-32 max-w-360 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-16">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
              Skills
            </p>
            <h2 className="font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight">
              Tools & Disciplines
            </h2>
          </div>
          <p className="font-mono text-md font-light leading-[1.9] text-text-secondary max-w-95">
            A mix of creative and technical disciplines, developed through personal projects, experimentation, and shipped work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          {SKILLS.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

      </div>
    </section>
  )
}
