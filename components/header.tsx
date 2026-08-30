"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { localeHref, useLocale } from "@/lib/i18n";
import { useScrollTo } from "@/lib/smooth-scroll";
import { LangToggle } from "@/components/lang-toggle";

const NAV_COPY = {
  en: {
    links: [
      { label: "Work", href: "/#work" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
    resume: "Resume",
    menu: "Menu",
  },
  pt: {
    links: [
      { label: "Projetos", href: "/#work" },
      { label: "Sobre", href: "/#about" },
      { label: "Contato", href: "/#contact" },
    ],
    resume: "Currículo",
    menu: "Menu",
  },
} as const;

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { links: navLinks, menu: menuLabel } = NAV_COPY[locale];
  const scrollTo = useScrollTo();
  const home = localeHref(locale, "/");
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll-spy: mark the nav link of the section currently in view
  const isHome = pathname === home;
  useEffect(() => {
    if (!isHome) return;

    const ids = ["work", "about", "contact"];
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveSection(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const sectionId = href.split("#")[1] ?? "";

    /* Uma rolagem só manda na página: usar scrollIntoView aqui faria o
       salto nativo correr por cima da interpolação do Lenis. */
    if (pathname === home) {
      scrollTo(`#${sectionId}`);
    } else {
      router.push(home);
      setTimeout(() => scrollTo(`#${sectionId}`), 100);
    }
  };

  return (
    <>
      {/* A barra não muda de estado no scroll: ela é uma régua de 1px que
          fica onde está. O que muda é a página passando por baixo dela. */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50"
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--ink)",
        }}
      >
        <div className="wrap flex items-center justify-between" style={{ height: 56 }}>
          <Link
            href={home}
            className="transition-colors hover:text-red"
            style={{
              fontWeight: 900,
              fontSize: 20,
              letterSpacing: "-0.04em",
              fontVariationSettings: '"wdth" 118',
              transitionDuration: "90ms",
            }}
          >
            {siteConfig.brand.logoText}
          </Link>

          <nav className="hidden md:flex items-center" style={{ gap: "var(--s3)" }}>
            {navLinks.map((link) => {
              const isActive =
                isHome && activeSection === (link.href.split("#")[1] ?? "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className="meta nav-link"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center" style={{ gap: "var(--s2)" }}>
            <LangToggle />
            {/* <a
              href={siteConfig.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="meta btn-line hidden md:inline-block"
            >
              {resumeLabel}
            </a> */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 flex items-center justify-center"
              style={{
                width: 34,
                height: 32,
                border: "1px solid",
                borderColor: isMobileMenuOpen ? "var(--paper)" : "var(--ink)",
                color: isMobileMenuOpen ? "var(--paper)" : "var(--ink)",
              }}
              aria-label={menuLabel}
              aria-expanded={isMobileMenuOpen}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <line
                  x1="2"
                  y1={isMobileMenuOpen ? "8" : "5"}
                  x2="14"
                  y2={isMobileMenuOpen ? "8" : "5"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    transformOrigin: "center",
                    transform: isMobileMenuOpen ? "rotate(45deg)" : "none",
                    transition: "all 200ms",
                  }}
                />
                <line
                  x1="2"
                  y1={isMobileMenuOpen ? "8" : "11"}
                  x2="14"
                  y2={isMobileMenuOpen ? "8" : "11"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    transformOrigin: "center",
                    transform: isMobileMenuOpen ? "rotate(-45deg)" : "none",
                    transition: "all 200ms",
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile: campo de tinta cheio, links em caixa alta. */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-opacity on-ink"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          background: "var(--ink)",
          color: "var(--paper)",
          transitionDuration: "300ms",
        }}
      >
        <nav
          className="flex flex-col justify-center h-full wrap"
          style={{ gap: "var(--s3)" }}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: "clamp(40px, 12vw, 72px)",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.035em",
                lineHeight: 1,
                fontVariationSettings: '"wdth" 112',
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 400ms cubic-bezier(0.16, 1, 0.24, 1) ${index * 60}ms`,
              }}
            >
              {link.label}
            </a>
          ))}

          {/* <a
            href={siteConfig.profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="meta"
            style={{
              marginTop: "var(--s6)",
              alignSelf: "flex-start",
              border: "1px solid var(--paper)",
              padding: "10px 16px",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 400ms cubic-bezier(0.16, 1, 0.24, 1) ${navLinks.length * 60}ms`,
            }}
          >
            {resumeLabel} ↗
          </a> */}
        </nav>
      </div>
    </>
  );
};
