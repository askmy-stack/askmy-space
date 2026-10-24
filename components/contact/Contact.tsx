import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="pt-14 pb-16 md:pt-16 md:pb-20">
      <div className="container-editorial">
        <AnimatedHeading as="h2" className="t-display mb-5">
          Contact.
        </AnimatedHeading>

        <p className="t-body max-w-xl text-[var(--fg-muted)]">
          Technical discussions on agent systems, evaluation, or ML
          infrastructure—email is the fastest path.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}`}
            external
            variant="primary"
          >
            Email
          </Button>
          <Button href={siteConfig.social.linkedin} external variant="outline">
            LinkedIn
          </Button>
          <Button href={siteConfig.social.github} external variant="outline">
            GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
