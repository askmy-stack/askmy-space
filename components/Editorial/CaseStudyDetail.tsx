import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { Divider } from "@/components/ui/Divider";

interface CaseStudyDetailProps {
  project: Project;
  prev: Project;
  next: Project;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[var(--type-mono-size)] font-[var(--type-mono-weight)] uppercase tracking-[0.25em] text-[var(--color-editorial-accent-1)]">
      {children}
    </p>
  );
}

export default function CaseStudyDetail({
  project,
  prev,
  next,
}: CaseStudyDetailProps): JSX.Element {
  const published = new Date(project.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "America/New_York",
  });

  return (
    <article className="min-h-screen bg-[var(--color-editorial-bg)] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[var(--type-mono-size)] text-[var(--color-editorial-text-secondary)] mb-10"
        >
          <Link
            href="/discover"
            className="hover:text-[var(--color-editorial-accent-1)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
          >
            Discover
          </Link>{" "}
          / <span className="text-[var(--color-editorial-text)]">{project.slug}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[var(--type-mono-size)] text-[var(--color-editorial-text-secondary)] mb-6">
            <span>{project.category}</span>
            <span>{published} · ET</span>
          </div>
          <h1 className="font-serif text-[var(--type-display-xl-size)] font-[var(--type-display-xl-weight)] leading-[var(--type-display-xl-line-height)] text-[var(--color-editorial-text)] mb-4">
            {project.title}
          </h1>
          <p className="text-[var(--type-display-md-size)] text-[var(--color-editorial-text-secondary)] leading-[var(--type-display-md-line-height)]">
            {project.subtitle}
          </p>
        </header>

        {/* Hero visual */}
        <div
          className={`relative aspect-[16/9] w-full mb-14 overflow-hidden rounded-lg border-2 border-[var(--color-editorial-border)] bg-gradient-to-br ${project.gradient ?? "from-[var(--color-editorial-accent-2)]/20 to-transparent"}`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-8">
              <p className="font-mono text-[var(--type-mono-size)] text-[var(--color-editorial-text-secondary)]">
                {project.heroMetric}
              </p>
            </div>
          )}
        </div>

        {/* Problem */}
        <section className="space-y-4 mb-4">
          <SectionLabel>Problem</SectionLabel>
          <p className="text-[var(--type-body-size)] leading-[var(--type-body-line-height)] text-[var(--color-editorial-text)]">
            {project.problem}
          </p>
        </section>

        <Divider direction="editorial" />

        {/* Approach */}
        <section className="space-y-4 mb-4">
          <SectionLabel>Approach</SectionLabel>
          <div className="space-y-5 text-[var(--type-body-size)] leading-[var(--type-body-line-height)] text-[var(--color-editorial-text)]">
            {project.approach.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <Divider direction="editorial" />

        {/* Results */}
        <section className="space-y-4 mb-4">
          <SectionLabel>Results</SectionLabel>
          <p className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] leading-[var(--type-display-md-line-height)] text-[var(--color-editorial-text)]">
            {project.heroMetric}
          </p>
          <ul className="space-y-2 font-mono text-[var(--type-mono-size)] text-[var(--color-editorial-text-secondary)]">
            {project.results.map((result) => (
              <li key={result} className="flex gap-3">
                <span className="text-[var(--color-editorial-accent-1)]" aria-hidden="true">
                  ✦
                </span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </section>

        <Divider direction="editorial" />

        {/* Stack */}
        <section className="space-y-4 mb-4">
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[var(--type-mono-size)] px-3 py-1.5 rounded-full border border-[var(--color-editorial-accent-1)] text-[var(--color-editorial-text)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <Divider direction="editorial" />

        {/* What I learned */}
        <section className="space-y-4 mb-10">
          <SectionLabel>What I learned</SectionLabel>
          <p className="text-[var(--type-body-size)] leading-[var(--type-body-line-height)] text-[var(--color-editorial-text)] italic">
            {project.learnings}
          </p>
        </section>

        {/* GitHub link */}
        {project.github && (
          <p className="mb-16">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[var(--color-editorial-accent-1)] hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
            >
              View source on GitHub →
            </a>
          </p>
        )}

        {/* Prev / Next */}
        <nav
          aria-label="Case study navigation"
          className="flex items-center justify-between gap-4 pt-8 border-t border-[var(--color-editorial-border)] font-mono text-[var(--type-mono-size)] text-[var(--color-editorial-text-secondary)]"
        >
          <Link
            href={`/discover/${prev.slug}`}
            className="hover:text-[var(--color-editorial-text)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
          >
            ← {prev.title}
          </Link>
          <Link
            href={`/discover/${next.slug}`}
            className="text-right hover:text-[var(--color-editorial-text)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md px-1"
          >
            {next.title} →
          </Link>
        </nav>
      </div>
    </article>
  );
}
