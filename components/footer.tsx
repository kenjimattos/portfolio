"use client";

import { siteConfig } from "@/config/site";
import { useLocale } from "@/lib/i18n";

const FOOTER_COPY = {
  en: { built: "Built with Next.js · Deployed on Vercel" },
  pt: { built: "Feito com Next.js · Publicado na Vercel" },
} as const;

export const Footer = () => {
  const t = FOOTER_COPY[useLocale()];

  return (
    <footer
      className="on-ink"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        paddingBlock: "var(--s4)",
        marginTop: "var(--s8)",
      }}
    >
      <div
        className="wrap flex justify-between flex-wrap"
        style={{ gap: "var(--s3)" }}
      >
        <span className="meta dim">
          © {new Date().getFullYear()} {siteConfig.brand.ownerName}
        </span>
        <span className="meta dim">{t.built}</span>
      </div>
    </footer>
  );
};
