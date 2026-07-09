import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AssetSlotProps {
  title:    string
  hint?:    string
  variant?: 'mobile' | 'desktop'
  dark?:    boolean
  icon?:    string
  src?:     string
  isVideo?: boolean
}

export interface CaseStudyMeta {
  eyebrowLabel: string   // header title, e.g. "Budget Buoy"
  metaLine:     string   // header subline, e.g. "Product design · Mobile · 2026"
  ariaLabel:    string   // accessible dialog label
}

interface CaseStudyModalProps {
  isOpen:   boolean
  onClose:  () => void
  meta:     CaseStudyMeta
  children: ReactNode
}

// ─── Reusable building blocks (used by individual case-study content files) ───
export function AssetSlot({ title, hint, variant = 'desktop', dark, icon, src, isVideo }: AssetSlotProps) {
  const isMobile = variant === 'mobile'
  return (
    <div className={isMobile ? 'mt-7 flex justify-center' : 'mt-7'}>
    <div
      className={[
        'relative rounded-xs overflow-hidden',
        isMobile ? 'w-[250px] aspect-9/18' : 'w-full aspect-video',
        dark
          ? 'border border-[oklch(35%_0.01_250)] bg-[oklch(22%_0.015_250)]'
          : 'border border-dashed border-[rgba(255,255,255,0.12)] bg-bg-surface2',
      ].join(' ')}
    >

      {src ? (
        isVideo ? (
          <video
            src={src}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      ) : (
        /* Placeholder body */
        <div className="flex flex-col items-center justify-center gap-2 p-8 min-h-[180px] text-center">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-[rgba(124,244,226,0.1)] flex items-center justify-center text-electric text-lg">
              {icon}
            </div>
          )}
          <p className={['text-sm m-0', dark ? 'text-[oklch(90%_0_0)]' : 'text-text-primary'].join(' ')}>
            {title}
          </p>
          {hint && (
            <p className={['text-xs leading-relaxed m-0 max-w-[28ch]', dark ? 'text-[oklch(65%_0.01_250)]' : 'text-text-secondary'].join(' ')}>
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
export function Section({ children, dark, center, className = '' }: {
  children: ReactNode
  dark?:    boolean
  center?:  boolean
  className?: string
}) {
  return (
    <div
      className={[
        'px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,72px)]',
        'border-b border-border last:border-b-0',
        dark   ? 'bg-bg-surface3 text-text-primary' : '',
        center ? 'text-center' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

// ─── Shared typography pieces ─────────────────────────────────────────────────
export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-(--font-mono) text-[0.6875rem] tracking-[0.1em] uppercase text-electric m-0 mb-4">
    {children}
  </p>
)

export const H1 = ({ children }: { children: ReactNode }) => (
  <h1
    className={[
      'font-(--font-display) leading-[1.08] tracking-[-0.025em] m-0 mb-4',
      'text-[clamp(28px,4vw,44px)] text-pretty',
    ].join(' ')}
  >
    {children}
  </h1>
)

export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-(--font-display) text-[clamp(20px,2.5vw,30px)] leading-[1.12] tracking-tight m-0 mb-3 text-pretty">
    {children}
  </h2>
)

export const Lead = ({ children }: { children: ReactNode }) => (
  <p
    className={[
      'leading-[1.6] text-text-secondary m-0 text-pretty'
    ].join(' ')}
  >
    {children}
  </p>
)

// ─── Modal (generic shell — content is passed in as children) ────────────────
export default function CaseStudyModal({ isOpen, onClose, meta, children }: CaseStudyModalProps) {
  const scrollRef    = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const panelRef     = useRef<HTMLDivElement>(null)

  // Progress bar
  const updateProgress = useCallback(() => {
    const el = scrollRef.current
    const bar = progressRef.current
    if (!el || !bar) return
    const max = el.scrollHeight - el.clientHeight
    bar.style.width = max > 0 ? `${(el.scrollTop / max) * 100}%` : '0%'
  }, [])

  // Keyboard + scroll
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const y = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top      = `-${y}px`
    document.body.style.width    = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top      = ''
      document.body.style.width    = ''
      window.scrollTo(0, y)
    }
  }, [isOpen])

  // Reset scroll on open
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0
      updateProgress()
    }
  }, [isOpen, updateProgress])

  // Focus first button on open
  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.querySelector<HTMLButtonElement>('button')?.focus()
    }
  }, [isOpen])

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-200"
        style={{
          background:    'rgba(0,0,0,0.55)',
          backdropFilter:'blur(6px)',
          opacity:        isOpen ? 1 : 0,
          transition:    'opacity 250ms ease',
          pointerEvents:  isOpen ? 'auto' : 'none',
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={meta.ariaLabel}
        className="fixed z-201 flex flex-col bg-bg-surface rounded-sm border border-[rgba(255,255,255,0.09)] overflow-hidden"
        style={{
          inset:         'clamp(24px, 1vw, 48px)',
          boxShadow:     '0 32px 80px rgba(0,0,0,0.7)',
          transform:      isOpen ? 'translateY(0) scale(1)'     : 'translateY(14px) scale(0.985)',
          opacity:        isOpen ? 1 : 0,
          transition:    'transform 280ms cubic-bezier(0,0,0.2,1), opacity 250ms ease',
          pointerEvents:  isOpen ? 'auto' : 'none',
        }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[rgba(255,255,255,0.06)] rounded-t-[12px] overflow-hidden z-10" aria-hidden="true">
          <div
            ref={progressRef}
            className="h-full w-0 bg-electric transition-[width_120ms_ease]"
          />
        </div>

        {/* Header */}
        <header className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-border bg-bg-surface">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-(--font-display) text-[15px] tracking-[-0.01em] m-0 text-text-primary">
              {meta.eyebrowLabel}
            </h2>
            <p className="font-(--font-mono) text-[11px] text-text-secondary m-0 tracking-[0.04em]">
              {meta.metaLine}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="cursor-none w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.12)] bg-(--color-bg-base) text-text-secondary flex items-center justify-center text-lg leading-none transition-colors duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-text-primary"
          >
            ×
          </button>
        </header>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          onScroll={updateProgress}
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
        >
          {children}
        </div>

        {/* Footer */}
        <footer className="shrink-0 flex items-center justify-between gap-3 px-5 py-3.5 border-t border-border bg-bg-surface">
          <span className="font-(--font-mono) text-[11px] text-text-tertiary tracking-[0.04em]">
            Scroll to read · Esc to close
          </span>
          <button
            onClick={onClose}
            className="cursor-none font-(--font-mono) text-[0.6875rem] tracking-[0.2em] uppercase text-text-secondary bg-transparent border border-border-mid rounded-[2px] px-4 py-2 transition-colors duration-150 hover:text-text-primary hover:border-[rgba(255,255,255,0.25)]"
          >
            Close
          </button>
        </footer>
      </div>
    </>,
    document.body
  )
}
