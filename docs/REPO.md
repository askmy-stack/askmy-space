# Repository hygiene

Living checklist for keeping [askmy-space](https://github.com/askmy-stack/askmy-space) tidy.

## Done (this hygiene pass)

- [x] Deleted stale remote branches: `cursor/resume-sync-site-refresh-f279`, `docs/enhance-readme`, `docs/fine-tune-design-spec`, `version1`
- [x] Removed empty `/signals` route, signals components, and `data/public_intel.json` (feed count was 0)
- [x] Synced `README.md`, `CLAUDE.md`, `CONTRIBUTING.md` to current architecture
- [x] Archived obsolete Signal Black alignment plan
- [x] Clarified **Vercel** as production host; Netlify config marked legacy
- [x] Expanded PR template merge checklist

## Manual / owner actions (GitHub + Vercel UI)

These need account access outside the agent:

- [ ] Enable **branch protection** on `main` (require PR + green CI)
- [ ] Enable **auto-delete head branches** on merge
- [ ] Confirm Vercel project Node version = **20**
- [ ] Preview access: disable Deployment Protection for Previews **or** document SSO / token for agents
- [ ] After prototype merge: tag a release (e.g. `v2.0.0`) and delete merged feature branches
- [ ] Optional: open GitHub issues for deferred product work (resume PDF, contact form, writing index)

## Active branches (expected)

| Branch | Role |
|--------|------|
| `main` | Production |
| `cursor/ai-systems-portfolio-prototype-f279` | Draft PR #34 — LinkedIn-synced orb landing |
| `cursor/repo-hygiene-f279` | This hygiene PR (stack onto prototype or merge via #34) |

## Hosting

- **Production:** Vercel → [askmystack.space](https://askmystack.space)
- **Analytics:** `@vercel/analytics` + Speed Insights
- **`netlify.toml`:** left in-repo for optional Netlify builds only — not the live host of record
