import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Finance: Diagnosing an Open Finance API | Kenji Mattos";

export default function OgImage() {
  return renderOgImage({
    title: "Finance",
    subtitle:
      "A self-hosted credit-card manager built on an Open Finance API that recycles transaction IDs, with identity minted locally and the business rules under test.",
    tags: ["TypeScript", "SQLite", "Data modeling"],
  });
}
