"use client";

/* A nota da home, pousada no centro da tela por cima do wordmark. O que
   ela diz é a única coisa que muda em relação à do case — a peça, a
   caneta e a saída moram em `components/note.tsx`. */

import { useLocale } from "@/lib/i18n";
import { Note } from "@/components/ui/note";

const COPY = {
  en: {
    cue: "Scroll",
    before: "Everything down here already runs",
    circled: "in production",
    after: ".",
  },
  pt: {
    cue: "Role",
    before: "Tudo aqui embaixo já roda",
    circled: "em produção",
    after: ".",
  },
} as const;

export const MastheadNote = () => <Note {...COPY[useLocale()]} href="#work" />;
