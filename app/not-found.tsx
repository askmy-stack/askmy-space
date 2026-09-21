import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Lost in latent space",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container-editorial">
        <p className="t-label mb-6">404 · not found</p>
        <h1 className="t-display">
          Lost in <span className="text-[var(--accent)]">latent space.</span>
        </h1>
        <p className="t-body-lg mt-6 max-w-xl">
          This route doesn&apos;t exist — or maybe it hasn&apos;t been trained yet.
          Head home and try another path.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-10 t-caption font-medium text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </section>
  );
}
