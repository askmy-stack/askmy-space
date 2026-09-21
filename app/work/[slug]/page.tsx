import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import ProjectGithubLink from "@/components/work/ProjectGithubLink";

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
        <p className="t-label mb-8">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-[var(--border)]">/</span>
          <Link href="/#work" className="hover:text-[var(--accent)] transition-colors">
            Work
          </Link>
          <span className="mx-2 text-[var(--border)]">/</span>
          <span className="text-[var(--fg)]">{project.title}</span>
        </p>

        <header className="border-t border-[var(--border)] pt-12 mb-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4 t-label mb-8">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>
          <h1 className="t-display mb-5">{project.title}</h1>
          <p className="t-lede max-w-2xl mb-8">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.pillars.map((p) => (
              <span
                key={p}
                className="t-label px-2.5 py-1.5 border border-[var(--border)] text-[var(--accent)]"
              >
                {p}
              </span>
            ))}
          </div>
        </header>

        <div
          className={`relative aspect-[16/9] w-full mb-20 overflow-hidden bg-gradient-to-br ${project.gradient ?? "from-[var(--bg-elevated)] to-transparent"} border border-[var(--border)]`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <p className="t-label">{project.title}</p>
            </div>
          )}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="md:col-span-3 t-label text-[var(--accent)]">Problem</p>
          <p className="md:col-span-9 t-lede">
            {project.problem}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="md:col-span-3 t-label text-[var(--accent)]">Approach</p>
          <div className="md:col-span-9 space-y-5">
            {project.approach.map((p, i) => (
              <p key={i} className="t-body-lg">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="md:col-span-3 t-label text-[var(--accent)]">Results</p>
          <div className="md:col-span-9">
            <p className="t-lede mb-8">{project.heroMetric}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {project.results.map((r) => (
                <li key={r} className="t-body flex gap-3" style={{ color: "var(--fg)" }}>
                  <span className="text-[var(--accent)]" aria-hidden="true">
                    ·
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16">
          <p className="md:col-span-3 t-label text-[var(--accent)]">Stack</p>
          <div className="md:col-span-9 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="t-mono px-3 py-1.5 border border-[var(--border)] text-[var(--fg)]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-24">
          <p className="md:col-span-3 t-label text-[var(--accent)]">Learnings</p>
          <p className="md:col-span-9 t-body-lg">{project.learnings}</p>
        </section>

        {project.github && (
          <section className="mb-20">
            <ProjectGithubLink href={project.github} slug={project.slug} />
          </section>
        )}

        <nav className="flex items-center justify-between pt-10 border-t border-[var(--border)]">
          <Link
            href={`/work/${prev.slug}`}
            className="t-label hover:text-[var(--fg)] transition-colors"
          >
            ← {prev.title}
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="t-label hover:text-[var(--fg)] transition-colors"
          >
            {next.title} →
          </Link>
        </nav>
      </div>
    </article>
  );
}
