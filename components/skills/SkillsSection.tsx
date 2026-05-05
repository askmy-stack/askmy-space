"use client";

import { motion } from "framer-motion";
import { skillGroups, levelColors } from "@/data/skills";

export default function SkillsSection(): JSX.Element {
  return (
    <section
      id="skills"
      className="border-t border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="container-editorial py-20">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2 className="t-display">Tools of the trade.</h2>
          <p className="t-label">What I actually use</p>
        </div>

        {/* Skill groups grid — gap-px + border bg creates hairline dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              className="flex flex-col gap-4 p-8 bg-[var(--surface)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: groupIndex * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Category label */}
              <span className="t-label text-[var(--accent)]">
                {group.category}
              </span>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: groupIndex * 0.06 + skillIndex * 0.03,
                    }}
                    className="t-mono px-2.5 py-1.5 border"
                    style={{
                      color: levelColors[skill.level],
                      borderColor:
                        skill.level === "core"
                          ? "var(--border)"
                          : levelColors[skill.level],
                      opacity: skill.level === "core" ? 0.75 : 1,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
