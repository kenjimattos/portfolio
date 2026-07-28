// Static recreation of the OPP "Formulador de Projetos" screen at the
// "4/10 etapas · Público-alvo" state. Faithful to the original layout:
// progress panel on top, 3 columns below (project steps / form card /
// AI assistant). Purely decorative — no state, no handlers.

import { ArrowLeft, ArrowRight, Check, Circle, CircleDot, Sparkles } from "lucide-react";
import { FORMULATOR_STEPS } from "@/components/sebrae-demo/data";
import { cx, FONT, OppButton, OppProgressBar } from "@/components/sebrae-demo/ui";

/* ------------------------------ step indicator ------------------------------ */

const STEP_STATUS_LABEL = {
  checked: "Concluído",
  current: "Em andamento",
  unchecked: "A seguir",
} as const;

function StepIndicator({
  label,
  state,
}: {
  label: string;
  state: "checked" | "current" | "unchecked";
}) {
  const Icon = state === "checked" ? Check : state === "current" ? CircleDot : Circle;
  const active = state !== "unchecked";
  return (
    <div className="flex items-center gap-3">
      <Icon
        size={20}
        className={cx("shrink-0", active ? "text-opp-accent" : "text-opp-inactive")}
      />
      <div className="flex flex-col">
        <span
          className={active ? "text-white" : "text-opp-inactive"}
          style={{ ...FONT.body, fontSize: 13, fontWeight: 700 }}
        >
          {label}
        </span>
        <span
          className={active ? "text-white/50" : "text-opp-inactive/80"}
          style={{ ...FONT.body, fontSize: 11 }}
        >
          {STEP_STATUS_LABEL[state]}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------- form field -------------------------------- */

function StaticField({
  label,
  lines,
  value,
  grow,
}: {
  label: string;
  lines?: string[];
  value?: string;
  /** stretch the field box to absorb available vertical space */
  grow?: boolean;
}) {
  return (
    <div className={cx("flex flex-col gap-1.5", grow && "flex-1")}>
      <span className="text-white" style={{ ...FONT.body, fontSize: 12, fontWeight: 700 }}>
        {label}
      </span>
      <div
        className={cx(
          "w-full border border-opp-surface2 bg-opp-bg px-3 py-2.5 text-white/85",
          grow && "flex-1"
        )}
        style={{ ...FONT.body, fontSize: 13, lineHeight: 1.6 }}
      >
        {lines ? lines.map((l) => <p key={l}>{l}</p>) : value}
      </div>
    </div>
  );
}

/* ---------------------------------- screen ---------------------------------- */

export function FormuladorScreen() {
  return (
    <div className="flex flex-col gap-4 p-10">
      {/* progress panel */}
      <div className="opp-glass rounded-xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-white" style={{ ...FONT.body, fontSize: 14, fontWeight: 700 }}>
            37% concluído
          </span>
          <span className="text-white/80" style={{ ...FONT.body, fontSize: 13 }}>
            4/10 etapas • Etapa atual: Público-alvo
          </span>
        </div>
        <OppProgressBar value={37} />
      </div>

      {/* 3-column layout — columns stretch to the steps sidebar's height */}
      <div className="flex items-stretch gap-4">
        {/* left sidebar — project steps */}
        <div className="opp-glass w-[260px] shrink-0 rounded-xl p-4">
          <p className="mb-4 text-white" style={{ ...FONT.display, fontSize: 14 }}>
            Etapas do projeto
          </p>
          <div className="flex flex-col gap-3.5">
            {FORMULATOR_STEPS.map((step) => (
              <StepIndicator key={step.label} label={step.label} state={step.state} />
            ))}
          </div>
        </div>

        {/* center — form card */}
        <div className="opp-glass flex min-w-0 flex-1 flex-col gap-6 rounded-xl p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-white" style={{ ...FONT.display, fontSize: 18 }}>
              Público-alvo
            </h2>
            <p className="text-white/70" style={{ ...FONT.body, fontSize: 13 }}>
              Defina quem será beneficiado pelo projeto
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-5">
            <StaticField
              grow
              label="Público-alvo Principal"
              lines={[
                "Microempreendedores individuais do setor de serviços de João",
                "Pessoa, com priorização de negócios liderados por mulheres e",
                "jovens em bairros de menor renda per capita.",
              ]}
            />
            <StaticField
              grow
              label="Público Secundário"
              lines={[
                "Famílias dos empreendedores atendidos, associações comerciais",
                "de bairro e agentes de crédito locais que atuam como",
                "multiplicadores das ações do projeto.",
              ]}
            />
            <StaticField
              label="Estimativa de beneficiários"
              value="200 MEIs impactados diretamente e 50 jovens capacitados"
            />
          </div>

          <div className="mt-auto flex items-center justify-between">
            <OppButton variant="ghost" className="text-sm">
              <ArrowLeft size={16} />
              Anterior
            </OppButton>
            <span className="text-white/70" style={{ ...FONT.body, fontSize: 12 }}>
              4/10 etapas
            </span>
            <OppButton variant="primary" className="text-sm">
              Próxima
              <ArrowRight size={16} />
            </OppButton>
          </div>
        </div>

        {/* right sidebar — AI assistant */}
        <div className="flex w-60 shrink-0 flex-col rounded-xl bg-opp-surface2 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-opp-accent" />
            <p className="text-white" style={{ ...FONT.display, fontSize: 14 }}>
              Assistente IA
            </p>
          </div>
          <p className="text-white/80" style={{ ...FONT.body, fontSize: 12, lineHeight: 1.6 }}>
            Um público-alvo bem delimitado facilita a aprovação. Descreva quem
            será beneficiado, onde está e quantos serão alcançados.
          </p>

          <div className="my-4 h-px w-full bg-white/10" />

          <p className="mb-2 text-white" style={{ ...FONT.body, fontSize: 12, fontWeight: 700 }}>
            Exemplo
          </p>
          <p className="text-white/60" style={{ ...FONT.body, fontSize: 12, lineHeight: 1.6 }}>
            &ldquo;150 microempresas do setor de confecções de Campina Grande,
            com foco em negócios com até 5 funcionários&rdquo;
          </p>

          <div className="mt-auto pt-4">
            <div className="mb-4 h-px w-full bg-white/10" />
            <p className="mb-3 text-white" style={{ ...FONT.body, fontSize: 12, fontWeight: 700 }}>
              Ações da IA
            </p>
            <div className="flex flex-col gap-2">
              <OppButton variant="secondary" className="w-full text-xs">
                Sugerir público-alvo
              </OppButton>
              <OppButton variant="secondary" className="w-full text-xs">
                Revisar texto
              </OppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
