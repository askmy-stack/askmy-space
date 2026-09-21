"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { siteConfig } from "@/content/site";

const nowItems = [
  {
    label: "Building",
    text: "Cortex — organizational memory for agents over MCP",
  },
  {
    label: "Shipping",
    text: "Parallax harnesses + tool-semantics behavioral contracts",
  },
  {
    label: "Harness",
    text: "Runtime failure benches, LLM-as-judge, and recovery signals",
  },
  {
    label: "Research",
    text: "EEG seizure-detection benchmark on CHB-MIT",
  },
  {
    label: "Based in",
    text: "Arlington, VA",
  },
] as const;

const socialLinks = [
  { label: "Twitter / X", href: siteConfig.social.twitter },
  { label: "Medium", href: siteConfig.social.medium },
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
] as const;

export default function NowBlock(): JSX.Element {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section
      id="now"
      className="pt-24 md:pt-28 pb-10 md:pb-12 border-t border-[var(--border)]"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-4">
            <h2 className="t-display">Current focus.</h2>
            <p className="t-body mt-4">Updated {updated}</p>
            <div className="mt-10 flex flex-col gap-3">
              <p className="t-label mb-1">Elsewhere</p>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-caption text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-0">
            {nowItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex gap-6 py-5 border-b border-[var(--border)]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.05,
                  ease: easeOutExpo,
                }}
              >
                <span className="t-label text-[var(--accent)] w-24 shrink-0 pt-1">
                  {item.label}
                </span>
                <span className="t-body" style={{ color: "var(--fg)" }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
