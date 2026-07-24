"use client";

// Faithful recreation of the Houston platform sidebar, in both the open
// (w-64) and collapsed (w-20, icon-only) states of the original product.
// With `onNavigate`, items that map to a recreated screen navigate and the
// rest are dimmed; without it the sidebar is a static snapshot.

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cross,
  DollarSign,
  FileText,
  Grid3X3,
  Home,
  LogOut,
  Megaphone,
  Stethoscope,
  Users,
} from "lucide-react";
import { HoustonLogo, HoustonMark } from "./houston-logo";
import { cx } from "./ui";
import { USUARIO } from "./data";
import type { ScreenId } from "./screens";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  title: string;
  icon: LucideIcon;
  screen?: ScreenId;
};

const NAV_ITEMS: NavItem[] = [
  { title: "Início", icon: Home, screen: "painel" },
  { title: "Grades", icon: Grid3X3 },
  { title: "Escala", icon: CalendarDays, screen: "escala" },
  { title: "Pagamentos", icon: DollarSign, screen: "pagamentos" },
  { title: "Vagas", icon: Megaphone, screen: "vagas" },
  { title: "Candidaturas", icon: ClipboardList },
  { title: "Médicos", icon: Stethoscope },
  { title: "Hospitais", icon: Cross },
  { title: "Escalistas", icon: Users },
  { title: "Relatórios", icon: FileText, screen: "relatorios" },
];

export function DemoSidebar({
  active,
  onNavigate,
  collapsed = false,
  onToggleCollapsed,
}: {
  active: ScreenId;
  onNavigate?: (screen: ScreenId) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  return (
    <div
      className={cx(
        "relative flex h-full shrink-0 flex-col border-r border-hst-border bg-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="space-y-4 border-b border-hst-border px-6 py-8">
        <div className="flex w-full items-center justify-center">
          {collapsed ? (
            <HoustonMark className="h-7.5 w-7.5 text-hst-primary" />
          ) : (
            <HoustonLogo className="h-7 text-hst-primary" />
          )}
        </div>
        {!collapsed && <p className="text-base font-normal">Olá, {USUARIO}!</p>}

        {onToggleCollapsed && (
          <button
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            className="absolute -right-3 top-16 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-hst-border bg-white text-hst-fg shadow-md transition-colors hover:bg-hst-bg"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.screen === active;
            const clickable = onNavigate !== undefined && item.screen !== undefined;
            const dimmed = onNavigate !== undefined && item.screen === undefined;
            return (
              <button
                key={item.title}
                onClick={clickable ? () => onNavigate(item.screen as ScreenId) : undefined}
                aria-disabled={!clickable}
                title={collapsed ? item.title : undefined}
                className={cx(
                  "flex w-full items-center rounded-md px-4 py-3 text-left text-sm font-normal transition-colors",
                  isActive
                    ? "bg-hst-primary/10 text-hst-primary"
                    : "text-gray-600",
                  clickable && !isActive && "hover:bg-gray-100",
                  clickable ? "cursor-pointer" : "cursor-default",
                  dimmed && "opacity-50",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className={cx("h-5 w-5 shrink-0", isActive && "text-hst-primary")} />
                {!collapsed && <span className="ml-3">{item.title}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="w-full border-t border-hst-border p-4">
        <div
          className={cx(
            "flex items-center rounded-md px-4 py-3 text-sm font-normal text-gray-600",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span className="ml-3">Sair</span>}
        </div>
      </div>
    </div>
  );
}
