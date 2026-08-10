import { Metadata } from "next";
import EditorialHero from "@/components/Editorial/Hero";
import FeaturedEssay from "@/components/Editorial/FeaturedEssay";
import ProjectsGrid from "@/components/Editorial/ProjectsGrid";
import { SHIPPED_SYSTEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Discover — AI Engineering Portfolio",
  description:
    "Explore AI engineering projects, research, and technical case studies.",
};

export default function DiscoverPage() {
  // Use the first shipped system as featured essay
  const featuredProject = SHIPPED_SYSTEMS[0];

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
            title={featuredProject.name}
            excerpt={featuredProject.description}
            date={new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            slug={featuredProject.name}
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

      {/* Additional spacing before footer */}
      <div className="h-16 bg-[var(--color-editorial-bg)]" />
    </div>
  );
}
