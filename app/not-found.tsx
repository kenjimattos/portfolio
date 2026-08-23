import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "100dvh",
        padding: "clamp(80px, 12vw, 140px) clamp(40px, 8vw, 180px)",
        gap: "clamp(20px, 3vw, 32px)",
      }}
    >
      <p
        aria-hidden="true"
        className="leading-none"
        style={{
          fontFamily: "var(--font-gravitas)",
          fontSize: "clamp(96px, 22vw, 240px)",
          color: "transparent",
          WebkitTextStroke: "2px color-mix(in srgb, var(--foreground) 35%, transparent)",
        }}
      >
        404
        <span
          style={{
            color: "var(--primary)",
            WebkitTextStroke: "0px",
          }}
        >
          .
        </span>
      </p>

      <div className="flex flex-col gap-2">
        <p
          className="text-foreground font-medium"
          style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
        >
          This page doesn&apos;t exist or was moved.
        </p>
        <p
          className="text-foreground"
          style={{ fontSize: "clamp(15px, 1.5vw, 18px)", opacity: 0.6 }}
        >
          Essa página não existe ou foi movida.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
        <Link
          href="/"
          className="px-8 py-4 rounded-sm font-medium bg-primary text-background transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
        >
          Back to home
        </Link>
        <Link
          href="/pt"
          className="text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4"
          style={{ fontSize: "clamp(14px, 1.3vw, 16px)", opacity: 0.7 }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
