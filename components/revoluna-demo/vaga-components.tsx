// Os corpos dos acordeões da vaga, compartilhados entre o exhibit do case
// e a página do design system. O "Como chegar?" reproduz o item real do
// app: o recorte de mapa (desenhado em SVG, como o mapa do check-in — nada
// é screenshot), o endereço com cópia e a fileira "Chegue mais rápido"
// com os atalhos de navegação que o app realmente mostrava.

import { Calendar, ChevronDown, ChevronUp, Clock, Copy, HandCoins, Heart, MapPin, Send } from "lucide-react";
import { FONT, HospitalAvatar, Turno, TurnoIcon } from "./ui";
import { ReactNode } from "react";

/* ------------------------------- shift card -------------------------------- */

export type Shift = {
  id: string;
  specialty: string;
  hospital: string;
  initials: string;
  distance: string;
  date: string;
  value: string;
  sector: string;
  published: string;
  turno?: Turno;
  cashUpfront?: boolean;
};

export function ShiftCard({ shift }: { shift: Shift }) {
  return (
    <div className="flex items-center gap-3.5 border-b border-rev-tint px-5 py-4">
      <HospitalAvatar initials={shift.initials} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-rev-text" style={{ ...FONT.display, fontSize: 15 }}>
          {shift.specialty}
        </span>
        <span className="flex items-center gap-1 text-rev-text/75" style={{ ...FONT.body, fontSize: 12 }}>
          {shift.hospital}
          <MapPin size={12} className="shrink-0 text-rev-tertiary" />
          {shift.distance}
        </span>
        <span className="text-rev-text" style={{ ...FONT.heading, fontSize: 14 }}>
          {shift.date} · {shift.value}
        </span>
        <span className="flex items-center gap-1 text-rev-muted" style={{ ...FONT.body, fontSize: 11 }}>
          <TurnoIcon turno={shift.turno} /> · {shift.sector} ·{" "}
          <Clock size={11} className="text-rev-tertiary" /> {shift.published}
        </span>
      </div>
      {shift.cashUpfront && (
        <div className="flex flex-col items-center gap-1 self-start pt-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rev-tint text-rev-primary" style={{ fontSize: 13, ...FONT.display }}>
            !
          </span>
          <span className="text-rev-text/70" style={{ ...FONT.body, fontSize: 10 }}>
            À vista
          </span>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- accordion --------------------------------- */

// The info accordion from the shift-detail sheet: label, purple chevron,
// and the body only when open. Used by the vaga screen and by the design
// system exhibit — same component, not a redrawing.
export function VagaAccordion({
  label,
  open,
  children,
}: {
  label: string;
  open?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="border-t border-rev-border/70 py-3.5">
      <div className="flex items-center justify-between">
        <span className="text-rev-text" style={{ ...FONT.display, fontSize: 15 }}>
          {label}
        </span>
        {open ? (
          <ChevronUp size={18} className="text-rev-primary" />
        ) : (
          <ChevronDown size={18} className="text-rev-primary" />
        )}
      </div>
      {open && children ? (
        <div className="mt-2 text-rev-text/75" style={{ ...FONT.body, fontSize: 13 }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------- quick actions ---------------------------- */

export function VagaQuickActions() {
  const ACTIONS = [
    { label: "Ver\ndepois", Icon: Heart },
    { label: "Salvar na\nagenda", Icon: Calendar },
    { label: "Compartilhar\nVaga", Icon: Send },
    { label: "Passar\nplantão", Icon: HandCoins },
  ];

  return (
          <div className="flex justify-between w-full">
          {ACTIONS.map(({ label, Icon }) => (
            <div key={label} className="flex w-16 flex-col items-center gap-1.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rev-tint">
                <Icon size={20} className="text-rev-primary" strokeWidth={1.8} />
              </div>
              <span
                className="whitespace-pre-line text-center text-rev-text/80"
                style={{ ...FONT.body, fontSize: 11, lineHeight: 1.25 }}
              >
                {label}
              </span>
            </div>
          ))} 
        </div>
  )
}

/* ------------------------------- mapa ------------------------------------- */

/* O quarteirão da República, à mão: quadras bege, ruas brancas, as avenidas
   com fio verde do Google Maps, o metrô, o POI e o pin roxo do app. */
function MapSnippet() {
  const label = {
    fontSize: 10.5,
    fill: "#9A958C",
    fontFamily: "var(--font-geologica), sans-serif",
  } as const;
  return (
    <svg viewBox="0 0 360 230" className="h-auto w-full rounded-lg" aria-hidden>
      <rect width="360" height="230" fill="#F2EFE9" />
      {/* quadras */}
      {[
        [-20, 10, 110, 80],
        [-30, 110, 100, 90],
        [100, 120, 90, 100],
        [110, 10, 100, 70],
        [230, 10, 120, 60],
        [280, 90, 90, 70],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill={i % 2 ? "#EFEBE3" : "#EAE6DE"} />
      ))}
      {/* parque */}
      <rect x="286" y="168" width="90" height="70" rx="10" fill="#DCEBD3" />

      {/* ruas horizontais */}
      {[52, 100, 148].map((y) => (
        <rect key={y} x="-10" y={y} width="220" height="11" fill="#ffffff" />
      ))}
      {/* Av. Ipiranga: diagonal com fio verde */}
      <path d="M -20 216 L 380 84" stroke="#ffffff" strokeWidth="20" fill="none" />
      <path d="M -20 207 L 380 75" stroke="#8FCB8F" strokeWidth="2.4" fill="none" />
      <path d="M -20 225 L 380 93" stroke="#8FCB8F" strokeWidth="2.4" fill="none" />
      {/* Av. São Luís: desce à direita */}
      <path d="M 292 230 L 258 60" stroke="#ffffff" strokeWidth="16" fill="none" />
      <path d="M 285 230 L 251 60" stroke="#8FCB8F" strokeWidth="2.2" fill="none" />
      {/* ligação amarela do largo */}
      <path d="M 208 60 Q 240 66 262 58" stroke="#F6D678" strokeWidth="10" fill="none" />

      {/* nomes de rua */}
      <text x="18" y="46" style={label}>
        R. Marquês de Itu
      </text>
      <text x="24" y="94" style={label}>
        Rua Gen. Jardim
      </text>
      <text x="14" y="142" style={label}>
        R. Maj. Sertório
      </text>
      <text x="84" y="196" style={label} transform="rotate(-18 84 196)">
        Av. Ipiranga
      </text>
      <text x="284" y="150" style={label} transform="rotate(78 284 150)">
        Av. São Luís
      </text>

      {/* metrô República */}
      <g transform="translate(206 22)">
        <rect width="22" height="22" rx="5" fill="#2B5FA5" />
        <path d="M11 4 L18 11 L11 18 L4 11 Z" fill="#ffffff" />
        <path d="M11 7.2 L14.8 11 L11 14.8 L7.2 11 Z" fill="#2B5FA5" />
        <circle cx="33" cy="11" r="10" fill="#F2C433" />
        <path d="M33 4.5 A6.5 6.5 0 0 1 33 17.5" fill="#ffffff" />
        <text x="48" y="16" fontSize="13" fontWeight="700" fill="#5A554C" fontFamily="var(--font-geologica), sans-serif">
          República
        </text>
      </g>

      {/* POI Terraço Itália */}
      <circle cx="212" cy="124" r="7" fill="#E8985E" />
      <circle cx="212" cy="124" r="3" fill="#ffffff" />
      <text x="224" y="128" style={label}>
        Terraço Itália
      </text>

      {/* pin do app */}
      <g transform="translate(192 96)">
        <path
          d="M0 -30 C 14 -30 23 -21 23 -8 C 23 7 0 26 0 26 C 0 26 -23 7 -23 -8 C -23 -21 -14 -30 0 -30 Z"
          fill="var(--color-rev-primary)"
        />
        <circle cx="0" cy="-9" r="8" fill="#7E3CD0" />
      </g>

      {/* marca d'água + localizar */}
      <text x="12" y="220" fontSize="15" fontWeight="700" fill="#8A8578" opacity="0.8" fontFamily="Arial, sans-serif">
        Google
      </text>
      <g transform="translate(322 192)">
        <circle r="20" fill="#ffffff" />
        <circle r="6.5" fill="none" stroke="#6B6B6B" strokeWidth="2" />
        <path d="M0 -12 V-7 M0 7 V12 M-12 0 H-7 M7 0 H12" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ------------------------- atalhos de navegação ----------------------------- */

/* A fileira real de apps de chegada, com os ícones salvos do próprio
   design: Waze, Google, Uber e 99. Alturas ajustadas à mão para os
   quatro terem o mesmo peso visual, como no app. */
const NAV_ICONS = [
  { src: "waze.svg", alt: "Waze", h: 28 },
  { src: "google.svg", alt: "Google Maps", h: 25 },
  { src: "uber.svg", alt: "Uber", h: 17 },
  { src: "99.svg", alt: "99", h: 22 },
];

function NavGlyphs() {
  return (
    <div className="flex items-center gap-6">
      {NAV_ICONS.map(({ src, alt, h }) => (
        // eslint-disable-next-line @next/next/no-img-element -- asset estático local
        <img
          key={src}
          src={`/img/revoluna/ds/${src}`}
          alt={alt}
          loading="lazy"
          className="w-auto"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- corpos ----------------------------------- */

export function ComoChegarBody() {
  return (
    <div className="flex flex-col gap-4">
      <MapSnippet />
      <p style={{ ...FONT.body, fontSize: 13.5, lineHeight: 1.6 }}>
        <span className="text-rev-text" style={FONT.display}>
          Endereço:
        </span>{" "}
        <span className="text-rev-text/85 underline decoration-rev-text/40 underline-offset-2">
          Av. Ipiranga, 344 - Centro - São Paulo - SP, 01046-010
        </span>{" "}
        <Copy size={13} className="inline text-rev-tertiary" />
      </p>
      <div className="flex flex-col gap-2.5 pb-2">
        <p className="text-rev-text" style={{ ...FONT.display, fontSize: 14 }}>
          Chegue mais rápido:
        </p>
        <NavGlyphs />
      </div>
    </div>
  );
}

export function PagamentoBody() {
  return (
    <ul className="flex list-disc flex-col gap-1 pl-4">
      <li>
        Em 60 dias ·{" "}
        <span className="text-rev-tertiary underline decoration-rev-tertiary/50">
          clique aqui para antecipar
        </span>
      </li>
      <li>
        PIX Pessoa Jurídica ·{" "}
        <span className="text-rev-tertiary underline decoration-rev-tertiary/50">
          ainda não tem CNPJ?
        </span>
      </li>
      <li>Hora Extra: R$ 500,00</li>
    </ul>
  );
}
