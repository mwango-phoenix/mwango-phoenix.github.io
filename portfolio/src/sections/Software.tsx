import { useState } from 'react'
import ProjectModal, { type ProjectDetail } from '../components/ProjectModal'
import fitkit1 from '../assets/fitkit/1.png'
import fitkit2 from '../assets/fitkit/2.png'
import fitkit3 from '../assets/fitkit/3.png'
import fitkit4 from '../assets/fitkit/4.png'
import luminate1 from '../assets/luminate/1.png'
import luminate2 from '../assets/luminate/2.png'
// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string
  desc: string
  tags: string[]
  wide?: boolean
  link?: string
  prdImages?: string[]
  prdAlt?: string
}


// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    title: 'FitKit',
    desc: 'A multi-sport workout planning platform with structured plans, gym workout builders, and cardio tools. This project dives into the research, UX design, and technical architecture building a unified fitness platform for many needs.',
    tags: ['TypeScript', 'React Native', 'Figma', 'Mobile Development'],
    wide: true,
    prdImages: [fitkit1, fitkit2, fitkit3, fitkit4],
    prdAlt: 'FitKit document',
  },
  {
    title: 'Luminate',
    desc: 'A community-driven platform that re-imagines online art challenges as inspiring creative experiences.',
    tags: ['WebGPU', 'WGSL', 'Three.js'],
    prdImages: [luminate1, luminate2],
    prdAlt: 'Luminate document',
  },
]

// ─── Card component ───────────────────────────────────────────────────────────
// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ project, num, onClick }: { project: ProjectDetail; num: string; onClick: () => void }) {
  const hasPrd = !!(project.prdImages && project.prdImages.length > 0)
 
  return (
    <button
      onClick={onClick}
      className={[
        'group relative text-left w-full h-full',
        'flex flex-col gap-4 p-9',
        'bg-bg-base overflow-hidden',
        'transition-colors duration-300',
        'hover:bg-bg-surface2',
        'cursor-none border-0',
      ].join(' ')}
      aria-label={`Open ${project.title}`}
    >
      {/* Sweep line */}
      <span
        className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,var(--color-electric),transparent)] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100"
        aria-hidden="true"
      />
 
      {/* Arrow */}
      <span
        className="absolute top-7 right-7 text-electric opacity-0 transition-all duration-250 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="12" x2="12" y2="2" />
          <polyline points="5,2 12,2 12,9" />
        </svg>
      </span>
 
      <span className="font-(--font-mono) text-2xs tracking-[0.2em] text-electric opacity-50">
        {num}
      </span>
 
      <h3 className="font-(--font-display) text-[1.25rem] tracking-[-0.01em] leading-snug text-text-primary pr-8">
        {project.title}
      </h3>
 
      <p className="font-(--font-mono) text-[0.75rem] leading-[1.9] text-text-secondary flex-1">
        {project.overview}
      </p>
 
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="font-(--font-mono) text-2xs tracking-[0.1em] uppercase px-2.5 py-1 border border-border-mid rounded-xs text-text-secondary">
            {tag}
          </span>
        ))}
        {hasPrd && (
          <span className="font-(--font-mono) text-2xs tracking-[0.1em] uppercase px-2.5 py-1 border border-[rgba(124,244,226,0.25)] rounded-xs text-electric">
            Project Details ↗
          </span>
        )}
      </div>
    </button>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState<ProjectDetail | null>(null)
  return (
    <section
      id="projects"
      className="relative z-10 bg-bg-surface border-t border-border py-24 md:py-32"
    >
      <div className="px-[clamp(1.5rem,4vw,3rem)] max-w-360 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16 reveal">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
              Projects
            </p>
            <h2 className="font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight">
              Things I've built
            </h2>
          </div>
          <p className="font-mono text-md font-light leading-[1.9] text-text-secondary max-w-95">
            Mostly software development or UI/UX, but I also have a background in 3D art and design. I turn ideas into experiences that people genuinely enjoy using.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {PROJECTS.map((project, i) => {
            const num = String(i + 1).padStart(2, '0')
            const projectDetail: ProjectDetail = {
              num,
              title: project.title,
              tags: project.tags,
              overview: project.desc,
              prdImages: project.prdImages,
              prdAlt: project.prdAlt,
            }
            return (
              <div
                key={num}
                className={[
                  'reveal',
                  i === 1 ? 'reveal-d1' : '',
                  i === 2 ? 'reveal-d2' : '',
                  i === 3 ? 'reveal-d1' : '',
                  i === 4 ? 'reveal-d2' : '',
                  project.wide ? 'md:col-span-2' : '',
                ].join(' ')}
              >
                <ProjectCard project={projectDetail} num={num} onClick={() => setActive(projectDetail)} />
              </div>
            )
          })}
        </div>

      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
