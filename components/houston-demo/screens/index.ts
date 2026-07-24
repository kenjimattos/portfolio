import type { ComponentType } from "react";
import { PainelScreen } from "./painel";
import { EscalaScreen } from "./escala";
import { VagasScreen } from "./vagas";
import { PagamentosScreen } from "./pagamentos";
import { RelatoriosScreen } from "./relatorios";

export type ScreenId = "painel" | "escala" | "vagas" | "pagamentos" | "relatorios";

export const SCREENS: Record<ScreenId, { component: ComponentType; path: string }> = {
  painel: { component: PainelScreen, path: "/" },
  escala: { component: EscalaScreen, path: "/escala" },
  vagas: { component: VagasScreen, path: "/vagas" },
  pagamentos: { component: PagamentosScreen, path: "/pagamentos" },
  relatorios: { component: RelatoriosScreen, path: "/relatorios/folha-pagamento" },
};
