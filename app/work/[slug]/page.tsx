import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} · Work`,
    description: project.subtitle,
  };
}

export default function WorkCaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-32 pb-20">
      <div className="container-editorial">
        {/* Breadcrumb */}
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/#work" className="hover:text-[var(--accent)] transition-colors">
            Work
          </Link>{" "}
          / <span className="text-[var(--fg)]">{project.slug}</span>
        </p>

        {/* Hero */}
        <header className="border-t border-[var(--border)] pt-12 mb-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-10">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="text-display-lg text-[var(--fg)] leading-[1] mb-6">
            {project.title}
          </h1>
          <p className="text-display-md text-[var(--fg-muted)] leading-tight max-w-[28ch] mb-8">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.pillars.map((p) => (
              <span
                key={p}
                className="font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 border border-[var(--border)] text-[var(--mono)]"
              >
                {p}
              </span>
            ))}
          </div>
        </header>

        {/* Hero visual */}
        <div
          className={`relative aspect-[16/9] w-full mb-20 overflow-hidden bg-gradient-to-br ${project.gradient ?? "from-[var(--bg-elevated)] to-transparent"} border border-[var(--border)]`}
        >
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
              [ PROJECT_HERO_IMAGE_PLACEHOLDER — drop in /public/images/projects/{project.slug}.jpg ]
            </p>
          </div>
        </div>

        {/* Problem */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Problem
          </p>
          <p className="md:col-span-9 text-display-md text-[var(--fg)] leading-tight">
            {project.problem}
          </p>
        </section>

        {/* Approach */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Approach
          </p>
          <div className="md:col-span-9 space-y-6 text-body-lg text-[var(--fg-muted)] leading-relaxed">
            {project.approach.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Architecture
          </p>
          <div className="md:col-span-9">
            <div className="aspect-[16/9] bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                [ ARCHITECTURE_DIAGRAM_PLACEHOLDER — drop SVG in /public/images/projects/{project.slug}-arch.svg ]
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Results
          </p>
          <div className="md:col-span-9">
            <p className="text-display-md text-[var(--fg)] leading-tight mb-10">
              {project.heroMetric}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-mono text-sm text-[var(--fg-muted)]">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="text-[var(--mono)]" aria-hidden="true">
                    •
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stack */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Stack
          </p>
          <div className="md:col-span-9 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-xs uppercase tracking-[0.15em] px-3 py-1.5 border border-[var(--border)] text-[var(--fg)]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* What I learned */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <p className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            What I learned
          </p>
          <p className="md:col-span-9 text-body-lg text-[var(--fg-muted)] leading-relaxed">
            {project.learnings}
          </p>
        </section>

        {/* Links */}
        {project.github && (
          <section className="mb-20">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
            >
              View on GitHub ↗
            </a>
          </section>
        )}

        {/* Prev / Next */}
        <nav className="flex items-center justify-between pt-10 border-t border-[var(--border)]">
          <Link
            href={`/work/${prev.slug}`}
            className="group font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            ← {prev.title}
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            {next.title} →
          </Link>
        </nav>
      </div>
    </article>
  );
}
