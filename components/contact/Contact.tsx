import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { siteConfig } from "@/content/site";

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="pt-10 pb-16 md:pt-12 md:pb-20">
      <div className="container-editorial">
        <AnimatedHeading
          as="h2"
          className="t-display mb-4"
        >
          Let’s build
        </AnimatedHeading>
        <AnimatedHeading
          as="h2"
          className="t-display text-[var(--accent)] mb-12"
          delay={0.15}
        >
          something real.
        </AnimatedHeading>

        <p className="t-body-lg max-w-2xl">
          Open to research collaborations, product-ML builds, and teams working at the
          research-to-product boundary. If the problem is hard and the work is honest.
          Reach out.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 ease-[var(--motion-easing-standard)] bg-[var(--color-editorial-accent-1)] text-[var(--color-editorial-bg)] hover:bg-[var(--color-editorial-accent-2)] hover:-translate-y-1 active:scale-97"
          >
            Email ↗
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 ease-[var(--motion-easing-standard)] border-2 border-[var(--color-editorial-border)] text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-text)] hover:text-[var(--color-editorial-bg)]"
          >
            LinkedIn ↗
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 ease-[var(--motion-easing-standard)] border-2 border-[var(--color-editorial-border)] text-[var(--color-editorial-text)] hover:bg-[var(--color-editorial-text)] hover:text-[var(--color-editorial-bg)]"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
