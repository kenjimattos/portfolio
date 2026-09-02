import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Finance: Cash Flow by Bill Window | Kenji Mattos";

export default function OgImage() {
  return renderOgImage({
    title: "Finance",
    subtitle:
      "A self-hosted spending manager where a card purchase enters the cash flow on the day the bill is paid, with local transaction identity and the business rules under test.",
    tags: ["TypeScript", "SQLite", "Data modeling"],
  });
}
