"use client";

// Recreation of the Houston "Editar Escalista" modal (access-control.png):
// personal data form, cargo selector, Grupos/Hospitais/Setores tabs, group
// assignment cards and Excluir/Salvar footer. Role permissions are predefined
// per cargo in the database, so the modal shows no permission editing —
// exactly like the real product. Role ids mirror the real codebase.

import { useState } from "react";
import {
  ChevronDown,
  ChevronsUpDown,
  Hotel,
  MapPin,
  Minus,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { cx, HBadge } from "@/components/houston-demo/ui";

/* --------------------------------- Dados --------------------------------- */

const ROLES = [
  {
    id: "administrador",
    label: "Administrador",
    description: "Acesso administrativo completo",
  },
  {
    id: "gestor",
    label: "Gestor",
    description: "Gestor com permissões avançadas",
  },
  {
    id: "coordenador",
    label: "Coordenador",
    description: "Coordenador de equipe",
  },
  {
    id: "escalista",
    label: "Escalista",
    description: "Usuário padrão com acesso básico",
  },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

/* ------------------------------- Sub-partes ------------------------------- */

function Field({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="text-[15px] font-normal text-hst-fg">{label}</div>
      <div
        className={cx(
          "flex h-11 items-center rounded-lg border border-hst-border bg-white px-3.5 text-sm",
          muted ? "text-hst-muted" : "text-hst-fg"
        )}
      >
        {value}
      </div>
    </div>
  );
}

/* -------------------------------- Componente ------------------------------ */

export function AccessControlEmbed() {
  const [role, setRole] = useState<RoleId>("escalista");
  const [cargoOpen, setCargoOpen] = useState(false);

  const selectedRole = ROLES.find((r) => r.id === role) ?? ROLES[3];

  const handleRoleSelect = (next: RoleId) => {
    setRole(next);
    setCargoOpen(false);
  };

  return (
    <div className="rounded-2xl border border-hst-border bg-white p-6 text-hst-fg shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-[22px] font-normal leading-tight">
          Editar Escalista
        </h2>
        <button
          aria-label="Fechar"
          className="mt-0.5 cursor-pointer text-hst-muted transition-colors hover:text-hst-fg"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Dados pessoais */}
      <div className="mt-5 space-y-4">
        <Field label="Nome *" value="Gabriel Coelho" />
        <Field label="Telefone" value="(11) 93800-0150" />
        <Field label="E-mail" value="gabriel.fgcoelho@gmail.com" muted />

        {/* Cargo — select funcional com 4 opções */}
        <div className="space-y-1.5">
          <div className="text-[15px] font-normal text-hst-fg">Cargo</div>
          <div className="relative">
            <button
              onClick={() => setCargoOpen((o) => !o)}
              aria-expanded={cargoOpen}
              className="flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-hst-border bg-white px-3.5 text-sm text-hst-fg transition-colors hover:bg-hst-bg/60"
            >
              <span>{selectedRole.label}</span>
              <ChevronDown
                className={cx(
                  "size-4 text-hst-muted transition-transform",
                  cargoOpen && "rotate-180"
                )}
              />
            </button>
            {cargoOpen && (
              <div className="absolute inset-x-0 top-[calc(100%+4px)] z-10 overflow-hidden rounded-lg border border-hst-border bg-white py-1 shadow-md">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className={cx(
                      "flex w-full cursor-pointer items-center justify-between px-3.5 py-2 text-left text-sm transition-colors hover:bg-hst-bg",
                      r.id === role ? "text-hst-primary-strong" : "text-hst-fg"
                    )}
                  >
                    <span>
                      {r.label}
                      <span className="ml-2 text-xs text-hst-muted">
                        {r.description}
                      </span>
                    </span>
                    {r.id === role && (
                      <ShieldCheck className="size-4 shrink-0 text-hst-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Abas de atribuições */}
      <div className="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-black/5 p-1">
        <button className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white text-sm text-hst-fg shadow-sm">
          <Users className="size-4" />
          Grupos
        </button>
        <button className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm text-hst-muted transition-colors hover:text-hst-fg">
          <Hotel className="size-4" />
          Hospitais
        </button>
        <button className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm text-hst-muted transition-colors hover:text-hst-fg">
          <MapPin className="size-4" />
          Setores
        </button>
      </div>

      {/* Adicionar a Grupo */}
      <div className="mt-4 rounded-xl border border-hst-border p-4">
        <div className="text-[15px] font-normal text-hst-fg">
          Adicionar a Grupo
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border border-hst-border bg-white px-3.5 text-sm text-hst-muted">
            <Search className="size-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">Selecionar itens...</span>
            <ChevronsUpDown className="size-3.5 shrink-0" />
          </div>
          <button
            aria-label="Adicionar"
            className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-lg bg-hst-primary/45 text-white transition-colors hover:bg-hst-primary/60"
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>

      {/* Grupos atuais */}
      <div className="mt-4 rounded-xl border border-hst-border p-4">
        <div className="text-[15px] font-normal text-hst-fg">Grupos atuais</div>
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-black/[0.04] py-2 pl-3 pr-2">
          <div className="flex min-w-0 items-center gap-3">
            <HBadge className="bg-blue-100 text-blue-800">
              {selectedRole.label}
            </HBadge>
            <span className="truncate text-sm text-hst-fg">Revoluna</span>
          </div>
          <button
            aria-label="Remover do grupo"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-hst-border bg-white text-hst-fg transition-colors hover:bg-hst-bg"
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button className="flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-5 text-sm text-white transition-colors hover:bg-red-600">
          <Trash2 className="size-4" />
          Excluir
        </button>
        <button className="flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-hst-primary/50 px-6 text-sm text-white transition-colors hover:bg-hst-primary/65">
          <Save className="size-4" />
          Salvar
        </button>
      </div>
    </div>
  );
}
