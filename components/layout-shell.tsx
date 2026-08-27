"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocaleProvider, basePathname, localeFromPathname } from "@/lib/i18n";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const hideGlobalChrome = basePathname(pathname).startsWith("/work/");

  return (
    <LocaleProvider locale={locale}>
      <SmoothScrollProvider>
        <a href="#main" className="skip-link">
          {locale === "pt" ? "Pular para o conteúdo" : "Skip to content"}
        </a>
        {!hideGlobalChrome && <Header />}
        <main id="main">{children}</main>
        {!hideGlobalChrome && <Footer />}
      </SmoothScrollProvider>
    </LocaleProvider>
  );
}
