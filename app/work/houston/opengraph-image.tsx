import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Houston — Medical Shift Management Platform | Kenji Mattos";

export default function OgImage() {
  return renderOgImage({
    title: "Houston",
    subtitle:
      "A production-grade platform for medical shift operations — scheduling, attendance, payments, and multi-tenant RBAC.",
    tags: ["Full-Stack", "PostgreSQL", "CI/CD"],
  });
}
