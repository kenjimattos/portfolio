import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Houston: Medical Shift Management Platform | Kenji Mattos";

export default async function OgImage() {
  return renderOgImage({
    lines: ["HOUSTON"],
    tagline:
      "Medical shift operations end to end: scheduling, attendance, payments, and multi-tenant access.",
    kicker: "Work / Houston",
    stack: ["Full-stack", "PostgreSQL", "CI/CD"],
  });
}
