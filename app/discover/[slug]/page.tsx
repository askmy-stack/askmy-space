import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject } from "@/content/projects";
import CaseStudyDetail from "@/components/Editorial/CaseStudyDetail";

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
    title: `${project.title} — Discover`,
    description: project.narrative,
    openGraph: {
      title: project.title,
      description: project.narrative,
      type: "article",
    },
  };
}

export default function DiscoverCaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return <CaseStudyDetail project={project} prev={prev} next={next} />;
}
