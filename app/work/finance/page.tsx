import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FinanceContent } from "./finance-content";

const title = "Finance: Cash Flow by Bill Window";
const description =
  "Case study: a self-hosted credit-card spending manager where a purchase enters the cash flow on the day the bill is paid. Local transaction identity, a balance anchored instead of read, reconciliation against the issuer's statement, and 132 tests on the business rules.";

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
