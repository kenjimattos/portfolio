import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { siteConfig } from "@/config/site";

const title =
  "Kenji Mattos — Engenheiro de Software";
const description =
  "Engenheiro de Software construindo plataformas de ponta a ponta, do design ao código em produção.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/pt",
    languages: { en: "/", "pt-BR": "/pt" },
  },
  openGraph: {
    type: "website",
    url: "/pt",
    title,
    description,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.brand.ownerName,
  alternateName: "Kenji Mattos",
  jobTitle: "Engenheiro de Software",
  url: `${siteConfig.url}/pt`,
  email: `mailto:${siteConfig.profile.email}`,
  sameAs: [siteConfig.profile.githubUrl, siteConfig.profile.linkedinUrl],
};

export default function HomePt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Work />
      <About />
      <TechStack />
      <Contact />
    </>
  );
}
