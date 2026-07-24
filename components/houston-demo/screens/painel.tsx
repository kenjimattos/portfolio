"use client";

// Recreation of the Houston "Painel de Controle" screen (dashboard home).
// Mirrors app/(dashboard)/page.tsx + global-metrics / hospital-card /
// dashboard-filters / notification-center from the original codebase.

import {
  AlertTriangle,
  BellRing,
  Briefcase,
  Calendar,
  Check,
  CheckCheck,
  Clock,
  DollarSign,
  GripVertical,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react";
import { HCard, HCardHeader, HCardTitle, HCardContent, HButton, HBadge, HProgress, HSelectLike, cx } from "@/components/houston-demo/ui";
import {
  METRICAS_GLOBAIS,
  HOSPITAIS,
  NOTIFICACOES,
  MES_ATUAL,
  ULTIMA_ATUALIZACAO,
  type Hospital,
  type Notificacao,
} from "@/components/houston-demo/data";

/* ------------------------------ Métricas Globais ------------------------------ */

function KpiCard({
  titulo,
  tituloClass,
  icone,
  valor,
  valorClass,
  legenda,
  cardClass,
  children,
}: {
  titulo: string;
  tituloClass?: string;
  icone: React.ReactNode;
  valor: string;
  valorClass?: string;
  legenda?: string;
  cardClass?: string;
  children?: React.ReactNode;
}) {
  return (
    <HCard className={cardClass}>
      <HCardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <HCardTitle className={cx("text-sm font-normal leading-normal tracking-normal", tituloClass)}>
          {titulo}
        </HCardTitle>
        {icone}
      </HCardHeader>
      <HCardContent>
        <div className={cx("text-2xl font-normal", valorClass)}>{valor}</div>
        {legenda && <p className="text-xs text-hst-muted">{legenda}</p>}
        {children}
      </HCardContent>
    </HCard>
  );
}

function GlobalMetrics() {
  const m = METRICAS_GLOBAIS;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-normal mb-4">Métricas Globais</h2>

        <div className="space-y-4">
          {/* Primeira linha: 6 métricas principais em 3 colunas x 2 linhas */}
          <div className="grid gap-4 grid-cols-3">
            {/* Total de Vagas */}
            <KpiCard
              titulo="Total de Vagas"
              icone={<Briefcase className="h-4 w-4 text-hst-muted" />}
              valor={m.totalVagas.toLocaleString("pt-BR")}
            />

            {/* Vagas Abertas */}
            <KpiCard
              titulo="Vagas Abertas"
              icone={<Briefcase className="h-4 w-4 text-green-600" />}
              valor={m.abertas.toLocaleString("pt-BR")}
              valorClass="text-green-600"
              legenda={`${Math.round((m.abertas / m.totalVagas) * 100)}% do total`}
            />

            {/* Vagas Fechadas */}
            <KpiCard
              titulo="Vagas Fechadas"
              icone={<Users className="h-4 w-4 text-blue-600" />}
              valor={`${m.taxaPreenchimento}%`}
              valorClass="text-blue-600"
              legenda={`${m.fechadas.toLocaleString("pt-BR")} vagas preenchidas`}
            />

            {/* Tempo Médio */}
            <KpiCard
              titulo="Tempo Médio"
              icone={<Clock className="h-4 w-4 text-purple-600" />}
              valor={`${m.tempoMedioHoras}h`}
              valorClass="text-purple-600"
              legenda="Para preenchimento"
            />

            {/* Candidaturas */}
            <KpiCard
              titulo="Candidaturas"
              icone={<Users className="h-4 w-4 text-amber-600" />}
              valor={m.candidaturasPendentes.toLocaleString("pt-BR")}
              valorClass="text-amber-600"
              legenda="Pendentes"
            />

            {/* Vagas Urgentes */}
            <KpiCard
              titulo="Vagas Urgentes"
              tituloClass="text-red-800"
              icone={<AlertTriangle className="h-4 w-4 text-red-600" />}
              valor={m.urgentes.toLocaleString("pt-BR")}
              valorClass="text-red-600"
              cardClass="border-red-200 bg-red-50"
            >
              <div className="flex items-center">
                <HBadge className="bg-red-600 text-white text-xs">Hoje até 2 dias</HBadge>
              </div>
            </KpiCard>
          </div>

          {/* Segunda linha: Folha de Pagamento e Risco Operacional */}
          <div className="grid gap-4 grid-cols-2">
            <KpiCard
              titulo="Folha de Pagamento"
              tituloClass="text-green-800"
              icone={<DollarSign className="h-4 w-4 text-green-600" />}
              valor={m.folhaPagamento}
              valorClass="text-green-600 truncate"
              legenda="Total do período"
              cardClass="border-green-200 bg-green-50"
            />

            <KpiCard
              titulo="Risco Operacional"
              tituloClass="text-orange-800"
              icone={<Shield className="h-4 w-4 text-orange-600" />}
              valor={m.riscoOperacional.toLocaleString("pt-BR")}
              valorClass="text-orange-600 truncate"
              legenda="Plantões nas próximas 48h sem cobertura"
              cardClass="border-orange-200 bg-orange-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Central de Notificações -------------------------- */

function iconeNotificacao(tipo: Notificacao["tipo"]) {
  switch (tipo) {
    case "urgente":
      return <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />;
    case "candidatura":
      return <Users className="h-4 w-4 shrink-0 text-green-600" />;
    case "checkin":
      return <Clock className="h-4 w-4 shrink-0 text-orange-500" />;
    case "pagamento":
      return <DollarSign className="h-4 w-4 shrink-0 text-blue-600" />;
    case "escala":
      return <Calendar className="h-4 w-4 shrink-0 text-hst-primary" />;
  }
}

function NotificationCenter() {
  const naoLidas = NOTIFICACOES.filter((n) => n.naoLida).length;

  return (
    <HCard className="w-1/3">
      <HCardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <HCardTitle className="text-lg font-normal leading-normal tracking-normal flex items-center gap-2">
            <BellRing className="h-5 w-5 text-orange-500" />
            Notificações
          </HCardTitle>
          <div className="flex items-center gap-2">
            <HBadge className="bg-hst-primary text-white text-xs">{naoLidas}</HBadge>
            <HButton variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </HButton>
          </div>
        </div>
      </HCardHeader>
      <HCardContent>
        <div className="space-y-2">
          {NOTIFICACOES.map((notificacao) => (
            <div
              key={notificacao.id}
              className={cx(
                "p-3 rounded-lg border transition-colors cursor-pointer hover:shadow-sm",
                notificacao.naoLida
                  ? "bg-hst-primary/5 border-hst-primary/20 hover:bg-hst-primary/10"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {iconeNotificacao(notificacao.tipo)}
                  <div className="min-w-0 flex-1">
                    <p className="font-normal text-sm text-gray-900 truncate">{notificacao.titulo}</p>
                    <p className="text-xs text-gray-600">{notificacao.detalhe}</p>
                    <p className="text-xs text-gray-400 mt-1">{notificacao.tempo}</p>
                  </div>
                </div>
                {notificacao.naoLida && (
                  <HButton variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0" aria-label="Marcar como lida">
                    <Check className="h-3 w-3" />
                  </HButton>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-3 border-t border-hst-border">
          <HButton variant="outline" size="sm" className="w-full text-xs">
            <CheckCheck className="h-3 w-3" />
            Marcar todas como lidas
          </HButton>
        </div>
      </HCardContent>
    </HCard>
  );
}

/* ------------------------------ Card de Hospital ------------------------------ */

function HospitalCard({ hospital }: { hospital: Hospital }) {
  const taxa = hospital.totalVagas > 0 ? Math.round((hospital.fechadas / hospital.totalVagas) * 100) : 0;

  return (
    <HCard className="overflow-hidden transition-shadow hover:shadow-md">
      <HCardHeader className="bg-hst-primary/5 pb-2 flex-row justify-between items-center space-y-0">
        <div className="min-w-0 pr-2">
          <HCardTitle className="text-lg font-normal leading-normal tracking-normal truncate">
            {hospital.nome}
          </HCardTitle>
          <p className="text-xs text-hst-muted mt-0.5 truncate">{hospital.cidade}</p>
        </div>
        <div className="cursor-grab active:cursor-grabbing p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-8 min-h-8 flex items-center justify-center">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
      </HCardHeader>
      <HCardContent className="pt-4 space-y-4">
        {/* Indicador de preenchimento */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-normal">Taxa de preenchimento</span>
            <span className="text-sm font-normal">{taxa}%</span>
          </div>
          <HProgress value={taxa} className="h-2" />
        </div>

        {/* Indicadores de vagas */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
            <Briefcase className="h-4 w-4 text-green-600 mb-1" />
            <span className="text-xs text-gray-600">Abertas</span>
            <span className="font-normal text-green-600">{hospital.abertas}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-blue-50 rounded-md">
            <Calendar className="h-4 w-4 text-blue-600 mb-1" />
            <span className="text-xs text-gray-600">Média/dia</span>
            <span className="font-normal text-blue-600">{hospital.mediaDia.toLocaleString("pt-BR")}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-amber-50 rounded-md">
            <Clock className="h-4 w-4 text-amber-600 mb-1" />
            <span className="text-xs text-gray-600">Urgentes</span>
            <span className="font-normal text-amber-600">{hospital.urgentes}</span>
          </div>
        </div>

        {/* Candidaturas */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm">Candidaturas</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <HBadge className="border-hst-primary/20 bg-hst-primary/10 text-hst-primary">
              {hospital.candidaturas} total
            </HBadge>
            <HBadge className="border-amber-200 bg-amber-50 text-amber-700">
              {hospital.pendentes} pendentes
            </HBadge>
          </div>
        </div>
      </HCardContent>
    </HCard>
  );
}

/* ----------------------------------- Tela ------------------------------------ */

export function PainelScreen() {
  return (
    <div className="space-y-4">
      <HCard className="p-6">
        <div className="space-y-4">
          {/* Header + filtros */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-normal tracking-tight">Painel de Controle</h1>
              <p className="text-base text-hst-muted">
                Visão geral da operação • Última atualização: {ULTIMA_ATUALIZACAO}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <HSelectLike className="w-64">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 shrink-0" />
                  {MES_ATUAL}
                </span>
              </HSelectLike>
              <HButton variant="outline">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </HButton>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Métricas Globais */}
            <HCard className="p-6 w-2/3">
              <GlobalMetrics />
            </HCard>

            {/* Central de Notificações */}
            <NotificationCenter />
          </div>

          {/* Cards dos Hospitais */}
          <HCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-normal">Hospitais</h2>
                <p className="text-sm text-hst-muted">Arraste os cards para reorganizar</p>
              </div>

              <div className="grid gap-6 grid-cols-3">
                {HOSPITAIS.map((hospital) => (
                  <HospitalCard key={hospital.id} hospital={hospital} />
                ))}
              </div>
            </div>
          </HCard>
        </div>
      </HCard>

      {/* Footer com informações técnicas */}
      <div className="border-t border-hst-border pt-6 text-xs text-hst-muted">
        <div className="flex justify-between gap-4">
          <div>Sistema: Houston III</div>
          <div>v3.4.2</div>
          <div>Última atualização às {ULTIMA_ATUALIZACAO}</div>
        </div>
      </div>
    </div>
  );
}
