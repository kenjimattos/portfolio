"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const hideGlobalChrome = pathname.startsWith("/work/");

  return (
    <>
      {!hideGlobalChrome && <Header />}
      {children}
      {!hideGlobalChrome && <Footer />}
    </>
  );
}
