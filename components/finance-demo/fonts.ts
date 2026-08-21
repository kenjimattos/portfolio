import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

// The three typefaces of the Finance app, loaded only where the recreated
// screens render. Fraunces carries every headline and total, JetBrains Mono
// every number and date, Inter the small metadata.

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const interFin = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-fin",
  display: "swap",
});

export const finFontVars = `${fraunces.variable} ${jetbrainsMono.variable} ${interFin.variable}`;
