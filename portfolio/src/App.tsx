import { useEffect, useRef, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero   from './sections/Hero'

export default function App() {
  // ── Cursor ──────────────────────────────────────────────────────────────────
  const cursorRef   = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const mouse       = useRef({ x: -100, y: -100, rx: -100, ry: -100 })
  const rafRef      = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a,button,[data-hover]'))
        ringRef.current?.classList.add('is-hovering')
    }
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a,button,[data-hover]'))
        ringRef.current?.classList.remove('is-hovering')
    }

    const tick = () => {
      const m = mouse.current
      m.rx += (m.x - m.rx) * 0.14
      m.ry += (m.y - m.ry) * 0.14
      if (cursorRef.current) {
        cursorRef.current.style.left = `${m.x}px`
        cursorRef.current.style.top  = `${m.y}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${m.rx}px`
        ringRef.current.style.top  = `${m.ry}px`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Nav scroll state ────────────────────────────────────────────────────────
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Active section ──────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const el = document.getElementById('hero')
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('hero') },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Scroll helper ───────────────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className="cursor"      ref={cursorRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef}   aria-hidden="true" />

      <Navbar
        scrolled={navScrolled}
        activeSection={activeSection}
        onNav={scrollTo}
      />

      <main>
        <Hero onScrollDown={() => scrollTo('hero')} />
      </main>
    </>
  )
}