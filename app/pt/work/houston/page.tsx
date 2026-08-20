import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HoustonContent } from "@/app/work/houston/houston-content";

const title = "Houston — Plataforma de Gestão de Plantões Médicos";
const description =
  "Estudo de caso: a evolução de uma ferramenta interna para uma plataforma multi-hospital de gestão de plantões (escalas, presença, pagamentos e controle de acesso), com as telas reais recriadas em React.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pt/work/houston",
    languages: { en: "/work/houston", "pt-BR": "/pt/work/houston" },
  },
  openGraph: {
    type: "article",
    url: "/pt/work/houston",
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
  name: "Houston",
  headline: title,
  description,
  url: `${siteConfig.url}/pt/work/houston`,
  inLanguage: "pt-BR",
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function HoustonPagePt() {
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
