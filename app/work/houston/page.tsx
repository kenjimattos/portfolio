import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HoustonContent } from "./houston-content";

const title = "Houston · Medical Shift Operations Platform";
const description =
  "Case study: from internal tool to a multi-tenant platform running schedules, applications and access for 2,000+ doctors, designed directly in code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work/houston",
    languages: { en: "/work/houston", "pt-BR": "/pt/work/houston" },
  },
  openGraph: {
    type: "article",
    url: "/work/houston",
    title: `${title} | Kenji Mattos`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Kenji Mattos`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Houston",
  headline: title,
  description,
  url: `${siteConfig.url}/work/houston`,
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function HoustonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HoustonContent />
    </>
  );
}
