# ASK. — Personal Portfolio

> **Abhinaysai Kamineni** · Full Stack AI Engineer  
> Reliable agents, context engineering, evaluation, and AI infrastructure.

**Live → [askmystack.space](https://askmystack.space)** · Washington, DC

---

## Overview

Content-driven Next.js portfolio. Copy, projects, experience, education, and site config live in `content/` and `data/` — most updates never touch component code.

### Site sections

| Section | What it shows |
|---|---|
| **Hero** | Two-column landing: brand copy + interactive systems orb (Context, Agents, Cloud, Evaluation) |
| **Capabilities** | Context engineering · Agent systems · Evaluation · AI Infrastructure |
| **Featured work** | Meridian, Cortex, Parallax, EEG Seizure Detection, Tool-semantics → `/work/[slug]` |
| **Skills** | Generative AI & Agents, ML & Data Science, Data Eng & APIs, Cloud & MLOps, Observability, Languages |
| **About** | Interactive terminal (`~ /abhinaysai — zsh`), bio, principles |
| **Experience** | Follett, GWU research, Jio, PHN, Tetra Pak + education (GWU M.S., SPPU B.E.) |
| **Contact** | Email, LinkedIn, GitHub, X, Medium |
| **Report an issue** | Mailto feedback — no backend |

### Featured projects

| Project | Highlights |
|---|---|
| **Meridian** | Supply-chain risk · GDELT/ACLED/AIS · Neo4j · XGBoost + SHAP |
| **Cortex** | MCP organizational memory · Kafka · Neo4j + Qdrant · ~120ms retrieval |
| **Parallax** | Agent reliability · LLM-as-judge · OpenTelemetry |
| **EEG Seizure Detection** | Subject-independent CHB-MIT · AUROC 0.740 |
| **Tool-semantics** | Behavioral tool-use evaluation for agents |

### Site features

- **Interactive terminal** — local intents only (no LLM calls)
- **Systems orb stage** — keyboard-accessible radiogroup; respects `prefers-reduced-motion`
- **Case studies** — generated from `content/projects.ts`
- **Dark theme** — Signal Black tokens only
- **Ambient SignalField** — soft canvas background in the root layout

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
| **Hosting** | **Vercel** (production: [askmystack.space](https://askmystack.space)). `netlify.toml` is legacy/optional only. |

---

## Getting Started

```bash
git clone https://github.com/askmy-stack/askmy-space.git
cd askmy-space
nvm use            # Node 20
npm ci
npm run dev        # → http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (terminal engine) |
| `npm run test:e2e` | Playwright route smoke |

---

## Project Structure

```
app/                    Pages, layout, sitemap, OG image
components/
  about/                Interactive terminal · bio · principles
  capabilities/         Capability strip
  contact/              Email · LinkedIn · GitHub · X · Medium
  experience/           Jobs + education
  hero/                 Landing copy + SystemsDiagram (orb stage)
  layout/               Header · Footer
  report/               Report-an-issue (mailto)
  scene/                SignalField ambient background
  skills/               Skill groups
  work/                 Featured work + case studies
content/                site, projects, experience, education, about
data/                   skills.ts
hooks/                  useTerminal · useReducedMotion
lib/
  terminal/             Engine · session · intent routing
  fonts.ts · motion.ts · types.ts · utils.ts
public/                 Static assets / optional project images
```

---

## Repo workflow

- Default branch: `main` (production)
- Feature branches: `cursor/<descriptive-name>-f279`
- Prefer editing `content/` for copy; keep metrics aligned with LinkedIn / resume
- CI (`.github/workflows/ci.yml`): lint → unit tests → build → Playwright smoke on PRs to `main`
- Preview deployments may require Vercel SSO unless Deployment Protection is disabled for Previews

See `docs/REPO.md` for hygiene checklist and hosting notes.

---

## Guides

### Adding a project

1. Add an entry to `content/projects.ts`
2. Optionally add a 16:9 image under `public/info/projects/`
3. Case study at `/work/[slug]` is generated automatically

### Reporting an issue

Use **Report an issue** on the live site, or open a [GitHub issue](https://github.com/askmy-stack/askmy-space/issues).

---

## License

MIT

---

<div align="center">

Built with focus by [Abhinaysai Kamineni](https://askmystack.space)

</div>
