// Shared primitives for the recreated Revoluna app screens.
// Colors and typography mirror the real FlutterFlow theme
// (Geologica + #A369ED primary — the values in app-revoluna's theme file).

import { ComponentType, CSSProperties, ReactNode } from "react";
import {
  Calendar,
  ChevronDown,
  Home,
  MapPin,
  Menu,
  Moon,
  Search,
  Sun,
  Sunrise,
  Sunset,
  Users
} from "lucide-react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const FONT: Record<string, CSSProperties> = {
  display: { fontFamily: "var(--font-geologica), sans-serif", fontWeight: 600 },
  heading: { fontFamily: "var(--font-geologica), sans-serif", fontWeight: 500 },
  body: { fontFamily: "var(--font-geologica), sans-serif", fontWeight: 400 },
};

/* --------------------------------- logo ---------------------------------- */

// The Revoluna mark: a white "moon" with a bite, on the purple circle.
export function RevLogo({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-rev-primary"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="#ffffff" />
        <circle cx="16.5" cy="7.5" r="6" fill="var(--color-rev-primary)" />
      </svg>
    </div>
  );
}

/* -------------------------------- header ---------------------------------- */

export function AppHeader() {
  return (
    <div className="flex items-start justify-between px-5 pt-14">
      <div className="flex items-center gap-3">
        <RevLogo />
        <div className="flex flex-col">
          <span className="text-rev-muted" style={{ ...FONT.body, fontSize: 12 }}>
            Bem vindo,
          </span>
          <span className="text-rev-text" style={{ ...FONT.display, fontSize: 16 }}>
            Revoluna
          </span>
          <span className="mt-0.5 flex items-center gap-1">
            <MapPin size={13} className="text-rev-tertiary" />
            <span className="text-rev-text/80" style={{ ...FONT.body, fontSize: 12 }}>
              São Paulo
            </span>
            <ChevronDown size={12} className="text-rev-tertiary" />
          </span>
        </div>
      </div>
      <Menu size={26} className="mt-1 text-rev-primary" strokeWidth={2.5} />
    </div>
  );
}

export function ScreenTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="px-5 pt-4 text-rev-primary"
      style={{ ...FONT.heading, fontSize: 22 }}
    >
      {children}
    </h2>
  );
}

/* -------------------------------- tab bar ---------------------------------- */

const TABS = [
  { id: "home", Icon: Home },
  { id: "explore", Icon: Search },
  { id: "escalas", Icon: Calendar },
  { id: "plantoes", Icon: Users },
] as const;

export function TabBar({ active }: { active: (typeof TABS)[number]["id"] }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-rev-border/60 bg-white/95 px-6 pb-7 pt-3 backdrop-blur">
      {TABS.map(({ id, Icon }) => (
        <Icon
          key={id}
          size={24}
          strokeWidth={2}
          className={id === active ? "text-rev-primary" : "text-[#C7C7CC]"}
        />
      ))}
    </div>
  );
}

/* ---------------------------- hospital avatar ------------------------------ */

// Os logos reais dos hospitais do app, como estão no Figma do produto:
// tiles completos de 70×70 com fundo e cantos embutidos no próprio asset,
// então o avatar só os renderiza no tamanho pedido. Hospitais sem logo
// (dados de apoio) caem no tile de iniciais.
const HOSPITAL_LOGOS: Record<string, string> = {
  BP: "/img/revoluna/hospitals/bp.svg",
  CG: "/img/revoluna/hospitals/cristovao.svg",
  SL: "/img/revoluna/hospitals/sirio.svg",
  NJ: "/img/revoluna/hospitals/novedejulho.svg",
  AS: "/img/revoluna/hospitals/assuncao.svg",
};

export function HospitalAvatar({
  initials,
  rounded = 12,
}: {
  initials: string;
  className?: string;
  rounded?: number;
}) {
  const logo = HOSPITAL_LOGOS[initials];
    return (
      // eslint-disable-next-line @next/next/no-img-element -- asset estático local
      <img
        src={logo}
        alt=""
        aria-hidden
        loading="lazy"
        className="w-[13dvw] md:w-[6dvw] lg:w-[3dvw] xl:w-[4dvw]"
        style={{ borderRadius: rounded }}
      />
    );
}

/* --------------------------------- turno ----------------------------------- */

// Os cinco turnos do app, cada um com seu ícone: sol (diurno), lua
// (noturno), sol nascente, sol poente — e a varinha mágica do turno
// "Cinderela", o plantão que acaba à meia-noite.
export type Turno = "diurno" | "noturno" | "nascente" | "poente" | "cinderela";

// A varinha de fada, com a estrelinha na ponta — não a de ilusionista.
// A lucide não tem essa; desenhada no traço da própria lucide.
function WandStar({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 20 14 10.5" />
      <path
        d="M17 3.5 18.1 6.4 21 7.5 18.1 8.6 17 11.5 15.9 8.6 13 7.5 15.9 6.4 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

type TurnoGlyph = ComponentType<{ size?: number; className?: string }>;

export const TURNOS: Record<Turno, { Icon: TurnoGlyph; label: string }> = {
  diurno: { Icon: Sun, label: "Diurno" },
  noturno: { Icon: Moon, label: "Noturno" },
  nascente: { Icon: Sunrise, label: "Manhã" },
  poente: { Icon: Sunset, label: "Tarde" },
  cinderela: { Icon: WandStar, label: "Cinderela" },
};

export function TurnoIcon({
  turno = "diurno",
  size = 11,
  className = "text-rev-primary",
}: {
  turno?: Turno;
  size?: number;
  className?: string;
}) {
  const { Icon } = TURNOS[turno];
  return <Icon size={size} className={className} />;
}

/* --------------------------------- button ---------------------------------- */

export function RevButton({
  children,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "disabled";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex h-12 items-center justify-center rounded-xl text-center",
        variant === "primary" && "bg-rev-primary text-white",
        variant === "disabled" && "bg-rev-border text-rev-muted",
        className
      )}
      style={{ ...FONT.heading, fontSize: 15 }}
    >
      {children}
    </div>
  );
}
