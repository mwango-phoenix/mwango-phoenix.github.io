import { useState } from 'react'
import ProjectModal, { type ProjectDetail } from '../components/ProjectModal'
import ProjectCard from '../components/ProjectCard'
import { fitkit, luminate, campusEats } from '../assets/projects'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string
  desc: string
  tags: string[]
  thumbnail?: string
  links?: { label: string; href: string }[]
  prdImages?: string[]
  prdAlt?: string
}


// ─── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    title: 'FitKit',
    desc: 'A multi-sport workout planning platform with structured plans, gym workout builders, and cardio tools. This project dives into the research, UX design, and technical architecture building a unified fitness platform for many needs.',
    tags: ['TypeScript', 'React Native', 'Figma', 'Mobile Development'],
    thumbnail: fitkit.thumbnail,
    prdImages: fitkit.prd,
    prdAlt: 'FitKit document',
    links: [{ label: 'View Figma', href: 'https://www.figma.com/design/vuFJKkrqU7ovBCDRUmCkmq/FitKit?node-id=31-849&t=bt5MaSsm25D0qhgH-1' }, { label: 'View GitHub', href: 'https://github.com/mwango-phoenix/FitKit'}],
  },
  {
    title: 'Luminate',
    desc: 'A community-driven platform that re-imagines online art challenges as inspiring creative experiences.',
    tags: ['Figma', 'UI/UX Design', 'Web Development'],
    thumbnail: luminate.thumbnail,
    prdImages: luminate.prd,
    prdAlt: 'Luminate document',
    links: [{ label: 'View Figma', href: 'https://www.figma.com/design/hOAKAkKE7tkDBcRk8tjbTJ/Luminate?node-id=0-1&t=bt5MaSsm25D0qhgH-1' }],
  },
  {
    title: 'CampusEats',
    desc: 'A food ordering app built for campus dining halls and cafes, surfacing full nutrition facts alongside every menu item so students can order confidently and eat with intention.',
    tags: ['Figma', 'UI/UX Design', 'Mobile Development'],
    thumbnail: campusEats.thumbnail,
    prdImages: campusEats.prd,
    prdAlt: 'CampusEats document',
  },
]

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
              thumbnail: project.thumbnail,
              links: project.links,
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
