export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="px-[clamp(1.5rem,4vw,3rem)] py-6 max-w-360 mx-auto flex items-center justify-between gap-4">
        <span className="font-display font-extrabold text-sm uppercase text-accent">
          Mick W
        </span>
        <span className="font-mono text-2xs font-light text-text-secondary opacity-50">
          © {new Date().getFullYear()} · Built with Three.js + React + TS
        </span>
      </div>
    </footer>
  )
}
