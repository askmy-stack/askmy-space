import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export default async function Image({ params }: Props) {
  const project = getProject(params.slug);
  const title = project?.title ?? "Work";
  const metric = project?.heroMetric ?? project?.subtitle ?? "";
  const accent = project?.color ?? "#4ADE80";

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
              background: accent,
            }}
          />
          <span
            style={{
              color: accent,
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "4px",
            }}
          >
            CASE STUDY
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              color: "#F5F2EC",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {metric ? (
            <div
              style={{
                color: "#A3B18A",
                fontFamily: "monospace",
                fontSize: 22,
                maxWidth: 900,
              }}
            >
              {metric}
            </div>
          ) : null}
        </div>
        <div
          style={{
            color: "#6B6B6B",
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: "2px",
          }}
        >
          askmystack.space
        </div>
      </div>
    ),
    { ...size },
  );
}
