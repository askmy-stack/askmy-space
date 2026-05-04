import { aboutParagraphs } from "@/content/about";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import StatCounter from "@/components/ui/StatCounter";
import Principles from "./Principles";

export default function About(): JSX.Element {
  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container-editorial">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          02 — About
        </p>
        <AnimatedHeading as="h2" className="text-display-lg text-[var(--fg)] mb-16 max-w-[18ch]">
          Rigorous engineer with taste.
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Typographic AK mark (portrait placeholder) */}
          <div className="md:col-span-5">
            <div className="aspect-square relative border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,107,53,0.2), transparent 60%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[clamp(8rem,20vw,16rem)] leading-none text-[var(--fg)] font-[family-name:var(--font-display)]"
                  aria-hidden="true"
                >
                  AK
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
                <span>/ Abhinaysai Kamineni</span>
                <span>2026</span>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="md:col-span-7 space-y-6">
            {aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-display-md text-[var(--fg)] leading-tight"
                    : "text-body-lg text-[var(--fg-muted)]"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stat counters — animate when in view */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-[var(--border)]">
          <StatCounter end={0.948} decimals={3} label="mAP@50 (BYU)" />
          <StatCounter end={916} label="Hours of EEG" />
          <StatCounter end={99.9} decimals={1} suffix="%" label="Pipeline Reliability" />
          <StatCounter end={85} suffix="%" label="Faster Deploys" />
        </div>

        <Principles />
      </div>
    </section>
  );
}
