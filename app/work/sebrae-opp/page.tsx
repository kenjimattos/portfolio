import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SebraeOppContent } from "./sebrae-opp-content";

const title = "Sebrae OPP · Public Policy Data Platform";
const description =
  "Case study: a public policy observatory for Sebrae Paraíba: 223 municipalities, 13 official sources, zero chart libraries, with the real screens recreated in React.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/work/sebrae-opp",
    languages: { en: "/work/sebrae-opp", "pt-BR": "/pt/work/sebrae-opp" },
  },
  openGraph: {
    type: "article",
    url: "/work/sebrae-opp",
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
  name: "Sebrae OPP",
  headline: title,
  description,
  url: `${siteConfig.url}/work/sebrae-opp`,
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function SebraeOppPage() {
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
