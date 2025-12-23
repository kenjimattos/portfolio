import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { TechStack } from "@/components/tech-stack";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About  />
      <Work />
      <TechStack />
      <Contact />
      <Footer />
      </>
  );
}
