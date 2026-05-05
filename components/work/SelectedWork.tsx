import { projects } from "@/content/projects";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import WorkRow from "./WorkRow";

export default function SelectedWork(): JSX.Element {
  return (
    <section id="work" className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <AnimatedHeading as="h2" className="t-display">
            Systems that shipped.
          </AnimatedHeading>
          <p className="t-body max-w-xs md:max-w-[22rem] md:pb-1">
            End-to-end projects in computer vision, clinical signal analysis, MLOps, and agentic AI. Each one grounded in honest evaluation and a real user at the end.
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
