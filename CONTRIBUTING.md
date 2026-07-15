# Contributing to askmy-space

Thanks for helping improve the portfolio.

## Setup

```bash
git clone https://github.com/askmy-stack/askmy-space
cd askmy-space
nvm use   # reads .nvmrc → Node 20
npm ci
npm run dev
```

Optional for the Ask agent: set `GROQ_API_KEY` in `.env.local`.

## Checks

```bash
npm run lint
npm run test          # Vitest (terminal engine)
npm run build
npm run test:e2e      # Playwright route smoke (/ , /signals, /ask)
PW_SNAPSHOTS=1 npm run test:e2e:update   # optional local screenshot baselines
```

## Content changes

Most copy and project data live in `content/` and `data/`. Prefer editing those
over hardcoding strings in components.

## Pull requests

- Keep PRs focused; reference an issue with `Fixes #N` when applicable
- Do not commit secrets or `.env*` files
- Ensure lint, tests, and build pass in CI

## Good first issues

Browse issues labeled `good first issue`.
