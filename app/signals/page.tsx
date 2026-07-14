import type { Metadata } from "next";
import SignalsFeed from "@/components/signals/SignalsFeed";
import { getIntelFeed } from "@/lib/intel";

export const metadata: Metadata = {
  title: "Signals",
  description:
    "Today in AI — high-signal items kept by an autonomous intelligence pipeline: 30+ sources, LLM triage, scored and filtered four times a day.",
};

export default function SignalsPage(): JSX.Element {
  const feed = getIntelFeed();

  return (
    <main className="pt-32 pb-24">
      <div className="container-editorial">
        <SignalsFeed items={feed.items} generatedAt={feed.generated_at} />
      </div>
    </main>
  );
}
