"use client";

// Scripted recreation of the Houston schedule builder (Grades page).
// Shows the full hierarchy from the real screen: hospital tabs, a grade card
// with its weekly strip (Monday open for editing — its pills update live as
// slots are created), the 24h day editor driven by a ghost cursor, and a
// second grade card in view mode. Conflict detection is the real overlap
// check; only the driver is scripted.
// Fixed design width (1140) — cursor waypoints are precomputed px.

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Copy, Pencil, TriangleAlert } from "lucide-react";
import { cx, HButton } from "@/components/houston-demo/ui";
import { prefersReducedMotion } from "@/lib/motion";

/* ------------------------------- constants ------------------------------- */

const PURPLE = "#8B5CFF";
const GREEN = "#10B981";
const BASE_HOUR = 7; // editor grid starts at 07h, 24 columns
const WRAP_W = 1108; // panel designWidth 1140 - 2*16 panel padding
const CARD_PAD = 20;
const GRID_W = WRAP_W - CARD_PAD * 2;
const HOUR_W = GRID_W / 24;

// vertical anatomy (px, from the top of the wrapper)
const TABS_BLOCK = 52; // tabs row 40 + 12 gap
const HEADER_BLOCK = 56; // card header 40 + 16 gap
const WEEK_LABEL_BLOCK = 32; // chip row 24 + 8 gap
const WEEK_STRIP_BLOCK = 122; // day cards 108 + 14 gap
const EDIT_LABEL_BLOCK = 26; // "Editando" label 20 + 6 gap
const HOUR_HEADER_H = 28;
const ROW_H = 80;
const ROWS_TOP =
  TABS_BLOCK + CARD_PAD + HEADER_BLOCK + WEEK_LABEL_BLOCK + WEEK_STRIP_BLOCK + EDIT_LABEL_BLOCK + HOUR_HEADER_H;

const CURSOR_MOVE_MS = 900;

const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

function hourLabel(idx: number) {
  return `${String((BASE_HOUR + idx) % 24).padStart(2, "0")}h`;
}

function cellX(idx: number) {
  return CARD_PAD + idx * HOUR_W;
}

function rowY(row: number) {
  return ROWS_TOP + row * ROW_H + ROW_H / 2;
}

/* --------------------------------- types --------------------------------- */

type Slot = {
  id: number;
  row: number;
  start: number; // hour index, 0..23
  end: number;
  resizing?: boolean;
};

type Preview = { row: number; start: number; end: number } | null;

type Toast = { kind: "error" | "success"; title: string; detail: string } | null;

const INITIAL_SLOTS: Slot[] = [{ id: 1, row: 0, start: 0, end: 6 }]; // 07h–13h

const overlaps = (a: { start: number; end: number }, b: { start: number; end: number }) =>
  a.start < b.end && a.end > b.start;

/* ------------------------------ small pieces ------------------------------ */

function SlotPill({ label, count, color }: { label: string; count: string; color: string }) {
  return (
    <div
      className="flex items-center justify-between rounded px-1.5 text-[10px] leading-5"
      style={{ backgroundColor: `${color}1f`, border: `1px solid ${color}66` }}
    >
      <span>{label}</span>
      <span className="opacity-60">{count}</span>
    </div>
  );
}

function DayCard({
  dia,
  pills,
  color,
  highlighted,
}: {
  dia: string;
  pills: { label: string; count: string }[];
  color: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-lg p-1.5"
      style={{
        border: `1px solid ${color}`,
        height: 108,
        boxShadow: highlighted ? `0 0 0 2px ${color}55` : undefined,
        backgroundColor: highlighted ? `${color}0d` : undefined,
      }}
    >
      <span className="text-center text-xs font-normal">{dia}</span>
      {pills.length === 0 ? (
        <span className="mt-4 text-center text-[10px] text-hst-muted">Sem plantões</span>
      ) : (
        pills.map((p) => <SlotPill key={p.label} label={p.label} count={p.count} color={color} />)
      )}
    </div>
  );
}

function GradeHeader({
  color,
  nome,
  especialidade,
  setor,
  publishPressed,
}: {
  color: string;
  nome: string;
  especialidade: string;
  setor: string;
  publishPressed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between" style={{ height: 40 }}>
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <span className="whitespace-nowrap text-lg font-normal">{nome}</span>
        <span className="whitespace-nowrap text-sm text-hst-muted">
          <span className="font-normal text-hst-fg">Especialidade:</span> {especialidade} ·{" "}
          <span className="font-normal text-hst-fg">Setor:</span> {setor}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <HButton
          variant="outline"
          size="sm"
          className={cx(publishPressed && "bg-hst-primary/10 border-hst-primary")}
        >
          <CalendarCheck />
          Publicar
        </HButton>
        <HButton variant="outline" size="sm">
          <Copy />
          Duplicar
        </HButton>
        <HButton variant="outline" size="sm">
          <Pencil />
          Editar
        </HButton>
      </div>
    </div>
  );
}

/* -------------------------------- component ------------------------------- */

export function ScheduleBuilderEmbed() {
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS);
  const [preview, setPreview] = useState<Preview>(null);
  const [cursor, setCursor] = useState({ x: WRAP_W - 200, y: ROWS_TOP + 180 });
  const [pressed, setPressed] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [publishPressed, setPublishPressed] = useState(false);
  const [animate, setAnimate] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  const previewConflict =
    preview !== null && slots.some((s) => s.row === preview.row && overlaps(preview, s));

  useEffect(() => {
    if (prefersReducedMotion()) {
      setSlots([
        { id: 1, row: 0, start: 0, end: 6 },
        { id: 2, row: 0, start: 7, end: 14 },
        { id: 3, row: 1, start: 10, end: 16 },
      ]);
      return;
    }

    setAnimate(true);
    const signal = { cancelled: false };

    const el = containerRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.2 }
    );
    if (el) io.observe(el);

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const waitVisible = async () => {
      while (!visibleRef.current && !signal.cancelled) await sleep(300);
    };

    const run = async () => {
      await sleep(600);

      while (!signal.cancelled) {
        await waitVisible();
        if (signal.cancelled) return;

        /* reset */
        setSlots(INITIAL_SLOTS);
        setPreview(null);
        setToast(null);
        setPressed(false);
        setCursor({ x: WRAP_W - 200, y: ROWS_TOP + 180 });
        await sleep(900);

        /* 1 — drag to create 14h–19h on row 0 */
        setCursor({ x: cellX(7), y: rowY(0) });
        await sleep(CURSOR_MOVE_MS + 150);
        setPressed(true);
        setPreview({ row: 0, start: 7, end: 8 });
        await sleep(220);
        setCursor({ x: cellX(12), y: rowY(0) });
        setPreview({ row: 0, start: 7, end: 12 });
        await sleep(CURSOR_MOVE_MS + 120);
        setPressed(false);
        setPreview(null);
        setSlots((prev) => [...prev, { id: 2, row: 0, start: 7, end: 12 }]);
        await sleep(900);

        /* 2 — resize the new block to 21h by its right edge */
        setCursor({ x: cellX(12) - 4, y: rowY(0) });
        await sleep(500);
        setPressed(true);
        setSlots((prev) => prev.map((s) => (s.id === 2 ? { ...s, resizing: true } : s)));
        await sleep(200);
        setCursor({ x: cellX(14) - 4, y: rowY(0) });
        setSlots((prev) => prev.map((s) => (s.id === 2 ? { ...s, end: 14 } : s)));
        await sleep(CURSOR_MOVE_MS);
        setPressed(false);
        setSlots((prev) => prev.map((s) => (s.id === 2 ? { ...s, resizing: false } : s)));
        await sleep(900);

        /* 3 — conflicting attempt on row 0 (11h–16h) → rejected */
        setCursor({ x: cellX(4), y: rowY(0) });
        await sleep(CURSOR_MOVE_MS + 120);
        setPressed(true);
        setPreview({ row: 0, start: 4, end: 5 });
        await sleep(220);
        setCursor({ x: cellX(9), y: rowY(0) });
        setPreview({ row: 0, start: 4, end: 9 });
        await sleep(CURSOR_MOVE_MS + 250);
        setPressed(false);
        setPreview(null);
        setToast({
          kind: "error",
          title: "Conflito de horário",
          detail: "O intervalo 11h – 16h sobrepõe plantões existentes nesta linha.",
        });
        await sleep(1900);
        setToast(null);
        await sleep(300);

        /* 4 — create on the second row instead (17h–23h, parallel allowed) */
        setCursor({ x: cellX(10), y: rowY(1) });
        await sleep(CURSOR_MOVE_MS + 120);
        setPressed(true);
        setPreview({ row: 1, start: 10, end: 11 });
        await sleep(220);
        setCursor({ x: cellX(16), y: rowY(1) });
        setPreview({ row: 1, start: 10, end: 16 });
        await sleep(CURSOR_MOVE_MS + 120);
        setPressed(false);
        setPreview(null);
        setSlots((prev) => [...prev, { id: 3, row: 1, start: 10, end: 16 }]);
        await sleep(900);

        /* 5 — publish */
        setCursor({ x: WRAP_W - 250, y: TABS_BLOCK + CARD_PAD + 20 });
        await sleep(CURSOR_MOVE_MS + 150);
        setPressed(true);
        setPublishPressed(true);
        await sleep(220);
        setPressed(false);
        setPublishPressed(false);
        setToast({
          kind: "success",
          title: "Grade publicada",
          detail: "26 plantões gerados para o período selecionado.",
        });
        await sleep(2100);
        setToast(null);
        await sleep(700);
      }
    };

    run();

    return () => {
      signal.cancelled = true;
      io.disconnect();
    };
  }, []);

  // Monday's mini-card mirrors the editor state live.
  const mondayPills = [...slots]
    .sort((a, b) => a.row - b.row || a.start - b.start)
    .map((s) => ({ label: `${hourLabel(s.start)}-${hourLabel(s.end)}`, count: "0/1" }));

  const weekdayPills = [{ label: "07h-19h", count: "0/11" }, { label: "19h-05h", count: "0/1" }];
  const nightPills = [{ label: "19h-01h", count: "0/3" }, { label: "19h-07h", count: "0/3" }];

  return (
    <div
      ref={containerRef}
      className="pointer-events-none relative select-none text-hst-fg"
      style={{ width: WRAP_W }}
      aria-label="Animação demonstrando o editor de grades: criar plantão arrastando, redimensionar, conflito detectado e publicação"
    >
      {/* hospital tabs */}
      <div className="flex items-end gap-1" style={{ height: 40, marginBottom: 12 }}>
        {["Hospital Cruz Azul", "Hospital Salvalus", "Hospital Ibirapuera", "Hospital João XXIII"].map(
          (h, i) => (
            <div
              key={h}
              className={cx(
                "rounded-t-lg border border-b-0 px-4 py-2 text-sm whitespace-nowrap",
                i === 1
                  ? "border-hst-border bg-white text-hst-fg"
                  : "border-transparent text-hst-muted"
              )}
            >
              {h}
            </div>
          )
        )}
      </div>

      {/* grade card 1 — editing (animated) */}
      <div
        className="rounded-xl rounded-tl-none border border-hst-border bg-white shadow-sm"
        style={{ padding: CARD_PAD }}
      >
        <div style={{ marginBottom: 16 }}>
          <GradeHeader
            color={PURPLE}
            nome="Anestesia — segunda a sexta diurno · 12h"
            especialidade="Anestesiologia"
            setor="C. Cirúrgico"
            publishPressed={publishPressed}
          />
        </div>

        {/* week chip row */}
        <div className="flex items-center gap-3" style={{ height: 24, marginBottom: 8 }}>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs"
            style={{ borderColor: PURPLE, color: PURPLE }}
          >
            Semana 1
          </span>
          <span className="text-xs text-hst-muted">Início da grade: 07h</span>
        </div>

        {/* weekly strip — Monday mirrors the editor live */}
        <div className="grid grid-cols-7 gap-2" style={{ marginBottom: 14 }}>
          {DIAS.map((dia, i) => (
            <DayCard
              key={dia}
              dia={dia}
              color={PURPLE}
              highlighted={i === 0}
              pills={i === 0 ? mondayPills : i < 5 ? weekdayPills : []}
            />
          ))}
        </div>

        {/* day editor */}
        <div className="flex items-center gap-2" style={{ height: 20, marginBottom: 6 }}>
          <span className="text-sm font-normal">Editando: Segunda-feira</span>
          <span className="text-xs text-hst-muted">· arraste sobre a linha para criar um plantão</span>
        </div>

        <div className="flex" style={{ height: HOUR_HEADER_H }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-l border-hst-border text-center text-[10px] leading-7 text-hst-muted first:border-l-0"
            >
              {hourLabel(i)}
            </div>
          ))}
        </div>

        {[0, 1].map((row) => (
          <div
            key={row}
            className="relative border-t border-hst-border"
            style={{ height: ROW_H, backgroundColor: `${PURPLE}08` }}
          >
            <div className="absolute inset-0 flex">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex-1 border-l border-hst-border/60 first:border-l-0" />
              ))}
            </div>

            {slots
              .filter((s) => s.row === row)
              .map((s) => {
                const duration = s.end - s.start;
                return (
                  <div
                    key={s.id}
                    className="absolute inset-y-1.5 z-10 flex items-center justify-between gap-2 overflow-hidden rounded-md px-2.5"
                    style={{
                      left: `${(s.start / 24) * 100}%`,
                      width: `${(duration / 24) * 100}%`,
                      backgroundColor: `${PURPLE}2e`,
                      border: `1px solid ${PURPLE}`,
                      transition: animate
                        ? `width ${CURSOR_MOVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                        : undefined,
                      boxShadow: s.resizing ? `0 0 0 2px ${PURPLE}55` : undefined,
                    }}
                  >
                    <span className="whitespace-nowrap text-xs font-normal">
                      {hourLabel(s.start)} - {hourLabel(s.end)}{" "}
                      <span className="text-hst-muted">({duration}h)</span>
                    </span>
                    {duration >= 5 && (
                      <span className="whitespace-nowrap rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-hst-muted">
                        Selecionar médico
                      </span>
                    )}
                    <span
                      className="absolute inset-y-0 right-0 w-1"
                      style={{ backgroundColor: s.resizing ? PURPLE : `${PURPLE}55` }}
                    />
                  </div>
                );
              })}

            {preview && preview.row === row && (
              <div
                className="absolute inset-y-1.5 z-20 flex items-center justify-center rounded-md"
                style={{
                  left: `${(preview.start / 24) * 100}%`,
                  width: `${((preview.end - preview.start) / 24) * 100}%`,
                  border: `2px dashed ${previewConflict ? "#ef4444" : PURPLE}`,
                  backgroundColor: previewConflict ? "#ef44441a" : `${PURPLE}14`,
                  transition: `width ${CURSOR_MOVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                {previewConflict && <TriangleAlert className="size-4 text-red-500" />}
              </div>
            )}
          </div>
        ))}

        <div className="mt-3 flex items-center justify-between text-xs text-hst-muted">
          <span>Arraste a borda de um plantão para ajustar o horário</span>
          <span>2 linhas · plantões paralelos permitidos</span>
        </div>
      </div>

      {/* grade card 2 — view mode (static) */}
      <div
        className="mt-4 rounded-xl border border-hst-border bg-white shadow-sm"
        style={{ padding: CARD_PAD }}
      >
        <div style={{ marginBottom: 16 }}>
          <GradeHeader
            color={GREEN}
            nome="Anestesia — segunda a sábado noturno"
            especialidade="Anestesiologia"
            setor="C. Cirúrgico"
          />
        </div>
        <div className="flex items-center gap-3" style={{ height: 24, marginBottom: 8 }}>
          <span
            className="rounded-full border px-2.5 py-0.5 text-xs"
            style={{ borderColor: GREEN, color: GREEN }}
          >
            Semana 1
          </span>
          <span className="text-xs text-hst-muted">Início da grade: 19h</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {DIAS.map((dia, i) => (
            <DayCard key={dia} dia={dia} color={GREEN} pills={i < 6 ? nightPills : []} />
          ))}
        </div>
      </div>

      {/* toast */}
      <div
        className={cx(
          "absolute right-5 z-30 flex w-80 items-start gap-3 rounded-lg border bg-white p-3.5 shadow-lg transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          toast?.kind === "error" ? "border-red-200" : "border-green-200"
        )}
        style={{ top: ROWS_TOP + ROW_H * 2 - 24 }}
      >
        {toast?.kind === "error" ? (
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-500" />
        ) : (
          <CalendarCheck className="mt-0.5 size-4 shrink-0 text-green-600" />
        )}
        <div className="min-w-0">
          <div className="text-sm font-normal">{toast?.title}</div>
          <div className="text-xs text-hst-muted">{toast?.detail}</div>
        </div>
      </div>

      {/* ghost cursor */}
      {animate && (
        <div
          className="absolute z-40"
          style={{
            left: cursor.x,
            top: cursor.y,
            transition: `left ${CURSOR_MOVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1), top 500ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <span
            className={cx(
              "absolute -left-3 -top-3 block h-6 w-6 rounded-full transition-all duration-200",
              pressed ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            style={{ backgroundColor: `${PURPLE}30`, border: `1px solid ${PURPLE}` }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={cx("relative transition-transform duration-150", pressed && "scale-90")}
          >
            <path
              d="M5.5 3.2 19 12.2l-6.2 1.1 3.1 6.2-2.7 1.3-3-6.3-4.7 4.2z"
              fill="#161616"
              stroke="#fffff9"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
