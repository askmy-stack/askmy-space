# ASK. — Personal Portfolio

> **Abhinaysai Kamineni** · AI Engineer · Research · Product  
> Building agent platforms, reliability systems, and production MLOps.

**Live → [askmystack.space](https://www.askmystack.space)** · Arlington, VA

---

## Overview

A single-page portfolio for an AI engineer focused on Research and Product. The site is content-driven — copy, projects, experience, and site config live in `content/` and `data/`, so updates rarely touch component code.

### Site sections

| Section | What it shows |
|---|---|
| **Hero** | Scroll-driven intro with `ABHINAYSAI` display type and a CSS-based hero scene |
| **Credibility strip** | Marquee of employers, schools, and certifications (Jio, GWU, Follett, PHN, Tetra Pak, AWS AI Practitioner, Global Leaders Award, Red Hat, Google Advanced Data Analytics) |
| **What I build** | Four capability pillars: Organizational Memory, Agent Reliability, Supply-Chain Risk, Production MLOps |
| **Systems that shipped** | Featured projects with metrics and deep-dive case studies at `/work/[slug]` |
| **Tools of the trade** | Skills grid across Generative AI & Agents, ML & Data Science, Data Eng & APIs, Cloud & MLOps, Observability, and Languages |
| **About** | Interactive terminal (`~ /abhinaysai — zsh`), bio, animated stat counters, and Research / Engineering / Product principles |
| **Experience** | Work history (Follett, Jio, PHN, Tetra Pak) plus certifications |
| **Now** | Current focus — Cortex, Parallax, Meridian; open to Research · Product roles (auto-dated) |
| **Contact** | Email, LinkedIn, GitHub |
| **Report an issue** | Mailto-based feedback form — no backend, no tracking |

### Featured projects

| Project | Highlights |
|---|---|
| **Cortex** | MCP organizational memory · Kafka ingest · Neo4j + Qdrant hybrid retrieval |
| **Parallax** | Agent reliability · LLM-as-judge · OpenTelemetry / Jaeger |
| **Meridian** | Supply-chain risk · Kafka + Neo4j · XGBoost + SHAP · MLflow |

### Site features

- **Interactive terminal** — natural-language commands, session memory, section navigation, and easter eggs; all intents resolved locally against portfolio data (no external AI calls)
- **Scroll-driven prism** — right-gutter scene that responds to scroll position
- **Case-study pages** — auto-generated from `content/projects.ts` at `/work/[slug]`
- **Report an issue** — prefilled `mailto:` draft with page URL and user agent; zero server dependencies
- **Dark theme** — Signal Black tokens only
- **Reduced-motion support** — respects `prefers-reduced-motion`

---

## Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) · React 18 |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 · CSS variables (dark) |
| **Motion** | Framer Motion · Lenis smooth scroll |
| **Typography** | Fraunces (display) · Geist Sans (body) · Geist Mono (labels) |
| **Analytics** | Vercel Analytics · Vercel Speed Insights |
| **Hosting** | Netlify (`@netlify/plugin-nextjs`) |

---

## Getting Started

```bash
git clone https://github.com/askmy-stack/askmy-space.git
cd askmy-space
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
| `npm run test` | Vitest (terminal engine) |
| `npm run test:e2e` | Playwright route smoke (`/`, `/work/cortex`) |

---

## Project Structure

```
app/                    Pages, layouts, metadata, sitemap, OG image
components/
  about/                Interactive terminal · bio · principles · stat counters
  capabilities/         "What I build" capability pillars
  contact/              Email · LinkedIn · GitHub
  experience/           Jobs + certifications
  hero/                 Scroll-driven hero scene (CSS transforms)
  layout/               Header · Footer
  now/                  "What I'm up to" block
  open-source/          Public repo highlights
  report/               Report-an-issue (mailto, no backend)
  scene/                Scroll-driven prism (right gutter)
  signals/              Signals feed + knowledge graph
  skills/               Skill groups grid
  social-proof/         Credibility marquee strip
  work/                 Selected work rows + case-study pages
content/                Site copy — projects, experience, about, site config
data/                   Static reference data (skills, intel feed)
hooks/                  useTerminal · useReducedMotion
lib/
  terminal/             Engine · session · intent routing · fuzzy suggestions
  fonts.ts              Fraunces + Geist Sans + Geist Mono
  motion.ts             Shared Framer Motion variants
public/
  info/projects/        Optional project hero images
```

---

## Guides

### Adding a Project

1. Add an entry to `content/projects.ts` (see `Project` type in `lib/types.ts`)
2. Optionally drop a **16:9 hero image** into `public/info/projects/` and set the `image` field (gradient fallbacks work without one)
3. The case-study page at `/work/[slug]` generates automatically — no routing needed

### Reporting an Issue

Found a bug, broken layout, or typo?  
Use the **Report an issue** section at the bottom of the live site — or open a [GitHub issue](https://github.com/askmy-stack/askmy-space/issues).

---

## License

MIT

---

<div align="center">

Built with focus by [Abhinaysai Kamineni](https://www.askmystack.space)

</div>
