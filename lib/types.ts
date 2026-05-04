export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  /** One-line narrative describing what the project actually does and why. */
  narrative: string;
  year: number;
  category: string;
  heroMetric: string;
  /** Crisp metric pills shown on the WorkRow right-side rail. */
  metrics: readonly string[];
  tags: readonly string[];
  /** Three-pillar lens: which pillars this project demonstrates, in order. */
  pillars: readonly ("Research" | "Engineering" | "Product")[];
  /** Hex accent color used for the row's hover hairline. */
  color: string;
  github?: string;
  /** Placeholder — replace with real image when available. */
  image?: string;
  /** Accent gradient for hero fallback. */
  gradient?: string;

  /** Case-study prose (rendered on /work/[slug]). */
  problem: string;
  approach: readonly string[];
  results: readonly string[];
  learnings: string;
}

export interface ExperienceBullet {
  text: string;
}

export interface Experience {
  title: string;
  company: string;
  dates: string;
  location: string;
  bullets: readonly string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Principle {
  title: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
