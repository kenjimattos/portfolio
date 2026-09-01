import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { RevolunaContent } from "@/app/work/revoluna/revoluna-content";

const title = "Revoluna · App Mobile de Plantões Médicos";
const description =
  "Estudo de caso: design e lançamento de um app de plantões médicos no Brasil: 38 releases na App Store e no Google Play, com as telas reais recriadas em React.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pt/work/revoluna",
    languages: { en: "/work/revoluna", "pt-BR": "/pt/work/revoluna" },
  },
  openGraph: {
    type: "article",
    url: "/pt/work/revoluna",
    title: `${title} | Kenji Mattos`,
    description,
    locale: "pt_BR",
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
  url: `${siteConfig.url}/pt/work/revoluna`,
  inLanguage: "pt-BR",
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function RevolunaPagePt() {
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
