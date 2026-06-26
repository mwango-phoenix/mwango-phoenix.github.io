import { useState, useCallback } from 'react'

interface NavbarProps {
  scrolled: boolean
  activeSection: string
  onNav: (id: string) => void
}

interface NavLink {
  id: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
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
          'fixed top-0 left-0 right-0 z-100',
          'flex items-center justify-between',
          'px-[clamp(1.5rem,4vw,3rem)] py-6',
          'transition-all duration-400',
          scrolled
            ? 'bg-bg-overlay backdrop-blur-xl border-b border-border'
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
            'font-display font-extrabold text-base uppercase text-accent',
            'after:absolute after:left-0 after:right-0 after:-bottom-0.75 after:h-px after:bg-accent',
            'after:scale-x-0 after:origin-left after:transition-transform after:duration-250',
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
                    'font-display text-[0.6875rem] font-medium tracking-wider uppercase',
                    'bg-transparent border-0 py-1 px-0',
                    'transition-colors duration-250',
                    'before:absolute before:-bottom-0.5 before:left-0 before:right-0',
                    'before:h-px before:bg-accent-dim',
                    'before:scale-x-0 before:origin-left',
                    'before:transition-transform before:duration-400',
                    isActive
                      ? 'text-text-primary before:scale-x-100'
                      : 'text-text-secondary hover:text-text-primary hover:before:scale-x-100',
                  ].join(' ')}
                >
                  {label}
                  {/* Active dot */}
                  <span
                    aria-hidden="true"
                    className={[
                      'inline-block w-1 h-1 rounded-full bg-electric',
                      'transition-all duration-250',
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
                'font-display text-[0.6875rem] font-medium tracking-wider uppercase',
                'text-accent bg-transparent',
                'border border-border-mid rounded-xs',
                'px-5 py-2',
                'transition-all duration-250',
                'hover:bg-accent-muted hover:border-accent-border',
              ].join(' ')}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="cursor-none flex md:hidden flex-col gap-1.25 bg-transparent border-0 p-2 z-101"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={[
            'block w-6 h-px bg-text-primary origin-center',
            'transition-transform duration-400 ease-in-out',
            menuOpen ? 'translate-y-1.5 rotate-45' : '',
          ].join(' ')} />
          <span className={[
            'block w-6 h-px bg-text-primary origin-center',
            'transition-all duration-250',
            menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100',
          ].join(' ')} />
          <span className={[
            'block w-6 h-px bg-text-primary origin-center',
            'transition-transform duration-400 ease-in-out',
            menuOpen ? '-translate-y-1.5 -rotate-45' : '',
          ].join(' ')} />
        </button>
      </nav>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <div
        className={[
          'fixed top-0 right-0 h-dvh z-99',
          'w-[min(360px,100vw)]',
          'flex flex-col justify-center',
          'px-10 py-20',
          'bg-bg-surface border-l border-border',
          'transition-transform duration-700 ease-in-out',
          menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul className="list-none flex flex-col gap-2" role="list">
          {NAV_LINKS.map(({ id, label }, i) => (
            <li
              key={id}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transition: `opacity 400ms ${i * 60}ms ease, transform 400ms ${i * 60}ms ease`,
              }}
            >
              <button
                onClick={() => handleNav(id)}
                className={[
                  'cursor-none flex items-center gap-4 w-full bg-transparent border-0 text-left',
                  'font-display text-2xl font-bold tracking-tight',
                  'py-4 border-b border-border',
                  'transition-colors duration-250',
                  activeSection === id
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                <span className="font-mono text-2xs font-light tracking-wider text-text-tertiary">
                  0{i + 1}
                </span>
                {label}
              </button>
            </li>
          ))}

          <li
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
              transition: `opacity 400ms ${NAV_LINKS.length * 60}ms ease, transform 400ms ${NAV_LINKS.length * 60}ms ease`,
            }}
          >
            <button
              onClick={() => handleNav('contact')}
              className={[
                'cursor-none flex items-center gap-4 w-full bg-transparent border-0 text-left',
                  'font-display text-2xl font-bold tracking-tight',
                'py-4 border-b border-border',
                'text-accent transition-colors duration-250',
                'hover:text-accent-dim',
              ].join(' ')}
            >
              <span className="font-mono text-2xs font-light tracking-wider text-text-tertiary">
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
          <span className="font-mono text-2xs font-light tracking-wider text-text-secondary">
            hello@axiom.design
          </span>
          <span className="font-mono text-2xs font-light tracking-wider text-text-secondary">
            @axiom_dev
          </span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-98 bg-black/60 backdrop-blur-xs anim-fade-up"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
