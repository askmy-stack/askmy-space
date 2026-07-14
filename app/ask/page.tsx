import type { Metadata } from "next";
import AskAgent from "@/components/ask/AskAgent";

export const metadata: Metadata = {
  title: "Ask",
  description:
    "Ask the resident agent about the work, the autonomous intelligence pipeline, or today's AI signals.",
};

export default function AskPage(): JSX.Element {
  return (
    <main className="pt-32 pb-24">
      <div className="container-editorial max-w-3xl">
        <h1 className="t-display">Ask the platform.</h1>
        <p className="t-body mt-4 max-w-[52ch]" style={{ color: "var(--fg-muted)" }}>
          The agent knows the work on this site, how the pipeline behind it runs, and
          what it kept from today&apos;s signals. One question at a time — it holds no
          memory between them.
        </p>
        <div className="mt-10">
          <AskAgent />
        </div>
      </div>
    </main>
  );
}
