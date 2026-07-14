# Signal Black Alignment Plan — askmystack.space → prototype parity

**Goal:** close the gap between the live UI and the approved Signal Black v2 prototype
(artifact 0343b950). More professional (calmer type), simpler (one system voice), more
interactive (status-narrated chat, skeletons, live-dot proof).

**Design source of truth:** `docs/design/signal-black-prototype.html` (committed in Phase 0
from the session scratchpad). Every phase COPIES patterns from that file — do not invent.

**Root-cause gap analysis (verified against live code 2026-07-14):**
| # | Live today | Prototype | Fix phase |
|---|---|---|---|
| 1 | `.t-body` = Geist MONO → every paragraph renders monospace (busy, "terminal dump" feel) | Sans body; mono ONLY for eyebrows/paths/scores/timestamps | 1 |
| 2 | Full-width header, plain text links, no active state | Floating glass pill nav, accent-soft active tab, live dot | 2 |
| 3 | Hero meta = location dot | Status pill = pipeline PROOF (`● Pipeline live · run {time} · {n} signals`) — we now have real data for it | 2 |
| 4 | NeuralLattice prism | Signal Field canvas (drifting graph nodes + accent pulses) — the brand background | 3 |
| 5 | Chat: typing dots only | Status line → typing → reply → source chips (transparency contract) | 4 |
| 6 | Signals: instant filter swap, no loading states | Geometry-matched skeleton shimmer; press-scale on all controls | 4 |

**Constraints (all phases):** no new npm deps (`geist` pkg already ships GeistSans);
tokens only — never hardcode hexes outside `app/globals.css`; keep every existing
a11y gate (44px targets, `aria-busy`, reduced-motion).

---

## Phase 0 — Design source into repo (~15 min)
1. Copy the prototype HTML into `docs/design/signal-black-prototype.html`
   (session source: scratchpad `ask-platform-prototype.html`; if unavailable, download the
   artifact page source from https://claude.ai/code/artifact/0343b950-a72d-46ff-b9ec-dc73d5ebd1ab).
2. Allowed APIs (verified installed): `framer-motion`, `geist/font/sans` + `geist/font/mono`,
   `next/font/google` (Fraunces), existing CSS vars (`--accent`, `--accent-soft`, `--border`,
   `--bg-elevated`, `--fg-muted`, `--ease-out-expo`), classes (`container-editorial`,
   `t-label`, `t-caption`).
- **Verify:** file committed; `npm run build` still green.
- **Anti-pattern:** do not restyle anything in this phase.

## Phase 1 — Type simplification: sans body, mono = system voice (~1-2 h) ← biggest win
1. `lib/fonts.ts`: add `import { GeistSans } from "geist/font/sans"`, export, append to
   `fontVariables`.
2. `app/globals.css`: `@theme` + `:root` → `--font-body: var(--font-geist-sans), -apple-system,
   sans-serif;` then point `.t-body`, `.t-body-lg` at `var(--font-body)` (they currently use
   `var(--font-mono)` — lines ~207-224). Keep `.t-label`, `.t-caption`, eyebrows mono.
3. Sweep components: card titles/summaries/bubbles lose `font-mono`
   (`components/signals/SignalsFeed.tsx` title+summary, `components/ask/AskAgent.tsx` bubbles);
   mono stays ONLY on: nav labels, eyebrows, category/age rows, score chips, source hostnames,
   suggestion chips, disclosure lines.
   Copy reference: prototype `--sans` body rule (`body{...font-family:var(--sans);font-size:15px;line-height:1.55}`).
- **Verify:** screenshot a /signals card — title+summary sans, category/age/score mono;
  build+lint green. `grep -rn "font-mono" components/ | wc -l` drops; none on `<p>`/`<h2>`.
- **Anti-pattern:** don't touch Fraunces display; don't change type SIZES this phase.

## Phase 2 — Shell: glass pill nav + hero proof (~2-3 h)
1. `components/layout/Header.tsx` → floating centered pill: `backdrop-blur(20px)`,
   `border var(--border)`, radius 999; active route (`usePathname`) gets
   `bg-[var(--accent-soft)] text-[var(--accent)]`; theme toggle inside pill.
   Copy CSS from prototype `.shell`, `.shell-pill`, `.tab` block; keep existing mobile menu.
2. Live-dot component: copy prototype `.dot` + `@keyframes ping` into globals; dot appears in
   nav (non-home routes) and hero pill.
3. `components/hero/Hero.tsx`: replace location meta with the proof pill —
   `● Pipeline live · run {getIntelFeed().generated_at} · {count} signals` (format like
   SignalsFeed's `updatedLabel`); add CTA pair `[Ask my agent →]`(solid accent) +
   `[Read today's signals]`(ghost) → `/ask`, `/signals`. Copy prototype hero pill + `.cta-row`.
4. Two-tone: tagline line under the name uses `text-[var(--fg-muted)]` (prototype `.display .dim`).
- **Verify:** active state correct on all 4 routes; ping visible, frozen under
  `prefers-reduced-motion`; targets ≥44px; both themes.
- **Anti-pattern:** don't advertise `/owner` in nav; don't add a second accent color.

## Phase 3 — Signal Field ambient background (~2 h)
1. New `components/scene/SignalField.tsx` (client): port the prototype canvas VERBATIM —
   nodes `min(56, w*h/26000)`, edge link 130px, pulse every ~2.2s, colors read from CSS vars
   at theme change, DPR cap 2, pause on `document.hidden`, still frame under reduced-motion.
   Copy JS from prototype `/* signal field */` script block; copy `.glow` radial div.
2. Mount once in `app/layout.tsx` behind content (`position:fixed; z-index:-2`).
3. Retire `NeuralLattice`/`ScrollScene` on /signals + /ask (two canvases never run on one
   route). Keep or retire on Discover after a side-by-side screenshot — decide then.
- **Verify:** DevTools performance — no long tasks from the canvas; reduced-motion = static;
  both themes re-tint without reload.
- **Anti-pattern:** don't bump alphas above prototype values (~.05 lines / .32 nodes).

## Phase 4 — Interaction contract: chat transparency + loading states (~2-3 h)
1. `AskAgent.tsx`: before the reply, render mono status line `▸ searching signals · groq`
   (copy prototype `runDemo` sequencing: user bubble → 400ms → status → 650ms → typing →
   reply); then source chips under replies.
2. `app/api/assistant/chat/route.ts`: return `sources` — feed items whose title
   words appear in the reply (deterministic string match, max 3; never model-invented).
3. `SignalsFeed.tsx`: on filter/search change show geometry-matched skeleton cards ~400ms
   (copy prototype `.skel`, `@keyframes shimmer`); footer mono line
   `updates 4×/day · last run {time}`.
4. Global press feedback: `active:scale-[0.97]` on chips, rail buttons, send, CTAs.
- **Verify:** live flow shows status→typing→reply(→sources when GROQ_API_KEY set; offline
  message otherwise); skeletons appear and resolve; `aria-busy` + sr-only announcement intact.
- **Anti-pattern:** no word-by-word streaming into `aria-live`; no fabricated sources.

## Phase 5 — Verification pass (~1 h)
1. `npm run build && npm run lint`.
2. Playwright screenshots: `/`, `/signals`, `/ask` at 1440px + 390px, dark + light —
   side-by-side vs prototype screens.
3. Grep guards: no `font-mono` on paragraphs; `grep -rn "#FF6B35\|#E8500F" app components lib`
   → only `globals.css`; live `/signals` has zero `&lt;img`.
4. Lighthouse: a11y ≥ 95, mobile LCP ≤ 2.0s (canvas must not regress it).
5. Merge → verify all three pages on askmystack.space production.

**Total: ~1.5 working days. Phases 1+2 alone deliver ~80% of the perceived gap.**
