import { siteConfig } from "@/content/site";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-12 mt-10 md:mt-12">
      <div className="container-editorial">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
              Elsewhere
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
              Site
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#work" className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                Work
              </a>
              <a href="#about" className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                About
              </a>
              <a href="#now" className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
                Now
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)] mb-4">
              Status
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse-dot" />
              <span className="text-[var(--fg)]">Open to collaborations · Building big</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-6 border-t border-[var(--border)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            © {year} {siteConfig.name}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--fg-muted)]">
            Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
