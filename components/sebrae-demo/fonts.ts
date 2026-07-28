import localFont from "next/font/local";
import { Intel_One_Mono } from "next/font/google";

// The three typefaces of the OPP platform. Monoblock and Epic Pro are the
// same self-hosted woff2 files shipped in the product; Intel One Mono comes
// from Google Fonts as in the original.

export const monoblock = localFont({
  src: "./fonts/Monoblock-Bold.woff2",
  weight: "700",
  variable: "--font-monoblock",
  display: "swap",
});

export const epicPro = localFont({
  src: "./fonts/GCEpicPro-ExtraBold.woff2",
  weight: "800",
  variable: "--font-epicpro",
  display: "swap",
});

export const intelOneMono = Intel_One_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-intel",
  display: "swap",
});

export const oppFontVars = `${monoblock.variable} ${epicPro.variable} ${intelOneMono.variable}`;
