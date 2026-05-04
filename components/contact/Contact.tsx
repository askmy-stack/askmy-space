import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="py-32 md:py-40">
      <div className="container-editorial">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          05 — Contact
        </p>
        <AnimatedHeading
          as="h2"
          className="text-display-xl text-[var(--fg)] leading-[0.95] mb-4"
        >
          Let’s build
        </AnimatedHeading>
        <AnimatedHeading
          as="h2"
          className="text-display-xl text-[var(--accent)] leading-[0.95] mb-12"
          delay={0.15}
        >
          something real.
        </AnimatedHeading>

        <p className="text-body-lg text-[var(--fg-muted)] max-w-2xl leading-relaxed">
          Open to research collaborations, product-ML builds, and teams working at the
          research-to-product boundary. If the problem is hard and the work is honest —
          reach out.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
            external
            variant="primary"
          >
            Email ↗
          </Button>
          <Button href={siteConfig.social.linkedin} external variant="outline">
            LinkedIn ↗
          </Button>
          <Button href={siteConfig.social.github} external variant="outline">
            GitHub ↗
          </Button>
          <Button href={siteConfig.resume} variant="ghost">
            Resume ↓
          </Button>
        </div>
      </div>
    </section>
  );
}
