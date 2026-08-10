# ASK. Three Operating Modes Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign askmystack.space from conventional portfolio to unified platform with three distinct visual operating modes (Editorial, Dashboard, Spatial) while maintaining a warm-based foundational color system, consistent typography, and cross-mode animation library.

**Architecture:** 
Single Next.js codebase with three route groups (`/discover`, `/signals`, `/explore`), each expressing a distinct visual personality within a shared design foundation. Routes render mode-specific layouts and components that consume the same underlying data models (signals, projects, systems, career info). Shared primitives (button, card, badge, divider, motion tokens, color tokens) ensure coherence. Content updates (job title, X account, systems list, SEO metadata) are integrated throughout.

**Tech Stack:** 
Next.js 14, React 18, TypeScript, Tailwind CSS (with design tokens as CSS variables), Framer Motion (animations), @ariakit/react (accessible primitives), axe-core (accessibility testing), Playwright (visual regression testing).

---

## Global Constraints

- **Color palette:** All three modes must use warm-based colors (clay/amber/earth/ochre). No cool colors except semantic status indicators (green/amber/red).
- **Typography system:** Six levels (Display XL/LG/MD, Body, Caption, Mono). Mono used ONLY for system annotations, timestamps, code — never in headlines or body text.
- **Motion easing:** All animations use `cubic-bezier(0.16, 1, 0.3, 1)` unless direction-specific timing overrides (Editorial 550ms, Dashboard 120ms, Spatial 400ms).
- **Accessibility:** WCAG 2.1 AA minimum. All interactive elements keyboard accessible. Motion respects `prefers-reduced-motion`.
- **Performance:** LCP ≤2.5s, FID ≤100ms, CLS ≤0.1. ISR on Editorial (3600s), Dashboard (1800s).
- **Timezone:** All timestamps display in Eastern Time (ET), not UTC. Career role updated to "System Operations Analyst" (May 2025 – May 2026 ET).
- **Social:** X account https://x.com/ask_my_stack must appear in footer (consistent across all modes).
- **Shipped systems:** Display all 5 repos (eeg-seizure-detection, startupintel, cortex, meridian, parallax) with per-direction styling.

---

## File Structure

**Core Directory Layout:**

```
askmy-space/
├── app/
│   ├── layout.tsx                 [Root layout, theme provider, nav shell]
│   ├── globals.css                [Design tokens (CSS variables), typography scales, motion]
│   ├── discover/
│   │   ├── page.tsx               [Editorial hero, featured essay, projects, open-source]
│   │   ├── [slug]/
│   │   │   └── page.tsx           [Case study detail page]
│   │   └── layout.tsx             [Editorial-specific nav variant]
│   ├── signals/
│   │   ├── page.tsx               [Dashboard header, metrics, feed, filters]
│   │   ├── [id]/
│   │   │   └── page.tsx           [Signal detail page]
│   │   └── layout.tsx             [Dashboard-specific nav variant]
│   ├── explore/
│   │   ├── page.tsx               [Spatial entry, central nodes, graph overlay]
│   │   ├── [node]/
│   │   │   └── page.tsx           [Node detail page, connections]
│   │   └── layout.tsx             [Spatial-specific nav variant]
│   ├── owner/
│   │   ├── page.tsx               [Tailscale login redirect]
│   │   ├── brief/
│   │   │   └── page.tsx           [Owner dashboard: daily brief]
│   │   └── graph/
│   │       └── page.tsx           [Owner dashboard: knowledge graph]
│   └── api/
│       ├── signals/
│       │   ├── route.ts           [GET signals feed, paginated/filterable]
│       │   └── [id]/
│       │       └── route.ts       [GET single signal]
│       ├── nodes/
│       │   └── route.ts           [GET knowledge graph nodes + connections]
│       ├── repos/
│       │   └── route.ts           [GET GitHub repo metadata (ISR)]
│       └── assistant/
│           └── chat/
│               └── route.ts       [POST Ask assistant (Groq + RAG)]
├── components/
│   ├── ui/
│   │   ├── Button.tsx             [Shared primitive, direction-aware styling]
│   │   ├── Card.tsx               [Shared primitive, density varies per direction]
│   │   ├── Badge.tsx              [Status/category/score variants]
│   │   ├── Divider.tsx            [Ornamental (Editorial), minimal (Dashboard), organic (Spatial)]
│   │   ├── Input.tsx              [Search, filter controls]
│   │   ├── Modal.tsx              [Ask assistant modal, filter sheet]
│   │   └── Navigation.tsx          [Top bar + bottom tabs, theme toggle]
│   ├── Editorial/
│   │   ├── Hero.tsx               [Discover homepage hero]
│   │   ├── FeaturedEssay.tsx       [Article preview card]
│   │   ├── ProjectCard.tsx         [Case study preview]
│   │   ├── OpenSourceSection.tsx   [GitHub profile + repo tiles]
│   │   ├── Timeline.tsx            [Career/experience timeline]
│   │   └── CaseStudyDetail.tsx     [Full case study article]
│   ├── Dashboard/
│   │   ├── StatusBar.tsx           [Header with status indicator]
│   │   ├── MetricsGrid.tsx         [Ingested today, quality, next run]
│   │   ├── CategoryBreakdown.tsx    [4-column category counts]
│   │   ├── SignalCard.tsx          [Individual signal in feed]
│   │   ├── SignalFeed.tsx          [Paginated signal list]
│   │   ├── FilterRail.tsx          [Category pills, sort options]
│   │   └── SignalDetail.tsx        [Full signal article]
│   ├── Spatial/
│   │   ├── EntryPortal.tsx         [Explore homepage intro]
│   │   ├── CentralNodes.tsx        [Hub nodes visualization]
│   │   ├── KnowledgeGraph.tsx       [SVG/Canvas graph, nodes + edges]
│   │   ├── NodeVisualization.tsx    [Circular gradient node]
│   │   ├── ConnectionVisualization.tsx [SVG path animation]
│   │   ├── NodeDetail.tsx          [Node detail card, connections]
│   │   └── AmbientAnimation.tsx     [Floating nodes, glow effects]
│   ├── Ask/
│   │   ├── AssistantWidget.tsx      [Sheet/modal for Ask input]
│   │   ├── ChatBubble.tsx           [Message bubble (user/assistant)]
│   │   ├── TypingIndicator.tsx      [Typing dots animation]
│   │   └── AssistantChat.tsx        [Full chat interface]
│   └── shared/
│       ├── ThemeProvider.tsx        [Light/dark toggle, localStorage persistence]
│       ├── Head.tsx                 [SEO meta tags, JSON-LD]
│       └── Footer.tsx               [X link, GitHub, copyright]
├── lib/
│   ├── constants.ts                 [Color hex values, timing values]
│   ├── types.ts                     [TypeScript interfaces (Signal, Project, System, Role)]
│   ├── hooks.ts                     [useTheme, useDirection (Editorial/Dashboard/Spatial)]
│   ├── api.ts                       [API client functions (fetchSignals, fetchNodes, etc.)]
│   ├── seo.ts                       [Metadata generation, JSON-LD helpers]
│   └── motion.ts                    [Framer Motion variants (typography, interaction, page)]
├── content/
│   ├── projects.ts                  [Case study data: title, description, slug, systems]
│   ├── systems.ts                   [Shipped systems: name, category, description, GitHub URL]
│   ├── career.ts                    [Career history: role, company, duration, description]
│   └── hero.ts                      [Homepage copy: headline, tagline, CTA]
├── public/
│   ├── images/
│   │   ├── heroes/                  [Hero images for case studies]
│   │   ├── og/                      [Open Graph images]
│   │   └── logos/                   [GitHub, X, email icons]
│   ├── robots.txt                   [SEO]
│   └── sitemap.xml                  [SEO]
├── tailwind.config.ts               [Extend Tailwind with design tokens]
├── tsconfig.json                    [TypeScript config]
└── docs/
    ├── superpowers/
    │   └── specs/
    │       └── 2026-08-10-vectors-redesign-design.md [Design specification]
    └── superpowers/
        └── plans/
            └── 2026-08-10-vectors-redesign-plan.md [This file]
```

**Key Design Decisions:**
- **Single Next.js app:** Routes (`/discover`, `/signals`, `/explore`) handle mode switching, not separate codebases.
- **Shared primitives in `components/ui/`:** Button, Card, Badge, Divider accept `variant` prop to adapt per direction.
- **Data layer in `content/` and `lib/api.ts`:** Projects, systems, career data are decoupled from UI. API routes fetch and transform for each mode.
- **Motion/colors in `lib/constants.ts` + `globals.css`:** CSS variables for colors, Framer Motion variants for animation. No magic strings in components.
- **Type safety:** All data models defined in `lib/types.ts`. API routes and components consume these types.

---

## Phase 0: Design Tokens & Foundational Components

**Gate:** All design tokens defined, color system tested in light/dark themes, button/card/badge/divider render correctly across all directions.

### Task 0.1: Create Design Tokens (CSS Variables, TypeScript Constants)

**Files:**
- Create: `app/globals.css` (CSS variables section)
- Create: `lib/constants.ts` (TypeScript color/timing constants)
- Modify: `tailwind.config.ts` (extend Tailwind with design tokens)

**Interfaces:**
- Produces: CSS variables (`--color-editorial-primary`, `--color-dashboard-accent-1`, etc.), TypeScript constants (`COLORS`, `MOTION_TIMING`), Tailwind theme extension

- [ ] **Step 1: Write globals.css with CSS variables**

```css
/* app/globals.css */

:root {
  /* Editorial Mode Colors */
  --color-editorial-bg: #F5E6D3;
  --color-editorial-accent-1: #C9A877;
  --color-editorial-accent-2: #D4A574;
  --color-editorial-text: #1A1410;
  --color-editorial-text-secondary: #8B7355;
  --color-editorial-border: #D4A574;

  /* Dashboard Mode Colors */
  --color-dashboard-bg: #1A1410;
  --color-dashboard-accent-1: #E8A76F;
  --color-dashboard-accent-2: #B85A3B;
  --color-dashboard-text: #E8A76F;
  --color-dashboard-text-secondary: #3D3530;
  --color-dashboard-border: #3D3530;

  /* Spatial Mode Colors */
  --color-spatial-bg: #0F0D0A;
  --color-spatial-layer-1: #1F1B16;
  --color-spatial-accent-1: #F4D9A8;
  --color-spatial-accent-2: #C9A877;
  --color-spatial-text: #C9A877;
  --color-spatial-text-secondary: #8B7355;
  --color-spatial-border: #F4D9A8;

  /* Semantic Status Colors (All Modes) */
  --color-status-live: #6FA86F;
  --color-status-warning: #E8A76F;
  --color-status-critical: #DC5D4F;

  /* Typography Scales */
  --font-display: Georgia, serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Menlo', 'Monaco', monospace;

  --type-display-xl-size: 3rem;
  --type-display-xl-weight: 300;
  --type-display-xl-line-height: 1.1;

  --type-display-lg-size: 1.8rem;
  --type-display-lg-weight: 500;
  --type-display-lg-line-height: 1.2;

  --type-display-md-size: 1.3rem;
  --type-display-md-weight: 600;
  --type-display-md-line-height: 1.3;

  --type-body-size: 1rem;
  --type-body-weight: 400;
  --type-body-line-height: 1.7;

  --type-caption-size: 0.85rem;
  --type-caption-weight: 400;
  --type-caption-line-height: 1.5;

  --type-mono-size: 0.9rem;
  --type-mono-weight: 500;
  --type-mono-line-height: 1.4;

  /* Motion Timings */
  --motion-easing-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-easing-ease-out: cubic-bezier(0, 0, 0.58, 1);
  --motion-easing-ease-in: cubic-bezier(0.42, 0, 1, 1);

  --motion-editorial-page-transition: 550ms;
  --motion-dashboard-snap: 120ms;
  --motion-spatial-expand: 400ms;

  --motion-hover: 200ms;
  --motion-press: 120ms;
  --motion-reveal: 350ms;
}

/* Light mode (Editorial default) */
@media (prefers-color-scheme: light) {
  :root {
    --color-bg: var(--color-editorial-bg);
    --color-text: var(--color-editorial-text);
    --color-text-secondary: var(--color-editorial-text-secondary);
  }
}

/* Dark mode (Dashboard/Spatial default) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--color-dashboard-bg);
    --color-text: var(--color-dashboard-text);
    --color-text-secondary: var(--color-dashboard-text-secondary);
  }
}

/* Override via data-theme attribute */
:root[data-theme="light"] {
  --color-bg: var(--color-editorial-bg);
  --color-text: var(--color-editorial-text);
}

:root[data-theme="dark"] {
  --color-bg: var(--color-dashboard-bg);
  --color-text: var(--color-dashboard-text);
}

/* Global base styles */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--type-body-size);
  line-height: var(--type-body-line-height);
  transition: background-color 300ms, color 300ms;
}

h1 {
  font-family: var(--font-display);
  font-size: var(--type-display-xl-size);
  font-weight: var(--type-display-xl-weight);
  line-height: var(--type-display-xl-line-height);
}

h2 {
  font-size: var(--type-display-lg-size);
  font-weight: var(--type-display-lg-weight);
  line-height: var(--type-display-lg-line-height);
}

h3 {
  font-size: var(--type-display-md-size);
  font-weight: var(--type-display-md-weight);
  line-height: var(--type-display-md-line-height);
}

.text-caption {
  font-size: var(--type-caption-size);
  line-height: var(--type-caption-line-height);
}

.text-mono {
  font-family: var(--font-mono);
  font-size: var(--type-mono-size);
  font-weight: var(--type-mono-weight);
  line-height: var(--type-mono-line-height);
}

/* Accessibility: respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Write lib/constants.ts with TypeScript constants**

```typescript
// lib/constants.ts

export const COLORS = {
  editorial: {
    bg: '#F5E6D3',
    accent1: '#C9A877',
    accent2: '#D4A574',
    text: '#1A1410',
    textSecondary: '#8B7355',
    border: '#D4A574',
  },
  dashboard: {
    bg: '#1A1410',
    accent1: '#E8A76F',
    accent2: '#B85A3B',
    text: '#E8A76F',
    textSecondary: '#3D3530',
    border: '#3D3530',
  },
  spatial: {
    bg: '#0F0D0A',
    layer1: '#1F1B16',
    accent1: '#F4D9A8',
    accent2: '#C9A877',
    text: '#C9A877',
    textSecondary: '#8B7355',
    border: '#F4D9A8',
  },
  semantic: {
    live: '#6FA86F',
    warning: '#E8A76F',
    critical: '#DC5D4F',
  },
};

export const TYPOGRAPHY = {
  displayXL: { size: '3rem', weight: 300, lineHeight: 1.1 },
  displayLG: { size: '1.8rem', weight: 500, lineHeight: 1.2 },
  displayMD: { size: '1.3rem', weight: 600, lineHeight: 1.3 },
  body: { size: '1rem', weight: 400, lineHeight: 1.7 },
  caption: { size: '0.85rem', weight: 400, lineHeight: 1.5 },
  mono: { size: '0.9rem', weight: 500, lineHeight: 1.4 },
};

export const MOTION = {
  easing: {
    standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  },
  timing: {
    editorial: {
      pageTransition: 550,
      hover: 200,
      press: 120,
      reveal: 350,
    },
    dashboard: {
      pageTransition: 120,
      hover: 100,
      press: 120,
      snap: 120,
    },
    spatial: {
      pageTransition: 400,
      hover: 200,
      press: 200,
      expand: 400,
      ambient: 3000,
    },
  },
};

export const X_ACCOUNT = 'https://x.com/ask_my_stack';

export const SHIPPED_SYSTEMS = [
  {
    name: 'eeg-seizure-detection',
    category: 'ML / Healthcare',
    description: 'Benchmark of 15+ neural architectures on 916 hours of pediatric EEG data.',
    github: 'https://github.com/askmy-stack/eeg-seizure-detection',
    status: 'live',
  },
  {
    name: 'startupintel',
    category: 'Intelligence',
    description: 'Open-source startup intelligence platform powered by specialized ML bots.',
    github: 'https://github.com/askmy-stack/startupintel',
    status: 'live',
  },
  {
    name: 'cortex',
    category: 'Knowledge Graph',
    description: 'Organizational memory for AI agents. Captures decisions into a knowledge graph for long-term context.',
    github: 'https://github.com/askmy-stack/cortex',
    status: 'live',
  },
  {
    name: 'meridian',
    category: 'Risk Intelligence',
    description: 'Real-time supply chain risk intelligence powered by geopolitical signals.',
    github: 'https://github.com/askmy-stack/meridian',
    status: 'live',
  },
  {
    name: 'parallax',
    category: 'Agent Reliability',
    description: 'Runtime reliability, diagnosis, and recovery framework for autonomous AI agents.',
    github: 'https://github.com/askmy-stack/parallax',
    status: 'live',
  },
];

export const CAREER = {
  current: {
    title: 'System Operations Analyst',
    duration: 'May 2025 – May 2026',
    timezone: 'ET',
    description:
      'Architecting and optimizing intelligence infrastructure. Responsible for data pipeline reliability, signal ingestion optimization, system health monitoring, and emerging research integration.',
  },
};
```

- [ ] **Step 3: Extend Tailwind config with design tokens**

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: 'var(--color-editorial-bg)',
          accent1: 'var(--color-editorial-accent-1)',
          accent2: 'var(--color-editorial-accent-2)',
          text: 'var(--color-editorial-text)',
          border: 'var(--color-editorial-border)',
        },
        dashboard: {
          bg: 'var(--color-dashboard-bg)',
          accent1: 'var(--color-dashboard-accent-1)',
          accent2: 'var(--color-dashboard-accent-2)',
          text: 'var(--color-dashboard-text)',
          border: 'var(--color-dashboard-border)',
        },
        spatial: {
          bg: 'var(--color-spatial-bg)',
          accent1: 'var(--color-spatial-accent-1)',
          accent2: 'var(--color-spatial-accent-2)',
          text: 'var(--color-spatial-text)',
          border: 'var(--color-spatial-border)',
        },
        status: {
          live: 'var(--color-status-live)',
          warning: 'var(--color-status-warning)',
          critical: 'var(--color-status-critical)',
        },
      },
      animation: {
        shimmer: 'shimmer 1.2s infinite',
        pulse: 'pulse 2.4s infinite',
        ping: 'ping 2.4s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Run TypeScript compiler to check for errors**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css lib/constants.ts tailwind.config.ts
git commit -m "feat: add design tokens (colors, typography, motion)"
```

---

### Task 0.2: Create Shared UI Primitives (Button, Card, Badge, Divider)

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/Divider.tsx`
- Create: `lib/hooks.ts` (useDirection hook)

**Interfaces:**
- Consumes: COLORS, TYPOGRAPHY, MOTION from `lib/constants.ts`, CSS variables from `globals.css`
- Produces: React components with `direction` prop ('editorial' | 'dashboard' | 'spatial'), proper TypeScript types

- [ ] **Step 1: Create Button component**

```typescript
// components/ui/Button.tsx

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonDirection = 'editorial' | 'dashboard' | 'spatial';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  direction?: ButtonDirection;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', direction = 'editorial', className = '', ...props }, ref) => {
    const baseStyles =
      'px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 hover:duration-200 active:duration-120 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const directionStyles = {
      editorial: {
        primary: 'bg-editorial-accent1 text-editorial-bg hover:bg-editorial-accent2 hover:-translate-y-1 active:scale-97',
        secondary: 'border-2 border-editorial-border text-editorial-text hover:bg-editorial-text hover:text-editorial-bg',
        danger: 'bg-status-critical text-white hover:opacity-90',
      },
      dashboard: {
        primary: 'bg-dashboard-accent1 text-dashboard-bg hover:bg-dashboard-accent2 active:scale-97',
        secondary: 'border-2 border-dashboard-border text-dashboard-text hover:bg-dashboard-text hover:text-dashboard-bg',
        danger: 'bg-status-critical text-white hover:opacity-90',
      },
      spatial: {
        primary: 'border-2 border-spatial-accent1 text-spatial-accent1 bg-transparent hover:bg-spatial-accent1 hover:text-spatial-bg',
        secondary: 'border-2 border-spatial-accent2 text-spatial-accent2 bg-transparent hover:bg-spatial-accent2 hover:text-spatial-bg',
        danger: 'bg-status-critical text-white hover:opacity-90',
      },
    };

    const variantStyles = directionStyles[direction][variant];

    return (
      <button ref={ref} className={`${baseStyles} ${variantStyles} ${className}`} {...props} />
    );
  }
);

Button.displayName = 'Button';
```

- [ ] **Step 2: Create Card component**

```typescript
// components/ui/Card.tsx

import React from 'react';

type CardDirection = 'editorial' | 'dashboard' | 'spatial';

interface CardProps {
  direction?: CardDirection;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ direction = 'editorial', children, className = '' }: CardProps) => {
  const directionStyles = {
    editorial:
      'bg-white border-2 border-editorial-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
    dashboard:
      'bg-dashboard-layer1 border border-dashboard-border rounded-md p-4 hover:bg-opacity-80 transition-colors duration-100',
    spatial:
      'bg-spatial-layer1 bg-opacity-60 border border-spatial-border rounded-md p-6 backdrop-blur-sm hover:bg-opacity-80 transition-colors duration-200',
  };

  return (
    <div className={`${directionStyles[direction]} ${className}`}>{children}</div>
  );
};
```

- [ ] **Step 3: Create Badge component**

```typescript
// components/ui/Badge.tsx

import React from 'react';

type BadgeVariant = 'status' | 'category' | 'score';
type BadgeDirection = 'editorial' | 'dashboard' | 'spatial';
type BadgeStatus = 'live' | 'warning' | 'critical';

interface BadgeProps {
  variant?: BadgeVariant;
  direction?: BadgeDirection;
  status?: BadgeStatus;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({
  variant = 'category',
  direction = 'editorial',
  status = 'live',
  children,
  className = '',
}: BadgeProps) => {
  const statusColors = {
    live: 'bg-status-live text-white',
    warning: 'bg-status-warning text-dashboard-bg',
    critical: 'bg-status-critical text-white',
  };

  const variantStyles = {
    status: statusColors[status],
    category: {
      editorial: 'bg-editorial-accent1 bg-opacity-20 text-editorial-text border border-editorial-accent1',
      dashboard: 'bg-dashboard-accent1 bg-opacity-20 text-dashboard-text border border-dashboard-accent1',
      spatial: 'bg-spatial-accent1 bg-opacity-20 text-spatial-text border border-spatial-accent1',
    },
    score: {
      editorial: 'bg-editorial-accent1 text-editorial-bg font-bold',
      dashboard: 'bg-dashboard-accent1 text-dashboard-bg font-bold',
      spatial: 'bg-spatial-accent1 text-spatial-bg font-bold',
    },
  };

  const styles =
    variant === 'status'
      ? variantStyles.status
      : variant === 'score'
        ? (variantStyles.score as any)[direction]
        : (variantStyles.category as any)[direction];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${styles} ${className}`}>
      {children}
    </span>
  );
};
```

- [ ] **Step 4: Create Divider component**

```typescript
// components/ui/Divider.tsx

import React from 'react';

type DividerDirection = 'editorial' | 'dashboard' | 'spatial';

interface DividerProps {
  direction?: DividerDirection;
  className?: string;
}

export const Divider = ({ direction = 'editorial', className = '' }: DividerProps) => {
  const directionStyles = {
    editorial: 'text-center text-editorial-accent2 text-opacity-30 py-6',
    dashboard: 'border-b border-dashboard-border my-4 opacity-20',
    spatial: 'h-px bg-gradient-to-r from-transparent via-spatial-accent1 to-transparent opacity-30 my-6',
  };

  if (direction === 'editorial') {
    return <div className={`${directionStyles[direction]} ${className}`}>✦ ✦ ✦</div>;
  }

  return <div className={`${directionStyles[direction]} ${className}`} />;
};
```

- [ ] **Step 5: Create useDirection hook**

```typescript
// lib/hooks.ts

import { usePathname } from 'next/navigation';

export type Direction = 'editorial' | 'dashboard' | 'spatial';

export const useDirection = (): Direction => {
  const pathname = usePathname();

  if (pathname.startsWith('/signals')) return 'dashboard';
  if (pathname.startsWith('/explore')) return 'spatial';
  return 'editorial'; // default
};
```

- [ ] **Step 6: Write tests for Button component**

```typescript
// components/ui/__tests__/Button.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with primary variant for editorial', () => {
    render(
      <Button variant="primary" direction="editorial">
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-editorial-accent1');
  });

  it('renders with danger variant across all directions', () => {
    const { rerender } = render(
      <Button variant="danger" direction="editorial">
        Delete
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-status-critical');

    rerender(
      <Button variant="danger" direction="dashboard">
        Delete
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-status-critical');
  });

  it('applies custom className', () => {
    render(
      <Button className="custom-class" direction="editorial">
        Test
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

- [ ] **Step 7: Run component tests**

```bash
npm test -- components/ui/__tests__/Button.test.tsx
```

Expected: All tests pass.

- [ ] **Step 8: Commit**

```bash
git add components/ui/Button.tsx components/ui/Card.tsx components/ui/Badge.tsx components/ui/Divider.tsx lib/hooks.ts components/ui/__tests__/Button.test.tsx
git commit -m "feat: add shared UI primitives (Button, Card, Badge, Divider)"
```

---

### Task 0.3: Create Theme Provider & Root Layout

**Files:**
- Create: `components/shared/ThemeProvider.tsx`
- Create: `components/shared/Navigation.tsx`
- Create: `components/shared/Footer.tsx`
- Modify: `app/layout.tsx` (integrate ThemeProvider, Navigation, Footer)

**Interfaces:**
- Consumes: useDirection hook, COLORS, X_ACCOUNT constant
- Produces: Root layout, theme switching functionality, persistent user preference

- [ ] **Step 1: Create ThemeProvider component**

```typescript
// components/shared/ThemeProvider.tsx

'use client';

import React, { useEffect, useState } from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // Check localStorage for saved theme
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      return newTheme;
    });
  };

  if (!theme) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);
```

- [ ] **Step 2: Create Navigation component**

```typescript
// components/shared/Navigation.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { useDirection } from '@/lib/hooks';

export const Navigation = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const direction = useDirection();

  const isActive = (path: string) => pathname.startsWith(path);

  const navLinks = [
    { href: '/discover', label: 'Discover' },
    { href: '/signals', label: 'Signals' },
    { href: '/explore', label: 'Explore' },
  ];

  const directionStyles = {
    editorial: 'border-b border-editorial-border bg-editorial-bg text-editorial-text',
    dashboard: 'border-b border-dashboard-border bg-dashboard-bg text-dashboard-text',
    spatial: 'border-b border-spatial-border bg-spatial-bg text-spatial-text',
  };

  return (
    <nav className={`sticky top-0 z-50 ${directionStyles[direction]}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ASK.
        </Link>

        {/* Center nav links */}
        <div className="flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? direction === 'editorial'
                    ? 'text-editorial-accent1 border-b-2 border-editorial-accent1'
                    : direction === 'dashboard'
                      ? 'text-dashboard-accent1 border-b-2 border-dashboard-accent1'
                      : 'text-spatial-accent1 border-b-2 border-spatial-accent1'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};
```

- [ ] **Step 3: Create Footer component**

```typescript
// components/shared/Footer.tsx

import { X_ACCOUNT } from '@/lib/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-current border-opacity-20 mt-12 py-8 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm opacity-60">
          © {new Date().getFullYear()} Abhinaysai Kamineni. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href={X_ACCOUNT} target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75">
            X
          </a>
          <a href="https://github.com/askmy-stack" target="_blank" rel="noopener noreferrer" className="text-sm hover:opacity-75">
            GitHub
          </a>
          <a href="mailto:kamineniabhinaysai@gmail.com" className="text-sm hover:opacity-75">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 4: Update root layout**

```typescript
// app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'ASK. — AI Engineering Platform',
  description: 'Building AI engineering platforms and intelligent information systems.',
  openGraph: {
    title: 'ASK. — AI Engineering Platform',
    description: 'Building AI engineering platforms and intelligent information systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Test theme toggle in browser**

Run: `npm run dev` and visit http://localhost:3000

- Check that theme toggle button appears
- Click theme toggle, verify styles change
- Reload page, verify preference persists

Expected: Theme persists across reloads, styles update smoothly (300ms fade).

- [ ] **Step 6: Commit**

```bash
git add components/shared/ThemeProvider.tsx components/shared/Navigation.tsx components/shared/Footer.tsx app/layout.tsx
git commit -m "feat: add theme provider, navigation, and footer"
```

---

**Phase 0 Gate:**
- [ ] Design tokens defined (colors, typography, motion)
- [ ] All 4 primitives (Button, Card, Badge, Divider) render correctly
- [ ] ThemeProvider toggles light/dark correctly
- [ ] Navigation highlights active route per direction
- [ ] Footer displays X, GitHub, email links
- [ ] Playwright screenshot: full page light + dark modes ✓

---

## Phases 1–6 (Abbreviated Task Structure)

Due to length constraints, I'll provide the **Phase structure and task organization** for the remaining phases. Each phase follows the same **task structure** as Phase 0 above (files, interfaces, actual code, tests, commits).

---

## Phase 1: Editorial Mode — `/discover`

**Gate:** Homepage renders with hero, featured essay, projects, open-source section. Case study detail page works. Slow motion (550ms page transitions) applies. Light mode (parchment) is default.

### Task 1.1: Content Models & Data
- Create: `lib/types.ts` (Signal, Project, System, Role interfaces)
- Create: `content/projects.ts` (5 shipped systems case study data)
- Create: `content/career.ts` (System Operations Analyst, May 2025–May 2026 ET)
- Produces: TypeScript types used by Editorial and Dashboard modes

### Task 1.2: Editorial Hero & Featured Essay
- Create: `components/Editorial/Hero.tsx`
- Create: `components/Editorial/FeaturedEssay.tsx`
- Create: `app/discover/page.tsx`
- Motion: 550ms fade + 14px rise on page load, 45ms stagger on elements
- Content: Rewritten hero copy (SEO-optimized), featured essay preview

### Task 1.3: Projects Grid
- Create: `components/Editorial/ProjectCard.tsx`
- Create: `components/Editorial/ProjectsGrid.tsx`
- Modify: `app/discover/page.tsx`
- Display: 3-column grid (desktop), 1-column (mobile), card shows hero image + headline + excerpt + "Read" CTA

### Task 1.4: Open Source Section
- Create: `components/Editorial/OpenSourceSection.tsx`
- Create: `components/Editorial/RepoTile.tsx`
- Modify: `app/discover/page.tsx`
- Fetch GitHub repo metadata via `lib/api.ts` (ISR, revalidate 3600s)
- Display: GitHub profile card + 2–3 repo tiles (stars, language dot)

### Task 1.5: Career Timeline
- Create: `components/Editorial/Timeline.tsx`
- Modify: `app/discover/page.tsx`
- Display: Vertical asymmetrical timeline of career roles, Display MD headline for role title, Body text for description

### Task 1.6: Case Study Detail Page
- Create: `components/Editorial/CaseStudyDetail.tsx`
- Create: `app/discover/[slug]/page.tsx`
- Display: Full case study article with hero image, Display LG headline, body text, systems involved, links to Spatial/Dashboard modes

### Task 1.7: Editorial Motion & Interaction
- Create: `lib/motion.ts` (Framer Motion variants for Editorial)
- Update: All Editorial components with motion variants (hover lifts, scroll reveals, page transitions)
- Test: Playwright screenshots of Editorial page in light mode (desktop + mobile)

---

## Phase 2: Dashboard Mode — `/signals`

**Gate:** Signals feed renders with metrics, status bar, feed cards, filters. Dark mode (deep background) is default. Fast motion (120ms snaps) applies. Real-time metrics update.

### Task 2.1: Dashboard Data Models & APIs
- Create: `app/api/signals/route.ts` (GET signals feed, paginated + filterable)
- Create: `app/api/signals/[id]/route.ts` (GET single signal)
- Create: `lib/api.ts` (fetchSignals function)
- Consumes: Signal data from ask-my-brain API or mock data
- Produces: Serialized JSON signal objects

### Task 2.2: Status Bar & Metrics Grid
- Create: `components/Dashboard/StatusBar.tsx`
- Create: `components/Dashboard/MetricsGrid.tsx`
- Create: `components/Dashboard/MetricCard.tsx`
- Display: Status indicator (● Pipeline live · {time} ET), 3-column grid (ingested, quality, next run)
- Motion: Metric updates → 350ms numeric transition + color pulse

### Task 2.3: Category Breakdown
- Create: `components/Dashboard/CategoryBreakdown.tsx`
- Display: 4-column grid showing category counts (emerging, applied, infrastructure, critical)
- Color-code each column with accent color

### Task 2.4: Signal Feed & Cards
- Create: `components/Dashboard/SignalCard.tsx`
- Create: `components/Dashboard/SignalFeed.tsx`
- Display: Individual signal cards with headline, meta (source + timestamp), summary, tags, score badge, "Read" CTA
- Motion: Filter changes → 120ms snap + cascade fade-in on cards

### Task 2.5: Filter Rail
- Create: `components/Dashboard/FilterRail.tsx`
- Display: Category pills (desktop left rail, mobile collapsible sheet), sort options (latest, highest-score, trending)
- Interaction: Click pill → fetch filtered feed, update counts live

### Task 2.6: Signal Detail Page
- Create: `components/Dashboard/SignalDetail.tsx`
- Create: `app/signals/[id]/page.tsx`
- Display: Full signal article with headline, meta, body, source link, related signals

### Task 2.7: Dashboard Motion & Accessibility
- Create/Update: `lib/motion.ts` with Dashboard variants (120ms snaps, color pulses)
- Add: Keyboard navigation for filter pills, aria-live on metrics updates
- Test: Playwright screenshots of Dashboard page dark mode (desktop + mobile), axe-core accessibility scan

---

## Phase 3: Spatial Mode — `/explore`

**Gate:** Spatial entry portal renders. Central nodes visualize. Knowledge graph (SVG/Canvas) interactive. Node detail page works. Continuous ambient motion applies. Dark mode with luminous accents.

### Task 3.1: Knowledge Graph Data Model
- Create: `lib/types.ts` updates (Node, Connection interfaces)
- Create: `content/knowledge-graph.ts` (5 central nodes, ~30 peripheral nodes, connection strengths)
- Produces: Node/connection data structure for Spatial components

### Task 3.2: Spatial Entry Portal & Central Nodes
- Create: `components/Spatial/EntryPortal.tsx`
- Create: `components/Spatial/CentralNodes.tsx`
- Create: `components/Spatial/NodeVisualization.tsx`
- Display: Display XL headline "Explore", intro text, "Enter Node Space" / "View as Graph" CTAs
- Central nodes arranged in space with circular gradient visualization
- Motion: Nodes enter with fade + scale on page load

### Task 3.3: Knowledge Graph Visualization
- Create: `components/Spatial/KnowledgeGraph.tsx` (SVG-based or Canvas)
- Create: `components/Spatial/ConnectionVisualization.tsx`
- Display: Nodes as circles (sized by connection count), edges as lines (thickness by strength)
- Interaction: Hover node → glow + reveal connections, click → navigate to node detail
- Animation: Nodes animate entrance (3–5s), connections draw on hover (200ms SVG stroke)

### Task 3.4: Node Detail Page
- Create: `components/Spatial/NodeDetail.tsx`
- Create: `app/explore/[node]/page.tsx`
- Display: Expanded node in center, Display MD headline, meta (connection count, strength), body excerpt, related nodes (small circles), CTAs

### Task 3.5: Ambient Motion & Layering
- Create/Update: `lib/motion.ts` with Spatial variants (400ms expands, ambient floats, cross-fades)
- Add: Parallax scroll behavior (scroll drives depth shifts)
- Add: Subtle floating motion on nodes (±2px, 3–4s cycle)
- Update: All Spatial components with motion variants

### Task 3.6: Spatial Accessibility & Performance
- Add: Keyboard navigation for node selection, Enter to expand, Escape to collapse
- Add: aria-label on nodes, aria-live on connection details
- Test: Playwright screenshots of Spatial page dark mode (desktop + mobile), Lighthouse performance (LCP, CLS)

---

## Phase 4: Cross-Mode Integration (Ask Assistant, Shared Components)

**Gate:** Ask assistant widget works on all three modes. Mode switching (navigation) applies correct animations. Light/dark theme updates all modes.

### Task 4.1: Ask Assistant Widget
- Create: `app/api/assistant/chat/route.ts` (POST, Groq integration, RAG context)
- Create: `components/Ask/AssistantWidget.tsx` (Sheet overlay, chat input)
- Create: `components/Ask/ChatBubble.tsx` (User/assistant message bubble)
- Create: `components/Ask/TypingIndicator.tsx` (Typing dots animation)
- Display: Widget on all routes, modal on /ask route
- Motion: Sheet slides up 300ms, messages fade in 200ms, typing dots pulse

### Task 4.2: Cross-Mode Animations
- Update: All route transitions to apply direction-specific motion
- Editorial: 550ms fade + stagger on navigation change
- Dashboard: 120ms snap on navigation change
- Spatial: 400ms cross-fade on navigation change
- Test: Playwright transitions between routes, verify motion timing

### Task 4.3: SEO & Meta Tags
- Create: `lib/seo.ts` (generateMeta helper, JSON-LD generators)
- Update: All pages with correct og:title, og:description, og:image
- Add: JSON-LD Person (homepage), Article (case studies/signals), CreativeWork (projects)
- Add: sitemap.xml, robots.txt

### Task 4.4: Responsive Layout & Mobile Optimization
- Update: All components with mobile-first responsive design
- Bottom tabs navigation on mobile (<768px)
- Stack grids (2-col → 1-col on mobile)
- Test: Playwright screenshots at 390px (mobile), 1440px (desktop)

---

## Phase 5: Content Updates & Data Integration

**Gate:** All content rewritten (SEO-optimized, warm tone). Job title updated. X account in footer. All 5 shipped systems displayed. Career info correct (May 2025–May 2026 ET).

### Task 5.1: Rewrite Homepage & Hero Copy
- Update: `content/hero.ts` with SEO-optimized, warmth-forward copy
- Example: *"Building AI engineering platforms and intelligent information systems. I architect data pipelines, design signal intelligence for discovery, and bridge the gap between research and deployment."*
- Update: All page `<title>` and `<meta description>` tags

### Task 5.2: Job Title & Career Info Update
- Update: `content/career.ts`
- Title: "System Operations Analyst"
- Duration: "May 2025 – May 2026 ET" (not UTC)
- Description: Updated context (infrastructure, pipeline reliability, signal ingestion, system health)
- Display: Across Editorial timeline, Dashboard metrics, Spatial nodes

### Task 5.3: X Account Integration
- Verify: X link (https://x.com/ask_my_stack) in Footer across all modes
- Add: Twitter meta tags (og:title, og:description, twitter:card)
- Test: Link clicks open X in new tab

### Task 5.4: Shipped Systems Display
- Verify: All 5 systems displayed in Editorial (case studies), Dashboard (metrics), Spatial (nodes)
- Example display formats:
  - Editorial: Case study narrative with architectural decisions
  - Dashboard: Metrics card with GitHub stats
  - Spatial: Node with connections to related systems/concepts
- Test: Each system appears on correct routes with correct styling

### Task 5.5: Case Study Content Rewrite
- Rewrite all 5 case study narratives (eeg-seizure-detection, startupintel, cortex, meridian, parallax)
- Focus: Why it matters, technical decisions, impact, lessons learned
- Length: 500–800 words per case study
- Include: Tech stack, role, timeline, systems involved

---

## Phase 6: Testing, Optimization & Deployment

**Gate:** Lighthouse metrics ≥95 a11y, LCP ≤2.5s, CLS ≤0.1. Axe-core scan passes. Playwright visual regression tests pass (light + dark, desktop + mobile). Vercel deployment successful.

### Task 6.1: Accessibility Audit (Axe-Core)
- Add: `npm test:a11y` script
- Run: axe-core on all routes (Discovery, Signals, Explore, Owner)
- Fix: Any violations (contrast, keyboard nav, ARIA labels)
- Test: All interactive elements keyboard focusable, focus visible

### Task 6.2: Lighthouse Optimization
- Add: Playwright performance monitoring
- Optimize: Image loading (next/image, ISR), code-splitting (dynamic imports)
- Target: LCP ≤2.5s, CLS ≤0.1, a11y ≥95, Best Practices ≥90
- Test: Lighthouse audits on desktop + mobile

### Task 6.3: Visual Regression Tests (Playwright)
- Create: `tests/visual/**/*.spec.ts`
- Screenshot routes at 1440px (desktop) + 390px (mobile) in light + dark themes
- Compare: Against baseline screenshots, flag regressions
- Test: All 6 main routes (discover, discover/:slug, signals, signals/:id, explore, explore/:node)

### Task 6.4: Manual Owner Setup Steps
- M1: `vercel login` and link askmy-space project
- M2: Create Neon Postgres (if using), set DATABASE_URL in Vercel
- M3: Set Vercel env vars (GROQ_API_KEY, etc.)
- M4: Verify Tailscale config for /owner route

### Task 6.5: Deployment to Production
- Run: `npm run build` locally, verify no errors
- Push: Branch to GitHub
- Verify: GitHub Actions CI passes (TypeScript, lint, tests)
- Deploy: `vercel --prod` on main branch
- Test: Verify production site loads, all routes accessible

### Task 6.6: Post-Deployment Verification
- [ ] Visit https://askmystack.space in browser (light + dark modes)
- [ ] Navigate all routes (discover, signals, explore, owner)
- [ ] Test: Theme toggle works, animations apply, content loads
- [ ] Check: X link in footer works, GitHub profile links correct
- [ ] Verify: Career title updated, 5 systems display, SEO meta tags present

---

## Summary: All Phases & Verification Gates

| Phase | Deliverable | Gate | Status |
|-------|---|---|---|
| **0** | Design tokens, primitives, theme provider | Tokens defined, components render, theme toggles | 🔲 Ready |
| **1** | Editorial mode, case studies, timeline | Homepage renders, case study detail works, slow motion applies | 🔲 Ready |
| **2** | Dashboard mode, signals feed, filters, metrics | Feed renders, filters work, metrics update, fast motion applies | 🔲 Ready |
| **3** | Spatial mode, knowledge graph, node detail | Graph renders, nodes interactive, ambient motion applies | 🔲 Ready |
| **4** | Ask assistant, cross-mode animations, SEO | Widget works all modes, navigation transitions smooth, meta tags correct | 🔲 Ready |
| **5** | Content rewrite, job title, X account, systems | Hero copy updated, career info ET-based, systems display, X link works | 🔲 Ready |
| **6** | Accessibility, performance, deployment | a11y ≥95, LCP ≤2.5s, CLS ≤0.1, Vercel live | 🔲 Ready |

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-08-10-vectors-redesign-plan.md`.**

**Two execution options:**

**1. Subagent-Driven (Recommended)** — I dispatch a fresh subagent per task, review between tasks, rapid iteration
- Each task: subagent implements, reviews own work, commits
- Between tasks: I verify gate conditions before next phase
- Speed: Parallel task execution possible within phases

**2. Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`
- I run tasks sequentially with checkpoints
- Slower, but full session context
- Single review cycle per phase

**Which approach would you prefer?**

