import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RevolunaContent } from "./revoluna-content";

const title = "Revoluna — Mobile App for Medical Shifts";
const description =
  "Case study: designing and shipping a mobile app for medical shifts in Brazil — from Figma redesign to a published MVP on the App Store and Google Play.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work/revoluna",
  },
  openGraph: {
    type: "article",
    url: "/work/revoluna",
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
  name: "Revoluna",
  headline: title,
  description,
  url: `${siteConfig.url}/work/revoluna`,
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function RevolunaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevolunaContent />
    </>
  );
}
