import { projects } from "@/content/projects";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import WorkRow from "./WorkRow";

export default function SelectedWork(): JSX.Element {
  return (
    <section id="work" className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <AnimatedHeading as="h2" className="t-display">
            Featured work.
          </AnimatedHeading>
          <p className="t-caption max-w-xs md:max-w-[22rem] md:pb-1.5">
            Agent memory, runtime reliability, clinical EEG research, and MCP
            tool contracts — evidence over demos.
          </p>
        </div>

        <div>
          {projects.map((p, i) => (
            <WorkRow key={p.slug} project={p} index={i} />
          ))}
          <div className="h-px bg-[var(--border)]" />
        </div>
      </div>
    </section>
  );
}
