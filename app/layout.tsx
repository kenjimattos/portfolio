import type { Metadata } from "next";
import { Gabarito, Gravitas_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import { siteConfig } from "@/config/site";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const gravitasOne = Gravitas_One({
  variable: "--font-gravitas",
  subsets: ["latin"],
  weight: "400",
});

const defaultTitle =
  "Kenji Mattos — Software Engineer | React, Next.js, PostgreSQL";
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
        className={`${gabarito.variable} ${gravitasOne.variable} antialiased`}
      >
        <LayoutShell>{children}</LayoutShell>
        <Analytics />
      </body>
    </html>
  );
}
