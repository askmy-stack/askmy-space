"use client";

import { motion } from "framer-motion";
import { skillGroups, levelColors } from "@/data/skills";

export default function SkillsSection(): JSX.Element {
  return (
    <section
      id="skills"
      className="border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="container-editorial py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
          <h2 className="t-display">Tools of the trade.</h2>
          <p className="t-label text-[var(--fg-muted)]">Core first. What I actually use.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {skillGroups.map((group, groupIndex) => {
            const ordered = [...group.skills].sort((a, b) => {
              const rank = { core: 0, production: 1, research: 2 } as const;
              return rank[a.level] - rank[b.level];
            });
            return (
              <motion.div
                key={group.category}
                className="flex flex-col gap-3 p-6 md:p-7 bg-[var(--surface)]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: groupIndex * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className="t-label text-[var(--accent)]">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ordered.map((skill) => (
                    <span
                      key={skill.name}
                      className="t-mono px-2 py-1 border"
                      style={{
                        color: levelColors[skill.level],
                        borderColor:
                          skill.level === "core"
                            ? "var(--border)"
                            : levelColors[skill.level],
                        opacity: skill.level === "research" ? 0.7 : 1,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
