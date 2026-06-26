import { useState, useRef } from 'react'
import goose from '../assets/posters/goose.png'
import soar from '../assets/posters/Soar.png'

// ─── Types ────────────────────────────────────────────────────────────────────
interface DesignPiece {
  title: string
  medium: string
  type: 'image' | 'video'
  src?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PIECES: DesignPiece[] = [
  { title: 'Goose', medium: 'Poster', type: 'image', src: goose },
  { title: 'Owl', medium: 'Poster', type: 'image', src: soar },
]

// ─── Accordion row ────────────────────────────────────────────────────────────
function AccordionRow({ piece, open, onToggle }: {
  piece: DesignPiece
  open: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={[
          'cursor-none w-full flex items-center justify-between gap-6',
          'px-0 py-5 bg-transparent border-0 text-left',
          'group transition-colors duration-200',
        ].join(' ')}
      >
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-mono text-2xs font-light tracking-label uppercase text-electric opacity-60 shrink-0 w-14">
            {piece.medium}
          </span>
          <h3 className={[
            'font-display text-base font-bold tracking-tight',
            'transition-colors duration-200',
            open ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary',
          ].join(' ')}>
            {piece.title}
          </h3>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className={[
            'shrink-0 text-electric transition-transform duration-400 ease-in-out',
            open ? 'rotate-45' : '',
          ].join(' ')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      {/* Collapsible body */}
      <div
        ref={bodyRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '800px' : '0px' }}
      >
        <div className="pb-6">
          {piece.src ? (
            piece.type === 'image' ? (
              <img
                src={piece.src}
                alt={piece.title}
                loading="lazy"
                className="w-full max-h-[260px] object-contain bg-bg-surface"
              />
            ) : (
              <video
                src={piece.src}
                controls
                playsInline
                className="w-full max-h-[260px] bg-black"
              />
            )
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-bg-surface">
              <span className="font-mono text-2xs tracking-label uppercase text-text-secondary opacity-30">
                {piece.medium} — no asset yet
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function VisualDesign() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section id="design" className="relative z-10 border-t border-border">
      <div className="px-[clamp(1.5rem,4vw,3rem)] py-24 md:py-32 max-w-360 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-12 reveal">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-2xs font-light tracking-label uppercase text-electric">
              Design
            </p>
            <h2 className="font-display font-bold text-[clamp(2.25rem,4vw,3.5rem)] tracking-tight">
              Visual Design
            </h2>
          </div>
          <p className="font-mono text-md font-light leading-[1.9] text-text-secondary max-w-95">
            Posters and motion work.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-t border-border">
          {PIECES.map((piece, i) => (
            <AccordionRow
              key={i}
              piece={piece}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
