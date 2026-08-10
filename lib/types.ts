// Editorial Mode Types
export interface Signal {
  id: string;
  title: string;
  url: string;
  summary: string;
  category: string;
  score: number;
  published: string;
  source?: string;
  tags?: string[];
}

export interface System {
  name: string;
  category: string;
  description: string;
  github: string;
  status: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  hero?: string;
  systems: string[];
  content: string;
  published: string;
}

export interface Role {
  title: string;
  company?: string;
  duration: string;
  timezone: string;
  description: string;
}

// Portfolio Types (legacy)
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
