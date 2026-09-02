import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Sebrae OPP: Public Policy Data Platform | Kenji Mattos";

export default async function OgImage() {
  return renderOgImage({
    lines: ["SEBRAE OPP"],
    tagline:
      "A public policy observatory unifying indicators for the 223 municipalities of Paraíba, on React, Fastify, and a Python ETL.",
    kicker: "Work / Sebrae OPP",
    stack: ["Full-stack", "Data", "MongoDB"],
  });
}
