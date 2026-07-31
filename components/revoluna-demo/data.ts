// Fictional dataset for the recreated Revoluna screens. Structure and
// PT-BR labels mirror the real app; hospitals, values and people are dummies.

import type { Shift } from "./ui";

/* --------------------------------- shifts ---------------------------------- */

const GRAD = {
  gold: "linear-gradient(135deg, #C9A45C, #8A6A2F)",
  wine: "linear-gradient(135deg, #B0356B, #5E1B3A)",
  teal: "linear-gradient(135deg, #2FB1A5, #14615B)",
  navy: "linear-gradient(135deg, #4A6FD4, #22367A)",
};

export const SHIFTS: Shift[] = [
  {
    id: "s1",
    specialty: "Anestesiologia",
    hospital: "Santa Sara Day Hospital",
    initials: "SS",
    gradient: GRAD.gold,
    distance: "22 km",
    date: "10/07",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 2 dias",
    cashUpfront: true,
  },
  {
    id: "s2",
    specialty: "Anestesiologia",
    hospital: "Hospital Ibirapuera",
    initials: "HI",
    gradient: GRAD.wine,
    distance: "15 km",
    date: "18/07",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 8 dias",
  },
  {
    id: "s3",
    specialty: "Anestesiologia",
    hospital: "Cirurgia Center",
    initials: "CC",
    gradient: GRAD.teal,
    distance: "18 km",
    date: "16/07",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 8 dias",
  },
  {
    id: "s4",
    specialty: "Clínica Médica",
    hospital: "Hospital Vila Mariana",
    initials: "VM",
    gradient: GRAD.navy,
    distance: "9 km",
    date: "20/07",
    value: "R$ 1.400,00",
    sector: "Pronto-Socorro",
    published: "há 1 dia",
  },
];

/* ------------------------------ shift detail -------------------------------- */

export const DETAIL_SHIFT = {
  specialty: "Anestesiologia",
  value: "R$ 2.000,00",
  hospital: "Cirurgia Center",
  initials: "CC",
  gradient: GRAD.teal,
  weekday: "quarta-feira, 16/07/2025",
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
    hospital: "Hospital Ibirapuera",
    initials: "HI",
    gradient: GRAD.wine,
    distance: "15 km",
    date: "02/07",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 6 dias",
  },
  {
    id: "c2",
    specialty: "Anestesiologia",
    hospital: "Cirurgia Center",
    initials: "CC",
    gradient: GRAD.teal,
    distance: "18 km",
    date: "16/07",
    value: "R$ 2.000,00",
    sector: "Centro Cirúrgico",
    published: "há 8 dias",
  },
];
