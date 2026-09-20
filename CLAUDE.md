# CLAUDE.md

Guidance for agents working in this repository.

## Commands

```bash
npm run dev      # Next.js dev server
npm run build    # Production build
npm run lint     # ESLint
npm run test     # Vitest (terminal engine, etc.)
npm run test:e2e # Playwright visual smoke (optional locally)
npm run start    # Production server
```

Use Node 20 (see `.nvmrc` / Netlify `NODE_VERSION`).

## Architecture

**Next.js 14 App Router** portfolio — TypeScript, Tailwind CSS v4, Framer Motion. Dark theme only.

### Routes

| Path | Purpose |
|------|---------|
| `/` | Home sections (hero → work → skills → about/terminal → experience → now → contact → report) |
| `/work/[slug]` | Case studies from `content/projects.ts` |
| `/signals` | Signals feed |

### Content & data

- `content/site.ts` — site config, nav
- `content/projects.ts` — featured projects + case-study prose
- `content/experience.ts`, `content/about.ts`, `content/certifications.ts`
- `data/` — skills and other structured lists

### Interactive terminal (About)

Deterministic, offline terminal — **no LLM**:

- `lib/terminal/engine.ts` — `execute` / `greet` command router
- `lib/terminal/session.ts` — visit/session helpers
- `hooks/useTerminal.ts` — UI state
- `components/about/AboutTerminal.tsx` — mount point

### Theming & motion

- CSS variables in `app/globals.css` (`--bg`, `--fg`, `--accent`, …) — dark only
- Fonts: Fraunces + Geist Sans + Geist Mono (`lib/fonts.ts`)
- `hooks/useReducedMotion.ts` gates Framer / canvas motion
- Ambient `SignalField` in root layout; `ScrollScene` / `NeuralLattice` for hero storytelling

### Analytics

- `@vercel/analytics` + Speed Insights in `app/layout.tsx`
- Custom event `project_github_click` on case-study GitHub links

## Conventions

- Prefer editing `content/` over hardcoding copy
- Keep PRs scoped; link issues with `Fixes #N`
- Never commit secrets
- Visible metrics must match the current resume / `content/` (no invented percentages)
