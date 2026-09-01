import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt =
  "Kenji Mattos · Software Engineer";

export default function OgImage() {
  return renderOgImage({
    title: "Kenji Mattos",
    subtitle:
      "Software Engineer — I design, build, and ship products end to end.",
    tags: ["React", "Next.js", "PostgreSQL", "Product Design"],
  });
}
