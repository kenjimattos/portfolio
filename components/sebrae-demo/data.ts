// Dataset for the recreated OPP platform. Indicator values mirror the real
// public snapshot for João Pessoa (public government data); editorial texts
// are shortened from the product's own copy.

export type StatusType = "success" | "warning" | "alert" | "none";

export const MUNICIPIO = "João Pessoa";
export const MUNICIPIO_ID = "2507507";

/* ---------------------------------- agendas --------------------------------- */

export type Agenda = { id: string; name: string; description: string };

export const AGENDAS: Agenda[] = [
  {
    id: "governanca",
    name: "Governança: parcerias público, privada e social para o desenvolvimento local",
    description:
      "Capacidade institucional do município de articular atores e executar políticas de desenvolvimento.",
  },
  {
    id: "simplificacao",
    name: "Serviços públicos mais simples e digitais para os pequenos negócios",
    description:
      "Tempo e burocracia para abrir, licenciar e operar uma empresa no município.",
  },
  {
    id: "inovacao",
    name: "Ecossistemas de inovação: inclusão e digitalização para pequenos negócios",
    description:
      "Presença de ocupações de C&T, economia criativa e compras públicas de inovação.",
  },
  {
    id: "educacao",
    name: "Educação empreendedora",
    description:
      "Formação da força de trabalho local e educação empreendedora nas escolas.",
  },
  {
    id: "credito",
    name: "Acesso a crédito e viabilização financeira",
    description: "Volume e alcance do crédito produtivo concedido no município.",
  },
  {
    id: "inclusao",
    name: "Iniciativas para gerar trabalho e renda para os pequenos negócios",
    description:
      "Dinâmica de abertura, sobrevivência e participação dos pequenos negócios na economia local.",
  },
];

/* -------------------------------- indicadores -------------------------------- */

export type Threshold = {
  kind: "higher-better" | "lower-better";
  success: number;
  warning: number;
};

export type Indicator = {
  id: string;
  label: string;
  value: string;
  status: StatusType;
  threshold?: Threshold;
  /** fraction 0..1 of the marker position on the traffic-light bar */
  markerFraction?: number;
  zones?: [string, string, string];
  agendaId: string;
};

// Real João Pessoa values from the public snapshot.
export const INDICATORS: Indicator[] = [
  {
    id: "igm-cfa",
    label: "IGM – Índice CFA de Governança Municipal",
    value: "6,38",
    status: "warning",
    threshold: { kind: "higher-better", success: 7.51, warning: 5.01 },
    markerFraction: 0.51,
    zones: ["< 5,01", "5,01 – 7,51", "≥ 7,51"],
    agendaId: "governanca",
  },
  {
    id: "idh-m",
    label: "IDH-M",
    value: "0,763",
    status: "success",
    threshold: { kind: "higher-better", success: 0.7, warning: 0.6 },
    markerFraction: 0.86,
    zones: ["< 0,600", "0,600 – 0,700", "≥ 0,700"],
    agendaId: "governanca",
  },
  {
    id: "isdel-governanca",
    label: "Governança para o Desenvolvimento – ISDEL",
    value: "0,431",
    status: "warning",
    threshold: { kind: "higher-better", success: 0.471, warning: 0.311 },
    markerFraction: 0.58,
    zones: ["< 0,311", "0,311 – 0,471", "≥ 0,471"],
    agendaId: "governanca",
  },
  {
    id: "tempo-viabilidade",
    label: "Tempo médio de viabilidade da empresa",
    value: "18,2h",
    status: "success",
    threshold: { kind: "lower-better", success: 72, warning: 168 },
    markerFraction: 0.92,
    zones: ["> 168h", "72h – 168h", "≤ 72h"],
    agendaId: "simplificacao",
  },
  {
    id: "tempo-abertura",
    label: "Tempo médio de abertura da empresa",
    value: "18,7h",
    status: "success",
    threshold: { kind: "lower-better", success: 72, warning: 168 },
    markerFraction: 0.9,
    zones: ["> 168h", "72h – 168h", "≤ 72h"],
    agendaId: "simplificacao",
  },
  {
    id: "ranking-redesim",
    label: "Ranking municipal Redesim/PB",
    value: "350",
    status: "none",
    agendaId: "simplificacao",
  },
  {
    id: "trabalhadores-ct",
    label: "Trabalhadores nas ocupações de C&T",
    value: "19.760",
    status: "none",
    agendaId: "inovacao",
  },
  {
    id: "crescimento-mpe",
    label: "Crescimento de MPE formalizadas",
    value: "+19%",
    status: "none",
    agendaId: "inovacao",
  },
  {
    id: "compras-publicas-inovacao",
    label: "Compras públicas de inovação nos pequenos negócios",
    value: "R$ 439 mil",
    status: "none",
    agendaId: "inovacao",
  },
  {
    id: "credito-financiamento",
    label: "Crédito concedido no município",
    value: "R$ 10,70 bi",
    status: "none",
    agendaId: "credito",
  },
  {
    id: "bndes-operacoes",
    label: "Operações não automáticas de crédito",
    value: "R$ 737,36 mi",
    status: "none",
    agendaId: "credito",
  },
  {
    id: "empresas-ativas",
    label: "Empresas ativas",
    value: "70.864",
    status: "none",
    agendaId: "inclusao",
  },
  {
    id: "negocios-abertos",
    label: "Pequenos negócios abertos",
    value: "15.184",
    status: "none",
    agendaId: "inclusao",
  },
  {
    id: "mpe-compras-publicas",
    label: "Participação MPE em compras públicas",
    value: "27,6%",
    status: "none",
    agendaId: "inclusao",
  },
];

/* ------------------------------ base econômica ------------------------------- */

export type EconCard = {
  id: string;
  label: string;
  value: string;
  variation?: string; // "+15,3%" — rendered in NEUTRAL color by design
  description: string;
  referenceYear: string;
};

export const ECON_CARDS: EconCard[] = [
  { id: "idsc", label: "IDSC", value: "52,03", variation: "+1,1%", description: "Índice de Desenvolvimento Sustentável das Cidades", referenceYear: "2025" },
  { id: "idh-m", label: "IDH-M", value: "0,763", description: "Índice de Desenvolvimento Humano Municipal", referenceYear: "2010" },
  { id: "cobertura-ab", label: "Cobertura Atenção Básica", value: "78,9%", description: "Cobertura populacional da atenção básica em saúde", referenceYear: "2020" },
  { id: "ideb-iniciais", label: "IDEB Anos Iniciais", value: "5,6", variation: "+3,7%", description: "Índice de Desenvolvimento da Educação Básica", referenceYear: "2023" },
  { id: "ideb-finais", label: "IDEB Anos Finais", value: "4,0", variation: "-13%", description: "Índice de Desenvolvimento da Educação Básica", referenceYear: "2023" },
  { id: "gini", label: "GINI", value: "0,620", description: "Concentração de renda no município", referenceYear: "2010" },
  { id: "remuneracao", label: "Remuneração média", value: "R$ 3.832,70", variation: "+6,3%", description: "Remuneração média dos vínculos formais", referenceYear: "2024" },
  { id: "empresas-ativas", label: "Empresas ativas", value: "70.864", variation: "+4,2%", description: "Total de empresas ativas no município", referenceYear: "2025" },
  { id: "pib-per-capita", label: "PIB per capita", value: "R$ 34.106,06", variation: "+15,3%", description: "Produto interno bruto por habitante", referenceYear: "2023" },
  { id: "meis", label: "MEIs", value: "33.862", variation: "+7,9%", description: "Microempreendedores individuais registrados", referenceYear: "2025" },
  { id: "mes", label: "MEs", value: "24.175", variation: "+2,4%", description: "Microempresas registradas", referenceYear: "2025" },
  { id: "epps", label: "EPPs", value: "3.736", variation: "+1,8%", description: "Empresas de pequeno porte registradas", referenceYear: "2025" },
];

export const IA_ANALYSIS_TEXT =
  "João Pessoa apresenta base econômica em expansão: PIB per capita cresceu 15,3% e a remuneração média acompanha, com 70,8 mil empresas ativas. O contraste está na educação — o IDEB dos anos finais recuou 13% — e na concentração de renda, que segue elevada (GINI 0,620). Priorize as agendas de educação empreendedora e inclusão produtiva.";

/* --------------------------------- formulador -------------------------------- */

export const FORMULATOR_STEPS = [
  { label: "Identificação", state: "checked" },
  { label: "Justificativa", state: "checked" },
  { label: "Objetivos", state: "checked" },
  { label: "Público-alvo", state: "current" },
  { label: "Plano de ação", state: "unchecked" },
  { label: "Cronograma", state: "unchecked" },
  { label: "Indicadores", state: "unchecked" },
  { label: "Orçamento", state: "unchecked" },
  { label: "Sustentabilidade", state: "unchecked" },
  { label: "Governança", state: "unchecked" },
] as const;

/* ----------------------------------- jornada ---------------------------------- */

export const AMBIENTE_MODES = ["Eixos prioritários", "Panorama socioeconômico", "Riscos estratégicos"];

/* ------------------------------------ mapa ------------------------------------ */

export const MAP_TOOLTIP = { id: MUNICIPIO_ID, name: MUNICIPIO };
