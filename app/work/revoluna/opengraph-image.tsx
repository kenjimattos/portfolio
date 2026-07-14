import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Revoluna — Mobile App for Medical Shifts | Kenji Mattos";

export default function OgImage() {
  return renderOgImage({
    title: "Revoluna",
    subtitle:
      "A mobile-first product bringing clarity to medical shift management in Brazil — designed, built, and shipped to both app stores.",
    tags: ["Product Design", "Mobile", "Flutter"],
  });
}
