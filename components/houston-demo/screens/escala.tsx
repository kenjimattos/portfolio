"use client";

// Recreation of the Houston "Escala" screen — the custom month calendar
// (app/(dashboard)/escala/page.tsx + components/escala/custom-month-calendar.tsx
// + simple-calendar-toolbar.tsx + escala-filters.tsx), rebuilt on the
// portfolio's Tailwind v4 tokens with fully deterministic data.

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  Plus,
  Trash2,
} from "lucide-react";
import { cx, HCard, HButton, HSelectLike } from "@/components/houston-demo/ui";
import {
  CAL_MESES,
  CAL_MES_INICIAL,
  HOJE,
  GRADES,
  type CalEvento,
  type CalMes,
} from "@/components/houston-demo/data";

const DIAS_SEMANA = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const MAX_EVENTOS_VISIVEIS = 3;

// Pill styles per vaga status (mirrors the original month calendar chips).
const STATUS_PILL: Record<CalEvento["status"], string> = {
  fechada: "bg-blue-50 text-gray-800 hover:bg-blue-100",
  aberta: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  urgente: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
  anunciada: "bg-blue-50 text-blue-700 hover:bg-blue-100",
};

type DiaCelula = {
  numero: number;
  doMes: boolean;
  eventos: CalEvento[];
  hoje: boolean;
};

// Builds the Sun→Sat month grid, padding with the neighbouring months' days.
// new Date(...) is only ever called with fixed arguments — deterministic.
function montarGrade(mes: CalMes): DiaCelula[] {
  const primeiroDow = new Date(mes.ano, mes.mesIndex, 1).getDay();
  const diasMesAnterior = new Date(mes.ano, mes.mesIndex, 0).getDate();
  const totalCelulas = Math.ceil((primeiroDow + mes.diasNoMes) / 7) * 7;

  const celulas: DiaCelula[] = [];
  for (let i = 0; i < totalCelulas; i++) {
    const dia = i - primeiroDow + 1;
    if (dia < 1) {
      celulas.push({ numero: diasMesAnterior + dia, doMes: false, eventos: [], hoje: false });
    } else if (dia > mes.diasNoMes) {
      celulas.push({ numero: dia - mes.diasNoMes, doMes: false, eventos: [], hoje: false });
    } else {
      celulas.push({
        numero: dia,
        doMes: true,
        eventos: mes.eventos[dia] ?? [],
        hoje: mes.ano === HOJE.ano && mes.mesIndex === HOJE.mesIndex && dia === HOJE.dia,
      });
    }
  }
  return celulas;
}

function EventoPill({ evento }: { evento: CalEvento }) {
  const grade = GRADES[evento.gradeIdx];
  return (
    <div
      className={cx(
        "flex items-center gap-1 rounded px-1 py-0.5 text-xs font-extralight truncate cursor-pointer transition-all hover:shadow-sm",
        STATUS_PILL[evento.status]
      )}
      style={{ lineHeight: "1.2" }}
      title={`${evento.titulo} · ${grade.nome} · ${evento.horario}`}
    >
      {/* Marcador de cor da grade */}
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: grade.cor }}
      />
      <span className="flex-1 truncate">{evento.titulo}</span>
      {/* Badge de candidatos pendentes */}
      {evento.pendentes != null && evento.pendentes > 0 && (
        <span className="shrink-0 rounded-full border border-yellow-200 bg-yellow-100 px-1 text-[10px] text-yellow-800">
          {evento.pendentes}
        </span>
      )}
    </div>
  );
}

export function EscalaScreen() {
  const [mesIdx, setMesIdx] = useState(CAL_MES_INICIAL);
  const mes = CAL_MESES[mesIdx];
  const celulas = montarGrade(mes);

  return (
    <HCard className="p-6">
      {/* Cabeçalho da página */}
      <div className="mb-6">
        <h1 className="text-3xl font-normal tracking-tight">Escala</h1>
        <p className="mt-1 text-sm text-hst-muted">
          Calendário de plantões por grade, médico e status.
        </p>
      </div>

      {/* Toolbar do calendário */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HButton
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Mês anterior"
            disabled={mesIdx === 0}
            onClick={() => setMesIdx((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft />
          </HButton>
          <HButton
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Próximo mês"
            disabled={mesIdx === CAL_MESES.length - 1}
            onClick={() => setMesIdx((i) => Math.min(CAL_MESES.length - 1, i + 1))}
          >
            <ChevronRight />
          </HButton>
          <HButton
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={() => setMesIdx(CAL_MES_INICIAL)}
          >
            <CalendarIcon />
            Hoje
          </HButton>
          <h2 className="ml-2 text-xl font-normal text-hst-fg">{mes.label}</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle de visualização (Mensal ativo; demais inertes) */}
          <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
            <button className="h-7 cursor-default rounded-md bg-hst-primary px-3 text-xs font-normal text-white">
              Mensal
            </button>
            <button className="h-7 cursor-default rounded-md px-3 text-xs font-normal text-hst-muted hover:bg-white/60">
              Semanal
            </button>
            <button className="h-7 cursor-default rounded-md px-3 text-xs font-normal text-hst-muted hover:bg-white/60">
              Diária
            </button>
          </div>
          <HButton variant="outline" size="sm" className="h-8 px-3 text-xs">
            <Download />
            Exportar PDF
          </HButton>
        </div>
      </div>

      {/* Seção de filtros */}
      <div className="mb-6 border-t border-hst-border pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-normal text-hst-muted">Filtros</h3>
          <HButton variant="ghost" size="sm" className="h-8 px-2 text-xs">
            Ocultar
            <ChevronUp />
          </HButton>
        </div>

        {/* Primeira linha de filtros */}
        <div className="mb-4 flex items-center gap-4">
          <HSelectLike className="w-full text-hst-muted">Todos os hospitais</HSelectLike>
          <HSelectLike className="w-full text-hst-muted">Especialidades</HSelectLike>
          <HSelectLike className="w-full text-hst-muted">Setores</HSelectLike>
        </div>

        {/* Segunda linha de filtros */}
        <div className="flex items-center gap-4">
          <HSelectLike className="w-1/4 text-hst-muted">Períodos</HSelectLike>
          <HSelectLike className="w-1/4 text-hst-muted">Grades</HSelectLike>
          <HSelectLike className="w-1/4 text-hst-muted">Status</HSelectLike>
          <div className="flex gap-4">
            <HButton variant="outline" size="sm" className="text-sm">
              <Trash2 />
              Limpar filtros
            </HButton>
            <HButton size="sm" className="text-sm">
              <Plus />
              Nova Vaga
            </HButton>
          </div>
        </div>
      </div>

      {/* Calendário mensal */}
      <div className="overflow-hidden rounded-lg border border-hst-border bg-white">
        {/* Header dos dias da semana */}
        <div className="grid grid-cols-7 border-b border-hst-border bg-gray-50">
          {DIAS_SEMANA.map((dia, i) => (
            <div
              key={dia}
              className={cx(
                "p-3 text-center text-xs font-normal text-hst-muted",
                i < 6 && "border-r border-hst-border"
              )}
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Grade dos dias */}
        <div className="grid grid-cols-7">
          {celulas.map((celula, i) => {
            const ultimaColuna = i % 7 === 6;
            const ultimaLinha = i >= celulas.length - 7;
            const visiveis = celula.eventos.slice(0, MAX_EVENTOS_VISIVEIS);
            const restantes = celula.eventos.length - visiveis.length;

            return (
              <div
                key={i}
                className={cx(
                  "flex min-h-27.5 flex-col border-hst-border",
                  !ultimaColuna && "border-r",
                  !ultimaLinha && "border-b",
                  celula.doMes ? "bg-white" : "bg-gray-50 text-gray-400"
                )}
              >
                {/* Número do dia */}
                <div className="flex justify-end p-2">
                  <span
                    className={cx(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-normal transition-colors",
                      celula.hoje
                        ? "bg-hst-primary text-white"
                        : celula.doMes
                          ? "text-hst-fg hover:bg-hst-primary/20 hover:text-hst-primary"
                          : "text-gray-400"
                    )}
                  >
                    {celula.numero}
                  </span>
                </div>

                {/* Eventos do dia */}
                {celula.eventos.length > 0 && (
                  <div className="flex flex-col gap-1 px-2 pb-2">
                    {visiveis.map((evento, j) => (
                      <EventoPill key={j} evento={evento} />
                    ))}
                    {restantes > 0 && (
                      <span className="px-1 text-[10px] text-hst-muted">
                        +{restantes} mais
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda das grades */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {GRADES.map((grade) => (
          <span key={grade.nome} className="flex items-center gap-1.5 text-xs text-hst-muted">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: grade.cor }} />
            {grade.nome}
          </span>
        ))}
      </div>
    </HCard>
  );
}
