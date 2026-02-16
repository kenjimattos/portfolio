import type { Metadata } from "next";
import { Gabarito, Gravitas_One } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";

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

export const metadata: Metadata = {
  title: "hi, my name is kenji",
  description: "Portfolio de Kenji",
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
      </body>
    </html>
  );
}
