"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Initial animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );

    // Nav links stagger
    const links = navRef.current?.querySelectorAll("a");
    if (links) {
      gsap.fromTo(
        links,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    }
  }, { scope: headerRef });

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const sectionId = href.replace("#", "");

    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed w-full z-50 transition-all duration-500"
        style={{
          padding: isScrolled ? "12px clamp(40px, 8vw, 180px)" : "20px clamp(40px, 8vw, 180px)",
          backgroundColor: isScrolled ? "rgba(255, 255, 249, 0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(22, 22, 22, 0.06)" : "1px solid transparent",
          opacity: 0,
        }}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            className="text-foreground hover:text-primary transition-colors duration-300 font-normal relative z-50"
            style={{
              fontFamily: "var(--font-gravitas)",
              letterSpacing: "-0.11em",
              fontSize: "clamp(28px, 4vw, 40px)",
            }}
            href="/"
          >
            knji
          </Link>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-foreground hover:text-primary transition-colors duration-300 relative group"
                style={{
                  fontSize: "clamp(14px, 1.2vw, 16px)",
                  fontFamily: "var(--font-gabarito)",
                }}
              >
                {link.label}
                {/* Underline effect */}
                <span
                  className="absolute left-0 -bottom-1 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}

            {/* Resume/CV Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-sm text-primary border border-primary hover:bg-primary hover:text-background transition-all duration-300"
              style={{
                fontSize: "clamp(13px, 1.1vw, 15px)",
                fontFamily: "var(--font-gabarito)",
              }}
            >
              Resume
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className="w-6 h-0.5 bg-foreground transition-all duration-300 origin-center"
              style={{
                transform: isMobileMenuOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="w-6 h-0.5 bg-foreground transition-all duration-300"
              style={{
                opacity: isMobileMenuOpen ? 0 : 1,
                transform: isMobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
            <span
              className="w-6 h-0.5 bg-foreground transition-all duration-300 origin-center"
              style={{
                transform: isMobileMenuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
          backgroundColor: "var(--color-background)",
        }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-foreground hover:text-primary transition-all duration-300"
              style={{
                fontSize: "clamp(32px, 8vw, 48px)",
                fontFamily: "var(--font-gabarito)",
                fontWeight: 600,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s ease ${index * 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-4 rounded-sm text-primary border-2 border-primary hover:bg-primary hover:text-background transition-all duration-300"
            style={{
              fontSize: "clamp(18px, 4vw, 24px)",
              fontFamily: "var(--font-gabarito)",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 0.5s ease ${navLinks.length * 0.1}s`,
            }}
          >
            Resume
          </a>

          {/* Social Links */}
          <div
            className="flex gap-6 mt-12"
            style={{
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: `all 0.5s ease ${(navLinks.length + 1) * 0.1}s`,
            }}
          >
            <a
              href="https://github.com/kenjimattos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
              style={{ opacity: 0.6 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/kenjimattos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors duration-300"
              style={{ opacity: 0.6 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
