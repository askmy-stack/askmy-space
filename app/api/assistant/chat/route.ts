import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { getIntelFeed } from "@/lib/intel";

export const dynamic = "force-dynamic";

/**
 * Public agent endpoint: Groq (free tier) + portfolio + today's intel.
 * Guardrails for a public LLM endpoint on a $0 budget:
 *  - per-IP fixed-window rate limit (in-memory; resets on cold start, which
 *    only ever errs toward allowing a few extra requests)
 *  - hard input/output token caps, no conversation memory for anonymous users
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 20;
const MAX_INPUT_CHARS = 500;
const GROQ_MODEL = "llama-3.3-70b-versatile";

const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function systemPrompt(): string {
  const work = projects
    .map((p) => `- ${p.title} (${p.category}): ${p.narrative}`)
    .join("\n");
  const intel = getIntelFeed()
    .items.slice(0, 12)
    .map((i) => `- [${i.category} · score ${i.score}] ${i.title} — ${i.url}`)
    .join("\n");

  return `You are the resident agent on ${siteConfig.name}'s site (${siteConfig.role}, ${siteConfig.location}).
You answer questions about his work, his autonomous intelligence pipeline, and today's AI signals.

His selected work:
${work}

The platform itself: an autonomous pipeline (askmy-brain) ingests 30+ sources four times a day, scores items with an LLM triage pass (floor 7/10), builds a knowledge graph, and publishes the public feed shown on /signals. Starring items retrains its scorer weekly. Everything is open source at ${siteConfig.social.github}.

Today's top signals:
${intel || "- (feed refreshes after the next pipeline run)"}

Rules: be concise (2-5 sentences unless asked for depth), technically precise, and human — no filler. When you reference a signal, name its title. If asked something unrelated to the work, the pipeline, or AI, redirect briefly and warmly. Never fabricate metrics or links; if you don't know, say so and point to ${siteConfig.email}.`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The agent is offline right now — ask me by email instead.", offline: true },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "That's a lot of questions — give it a few minutes and try again." },
      { status: 429 },
    );
  }

  const { message } = await req.json().catch(() => ({ message: "" }));
  const text = typeof message === "string" ? message.trim().slice(0, MAX_INPUT_CHARS) : "";
  if (!text) {
    return NextResponse.json({ error: "Ask something first." }, { status: 400 });
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 400,
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user", content: text },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[assistant] groq error", res.status, detail.slice(0, 200));
    return NextResponse.json(
      { error: "The agent hit a snag — try again in a moment." },
      { status: 502 },
    );
  }

  const data = await res.json();
  const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
  return NextResponse.json({ reply });
}
