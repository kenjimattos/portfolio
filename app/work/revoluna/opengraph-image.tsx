import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Revoluna: Mobile App for Medical Shifts | Kenji Mattos";

export default async function OgImage() {
  return renderOgImage({
    lines: ["REVOLUNA"],
    tagline:
      "A mobile-first product for medical shift management in Brazil, designed, built, and shipped to both app stores.",
    kicker: "Work / Revoluna",
    stack: ["Product design", "Mobile", "Flutter"],
  });
}
