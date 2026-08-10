"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { GitHubRepo } from "@/lib/api";
import { getLanguageColor } from "@/lib/api";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION } from "@/lib/constants";

interface RepoTileProps {
  repo: GitHubRepo;
  index?: number;
}

export default function RepoTile({
  repo,
  index = 0,
}: RepoTileProps): JSX.Element {
  const reduced = useReducedMotion();
  const languageColor = getLanguageColor(repo.language);

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION.timing.editorial.pageTransition / 1000,
        ease: easeOutExpo,
        delay: (index * MOTION.timing.editorial.reveal) / 1000,
      },
    },
  };

  const CardContent = (
    <div className="space-y-3">
      {/* Repository Name */}
      <div className="space-y-1">
        <h3 className="text-[var(--type-display-md-size)] font-[var(--type-display-md-weight)] text-[var(--color-editorial-text)] font-mono">
          {repo.name}
        </h3>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-[var(--type-body-size)] text-[var(--color-editorial-text)] leading-[var(--type-body-line-height)] line-clamp-1">
          {repo.description}
        </p>
      )}

      {/* Language and Stars */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-editorial-border)]">
        {repo.language ? (
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: languageColor }}
              aria-label={`${repo.language} repository`}
            />
            <span className="text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text)]">
              {repo.language}
            </span>
          </div>
        ) : (
          <div />
        )}
        <span className="text-[var(--type-mono-size)] font-[var(--type-mono-weight)] text-[var(--color-editorial-text-secondary)]">
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
      </div>
    </div>
  );

  if (reduced) {
    return (
      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <article className="bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-5 sm:p-6 hover:shadow-md transition-shadow duration-200">
          {CardContent}
        </article>
      </Link>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <motion.article className="bg-white border-2 border-[var(--color-editorial-border)] rounded-lg p-5 sm:p-6 hover:shadow-md transition-shadow duration-200 ease-[var(--motion-easing-standard)] cursor-pointer">
          {CardContent}
        </motion.article>
      </Link>
    </motion.div>
  );
}
