import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SebraeOppContent } from "@/app/work/sebrae-opp/sebrae-opp-content";

const title = "Sebrae OPP · Plataforma de Dados Públicos";
const description =
  "Estudo de caso: dados públicos dispersos transformados em decisão para os 223 municípios da Paraíba. 13 fontes oficiais, zero bibliotecas de gráficos, com as telas reais recriadas em React.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pt/work/sebrae-opp",
    languages: { en: "/work/sebrae-opp", "pt-BR": "/pt/work/sebrae-opp" },
  },
  openGraph: {
    type: "article",
    url: "/pt/work/sebrae-opp",
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
  name: "Sebrae OPP",
  headline: title,
  description,
  url: `${siteConfig.url}/pt/work/sebrae-opp`,
  inLanguage: "pt-BR",
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function SebraeOppPagePt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SebraeOppContent />
    </>
  );
}
