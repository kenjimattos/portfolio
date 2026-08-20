"use client";

// Recreation of the Houston "Relatórios / Folha de Pagamento" screen: five KPI
// cards (PayrollSummary) and a per-doctor table with expandable shift details
// (PayrollReport). Row expansion is real; export is display-only.

import { Fragment, useState } from "react";
import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  HButton,
  HCard,
  HTable,
  HTableBody,
  HTableCell,
  HTableHead,
  HTableHeader,
  HTableRow,
} from "@/components/houston-demo/ui";
import {
  FOLHA_MEDICOS,
  FOLHA_RESUMO,
  formatCurrency,
  MES_ATUAL,
  type MedicoFolha,
} from "@/components/houston-demo/data";

function KpiCard({
  titulo,
  icone,
  valor,
  legenda,
}: {
  titulo: string;
  icone: React.ReactNode;
  valor: string;
  legenda: string;
}) {
  return (
    <HCard>
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <div className="text-sm font-normal">{titulo}</div>
        {icone}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-normal">{valor}</div>
        <p className="text-xs text-hst-muted">{legenda}</p>
      </div>
    </HCard>
  );
}

function totalMedico(item: MedicoFolha) {
  return item.plantoes.reduce((soma, p) => soma + p.valor, 0);
}

export function RelatoriosScreen() {
  const [expandidos, setExpandidos] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <HCard>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-normal tracking-tight">Folha de Pagamento</h1>
            <p className="text-hst-muted">
              Dados de {MES_ATUAL}: vagas fechadas com check-in/check-out
            </p>
          </div>
          <HButton variant="outline">
            <Download className="h-4 w-4" />
            Exportar CSV
          </HButton>
        </div>

        {/* PayrollSummary */}
        <div className="grid grid-cols-5 gap-4">
          <KpiCard
            titulo="Total de Médicos"
            icone={<Users className="h-4 w-4 text-hst-muted" />}
            valor={String(FOLHA_RESUMO.totalMedicos)}
            legenda="médicos com plantões realizados"
          />
          <KpiCard
            titulo="Total de Plantões"
            icone={<Briefcase className="h-4 w-4 text-hst-muted" />}
            valor={String(FOLHA_RESUMO.totalPlantoes)}
            legenda="no período"
          />
          <KpiCard
            titulo="Valor Total"
            icone={<DollarSign className="h-4 w-4 text-hst-muted" />}
            valor={FOLHA_RESUMO.valorTotal}
            legenda="valor total da folha de pagamento"
          />
          <KpiCard
            titulo="Valor Médio/Hora"
            icone={<Clock className="h-4 w-4 text-hst-muted" />}
            valor={FOLHA_RESUMO.valorMedioHora}
            legenda="por hora trabalhada"
          />
          <KpiCard
            titulo="Média Plantão 12h"
            icone={<TrendingUp className="h-4 w-4 text-hst-muted" />}
            valor={FOLHA_RESUMO.mediaPlantao12h}
            legenda="7,8 plantões/médico"
          />
        </div>

        {/* PayrollReport */}
        <HCard>
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center gap-2 text-2xl font-normal leading-none tracking-tight">
              <FileText className="h-5 w-5" />
              Relatório de Folha de Pagamento
            </div>
            <p className="text-sm text-hst-muted">
              Dados de julho de 2025: vagas fechadas com check-in/check-out
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="rounded-md border border-hst-border bg-white">
              <HTable>
                <HTableHeader>
                  <HTableRow>
                    <HTableHead className="w-10" />
                    <HTableHead>Médico</HTableHead>
                    <HTableHead>CPF</HTableHead>
                    <HTableHead>CRM</HTableHead>
                    <HTableHead>Especialidade</HTableHead>
                    <HTableHead className="text-center">Plantões</HTableHead>
                    <HTableHead className="text-right">Valor Total</HTableHead>
                  </HTableRow>
                </HTableHeader>
                <HTableBody>
                  {FOLHA_MEDICOS.map((item) => (
                    <Fragment key={item.medico.id}>
                      <HTableRow className="cursor-pointer" onClick={() => toggle(item.medico.id)}>
                        <HTableCell>
                          <HButton
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={
                              expandidos[item.medico.id]
                                ? "Recolher plantões"
                                : "Expandir plantões"
                            }
                          >
                            {expandidos[item.medico.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </HButton>
                        </HTableCell>
                        <HTableCell>
                          <div className="flex items-center gap-2">
                            {item.medico.nome}
                            {item.cadastrado && (
                              <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-1.5 py-0 text-[10px] font-normal text-green-700">
                                cadastrado
                              </span>
                            )}
                          </div>
                        </HTableCell>
                        <HTableCell>{item.medico.cpf}</HTableCell>
                        <HTableCell>{item.medico.crm}</HTableCell>
                        <HTableCell>{item.medico.especialidade}</HTableCell>
                        <HTableCell className="text-center">{item.plantoes.length}</HTableCell>
                        <HTableCell className="text-right">
                          {formatCurrency(totalMedico(item))}
                        </HTableCell>
                      </HTableRow>

                      {expandidos[item.medico.id] && (
                        <HTableRow className="bg-hst-bg/60 hover:bg-hst-bg/60">
                          <HTableCell colSpan={7} className="p-0">
                            <div className="px-4 py-3">
                              <h4 className="mb-2 text-sm font-normal">Plantões realizados:</h4>
                              <HTable>
                                <HTableHeader>
                                  <HTableRow>
                                    <HTableHead>Data do Plantão</HTableHead>
                                    <HTableHead>Hospital</HTableHead>
                                    <HTableHead>Setor</HTableHead>
                                    <HTableHead>Horário</HTableHead>
                                    <HTableHead className="text-right">Valor</HTableHead>
                                  </HTableRow>
                                </HTableHeader>
                                <HTableBody>
                                  {item.plantoes.map((plantao, i) => (
                                    <HTableRow key={i}>
                                      <HTableCell>{plantao.data}</HTableCell>
                                      <HTableCell>{plantao.hospital}</HTableCell>
                                      <HTableCell>{plantao.setor}</HTableCell>
                                      <HTableCell>{plantao.horario}</HTableCell>
                                      <HTableCell className="text-right">
                                        {formatCurrency(plantao.valor)}
                                      </HTableCell>
                                    </HTableRow>
                                  ))}
                                </HTableBody>
                              </HTable>
                            </div>
                          </HTableCell>
                        </HTableRow>
                      )}
                    </Fragment>
                  ))}
                </HTableBody>
              </HTable>
            </div>
          </div>
        </HCard>
      </div>
    </HCard>
  );
}
