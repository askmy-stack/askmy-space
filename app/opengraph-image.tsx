import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abhinaysai Kamineni — AI/ML Engineer";
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#4ADE80",
            }}
          />
          <span
            style={{
              color: "#4ADE80",
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "4px",
            }}
          >
            AVAILABLE · SUMMER 2026 · OPT
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F5F1EA",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "24px",
              letterSpacing: "-0.03em",
            }}
          >
            Abhinaysai Kamineni
          </div>
          <div
            style={{
              color: "#FF6B35",
              fontSize: "32px",
              fontFamily: "monospace",
            }}
          >
            AI/ML Engineer
          </div>
          <div
            style={{
              color: "#F5F1EA",
              opacity: 0.5,
              fontSize: "18px",
              marginTop: "16px",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            CV · TIME-SERIES · MLOPS · AGENTIC AI
          </div>
        </div>

        <div style={{ display: "flex", gap: "48px" }}>
          {[
            { value: "0.948", label: "MAP@50" },
            { value: "916h", label: "EEG DATA" },
            { value: "99.9%", label: "RELIABILITY" },
            { value: "85%", label: "FASTER DEPLOYS" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  color: "#F5F1EA",
                  fontSize: "28px",
                  fontFamily: "monospace",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "#F5F1EA",
                  opacity: 0.3,
                  fontSize: "11px",
                  fontFamily: "monospace",
                  letterSpacing: "2px",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
