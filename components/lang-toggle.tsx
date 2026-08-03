"use client";

// EN | PT switch shown in every header so visitors can change language the
// moment they land. Links to the same page in the other locale.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { basePathname, localeHref, useLocale, type Locale } from "@/lib/i18n";

const LOCALES: { locale: Locale; label: string }[] = [
  { locale: "en", label: "EN" },
  { locale: "pt", label: "PT" },
];

export function LangToggle() {
  const active = useLocale();
  const pathname = usePathname();
  const base = basePathname(pathname);

  return (
    <div
      className="flex items-center rounded-full border"
      style={{
        borderColor: "rgba(22, 22, 22, 0.15)",
        padding: "3px",
        backgroundColor: "rgba(255, 255, 249, 0.6)",
      }}
      aria-label="Language"
    >
      {LOCALES.map(({ locale, label }) => (
        <Link
          key={locale}
          href={localeHref(locale, base)}
          aria-current={locale === active ? "true" : undefined}
          className="rounded-full font-mono transition-colors duration-300"
          style={{
            fontSize: "clamp(10px, 0.9vw, 12px)",
            letterSpacing: "0.08em",
            padding: "4px 10px",
            color:
              locale === active
                ? "var(--color-background)"
                : "var(--color-foreground)",
            backgroundColor:
              locale === active ? "var(--color-foreground)" : "transparent",
            opacity: locale === active ? 1 : 0.6,
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
