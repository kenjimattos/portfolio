"use client";

// Locale plumbing for the EN (default, at /) and PT-BR (mirrored at /pt/*)
// versions of the site. The locale is derived from the pathname by
// LayoutShell and exposed via context; components keep their copy in small
// local dictionaries indexed by this locale.

import { ReactNode, createContext, useContext, useEffect } from "react";

export type Locale = "en" | "pt";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

/** Strip the /pt prefix, returning the locale-less path ("/" at minimum). */
export function basePathname(pathname: string): string {
  if (pathname === "/pt") return "/";
  if (pathname.startsWith("/pt/")) return pathname.slice(3);
  return pathname;
}

/** Prefix an internal href ("/", "/work/houston", "/#work") for a locale. */
export function localeHref(locale: Locale, href: string): string {
  if (locale === "en") return href;
  if (href === "/") return "/pt";
  if (href.startsWith("/#")) return `/pt${href.slice(1)}`;
  return `/pt${href}`;
}

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
