export interface ProjectCardData {
  title:      string
  tags:       string[]
  overview:   string
  thumbnail?: string
  hasDetail?: boolean   // true if clicking opens a PRD slideshow or case study
  detailLabel?: string  // chip text, e.g. "Project Details ↗" or "Case Study ↗"
}

export default function ProjectCard({ project, num, onClick }: {
  project: ProjectCardData
  num: string
  onClick: () => void
}) {
  const hasThumbnail = !!project.thumbnail

  return (
    <button
      onClick={onClick}
      className={[
        'group relative block text-left w-full h-full p-0',
        'overflow-hidden border-0 cursor-none',
        'bg-bg-base hover:bg-bg-surface2',
        'transition-colors duration-300',
      ].join(' ')}
      aria-label={`Open ${project.title}`}
    >
      <div className="relative z-10 flex flex-col gap-4 h-full p-9">
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

        <span className="font-mono text-2xs tracking-[0.2em] text-electric opacity-50">
          {num}
        </span>

        <h3 className="font-display text-[1.25rem] tracking-[-0.01em] leading-snug text-text-primary pr-8">
          {project.title}
        </h3>

        <p className="font-mono text-sm leading-[1.9] text-text-secondary text-pretty">
          {project.overview}
        </p>

        {/* Thumbnail */}
        {hasThumbnail && (
          <div className="relative w-full aspect-16/10 overflow-hidden rounded-xs border border-border">
            <img
              src={project.thumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
          {project.hasDetail && (
            <span className="chip chip--accent">
              {project.detailLabel ?? 'View Details ↗'}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
