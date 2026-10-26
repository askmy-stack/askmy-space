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

Use Node 20 (see `.nvmrc`). Production hosts on **Vercel**; `netlify.toml` is legacy/optional.

## Architecture

**Next.js 14 App Router** portfolio — TypeScript, Tailwind CSS v4, Framer Motion. Dark theme only.

### Routes

| Path | Purpose |
|------|---------|
| `/` | Home (hero → capabilities → work → skills → about/terminal → experience → contact → report) |
| `/work/[slug]` | Case studies from `content/projects.ts` |

### Content & data

- `content/site.ts` — site config, nav, social links
- `content/projects.ts` — featured projects + case-study prose
- `content/experience.ts`, `content/education.ts`, `content/about.ts`
- `data/skills.ts` — skill groups

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
- Ambient `SignalField` in root layout; hero uses `SystemsDiagram` (SVG/CSS orb stage)

### Analytics

- `@vercel/analytics` + Speed Insights in `app/layout.tsx`
- Custom event `project_github_click` on case-study GitHub links

## Conventions

- Prefer editing `content/` over hardcoding copy
- Keep PRs scoped; link issues with `Fixes #N`
- Never commit secrets
- Visible metrics must match the current resume / `content/` (no invented percentages)
- Branch names for cloud agents: `cursor/<descriptive-name>-f279`
