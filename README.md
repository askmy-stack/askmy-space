# ASK. — Personal Portfolio

> **Research · Engineering · Product**
> Building AI/ML systems that ship to real users.

**Live → [askmystack.space](https://www.askmystack.space)**

---

![ASK. Portfolio Hero](https://www.askmystack.space/opengraph-image)

---

## Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) · React 18 |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 · CSS variables (dark / light) |
| **Motion** | Framer Motion · Lenis smooth scroll |
| **Typography** | Fraunces (display) · Geist Mono (UI / body) |
| **Analytics** | Vercel Analytics · Vercel Speed Insights |
| **Hosting** | Vercel (static export) |

---

## Getting Started

```bash
git clone https://github.com/askmy-stack/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev          # → http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build + typecheck + lint |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint across all source files |

---

## Project Structure

```
app/                    Pages, layouts, metadata, sitemap, OG image
components/
  about/                Interactive terminal · bio · principles
  capabilities/         Capability strip with icons
  experience/           Jobs + certifications
  hero/                 3D-feel hero scene (pure CSS transforms)
  layout/               Header · Footer
  now/                  "What I'm doing now" block
  report/               Report-an-issue (mailto, no backend)
  scene/                Scroll-driven prism (right gutter)
  skills/               Skill groups grid
  work/                 Selected work rows + case-study pages
content/                All site copy — projects, experience, about, site config
data/                   Static reference data (skills)
hooks/                  useTerminal · useReducedMotion
lib/
  terminal/             Engine · session · intent routing · fuzzy suggestions
  fonts.ts              Two-font system (Fraunces + Geist Mono)
  motion.ts             Shared Framer Motion variants
public/
  info/projects/        Hero images + resume PDF
```

---

## Guides

### Adding a Project

1. Add an entry to `content/projects.ts` (see `Project` type in `lib/types.ts`)
2. Drop a **16:9 hero image** into `public/info/projects/` and set the `image` field
3. The case-study page at `/work/[slug]` generates automatically — no routing needed

### Updating the Resume

Drop your PDF into `public/info/projects/` and update `siteConfig.resume` in `content/site.ts`.
The header button, contact section, and terminal `resume` command all read from this single source.

### Reporting an Issue

Found a bug, broken layout, or typo?
Use the **Report an issue** section at the bottom of the live site — or open a [GitHub issue](https://github.com/askmy-stack/personal-portfolio/issues).

---

## License

MIT

---

<div align="center">

Built with focus by [Abhinaysai Kamineni](https://www.askmystack.space) · Arlington, VA

</div>
