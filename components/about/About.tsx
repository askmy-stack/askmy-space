import { aboutParagraphs } from "@/content/about";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import StatCounter from "@/components/ui/StatCounter";
import Principles from "./Principles";
import AboutTerminal from "./AboutTerminal";

export default function About(): JSX.Element {
  return (
    <section id="about" className="pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="container-editorial">
        <AnimatedHeading as="h2" className="t-display mb-16 max-w-[20ch]">
          Systems engineer with judgment.
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Real-work terminal block (replaces AK monogram) */}
          <div className="md:col-span-5">
            <AboutTerminal />
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
          <StatCounter end={85} decimals={0} suffix="%" label="Faster model deploys" />
          <StatCounter end={100} decimals={0} suffix="+" label="Airflow DAGs" />
          <StatCounter end={50} decimals={0} suffix="M+" label="Events per day" />
          <StatCounter end={45} decimals={0} suffix="%" label="Lower MTTD" />
        </div>

        <Principles />
      </div>
    </section>
  );
}
