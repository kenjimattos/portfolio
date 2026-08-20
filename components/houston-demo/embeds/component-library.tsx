"use client";

// Design-section exhibit: the shadcn/ui + Radix base layer as it looks once
// retokenized into Houston's design language, next to the domain layer that
// no component library ships — the part that had to be designed and written.

import { ReactNode } from "react";
import { Check, ChevronDown, Calendar, Grid3x3, Palette, ShieldCheck, Table2 } from "lucide-react";
import { geologica } from "@/components/houston-demo/geologica";
import {
  cx,
  HBadge,
  HButton,
  HCheckbox,
  HProgress,
  HSelectLike,
} from "@/components/houston-demo/ui";
import { useLocale } from "@/lib/i18n";

const COPY = {
  en: {
    baseLabel: "Base layer",
    baseTitle: "shadcn/ui + Radix",
    baseText:
      "Accessible primitives, owned as source in the repo and retokenized to Houston: purple primary, Geologica in thin and regular, our radius, our status vocabulary. The library gave us keyboard and ARIA behaviour for free, never the product.",
    specimens: [
      "Button",
      "Badge",
      "Select",
      "Checkbox",
      "Table",
      "Progress",
    ],
    customLabel: "Written from scratch",
    customText:
      "Everything below sits outside any component library. It was designed against the live operation and written by a team of three over two years of production releases.",
    custom: [
      {
        icon: Grid3x3,
        title: "Schedule grid",
        text: "Drag to create, resize, duplicate, conflict detection and batch publishing.",
      },
      {
        icon: Calendar,
        title: "Shift calendar",
        text: "Weekly, monthly and daily views rebuilt after an off-the-shelf calendar outgrew the model.",
      },
      {
        icon: ShieldCheck,
        title: "Permission layer",
        text: "Four roles, 36 permissions, enforced in the UI and revalidated on the backend.",
      },
      {
        icon: Palette,
        title: "Grade color system",
        text: "32 hues that stay stable for a schedule across calendar, shift views and reports.",
      },
      {
        icon: Table2,
        title: "Operational tables",
        text: "Cross-module filtering, bulk actions and payment authorization over thousands of shifts.",
      },
    ],
  },
  pt: {
    baseLabel: "Camada base",
    baseTitle: "shadcn/ui + Radix",
    baseText:
      "Primitivos acessíveis, versionados como código no repositório e retokenizados para o Houston: roxo primário, Geologica em thin e regular, nosso raio, nosso vocabulário de status. A biblioteca entregou teclado e ARIA de graça, nunca o produto.",
    specimens: [
      "Botão",
      "Badge",
      "Select",
      "Checkbox",
      "Tabela",
      "Progresso",
    ],
    customLabel: "Escrito do zero",
    customText:
      "Nada abaixo vem de biblioteca de componente. Tudo foi desenhado contra a operação ao vivo e escrito por um time de três ao longo de dois anos de releases em produção.",
    custom: [
      {
        icon: Grid3x3,
        title: "Grade de escala",
        text: "Criar arrastando, redimensionar, duplicar, detecção de conflito e publicação em lote.",
      },
      {
        icon: Calendar,
        title: "Calendário de plantões",
        text: "Visões semanal, mensal e diária, refeitas quando o calendário pronto não coube no modelo.",
      },
      {
        icon: ShieldCheck,
        title: "Camada de permissões",
        text: "Quatro cargos, 36 permissões, aplicadas na interface e revalidadas no backend.",
      },
      {
        icon: Palette,
        title: "Sistema de cores das grades",
        text: "32 tons que se mantêm estáveis por grade no calendário, nos plantões e nos relatórios.",
      },
      {
        icon: Table2,
        title: "Tabelas operacionais",
        text: "Filtro entre módulos, ações em lote e autorização de pagamento sobre milhares de plantões.",
      },
    ],
  },
} as const;

function SpecimenCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className="font-mono uppercase tracking-widest text-hst-muted"
        style={{ fontSize: "10px" }}
      >
        {label}
      </span>
      <div className="flex items-center gap-2 flex-wrap">{children}</div>
    </div>
  );
}

export function ComponentLibraryExhibit() {
  const t = COPY[useLocale()];

  return (
    <div
      className="grid gap-[10dvw] items-start"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
    >
      {/* -------------------------------- base layer -------------------------------- */}
      <div className="flex flex-col gap-4">
        <div>
          <span
            className="font-mono uppercase tracking-widest block mb-2 text-hst-ink"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
          >
            {t.baseLabel}
          </span>
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.65, maxWidth: "560px" }}
          >
            {t.baseText}
          </p>
        </div>

        <div
          className={cx(
            geologica.variable,
            "hst-app rounded-xl border border-hst-border bg-white p-6 text-hst-fg font-extralight antialiased"
          )}
          style={{ fontFamily: "var(--font-geologica), sans-serif" }}
        >
          <span
            className="font-mono uppercase tracking-widest text-hst-ink block mb-5"
            style={{ fontSize: "10px" }}
          >
            {t.baseTitle}
          </span>

          <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
            <SpecimenCell label={t.specimens[0]}>
              <HButton size="sm">
                <Check /> Autorizar
              </HButton>
              <HButton size="sm" variant="outline">
                Filtrar
              </HButton>
            </SpecimenCell>

            <SpecimenCell label={t.specimens[1]}>
              <HBadge className="bg-hst-primary/10 text-hst-ink">URGENTE</HBadge>
              <HBadge className="bg-emerald-50 text-emerald-700">PAGO</HBadge>
            </SpecimenCell>

            <SpecimenCell label={t.specimens[2]}>
              <HSelectLike className="w-full">
                <span className="truncate">Pronto-Socorro</span>
                <ChevronDown className="h-4 w-4 text-hst-muted" />
              </HSelectLike>
            </SpecimenCell>

            <SpecimenCell label={t.specimens[3]}>
              <HCheckbox checked label="Somente pendentes" />
            </SpecimenCell>

            <SpecimenCell label={t.specimens[4]}>
              <div className="w-full text-xs">
                <div className="flex justify-between border-b border-hst-border pb-1.5 text-hst-muted">
                  <span>Médico</span>
                  <span>Valor</span>
                </div>
                <div className="flex justify-between pt-1.5">
                  <span>Ana Prado</span>
                  <span>R$ 1.840</span>
                </div>
              </div>
            </SpecimenCell>

            <SpecimenCell label={t.specimens[5]}>
              <div className="w-full">
                <HProgress value={72} />
              </div>
            </SpecimenCell>
          </div>
        </div>
      </div>

      {/* ------------------------------- domain layer -------------------------------- */}
      <div className="flex flex-col gap-4">
        <div>
          <span
            className="font-mono uppercase tracking-widest block mb-2 text-hst-ink"
            style={{ fontSize: "clamp(10px, 0.9vw, 12px)" }}
          >
            {t.customLabel}
          </span>
          <p
            className="text-foreground leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", opacity: 0.65, maxWidth: "560px" }}
          >
            {t.customText}
          </p>
        </div>

        <ul className="flex flex-col">
          {t.custom.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex gap-4 py-4 border-t border-foreground/10 first:border-t-0 first:pt-0"
            >
              <Icon className="h-4 w-4 shrink-0 mt-1 text-hst-ink" aria-hidden />
              <div className="flex flex-col gap-1">
                <span
                  className="text-foreground"
                  style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
                >
                  {title}
                </span>
                <span
                  className="text-foreground leading-relaxed"
                  style={{ fontSize: "clamp(12px, 1.1vw, 14px)", opacity: 0.6 }}
                >
                  {text}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
