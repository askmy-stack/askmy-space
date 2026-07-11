"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/content/site";

const repos = [
  {
    name: "askmy-brain",
    desc: "Daily intelligence pipeline — ingest, LLM triage, knowledge graph, morning brief",
    meta: "python · pipeline",
  },
  {
    name: "askmy-space",
    desc: "This site — portfolio, agent, and signals on one surface",
    meta: "typescript · next.js",
  },
  {
    name: "Autonomous-System-Kernel",
    desc: "Agent runtime on home infrastructure, reachable only over the tailnet",
    meta: "python · fastapi",
  },
] as const;

export default function OpenSource(): JSX.Element {
  return (
    <section
      id="open-source"
      className="pt-[120px] pb-10 md:pb-12 border-t border-[var(--border)]"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="t-display">Built in the open.</h2>
            <p className="t-body mt-6 max-w-[42ch]" style={{ color: "var(--fg-muted)" }}>
              The pipeline, the agent, and this site are all public. Fork them,
              file issues, or steal the patterns — contributions that survive
              the test suite are welcome.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                Contribute on GitHub →
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--border)] px-6 py-3 font-mono text-sm text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--fg)]"
              >
                @askmy-stack
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={`${siteConfig.social.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 border-b border-[var(--border)] py-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: easeOutExpo }}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-sm font-semibold text-[var(--fg)] transition-colors duration-200 group-hover:text-[var(--accent)]">
                    {repo.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[var(--fg-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                  >
                    ↗
                  </span>
                </span>
                <span className="t-body" style={{ color: "var(--fg-muted)" }}>
                  {repo.desc}
                </span>
                <span className="t-label mt-1 text-[var(--fg-muted)]">{repo.meta}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
