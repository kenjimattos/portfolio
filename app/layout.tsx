import type { Metadata } from "next";
import { Gabarito, Gravitas_One } from "next/font/google";
import "./globals.css";

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
  title: "knji | Developer & Designer",
  description: "Portfolio de Kenji - Developer, Designer, Everything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.variable} ${gravitasOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
