import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abhinaysai Kamineni — AI Systems Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#8A8680",
            fontFamily: "monospace",
            fontSize: "14px",
            letterSpacing: "3px",
          }}
        >
          ARLINGTON, VA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F5F1EA",
              fontSize: "72px",
              fontWeight: 600,
              lineHeight: 1.05,
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}
          >
            Abhinaysai Kamineni
          </div>
          <div
            style={{
              color: "#FF6B35",
              fontSize: "28px",
              letterSpacing: "-0.01em",
            }}
          >
            AI Systems Engineer
          </div>
          <div
            style={{
              color: "#F5F1EA",
              opacity: 0.55,
              fontSize: "18px",
              marginTop: "18px",
              maxWidth: "720px",
              lineHeight: 1.4,
            }}
          >
            Reliable agents · Context engineering · Evaluation · ML infrastructure
          </div>
        </div>

        <div style={{ display: "flex", gap: "40px" }}>
          {["Cortex", "Parallax", "EEG", "tool-semantics"].map((label) => (
            <div
              key={label}
              style={{
                color: "#8A8680",
                fontFamily: "monospace",
                fontSize: "14px",
                letterSpacing: "1px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
