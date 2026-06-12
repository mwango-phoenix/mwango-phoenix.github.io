import { useState, useCallback } from 'react'

interface NavbarProps {
  scrolled:      boolean
  activeSection: string
  onNav:         (id: string) => void
}

interface NavLink {
  id:    string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'software',   label: 'Software'   },
  { id: 'characters', label: '3D / Chars' },
  { id: 'products',   label: 'Product'    },
  { id: 'skills',     label: 'Skills'     },
]

export default function Navbar({ scrolled, activeSection, onNav }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = useCallback((id: string) => {
    onNav(id)
    setMenuOpen(false)
  }, [onNav])

  return (
    <>
      {/* ── Nav bar ─────────────────────────────────────────── */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[100]',
          'flex items-center justify-between',
          'px-[clamp(1.5rem,4vw,3rem)] py-6',
          'transition-all duration-[400ms]',
          scrolled
            ? 'bg-[rgba(8,8,8,0.82)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.07)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          aria-label="Scroll to top"
          className={[
            'cursor-none relative bg-transparent border-0 p-0',
            'font-[var(--font-display)] font-extrabold text-base uppercase text-[var(--color-accent)]',
            'after:absolute after:left-0 after:right-0 after:bottom-[-3px] after:h-px after:bg-[var(--color-accent)]',
            'after:scale-x-0 after:origin-left after:transition-transform after:duration-[250ms]',
            'hover:after:scale-x-100',
          ].join(' ')}
        >
          Mick W
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {NAV_LINKS.map(({ id, label }) => {
            const isActive = activeSection === id
            return (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={[
                    'cursor-none relative flex items-center gap-2',
                    'font-[var(--font-display)] text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
                    'bg-transparent border-0 py-1 px-0',
                    'transition-colors duration-[250ms]',
                    'before:absolute before:bottom-[-2px] before:left-0 before:right-0',
                    'before:h-px before:bg-[var(--color-accent-dim)]',
                    'before:scale-x-0 before:origin-left',
                    'before:transition-transform before:duration-[400ms]',
                    isActive
                      ? 'text-[var(--color-text-primary)] before:scale-x-100'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:before:scale-x-100',
                  ].join(' ')}
                >
                  {label}
                  {/* Active dot */}
                  <span
                    aria-hidden="true"
                    className={[
                      'inline-block w-1 h-1 rounded-full bg-[var(--color-electric)]',
                      'transition-all duration-[250ms]',
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                    ].join(' ')}
                  />
                </button>
              </li>
            )
          })}

          {/* CTA */}
          <li>
            <button
              onClick={() => handleNav('contact')}
              className={[
                'cursor-none',
                'font-[var(--font-display)] text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
                'text-[var(--color-accent)] bg-transparent',
                'border border-[rgba(255,255,255,0.13)] rounded-[2px]',
                'px-5 py-2',
                'transition-all duration-[250ms]',
                'hover:bg-[rgba(232,213,176,0.12)] hover:border-[rgba(232,213,176,0.35)]',
              ].join(' ')}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="cursor-none flex md:hidden flex-col gap-[5px] bg-transparent border-0 p-2 z-[101]"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={[
            'block w-6 h-px bg-[var(--color-text-primary)] origin-center',
            'transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
            menuOpen ? 'translate-y-[6px] rotate-45' : '',
          ].join(' ')} />
          <span className={[
            'block w-6 h-px bg-[var(--color-text-primary)] origin-center',
            'transition-all duration-[250ms]',
            menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100',
          ].join(' ')} />
          <span className={[
            'block w-6 h-px bg-[var(--color-text-primary)] origin-center',
            'transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
            menuOpen ? '-translate-y-[6px] -rotate-45' : '',
          ].join(' ')} />
        </button>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <div
        className={[
          'fixed top-0 right-0 h-dvh z-[99]',
          'w-[min(360px,100vw)]',
          'flex flex-col justify-center',
          'px-10 py-20',
          'bg-[var(--color-bg-surface)] border-l border-[rgba(255,255,255,0.07)]',
          'transition-transform duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
          menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className="list-none flex flex-col gap-2" role="list">
          {NAV_LINKS.map(({ id, label }, i) => (
            <li
              key={id}
              style={{
                opacity:   menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transition: `opacity 400ms ${i * 60}ms ease, transform 400ms ${i * 60}ms ease`,
              }}
            >
              <button
                onClick={() => handleNav(id)}
                className={[
                  'cursor-none flex items-center gap-4 w-full bg-transparent border-0 text-left',
                  'font-[var(--font-display)] text-2xl font-bold tracking-[-0.02em]',
                  'py-4 border-b border-[rgba(255,255,255,0.07)]',
                  'transition-colors duration-[250ms]',
                  activeSection === id
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                ].join(' ')}
              >
                <span className="font-[var(--font-mono)] text-[0.625rem] font-light tracking-[0.12em] text-[var(--color-text-tertiary)]">
                  0{i + 1}
                </span>
                {label}
              </button>
            </li>
          ))}

          <li
            style={{
              opacity:   menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
              transition: `opacity 400ms ${NAV_LINKS.length * 60}ms ease, transform 400ms ${NAV_LINKS.length * 60}ms ease`,
            }}
          >
            <button
              onClick={() => handleNav('contact')}
              className={[
                'cursor-none flex items-center gap-4 w-full bg-transparent border-0 text-left',
                'font-[var(--font-display)] text-2xl font-bold tracking-[-0.02em]',
                'py-4 border-b border-[rgba(255,255,255,0.07)]',
                'text-[var(--color-accent)] transition-colors duration-[250ms]',
                'hover:text-[var(--color-accent-dim)]',
              ].join(' ')}
            >
              <span className="font-[var(--font-mono)] text-[0.625rem] font-light tracking-[0.12em] text-[var(--color-text-tertiary)]">
                0{NAV_LINKS.length + 1}
              </span>
              Get in Touch
            </button>
          </li>
        </ul>

        {/* Footer */}
        <div
          className="mt-auto pt-8 flex flex-col gap-2"
          style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 400ms 400ms' }}
        >
          <span className="font-[var(--font-mono)] text-[0.625rem] font-light tracking-[0.12em] text-[var(--color-text-secondary)]">
            hello@axiom.design
          </span>
          <span className="font-[var(--font-mono)] text-[0.625rem] font-light tracking-[0.12em] text-[var(--color-text-secondary)]">
            @axiom_dev
          </span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-[4px] anim-fade-up"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}