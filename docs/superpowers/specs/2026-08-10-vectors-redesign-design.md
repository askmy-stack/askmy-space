# ASK. — Three Operating Modes Redesign Specification

**Date:** August 10, 2026  
**Project:** askmystack.space portfolio redesign  
**Vision:** Transform from conventional portfolio to AI engineering intelligence platform with three distinct visual operating modes: Editorial (research-focused), Dashboard (system-transparent), Spatial (immersive exploration).  
**Status:** Design Specification (Ready for Implementation Planning)

---

## Executive Summary

ASK. is being reimagined as a **unified platform with three operating modes**, each optimized for different contexts and audiences:

- **Editorial (`/discover`)** — Contemplative, research-driven narratives. For peers seeking understanding of methodology and thinking.
- **Dashboard (`/signals`)** — Energetic, transparent intelligence console. For technical peers who want to see system internals and decision logic.
- **Spatial (`/explore`)** — Immersive, organic knowledge exploration. For visitors wanting to traverse the conceptual topology and connections.

**Design Principle:** One coherent digital identity expressing three distinct personalities through consistent typography, color temperature, and motion libraries. The contradiction (refined + raw, ornamental + stark, energetic + contemplative) is the identity.

**Core Constraint:** All three modes use a warm-based color foundational system. Differences in proportion/intensity, not palette replacement. Users always recognize they're in ASK.

---

## Part 1: Foundational System (Unified Across All Three Modes)

### 1.1 Navigation & Information Architecture

**Routes (Directory Structure)**
```
/ → redirects to /discover
/discover         [Editorial mode]
  /discover/:slug [Case study / article detail]
/signals          [Dashboard mode]
  /signals/:id    [Individual signal detail]
/explore          [Spatial mode]
  /explore/:node  [Node detail / knowledge explorer]
/owner            [Tailscale-authenticated owner space]
  /owner/brief    [Daily brief]
  /owner/graph    [Knowledge graph search]
```

**Navigation Components (Cross-Mode Consistent)**
- **Desktop:** Persistent top navigation bar with mode selector (Discover · Signals · Explore), right-aligned: profile, theme toggle
- **Mobile (<768px):** Bottom tab bar (5 tabs: Discover, Signals, Explore, Owner, Menu)
- **Footer (All modes):** X link (https://x.com/ask_my_stack) · GitHub (https://github.com/askmy-stack) · Email · Copyright
- **Owner mode:** Not advertised in nav; direct `/owner` URL, Tailscale-gated

**Persistent Signals Across Modes**
- Status dot (● Pipeline live · {last_run} ET · {count} signals) — visible on Dashboard, subtle on Editorial, integrated into Spatial node state
- X account link in footer — consistent placement across all three
- Theme toggle (light/dark) — persistent per-user preference, applies across all modes
- Live pagination indicator ("updated 2h ago") — Editorial articles, Dashboard metrics, Spatial node timestamps

---

### 1.2 Typography System

**Font Families (CSS Variables)**
```css
--font-display: Georgia, serif          /* Display XL/LG: contemplative headlines */
--font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--font-mono: 'Menlo', 'Monaco', monospace
```

**Type Scale & Usage**

| Level | Size | Weight | Line-height | Usage | Example |
|-------|------|--------|-------------|-------|---------|
| **Display XL** | 3.0rem | 300–400 | 1.1 | Main page headlines, hero statements | "Research & Thinking" (Editorial hero) |
| **Display LG** | 1.8rem | 500–600 | 1.2 | Section headers, metric labels | "847 SIGNALS" (Dashboard) / "Scaling Laws" (Spatial node) |
| **Display MD** | 1.3rem | 600 | 1.3 | Card headlines, section subheads | Card titles, "Recent Essays" |
| **Body** | 1.0rem | 400 | 1.7 | Reading text, descriptions, card copy | Article body, case study narrative |
| **Caption** | 0.85rem | 400 | 1.5 | Metadata, timestamps, annotations | "emerging research · 2h ago · arxiv" |
| **Mono** | 0.9rem | 500 | 1.4 | System details, terminal output, code | "last_run: 09:00 et · pipeline_health: nominal" |

**Typography Principles (All Modes)**
- **Readability:** Body text max-width 65 characters (optimal for reading)
- **Hierarchy:** Clear visual distinction between levels; no skipped sizes
- **Contrast:** Text color pairs meet WCAG AA (4.5:1 minimum)
- **Whitespace:** Line-height ≥1.5 for body; 1.7 for Editorial (contemplative pace)
- **Mono usage:** System annotations, timestamps, code, technical details ONLY — never mono in headlines or body paragraphs

**Theme-Aware Application**
- Light mode: #1A1410 text on #F5E6D3 background (Editorial parchment)
- Dark mode: Adjust per direction (Editorial soft amber, Dashboard strong amber, Spatial warm beige)

---

### 1.3 Color System (Warm Foundation with Directional Intensity)

**Primary Color Palette (All Three Modes Use These Warm Tones)**

| Token | Editorial | Dashboard | Spatial | Hex | Purpose |
|-------|-----------|-----------|---------|-----|---------|
| **bg-primary** | Parchment | Deep | Earth | #F5E6D3 / #1A1410 / #0F0D0A | Main background |
| **accent-1** | Clay | Amber | Luminous | #C9A877 / #E8A76F / #F4D9A8 | Primary accent, CTAs |
| **accent-2** | Warm Amber | Rust | Ochre | #D4A574 / #B85A3B / #C9A877 | Secondary accent, dividers |
| **text-primary** | #1A1410 (light) | #E8A76F (dark) | #C9A877 (dark) | — | Main text color |
| **text-secondary** | #8B7355 (light) | #3D3530 (dark) | #8B7355 (dark) | — | Muted text, captions |
| **border** | #D4A574 | #3D3530 | #F4D9A8 | — | Dividers, borders |

**Semantic Status Colors (Unified Across All Modes)**
- **Live/Healthy:** #6FA86F (green) — system nominal, data flowing, connection active
- **Warning/Degraded:** #E8A76F (amber) — pipeline delayed, data stale, connection weak
- **Critical/Error:** #DC5D4F (red) — ingestion failed, system offline, alert state

**Color Strategy by Direction**

**Editorial:** High contrast between warm and neutral. Parchment ground + clay/amber accents (restrained). Suggests refinement, contemplation, clarity.

**Dashboard:** Deep background + high-contrast warm amber. Rust and red for hierarchy and urgency. Suggests energy, transparency, operational precision.

**Spatial:** Deep earth + luminous warm highlights + mineral gradients. Translucent layers. Suggests immersion, dimensionality, organic growth.

**Theme Support (Light & Dark)**
- Editorial: Light mode primary (parchment ground, dark text)
- Dashboard: Dark mode primary (deep background, warm text)
- Spatial: Dark mode primary (earth ground, luminous highlights)
- All modes: Toggle available; preference persisted to localStorage

---

### 1.4 Motion System (Unified Easing, Direction-Specific Timing)

**Global Easing Function**
```css
--easing-standard: cubic-bezier(0.16, 1, 0.3, 1)  /* Smooth, responsive */
--easing-ease-out: cubic-bezier(0, 0, 0.58, 1)   /* Gentle exit */
--easing-ease-in: cubic-bezier(0.42, 0, 1, 1)    /* Gentle enter */
```

**Motion Timings by Direction**

| Interaction | Editorial | Dashboard | Spatial | Purpose |
|---|---|---|---|---|
| **Page load/transition** | 550ms fade + 14px rise, staggered 45ms | Instant or 120ms snap | 400ms cross-fade through planes | Set emotional tone |
| **Hover on interactive** | 200ms ease, lift (3px) + accent warmth | 100ms scale(1.02) + glow | 200ms expand + layer reveal | Signal interactivity |
| **Scroll-triggered reveal** | 350ms ease-out (text + images flow) | 120ms cascade (filter changes) | Continuous ambient float (3–4s) | Pace content discovery |
| **Loading state** | Gentle fade shimmer (1.2s cycle) | Geometry-matched shimmer (1.2s) | Layered dissolve animation (800ms) | Communicate waiting |
| **Status indicator change** | Fade pulse (2.4s cycle) | Color pulse + numeric transition (350ms) | Continuous glow oscillation (2s) | Highlight state change |
| **Press/click** | 120ms scale(0.97) + fade | 120ms scale(0.97) + flash | 200ms scale(0.98) + depth shift | Tactile feedback |
| **Micro-interaction** | Smooth, unhurried (200ms+) | Snappy, responsive (100ms) | Flowing, dimensional (200ms+) | Reinforce personality |

**Accessibility (All Modes)**
- Respect `prefers-reduced-motion`: disable all animations, show content instantly
- Motion is decorative enhancement, never required for usability
- Animations don't interfere with readability (staggered reveals wait for user scroll)

---

### 1.5 Component Library (Core Primitives)

**Button**
- States: default, hover, active, disabled
- Sizes: sm (0.75rem), md (1rem), lg (1.25rem)
- Variants: primary (fill), secondary (outline), danger (red)
- Styling per direction: Editorial clay/amber, Dashboard strong amber/rust, Spatial luminous/ochre
- Motion: hover lift (3px, 200ms) + press scale (0.97, 120ms)

**Card**
- Header: Display MD headline + optional image
- Body: Body text or dense content grid
- Footer: Optional CTA or metadata
- Density varies per direction: Editorial generous padding (2rem), Dashboard compact (1rem), Spatial layered (nested cards)
- Border: 1px solid, color per direction
- Radius: 4px (precision) or 8px (softer feel)

**Badge**
- Status badge: filled pill, semantic color (green/amber/red)
- Category badge: outline pill, accent color
- Score badge: filled, accent-1 background, numeric text
- Typography: Caption (0.85rem), mono optional for system labels

**Divider**
- Editorial: Ornamental (✦ ✦ ✦, opacity 0.3–0.4)
- Dashboard: Minimal (1px solid border, opacity 0.2)
- Spatial: Organic (gradient line, opacity 0.3)

**Input / Search**
- Search box: outlined, rounded (4px), accent-color focus ring
- Filter pills: interactive, toggle selected state with accent-1
- Dropdown: semantic colors for status/severity

**Navigation**
- Top bar: horizontal links, accent underline on active, smooth transition (200ms)
- Bottom tabs: vertical layout, fill active tab with accent-1, icon + label
- Breadcrumb: mono typography, semantic spacing

**Modal / Sheet**
- Backdrop: semi-transparent dark overlay
- Panel: card-like container, accessible focus trap, escape to close
- Animation: 300ms slide-up + fade (all modes)
- Use case: Ask assistant input, signal/node detail, filters

**Toggle / Checkbox**
- Checkbox: outline box, accent-1 fill when checked, smooth transition (150ms)
- Toggle switch: pill background, accent-1 dot when active
- Accessibility: proper labels, keyboard accessible

---

## Part 2: Editorial Direction — `/discover`

### 2.1 Purpose & Audience

**What It Explains**
- Research narratives and thinking
- Project methodology and case studies
- Technical decision-making and reasoning
- Personal philosophy on AI engineering

**Who It Serves**
- Technical peers seeking to understand approach and depth
- Thoughtful recruiters who value methodology over credentials
- Collaborators exploring intellectual alignment

**Emotional Character**
Contemplative, intelligent, warm, precise, refined.

---

### 2.2 Visual Identity

**Color Application**
- **Primary ground:** #F5E6D3 (Parchment) — warm, inviting, editorial
- **Accent 1:** #C9A877 (Clay) — restrained, elegant
- **Accent 2:** #D4A574 (Warm Amber) — emphasis, ornamental dividers
- **Text:** #1A1410 (dark) on parchment
- **Borders:** #D4A574 (muted)

**Layout Principles**
- Asymmetrical but disciplined (not random)
- Generous whitespace, slow pacing
- Large, expressive headlines with breathing room
- Max-width 900px for reading comfort
- Ornamental dividers between sections (✦ ✦ ✦)

**Component Styling**
- Buttons: #C9A877 background, hover lift + warmth
- Dividers: ornamental (✦ ✦ ✦), opacity 0.3
- Cards: light border, white fill, subtle shadow
- Images: large, full-bleed hero shots with captions

**Motion Character**
- Slow, composed, narrative pacing
- Page transitions: 550ms fade + staggered 45ms reveal
- Hover: 200ms ease, lift + border warmth
- Scroll reveals: text + images flow in at 350ms
- Everything unfolds deliberately

---

### 2.3 Page Structure & Sections

**Hero**
```
[Metadata/Eyebrow]
"RESEARCH AND THINKING"

[Display XL Headline]
"Vectors"

[Display MD Subheading + Body]
"A curated stream of emerging research, 
strategic insights, and technical 
discoveries that shape my thinking."

[CTA Pair]
[Explore Work] [Browse Archive]
```

**Featured Essay / Work**
```
[Hero Image — Full Width]

[Metadata] emerging research · jul 2024

[Display LG Headline]
"Understanding Emergence Through Scale"

[Body Excerpt]
Recent work from frontier labs suggests...

[Ornamental Divider]
✦ ✦ ✦

[CTA]
[Read Full Essay]
```

**Work: Curated Projects Grid**
```
[Eyebrow] CURATED WORK

[3-column grid — Desktop, 1-column Mobile]

[Each Project Card]
  - Hero image
  - Display MD headline
  - Body excerpt
  - Tags (mo no)
  - "Read Case Study" button
```

**Open Source Section**
```
[Eyebrow] ~/OPEN-SOURCE
[One-liner] "The stack is public. Fork it, file issues, or steal the patterns."

[GitHub profile card]
[2–3 repo tiles with stars + language dot]

[CTA] [Contribute]
```

**Experience / Timeline**
```
[Eyebrow] EXPERIENCE

[Vertical, asymmetrical layout]
  - [2025] System Operations Analyst
    Architecting and optimizing intelligence infrastructure.
    May 2025 – May 2026 · Eastern Time
  
  - [2024] ...previous role...
```

**Footer**
```
[Ornamental divider]
[X link] [GitHub] [Email]
[Copyright notice]
```

---

### 2.4 Content Architecture (Editorial)

**Shipped Systems Integration**
Featured as case study examples:
- "Building eeg-seizure-detection: 15+ neural architectures on 916 hours of EEG data"
- "startupintel: Open-source intelligence platform powered by ML bots"
- "cortex: Organizational memory for AI agents"
- "meridian: Real-time supply chain risk intelligence"
- "parallax: Runtime reliability for autonomous agents"

**Job Title (New)**
- **System Operations Analyst** (May 2025 – May 2026, Eastern Time)
- Context: "Responsible for designing and maintaining the operational infrastructure supporting the Ask platform. Focus areas: data pipeline reliability, signal ingestion optimization, system health monitoring, and emerging research integration."

**SEO Content Strategy**
- Each case study: 500–800 words, H1 headline, semantic HTML
- Metadata: og:title, og:description, og:image per article
- JSON-LD: Article schema with author, datePublished, keywords
- Backlinks: Internal linking to related systems and essays

---

## Part 3: Dashboard Direction — `/signals`

### 3.1 Purpose & Audience

**What It Exposes**
- Live signal feed with scores and metadata
- System metrics and health status
- Ingestion pipeline activity
- Ranking logic and decision transparency
- Real-time category breakdown

**Who It Serves**
- Technical peers who want to see system internals
- Recruiters assessing technical depth
- Collaborators interested in data and methodology

**Emotional Character**
Energetic, analytical, transparent, raw, experimental.

---

### 3.2 Visual Identity

**Color Application**
- **Primary ground:** #1A1410 (Deep) — high-contrast, energetic
- **Accent 1:** #E8A76F (Strong Amber) — prominent, eye-catching
- **Accent 2:** #B85A3B (Rust) — secondary emphasis
- **Status Live:** #6FA86F (Green)
- **Status Warning:** #E8A76F (Amber)
- **Status Critical:** #DC5D4F (Red)
- **Text:** #E8A76F on dark ground
- **Borders:** #3D3530 (dark gray)

**Layout Principles**
- High information density, modular grids
- Compact typography, tight spacing
- Visible timestamps, scores, statuses
- Scan-optimized (quick eye path)
- Data-first presentation

**Component Styling**
- Buttons: #DC5D4F (danger/primary), hover scale + glow
- Badges: filled pill, semantic colors (green/amber/red)
- Cards: dark background (#2A2520), minimal border, high contrast
- Metrics: large numbers (Display LG), smaller labels (Caption)

**Motion Character**
- Immediate, responsive, operational
- Filter changes: 120ms snap + fade cascade
- Metric updates: 350ms numeric transition + color pulse
- Hover: 100ms scale(1.02) + glow
- Loading: geometry-matched shimmer
- Status changes: pulsing indicator

---

### 3.3 Page Structure & Sections

**Header / Status Bar**
```
[Left] Status indicator (● Pipeline live · run 09:00 ET · 847 signals)
[Right] [Theme toggle] [Owner access]
```

**Metrics Grid**
```
[3-column grid — desktop, 1-column mobile]

[Ingested Today]
247 ↑ 8% from avg

[Avg Quality]
7.8 · stable

[Next Run]
15:00 ET
```

**Category Breakdown**
```
[4-column grid]
emerging: 194 | applied: 87 | infrastructure: 43 | critical: 23
```

**Signal Feed**
```
[Each card]
  [Left] Display MD headline
  [Right] Score badge (8.7)
  
  [Meta] source · timestamp (2h ago)
  
  [Body] Signal summary (1–2 sentences)
  
  [Tags] category pills
  
  [CTA] [Read]
```

**Filters**
```
[Left rail — Desktop]
[Collapsible sheet — Mobile]

Category pills: emerging (count) · applied (count) · ...
Sort: latest · highest-score · trending

[Live count update]
Showing 23 of 847 signals
```

**Footer**
```
[System health]
last run: 09:00 ET | next run: 15:00 ET
pipeline status: nominal | ingested: 247 items today

[X link] [GitHub] [Email]
```

---

### 3.4 Content Architecture (Dashboard)

**Shipped Systems (Metrics Format)**
| System | Category | Status | Signals |
|--------|----------|--------|---------|
| eeg-seizure-detection | ML/Healthcare | Live | 45 |
| startupintel | Intelligence | Live | 128 |
| cortex | Knowledge Graph | Live | 67 |
| meridian | Risk Intelligence | Live | 52 |
| parallax | Agent Reliability | Live | 38 |

**Key Metrics (Updated Dynamically)**
- Total signals this week: 847
- Average quality score: 7.8
- Ingestion sources: 5 (arxiv, GitHub, research, signals desk)
- Refresh rate: 4x daily (06:00, 12:00, 18:00, 21:00 ET)
- Pipeline health: nominal | last update: 09:00 ET

**Job Title (Dashboard Context)**
- System Operations Analyst (May 2025 – May 2026 ET)
- Visible in owner panel or career metrics

**SEO Strategy**
- Feed is crawlable: `/signals?cat=emerging` creates shareable URLs
- JSON-LD: NewsArticle schema per signal
- Meta tags: og:title (signal title), og:description (summary), og:image (source thumbnail)

---

## Part 4: Spatial Direction — `/explore`

### 4.1 Purpose & Audience

**What It Offers**
- Knowledge graph visualization
- Concept relationship exploration
- Connected discovery (one node → related nodes)
- Immersive navigation through system topology

**Who It Serves**
- Explorers who want to traverse thinking patterns
- Peers interested in conceptual connections
- Visitors seeking an immersive brand experience

**Emotional Character**
Immersive, organic, mysterious, raw, alive.

---

### 4.2 Visual Identity

**Color Application**
- **Primary ground:** #0F0D0A (Deep Earth) — grounding, mysterious
- **Layer 1:** #1F1B16 (earthy mid-tone) — depth cuing
- **Accent 1:** #F4D9A8 (Luminous) — highlights, interactive states
- **Accent 2:** #C9A877 (Ochre) — secondary nodes, connections
- **Status indicators:** #6FA86F (live), #E8A76F (warning), #DC5D4F (critical)
- **Text:** #C9A877 (warm beige) on dark earth
- **Borders:** #F4D9A8 (luminous, subtle)

**Layout Principles**
- Depth through layering (parallax, z-index shifts)
- Organic geometry (rounded nodes, flowing connections)
- Atmospheric transitions (blur, fade, dissolve)
- Spatial navigation (scroll = move through depth)
- Minimal conventional UI (no grids, no rigid alignment)

**Component Styling**
- Buttons: transparent with luminous border, hover fill with earth background
- Nodes: circular gradients (#C9A877 → #8B7355), hover glow
- Connections: SVG paths, gradient strokes, animated on hover
- Cards: semi-transparent dark background, backdrop blur, minimal borders
- Text: atmospheric color shifts with depth

**Motion Character**
- Continuous, dimensional, exploratory
- Navigation: scroll-driven parallax + depth scale
- Node interaction: 400ms expand + layer reveal
- Connections: SVG stroke animation on hover (200ms)
- Ambient: floating nodes (±2px, 3–4s cycle), subtle glow pulses
- Transitions: cross-fade through dimensional planes (not linear cuts)

---

### 4.3 Page Structure & Sections

**Entry Portal**
```
[Display XL Headline]
"Explore"

[Subheading + Intro]
"Navigate through connected concepts, 
relationships, and emerging patterns."

[CTA Pair]
[Enter Node Space] [View as Graph]
```

**Central Nodes**
```
[3–5 major hub concepts, arranged in space]

[Each node]
  - Circular gradient (24–48px)
  - Display MD label
  - Connection count ("↔ 12 related nodes")
  - Hover: expand + reveal connections
```

**Node Detail (On Interaction)**
```
[Node expanded in center of viewport]

[Node visualization] (larger gradient circle)

[Display MD headline]
"Scaling Laws"

[Meta] ↔ connected to 12 nodes · strength: 0.87

[Body excerpt]
Understanding how model capabilities scale with...

[Related nodes] (small circles around, connected with lines)

[CTAs]
[Explore Related] [View Full Details]
```

**Connection Map (Optional Canvas/SVG)**
```
[Interactive graph overlay]
- Nodes as circles, sized by connection count
- Edges as lines, thickness by connection strength
- Hover reveals connection details
- Click navigates to node detail
- Animated on first load (3–5s node entrance)
```

**Footer**
```
[Atmospheric divider]
[X link] [GitHub] [Email]
[Subtle pattern / texture as background]
```

---

### 4.4 Content Architecture (Spatial)

**Knowledge Graph Structure**
Central hub nodes:
1. **Scaling Laws** — connects to: Emergence, Transformer Architecture, Compute
2. **Emergence** — connects to: Scaling Laws, In-Context Learning, Reasoning
3. **In-Context Learning** — connects to: Emergence, Scaling Laws, Attention Mechanisms
4. **AI Safety** — connects to: Emergence, Alignment, Risk Mitigation
5. **System Operations** — connects to: Pipeline, Reliability, Agent Autonomy

Peripheral nodes represent individual discoveries, papers, systems, concepts.

**Shipped Systems (Node Representation)**
```
[System Node] cortex
  ↔ connected to: Knowledge Graph, Agent Autonomy, Organizational Memory
  strength: 0.92
  
  "Organizational memory for AI agents. 
  Captures decisions into a knowledge graph, 
  enabling long-term context and learning."
```

**Job Title (Spatial Node)**
"System Operations Analyst — May 2025 to May 2026"
- Node connections: Pipeline Architecture, Agent Reliability, Data Ingestion
- Narrative: "Responsible for designing infrastructure that keeps the intelligence system operational and healthy."

**SEO Strategy**
- Each node: unique URL (`/explore/scaling-laws`), crawlable
- JSON-LD: Thing schema with name, description, related entities
- Sitemap includes all nodes
- Meta tags per node capture semantic relationships

---

## Part 5: Information Architecture & Content Model

### 5.1 Content Schema (Unified Across Modes)

**Signal/Vector**
```json
{
  "id": "signal_uuid",
  "title": "string",
  "summary": "string (≤280 chars)",
  "body": "string (optional, full content)",
  "source": "arxiv | github | research | hacker-news | internal",
  "sourceUrl": "url",
  "category": "emerging | applied | infrastructure | critical",
  "score": 0.0–10.0,
  "tags": ["string"],
  "published": "ISO 8601 timestamp",
  "edited": "ISO 8601 timestamp",
  "connections": ["signal_id", ...]
}
```

**Project/Case Study**
```json
{
  "id": "project_uuid",
  "title": "string",
  "description": "string",
  "heroImage": "url",
  "caseStudyText": "markdown",
  "techStack": ["string"],
  "systemsInvolved": ["system_id", ...],
  "published": "ISO 8601 timestamp",
  "role": "architect | contributor | lead",
  "impact": "string"
}
```

**System**
```json
{
  "id": "system_uuid",
  "name": "string",
  "category": "pipeline | intelligence | ux | foundation",
  "description": "string",
  "status": "live | development | archived",
  "repoUrl": "github url",
  "connections": ["system_id", ...],
  "shipped": "ISO 8601 date",
  "metrics": { "stars": int, "forks": int }
}
```

**Person/Career**
```json
{
  "id": "role_uuid",
  "title": "string",
  "company": "string",
  "description": "string",
  "startDate": "ISO 8601",
  "endDate": "ISO 8601",
  "timezone": "ET | UTC",
  "context": "string (what made it meaningful)"
}
```

---

### 5.2 Shipped Systems (Final List)

| System | Category | Description | Status | GitHub |
|--------|----------|-------------|--------|--------|
| **eeg-seizure-detection** | ML / Healthcare | Benchmark of 15+ neural architectures on 916 hours of pediatric EEG data. Demonstrates scaling patterns in medical AI. | Live | askmy-stack/eeg-seizure-detection |
| **startupintel** | Intelligence | Open-source startup intelligence platform powered by specialized ML bots. Automated research aggregation and analysis. | Live | askmy-stack/startupintel |
| **cortex** | Knowledge Graph | Organizational memory system for AI agents. Captures decisions and learning into a knowledge graph for long-term context. | Live | askmy-stack/cortex |
| **meridian** | Risk Intelligence | Real-time supply chain risk intelligence powered by geopolitical signals. Integrates external data streams with internal analysis. | Live | askmy-stack/meridian |
| **parallax** | Agent Reliability | Runtime reliability, diagnosis, and recovery framework for autonomous AI agents. Enables safe long-horizon task execution. | Live | askmy-stack/parallax |

Each system is displayed as:
- **Editorial:** Case study narrative, architectural decisions, lessons learned
- **Dashboard:** Metrics (stars, forks, last update), category, health status
- **Spatial:** Node in knowledge graph, connections to related systems and concepts

---

### 5.3 Updated Career Information

**Current Role**
- **Title:** System Operations Analyst
- **Duration:** May 2025 – May 2026
- **Timezone:** Eastern Time (ET)
- **Context:** "Designing and maintaining the operational infrastructure for the Ask platform. Responsibilities include data pipeline reliability, signal ingestion optimization, system health monitoring, and emerging research integration. Focus on bridging research discovery with production deployment."

**Display Across Modes**
- **Editorial:** Timeline entry with narrative context
- **Dashboard:** Metadata card with current status
- **Spatial:** Central node "System Operations" with connections

---

### 5.4 X Account Integration

**Presence**
- **URL:** https://x.com/ask_my_stack
- **Display:** Footer link (consistent across all three modes)
- **Context:** "Latest research, system updates, and thinking from @ask_my_stack"
- **Navigation:** Footer X icon → opens in new tab

---

## Part 6: SEO & Content Strategy

### 6.1 Meta & Structured Data

**Page-Level Meta Tags (All Routes)**
```html
<head>
  <title>{Page Title} — ASK.</title>
  <meta name="description" content="{Short description, ≤160 chars}" />
  <meta property="og:title" content="{Page Title}" />
  <meta property="og:description" content="{Description}" />
  <meta property="og:image" content="{Image URL}" />
  <meta property="og:type" content="website | article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ask_my_stack" />
</head>
```

**JSON-LD Schemas**
- **Organization** (homepage): name, logo, url, sameAs (GitHub, X)
- **Person** (about page): name, url, sameAs, jobTitle
- **Article** (Editorial articles): headline, description, image, author, datePublished, keywords
- **Thing** (Spatial nodes): name, description, sameAs

**Sitemap**
```
/ (Editorial home)
/discover
/discover/:slug (each case study)
/signals
/signals/:id (each signal)
/explore
/explore/:node (each knowledge node)
/owner
/open-source
/robots.txt
```

---

### 6.2 Content Rewrite — SEO Focus

**Homepage Hero (Editorial `/discover`)**
```
Current approach → New approach

"Building AI engineering platforms" 
→ 
"AI engineering architect building intelligent information systems. 
Designing data pipelines that discover emerging research. 
Creating systems that help people work with machine intelligence more effectively."

[Emotional, specific, keyword-rich: AI engineering, data pipeline, 
research discovery, machine intelligence]
```

**Signal Feed Description**
```
"A live feed of emerging research and technical discoveries 
that shape my thinking on AI systems, scaling behavior, 
and the intersection of research and deployment."

[Keywords: emerging research, AI systems, scaling, deployment, discovery]
```

**Open Source Section**
```
"The infrastructure behind ASK. is open-source. 
Explore the stack, file issues, contribute patterns, 
or fork the entire approach for your own research platform."

[Keywords: open-source, infrastructure, research platform, patterns]
```

---

## Part 7: Animation Consistency & Toggles

### 7.1 Toggle Animations (All Modes)

**Mode Toggle (Navigation)**
- Animation: 200ms cross-fade + slide (200px) in direction of new mode
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (standard)
- Stagger: Delay elements by 45ms (Editorial effect)
- Mobile: Slide up from bottom (sheet animation)

**Theme Toggle (Light ↔ Dark)**
- Animation: 300ms fade (no slide)
- All colors: CSS variables update smoothly (no flash)
- Persisted to localStorage immediately

**Ask Assistant Toggle (Widget / Full Screen)**
- Animation: 300ms slide-up + fade (widget to full modal)
- Backdrop: Fade in 200ms
- Content: Cascade reveal (45ms stagger)

---

### 7.2 Cross-Mode Animation Consistency

**Hover Interactions**
- All buttons: 200ms ease, lift 3px + accent color warmth
- All cards: 200ms ease, slight shadow increase + scale(1.02)
- All badges: 150ms ease, color shift to accent-1

**Loading States**
- Geometry-matched shimmer: 1.2s infinite loop
- Color pulse on metrics: 350ms ease-in-out, cycle 2.4s

**Status Changes**
- Live indicator pulse: 2.4s cycle, glow effect
- Warning state: amber color shift + pulse
- Error state: red + shake animation (120ms × 3 cycles)

---

## Part 8: Accessibility & Performance

### 8.1 Accessibility (WCAG 2.1 AA)

**Color Contrast**
- All text vs. background: ≥4.5:1 (normal text)
- Large text (18pt+): ≥3:1
- Interactive elements: ≥3:1 border contrast
- Status colors: Never the only indicator (always paired with icon/text)

**Motion**
- All animations respect `prefers-reduced-motion: reduce`
- Animations are enhancement, never required for functionality
- No auto-play videos or animated GIFs

**Keyboard Navigation**
- All buttons, links, inputs: keyboard focusable
- Focus visible (outline or highlight)
- Tab order: logical, left-to-right, top-to-bottom
- Modals: focus trap, escape to close

**Screen Reader Support**
- Semantic HTML (h1, main, article, nav, section)
- ARIA roles for components (button, grid, tab, etc.)
- Image alt text (descriptive, not "image of")
- Live regions for status updates (`aria-live="polite"`)

---

### 8.2 Performance

**Core Web Vitals Targets**
- **LCP (Largest Contentful Paint):** ≤2.5s
- **FID (First Input Delay):** ≤100ms
- **CLS (Cumulative Layout Shift):** ≤0.1

**Optimization Strategy**
- Critical CSS inline; defer non-critical
- Images: next/image with ISR, WebP + fallback
- Code-splitting: per-route lazy loading
- Fonts: system stack primary, serif for display (preload if non-system)
- No JavaScript blocking render

**Caching**
- Editorial pages: ISR (revalidate 3600s)
- Dashboard feed: ISR (revalidate 1800s) + client-side refresh
- Spatial graph: CSR (fetch on mount, cache 3600s)

---

## Part 9: Implementation Scope & Dependencies

### 9.1 Frontend Packages

**Core**
- Next.js 14+ (React 18, TypeScript)
- Tailwind CSS (design tokens as CSS variables)
- Framer Motion (animations)
- next/image (image optimization)

**Optional (Per Direction)**
- **Spatial:** Three.js or Babylon.js (node graph visualization) OR custom SVG + Canvas
- **Dashboard:** Recharts or D3 (metrics visualization)
- **Editorial:** No additional packages (semantic HTML, Tailwind sufficient)

**Accessibility**
- headlessui (unstyled accessible components)
- @ariakit/react (accessible primitives)
- axe-core (automated testing)

---

### 9.2 Backend Integration

**Data Sources**
- ask-my-brain API: signal feed, daily brief, learning scores
- GitHub API: repo metadata (stars, forks, last update) for shipped systems
- Groq API: Ask assistant LLM responses
- Tailscale API: owner authentication (if applicable)

**Routes (Next.js API Routes)**
- `GET /api/signals` — fetch signal feed (paginated, filterable)
- `GET /api/signals/:id` — fetch single signal detail
- `GET /api/nodes` — fetch knowledge graph nodes + connections
- `GET /api/repos` — fetch GitHub repo metadata
- `POST /api/assistant/chat` — Ask assistant (public + owner)
- `GET /api/owner/session` — owner authentication check

---

### 9.3 Content & Data Updates

**Pre-Implementation Checklist**
- [ ] Scrape current shipped systems, verify 5 repos
- [ ] Update career info: "System Operations Analyst" (May 2025 – May 2026 ET)
- [ ] Add X account: https://x.com/ask_my_stack to footer
- [ ] Rewrite all content (hero, sections, descriptions) for SEO + warmth
- [ ] Create case study narratives for 5 systems
- [ ] Design knowledge graph: 5 central nodes, ~30 peripheral nodes
- [ ] Generate open-source section content + GitHub profile card

---

## Part 10: Design Decisions & Rationales

### 10.1 Why Three Modes?

**Problem:** A single visual identity couldn't serve three audiences simultaneously without compromise.
- **Editorial** (peers) want depth, narrative, time to read.
- **Dashboard** (technical partners) want speed, transparency, metrics.
- **Spatial** (explorers) want immersion, discovery, connections.

**Solution:** One foundational system (warm typography, motion easing, component structure) expresses three distinct personalities through intensity and pacing. Users always recognize it's ASK., but experience three different rhythms.

---

### 10.2 Why Warm Color Palette?

**Problem:** Default tech palettes skew cool (blues, grays), which reads as clinical or corporate. User is AI engineer (warm field), not bank.

**Solution:** Warm-based system (clay, amber, earth, ochre) feels more human, contemplative, and trustworthy. The contradiction (raw + refined, energetic + calm) is expressed through intensity variation, not palette replacement. This forces coherence.

---

### 10.3 Why Motion Varies Per Direction?

**Problem:** Same motion timing across Editorial, Dashboard, and Spatial would undermine the personality differentiation.

**Solution:** Motion is a design language that reinforces emotional character:
- Editorial: slow (550ms) → contemplative pace
- Dashboard: fast (120ms) → operational responsiveness
- Spatial: medium (400ms) → exploratory flow

All use same easing function and animation library, so changes scale consistently.

---

### 10.4 Why Separate Knowledge Graph?

**Problem:** Signals feed + case studies don't expose the *conceptual relationships* between research areas, systems, and thinking.

**Solution:** Spatial mode creates a graph where nodes (concepts, systems, papers) and edges (relationships, connections) are first-class citizens. Visitors can explore the topology of thinking, not just consume content sequentially.

---

## Part 11: Definition of Done

**Design Specification is complete when:**
- [ ] All three directions (Editorial, Dashboard, Spatial) have visual specifications
- [ ] Color system is complete (all tokens, all themes, all modes)
- [ ] Typography hierarchy is defined (all levels, all use cases)
- [ ] Motion system is specified (all interactions, all timing, all easing)
- [ ] Component library primitives are designed (button, card, badge, divider, input, nav, modal)
- [ ] Information architecture is clear (routes, content model, schemas)
- [ ] Shipped systems are documented (5 repos, descriptions, display patterns)
- [ ] Career info is updated (System Operations Analyst, May 2025–May 2026 ET)
- [ ] X account is integrated (footer link, consistent across modes)
- [ ] Content is rewritten (SEO focus, warmth, specificity)
- [ ] Accessibility targets are documented (WCAG 2.1 AA)
- [ ] Performance targets are documented (Core Web Vitals)
- [ ] Implementation scope is clear (frontend packages, backend integration, data updates)

---

## Appendix: Design References & Inspiration

**Visual Alignment**
- **alphasignal.ai** — Signals layout grammar, serif + sans pairing, amber accent
- **uxdayshankar.com** — Product polish, component refinement, interaction richness
- **linear.app** — Two-tone display headline, accent restraint
- **brittanychiang.com** — Split identity (fixed + scrolling), sophisticated typography

**Conceptual Alignment**
- **Editorial:** Independent research journals (Gwern, Lesswrong), magazine typography (The Verge, Wired)
- **Dashboard:** Real-time monitoring tools (Grafana, Datadog), transparent ML dashboards
- **Spatial:** Knowledge graph exploration (Obsidian, Roam Research), 3D data visualization

**Design System References**
- Tailwind CSS (pragmatic utility-first)
- Headless UI (unstyled, accessible primitives)
- Framer Motion (production-grade animation)

---

## Sign-Off

**Specification Status:** Ready for Implementation Planning  
**Date:** August 10, 2026  
**Prepared by:** Claude Code (AI Assistant)  
**Reviewed by:** [User — Abhinaysaikamineni]

**Next Step:** Transition to writing-plans skill to create detailed implementation roadmap, broken into phases with specific deliverables, testing gates, and deployment strategy.

