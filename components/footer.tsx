"use client";

import { Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";

const navLinks = [
  { label: "home", sectionId: "home" },
  { label: "about", sectionId: "about" },
  { label: "work", sectionId: "work" },
  { label: "contact", sectionId: "contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/kenjimattos",
    hoverColor: "var(--color-accent-cyan)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/kenjimattos",
    hoverColor: "var(--color-accent-purple-light)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:kenjimattos@gmail.com",
    hoverColor: "var(--color-primary)",
    icon: <Mail strokeWidth={1.5} className="w-5 h-5" />,
  },
];

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const hoverColors = [
    "var(--color-accent-cyan)",
    "var(--color-accent-purple-light)",
    "var(--color-primary)",
    "var(--color-accent-cyan)",
  ];

  return (
    <footer className="w-full bg-foreground relative overflow-hidden">
      {/* Decorative gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent-purple), var(--color-accent-cyan), transparent)",
        }}
      />

      {/* Main footer content */}
      <div
        className="relative"
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(40px, 8vw, 180px)",
        }}
      >
        {/* Grid layout */}
        <div
          className="grid gap-12 lg:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          }}
        >
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Logo */}
            <Link
              className="text-background hover:text-primary transition-colors duration-300 leading-none w-fit"
              style={{
                fontFamily: "var(--font-gravitas)",
                letterSpacing: "-0.11em",
                fontSize: "clamp(36px, 5vw, 56px)",
              }}
              href="/"
            >
              knji
            </Link>

            {/* Tagline */}
            <p
              className="text-background leading-relaxed"
              style={{
                fontSize: "clamp(13px, 1.2vw, 15px)",
                opacity: 0.5,
                maxWidth: "280px",
              }}
            >
              Frontend engineer crafting interfaces where aesthetics meet performance.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <span
              className="text-background font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(10px, 0.9vw, 12px)",
                opacity: 0.4,
              }}
            >
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <a
                  key={link.sectionId}
                  className="footer-nav-link text-background transition-all duration-300 cursor-pointer w-fit group flex items-center gap-2"
                  style={{
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    "--hover-color": hoverColors[index],
                  } as CSSProperties}
                  onClick={(e) => handleSectionClick(e, link.sectionId)}
                >
                  <span
                    className="w-0 group-hover:w-3 h-px transition-all duration-300"
                    style={{ backgroundColor: hoverColors[index] }}
                  />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-4">
            <span
              className="text-background font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(10px, 0.9vw, 12px)",
                opacity: 0.4,
              }}
            >
              Connect
            </span>
            <div className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className="footer-social-link text-background transition-all duration-300 w-fit flex items-center gap-3 group"
                  style={{
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    "--hover-color": link.hoverColor,
                  } as CSSProperties}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Status Column */}
          <div className="flex flex-col gap-4">
            <span
              className="text-background font-mono uppercase tracking-wider"
              style={{
                fontSize: "clamp(10px, 0.9vw, 12px)",
                opacity: 0.4,
              }}
            >
              Status
            </span>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-sm w-fit"
              style={{
                backgroundColor: "color-mix(in srgb, var(--color-accent-cyan) 8%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-accent-cyan) 20%, transparent)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-accent-cyan)" }}
              />
              <span
                className="text-background"
                style={{
                  fontSize: "clamp(12px, 1.1vw, 14px)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                Available for work
              </span>
            </div>
            <a
              href="mailto:kenjimattos@gmail.com"
              className="text-background transition-colors duration-300 hover:text-primary w-fit"
              style={{
                fontSize: "clamp(13px, 1.2vw, 15px)",
                opacity: 0.6,
              }}
            >
              kenjimattos@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{
          borderColor: "rgba(255, 255, 249, 0.06)",
          padding: "clamp(20px, 3vw, 30px) clamp(40px, 8vw, 180px)",
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span
              className="text-background"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: 0.4,
              }}
            >
              {new Date().getFullYear()} Kenji Mattos Kinoshita
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--color-accent-purple)", opacity: 0.6 }}
            />
            <span
              className="text-background"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: 0.4,
              }}
            >
              All rights reserved
            </span>
          </div>

          {/* Built with */}
          <div
            className="flex items-center gap-2 text-background"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              opacity: 0.3,
            }}
          >
            <span>Built with</span>
            <span style={{ color: "var(--color-accent-cyan)" }}>Next.js</span>
            <span>&</span>
            <span style={{ color: "var(--color-accent-purple-light)" }}>TypeScript</span>
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none hidden lg:block"
        style={{
          borderRight: "1px solid color-mix(in srgb, var(--color-accent-purple) 30%, transparent)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-accent-cyan) 30%, transparent)",
        }}
      />
    </footer>
  );
};
