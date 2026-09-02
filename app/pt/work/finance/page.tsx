import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { FinanceContent } from "@/app/work/finance/finance-content";

const title = "Finance · Fluxo de Caixa por Janela de Fatura";
const description =
  "Estudo de caso: um gestor de gastos self-hosted em que a compra de cartão entra no fluxo de caixa no dia em que a fatura é paga. Identidade local da transação, saldo ancorado em vez de lido, conciliação contra o boleto do emissor e 132 testes sobre regra de negócio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pt/work/finance",
    languages: { en: "/work/finance", "pt-BR": "/pt/work/finance" },
  },
  openGraph: {
    type: "article",
    url: "/pt/work/finance",
    title: `${title} | Kenji Mattos`,
    description,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Kenji Mattos`,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Finance",
  headline: title,
  description,
  url: `${siteConfig.url}/pt/work/finance`,
  inLanguage: "pt-BR",
  author: {
    "@type": "Person",
    name: siteConfig.brand.ownerName,
    url: siteConfig.url,
  },
};

export default function FinancePagePt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FinanceContent />
    </>
  );
}
