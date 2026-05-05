/**
 * Terminal engine — intent router for the interactive portfolio terminal.
 *
 * No external LLM calls. All intents resolved against local portfolio data
 * (projects, skills, experience, site config). Deterministic, instant,
 * zero-cost.
 *
 * Design:
 *   1. Try exact command match (help, clear, whoami, sudo hire-me, ...)
 *   2. Fall through to natural-language matcher — keyword scoring over
 *      projects / skills / experience
 *   3. Fallback: "command not found" with top-3 suggestions
 */

import { projects } from "@/content/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/content/experience";
import { siteConfig } from "@/content/site";
import type { TerminalSession } from "./session";

// ───────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────

export type Tone = "muted" | "accent" | "mono" | "fg" | "success" | "error";

export interface Line {
  kind: "out" | "echo" | "divider" | "link";
  text: string;
  tone?: Tone;
  href?: string;
  external?: boolean;
}

export interface Response {
  lines: Line[];
  /** Side effect: scroll to element with this id */
  scrollTo?: string;
  /** Side effect: clear the terminal buffer */
  clear?: boolean;
  /** Name captured from user input (e.g., "my name is abhi") */
  captureName?: string;
}

export interface ExecCtx extends TerminalSession {}

// ───────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────

const out = (text: string, tone?: Tone): Line => ({ kind: "out", text, tone });
const muted = (text: string): Line => out(text, "muted");
const accent = (text: string): Line => out(text, "accent");
const mono = (text: string): Line => out(text, "mono");
const divider: Line = { kind: "divider", text: "" };
const link = (text: string, href: string, external = true): Line => ({
  kind: "link",
  text,
  href,
  external,
});

const KNOWN_SECTIONS = [
  "hero",
  "work",
  "skills",
  "about",
  "experience",
  "now",
  "contact",
] as const;

type Section = (typeof KNOWN_SECTIONS)[number];

function isSection(v: string): v is Section {
  return (KNOWN_SECTIONS as readonly string[]).includes(v);
}

// ───────────────────────────────────────────────────────────────────────────
// Greeting
// ───────────────────────────────────────────────────────────────────────────

export function greet(ctx: ExecCtx): Line[] {
  const name = ctx.userName;
  const greetingWord = name ? `hey ${name}` : "hey there";

  if (ctx.isFirstVisit) {
    return [
      accent(`${greetingWord} 👋`),
      out(`welcome to ${siteConfig.name.toLowerCase()}'s portfolio terminal.`),
      muted("this is interactive — try typing:"),
      mono("  help       see what's available"),
      mono("  projects   browse shipped work"),
      mono("  whoami     the short version"),
      muted("or ask in plain english: 'recommend a project for fintech'"),
    ];
  }

  const lastNote = ctx.lastSection
    ? `last time you were on: ${ctx.lastSection}. 'cd ${ctx.lastSection}' to jump back.`
    : "type 'help' or 'projects' to pick up where you left off.";

  return [
    accent(`welcome back ${name ?? ""}`.trim()),
    muted(`visit #${ctx.visits + 1}. ${lastNote}`),
  ];
}

// ───────────────────────────────────────────────────────────────────────────
// Static command handlers
// ───────────────────────────────────────────────────────────────────────────

function helpResponse(): Response {
  return {
    lines: [
      accent("COMMANDS"),
      mono("  projects [filter]    list work (filter: research, mlops, vision, etc.)"),
      mono("  skills [category]    tech I actually use"),
      mono("  experience           work history"),
      mono("  about | whoami       the story"),
      mono("  contact              reach out"),
      mono("  cd <section>         jump to: work skills about experience contact"),
      mono("  ls                   list sections"),
      mono("  clear                clear buffer"),
      mono("  help                 this screen"),
      divider,
      muted("natural language works too:"),
      muted("  'what projects show backend skills?'"),
      muted("  'recommend a project for a fintech company'"),
      muted("  'show me research work'"),
    ],
  };
}

function lsResponse(): Response {
  return {
    lines: [
      accent("SECTIONS"),
      ...KNOWN_SECTIONS.map((s) => mono(`  ${s}/`)),
    ],
  };
}

function whoamiResponse(): Response {
  return {
    lines: [
      accent(siteConfig.name),
      out(siteConfig.role),
      muted(`${siteConfig.location} · ${siteConfig.email}`),
      divider,
      out("MS Data Science @ GWU, graduating May 2026."),
      out("Global Leaders Award. 3.77 GPA."),
      out("Before grad school: ML infra at Jio Platforms."),
      out("Before that: biomedical imaging, clinical EEG, agentic systems."),
      divider,
      muted("research without shipping is a paper."),
      muted("shipping without research is a guess."),
      accent("the work that matters does both."),
    ],
  };
}

function aboutResponse(): Response {
  return {
    ...whoamiResponse(),
    scrollTo: "about",
  };
}

function contactResponse(): Response {
  return {
    lines: [
      accent("CONTACT"),
      link(`email    ${siteConfig.email}`, `mailto:${siteConfig.email}`, false),
      link("linkedin", siteConfig.social.linkedin),
      link("github  ", siteConfig.social.github),
      link("resume  ", siteConfig.resume, false),
      divider,
      muted("open to research collaborations and applied ML builds."),
    ],
    scrollTo: "contact",
  };
}

function experienceResponse(): Response {
  const lines: Line[] = [accent("EXPERIENCE")];
  experience.forEach((job) => {
    lines.push(out(`${job.title} · ${job.company}`, "fg"));
    lines.push(muted(`  ${job.dates} · ${job.location}`));
  });
  return { lines, scrollTo: "experience" };
}

// ───────────────────────────────────────────────────────────────────────────
// Projects
// ───────────────────────────────────────────────────────────────────────────

type ProjectFilter = {
  pillars?: string[];
  tags?: string[];
  keywords?: string[];
};

// Keyword aliases → project-matching signals
const FILTER_ALIASES: Record<string, ProjectFilter> = {
  research: { pillars: ["Research"] },
  engineering: { pillars: ["Engineering"] },
  product: { pillars: ["Product"] },
  mlops: { tags: ["MLOps"], keywords: ["infrastructure", "pipeline"] },
  infra: { tags: ["MLOps"], keywords: ["infrastructure"] },
  infrastructure: { tags: ["MLOps"], keywords: ["infrastructure"] },
  vision: { tags: ["Computer Vision"] },
  cv: { tags: ["Computer Vision"] },
  eeg: { keywords: ["eeg", "seizure"] },
  signal: { tags: ["Neural Signal Processing"] },
  signals: { tags: ["Neural Signal Processing"] },
  agent: { tags: ["Agentic AI"] },
  agentic: { tags: ["Agentic AI"] },
  llm: { tags: ["LLM Tooling", "Agentic AI"] },
  ai: { pillars: ["Research", "Engineering"] },
  ml: { pillars: ["Research", "Engineering"] },
  backend: { tags: ["MLOps"], keywords: ["infrastructure", "pipeline", "backend"] },
  biomedical: { tags: ["Biomedical Imaging"] },
  healthcare: { keywords: ["eeg", "biomedical", "clinical", "patient"] },
  fintech: { keywords: ["reliability", "pipeline", "real-time", "infrastructure"] },
  nasa: { keywords: ["nasa", "landslide"] },
  geospatial: { keywords: ["geospatial", "landslide"] },
  "time-series": { tags: ["Time-Series"] },
  timeseries: { tags: ["Time-Series"] },
  terraform: { tags: ["Terraform"] },
  pytorch: { tags: ["PyTorch"] },
  go: { tags: ["Go"] },
};

function filterProjects(filter: ProjectFilter): typeof projects {
  const { pillars, tags, keywords } = filter;
  return projects.filter((p) => {
    if (pillars && !p.pillars.some((pl) => pillars.includes(pl))) return false;
    if (tags && !p.tags.some((t) => tags.includes(t))) return false;
    if (keywords) {
      const haystack = (
        p.narrative +
        " " +
        p.title +
        " " +
        (p.problem ?? "") +
        " " +
        p.category
      ).toLowerCase();
      if (!keywords.some((k) => haystack.includes(k))) return false;
    }
    return true;
  });
}

function renderProjects(
  list: readonly (typeof projects)[number][],
  heading = "PROJECTS",
): Line[] {
  if (list.length === 0) {
    return [
      muted("no projects matched that filter."),
      muted("try: projects research | projects mlops | projects vision"),
    ];
  }
  const lines: Line[] = [accent(heading)];
  list.forEach((p, i) => {
    const num = String(i + 1).padStart(2, "0");
    lines.push(out(`${num}. ${p.title}`, "fg"));
    lines.push(muted(`    ${p.pillars.join(" · ")} · ${p.year}`));
    lines.push(link(`    → /work/${p.slug}`, `/work/${p.slug}`, false));
  });
  return lines;
}

function projectsResponse(arg?: string): Response {
  if (!arg) {
    return { lines: renderProjects(projects), scrollTo: "work" };
  }
  const key = arg.toLowerCase().trim();
  const filter = FILTER_ALIASES[key];
  if (!filter) {
    // Try keyword-style: search across narratives/tags
    const filtered = filterProjects({ keywords: [key] });
    return {
      lines: renderProjects(filtered, `PROJECTS matching "${key}"`),
      scrollTo: filtered.length > 0 ? "work" : undefined,
    };
  }
  const filtered = filterProjects(filter);
  return {
    lines: renderProjects(filtered, `PROJECTS · ${key}`),
    scrollTo: filtered.length > 0 ? "work" : undefined,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// Skills
// ───────────────────────────────────────────────────────────────────────────

function skillsResponse(arg?: string): Response {
  if (!arg) {
    const lines: Line[] = [accent("SKILLS")];
    skillGroups.forEach((g) => {
      lines.push(out(`  ${g.category}`, "fg"));
      lines.push(muted(`    ${g.skills.map((s) => s.name).join(", ")}`));
    });
    return { lines, scrollTo: "skills" };
  }

  const q = arg.toLowerCase();
  const matched = skillGroups.filter((g) => g.category.toLowerCase().includes(q));
  if (matched.length > 0) {
    const lines: Line[] = [accent(`SKILLS · ${arg}`)];
    matched.forEach((g) => {
      lines.push(out(`  ${g.category}`, "fg"));
      g.skills.forEach((s) => lines.push(muted(`    ${s.name.padEnd(20)} ${s.level}`)));
    });
    return { lines, scrollTo: "skills" };
  }

  // Check if arg matches a specific skill name
  for (const g of skillGroups) {
    const hit = g.skills.find((s) => s.name.toLowerCase() === q);
    if (hit) {
      return {
        lines: [
          accent(hit.name),
          muted(`  category: ${g.category}`),
          muted(`  level:    ${hit.level}`),
        ],
      };
    }
  }

  return {
    lines: [
      muted(`no skill category matches "${arg}".`),
      muted("try: skills ml | skills mlops | skills cloud"),
    ],
  };
}

// ───────────────────────────────────────────────────────────────────────────
// cd <section>
// ───────────────────────────────────────────────────────────────────────────

function cdResponse(arg?: string): Response {
  if (!arg) {
    return { lines: [muted("cd: missing section. try: ls")] };
  }
  const target = arg.toLowerCase().replace(/\/$/, "");
  if (!isSection(target)) {
    return {
      lines: [
        out(`cd: ${arg}: no such section`, "error"),
        muted(`valid: ${KNOWN_SECTIONS.join(", ")}`),
      ],
    };
  }
  return {
    lines: [muted(`→ ${target}/`)],
    scrollTo: target,
  };
}

// ───────────────────────────────────────────────────────────────────────────
// Easter eggs
// ───────────────────────────────────────────────────────────────────────────

function sudoHireMeResponse(): Response {
  return {
    lines: [
      out("[sudo] password for recruiter: ****", "muted"),
      out("authentication successful.", "success"),
      divider,
      accent("┌─────────────────────────────────────┐"),
      accent("│  HIRING BRIEF · ABHINAYSAI KAMINENI  │"),
      accent("└─────────────────────────────────────┘"),
      out("what you get:"),
      mono("  ✓ ships production ML (85% faster deploys @ Jio)"),
      mono("  ✓ reads papers, writes containers"),
      mono("  ✓ 0.948 mAP@50 · 0.740 AUROC · 99.9% uptime"),
      mono("  ✓ debugs at 3am without complaining"),
      mono("  ✓ graduating may 2026 — timing is right"),
      divider,
      out("what I want:"),
      mono("  research-to-product teams"),
      mono("  hard problems with real users at the end"),
      mono("  honest evaluation > vanity metrics"),
      divider,
      link("  → kamineniabhinaysai@gmail.com", `mailto:${siteConfig.email}`, false),
      link("  → linkedin", siteConfig.social.linkedin),
    ],
  };
}

function unlockSecretResponse(): Response {
  return {
    lines: [
      out("decrypting...", "muted"),
      out("🔓 secret unlocked", "accent"),
      divider,
      out("I once spent three weeks optimizing a training loop"),
      out("to finish 2 minutes faster. nobody asked me to."),
      out("the final model was 0.3% better."),
      divider,
      accent("the 0.3% was not the point."),
      muted("the point was: if you can run the experiment twice,"),
      muted("you can run it a hundred times, and that's when"),
      muted("you actually find something."),
    ],
  };
}

function matrixResponse(): Response {
  return {
    lines: [
      mono("01001001 00100000 01101011 01101110 01101111"),
      mono("01110111 00100000 01101011 01110101 01101110"),
      mono("01100111 00100000 01100110 01110101 00101110"),
      divider,
      muted("(I know kung fu.)"),
      accent("...follow the white rabbit → /work"),
    ],
    scrollTo: "work",
  };
}

function coffeeResponse(): Response {
  return {
    lines: [
      mono("      )  ("),
      mono("     (    )   )"),
      mono("      )  (   ("),
      mono("    _______"),
      mono("   [_______]"),
      mono("    \\_____/"),
      divider,
      out("fuel acquired. ☕"),
      muted("debugging capacity: restored."),
    ],
  };
}

function dateResponse(): Response {
  const now = new Date();
  return {
    lines: [
      mono(now.toUTCString()),
      muted(`local: ${now.toString()}`),
    ],
  };
}

function echoResponse(arg: string): Response {
  return { lines: [out(arg)] };
}

// ───────────────────────────────────────────────────────────────────────────
// Natural-language matcher
// ───────────────────────────────────────────────────────────────────────────

/**
 * Given free-form text, try to extract a project recommendation or
 * filter intent. Returns a Response if matched, null otherwise.
 */
function matchNaturalLanguage(input: string): Response | null {
  const q = input.toLowerCase();

  // "recommend a project for X" / "best project for X"
  const recMatch = q.match(/(?:recommend|suggest|best)\s+(?:a\s+)?project\s+(?:for\s+)?(?:a\s+)?(.+?)(?:\?|$)/);
  if (recMatch) {
    const topic = recMatch[1].trim();
    // Run all filter aliases against topic; pick matching + top project
    const words = topic.split(/\s+/);
    for (const word of words) {
      if (FILTER_ALIASES[word]) {
        const filtered = filterProjects(FILTER_ALIASES[word]);
        if (filtered.length > 0) {
          const top = filtered[0];
          return {
            lines: [
              out(`for ${topic}, I'd point at:`, "muted"),
              accent(top.title),
              muted(`  ${top.narrative}`),
              link(`  → /work/${top.slug}`, `/work/${top.slug}`, false),
            ],
            scrollTo: "work",
          };
        }
      }
    }
    // Fallback keyword search
    const filtered = filterProjects({ keywords: [topic] });
    if (filtered.length > 0) {
      const top = filtered[0];
      return {
        lines: [
          out(`for ${topic}, closest match:`, "muted"),
          accent(top.title),
          muted(`  ${top.narrative}`),
          link(`  → /work/${top.slug}`, `/work/${top.slug}`, false),
        ],
        scrollTo: "work",
      };
    }
    return {
      lines: [
        muted(`nothing squarely matches "${topic}".`),
        muted("try: projects research | projects mlops | projects vision"),
      ],
    };
  }

  // "what projects show X" / "projects with X" / "show me X work"
  const filterMatch = q.match(
    /(?:what|which|show(?:\s+me)?)\s+projects?(?:\s+(?:show|with|have|using|in))?\s+(.+?)(?:\?|$)/,
  );
  if (filterMatch) {
    const topic = filterMatch[1].replace(/skills?|work/g, "").trim();
    const words = topic.split(/\s+/).filter(Boolean);
    for (const word of words) {
      if (FILTER_ALIASES[word]) {
        return projectsResponse(word);
      }
    }
    return projectsResponse(topic);
  }

  // "my name is X" / "I'm X" / "I am X"
  const nameMatch = q.match(/(?:my name is|i['']?m|i am)\s+([a-z]+)/i);
  if (nameMatch) {
    const name = nameMatch[1].trim();
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      lines: [accent(`nice to meet you, ${capitalized}.`), muted("I'll remember.")],
      captureName: capitalized,
    };
  }

  // "can you ship / production / deploy"
  if (/\b(can\s+you\s+)?(ship|deploy|production|productionize)\b/.test(q)) {
    return {
      lines: [
        accent("yes."),
        out("100+ Airflow DAGs at 99.9% reliability. Jenkins + Docker + K8s."),
        out("85% faster deploys. Terraform-provisioned on AWS/Azure/GCP."),
        muted("shipping is infrastructure. not a nice-to-have."),
      ],
    };
  }

  // "research?"
  if (/\b(do\s+you\s+)?research\b/.test(q)) {
    return projectsResponse("research");
  }

  return null;
}

// ───────────────────────────────────────────────────────────────────────────
// Fuzzy suggestion (Levenshtein on known commands)
// ───────────────────────────────────────────────────────────────────────────

const KNOWN_CMDS = [
  "help",
  "projects",
  "skills",
  "experience",
  "about",
  "whoami",
  "contact",
  "cd",
  "ls",
  "clear",
  "resume",
  "sudo",
  "matrix",
  "coffee",
  "date",
  "echo",
];

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function suggestCommand(input: string): string | null {
  let best = null as string | null;
  let bestScore = Infinity;
  for (const cmd of KNOWN_CMDS) {
    const d = levenshtein(input, cmd);
    if (d < bestScore) {
      bestScore = d;
      best = cmd;
    }
  }
  return bestScore <= 2 ? best : null;
}

// ───────────────────────────────────────────────────────────────────────────
// Main entry
// ───────────────────────────────────────────────────────────────────────────

export function execute(rawInput: string, ctx: ExecCtx): Response {
  const input = rawInput.trim();
  if (!input) return { lines: [] };

  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  // Exact commands
  switch (cmd) {
    case "help":
    case "?":
    case "h":
      return helpResponse();
    case "clear":
    case "cls":
      return { lines: [], clear: true };
    case "ls":
    case "dir":
      return lsResponse();
    case "whoami":
      return whoamiResponse();
    case "about":
      return aboutResponse();
    case "contact":
    case "email":
      return contactResponse();
    case "experience":
    case "exp":
    case "work-history":
      return experienceResponse();
    case "projects":
    case "work":
    case "ls-projects":
      return projectsResponse(arg || undefined);
    case "skills":
    case "stack":
      return skillsResponse(arg || undefined);
    case "cd":
      return cdResponse(arg || undefined);
    case "resume":
    case "cv":
      return {
        lines: [
          accent("RESUME"),
          link(`  → ${siteConfig.resume}`, siteConfig.resume, false),
        ],
      };
    case "matrix":
      return matrixResponse();
    case "coffee":
      return coffeeResponse();
    case "date":
      return dateResponse();
    case "echo":
      return echoResponse(arg);
    case "sudo": {
      const sub = arg.toLowerCase();
      if (sub === "hire-me" || sub === "hire me") return sudoHireMeResponse();
      return {
        lines: [
          out(`[sudo] ${sub || "what?"}: command not found`, "error"),
          muted("try: sudo hire-me"),
        ],
      };
    }
    case "unlock": {
      if (arg.toLowerCase() === "secret") return unlockSecretResponse();
      return {
        lines: [
          muted(`unlock: ${arg || "what?"}`),
          muted("hint: unlock secret"),
        ],
      };
    }
    case "exit":
    case "quit":
    case ":q":
      return {
        lines: [muted("terminals don't close. but thanks for stopping by.")],
      };
  }

  // Natural-language layer
  const nl = matchNaturalLanguage(input);
  if (nl) return nl;

  // Fuzzy suggestion
  const suggestion = suggestCommand(cmd);
  return {
    lines: [
      out(`command not found: ${cmd}`, "error"),
      ...(suggestion ? [muted(`did you mean '${suggestion}'?`)] : []),
      muted("type 'help' to see what works."),
    ],
  };
}
