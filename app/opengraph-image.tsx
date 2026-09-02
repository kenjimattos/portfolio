import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "DESIGN SCHEMA DEPLOY: the masthead of Kenji Mattos, software engineer and designer";

export default async function OgImage() {
  return renderOgImage({
    lines: ["DESIGN", "SCHEMA", "DEPLOY"],
    tagline:
      "I design, build, and put into production: interface, business logic, database, and deploy.",
    kicker: "Portfolio",
  });
}
