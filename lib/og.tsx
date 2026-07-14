import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

type OgImageProps = {
  title: string;
  subtitle: string;
  tags?: string[];
};

const tagColors = ["#00C8FF", "#B388FF", "#0049FF"];

export function renderOgImage({ title, subtitle, tags }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(0, 73, 255, 0.25), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(120, 0, 255, 0.2), transparent 60%), radial-gradient(ellipse 50% 50% at 80% 20%, rgba(0, 200, 255, 0.12), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "#fffff9",
            }}
          >
            knji
          </span>
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              backgroundColor: "#0049FF",
              marginLeft: 6,
              marginTop: 18,
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fffff9",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(255, 255, 249, 0.6)",
              maxWidth: 940,
            }}
          >
            {subtitle}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {(tags ?? []).map((tag, index) => (
              <span
                key={tag}
                style={{
                  fontSize: 22,
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: `1px solid ${tagColors[index % 3]}55`,
                  color: tagColors[index % 3],
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 24, color: "rgba(255, 255, 249, 0.4)" }}>
            {new URL(siteConfig.url).host}
          </span>
        </div>
      </div>
    ),
    ogSize
  );
}
