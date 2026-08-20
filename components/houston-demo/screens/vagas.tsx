"use client";

// Recreation of the Houston "Vagas" screen: filters row, bulk-selection bar,
// sortable table (Data / Valor) and centered pagination. Selection and sorting
// are real; every other control is display-only.

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  cx,
  HButton,
  HCard,
  HCheckbox,
  HSelectLike,
  HTable,
  HTableBody,
  HTableCell,
  HTableHead,
  HTableHeader,
  HTableRow,
  VagaStatusBadge,
} from "@/components/houston-demo/ui";
import { formatCurrency, MES_ATUAL, VAGAS, type Vaga } from "@/components/houston-demo/data";

type SortKey = "data" | "valor";
type SortDir = "asc" | "desc";

function dataKey(v: Vaga) {
  // "dd/MM/yyyy" -> "yyyyMMdd" + hora, so string comparison sorts chronologically
  return v.data.split("/").reverse().join("") + v.horaInicio;
}

function SortableHead({
  label,
  col,
  sort,
  onSort,
  align = "left",
}: {
  label: string;
  col: SortKey;
  sort: { key: SortKey; dir: SortDir };
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
}) {
  const active = sort.key === col;
  const Icon = active ? (sort.dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <HTableHead className="p-0">
      <button
        type="button"
        onClick={() => onSort(col)}
        className={cx(
          "flex h-12 w-full cursor-pointer items-center gap-2 px-4 text-sm font-normal transition-colors hover:text-hst-fg",
          align === "right" && "justify-end",
          active ? "text-hst-fg" : "text-hst-muted"
        )}
      >
        {label}
        <Icon className={cx("h-4 w-4", !active && "opacity-50")} />
      </button>
    </HTableHead>
  );
}

export function VagasScreen() {
  const [selected, setSelected] = useState<number[]>([]);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "data", dir: "asc" });

  const toggleSort = (key: SortKey) =>
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));

  const toggleVaga = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  const allSelected = selected.length === VAGAS.length && VAGAS.length > 0;
  const toggleAll = () => setSelected(allSelected ? [] : VAGAS.map((v) => v.id));

  const sorted = [...VAGAS].sort((a, b) => {
    const cmp = sort.key === "data" ? dataKey(a).localeCompare(dataKey(b)) : a.valor - b.valor;
    return sort.dir === "asc" ? cmp : -cmp;
  });

  return (
    <HCard>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-normal tracking-tight">Vagas</h1>
          <p className="text-hst-muted">Gerencie os plantões publicados em {MES_ATUAL}</p>
        </div>

        {/* Filtros (display-only) */}
        <div className="flex items-center gap-2">
          <HSelectLike className="flex-1 text-hst-muted">Hospitais</HSelectLike>
          <HSelectLike className="flex-1 text-hst-muted">Setores</HSelectLike>
          <HSelectLike className="flex-1 text-hst-muted">Especialidades</HSelectLike>
          <HSelectLike className="flex-1 text-hst-muted">Períodos</HSelectLike>
          <HSelectLike className="flex-1 text-hst-muted">Status</HSelectLike>
          <div className="flex h-10 shrink-0 items-center gap-2 rounded-md border border-hst-border bg-white px-3 text-sm text-hst-muted">
            <Calendar className="h-4 w-4" />
            Intervalo de datas
          </div>
          <HButton className="shrink-0">
            <Plus className="h-4 w-4" />
            Criar vaga
          </HButton>
        </div>

        {/* Barra de ações em lote */}
        {selected.length > 0 && (
          <div className="mt-6 flex items-center justify-between rounded-md bg-hst-primary/10 px-4 py-2">
            <span className="text-sm text-hst-fg">
              {selected.length} selecionada{selected.length > 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <HButton variant="outline" size="sm">Fechar vagas</HButton>
              <HButton variant="outline" size="sm">Cancelar</HButton>
              <HButton variant="outline" size="sm">Anunciar</HButton>
            </div>
          </div>
        )}

        <div className={cx("rounded-md border border-hst-border bg-white", selected.length > 0 ? "mt-4" : "mt-10")}>
          <HTable>
            <HTableHeader>
              <HTableRow>
                <HTableHead className="w-12">
                  <HCheckbox checked={allSelected} onChange={toggleAll} label="Selecionar todas as vagas" />
                </HTableHead>
                <SortableHead label="Data" col="data" sort={sort} onSort={toggleSort} />
                <HTableHead>Hospital</HTableHead>
                <HTableHead>Setor</HTableHead>
                <HTableHead>Especialidade</HTableHead>
                <HTableHead>Período</HTableHead>
                <SortableHead label="Valor" col="valor" sort={sort} onSort={toggleSort} align="right" />
                <HTableHead className="text-center">Status</HTableHead>
                <HTableHead className="text-center">Candidatos</HTableHead>
                <HTableHead className="text-center">Ações</HTableHead>
              </HTableRow>
            </HTableHeader>
            <HTableBody>
              {sorted.map((vaga) => (
                <HTableRow key={vaga.id} className={selected.includes(vaga.id) ? "bg-hst-primary/5" : undefined}>
                  <HTableCell>
                    <HCheckbox
                      checked={selected.includes(vaga.id)}
                      onChange={() => toggleVaga(vaga.id)}
                      label={`Selecionar vaga ${vaga.id}`}
                    />
                  </HTableCell>
                  <HTableCell>
                    <div>{vaga.data}</div>
                    <div className="text-xs text-hst-muted">
                      {vaga.horaInicio} às {vaga.horaFim}
                    </div>
                  </HTableCell>
                  <HTableCell>{vaga.hospital}</HTableCell>
                  <HTableCell>{vaga.setor}</HTableCell>
                  <HTableCell>{vaga.especialidade}</HTableCell>
                  <HTableCell>{vaga.periodo}</HTableCell>
                  <HTableCell className="text-right">{formatCurrency(vaga.valor)}</HTableCell>
                  <HTableCell className="text-center">
                    <VagaStatusBadge status={vaga.status} />
                  </HTableCell>
                  <HTableCell className="text-center">
                    {vaga.candidatos > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-hst-primary/10 px-2 py-0.5 text-xs text-hst-primary">
                        {vaga.candidatos}
                      </span>
                    ) : (
                      <span className="text-hst-muted">0</span>
                    )}
                  </HTableCell>
                  <HTableCell className="text-center">
                    <HButton variant="ghost" size="icon" className="h-8 w-8" aria-label="Ações da vaga">
                      <MoreHorizontal className="h-4 w-4" />
                    </HButton>
                  </HTableCell>
                </HTableRow>
              ))}
            </HTableBody>
          </HTable>
        </div>

        {/* Paginação (visual) */}
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-1" aria-label="Paginação">
            <HButton variant="ghost" size="icon" className="h-9 w-9 text-hst-muted" aria-label="Página anterior">
              <ChevronLeft className="h-4 w-4" />
            </HButton>
            <HButton variant="outline" size="icon" className="h-9 w-9">1</HButton>
            <HButton variant="ghost" size="icon" className="h-9 w-9 text-hst-muted">2</HButton>
            <HButton variant="ghost" size="icon" className="h-9 w-9 text-hst-muted">3</HButton>
            <HButton variant="ghost" size="icon" className="h-9 w-9 text-hst-muted" aria-label="Próxima página">
              <ChevronRight className="h-4 w-4" />
            </HButton>
          </nav>
        </div>
      </div>
    </HCard>
  );
}
