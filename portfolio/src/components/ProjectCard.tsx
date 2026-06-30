import { type ProjectDetail } from './ProjectModal'

export default function ProjectCard({ project, num, onClick }: {
  project: ProjectDetail
  num: string
  onClick: () => void
}) {
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
