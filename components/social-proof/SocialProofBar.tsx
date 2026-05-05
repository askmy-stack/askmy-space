"use client";

import { motion } from "framer-motion";
import EntityLogo from "./EntityLogo";

interface Entity {
  name: string;
  type: "company" | "school" | "cert" | "award";
}

const entities: readonly Entity[] = [
  { name: "Jio Platforms", type: "company" },
  { name: "George Washington University", type: "school" },
  { name: "Follett Higher Education", type: "company" },
  { name: "PHN Technologies", type: "company" },
  { name: "TEDx", type: "award" },
  { name: "Google Developer Club", type: "award" },
  { name: "AWS AI Practitioner", type: "cert" },
  { name: "Global Leaders Award", type: "award" },
  { name: "Red Hat Certified", type: "cert" },
  { name: "Google Advanced Data Analytics", type: "cert" },
];

export default function SocialProofBar(): JSX.Element {
  return (
    <section className="py-16 border-y border-[var(--border)] overflow-hidden">
      <p className="t-label text-center mb-8">
        Worked at · Studied at · Certified by
      </p>

      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 pr-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...entities, ...entities].map((entity, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-default">
              <span
                className={`shrink-0 transition-colors duration-200 ${
                  entity.type === "award"
                    ? "text-[var(--accent)] group-hover:text-[var(--fg)]"
                    : entity.type === "cert"
                      ? "text-[var(--mono)] group-hover:text-[var(--fg)]"
                      : "text-[var(--fg-muted)] group-hover:text-[var(--fg)]"
                }`}
              >
                <EntityLogo name={entity.name} />
              </span>
              <span className="t-label group-hover:text-[var(--fg)] transition-colors duration-200">
                {entity.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
