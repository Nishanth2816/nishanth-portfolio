# NISHANTH / IMMERSIVE INTELLIGENCE

An original cinematic WebGL portfolio for **Lingampalli Nishanth**, built with React, TypeScript, React Three Fiber, Three.js, GSAP ScrollTrigger, Lenis, and Framer Motion.

> **Important migration note:** The supplied live Vercel URL could not be fetched from the working environment, and the original Git repository/source was not attached. This package is a ready-to-merge React/Vite implementation, **not a modification of the live deployment**. Do not replace an existing repository until its content and verified URLs have been reviewed against `src/config/portfolio.ts`.

## What is implemented

- Responsive, cinematic full-screen hero with custom 3D neural core, luminous orbit rings, satellite nodes, particles, light and a subtle pointer parallax.
- Camera movement synchronized with page progress, GSAP scroll reveals, chapter transitions and progressive experience timeline.
- Lenis smooth scroll, clickable navigation/section rail, mobile navigation, hoverable holographic project showcases, interactive skills explorer.
- Professional story, four real portfolio projects, two work experiences, IIT Indore education, complete contact details.
- Two original resumes embedded in `public/` (the AI-focused resume is the primary download).
- Semantic document hierarchy, keyboard navigation, skip link, reduced-motion preference and manual motion toggle, no-WebGL visual fallback, responsive layouts.
- Performance-sensitive scene: mobile particle/geometry reduction, device-pixel-ratio cap, no texture requests, no heavyweight downloaded 3D assets.

## Start locally

You need Node.js 20+ and npm with network access to install dependencies.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173). Check production type safety and build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Existing-site integration (important)

1. **Obtain the original repository** behind `https://my-portfolio-phi-five-34.vercel.app/`. Check its framework (this implementation uses React + Vite). If it is already React/Vite, merge `src/`, `public/`, config and dependencies into a new branch. If it uses Next.js or another framework, port `src/components`, `src/features` and `src/config` rather than blindly replacing framework files.
2. **Preserve existing content.** Compare existing project copy, screenshots, work history, resume and every existing GitHub/demo link with `src/config/portfolio.ts`. The latter is populated from the two supplied PDFs, not from the inaccessible original website.
3. **Fill exact project URLs** in `src/config/portfolio.ts` (`sourceUrl`, `demoUrl`). These fields are `null` on purpose; the interface currently links to the verified GitHub *profile* and offers an email request for demos. No project-specific links were guessed.
4. **Replace concept visuals with actual screenshots.** `src/components/ProjectVisual.tsx` contains custom illustrative UI concepts clearly labeled as such. When you obtain screenshots from the original source, replace that component's mockups with optimized WebP/AVIF assets, proper alt text and existing metadata. Do not represent concepts as genuine product screenshots.
5. Install, run `npm run build`, check tablet/mobile, keyboard navigation, and verify each link; commit and deploy through the **existing** Vercel project, rather than creating a new one.

## Design and motion

- `src/features/NeuralScene.tsx` — 3D geometry, particle cloud, camera path and WebGL fallback.
- `src/App.tsx` — scene orchestration, Lenis integration, GSAP timelines, content sections and contact.
- `src/components/ProjectCard.tsx` — case study and subtle mouse tilt.
- `src/components/ProjectVisual.tsx` — illustrative dashboards (replace once real screenshots are available).
- `src/components/SkillConstellation.tsx` — keyboard-operable skills filtering.
- `src/config/portfolio.ts` — centralized content and all external links.
- `src/styles.css` — cinematic responsive design and motion reductions.

The camera is driven by one normalized scroll `progress` ref updated by ScrollTrigger. The large 3D object shifts left/right as chapters enter the viewport; the copy remains normal DOM for search, accessibility and recruiter scanability. Lenis drives native scroll, while GSAP reads/updates scroll. Both are disabled appropriately for reduced motion.

## Accessibility and optimization checklist

- [x] `prefers-reduced-motion` initial setting and visible manual toggle
- [x] WebGL fallback and resume/contact accessible independently of the scene
- [x] Focus outlines; skip link; semantic headings; alt/figcaption text for project concept visuals
- [x] Mobile menu, keyboard-operated navigation, accessible skill tabs
- [x] Reduced mesh detail/particle count on narrow screens, capped DPR
- [ ] Production build and real-browser regression after dependencies are installed (not possible in the file-generation sandbox: npm registry DNS unavailable)
- [ ] Manual cross-browser WebGL QA (Safari/iOS + Firefox), accessibility audit and Lighthouse measurements
- [ ] Original deployment, project-specific links and real screenshots (requires access to the source repository)

## Content provenance

Primary resume: `public/Lingampalli_Nishanth_Resume.pdf`.
Alternative resume: `public/Lingampalli_Nishanth_Alternate_Resume.pdf`.

The RAG project, cinema booking system, AMDOX 2026 retail analytics and Handshake SEAL experience come from the primary resume. The hostel analytics, 40.8% baseline churn rate, club leadership, and exact internship duration come from the alternative resume. The two resumes differ somewhat in dates and project emphasis; this site avoids implying that unverified results are live model performance metrics.

This is **inspired by** Lusion's approach to real-time 3D/scroll narratives, not a reproduction of their design or assets.

### Optional safe merge helper for an existing React + Vite repository

```bash
# Preview what would be replaced and inventory existing project/GitHub/demo links:
node scripts/merge-into-react-vite.mjs /path/to/existing-vite-repo

# After reviewing the dry run (preferably on a new Git branch):
node scripts/merge-into-react-vite.mjs /path/to/existing-vite-repo --apply
cd /path/to/existing-vite-repo
npm install
npm run build
```

The helper checks for React/Vite, creates `.nishanth-pre-merge/` backups and stores a `migration-report.json` with detected prior URLs. It deliberately does not claim to have resolved those links or to have updated the live site. The default is **dry-run**, and the script never connects to Vercel or GitHub.
