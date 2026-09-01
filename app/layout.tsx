import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import { siteConfig } from "@/config/site";

// Both faces are loaded as variable fonts with their width axis exposed. The
// masthead animation opens the wordmark from wdth 62 to 112 against a fixed
// textLength, so wdth has to be a live axis at runtime, not a baked instance.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian",
  subsets: ["latin"],
  axes: ["wdth"],
});

const defaultTitle =
  "Kenji Mattos · Software Engineer | React, Next.js, PostgreSQL";
const defaultDescription =
  "Software Engineer building production-grade platforms end to end, from design to code in production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: "%s | Kenji Mattos",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
    languages: { en: "/", "pt-BR": "/pt" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Kenji Mattos",
    title: defaultTitle,
    description: defaultDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${archivo.variable} ${martianMono.variable} antialiased`}
      >
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
