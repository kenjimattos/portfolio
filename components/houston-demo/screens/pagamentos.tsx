"use client";

// Recreation of the Houston "Pagamentos" screen: status summary chips, a real
// pill-group status filter, check-in/out indicators and a period total footer.

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  cx,
  HButton,
  HCard,
  HTable,
  HTableBody,
  HTableCell,
  HTableHead,
  HTableHeader,
  HTableRow,
  PagamentoStatusBadge,
} from "@/components/houston-demo/ui";
import {
  formatCurrency,
  MES_ATUAL,
  PAGAMENTOS,
  type PagamentoStatus,
} from "@/components/houston-demo/data";

type Filtro = "TODOS" | PagamentoStatus;

const FILTROS: { value: Filtro; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "AUTORIZADO", label: "Autorizado" },
  { value: "PAGO", label: "Pago" },
];

function CheckCell({ hora }: { hora?: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cx("h-2 w-2 shrink-0 rounded-full", hora ? "bg-green-500" : "bg-amber-400")} />
      {hora ?? <span className="text-hst-muted">—</span>}
    </span>
  );
}

export function PagamentosScreen() {
  const [filtro, setFiltro] = useState<Filtro>("TODOS");

  const pendentes = PAGAMENTOS.filter((p) => p.status === "PENDENTE").length;
  const autorizados = PAGAMENTOS.filter((p) => p.status === "AUTORIZADO").length;
  const pagos = PAGAMENTOS.filter((p) => p.status === "PAGO").length;

  const visiveis = filtro === "TODOS" ? PAGAMENTOS : PAGAMENTOS.filter((p) => p.status === filtro);
  const total = visiveis.reduce((soma, p) => soma + p.valor, 0);

  return (
    <HCard>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-normal tracking-tight">Pagamentos</h1>
          <p className="text-hst-muted">Confirmações e autorizações de plantões — {MES_ATUAL}</p>
        </div>

        {/* Resumo por status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-2 text-sm text-yellow-700">
            Pendentes
            <span className="text-lg">{pendentes}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
            Autorizados
            <span className="text-lg">{autorizados}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
            Pagos
            <span className="text-lg">{pagos}</span>
          </div>
        </div>

        {/* Filtro por status (funcional) */}
        <div className="mt-4 flex items-center gap-2">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFiltro(f.value)}
              className={cx(
                "h-8 cursor-pointer rounded-full px-4 text-sm transition-colors",
                filtro === f.value
                  ? "bg-hst-primary text-white"
                  : "border border-hst-border bg-white text-hst-muted hover:text-hst-fg"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-md border border-hst-border bg-white">
          <HTable>
            <HTableHeader>
              <HTableRow>
                <HTableHead>Data</HTableHead>
                <HTableHead>Médico</HTableHead>
                <HTableHead>Hospital</HTableHead>
                <HTableHead>Setor</HTableHead>
                <HTableHead>Check-in</HTableHead>
                <HTableHead>Check-out</HTableHead>
                <HTableHead className="text-right">Valor</HTableHead>
                <HTableHead>Status</HTableHead>
                <HTableHead className="text-center">Ações</HTableHead>
              </HTableRow>
            </HTableHeader>
            <HTableBody>
              {visiveis.map((p) => (
                <HTableRow key={p.id}>
                  <HTableCell>
                    <div>{p.data}</div>
                    <div className="text-xs text-hst-muted">
                      {p.horaInicio} — {p.horaFim}
                    </div>
                  </HTableCell>
                  <HTableCell>
                    <div>{p.medico.nome}</div>
                    <div className="text-xs text-hst-muted">{p.medico.crm}</div>
                  </HTableCell>
                  <HTableCell>{p.hospital}</HTableCell>
                  <HTableCell>{p.setor}</HTableCell>
                  <HTableCell>
                    <CheckCell hora={p.checkinHora} />
                  </HTableCell>
                  <HTableCell>
                    <CheckCell hora={p.checkoutHora} />
                  </HTableCell>
                  <HTableCell className="text-right">{formatCurrency(p.valor)}</HTableCell>
                  <HTableCell>
                    <PagamentoStatusBadge status={p.status} />
                  </HTableCell>
                  <HTableCell className="text-center">
                    <HButton variant="ghost" size="icon" className="h-8 w-8" aria-label="Ações do pagamento">
                      <MoreHorizontal className="h-4 w-4" />
                    </HButton>
                  </HTableCell>
                </HTableRow>
              ))}
              {/* Total do período (linhas visíveis) */}
              <HTableRow className="bg-hst-bg/50 hover:bg-hst-bg/50">
                <HTableCell colSpan={6} className="text-right text-hst-muted">
                  Total do período
                </HTableCell>
                <HTableCell className="text-right">{formatCurrency(total)}</HTableCell>
                <HTableCell colSpan={2} />
              </HTableRow>
            </HTableBody>
          </HTable>
        </div>
      </div>
    </HCard>
  );
}
