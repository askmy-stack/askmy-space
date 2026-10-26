# Repository hygiene

Living checklist for keeping [askmy-space](https://github.com/askmy-stack/askmy-space) tidy.

## Release baseline

- **Version:** `1.2.0` (`package.json`) · git tag **`v1.2.0`**
- **Content freeze:** [`docs/CONTENT_FREEZE.md`](./CONTENT_FREEZE.md)

## Done

- [x] Deleted stale remote branches: `cursor/resume-sync-site-refresh-f279`, `docs/enhance-readme`, `docs/fine-tune-design-spec`, `version1`
- [x] Removed empty `/signals` route, signals components, and `data/public_intel.json`
- [x] Synced `README.md`, `CLAUDE.md`, `CONTRIBUTING.md` to current architecture
- [x] Archived obsolete Signal Black alignment plan
- [x] Clarified **Vercel** as production host; Netlify config marked legacy
- [x] Expanded PR template merge checklist
- [x] Merged hygiene into prototype (PR #35 → prototype)
- [x] Visual pass: `/`, `/work/meridian`, `/work/cortex` @ 1440×900 and 390×844
- [x] Content freeze documented
- [x] PR #34 marked ready; merged to `main`
- [x] Tagged **`v1.2.0`**

## Owner / dashboard follow-ups

These may require a one-time Vercel team consent or GitHub repo admin UI:

- [ ] Vercel: disable Deployment Protection SSO on **Preview** (or keep SSO and use automation bypass) — consent link when agents need it
- [ ] Vercel: confirm Node.js **20.x** on the `personal-portfolio` project
- [ ] GitHub: branch protection on `main` (require PR + green CI)
- [ ] GitHub: enable **auto-delete head branches** on merge
- [ ] Optional: open issues for deferred product work (resume PDF, contact form, writing index)

## Hosting

- **Production:** Vercel → [askmystack.space](https://askmystack.space)
- **Analytics:** `@vercel/analytics` + Speed Insights
- **`netlify.toml`:** legacy/optional only — not the live host of record
