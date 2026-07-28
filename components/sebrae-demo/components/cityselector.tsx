// Glass-bevel pill: lime "Meu município" chip + selected city with search

import { ChevronDown, Search } from "lucide-react";
import { MUNICIPIO } from "../data";
import { FONT } from "../ui";

// affordance and accent chevron (the original's searchable dropdown, frozen).
export function CitySelector() {
  return (
    <div className="opp-glass opp-glass-bevel inline-flex w-fit items-center gap-3 rounded-full py-1 pl-1 pr-4">
      <span
        className="rounded-full bg-opp-accent px-5 py-2 text-black"
        style={{ ...FONT.display, fontSize: 14 }}
      >
        Meu município
      </span>
      <span
        className="text-white"
        style={{ ...FONT.body, fontSize: 16, fontWeight: 600 }}
      >
        {MUNICIPIO}
      </span>
      <Search size={14} className="text-white/50" aria-hidden />
      <ChevronDown size={18} className="text-opp-accent" aria-hidden />
    </div>
  );
}