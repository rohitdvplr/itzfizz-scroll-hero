# Itzfizz – Scroll-Driven Hero Animation

React + Tailwind + GSAP (ScrollTrigger) recreation of the car scroll hero.

- Intro: headline letter stagger, stats reveal one by one with count-up
- Scroll: car, road and stats are tied to scroll progress (`scrub`), transforms only
- Respects `prefers-reduced-motion`

## Run
```bash
npm install
npm run dev
```

## Deploy (GitHub Pages)
```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```
Then repo Settings → Pages → Source: `gh-pages` branch, `/ (root)`.
