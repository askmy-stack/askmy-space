import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getIntelFeed } from "@/lib/intel";
import SignalDetail from "@/components/Dashboard/SignalDetail";

interface Props {
  params: { id: string };
}

/**
 * Signal ids are indices into the committed feed. Pages and feed are
 * built from the same JSON in the same deploy, so the mapping is stable
 * for the lifetime of a deployment (each feed refresh redeploys).
 */
export function generateStaticParams() {
  return getIntelFeed().items.map((_, i) => ({ id: String(i) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getIntelFeed().items[Number(params.id)];
  if (!item) return { title: "Not found" };
  return {
    title: `${item.title} — Signals`,
    description: item.summary.slice(0, 160),
  };
}

export default function SignalDetailPage({ params }: Props) {
  const feed = getIntelFeed();
  const id = Number(params.id);
  const item = Number.isInteger(id) ? feed.items[id] : undefined;
  if (!item) notFound();

  const related = feed.items
    .map((rel, relId) => ({ item: rel, id: relId }))
    .filter(({ item: rel, id: relId }) => relId !== id && rel.category === item.category)
    .sort((a, b) => b.item.score - a.item.score)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--color-dashboard-bg)] px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <SignalDetail item={item} related={related} />
    </div>
  );
}
