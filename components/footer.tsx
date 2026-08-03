"use client";

import { siteConfig } from "@/config/site";
import { useLocale } from "@/lib/i18n";

const FOOTER_COPY = {
  en: { rights: "All rights reserved", builtWith: "Built with" },
  pt: { rights: "Todos os direitos reservados", builtWith: "Feito com" },
} as const;

export const Footer = () => {
  const t = FOOTER_COPY[useLocale()];

  return (
    <footer className="w-full bg-foreground relative overflow-hidden">
      {/* Decorative gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-accent-purple), var(--color-accent-cyan), transparent)",
        }}
      />

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
                opacity: 0.55,
              }}
            >
              {new Date().getFullYear()} {siteConfig.brand.ownerName}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "var(--color-accent-purple)", opacity: 0.6 }}
            />
            <span
              className="text-background"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                opacity: 0.55,
              }}
            >
              {t.rights}
            </span>
          </div>

          {/* Built with */}
          <div
            className="flex items-center gap-2 text-background"
            style={{
              fontSize: "clamp(11px, 1vw, 13px)",
              opacity: 0.6,
            }}
          >
            <span>{t.builtWith}</span>
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
