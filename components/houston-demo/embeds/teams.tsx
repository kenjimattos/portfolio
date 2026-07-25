"use client";

// Compact recreation of the "Minhas equipes" fragment of the Houston
// "Médicos" screen (teams / favorites area): section header, team search,
// "Nova Equipe" action and a team card listing members with initials,
// specialty + CRM, hover actions and an expandable member list.

import { useState } from "react";
import { Info, MoreVertical, Plus, Search, Star, Trash2, Users } from "lucide-react";
import { cx, HBadge, HButton, HCard } from "@/components/houston-demo/ui";
import { MEDICOS } from "@/components/houston-demo/data";

type Equipe = {
  id: number;
  nome: string;
  cor: string;
  medicoIdx: number[]; // indexes into MEDICOS
};

// A equipe exibida no fragmento (a plataforma real busca do banco).
const EQUIPE: Equipe = {
  id: 1,
  nome: "PLANTÃO PS SANTA HELENA",
  cor: "#E11D74",
  medicoIdx: [0, 1, 2, 5, 6, 7, 8],
};

const MAX_VISIVEIS = 3;

export function TeamsEmbed() {
  const [busca, setBusca] = useState("");
  const [expandido, setExpandido] = useState(false);
  const [favoritos, setFavoritos] = useState<number[]>(
    MEDICOS.filter((m) => m.favorito).map((m) => m.id)
  );

  const toggleFavorito = (id: number) =>
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id]
    );

  const membros = EQUIPE.medicoIdx.map((i) => MEDICOS[i]);
  const termo = busca.trim().toLowerCase();
  const buscando = termo.length > 0;

  const filtrados = buscando
    ? membros.filter(
        (m) =>
          m.nome.toLowerCase().includes(termo) ||
          m.crm.toLowerCase().includes(termo) ||
          EQUIPE.nome.toLowerCase().includes(termo)
      )
    : membros;

  // Durante a busca a lista mostra todos os resultados; fora dela, 3 + expandir.
  const visiveis = buscando || expandido ? filtrados : filtrados.slice(0, MAX_VISIVEIS);
  const ocultos = filtrados.length - MAX_VISIVEIS;

  return (
    <HCard className="p-6">
      {/* Cabeçalho da seção */}
      <div className="flex items-center gap-2 text-xl font-normal text-hst-fg">
        <Users className="h-5 w-5" />
        Minhas equipes (1)
      </div>

      {/* Busca + Nova Equipe */}
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hst-muted" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome da equipe, médico ou CRM..."
            className="h-10 w-full rounded-lg border border-hst-border bg-white pl-10 pr-3 text-sm text-hst-fg placeholder:text-hst-muted focus:border-hst-primary focus:outline-none"
          />
        </div>
        <HButton className="shrink-0 rounded-lg">
          <Plus className="h-4 w-4" />
          Nova Equipe
        </HButton>
      </div>

      {/* Card da equipe */}
      <div className="mt-4 rounded-xl border border-hst-border bg-white shadow-sm">
        <div className="flex items-center justify-between p-5 pb-2">
          <div className="flex min-w-0 items-center gap-2 text-lg font-normal">
            <span
              className="h-5 w-5 shrink-0 rounded-full"
              style={{ backgroundColor: EQUIPE.cor }}
            />
            <span className="truncate">{EQUIPE.nome}</span>
            <HBadge className="ml-2 bg-gray-100 text-hst-fg">
              {filtrados.length} {filtrados.length === 1 ? "médico" : "médicos"}
            </HBadge>
          </div>
          <HButton variant="ghost" size="icon" className="h-8 w-8" aria-label="Ações da equipe">
            <MoreVertical className="h-4 w-4" />
          </HButton>
        </div>

        <div className="space-y-2 p-5 pt-2">
          {visiveis.length === 0 ? (
            <div className="py-8 text-center text-hst-muted">
              <Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p className="text-sm">Nenhum médico encontrado nesta equipe</p>
            </div>
          ) : (
            visiveis.map((medico) => {
              const favorito = favoritos.includes(medico.id);
              const inicial = medico.nome.charAt(0);

              return (
                <div
                  key={medico.id}
                  className={cx(
                    "group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-black/[0.04]",
                    buscando && "border border-hst-primary/40 bg-hst-primary/10"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm text-hst-fg">
                      {inicial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-normal text-hst-fg">{medico.nome}</p>
                      <p className="truncate text-xs text-hst-muted">
                        {medico.especialidade} • {medico.crm}
                      </p>
                    </div>
                  </div>

                  {/* Ações da linha (aparecem no hover; estrela fica visível quando favorito) */}
                  <div className="flex shrink-0 items-center gap-1">
                    <HButton
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorito(medico.id)}
                      title={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      className={cx(
                        "h-8 w-8 hover:bg-yellow-50 hover:text-yellow-600",
                        favorito
                          ? "text-yellow-500"
                          : "opacity-0 transition-opacity group-hover:opacity-100"
                      )}
                    >
                      <Star className={cx("h-4 w-4", favorito && "fill-current")} />
                    </HButton>
                    <HButton
                      variant="ghost"
                      size="icon"
                      title="Ver detalhes do médico"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Info className="h-4 w-4 text-gray-700" />
                    </HButton>
                    <HButton
                      variant="ghost"
                      size="icon"
                      title="Remover médico da equipe"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </HButton>
                  </div>
                </div>
              );
            })
          )}

          {!buscando && ocultos > 0 && (
            <HButton
              variant="ghost"
              size="sm"
              className="mt-2 w-full"
              onClick={() => setExpandido((e) => !e)}
            >
              {expandido ? "Mostrar menos" : `Mostrar mais ${ocultos} médicos`}
            </HButton>
          )}
        </div>
      </div>
    </HCard>
  );
}
