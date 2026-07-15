import { describe, expect, it } from "vitest";
import { execute, greet } from "@/lib/terminal/engine";
import type { TerminalSession } from "@/lib/terminal/session";

const ctx: TerminalSession = {
  userName: null,
  visits: 0,
  isFirstVisit: true,
  lastSection: null,
};

describe("terminal engine", () => {
  it("returns empty lines for blank input", () => {
    expect(execute("   ", ctx).lines).toEqual([]);
  });

  it("help lists commands", () => {
    const res = execute("help", ctx);
    expect(res.lines.some((l) => /COMMANDS/i.test(l.text))).toBe(true);
    expect(res.lines.some((l) => /projects/i.test(l.text))).toBe(true);
  });

  it("clear sets clear flag", () => {
    const res = execute("clear", ctx);
    expect(res.clear).toBe(true);
    expect(res.lines).toEqual([]);
  });

  it("whoami includes site name", () => {
    const res = execute("whoami", ctx);
    expect(res.lines.some((l) => /Abhinaysai/i.test(l.text))).toBe(true);
  });

  it("projects lists work links", () => {
    const res = execute("projects", ctx);
    expect(res.scrollTo).toBe("work");
    expect(res.lines.some((l) => l.kind === "link" && /\/work\//.test(l.href ?? ""))).toBe(
      true,
    );
  });

  it("resume links to siteConfig resume path", () => {
    const res = execute("resume", ctx);
    expect(
      res.lines.some(
        (l) => l.kind === "link" && (l.href ?? "").includes("abhinaysai-kamineni-resume.pdf"),
      ),
    ).toBe(true);
  });

  it("sudo hire-me returns a success-path response", () => {
    const res = execute("sudo hire-me", ctx);
    expect(res.lines.length).toBeGreaterThan(0);
    const blob = res.lines.map((l) => l.text).join("\n");
    expect(/HIRING BRIEF|authentication successful/i.test(blob)).toBe(true);
  });

  it("unknown command suggests alternatives", () => {
    const res = execute("xyzzy-not-a-command", ctx);
    expect(res.lines.length).toBeGreaterThan(0);
    const blob = res.lines.map((l) => l.text).join(" ");
    expect(/not found|unknown|try|help|suggest/i.test(blob)).toBe(true);
  });

  it("greet first visit mentions help", () => {
    const lines = greet(ctx);
    expect(lines.some((l) => /help/i.test(l.text))).toBe(true);
  });
});
