import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faBehance, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const LINKS = [
  { label: 'Email',    href: 'mailto:wang.mick12@outlook.com',     icon: faEnvelope },
  { label: 'GitHub',   href: 'https://github.com/mwango-phoenix',  icon: faGithub   },
  { label: 'Behance',  href: 'https://behance.net/lazymango',      icon: faBehance  },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mwango',     icon: faLinkedin },
]

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 border-t border-border bg-bg-base">
      <div className="px-[clamp(1.5rem,4vw,3rem)] py-16 max-w-360 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-electric shrink-0"
            style={{ boxShadow: '0 0 8px var(--color-electric)' }}
          />
          <span className="font-mono text-md font-light text-text-secondary">
            Available for freelance & collaborations
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="cursor-none text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
