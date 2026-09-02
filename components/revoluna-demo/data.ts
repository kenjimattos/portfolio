// Fictional dataset for the recreated Revoluna screens. Structure and
// PT-BR labels mirror the real app; hospitals, values and people are dummies.

import type { Shift } from "./vaga-components";

/* --------------------------------- shifts ---------------------------------- */

/* Os hospitais são os reais do app, com os dados dos cards do próprio
   Figma (especialidade, valor, data); distâncias e setores são de apoio. */
export const SHIFTS: Shift[] = [
  {
    id: "s1",
    turno: "diurno",
    specialty: "Anestesiologia",
    hospital: "Beneficência Portuguesa",
    initials: "BP",
    distance: "6 km",
    date: "12/02",
    value: "R$ 2.300,00",
    sector: "Centro Cirúrgico",
    published: "há 2 dias",
    cashUpfront: true,
  },
  {
    id: "s2",
    turno: "noturno",
    specialty: "Clínica Médica",
    hospital: "Cristóvão da Gama",
    initials: "CG",
    distance: "8 km",
    date: "25/02",
    value: "R$ 1.500,00",
    sector: "Pronto Atendimento",
    published: "há 1 dia",
  },
  {
    id: "s3",
    turno: "nascente",
    specialty: "Ortopedia e Traumatologia",
    hospital: "Sírio Libanês",
    initials: "SL",
    distance: "7 km",
    date: "25/02",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 1 semana",
  },
  {
    id: "s4",
    turno: "poente",
    specialty: "Cardiologia",
    hospital: "Nove de Julho",
    initials: "NJ",
    distance: "9 km",
    date: "03/03",
    value: "R$ 2.500,00",
    sector: "Unidade Coronariana",
    published: "há 3 dias",
  },
  {
    id: "s5",
    turno: "cinderela",
    specialty: "Pediatria",
    hospital: "Hospital Assunção",
    initials: "AS",
    distance: "12 km",
    date: "25/02",
    value: "R$ 1.200,00",
    sector: "Pronto Socorro",
    published: "Ontem",
  }
];

/* ------------------------------ shift detail -------------------------------- */

export const DETAIL_SHIFT = {
  specialty: "Anestesiologia",
  value: "R$ 2.300,00",
  hospital: "Hosp. Beneficência Portuguesa",
  initials: "BP",
  weekday: "quarta-feira, 12/02/2025",
  start: "08:00",
  end: "20:00",
  turno: "Diurno",
  tipo: "Cobertura",
  sector: "Centro Cirúrgico",
  published: "Publicada há 8 dias",
  candidates: "Ainda não há candidatos, seja o primeiro!",
};

export const DETAIL_ACCORDIONS = [
  { label: "Requisitos", open: true, body: "Não foram listados requisitos" },
  { label: "Como chegar?", open: false },
  { label: "Sobre o pagamento", open: false },
  { label: "Tem benefícios?", open: false },
  { label: "Quem está contratando?", open: false },
];

/* -------------------------------- calendar ---------------------------------- */

// julho de 2025 — grid starts on Sunday (dom.). July 1st is a Tuesday.
export const CAL_MONTH = "julho de 2025";
export const CAL_WEEKDAYS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

export type CalDay = {
  day: number;
  outside?: boolean;
  selected?: boolean;
  dot?: "purple" | "red" | "yellow";
};

// Weekly Wednesday shifts (purple), two canceled (red), one pending (yellow).
export const CAL_DAYS: CalDay[] = [
  { day: 29, outside: true },
  { day: 30, outside: true },
  { day: 1 },
  { day: 2, selected: true, dot: "purple" },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9, dot: "purple" },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14, dot: "yellow" },
  { day: 15 },
  { day: 16, dot: "purple" },
  { day: 17, dot: "red" },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23, dot: "purple" },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28, dot: "red" },
  { day: 29 },
  { day: 30, dot: "purple" },
  { day: 31 },
  { day: 1, outside: true },
  { day: 2, outside: true },
];

export const DAY_SCHEDULE = {
  hospital: "Hospital Ibirapuera",
  sector: "Centro Cirúrgico",
  colleagues: [
    { name: "Marina Duarte", start: "07:00", end: "19:00", hue: "#B0356B" },
    { name: "Rafael Pires", start: "07:00", end: "19:00", hue: "#2FB1A5" },
  ],
};

/* ------------------------------ notifications -------------------------------- */

export const LOCK_NOTIFICATIONS = [
  {
    title: "Chegou a hora do plantão!",
    body: "Você está a menos de 100 m do hospital. Toque para fazer o check-in.",
    when: "agora",
  },
  {
    title: "Plantão encerrado!",
    body: "Entre em contato para realizar seu recebimento em até 24h",
    when: "agora",
  },
];

/* ------------------------------ meus plantões -------------------------------- */

export const PLANTOES_TABS = ["Salvos", "Em análise", "Confirmados"] as const;

export const CONFIRMED_SHIFTS: Shift[] = [
  {
    id: "c1",
    specialty: "Anestesiologia",
    hospital: "Beneficência Portuguesa",
    initials: "BP",
    distance: "6 km",
    date: "12/02",
    value: "R$ 2.300,00",
    sector: "Centro Cirúrgico",
    published: "há 2 dias",
  },
  {
    id: "c2",
    specialty: "Anestesiologia",
    hospital: "Nove de Julho",
    initials: "NJ",
    distance: "9 km",
    date: "03/03",
    value: "R$ 2.500,00",
    sector: "Unidade Coronariana",
    published: "há 3 dias",
  },
];
