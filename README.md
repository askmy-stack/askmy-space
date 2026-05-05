# personal-portfolio

> Personal portfolio site for Abhinaysai Kamineni — AI/ML Engineer.

**Live:** https://personal-portfolio-six-tan-92.vercel.app/

## Stack

- **Framework:** Next.js 14 (App Router) · React 18
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS variables (dark/light theme)
- **Motion:** Framer Motion · Lenis (smooth scroll)
- **Typography:** Fraunces (display) · Geist Mono (UI/body)
- **Hosting:** Vercel (static export)

## Local development

```bash
git clone https://github.com/askmy-stack/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build + typecheck + lint |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint over all source |

## Project structure

```
app/                 Pages, layouts, metadata, sitemap, OG image
components/          Section components (hero, work, about, …)
  about/             Interactive terminal + bio + principles
  hero/              3D-feel hero (CSS transforms, no WebGL)
  scene/             Persistent right-gutter prism (scroll-driven)
  report/            "Report an issue" form (mailto-based)
content/             Site copy: projects, experience, skills, about
data/                Static reference data (skills, etc.)
hooks/               useTerminal, useReducedMotion
lib/                 Fonts, motion, terminal engine + session
public/              Static assets (favicon, info/projects/*)
```

## Adding a project

1. Add an entry to `content/projects.ts` (see `Project` type in `lib/types.ts`).
2. Drop a 16:9 hero image into `public/info/projects/` and reference it via `image`.
3. The case-study page at `/work/[slug]` is generated automatically.

## Replacing the resume

Drop your PDF at `public/info/projects/<filename>.pdf` and update `siteConfig.resume`
in `content/site.ts`. The header, contact section, and terminal `resume` command
all read from this single source.

## Reporting issues

Found a bug, broken layout, or typo? Use the **Report an issue** section at the
bottom of the live site, or open a PR / issue on GitHub.

## License

MIT

---

Built by [Abhinaysai Kamineni](https://github.com/askmy-stack)
