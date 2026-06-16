import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ProjectDetail {
  num:        string
  title:      string
  tags:       string[]
  overview:   string
  // Standard content sections (used for most projects)
  sections?:  { heading: string; body: string }[]
  links?:     { label: string; href: string }[]
  prdImages?: string[]   // array of image src paths
  prdAlt?:    string     // single alt text prefix 
}

interface ProjectModalProps {
  project:  ProjectDetail | null
  onClose:  () => void
}

// ─── Close button ─────────────────────────────────────────────────────────────
function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close project"
      className={[
        'cursor-none flex-shrink-0',
        'w-9 h-9 flex items-center justify-center',
        'border border-[rgba(255,255,255,0.13)] rounded-xs',
        'text-text-secondary',
        'transition-all duration-[200ms]',
        'hover:border-[rgba(255,255,255,0.3)] hover:text-text-primary',
        'active:scale-95',
      ].join(' ')}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="1" y1="1" x2="11" y2="11" />
        <line x1="11" y1="1" x2="1" y2="11" />
      </svg>
    </button>
  )
}

// ─── PRD Slideshow ────────────────────────────────────────────────────────────
// Images stacked with zero gap — creates the illusion of a single long page.
// Pointer events disabled so images are not clickable / selectable.
function PrdSlideshow({ images, altPrefix }: { images: string[]; altPrefix: string }) {
  return (
    <div className="flex flex-col w-full" style={{ gap: 0 }}>
      {images.map((src, i) => (
        <div
          key={i}
          className="w-full select-none"
          style={{ lineHeight: 0, pointerEvents: 'none', userSelect: 'none' }}
          aria-hidden={i > 0}   // only announce first slide to screen readers
        >
          <img
            src={src}
            alt={i === 0 ? altPrefix : ''}
            draggable={false}
            className="w-full block"
            style={{ pointerEvents: 'none', display: 'block', margin: 0, padding: 0 }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Standard content ─────────────────────────────────────────────────────────
function StandardContent({ project }: { project: ProjectDetail }) {
  return (
    <div className="flex flex-col gap-10 px-8 py-10 md:px-12 md:py-12">

      {/* Overview */}
      <p className="font-(--font-serif) text-[1.125rem] leading-[1.75] text-text-secondary" style={{ fontStyle: 'italic' }}>
        {project.overview}
      </p>

      {/* Sections */}
      {project.sections?.map(({ heading, body }) => (
        <div key={heading} className="flex flex-col gap-3 pt-8 border-t border-[rgba(255,255,255,0.07)]">
          <p className="text-[0.625rem] font-light tracking-[0.28em] uppercase text-electric">
            {heading}
          </p>
          <p className="text-[0.75rem] font-light leading-[1.95] text-text-secondary">
            {body}
          </p>
        </div>
      ))}

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex gap-3 flex-wrap pt-8 border-t border-[rgba(255,255,255,0.07)]">
          {project.links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'cursor-none text-[0.6875rem] font-bold tracking-[0.12em] uppercase',
                'px-6 py-3 rounded-xs',
                'bg-accent text-(--color-text-inverse)',
                'transition-all duration-200',
                'hover:bg-text-primary hover:scale-[1.02]',
                'active:scale-[0.97]',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const isOpen      = project !== null

  // ── Keyboard close ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // ── Body scroll lock ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow   = 'hidden'
      document.body.style.position   = 'fixed'
      document.body.style.top        = `-${scrollY}px`
      document.body.style.width      = '100%'
      return () => {
        document.body.style.overflow  = ''
        document.body.style.position  = ''
        document.body.style.top       = ''
        document.body.style.width     = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  // ── Reset scroll position when project changes ──────────────────────────────
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [project?.num, isOpen])

  // ── Focus trap (simple) ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, a[href], [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const trap  = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    first?.focus()
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [isOpen])

  // ── Click backdrop to close ─────────────────────────────────────────────────
  const onBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }, [onClose])

  const isPrd = !!(project?.prdImages && project.prdImages.length > 0)

  // ── Portal render ───────────────────────────────────────────────────────────
  return createPortal(
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onBackdropClick}
        aria-hidden="true"
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-[6px]"
        style={{
          opacity:    isOpen ? 1 : 0,
          transition: 'opacity 350ms cubic-bezier(0,0,0.2,1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project?.title ?? 'Project detail'}
        ref={panelRef}
        className={[
          'fixed z-[201]',
          'top-1/2 left-1/2',
          'w-[min(680px,calc(100vw-2rem))]',
          'bg-[var(--color-bg-surface)] flex flex-col',
          'shadow-[0_32px_80px_rgba(0,0,0,0.7)]',
          'rounded-[2px]',
        ].join(' ')}
        style={{
          maxHeight:  '88dvh',
          transform:  isOpen
            ? 'translate(-50%, -50%)'
            : 'translate(-50%, calc(-50% + 20px))',
          opacity:    isOpen ? 1 : 0,
          transition: 'transform 420ms cubic-bezier(0,0,0.2,1), opacity 350ms cubic-bezier(0,0,0.2,1)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        // Desktop overrides via inline — panel always slides from right on md+
      >
        {/* ── Sticky header ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-start justify-between gap-4 px-8 py-6 md:px-10 border-b border-[rgba(255,255,255,0.07)] bg-[var(--color-bg-surface)]">
          <div className="flex flex-col gap-1.5 min-w-0">
            <p className="text-[0.5625rem] font-light tracking-[0.28em] uppercase text-[var(--color-electric)]">
              {project?.num}
            </p>
            <h2 className="font-[var(--font-display)] text-[1.25rem] font-bold tracking-[-0.01em] leading-snug text-[var(--color-text-primary)] truncate">
              {project?.title}
            </h2>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project?.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[0.5625rem] font-light tracking-[0.1em] uppercase px-2 py-0.5 border border-[rgba(255,255,255,0.13)] rounded-[2px] text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>

        {/* ── Scrollable body ───────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
        >
          {project && (
            isPrd
              ? (
                <>
                  {/* PRD overview above the slides */}
                  {project.overview && (
                    <div className="px-8 py-4 md:px-6 border-b border-[rgba(255,255,255,0.07)]">
                      <p className="font-(--font-serif) text-[1rem] leading-[1.75] text-text-secondary">
                        {project.overview}
                      </p>
                    </div>
                  )}

                  {/* Flush image stack — no gaps between slides */}
                  <PrdSlideshow
                    images={project.prdImages!}
                    altPrefix={project.prdAlt ?? project.title}
                  />
                </>
              )
              : <StandardContent project={project} />
          )}

          {/* Bottom padding so last content doesn't sit flush against edge */}
          <div className="h-16" />
        </div>

        {/* ── Sticky footer ─────────────────────────────────── */}
        <div className="shrink-0 border-t border-border px-8 py-4 md:px-10 flex items-center justify-between bg-bg-surface">
          <button
            onClick={onClose}
            className="cursor-none text-[0.625rem] font-light tracking-[0.2em] uppercase text-text-secondary bg-transparent border-0 p-0 transition-colors duration-200 hover:text-[var(--color-text-primary)]"
          >
            ← Back
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}