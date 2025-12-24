"use client";

import { useRouter, usePathname } from "next/navigation";

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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center-safe"
      style={{ padding: "clamp(10px, 2vw, 20px) clamp(10px, 4vw, 80px)" }}
    >
      <nav className="relative w-full max-w-[1200px] h-[60px]">
        <a
          className="absolute top-[5px] left-0 leading-[1em] text-primary hover:text-foreground font-normal"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            fontSize: "clamp(32px, 6vw, 64px)",
          }}
          href="/"
        >
          knji
        </a>
        <button
          onClick={handleContactClick}
          className="absolute top-[4px] right-0"
        >
          Contact
        </button>
      </nav>
    </header>
  );
};
