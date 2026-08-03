# askmystack.space — Full Fine-Tune Design

**Date:** 2026-08-03
**Status:** Approved design, ready for implementation planning
**Scope:** Every surface of askmy-space — design, content, functionality, accessibility, performance

---

## 1. Goals and constraints

### What the site is for

All four audiences, simultaneously:

1. **Recruiters and hiring managers** — the work must be legible in 30 seconds
2. **Peers and collaborators** — the platform (pipeline, agent, graph) is the technical proof
3. **The owner** — daily utility surfaces, reachable but not advertised
4. **Contributors** — the code is public and forkable

No surface may serve only one of these.

### Hard constraints

- **$0/month.** Free tiers only: Groq (100k tokens/day), Vercel Hobby, GitHub Actions, Tailscale free, Neon free tier if used at all.
- **No backend the owner must operate.** The site is static/CDN-served; the one dynamic route (`/api/assistant/chat`) must degrade to something useful, not an error.
- **Public feed is allowlist-sanitized.** `data/public_intel.json` carries exactly `title, url, summary, score, category, tags, published`. Nothing else may reach the client.

### Two organizing principles

**Progressive disclosure.** Every surface reads in 30 seconds at the top, rewards a click for depth, and hides owner utility behind a direct URL. This is how one site serves four audiences without splitting into modes.

**Defined degradation.** On $0, "the free tier ran out" is a *when*, not an *if*. Every live surface has a specified, honest behavior for that state. Degradation is designed, not improvised per-surface.

---

## 2. Audit findings

All findings below were verified against the codebase on 2026-08-03. Contrast values are computed (WCAG 2.1 relative-luminance formula), not estimated.

### 2.1 Correctness bugs

| # | Finding | Location |
|---|---|---|
| B1 | Three animated background systems run simultaneously on `/`: `SignalField` (layout), `ScrollScene`→`NeuralLattice` (fixed z-30 overlay), `HeroScene`→`DataOrbits`+`HeroBlob` (in hero). Three independent animation loops. | `app/layout.tsx:102`, `app/page.tsx:19`, `components/hero/Hero.tsx:44` |
| B2 | `ScrollScene` theme detection is dead code. It reads and observes the `data-theme` attribute; the site sets theme via the `html.light` **class**. Its tint follows the OS preference and never responds to the toggle; its `MutationObserver` never fires. | `components/scene/ScrollScene.tsx:57-66` vs `components/ui/ThemeToggle.tsx:14,22` |
| B3 | Footer navigation is broken on every route except `/`. Links are bare `#work`, `#about`, `#now`, `#report`. The Footer renders from the layout, so on `/signals`, `/ask`, and `/work/*` these resolve against a page with no such IDs and do nothing. | `components/layout/Footer.tsx:35-46` |
| B4 | Skip link targets `#work`, which does not exist on `/signals` or `/ask`. On `/` it skips the entire hero. | `app/layout.tsx:98` |
| B5 | Nested `<main>` landmark on `/signals` and `/ask` — each page returns its own `<main>` inside the layout's `<main id="main">`. Invalid HTML and a duplicate landmark. | `app/layout.tsx:105`, `app/signals/page.tsx:15`, `app/ask/page.tsx:12` |
| B6 | `NowBlock` renders "Updated {current month}" from `new Date()` at render time in a client component. The date advances forever regardless of whether the content changed, and can produce a hydration mismatch across a month boundary. | `components/now/NowBlock.tsx:15` |

### 2.2 Accessibility — measured

Computed contrast ratios and prescribed remediations:

| Combination | Current | WCAG AA (normal text) | Fix | After |
|---|---|---|---|---|
| White label on solid `--accent` CTA, **dark** | 2.84:1 | **FAIL** | label → `var(--on-accent)` = `#0A0A0B` | 6.98:1 |
| White label on solid `--accent` CTA, **light** | 3.49:1 | **FAIL** | label → `var(--on-accent)` = `#0A0A0B` | 5.67:1 |
| `--accent` used as text, **light** on `--bg` | 3.26:1 | **FAIL** | new `--accent-text` = `#B54919` | 4.99:1 |
| `--accent` used as text, **light** on `--bg-elevated` | 2.99:1 | **FAIL** | new `--accent-text` = `#B54919` | 4.57:1 |
| `--mono` (green) as text, **light** on `--bg` | 3.08:1 | **FAIL** | light `--mono` → `#117C38` | 4.95:1 |
| `--mono` (green) as text, **light** on `--bg-elevated` | 2.82:1 | **FAIL** | light `--mono` → `#117C38` | 4.54:1 |
| Score chip (accent on `--accent-soft`), **light** | 2.92:1 | **FAIL** | chip text → `--accent-text` | ≥4.5:1 |
| Form input border (WCAG 1.4.11 requires 3:1) | 1.19:1 dark / 1.38:1 light | **FAIL** | new `--border-strong` = `#5D5D5E` / `#8F8C88` | 3.01:1 / 3.13:1 |

Passing today, leave alone: `--fg` (17.58:1 / 16.56:1), `--fg-muted` (5.47:1 / 5.37:1), dark-mode `--accent` as text (6.98:1), dark-mode `--mono` (6.00:1), dark score chip (6.13:1).

Non-contrast accessibility findings:

- **A1** — `SocialProofBar` runs an infinite marquee (`repeat: Infinity`) with no `useReducedMotion` guard and no pause control. Violates WCAG 2.2.2 (Pause, Stop, Hide). `components/social-proof/SocialProofBar.tsx:32-36`
- **A2** — `WorkRow`'s 3D tilt (mousemove-driven springs) has no reduced-motion guard. `components/work/WorkRow.tsx:21-42`
- **A3** — `SignalsGraph` is canvas-only with no keyboard path. The Feed view is the intended accessible equivalent, but nothing asserts this; it is an assumption, not a guarantee.

### 2.3 Design-system drift

- **D1** — Two parallel type systems coexist. The `t-*` family (78 usages) and a legacy `text-display-*` / `text-body-lg` family (11 usages, concentrated in `app/work/[slug]/page.tsx` and `components/hero/Hero.tsx`). They are **not interchangeable**: `text-display-xl` is roman, weight 400, `clamp(4rem,12vw,12rem)`; `t-display` is italic, weight 300, `clamp(2.25rem,4.5vw,4.5rem)`.
- **D2** — Dead CSS and tokens: `.text-caption` is defined with 0 usages; `--muted` is defined in both themes with 0 component usages.
- **D3** — Status-dot grammar violated in one of two places. Header uses the green `.live-dot`; Footer uses an orange `--accent` dot with `animate-pulse-dot`. The design rule is green = alive, accent = CTAs only. `components/layout/Footer.tsx:53`

### 2.4 Functional gaps

- **F1** — `/ask` has no degradation path. Beyond the missing `GROQ_API_KEY` on Vercel, when Groq's 100k TPD is exhausted mid-day the route returns a generic 502 "hit a snag." On a free tier this is the expected daily steady state, not an edge case.
- **F2** — `/signals` carries 124 items with no pagination or virtualization, and filter state lives only in React — views are neither shareable nor crawlable.
- **F3** — `Contact` is three buttons; `ReportIssue` immediately follows it and duplicates the contact intent, diluting the conversion moment.
- **F4** — `OpenSource` renders two CTAs with an identical `href` (both `siteConfig.social.github`).
- **F5** — `siteConfig.calendly` is a TODO placeholder pointing at a URL that may not resolve.
- **F6** — `app/work/[slug]` has no Article structured data, and most projects have no hero image (gradient placeholder path).
- **F7** — Test coverage is two files (`lib/terminal/__tests__/engine.test.ts`, `tests/visual/smoke.spec.ts`) across ~20 surfaces.

### 2.5 Verified non-issues — do not chase

Recorded so they are not re-investigated:

- `--surface` **is** defined in both themes (`globals.css:34,65`).
- Vercel Analytics and SpeedInsights are already wired (`app/layout.tsx:109-110`).
- JSON-LD `Person`, per-route metadata, OG image routes, `sitemap.ts`, and `robots.txt` all exist.
- `levelColors` in `data/skills.ts` uses CSS custom properties, not hardcoded hexes.
- **The prior plan's audit backlog cites `--ink3`, `--ink2`, and `--line`. These tokens exist only in the standalone prototype, not in this codebase.** Every contrast finding derived from them is inapplicable here.
- With only four projects in `content/projects.ts`, the prior plan's "two-tier SelectedWork" item is YAGNI and is **cut from scope**.

---

## 3. Architecture decisions

### 3.1 One background system

**Decision:** Keep `SignalField`. Retire `ScrollScene`, `NeuralLattice`, `HeroScene`, `DataOrbits`, `HeroBlob`.

`SignalField` is the approved Signal Black brand background, renders on every route from the layout, already handles DPR capping, hidden-tab pause, reduced-motion, and theme retinting correctly. The other two systems are a legacy hero treatment and a scroll-driven lattice that predate it. Removing them deletes ~500 lines, eliminates two animation loops, and resolves B1 and B2 together (B2 disappears with the component that contains it).

### 3.2 Type-system consolidation

**Decision:** Unify under the `t-*` namespace by *renaming the legacy classes into it*, preserving their declarations — not by remapping usages onto existing `t-*` classes of different size.

| Legacy class | Action | Target |
|---|---|---|
| `.text-display-xl` | rename, declarations unchanged | `.t-display-xl` |
| `.text-display-lg` | rename, declarations unchanged | `.t-display-lg` |
| `.text-display-md` | rename, declarations unchanged | `.t-display-md` |
| `.text-body-lg` | **merge** into existing `.t-body-lg` | `.t-body-lg` |
| `.text-caption` | delete (0 usages) | — |

The `.text-body-lg` merge is the one intentional visual change: `/work/[slug]` body copy moves from `1.125rem / 1.65` to `clamp(1rem,1.4vw,1.0625rem) / 1.8`, and inherits `color: var(--fg-muted)` unless an explicit color class overrides it (the existing call sites already set explicit colors). This is a deliberate normalization, and case-study pages must be visually re-checked after it.

### 3.3 Token additions

Added to `app/globals.css` only. No hex values in components.

```
:root {                      /* dark */
  --accent-text:   #FF6B35;  /* same as --accent; dark already passes */
  --on-accent:     #0A0A0B;  /* label color on solid accent fills */
  --border-strong: #5D5D5E;  /* UI component boundaries, WCAG 1.4.11 */
}
html.light {
  --accent-text:   #B54919;
  --on-accent:     #0A0A0B;
  --border-strong: #8F8C88;
  --mono:          #117C38;  /* was #16a34a */
}
```

`--muted` is deleted. Usage rule: `--accent` for fills and decoration; `--accent-text` wherever accent is a text or icon color; `--on-accent` for labels sitting on an accent fill; `--border-strong` for anything that is the sole visual boundary of an interactive control.

### 3.4 The degradation primitive

A single shared component, `components/ui/SurfaceState.tsx`, renders every non-happy state across the site:

```
type SurfaceStatus = "loading" | "empty" | "error" | "degraded";
```

- **loading** — geometry-matched `.skel` shimmer (already exists, currently inline in `SignalsFeed`)
- **empty** — reports pipeline health honestly: "Nothing in this window. Last run 09:00 UTC, next 15:00 UTC."
- **error** — names a way forward, never a bare apology
- **degraded** — the free tier is exhausted; the surface still does something useful

Every live surface consumes this. It is built in Phase 0 so no surface slice improvises its own.

### 3.5 `/ask` degradation ladder

The most important $0 design decision. Three tiers:

1. **Full** — `GROQ_API_KEY` present and quota available: model answer + deterministic source chips (current behavior).
2. **Degraded** — Groq returns 429 (quota exhausted). Instead of a 502, fall back to **retrieval-only answering**: keyword-match the question against the local feed (`data/public_intel.json`) and `content/projects.ts`, return the top matches in a templated response, labeled plainly: *"Daily model quota reached — answering from the index instead. Here's what matches."* Costs nothing, uses data already bundled, and keeps `/ask` useful for the rest of the day.
3. **Offline** — no key configured or hard failure: current graceful message plus the email CTA.

Tier 2 is new and is what makes `/ask` viable at $0. It also means the missing Vercel env var stops being a hard blocker — the page becomes useful before the key is ever set.

### 3.6 Contact and ReportIssue merge

**Decision:** Merge into one `Connect` section. Mono intent chips (Hire · Collaborate · Report a bug) switch the form's destination — `mailto:` for the first two, a prefilled GitHub issue for the third. One conversion point, no backend, no duplicate section, and the bug-report path (which already works) is preserved rather than discarded.

---

## 4. Phased plan

Each phase is one or more PRs. A phase is complete only when its **Done when** conditions are all met and verified.

### Phase 0 — Foundation

Shared work that every later phase depends on. Doing this first prevents fixing the same pattern seven times.

**0.1 Background consolidation**
Delete `components/scene/ScrollScene.tsx`, `components/hero/NeuralLattice.tsx`, `components/hero/HeroScene.tsx`, `components/hero/DataOrbits.tsx`, `components/hero/HeroBlob.tsx`. Remove `<ScrollScene />` from `app/page.tsx` and the `<HeroScene />` wrapper from `Hero.tsx`. Resolves B1, B2.

**0.2 Token fixes**
Add `--accent-text`, `--on-accent`, `--border-strong`; change light `--mono`; delete `--muted`. Sweep components: accent-as-text → `--accent-text`; solid-CTA labels → `--on-accent`; form-control borders → `--border-strong`. Resolves the entire 2.2 contrast table.

**0.3 Type-system consolidation**
Execute the 3.2 rename table; migrate the 11 legacy usages; delete dead CSS. Resolves D1, D2.

**0.4 Structural bug fixes**
Footer links → absolute (`/#work` etc.); skip link → `#main`; remove nested `<main>` from `/signals` and `/ask`; Footer status dot → `.live-dot`. Resolves B3, B4, B5, D3.

**0.5 `SurfaceState` primitive**
Build per 3.4; refactor `SignalsFeed`'s inline skeleton and empty states onto it.

**0.6 Test and CI harness**
Add `@axe-core/playwright`; assert zero serious/critical violations on `/`, `/signals`, `/ask`, `/work/[slug]`, in both themes. Add Lighthouse budgets (mobile LCP ≤ 2.0s, CLS ≤ 0.05, a11y ≥ 95). Extend the visual smoke spec to all four routes × two themes.

**Done when:** `tsc`, `eslint`, `vitest`, `playwright`, and `next build` all pass; axe reports zero serious/critical on all four routes in both themes; Lighthouse budgets met; no visual regression beyond the intentional `/work/[slug]` body-copy change from 3.2.

---

### Phases 1–7 — Surface slices

Each slice is taken to *done* across six dimensions before the next begins: **design · copy · function · responsive · a11y · tests.**

**Phase 1 — Hero.** Verify the hero still reads without `HeroScene`. Confirm the proof pill communicates pipeline liveness truthfully when the feed is stale. Guard the cursor-reactive blur behind reduced-motion.

**Phase 2 — Work.** `SelectedWork`, `WorkRow`, `app/work/[slug]`. Guard `WorkRow`'s tilt (A2). Add Article JSON-LD (F6). Re-verify case-study typography after the 3.2 merge.

*Hero-image rule (decided):* a project gets a hero image only where a genuine artifact from the work exists — a real figure, plot, or screenshot. Where none exists, the gradient treatment stands. No stock or generated imagery; a fabricated visual on a case study undermines the honest-evaluation claim the work rests on.

**Phase 3 — Signals.** URL-encoded filter state (`/signals?cat=…&q=…`) so views are shareable and linkable (F2). Assert the Feed view is a complete keyboard-accessible equivalent of the Graph (A3). Wire `SurfaceState`.

*Volume handling (decided):* progressive reveal, not virtualization — render 24 cards initially with a "Show more" control adding 24 at a time. Virtualization would add a dependency and scroll-restoration complexity for a list that is bounded at 200 by the exporter's own cap. Crawlability is not a concern here: every card links to an external source, so the page's indexable value is the collection and its description, not the individual rows.

**Phase 4 — Ask.** Implement the 3.5 degradation ladder (F1). Rate-limit UX with a real retry hint. Verify `aria-live` announces completed messages once, never streams token-by-token.

**Phase 5 — Connect.** Merge `Contact` + `ReportIssue` per 3.6 (F3). Resolve or remove `calendly` (F5). This is the conversion point for the "land me a role" job — it gets the most copy attention.

**Phase 6 — About / Experience / Now.** Fix `NowBlock`'s auto-advancing date (B6) — replace with an explicit `updatedAt` constant in content. Substantiate or soften the unsourced `StatCounter` claims ("94% pipeline reliability", "85% faster model deploys").

**Phase 7 — Open-source / Skills / Capabilities / Social-proof.** Fix `SocialProofBar`'s unguarded infinite marquee (A1) — reduced-motion guard plus a pause affordance. Differentiate `OpenSource`'s two identical CTAs (F4): the primary keeps its "Contribute" intent and deep-links to the good-first-issue filter; the secondary becomes the profile link it already reads as.

*Live repo stars (decided): cut.* The prior plan proposed fetching star counts server-side with ISR. Dropping it — it adds a network dependency and a failure mode for three repos whose counts are low enough that displaying them argues against the section's own case. The repo list stays static.

**Done when (per slice):** the section renders correctly at 390px, 768px, and 1440px in both themes; axe reports zero serious/critical for it; all interactive elements are keyboard-reachable with visible focus; copy follows the voice rules (information-dense, no filler, controls say exactly what they do); motion is reduced-motion-guarded; a test covers its primary behavior.

---

### Phase 8 — Global sweep

Only meaningful site-wide: performance budgets enforced in CI, per-route structured data completeness, cross-surface consistency (spacing rhythm, heading hierarchy, mono-voice discipline), full-site keyboard traversal, `prefers-contrast` and forced-colors pass.

---

### Phase 9 — New surfaces

Additive, sequenced last, and structured as **activation switches on already-shipped code** so no manual step ever blocks earlier phases:

- Owner path over Tailscale (`/owner`) — HMAC cookie, server-only Tailscale URL, never in the client bundle.
- Deeper case-study treatment on `/work/[slug]`.

---

## 5. Verification strategy

- **Automated, in CI on every PR:** `tsc --noEmit`, `eslint`, `vitest run`, `playwright test` (visual + axe), `next build`, Lighthouse budgets.
- **Per-phase manual gate:** screenshots at 390 / 768 / 1440 in both themes, compared against the prior state; explicit sign-off that no regression was introduced.
- **Contrast:** any new or changed color pairing is computed, not eyeballed. The script used for this audit is the reference implementation.
- **Degradation:** each live surface is tested in its degraded state deliberately (simulate 429, empty feed, missing key) — not assumed.

---

## 6. Out of scope

Explicitly cut, with reasons:

- **Two-tier `SelectedWork`** — only four projects; tiering solves a problem that does not exist.
- **Prototype-derived contrast findings** (`--ink3`, `--ink2`, `--line`) — those tokens are not in this codebase.
- **Paid infrastructure** — the $0 constraint is a design input, not a limitation to engineer around later.
- **Native SwiftUI clients** — separate effort, unaffected by this work.
- **Signals Desk and A.S.K. reskins** — separate repositories; this spec covers askmy-space only.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Deleting three background components causes visible regression | Phase 0.1 ships alone with before/after screenshots on all four routes; visual snapshots updated deliberately, reviewed not auto-accepted |
| Type-system merge shifts `/work/[slug]` layout | Called out in 3.2 as intentional; case-study pages get an explicit visual re-check in Phase 2 |
| Token sweep misses an accent-as-text usage | Grep guard in CI: fail if `text-\[var\(--accent\)\]` appears outside an approved allowlist |
| Retrieval-only `/ask` fallback returns poor answers | Tier 2 is labeled honestly as index-matching, not model reasoning; expectations set in the UI copy itself |
| Scope creep across 10 phases | Each phase is independently shippable and independently valuable; the plan may be stopped after any phase without leaving broken state |
