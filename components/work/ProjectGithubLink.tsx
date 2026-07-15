"use client";

import { track } from "@vercel/analytics";

interface Props {
  href: string;
  slug: string;
  children?: React.ReactNode;
  className?: string;
}

/** Outbound GitHub link with Vercel Analytics `project_github_click`. */
export default function ProjectGithubLink({
  href,
  slug,
  children = "View on GitHub ↗",
  className = "font-mono text-sm text-[var(--accent)] hover:text-[var(--fg)] transition-colors",
}: Props): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("project_github_click", { slug })}
    >
      {children}
    </a>
  );
}
