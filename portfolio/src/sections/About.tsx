export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 border-t border-border"
    >
      <div className="md:gap-20 px-[clamp(1.5rem,4vw,3rem)] py-24 md:py-32 max-w-360 mx-auto">

        <div className="reveal flex flex-col gap-6">
          <p className="text-2xs font-light tracking-label uppercase text-electric">
            About
          </p>

          <p className="font-serif text-[clamp(1.125rem,2vw,1.375rem)] text-text-secondary">
            I'm a{' '}
            <span style={{ color: 'var(--color-text-primary)', fontStyle: 'normal' }}>
              creative developer and 3D artist
            </span>{' '}
            who builds full-stack systems by day and explores game design, 3D art, cybersecurity in my free time.  I enjoy building products from the ground up, 
            working across engineering, design, and product to turn ideas into experiences that people genuinely enjoy using.
          </p>
        </div>

        <div className="reveal reveal-d2">
          <div className="mt-px bg-border">
            <div className="bg-(--color-bg-base) py-5 flex flex-wrap gap-2">
              {['TypeScript', 'React', 'Three.js', 'JavaScript', 'Python', 'C++','C#', 'Blender'].map(tech => (
                <span
                  key={tech}
                  className={[
                    'font-mono text-2xs font-light tracking-[0.1em] uppercase',
                    'px-2.5 py-1 border border-border-mid rounded-xs',
                    'text-text-secondary',
                    'transition-colors duration-250',
                    'hover:text-accent hover:border-accent-border',
                  ].join(' ')}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
