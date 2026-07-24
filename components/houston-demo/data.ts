// Fictional dataset for the recreated Houston platform. Everything here is
// dummy data — names, CRMs, CPFs and figures are invented. The reference
// month is fixed (July 2025) so server and client render identically.

export type VagaStatus = "aberta" | "fechada" | "urgente" | "anunciada";
export type PagamentoStatus = "PENDENTE" | "AUTORIZADO" | "PAGO";
export type CandidaturaStatus = "APROVADO" | "PENDENTE" | "REPROVADO";

export const MES_ATUAL = "Julho 2025";
export const ULTIMA_ATUALIZACAO = "14:32:05";
export const USUARIO = "Mariana";

/* ---------------------------------- catálogo --------------------------------- */

export const SETORES = [
  "Pronto-Socorro",
  "UTI Adulto",
  "Enfermaria",
  "Centro Cirúrgico",
  "Pediatria",
] as const;

export const ESPECIALIDADES = [
  "Clínica Médica",
  "Pediatria",
  "Ortopedia",
  "Cardiologia",
  "Anestesiologia",
] as const;

export const PERIODOS = ["Diurno", "Noturno"] as const;

export type Grade = { nome: string; cor: string };
export const GRADES: Grade[] = [
  { nome: "PS Adulto", cor: "#8B5CF6" },
  { nome: "UTI Noturno", cor: "#F59E0B" },
  { nome: "Pediatria", cor: "#10B981" },
  { nome: "Centro Cirúrgico", cor: "#3B82F6" },
  { nome: "Enfermaria", cor: "#EC4899" },
];

/* --------------------------------- hospitais --------------------------------- */

export type Hospital = {
  id: number;
  nome: string;
  cidade: string;
  totalVagas: number;
  fechadas: number;
  abertas: number;
  urgentes: number;
  mediaDia: number;
  candidaturas: number;
  pendentes: number;
};

export const HOSPITAIS: Hospital[] = [
  { id: 1, nome: "Hospital Santa Helena", cidade: "São Paulo — SP", totalVagas: 96, fechadas: 88, abertas: 8, urgentes: 2, mediaDia: 3.1, candidaturas: 41, pendentes: 9 },
  { id: 2, nome: "Hospital São Lucas", cidade: "Campinas — SP", totalVagas: 74, fechadas: 61, abertas: 13, urgentes: 4, mediaDia: 2.4, candidaturas: 33, pendentes: 12 },
  { id: 3, nome: "Hospital Vida Nova", cidade: "Curitiba — PR", totalVagas: 62, fechadas: 58, abertas: 4, urgentes: 0, mediaDia: 2.0, candidaturas: 25, pendentes: 4 },
  { id: 4, nome: "Hospital Monte Sinai", cidade: "Belo Horizonte — MG", totalVagas: 58, fechadas: 47, abertas: 11, urgentes: 3, mediaDia: 1.9, candidaturas: 18, pendentes: 6 },
  { id: 5, nome: "Hospital Alto da Serra", cidade: "Petrópolis — RJ", totalVagas: 52, fechadas: 41, abertas: 11, urgentes: 0, mediaDia: 1.7, candidaturas: 11, pendentes: 2 },
];

/* ----------------------------- métricas do painel ---------------------------- */

export const METRICAS_GLOBAIS = {
  totalVagas: 342,
  abertas: 47,
  fechadas: 295,
  taxaPreenchimento: 86,
  tempoMedioHoras: 6,
  candidaturas: 128,
  candidaturasPendentes: 33,
  urgentes: 9,
  folhaPagamento: "R$ 412.380,00",
  riscoOperacional: 3,
};

export type Notificacao = {
  id: number;
  tipo: "candidatura" | "urgente" | "checkin" | "pagamento" | "escala";
  titulo: string;
  detalhe: string;
  tempo: string;
  naoLida?: boolean;
};

export const NOTIFICACOES: Notificacao[] = [
  { id: 1, tipo: "urgente", titulo: "Plantão sem cobertura em 48h", detalhe: "PS Adulto · Hospital São Lucas · 23/07, 19h–07h", tempo: "há 8 min", naoLida: true },
  { id: 2, tipo: "candidatura", titulo: "Nova candidatura recebida", detalhe: "Dra. Camila Ferraz · UTI Noturno · Hospital Santa Helena", tempo: "há 12 min", naoLida: true },
  { id: 3, tipo: "checkin", titulo: "Check-in atrasado", detalhe: "Dr. Rafael Nogueira · Enfermaria · Hospital Monte Sinai", tempo: "há 26 min", naoLida: true },
  { id: 4, tipo: "pagamento", titulo: "Lote de pagamentos autorizado", detalhe: "18 plantões · R$ 39.420,00 · por Paulo Cesar", tempo: "há 1 h" },
  { id: 5, tipo: "candidatura", titulo: "Candidatura aprovada", detalhe: "Dr. André Sampaio · Centro Cirúrgico · Hospital Vida Nova", tempo: "há 2 h" },
  { id: 6, tipo: "escala", titulo: "Escala de agosto publicada", detalhe: "Hospital Santa Helena · 112 plantões criados", tempo: "há 3 h" },
];

/* ---------------------------------- médicos ---------------------------------- */

export type Medico = {
  id: number;
  nome: string;
  crm: string;
  cpf: string;
  especialidade: (typeof ESPECIALIDADES)[number];
  favorito?: boolean;
};

export const MEDICOS: Medico[] = [
  { id: 1, nome: "Ana Beatriz Rocha", crm: "CRM/SP 145.632", cpf: "412.887.301-20", especialidade: "Clínica Médica", favorito: true },
  { id: 2, nome: "Rafael Nogueira", crm: "CRM/SP 132.418", cpf: "358.204.917-05", especialidade: "Clínica Médica" },
  { id: 3, nome: "Camila Ferraz", crm: "CRM/SP 158.907", cpf: "290.415.678-33", especialidade: "Cardiologia", favorito: true },
  { id: 4, nome: "André Sampaio", crm: "CRM/PR 98.234", cpf: "174.902.556-41", especialidade: "Anestesiologia" },
  { id: 5, nome: "Juliana Prado", crm: "CRM/MG 87.115", cpf: "203.778.140-62", especialidade: "Pediatria", favorito: true },
  { id: 6, nome: "Bruno Cardoso", crm: "CRM/SP 121.550", cpf: "331.640.982-77", especialidade: "Ortopedia" },
  { id: 7, nome: "Larissa Menezes", crm: "CRM/RJ 76.309", cpf: "445.219.803-18", especialidade: "Clínica Médica" },
  { id: 8, nome: "Felipe Arruda", crm: "CRM/SP 149.882", cpf: "160.554.372-90", especialidade: "Cardiologia" },
  { id: 9, nome: "Beatriz Lopes", crm: "CRM/PR 91.746", cpf: "287.310.665-54", especialidade: "Pediatria" },
  { id: 10, nome: "Gustavo Teixeira", crm: "CRM/MG 84.021", cpf: "375.998.201-36", especialidade: "Anestesiologia" },
];

/* ----------------------------------- vagas ----------------------------------- */

export type Vaga = {
  id: number;
  data: string; // dd/MM/yyyy
  horaInicio: string;
  horaFim: string;
  hospital: string;
  setor: (typeof SETORES)[number];
  especialidade: (typeof ESPECIALIDADES)[number];
  periodo: (typeof PERIODOS)[number];
  valor: number;
  status: VagaStatus;
  candidatos: number;
  medico?: string;
};

export const VAGAS: Vaga[] = [
  { id: 4211, data: "21/07/2025", horaInicio: "07:00", horaFim: "19:00", hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", especialidade: "Clínica Médica", periodo: "Diurno", valor: 1900, status: "fechada", candidatos: 4, medico: "Ana Beatriz Rocha" },
  { id: 4212, data: "21/07/2025", horaInicio: "19:00", horaFim: "07:00", hospital: "Hospital Santa Helena", setor: "UTI Adulto", especialidade: "Clínica Médica", periodo: "Noturno", valor: 2300, status: "fechada", candidatos: 3, medico: "Rafael Nogueira" },
  { id: 4218, data: "22/07/2025", horaInicio: "07:00", horaFim: "19:00", hospital: "Hospital São Lucas", setor: "Pronto-Socorro", especialidade: "Clínica Médica", periodo: "Diurno", valor: 1850, status: "aberta", candidatos: 2 },
  { id: 4220, data: "23/07/2025", horaInicio: "19:00", horaFim: "07:00", hospital: "Hospital São Lucas", setor: "Pronto-Socorro", especialidade: "Clínica Médica", periodo: "Noturno", valor: 2450, status: "urgente", candidatos: 0 },
  { id: 4223, data: "24/07/2025", horaInicio: "07:00", horaFim: "13:00", hospital: "Hospital Vida Nova", setor: "Pediatria", especialidade: "Pediatria", periodo: "Diurno", valor: 1100, status: "fechada", candidatos: 5, medico: "Juliana Prado" },
  { id: 4227, data: "24/07/2025", horaInicio: "13:00", horaFim: "19:00", hospital: "Hospital Monte Sinai", setor: "Centro Cirúrgico", especialidade: "Anestesiologia", periodo: "Diurno", valor: 1650, status: "aberta", candidatos: 1 },
  { id: 4231, data: "25/07/2025", horaInicio: "19:00", horaFim: "07:00", hospital: "Hospital Monte Sinai", setor: "UTI Adulto", especialidade: "Cardiologia", periodo: "Noturno", valor: 2600, status: "urgente", candidatos: 1 },
  { id: 4235, data: "26/07/2025", horaInicio: "07:00", horaFim: "19:00", hospital: "Hospital Alto da Serra", setor: "Enfermaria", especialidade: "Clínica Médica", periodo: "Diurno", valor: 1500, status: "anunciada", candidatos: 0 },
  { id: 4238, data: "26/07/2025", horaInicio: "19:00", horaFim: "07:00", hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", especialidade: "Ortopedia", periodo: "Noturno", valor: 2250, status: "aberta", candidatos: 3 },
  { id: 4240, data: "27/07/2025", horaInicio: "07:00", horaFim: "19:00", hospital: "Hospital Vida Nova", setor: "Centro Cirúrgico", especialidade: "Anestesiologia", periodo: "Diurno", valor: 1750, status: "fechada", candidatos: 2, medico: "André Sampaio" },
  { id: 4243, data: "28/07/2025", horaInicio: "07:00", horaFim: "19:00", hospital: "Hospital São Lucas", setor: "Enfermaria", especialidade: "Clínica Médica", periodo: "Diurno", valor: 1480, status: "aberta", candidatos: 0 },
  { id: 4247, data: "29/07/2025", horaInicio: "19:00", horaFim: "07:00", hospital: "Hospital Santa Helena", setor: "UTI Adulto", especialidade: "Cardiologia", periodo: "Noturno", valor: 2500, status: "fechada", candidatos: 6, medico: "Camila Ferraz" },
];

/* --------------------------------- candidaturas ------------------------------ */

export type Candidatura = {
  id: number;
  medico: Medico;
  vaga: string; // resumo "21/07 · PS · Hospital Santa Helena"
  status: CandidaturaStatus;
  recebidaEm: string;
};

export const CANDIDATURAS: Candidatura[] = [
  { id: 901, medico: MEDICOS[2], vaga: "23/07 · UTI Noturno · Hospital Santa Helena", status: "PENDENTE", recebidaEm: "21/07/2025 13:58" },
  { id: 902, medico: MEDICOS[6], vaga: "22/07 · Pronto-Socorro · Hospital São Lucas", status: "PENDENTE", recebidaEm: "21/07/2025 11:24" },
  { id: 903, medico: MEDICOS[4], vaga: "24/07 · Pediatria · Hospital Vida Nova", status: "APROVADO", recebidaEm: "20/07/2025 18:07" },
  { id: 904, medico: MEDICOS[7], vaga: "25/07 · UTI Adulto · Hospital Monte Sinai", status: "PENDENTE", recebidaEm: "20/07/2025 16:41" },
  { id: 905, medico: MEDICOS[5], vaga: "26/07 · Pronto-Socorro · Hospital Santa Helena", status: "REPROVADO", recebidaEm: "19/07/2025 22:15" },
];

/* --------------------------------- pagamentos -------------------------------- */

export type Pagamento = {
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  medico: Medico;
  hospital: string;
  setor: (typeof SETORES)[number];
  checkinHora?: string;
  checkoutHora?: string;
  valor: number;
  status: PagamentoStatus;
  autorizadoPor?: string;
  pagoEm?: string;
};

export const PAGAMENTOS: Pagamento[] = [
  { id: 7801, data: "14/07/2025", horaInicio: "07:00", horaFim: "19:00", medico: MEDICOS[0], hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", checkinHora: "06:52", checkoutHora: "19:04", valor: 1900, status: "PAGO", autorizadoPor: "Paulo Cesar", pagoEm: "17/07/2025" },
  { id: 7802, data: "14/07/2025", horaInicio: "19:00", horaFim: "07:00", medico: MEDICOS[1], hospital: "Hospital Santa Helena", setor: "UTI Adulto", checkinHora: "18:47", checkoutHora: "07:10", valor: 2300, status: "PAGO", autorizadoPor: "Paulo Cesar", pagoEm: "17/07/2025" },
  { id: 7815, data: "15/07/2025", horaInicio: "07:00", horaFim: "19:00", medico: MEDICOS[2], hospital: "Hospital São Lucas", setor: "Pronto-Socorro", checkinHora: "06:58", checkoutHora: "19:02", valor: 1850, status: "AUTORIZADO", autorizadoPor: "Paulo Cesar" },
  { id: 7818, data: "15/07/2025", horaInicio: "13:00", horaFim: "19:00", medico: MEDICOS[3], hospital: "Hospital Vida Nova", setor: "Centro Cirúrgico", checkinHora: "12:49", checkoutHora: "19:08", valor: 1650, status: "AUTORIZADO", autorizadoPor: "Paulo Cesar" },
  { id: 7824, data: "16/07/2025", horaInicio: "07:00", horaFim: "13:00", medico: MEDICOS[4], hospital: "Hospital Vida Nova", setor: "Pediatria", checkinHora: "06:55", checkoutHora: "13:01", valor: 1100, status: "AUTORIZADO", autorizadoPor: "Mariana Duarte" },
  { id: 7829, data: "17/07/2025", horaInicio: "19:00", horaFim: "07:00", medico: MEDICOS[7], hospital: "Hospital Monte Sinai", setor: "UTI Adulto", checkinHora: "18:52", checkoutHora: "07:06", valor: 2600, status: "PENDENTE" },
  { id: 7833, data: "18/07/2025", horaInicio: "07:00", horaFim: "19:00", medico: MEDICOS[6], hospital: "Hospital Alto da Serra", setor: "Enfermaria", checkinHora: "07:03", checkoutHora: "19:00", valor: 1500, status: "PENDENTE" },
  { id: 7836, data: "18/07/2025", horaInicio: "19:00", horaFim: "07:00", medico: MEDICOS[5], hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", checkinHora: "18:58", valor: 2250, status: "PENDENTE" },
  { id: 7841, data: "19/07/2025", horaInicio: "07:00", horaFim: "19:00", medico: MEDICOS[8], hospital: "Hospital Vida Nova", setor: "Pediatria", checkinHora: "06:50", checkoutHora: "19:05", valor: 1750, status: "PENDENTE" },
  { id: 7845, data: "20/07/2025", horaInicio: "07:00", horaFim: "19:00", medico: MEDICOS[9], hospital: "Hospital Monte Sinai", setor: "Centro Cirúrgico", checkinHora: "06:57", checkoutHora: "18:59", valor: 1780, status: "PENDENTE" },
];

/* ------------------------------ folha de pagamento --------------------------- */

export type PlantaoFolha = {
  data: string;
  hospital: string;
  setor: string;
  horario: string;
  valor: number;
};

export type MedicoFolha = {
  medico: Medico;
  cadastrado: boolean;
  plantoes: PlantaoFolha[];
};

export const FOLHA_RESUMO = {
  totalMedicos: 24,
  totalPlantoes: 186,
  valorTotal: "R$ 412.380,00",
  valorMedioHora: "R$ 184,60",
  mediaPlantao12h: "R$ 2.215,20",
};

export const FOLHA_MEDICOS: MedicoFolha[] = [
  {
    medico: MEDICOS[0],
    cadastrado: true,
    plantoes: [
      { data: "07/07/2025", hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", horario: "07:00 — 19:00", valor: 1900 },
      { data: "14/07/2025", hospital: "Hospital Santa Helena", setor: "Pronto-Socorro", horario: "07:00 — 19:00", valor: 1900 },
      { data: "18/07/2025", hospital: "Hospital São Lucas", setor: "Enfermaria", horario: "07:00 — 19:00", valor: 1480 },
    ],
  },
  {
    medico: MEDICOS[2],
    cadastrado: true,
    plantoes: [
      { data: "10/07/2025", hospital: "Hospital Santa Helena", setor: "UTI Adulto", horario: "19:00 — 07:00", valor: 2500 },
      { data: "15/07/2025", hospital: "Hospital São Lucas", setor: "Pronto-Socorro", horario: "07:00 — 19:00", valor: 1850 },
    ],
  },
  {
    medico: MEDICOS[1],
    cadastrado: true,
    plantoes: [
      { data: "14/07/2025", hospital: "Hospital Santa Helena", setor: "UTI Adulto", horario: "19:00 — 07:00", valor: 2300 },
      { data: "20/07/2025", hospital: "Hospital Santa Helena", setor: "UTI Adulto", horario: "19:00 — 07:00", valor: 2300 },
    ],
  },
  {
    medico: MEDICOS[4],
    cadastrado: true,
    plantoes: [
      { data: "08/07/2025", hospital: "Hospital Vida Nova", setor: "Pediatria", horario: "07:00 — 13:00", valor: 1100 },
      { data: "16/07/2025", hospital: "Hospital Vida Nova", setor: "Pediatria", horario: "07:00 — 13:00", valor: 1100 },
      { data: "22/07/2025", hospital: "Hospital Vida Nova", setor: "Pediatria", horario: "07:00 — 13:00", valor: 1100 },
    ],
  },
  {
    medico: MEDICOS[3],
    cadastrado: false,
    plantoes: [
      { data: "12/07/2025", hospital: "Hospital Vida Nova", setor: "Centro Cirúrgico", horario: "13:00 — 19:00", valor: 1650 },
      { data: "27/07/2025", hospital: "Hospital Vida Nova", setor: "Centro Cirúrgico", horario: "07:00 — 19:00", valor: 1750 },
    ],
  },
  {
    medico: MEDICOS[7],
    cadastrado: true,
    plantoes: [
      { data: "17/07/2025", hospital: "Hospital Monte Sinai", setor: "UTI Adulto", horario: "19:00 — 07:00", valor: 2600 },
    ],
  },
  {
    medico: MEDICOS[6],
    cadastrado: false,
    plantoes: [
      { data: "18/07/2025", hospital: "Hospital Alto da Serra", setor: "Enfermaria", horario: "07:00 — 19:00", valor: 1500 },
      { data: "25/07/2025", hospital: "Hospital Alto da Serra", setor: "Enfermaria", horario: "07:00 — 19:00", valor: 1500 },
    ],
  },
  {
    medico: MEDICOS[9],
    cadastrado: true,
    plantoes: [
      { data: "20/07/2025", hospital: "Hospital Monte Sinai", setor: "Centro Cirúrgico", horario: "07:00 — 19:00", valor: 1780 },
    ],
  },
];

/* ---------------------------------- calendário ------------------------------- */

export type CalEvento = {
  gradeIdx: number; // index into GRADES
  titulo: string; // nome do médico ou "Vaga Aberta"
  status: VagaStatus;
  pendentes?: number; // candidaturas pendentes
  horario: string;
};

export type CalMes = {
  label: string;
  ano: number;
  mesIndex: number; // 0-based, for new Date(ano, mesIndex, 1)
  diasNoMes: number;
  eventos: Record<number, CalEvento[]>;
};

// Compact spec: [day, gradeIdx, medicoIdx|null, status, pendentes?]
type EvSpec = [number, number, number | null, VagaStatus, number?];

function buildEventos(specs: EvSpec[]): Record<number, CalEvento[]> {
  const out: Record<number, CalEvento[]> = {};
  for (const [dia, gradeIdx, medicoIdx, status, pendentes] of specs) {
    const horario = gradeIdx === 1 || status === "urgente" ? "19:00 — 07:00" : "07:00 — 19:00";
    const titulo = medicoIdx === null ? "Vaga Aberta" : MEDICOS[medicoIdx].nome;
    (out[dia] ??= []).push({ gradeIdx, titulo, status, pendentes, horario });
  }
  return out;
}

export const CAL_MESES: CalMes[] = [
  {
    label: "Junho 2025",
    ano: 2025,
    mesIndex: 5,
    diasNoMes: 30,
    eventos: buildEventos([
      [2, 0, 0, "fechada"], [2, 1, 1, "fechada"],
      [4, 2, 4, "fechada"], [5, 0, 6, "fechada"],
      [9, 3, 3, "fechada"], [9, 0, 0, "fechada"],
      [11, 1, 7, "fechada"], [12, 4, 6, "fechada"],
      [16, 0, 5, "fechada"], [16, 2, 8, "fechada", 1],
      [18, 1, 1, "fechada"], [20, 3, 9, "fechada"],
      [23, 0, 0, "fechada"], [25, 2, 4, "fechada"],
      [27, 1, 2, "fechada"], [30, 0, 6, "fechada"],
    ]),
  },
  {
    label: "Julho 2025",
    ano: 2025,
    mesIndex: 6,
    diasNoMes: 31,
    eventos: buildEventos([
      [1, 0, 0, "fechada"], [1, 1, 1, "fechada"],
      [2, 2, 4, "fechada"], [3, 3, 3, "fechada"], [3, 0, 6, "fechada", 1],
      [4, 1, 2, "fechada"], [7, 0, 0, "fechada"], [7, 4, 6, "fechada"],
      [8, 2, 4, "fechada"], [9, 1, 7, "fechada"], [10, 1, 2, "fechada"],
      [11, 3, 9, "fechada"], [12, 0, 5, "fechada", 2],
      [14, 0, 0, "fechada"], [14, 1, 1, "fechada"],
      [15, 0, 2, "fechada"], [15, 3, 3, "fechada"],
      [16, 2, 4, "fechada"], [17, 1, 7, "fechada"],
      [18, 4, 6, "fechada"], [18, 0, 5, "fechada"],
      [19, 2, 8, "fechada"], [20, 3, 9, "fechada"],
      [21, 0, 0, "fechada"], [21, 1, 1, "fechada"],
      [22, 0, null, "aberta", 2], [22, 2, 4, "fechada"],
      [23, 0, null, "urgente"], [23, 1, 2, "fechada"],
      [24, 2, 4, "fechada"], [24, 3, null, "aberta", 1],
      [25, 1, null, "urgente", 1], [25, 4, 6, "fechada"],
      [26, 4, null, "anunciada"], [26, 0, null, "aberta", 3],
      [27, 3, 3, "fechada"], [28, 4, null, "aberta"],
      [29, 1, 2, "fechada"], [30, 0, 0, "fechada"], [31, 2, 8, "fechada", 1],
    ]),
  },
  {
    label: "Agosto 2025",
    ano: 2025,
    mesIndex: 7,
    diasNoMes: 31,
    eventos: buildEventos([
      [1, 0, null, "anunciada"], [1, 1, null, "anunciada"],
      [4, 0, 0, "fechada"], [5, 2, null, "aberta", 1],
      [6, 3, null, "aberta"], [7, 1, null, "anunciada"],
      [8, 0, 5, "fechada"], [11, 2, 4, "fechada"],
      [12, 0, null, "aberta"], [13, 1, null, "anunciada"],
      [15, 3, 3, "fechada"], [18, 0, null, "aberta"],
      [20, 4, null, "anunciada"], [22, 1, 7, "fechada"],
      [25, 0, null, "aberta"], [27, 2, null, "anunciada"],
    ]),
  },
];

// Index of "Julho 2025" — the month the demo opens on.
export const CAL_MES_INICIAL = 1;

// Today inside the fixed demo timeline (21/07/2025).
export const HOJE = { ano: 2025, mesIndex: 6, dia: 21 };

/* ---------------------------------- helpers ---------------------------------- */

export function formatCurrency(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
