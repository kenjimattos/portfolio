"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LocaleProvider, basePathname, localeFromPathname } from "@/lib/i18n";

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const hideGlobalChrome = basePathname(pathname).startsWith("/work/");

  return (
    <LocaleProvider locale={locale}>
      {!hideGlobalChrome && <Header />}
      <main>{children}</main>
      {!hideGlobalChrome && <Footer />}
    </LocaleProvider>
  );
}
