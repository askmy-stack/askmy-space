"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import RepoTile from "./RepoTile";
import { Button } from "@/components/ui/Button";
import type { GitHubRepo, GitHubUser } from "@/lib/api";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

interface OpenSourceSectionProps {
  repos: GitHubRepo[];
  user: GitHubUser | null;
}

export default function OpenSourceSection({
  repos,
  user,
}: OpenSourceSectionProps): JSX.Element {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: MOTION.timing.editorial.stagger / 1000,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.timing.editorial.pageTransition / 1000,
        ease: easeOutExpo,
      },
    },
  };

  // Handle case when data fails to load
  if (!repos || repos.length === 0) {
    return (
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-2">
            <p className="t-caption text-[var(--color-editorial-text-secondary)] font-mono">
              ~/open-source
            </p>
            <h2 className="t-display-md text-[var(--color-editorial-text)]">
              The Stack is Public
            </h2>
            <p className="t-body text-[var(--color-editorial-text-secondary)]">
              Fork it, file issues, or steal the patterns.
            </p>
          </div>
          <p className="t-body text-[var(--color-editorial-text-secondary)]">
            Unable to load repositories. Check back later.
          </p>
        </div>
      </section>
    );
  }

  if (reduced) {
    return (
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 space-y-2">
            <p className="t-caption text-[var(--color-editorial-text-secondary)] font-mono">
              ~/open-source
            </p>
            <h2 className="t-display-md text-[var(--color-editorial-text)]">
              The Stack is Public
            </h2>
            <p className="t-body text-[var(--color-editorial-text-secondary)]">
              Fork it, file issues, or steal the patterns.
            </p>
          </div>

          {/* GitHub Profile Card */}
          {user && (
            <div className="mb-12 bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8">
              <div className="flex items-start gap-4 sm:gap-6">
                {user.avatar_url && (
                  <Image
                    src={user.avatar_url}
                    alt={user.login}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <h3 className="t-display-md text-[var(--color-editorial-text)]">
                    @{user.login}
                  </h3>
                  {user.bio && (
                    <p className="t-body text-[var(--color-editorial-text-secondary)]">
                      {user.bio}
                    </p>
                  )}
                  {user.profile_url && (
                    <Link href={user.profile_url} target="_blank" rel="noopener noreferrer">
                      <span className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200">
                        Visit profile →
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Repos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {repos.map((repo, index) => (
              <RepoTile key={repo.id} repo={repo} index={index} />
            ))}
          </div>

          {/* CTA Button */}
          <Link href="https://github.com/askmy-stack?tab=repositories&q=label:good-first-issue" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" direction="editorial">
              Contribute →
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-editorial-bg)]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="mb-12 space-y-2" variants={itemVariants}>
          <p className="t-caption text-[var(--color-editorial-text-secondary)] font-mono">
            ~/open-source
          </p>
          <h2 className="t-display-md text-[var(--color-editorial-text)]">
            The Stack is Public
          </h2>
          <p className="t-body text-[var(--color-editorial-text-secondary)]">
            Fork it, file issues, or steal the patterns.
          </p>
        </motion.div>

        {/* GitHub Profile Card */}
        {user && (
          <motion.div
            className="mb-12 bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-6 sm:p-8"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4 sm:gap-6">
              {user.avatar_url && (
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg"
                />
              )}
              <div className="flex-1 space-y-2">
                <h3 className="t-display-md text-[var(--color-editorial-text)]">
                  @{user.login}
                </h3>
                {user.bio && (
                  <p className="t-body text-[var(--color-editorial-text-secondary)]">
                    {user.bio}
                  </p>
                )}
                {user.profile_url && (
                  <Link href={user.profile_url} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-2 text-[var(--color-editorial-accent-1)] font-semibold hover:text-[var(--color-editorial-accent-2)] transition-colors duration-200">
                      Visit profile →
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Repos Grid with staggered reveal */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {repos.map((repo) => (
            <RepoTile key={repo.id} repo={repo} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link href="https://github.com/askmy-stack?tab=repositories&q=label:good-first-issue" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" direction="editorial">
              Contribute →
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
