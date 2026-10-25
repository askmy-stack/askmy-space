"use client";

import { motion } from "framer-motion";
import { easeOutExpo, revealUp, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/content/site";

const nowItems = [
  {
    label: "Building",
    text: "Meridian: supply chain risk intelligence on a live knowledge graph",
  },
  {
    label: "Shipping",
    text: "Cortex memory, Parallax reliability, and Tool-semantics contracts",
  },
  {
    label: "Research",
    text: "EEG seizure detection benchmark on CHB-MIT (AUROC 0.740)",
  },
  {
    label: "Based in",
    text: "Washington, DC",
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
      className="pt-20 md:pt-24 pb-8 md:pb-10 border-t border-[var(--border)]"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          <div className="md:col-span-4">
            <h2 className="t-display">Current focus.</h2>
            <p className="t-caption mt-3 text-[var(--fg-muted)]">Updated {updated}</p>
            <div className="mt-8 flex flex-col gap-2.5">
              <p className="t-label mb-1 text-[var(--fg-muted)]">Elsewhere</p>
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
                className="flex gap-5 py-4 border-b border-[var(--border)]"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.06,
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
