"use client";

import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

interface NavProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

export const Nav = ({
  prevHref = "/",
  prevLabel = "home",
  nextHref,
  nextLabel = "next",
}: NavProps) => {
  return (
    <section
      className="w-full flex justify-between"
      style={{
        padding: "clamp(10px, 2vw, 60px)",
      }}
    >
      <a
        className="flex items-center hover:text-primary transition-colors"
        href={prevHref}
        style={{
          fontSize: "clamp(14px, 5vw, 30px)",
        }}
      >
        <ChevronLeft size={36} />
        {prevLabel}
      </a>

      <a
        className="flex items-center hover:text-primary transition-colors"
        href="#top"
        style={{
          fontSize: "clamp(14px, 5vw, 30px)",
        }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        top
        <ChevronUp size={36} />
      </a>

      {nextHref && (
        <a
          className="flex items-center hover:text-primary transition-colors"
          href={nextHref}
          style={{
            fontSize: "clamp(14px, 5vw, 30px)",
          }}
        >
          <ChevronRight size={36} />
          {nextLabel}
        </a>
      )}
    </section>
  );
};
