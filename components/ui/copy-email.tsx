"use client";

/* ── O e-mail que se copia ─────────────────────────────────────────────
   `mailto:` é uma aposta: ele entrega o endereço ao programa que o
   sistema achar que é o cliente de e-mail, e na maioria das máquinas de
   hoje esse programa ou não existe, ou é o errado, ou abre uma janela
   que a pessoa fecha sem entender. O gesto que ela queria era outro —
   pegar o endereço e levar para onde ela já escreve.

   Então o endereço vai para a área de transferência, e a única parte
   difícil disso é AVISAR: uma cópia silenciosa é indistinguível de um
   clique que não funcionou. O aviso é um recorte igual aos botões do
   site, com o visto da caneta sendo escrito na hora — a mesma mão que
   confere uma linha e segue para a próxima. */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n";
import { PenMark } from "@/components/ui/marks";

const COPY = {
  en: { done: "Copied", failed: (key: string) => `Selected — press ${key}`, live: (email: string) => `${email} copied to the clipboard` },
  pt: { done: "Copiado", failed: (key: string) => `Selecionado — aperte ${key}`, live: (email: string) => `${email} copiado para a área de transferência` },
} as const;

/* Quanto tempo o aviso fica. Curto o bastante para não virar mobília,
   longo o bastante para ser lido por quem olhou de volta depois de já
   ter ido colar em outro lugar. */
const LINGER = 2400;

type State = "idle" | "done" | "failed";

export function CopyEmail({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children?: ReactNode;
}) {
  const t = COPY[useLocale()];
  const [state, setState] = useState<State>("idle");
  /* O visto é redesenhado a cada cópia. Sem uma chave nova o React
     reaproveitaria o mesmo nó, e a segunda cópia mostraria um traço já
     pronto em vez do gesto sendo feito. */
  const [round, setRound] = useState(0);
  const timer = useRef<number | null>(null);
  const host = useRef<HTMLButtonElement>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async () => {
    let ok = false;

    /* O caminho normal. Ele exige contexto seguro, permissão e um gesto
       do usuário, e falha calado em navegador antigo — daí o segundo
       caminho, e daí o terceiro. */
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }

    /* E se nem o antigo funcionar, o endereço ao menos fica SELECIONADO.
       Sem isso o aviso mandaria apertar uma tecla que não copiaria nada
       — instrução falsa é pior que aviso nenhum. */
    if (!ok) selectText(host.current);

    setRound((n) => n + 1);
    setState(ok ? "done" : "failed");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), LINGER);
  }, [email]);

  return (
    <span className="copy-email">
      <button ref={host} type="button" className={className} onClick={copy}>
        {children ?? email}
      </button>

      {state !== "idle" && (
        <span className="copy-flag pen-btn" data-state={state} aria-hidden="true">
          {state === "done" ? t.done : t.failed(shortcut())}
          {state === "done" && <PenMark key={round} kind="check" on="mount" />}
        </span>
      )}

      {/* O aviso visual não existe para quem usa leitor de tela, e o
          `aria-live` não existe para quem enxerga. São o mesmo recado
          dito duas vezes, uma para cada plateia. */}
      <span className="sr-only" role="status" aria-live="polite">
        {state === "done" ? t.live(email) : ""}
      </span>
    </span>
  );
}

/* A tecla que essa pessoa tem. Mandar apertar ⌘C em Windows é o tipo de
   detalhe que faz o aviso inteiro parecer escrito para outra pessoa. */
function shortcut() {
  if (typeof navigator === "undefined") return "Ctrl+C";
  return /mac|iphone|ipad/i.test(navigator.userAgent) ? "\u2318C" : "Ctrl+C";
}

/* Selecionar o texto do botão, para a instrução do aviso ser verdade. */
function selectText(node: HTMLElement | null) {
  if (!node) return;
  try {
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  } catch {
    /* Navegador sem seleção programática: o aviso ainda diz o que houve. */
  }
}

/* A saída de emergência: um campo fora da tela, selecionado e copiado
   pelo comando antigo. Está obsoleto e é síncrono, que é exatamente o
   motivo de ele ainda servir aqui — funciona em contexto não seguro,
   onde a API moderna nem é oferecida. */
function legacyCopy(text: string) {
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-1000px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}
