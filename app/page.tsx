import { Hero } from "@/components/hero";
import { MastheadNote } from "@/components/ui/main-note";
import { About } from "@/components/about";
import { Work } from "@/components/work";
// import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { siteConfig } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.brand.ownerName,
  alternateName: "Kenji Mattos",
  jobTitle: "Software Engineer",
  url: siteConfig.url,
  email: `mailto:${siteConfig.profile.email}`,
  sameAs: [siteConfig.profile.githubUrl, siteConfig.profile.linkedinUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <MastheadNote />
      <Work />
      <About />      
      {/* <TechStack /> */}
      <Contact />
    </>
  );
}
