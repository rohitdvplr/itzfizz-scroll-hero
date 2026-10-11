import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CarSvg from './CarSvg'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'WELCOME ITZFIZZ'

// `at` = scroll progress (0-1) when the car passes that stat
const STATS = [
  { n: 58, label: 'Increase in pick up point use',   pos: 'left-[4vw] text-left',   top: '60%', at: 0.28 },
  { n: 23, label: 'Decreased in customer phone calls', pos: 'right-[4vw] text-right', top: '46%', at: 0.52 },
  { n: 27, label: 'Increase in pick up point use',   pos: 'left-[4vw] text-left',   top: '34%', at: 0.72 },
  { n: 40, label: 'Decreased in customer phone calls', pos: 'right-[4vw] text-right', top: '24%', at: 0.88 },
]

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray('.stat')

      // 1. Intro: headline letters stagger in, then stats one by one with count-up
      if (reduce) {
        // reduced-motion users: skip the intro movement, show final state (scroll animation still runs below)
        gsap.set('.ch', { opacity: 1 })
        gsap.set(stats, { opacity: 0.45 })
        stats.forEach((s) => { const n = s.querySelector('[data-n]'); n.textContent = n.dataset.n })
      } else {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .fromTo('.ch', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 })
          .fromTo(stats, { y: 30, opacity: 0 }, { y: 0, opacity: 0.45, duration: 0.8, stagger: 0.25 }, '-=0.2')
        stats.forEach((s, i) => {
          const el = s.querySelector('[data-n]')
          const obj = { v: 0 }
          intro.to(obj, { v: +el.dataset.n, duration: 1.2, onUpdate: () => (el.textContent = Math.round(obj.v)) }, 1 + i * 0.25)
        })
      }

      // 2. Scroll: progress-driven (scrub), scrub:1 adds smoothing/easing
      const stage = root.current.querySelector('.stage')
      const car = root.current.querySelector('.car')
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
      })

      tl.to(car, { y: () => -(stage.clientHeight - car.offsetHeight - stage.clientHeight * 0.1), duration: 1 }, 0)
        .to(car, { keyframes: { x: [0, 14, -14, 10, 0], rotation: [0, 2, -2, 1.5, 0], easeEach: 'sine.inOut' }, duration: 1 }, 0)
        .to('.road-lines', { y: 1000, duration: 1 }, 0)
        .to('.hint', { opacity: 0, duration: 0.05 }, 0)

      STATS.forEach((s, i) => {
        tl.to(stats[i], { opacity: 1, scale: 1.08, duration: 0.08, ease: 'power2.out' }, s.at - 0.04)
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative h-[400vh]" aria-label="Hero">
      <div className="stage sticky top-0 h-screen overflow-hidden">
        <h1
          aria-label="Welcome Itzfizz"
          className="absolute inset-x-0 top-[7vh] z-[5] whitespace-nowrap text-center text-[clamp(1.1rem,4.2vw,3rem)] font-bold tracking-[0.1em]"
        >
          {[...HEADLINE].map((c, i) =>
            c === ' ' ? (
              <span key={i} className="inline-block w-[0.9em]" />
            ) : (
              <span key={i} className={`ch inline-block opacity-0 will-change-transform ${i >= 8 ? 'text-accent' : ''}`}>{c}</span>
            )
          )}
        </h1>

        {/* Road */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 w-[clamp(150px,22vw,260px)] -translate-x-1/2 overflow-hidden bg-road shadow-[0_0_0_2px_#1d2129,0_0_80px_rgba(0,0,0,0.6)]">
          <div className="road-lines absolute inset-x-0 top-[-1000px] h-[calc(100%+1000px)] will-change-transform" />
        </div>

        {/* Stats */}
        {STATS.map((s) => (
          <div key={s.top} className={`stat absolute z-[4] w-[min(36vw,280px)] opacity-0 will-change-transform ${s.pos}`} style={{ top: s.top }}>
            <div className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-none">
              <b data-n={s.n}>0</b><span className="text-accent">%</span>
            </div>
            <p className="mt-2 text-[clamp(0.7rem,1.4vw,1rem)] text-[#8a90a0]">{s.label}</p>
          </div>
        ))}

        {/* Car: outer div handles centering, inner .car is animated by GSAP */}
        <div aria-hidden className="absolute inset-x-0 bottom-[6vh] z-[6] flex justify-center">
          <div className="car w-[clamp(70px,9vw,110px)] will-change-transform"><CarSvg /></div>
        </div>

        <div className="hint absolute inset-x-0 bottom-[2vh] z-[7] text-center text-[0.7rem] tracking-[0.3em] text-[#8a90a0]">SCROLL</div>
      </div>
    </section>
  )
}
