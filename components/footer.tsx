"use client";

import { Mail } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

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

  return (
    <footer
      className="section-pb w-full absolute z-50 bg-foreground flex justify-between"
      style={{marginTop: "clamp(40px, 8vw, 180px)",}}
    >
      <div
        className="flex flex-col"
        style={{
          gap: "clamp(20px, 3vw, 40px)",}}
      >
        {/* Logo */}
        <Link
          className="text-background hover:text-primary transition-opacity leading-[1em] w-fit"
          style={{
            fontFamily: "var(--font-gravitas)",
            letterSpacing: "-0.11em",
            fontSize: "var(--font-large)",
          }}
          href="/"
        >
          knji
        </Link>

        {/* Copyright and Rights */}
        <div
          className="flex flex-col"
        >
          <span
            className="text-background"
            style={{
              fontFamily: "var(--font-gabarito)",
              fontSize: "var(--font-xsmall)",
            }}
          >
            Kenji Mattos Kinoshita
            <span style={{ position: "relative", top: "2px" }}> ©</span> {new Date().getFullYear()}
          </span>
          
          <span
            className="text-background"
            style={{
              fontFamily: "var(--font-gabarito)",
              fontSize: "var(--font-xsmall)",
            }}
          >
            
          </span>



          <span
            className="text-background leading-[1.71em]"
            style={{
              fontSize: "var(--font-xsmall)",
            }}
          >
            All rights reserved
          </span>
        </div>

        {/* Social icons */}
        <div
          className="flex items-center"
          style={{ gap: "clamp(16px, 2vw, 23px)" }}
        >
          {/* Github */}
          <a
            href="https://github.com/kenjimattos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background hover:text-primary transition-opacity"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                width: "clamp(18px, 2vw, 22px)",
                height: "clamp(18px, 2vw, 22px)",
              }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/kenjimattos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background hover:text-primary transition-opacity"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{
                width: "clamp(18px, 2vw, 22px)",
                height: "clamp(18px, 2vw, 22px)",
              }}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:kenjimattos@gmail.com"
            className="text-background hover:text-primary transition-opacity"
          >
            <Mail
              strokeWidth={1.5}
              style={{
                width: "clamp(20px, 2.2vw, 24px)",
                height: "clamp(20px, 2.2vw, 24px)",
              }}
            />
          </a>
        </div>
      </div>

      <div className="flex flex-col text-background justify-center items-end"
          style={{
          fontSize: "var(--font-small)",
        }}>
        <a className="hover:text-primary transition-opacity cursor-pointer" onClick={(e) => handleSectionClick(e, "home")}>home</a>
        <a className="hover:text-primary transition-opacity cursor-pointer" onClick={(e) => handleSectionClick(e, "about")}>about</a>
        <a className="hover:text-primary transition-opacity cursor-pointer" onClick={(e) => handleSectionClick(e, "work")}>work</a>
        <a className="hover:text-primary transition-opacity cursor-pointer" onClick={(e) => handleSectionClick(e, "contact")}>contact</a>
      </div>
    </footer>
  );
};
