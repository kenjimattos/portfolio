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

// A Intel One Mono não está na base de métricas do next/font, então ele não
// consegue gerar a fonte de fallback ajustada e avisa no build. A pilha abaixo
// é escolhida pelo AVANÇO, não pelo x-height: numa recriação de interface
// monoespaçada a largura do caractere é a largura das colunas, e uma substituta
// mais estreita desalinha tabela e painel. A Intel avança 0.614em; a SF Mono
// (que é o que `ui-monospace` resolve no Mac) avança 0.618, e a Menlo 0.602.
// Casar o x-height em vez da largura pediria size-adjust de 0.875 e quebraria
// exatamente o que importa aqui.
export const intelOneMono = Intel_One_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-intel",
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "SF Mono",
    "Menlo",
    "Cascadia Mono",
    "DejaVu Sans Mono",
    "Liberation Mono",
    "Consolas",
    "monospace",
  ],
  adjustFontFallback: false,
});

export const oppFontVars = `${monoblock.variable} ${epicPro.variable} ${intelOneMono.variable}`;
