import { aboutParagraphs } from "@/content/about";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import StatCounter from "@/components/ui/StatCounter";
import Principles from "./Principles";

export default function About(): JSX.Element {
  return (
    <section id="about" className="pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="container-editorial">
        <AnimatedHeading as="h2" className="t-display mb-16 max-w-[18ch]">
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between t-label">
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
                className={i === 0 ? "t-body-lg text-[var(--fg)] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug" : "t-body-lg"}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stat counters — animate when in view */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-[var(--border)]">
          <StatCounter end={0.948} decimals={3} label="mAP@50 — BYU cryo-ET" />
          <StatCounter end={916} decimals={0} label="Hours of clinical EEG" />
          <StatCounter end={94} decimals={0} suffix="%" label="Pipeline reliability" />
          <StatCounter end={85} decimals={0} suffix="%" label="Faster model deploys" />
        </div>

        <Principles />
      </div>
    </section>
  );
}
