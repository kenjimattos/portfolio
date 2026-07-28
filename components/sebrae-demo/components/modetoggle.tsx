// Segmented glass control — "Eixos prioritários" active (lime pill).

import { AMBIENTE_MODES } from "../data";
import { cx, FONT } from "../ui";

type ModeToggleProps = {
  select: number;
};
export function ModeToggle({ select }: ModeToggleProps) {
  return (
    <div
      className="opp-glass opp-glass-bevel inline-flex w-fit items-center rounded-full p-1"
      role="tablist"
      aria-label="Modo de visualização"
    >
      {AMBIENTE_MODES.map((mode, i) => {
        const isActive = i === select;
        return (
          <span
            key={mode}
            role="tab"
            aria-selected={isActive}
            className={cx(
              "flex h-10 items-center whitespace-nowrap rounded-full px-4",
              isActive ? "bg-opp-accent text-black" : "text-white"
            )}
            style={{ ...FONT.display, fontSize: 14 }}
          >
            {mode}
          </span>
        );
      })}
    </div>
  );
}