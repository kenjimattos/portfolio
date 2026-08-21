import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FinanceContent } from "./finance-content";

const title = "Finance: Diagnosing an Open Finance API";
const description =
  "Case study: a self-hosted credit-card manager where transactions changed value on their own. Diagnosis, local transaction identity, a six-outcome sync state machine, and 132 tests on the business rules.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work/finance",
    languages: { en: "/work/finance", "pt-BR": "/pt/work/finance" },
  },
  openGraph: {
    type: "article",
    url: "/work/finance",
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
  name: "Finance",
  headline: title,
  description,
  url: `${siteConfig.url}/work/finance`,
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function FinancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FinanceContent />
    </>
  );
}
