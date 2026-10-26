import { projects } from "@/content/projects";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import WorkRow from "./WorkRow";

export default function SelectedWork(): JSX.Element {
  return (
    <section id="work" className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container-editorial">
        <div className="mb-20">
          <AnimatedHeading as="h2" className="t-display">
            Featured work.
          </AnimatedHeading>
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
