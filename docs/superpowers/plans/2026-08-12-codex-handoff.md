# Codex Handoff — ASK. Three-Mode Redesign

**Handing off from:** Claude (this session), 2026-08-12
**Branch:** `docs/fine-tune-design-spec` (19 commits ahead of `main`, not yet a PR)
**Read first:** `docs/superpowers/plans/2026-08-10-vectors-redesign-plan.md` (the original task-by-task plan) and `docs/superpowers/specs/2026-08-10-vectors-redesign-design.md` (the design spec it implements). This document is the status report and continuation guide layered on top of those two — it tells you what's actually true in the code right now versus what the plan assumed, and what to do next.

## How to use this document

1. Read "Where things actually stand" to get an accurate picture — the plan document describes the *intent*, this section describes *reality*, and they've diverged in a few places worth knowing before you touch anything.
2. Read "Hard-won gotchas" before writing any code in this repo. Every item there cost real debugging time in this session and will bite again if repeated.
3. Work the "Next course of action" list in order. It's already re-prioritized against the original plan's Phase 4/5/6 based on what turned out to already be done or turned out to be higher-risk than expected.
4. Use the "Verification protocol" for every change — the methodology matters, not just the commands (see the `whileInView` false-negative note).

---

## Where things actually stand

The plan's Phase 0–3 are done, verified in a real browser, and committed. Phase 4–6 are not started. Concretely:

| Phase | Plan says | Actual state |
|---|---|---|
| 0 — Design tokens & primitives | Done | Done, but required a major repair (see gotchas) |
| 1 — Editorial (`/discover`) | Done | Done: hero, featured essay, 8-project case study grid, live GitHub open-source section (ISR), career timeline, case study detail pages (`/discover/[slug]`, 8 SSG pages) |
| 2 — Dashboard (`/signals`) | Done | Done: status bar, metrics, category breakdown, filterable/searchable feed (URL-state), 124 SSG detail pages (`/signals/[id]`). Built on **real data**, not the plan's assumed API routes — see below |
| 3 — Spatial (`/explore`) | Done | Done: canvas force-graph (pillars/systems/topics derived from `content/projects.ts`), entry portal, accessible node index, 35 SSG node pages (`/explore/[node]`) |
| 4 — Cross-mode integration | Not started | Ask assistant surfacing, cross-mode transitions, mobile bottom-tabs, SEO/JSON-LD per route, responsive audit |
| 5 — Content updates | Mostly already done as a side effect of Phase 1 | Job title, X account, all 5+ systems, case study content are live. What's left: homepage (legacy `/`) copy pass, cross-checking whether `/` should now point at `/discover` |
| 6 — Testing & deploy | Not started | Accessibility audit, Lighthouse, visual regression baseline, manual owner steps, production deploy |

**Deliberate deviation from the plan:** Phase 2's spec calls for `app/api/signals/route.ts` GET endpoints. Those were **not built**. The site is fully static (SSG/ISR), and the signal feed already exists as a committed JSON file (`data/public_intel.json`, refreshed by an external pipeline — see `lib/intel.ts`). Building API routes would have added a runtime dependency for no benefit. Dashboard components (`components/Dashboard/*`) consume `lib/intel.ts` directly. **Do not build the API routes from the plan** unless a real requirement for dynamic/client-fetched signals emerges — the static approach is intentional, not a shortcut.

---

## Hard-won gotchas

These are not style preferences — each one silently broke the site or a real accessibility requirement, and each was only caught by actually rendering the page in a browser, not by `tsc`/`eslint`/`next build` passing green.

### 1. This project is Tailwind **v4**. `tailwind.config.ts` is not read for tokens.
All theme tokens live in `app/globals.css` inside `@theme { ... }` and plain `:root { ... }` blocks, loaded via `@import "tailwindcss";` at the top of the file. An earlier task in this redesign replaced `globals.css` wholesale and deleted that import line — every Tailwind utility class on the entire site silently stopped working, and nobody caught it because `next build` type-checks and lints but doesn't render anything. **If `next build` is green but the site looks unstyled or partially styled when you actually load it, check that `@import "tailwindcss"` is still the first line of `app/globals.css` before anything else.**

### 2. `text-[var(--x)]` is parsed by Tailwind as a *color* utility, not a size.
Writing `className="text-[var(--type-display-xl-size)]"` compiles without error and does nothing visually — Tailwind's arbitrary-value parser for the `text-` prefix assumes color context. Custom font sizes must go through real CSS classes. This repo now has composite classes in `globals.css` for exactly this: `.t-display-xl`, `.t-display-lg`, `.t-display-md`, `.t-body`, `.t-caption`, `.t-mono` — each bundles size + weight + line-height for one of the plan's six typography levels. **Use these classes, never `text-[var(--type-*)]` directly.**

### 3. `whileInView` scroll-reveal animations produce false-negative screenshots.
Every mode component uses Framer Motion's `whileInView` with `viewport={{ once: true, margin: "-80px" }}` for scroll-triggered fade+rise. This is correct for real users (who scroll). But if you screenshot a page with Playwright/Puppeteer using `page.screenshot({ fullPage: true })` **without first performing an actual `window.scrollTo` walk down the page**, elements below the first viewport stay at `opacity: 0` in the capture — because the IntersectionObserver backing `whileInView` never fired. This looks exactly like a rendering bug (content silently missing) and cost real debugging time in this session before being traced to the capture method, not the code. **Always scroll stepwise before capturing a full-page screenshot of any mode route:**
```js
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 350) {
  await page.evaluate((yy) => window.scrollTo({ top: yy }), y);
  await page.waitForTimeout(100);
}
await page.evaluate(() => window.scrollTo({ top: 0 }));
await page.waitForTimeout(400);
await page.screenshot({ fullPage: true, path: "..." });
```
This also means: any tool that renders this site without simulating scroll (naive social-preview bots, some PDF exporters) will see partially blank pages. Real crawlers (Googlebot) and real users are fine. Worth knowing, not yet worth re-architecting around — flagged here so it isn't mistaken for a regression later.

### 4. Route chrome is intentionally split — don't merge it back.
`app/layout.tsx` renders two different navigation/footer sets depending on the route, via `components/shared/RouteChrome.tsx` (`ModeOnly` / `LegacyOnly`). Mode routes (`/discover`, `/signals`, `/explore` — listed in `MODE_PREFIXES`) get the new `Navigation` + `Footer`. Everything else (`/`, `/work`, `/ask`, etc.) keeps the pre-existing `Header` + `SignalField` + legacy `Footer`, untouched from before this redesign started. If you add a new mode-route prefix, add it to `MODE_PREFIXES` in that file — don't hand-wire chrome into individual pages.

### 5. Editorial motion stagger token is `MOTION.timing.editorial.stagger` (45ms), not `.reveal`.
`lib/constants.ts` has both `reveal: 350` (an animation *duration*, per the design spec) and `stagger: 45` (the delay *between* staggered elements, also per spec). An earlier pass used `.reveal` as the stagger interval by mistake, making an 8-card grid take 2.45s to finish appearing instead of ~350ms total. If you add a new staggered list in Editorial mode, use `.stagger` for `staggerChildren`/per-item delay math, and `.pageTransition` (550ms) for the actual fade+rise duration.

### 6. Touch targets: verify with `getBoundingClientRect()`, not by eye.
The plan's own audit backlog (search the plan doc for "44px") flagged sub-44px touch targets as a launch blocker. Visually, links with `px-2 py-1` padding *look* tappable in a screenshot but measure well under 44px (30px was typical). This was only caught by scripting an actual `getBoundingClientRect()` measurement in Playwright at a 390px viewport — visual review missed it twice. **Any new interactive element in mode UI needs `min-h-[44px]` (and `min-w-[44px]` for icon-only buttons), verified by measurement, not by looking at it.**

### 7. Feed URLs must be sanitized before they reach an `<a href>`.
`lib/intel.ts`'s `getIntelFeed()` runs every item's URL through `safeExternalUrl()`, which drops anything that isn't `http:`/`https:`. This exists because the feed is populated by an external pipeline scraping third-party sources — a compromised or malformed feed entry with a `javascript:` URL would otherwise become stored XSS on every card, detail page, and the graph view that renders it. **If you add any new surface that renders `item.url` from the intel feed, get it through `getIntelFeed()` (already sanitized) — never read `data/public_intel.json` directly.**

### 8. Dashboard mode's spec text-secondary color fails contrast as body text.
`--color-dashboard-text-secondary: #3D3530` (from the original design spec) is roughly 1.5:1 against the dashboard background — nowhere near AA. It's now treated as **border/decorative only**. Two new tokens exist for actual text: `--color-dashboard-text-bright` (`#F2E7D8`, headlines/primary content) and `--color-dashboard-text-muted` (`#A18D75`, secondary/meta text, AA-compliant). Use those two for any new Dashboard-mode text; don't reach for `--color-dashboard-text-secondary` for anything readable.

---

## Architecture map

```
app/
  layout.tsx              Root layout — theme provider, RouteChrome split, legacy vs mode chrome
  globals.css              ALL design tokens (Tailwind v4 @theme + :root vars) + composite type classes
  discover/                Editorial mode
    page.tsx
    [slug]/page.tsx         Case study detail (SSG, 8 pages)
  signals/                 Dashboard mode
    page.tsx
    [id]/page.tsx           Signal detail (SSG, 124 pages — id is feed index, stable per deploy)
  explore/                 Spatial mode
    page.tsx
    [node]/page.tsx         Node detail (SSG, 35 pages)
  (legacy routes: /, /work/[slug], /ask, /signals-old paths — untouched, pre-redesign)

components/
  shared/
    RouteChrome.tsx         ModeOnly / LegacyOnly — route-based chrome switch, edit MODE_PREFIXES here
    Navigation.tsx           New mode nav (Discover/Signals/Explore + theme toggle)
    Footer.tsx                Direction-aware footer (reads useDirection())
    ThemeProvider.tsx
  ui/                       Shared primitives: Button, Card, Badge, Divider (direction-aware via prop)
  Editorial/                 Hero, FeaturedEssay, ProjectCard, ProjectsGrid, OpenSourceSection,
                              RepoTile, Timeline, TimelineItem, CaseStudyDetail
  Dashboard/                 StatusBar, MetricsGrid, MetricCard, CategoryBreakdown, SignalCard,
                              SignalFeed, FilterRail, SignalDetail
  Spatial/                   EntryPortal, SpatialGraph (canvas), NodeIndex
  signals/                  Pre-existing (PR #32) — SignalsFeed, SignalsGraph, still used on legacy paths

lib/
  constants.ts               COLORS, TYPOGRAPHY, MOTION, X_ACCOUNT, SHIPPED_SYSTEMS, CAREER
  types.ts                   Signal, System, Project (rich — see gotcha below), Role
  motion.ts                  Framer Motion variants: fadeUp/fadeIn/stagger (legacy), snapIn/snapCascade
                              (Dashboard), expandIn (Spatial), easeOutExpo/easeOutQuart easings
  intel.ts                   getIntelFeed() — the ONLY sanctioned way to read data/public_intel.json.
                              Sanitizes URLs, strips HTML entities, exposes intelCategories()/intelAge()
  hooks.ts                   useDirection() — path-based mode detection (discover/signals/explore)
  api.ts                     fetchGitHubRepos/fetchGitHubUser — ISR-cached (3600s), used by
                              OpenSourceSection

content/
  projects.ts                 THE case-study dataset. Rich Project type (problem/approach/results/
                              learnings/pillars/tags/metrics) — do not replace with a thin stub, 7+
                              consumers depend on the full shape (sitemap, OG images, terminal engine,
                              chat RAG, /work/[slug], /discover/[slug], knowledge graph derivation)
  career.ts                   Role[] — current role first
  knowledge-graph.ts           Derives Spatial mode's graph FROM content/projects.ts at build time —
                              don't hand-maintain a separate node list, extend projects.ts instead

data/
  public_intel.json          Committed by an external pipeline (askmy-brain), refreshed ~4x/day.
                              Read ONLY through lib/intel.ts.
```

---

## Next course of action (prioritized)

Work top to bottom. Each item names its files and its done-condition.

### 1. Verify the branch still builds clean before touching anything
```
cd /Users/abhinaysaikamineni/Projects/askmy-space
npx next build
```
Expect: green, 184 static pages. If this fails, stop and diagnose before starting new work — don't build on top of a broken base.

### 2. Phase 4 — Cross-mode integration (the largest remaining piece)
Reference: plan doc, "Phase 4: Cross-Mode Integration."
- **Ask assistant surfacing**: `components/Ask/` doesn't exist yet in the new mode UI (there's a legacy `/ask` page — check if it should be ported in or linked to from mode routes). Decide: does each mode get its own Ask entry point, or one shared widget? The design spec (`2026-08-10-vectors-redesign-design.md`) has the intended UX — read it before building.
- **Cross-mode page transitions**: moving between `/discover` → `/signals` → `/explore` currently has no transition treatment; each mode's own motion timing (550ms/120ms/400ms) should probably apply to the *entry* of the destination mode. Check `components/providers/PageTransition.tsx` (legacy) for the existing pattern to extend or replace.
- **Mobile bottom-tabs**: the plan calls for a bottom tab bar under ~480px instead of the top pill nav (which the production audit backlog also flags: "pill nav overflows at 375px" — verify this is still true post the touch-target fixes in commit `f09c8c5` before assuming it needs work).
- **SEO/JSON-LD per route**: `/discover/[slug]` and `/explore/[node]` and `/signals/[id]` have `generateMetadata()` but no structured data. The plan wants Person + Article JSON-LD per signal/case-study — see `lib/seo.ts` referenced in the plan's file structure (doesn't exist yet, would need creating).
- **Theme toggle meaning inside modes**: right now the toggle exists and persists via `ThemeProvider`, but verify each mode actually has a distinct, tested light AND dark treatment — Dashboard defaults dark, Editorial defaults light, Spatial defaults dark, per spec. Confirm all three render correctly in *both* states, not just their default.

### 3. Phase 5 — Content, mostly a verification pass, not new building
Most of Phase 5 landed as a side effect of Phase 1 (career, systems, X account, case study content are real and live). Remaining:
- Decide and implement whether the root `/` (legacy homepage) should now redirect/link into `/discover`, coexist as-is, or be retired. This is a product decision, not a technical one — surface it to the human owner rather than deciding unilaterally.
- One more copy pass on `/discover` hero/tagline against final SEO keyword targets if the owner has any (check `content/hero.ts` — referenced in the plan's file tree but not yet created; Hero copy is currently inline in `components/Editorial/Hero.tsx`).

### 4. Phase 6 — Testing & deployment
- **Accessibility**: run `axe-core` against all three mode routes (desktop + mobile). Manual touch-target and contrast spot-checks were done this session (see gotchas #6, #8) but a full automated pass hasn't run yet.
- **Lighthouse**: run against `/discover`, `/signals`, `/explore` — check the plan's budgets (mobile LCP ≤2.0s, CLS ≤0.05, a11y ≥95). The Spatial canvas graph and Dashboard's 124-item feed (paginated to 30 initially) are the most likely CLS/LCP risk points — check those first.
- **Visual regression baseline**: no Playwright visual-regression suite exists yet for the new modes — worth setting up now, before further changes, using the scroll-aware screenshot methodology from gotcha #3 as the capture method.
- **Manual owner steps** (Codex cannot do these — flag to the human): Vercel project env vars, production deploy trigger, DNS/domain check if changed. Do not attempt to deploy without explicit human sign-off.
- **The `data/public_intel.json` feed is stale** — last `generated_at` was 2026-08-02, meaning the askmy-brain pipeline hasn't pushed in 10+ days as of this handoff. The Dashboard StatusBar correctly shows "PIPELINE STALE" for this reason — that's working as intended, not a frontend bug. But it's worth flagging to the owner separately from any frontend work, since it's an upstream pipeline issue outside this repo's scope.

### 5. Housekeeping
- This branch (`docs/fine-tune-design-spec`) is 19 commits ahead of `main` with no PR open yet. At a natural checkpoint (e.g., after Phase 4), consider whether to open a PR for review rather than continuing to grow one branch — ask the human owner's preference before deciding.
- `undefined/graph-settled.png` was a stray debug artifact from this session's screenshot tooling (a script wrote to a literal `undefined` path); it's been deleted. If you see any other `undefined/` or similarly malformed paths appear from screenshot scripts, that's a script bug (likely a missing env var in the capture tool), not a repo issue — check the script before assuming it belongs in the repo.

---

## Verification protocol

For any change to a mode route (`/discover`, `/signals`, `/explore`) or their components:

1. `npx next build` — must be green, check the generated page count didn't unexpectedly drop (184 as of this handoff).
2. Start the server (`npx next start -p 3100` after build, not `next dev` — dev mode doesn't reflect production CSS/motion behavior reliably) and load the actual route in a browser or via Playwright.
3. **Screenshot with the scroll-walk method from gotcha #3** — a naive `fullPage` screenshot will produce false-negative "missing content" that isn't real.
4. If you touched anything interactive (links, buttons, form controls), measure touch targets with `getBoundingClientRect()` at a 390px viewport — don't eyeball it (gotcha #6).
5. Check the browser console for errors — ignore `_vercel/insights` and `_vercel/speed-insights` 404s locally (those only resolve on the real Vercel deploy), treat anything else as real.
6. If the change touches `data/public_intel.json` rendering, confirm URLs still route through `lib/intel.ts`'s sanitization (gotcha #7) — don't add a second read path to the raw JSON.

---

## Open questions for the human owner (don't decide these unilaterally)

- Should the legacy `/` homepage be retired in favor of `/discover`, or do both stay?
- Ask assistant: one shared widget across modes, or per-mode entry points with different framing?
- PR the current branch now, or keep building toward a larger checkpoint first?
- The stale `askmy-brain` pipeline — does the owner want that investigated as part of this work, or is it explicitly out of scope for the frontend redesign?
