// shadcn/ui-equivalent primitives from the Houston platform, rebuilt on the
// portfolio's Tailwind v4 setup. Colors are explicit (hst-* tokens) because
// the portfolio has no shadcn theme variables.

import { ReactNode, ButtonHTMLAttributes } from "react";
import type { PagamentoStatus, VagaStatus, CandidaturaStatus } from "./data";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ----------------------------------- Card ------------------------------------ */

export function HCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("rounded-xl border border-hst-border bg-white text-hst-fg shadow-sm", className)}>
      {children}
    </div>
  );
}

export function HCardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function HCardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("text-2xl font-normal leading-none tracking-tight", className)}>{children}</div>;
}

export function HCardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("p-6 pt-0", className)}>{children}</div>;
}

/* ---------------------------------- Button ------------------------------------ */

type HButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
};

export function HButton({ variant = "default", size = "default", className, ...props }: HButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-normal transition-colors whitespace-nowrap cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hst-primary",
        variant === "default" && "bg-hst-primary text-white hover:bg-hst-primary/90",
        variant === "outline" && "border border-hst-border bg-white text-hst-fg hover:bg-hst-bg",
        variant === "ghost" && "text-hst-fg hover:bg-black/5",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 px-3",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}

/* ----------------------------------- Badge ------------------------------------ */

export function HBadge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-normal whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- Progress ----------------------------------- */

export function HProgress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cx("relative h-2 w-full overflow-hidden rounded-full bg-hst-primary/15", className)}>
      <div
        className="h-full bg-hst-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ---------------------------------- Table ------------------------------------- */

export function HTable({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={cx("w-full caption-bottom text-sm", className)}>{children}</table>
    </div>
  );
}

export function HTableHeader({ children }: { children: ReactNode }) {
  return <thead className="[&_tr]:border-b [&_tr]:border-hst-border">{children}</thead>;
}

export function HTableBody({ children }: { children: ReactNode }) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
}

export function HTableRow({ className, children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={cx("border-b border-hst-border transition-colors hover:bg-black/[0.03]", className)}
    >
      {children}
    </tr>
  );
}

export function HTableHead({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <th className={cx("h-12 px-4 text-left align-middle font-normal text-hst-muted", className)}>
      {children}
    </th>
  );
}

export function HTableCell({ className, children, colSpan }: { className?: string; children?: ReactNode; colSpan?: number }) {
  return (
    <td colSpan={colSpan} className={cx("p-4 align-middle", className)}>
      {children}
    </td>
  );
}

/* ------------------------------- Fake controls -------------------------------- */

// Display-only select (the real platform uses Radix selects; here the closed
// state is enough for the recreation).
export function HSelectLike({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cx(
        "flex h-10 items-center justify-between gap-2 rounded-md border border-hst-border bg-white px-3 py-2 text-sm text-hst-fg",
        className
      )}
    >
      <span className="truncate">{children}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-50">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function HCheckbox({ checked, onChange, label }: { checked: boolean; onChange?: () => void; label?: string }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={label ?? "Selecionar"}
      onClick={onChange}
      className={cx(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border cursor-pointer transition-colors",
        checked ? "border-hst-primary bg-hst-primary text-white" : "border-hst-muted/60 bg-white"
      )}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </button>
  );
}

/* -------------------------------- Status badges -------------------------------- */

const PAGAMENTO_STYLE: Record<PagamentoStatus, string> = {
  PENDENTE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  AUTORIZADO: "bg-blue-50 text-blue-700 border-blue-200",
  PAGO: "bg-green-50 text-green-700 border-green-200",
};

export function PagamentoStatusBadge({ status }: { status: PagamentoStatus }) {
  return (
    <span className={cx("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-normal", PAGAMENTO_STYLE[status])}>
      {status}
    </span>
  );
}

const VAGA_STYLE: Record<VagaStatus, { label: string; cls: string }> = {
  aberta: { label: "ABERTA", cls: "bg-gray-50 text-gray-700 border-gray-200" },
  fechada: { label: "FECHADA", cls: "bg-orange-50 text-orange-700 border-orange-200" },
  urgente: { label: "URGENTE", cls: "bg-red-50 text-red-700 border-red-200" },
  anunciada: { label: "ANUNCIADA", cls: "bg-blue-50 text-blue-700 border-blue-200" },
};

export function VagaStatusBadge({ status }: { status: VagaStatus }) {
  const s = VAGA_STYLE[status];
  return (
    <span className={cx("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-normal", s.cls)}>
      {s.label}
    </span>
  );
}

const CANDIDATURA_STYLE: Record<CandidaturaStatus, string> = {
  PENDENTE: "bg-yellow-50 text-yellow-700 border-yellow-200",
  APROVADO: "bg-green-50 text-green-700 border-green-200",
  REPROVADO: "bg-red-50 text-red-700 border-red-200",
};

export function CandidaturaStatusBadge({ status }: { status: CandidaturaStatus }) {
  return (
    <span className={cx("inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-normal", CANDIDATURA_STYLE[status])}>
      {status}
    </span>
  );
}
