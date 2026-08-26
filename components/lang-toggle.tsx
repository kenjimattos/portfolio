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
      className="flex"
      style={{ border: "1px solid var(--ink)" }}
      aria-label="Language"
    >
      {LOCALES.map(({ locale, label }) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={localeHref(locale, base)}
            aria-current={isActive ? "true" : undefined}
            className="meta"
            style={{
              padding: "5px 9px",
              background: isActive ? "var(--ink)" : "transparent",
              color: isActive ? "var(--paper)" : "inherit",
              transition: "background var(--t-state), color var(--t-state)",
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
