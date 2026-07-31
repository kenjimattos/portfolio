// Shared primitives for the recreated Revoluna app screens.
// Colors and typography mirror the real FlutterFlow theme
// (Geologica + #A369ED primary — the values in app-revoluna's theme file).

import { CSSProperties, ReactNode } from "react";
import {
  Calendar,
  ChevronDown,
  Clock,
  Home,
  MapPin,
  Menu,
  Search,
  Sun,
  Users,
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

export function HospitalAvatar({
  initials,
  gradient,
  size = 52,
  rounded = 12,
}: {
  initials: string;
  gradient: string;
  size?: number;
  rounded?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center text-white"
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: gradient,
        ...FONT.display,
        fontSize: size * 0.32,
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

/* ------------------------------- shift card -------------------------------- */

export type Shift = {
  id: string;
  specialty: string;
  hospital: string;
  initials: string;
  gradient: string;
  distance: string;
  date: string;
  value: string;
  sector: string;
  published: string;
  cashUpfront?: boolean;
};

export function ShiftCard({ shift }: { shift: Shift }) {
  return (
    <div className="flex items-center gap-3.5 border-b border-rev-tint px-5 py-4">
      <HospitalAvatar initials={shift.initials} gradient={shift.gradient} />
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
          <Sun size={11} className="text-rev-primary" /> · {shift.sector} ·{" "}
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
