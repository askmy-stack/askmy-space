# Signal Black alignment plan — ARCHIVED

> **Status:** Archived 2026-10-25.  
> This handoff described a July 2025 redesign toward an older prototype (Ask agent, `/signals`, NeuralLattice prism, light mode). Those surfaces are **removed or superseded**.

## Current architecture (source of truth)

| Area | Current |
|------|---------|
| Theme | Dark-only Signal Black tokens (`app/globals.css`) |
| Hero | Two-column landing + `SystemsDiagram` orb stage (no prism / Three.js) |
| Ambient | `SignalField` in root layout |
| Content | `content/` + `data/skills.ts` |
| Routes | `/`, `/work/[slug]` only |
| Host | Vercel → askmystack.space |

Do **not** revive Ask chat, `/signals`, or NeuralLattice/ScrollScene from this document.

For repo process and remaining owner checkboxes, see [`docs/REPO.md`](../REPO.md).
