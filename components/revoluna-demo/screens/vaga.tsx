// Static recreation of the Revoluna shift-detail bottom sheet
// ("vaga_bottom_sheet" in the real app): title/value, hospital, schedule,
// quick actions, info accordions and the apply CTA.

import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  HandCoins,
  Heart,
  RefreshCw,
  Send,
  Sun,
  Users,
} from "lucide-react";
import { DETAIL_ACCORDIONS, DETAIL_SHIFT } from "../data";
import { FONT, HospitalAvatar, RevButton } from "../ui";

const ACTIONS = [
  { label: "Ver\ndepois", Icon: Heart },
  { label: "Salvar na\nagenda", Icon: Calendar },
  { label: "Compartilhar\nVaga", Icon: Send },
  { label: "Passar\nplantão", Icon: HandCoins },
];

export function VagaScreen() {
  const s = DETAIL_SHIFT;
  return (
    <div className="relative flex h-full flex-col bg-white">
      {/* sheet drag handle */}
      <div className="flex justify-center pt-16" aria-hidden>
        <div className="h-1.25 w-14 rounded-full bg-rev-text/80" />
      </div>

      <div className="flex-1 overflow-hidden px-5 pt-5">
        <h2 className="text-rev-text" style={{ ...FONT.display, fontSize: 24 }}>
          {s.specialty}
        </h2>
        <p className="text-rev-text" style={{ ...FONT.display, fontSize: 22 }}>
          {s.value}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <HospitalAvatar initials={s.initials} gradient={s.gradient} size={44} rounded={10} />
          <span className="text-rev-text" style={{ ...FONT.heading, fontSize: 17 }}>
            {s.hospital}
          </span>
        </div>

        <div className="mt-5 border-t border-rev-border/70 pt-4">
          <p className="text-rev-text" style={{ ...FONT.display, fontSize: 15 }}>
            {s.weekday}
          </p>
          <p className="mt-1.5 text-rev-text" style={{ ...FONT.body, fontSize: 14 }}>
            <span style={FONT.display}>Início:</span> {s.start}{" "}
            <span className="ml-4" style={FONT.display}>
              Fim:
            </span>{" "}
            {s.end}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-rev-text" style={{ ...FONT.body, fontSize: 14 }}>
            <Sun size={15} className="text-rev-primary" /> {s.turno}
            <span className="mx-1 text-rev-muted">·</span>
            <RefreshCw size={14} className="text-rev-tertiary" /> {s.tipo}
          </p>
          <p className="mt-1.5 text-rev-text" style={{ ...FONT.body, fontSize: 14 }}>
            <span style={FONT.display}>Setor:</span> {s.sector}
          </p>
        </div>

        <div className="mt-4 border-t border-rev-border/70 pt-4">
          <p className="flex items-center gap-2 text-rev-text/85" style={{ ...FONT.body, fontSize: 13 }}>
            <Clock size={15} className="text-rev-tertiary" /> {s.published}
          </p>
          <p className="mt-2 flex items-center gap-2 text-rev-text/85" style={{ ...FONT.body, fontSize: 13 }}>
            <Users size={15} className="text-rev-tertiary" /> {s.candidates}
          </p>
        </div>

        {/* quick actions */}
        <div className="mt-5 flex items-start justify-between border-t border-rev-border/70 px-1 pt-5">
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

        {/* accordions */}
        <div className="mt-4">
          {DETAIL_ACCORDIONS.map(({ label, open, body }) => (
            <div key={label} className="border-t border-rev-border/70 py-3.5">
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
              {open && body && (
                <p className="mt-2 text-rev-text/75" style={{ ...FONT.body, fontSize: 13 }}>
                  {body}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute inset-x-0 bottom-0 bg-white/95 px-5 pb-10 pt-3 backdrop-blur">
        <RevButton>Candidatar-se</RevButton>
      </div>
    </div>
  );
}
