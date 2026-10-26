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

## Checks

```bash
npm run lint
npm run test          # Vitest (terminal engine)
npm run build
npm run test:e2e      # Playwright route smoke (/, /work/meridian, …)
PW_SNAPSHOTS=1 npm run test:e2e:update   # optional local screenshot baselines
```

## Content changes

Most copy and project data live in `content/` and `data/`. Prefer editing those
over hardcoding strings in components. Visible metrics must match LinkedIn / resume.

## Branches & pull requests

- Branch from latest `main` (or the active prototype branch when stacking)
- Cloud / agent branches: `cursor/<descriptive-name>-f279`
- Keep PRs focused; reference an issue with `Fixes #N` when applicable
- Do not commit secrets or `.env*` files
- Ensure lint, unit tests, and build pass in CI before merge
- After merge, delete the head branch

## Good first issues

Browse issues labeled `good first issue`, or see open hygiene items in `docs/REPO.md`.
