"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      // Se já estiver na home, apenas rola para a seção
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Se estiver em outra página, navega para home e depois rola
      router.push("/");
      // Aguarda a navegação e então rola
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className="fixed w-full z-50 flex justify-between items-center"
      style={{ 
        paddingInline: "clamp(20px, 4vw, 60px)"
      }}
    >

        <Link
          className="text-primary hover:text-foreground font-normal"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            fontSize: "clamp(32px, 6vw, 64px)",
          }}
          href="/"
        >
          knji
        </Link>
        <button
          onClick={handleContactClick}
          className="btn-primary"
        >
          Contact
        </button>
    </header>
  );
};
