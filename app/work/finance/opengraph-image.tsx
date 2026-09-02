import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Finance: Cash Flow by Bill Window | Kenji Mattos";

export default async function OgImage() {
  return renderOgImage({
    lines: ["FINANCE"],
    tagline:
      "A self-hosted spending manager where a card purchase enters the cash flow on the day the bill is paid.",
    kicker: "Work / Finance",
    stack: ["TypeScript", "SQLite", "Data modeling"],
  });
}
