import { Metadata } from "next";
import EditorialHero from "@/components/Editorial/Hero";
import FeaturedEssay from "@/components/Editorial/FeaturedEssay";
import ProjectsGrid from "@/components/Editorial/ProjectsGrid";
import OpenSourceSection from "@/components/Editorial/OpenSourceSection";
import Timeline from "@/components/Editorial/Timeline";
import { projects } from "@/content/projects";
import { fetchGitHubRepos, fetchGitHubUser } from "@/lib/api";

export const metadata: Metadata = {
  title: "Discover — AI Engineering Portfolio",
  description:
    "Explore AI engineering projects, research, and technical case studies.",
};

export default async function DiscoverPage() {
  const featuredProject = projects[0];

  // Fetch GitHub data
  const [repos, user] = await Promise.all([
    fetchGitHubRepos("askmy-stack", 3),
    fetchGitHubUser("askmy-stack"),
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-editorial-bg)]">
      {/* Hero Section */}
      <EditorialHero />

      {/* Featured Essay Section */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-2">
            <h2 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)]">
              Featured Project
            </h2>
            <p className="text-[var(--type-caption-size)] text-[var(--color-editorial-text-secondary)]">
              Latest research and engineering work
            </p>
          </div>
          <FeaturedEssay
            title={featuredProject.title}
            excerpt={featuredProject.narrative}
            date={new Date(featuredProject.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "America/New_York",
            })}
            slug={featuredProject.slug}
            author="Abhinaysai Kamineni"
          />
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-2">
            <h2 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)]">
              Case Studies
            </h2>
            <p className="text-[var(--type-caption-size)] text-[var(--color-editorial-text-secondary)]">
              All shipped systems and research projects
            </p>
          </div>
          <ProjectsGrid />
        </div>
      </section>

      {/* Open Source Section */}
      <OpenSourceSection repos={repos} user={user} />

      {/* Career Timeline Section */}
      <Timeline />

      {/* Additional spacing before footer */}
      <div className="h-16 bg-[var(--color-editorial-bg)]" />
    </div>
  );
}
