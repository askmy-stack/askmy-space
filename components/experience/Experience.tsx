import { experience } from "@/content/experience";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function Experience(): JSX.Element {
  return (
    <section id="experience" className="pt-16 pb-32 md:pt-20 md:pb-40">
      <div className="container-editorial">
        <AnimatedHeading as="h2" className="t-display mb-16">
          Where I’ve shipped.
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-12 space-y-14">
            {experience.map((job) => (
              <article
                key={`${job.company}-${job.dates}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-10 border-t border-[var(--border)]"
              >
                <div className="md:col-span-4">
                  <p className="t-label text-[var(--accent)]">
                    {job.dates}
                  </p>
                  <p className="t-caption mt-2">
                    {job.location}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <h3 className="t-headline">
                    {job.title}
                  </h3>
                  <p className="t-body mt-2" style={{ color: "var(--fg)" }}>
                    {job.company}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {job.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="t-body pl-5 relative"
                      >
                        <span
                          className="absolute left-0 top-[0.7em] w-2 h-px bg-[var(--accent)]"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
