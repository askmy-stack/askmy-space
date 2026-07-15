# ASK. — Personal Portfolio

> **Abhinaysai Kamineni** · Research · Engineering · Product  
> Building AI/ML systems that ship to real users.

**Live → [askmystack.space](https://www.askmystack.space)** · Arlington, VA

---

## Overview

A single-page portfolio for an AI/ML engineer and researcher. The site is content-driven — copy, projects, experience, and site config live in `content/` and `data/`, so updates rarely touch component code.

### Site sections

| Section | What it shows |
|---|---|
| **Hero** | Scroll-driven intro with `ABHINAYSAI` display type and a CSS-based hero scene |
| **Credibility strip** | Marquee of employers, schools, and certifications (Jio, GWU, Follett, PHN, TEDx, GDC, AWS AI Practitioner, Global Leaders Award, Red Hat, Google Advanced Data Analytics) |
| **What I build** | Four capability pillars: Computer Vision, Time-Series + Signals, MLOps + Infrastructure, Agentic AI |
| **Systems that shipped** | Featured projects with metrics and deep-dive case studies at `/work/[slug]` |
| **Tools of the trade** | Skills grid across ML & AI, MLOps & Infra, Cloud, Data Engineering, Languages, and Signal Processing |
| **About** | Interactive terminal (`~ /abhinaysai — zsh`), bio, animated stat counters, and Research / Engineering / Product principles |
| **Experience** | Work history (Follett, Jio, PHN) plus certifications |
| **Now** | Current focus — agentic research assistant, EEG paper, open to collaborations (auto-dated) |
| **Contact** | Email, LinkedIn, GitHub, and resume download |
| **Report an issue** | Mailto-based feedback form — no backend, no tracking |

### Featured projects

| Project | Highlights |
|---|---|
| **EEG Seizure Detection** | 15+ architectures · 916 hours CHB-MIT · AUROC 0.740 · patient-disjoint evaluation |
| **Hybrid Agentic Job Search Pipeline** | Local Ollama + Anthropic API · privacy-aware routing · Go control loop |
| **Locating Bacterial Flagellar Motors** | mAP@50 = 0.948 · Precision = 1.00 · CenterNet on cryo-ET |
| **NASA Landslide Predictive Analysis** | Terraform IaC · GitHub Actions + Jenkins CI/CD · ~70% faster iteration |

### Site features

- **Interactive terminal** — natural-language commands, session memory, section navigation, and easter eggs; all intents resolved locally against portfolio data (no external AI calls)
- **Scroll-driven prism** — right-gutter scene that responds to scroll position
- **Case-study pages** — auto-generated from `content/projects.ts` at `/work/[slug]`
- **Report an issue** — prefilled `mailto:` draft with page URL and user agent; zero server dependencies
- **Dark / light theme** — CSS variables with system-preference default
- **Reduced-motion support** — respects `prefers-reduced-motion`

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

---

## Project Structure

```
app/                    Pages, layouts, metadata, sitemap, OG image
components/
  about/                Interactive terminal · bio · principles · stat counters
  capabilities/         "What I build" capability pillars
  contact/              Email · LinkedIn · GitHub · resume
  experience/           Jobs + certifications
  hero/                 Scroll-driven hero scene (CSS transforms)
  layout/               Header · Footer
  now/                  "What I'm up to" block
  report/               Report-an-issue (mailto, no backend)
  scene/                Scroll-driven prism (right gutter)
  skills/               Skill groups grid
  social-proof/         Credibility marquee strip
  work/                 Selected work rows + case-study pages
content/                Site copy — projects, experience, about, site config
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

Drop your PDF into `public/info/projects/` (URL-safe name, e.g. `abhinaysai-kamineni-resume.pdf`) and update `siteConfig.resume` in `content/site.ts`.  
The header button, contact section, and terminal `resume` command all read from this single source.

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
