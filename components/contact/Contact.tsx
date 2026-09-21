import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className="pt-16 pb-20 md:pt-20 md:pb-24">
      <div className="container-editorial">
        <AnimatedHeading as="h2" className="t-display mb-6">
          Contact.
        </AnimatedHeading>

        <p className="t-lede max-w-2xl">
          For technical discussions about agent systems, evaluation, or ML
          infrastructure — email is the fastest path.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
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
