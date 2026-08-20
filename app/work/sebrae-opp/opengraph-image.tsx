import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Sebrae OPP: Public Policy Data Platform | Kenji Mattos";

export default function OgImage() {
  return renderOgImage({
    title: "Sebrae OPP",
    subtitle:
      "A public policy observatory unifying indicators for the 223 municipalities of Paraíba, built with React, Fastify, and Python ETL.",
    tags: ["Full-Stack", "Data", "MongoDB"],
  });
}
