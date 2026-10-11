import Hero from './components/Hero'

export default function App() {
  return (
    <>
      <Hero />
      <section className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="max-w-xl text-lg text-neutral-400">
          Scroll-driven hero built with React, Tailwind and GSAP ScrollTrigger. Only transforms and opacity are animated.
        </p>
      </section>
    </>
  )
}
