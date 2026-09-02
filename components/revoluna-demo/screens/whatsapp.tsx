// Recriação estática de um grupo de WhatsApp recebendo um link de plantão —
// a ORIGEM da decisão 03. A tela conta a tensão inteira: o post solto e
// gritado (o mundo velho, sem valor, sem setor, "chamar no pv") e, logo
// abaixo, o link da Revoluna com preview estruturado — o compartilhamento
// continua no canal onde os médicos vivem; o que muda é o destino.
//
// A pele é a do WhatsApp iOS claro (wallpaper bege, bolhas branca/verde,
// azul de sistema), desenhada à mão como as outras recriações; a fonte é a
// do sistema, não a Geologica — esta tela não é o app. Dados fictícios.

import { Camera, ChevronLeft, Mic, Phone, Plus, Smile, Users, Video } from "lucide-react";
import { RevLogo } from "../ui";

const SYSTEM_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif";

const IOS_BLUE = "#007AFF";

/* Os dois checks de leitura, no azul do WhatsApp. */
function ReadTicks() {
  return (
    <svg width="15" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
      <path d="M1 5.5 3.6 8 9 1.5" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 5.5 9.1 8 14.5 1.5" stroke="#53BDEB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BubbleMeta({ time, out }: { time: string; out?: boolean }) {
  return (
    <span className="float-right ml-2 mt-2 flex translate-y-0.5 items-center gap-1">
      <span style={{ fontSize: 11, color: "#8696A0" }}>{time}</span>
      {out && <ReadTicks />}
    </span>
  );
}

function Bubble({
  out,
  sender,
  senderColor,
  children,
  time,
}: {
  out?: boolean;
  sender?: string;
  senderColor?: string;
  children: React.ReactNode;
  time: string;
}) {
  return (
    <div
      className="max-w-[80%] rounded-lg px-3 py-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
      style={{
        backgroundColor: out ? "#D9FDD3" : "#FFFFFF",
        alignSelf: out ? "flex-end" : "flex-start",
      }}
    >
      {sender && (
        <div style={{ fontSize: 12.5, fontWeight: 600, color: senderColor, marginBottom: 1 }}>
          {sender}
        </div>
      )}
      <div style={{ fontSize: 14, lineHeight: 1.35, color: "#111B21" }}>
        {children}
        <BubbleMeta time={time} out={out} />
      </div>
    </div>
  );
}

export function WhatsAppScreen() {
  return (
    <div
      className="flex h-full flex-col"
      style={{ backgroundColor: "#ECE5DD", fontFamily: SYSTEM_FONT }}
    >
      {/* header do grupo */}
      <div
        className="flex items-center gap-2 border-b px-2 pb-2 pt-14"
        style={{ backgroundColor: "#F6F6F6", borderColor: "#D0D0D0" }}
      >
        <span className="flex items-center" style={{ color: IOS_BLUE }}>
          <ChevronLeft size={26} strokeWidth={2.2} />
          <span
            className="rounded-full px-1.5 py-px"
            style={{ backgroundColor: "#D1D1D6", fontSize: 12, fontWeight: 600, color: "#111" }}
          >
            47
          </span>
        </span>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "linear-gradient(135deg, #7BC4A0, #40826D)" }}
          aria-hidden
        >
          <Users size={18} className="text-white" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate" style={{ fontSize: 15, fontWeight: 600, color: "#111B21" }}>
            Plantões SP · Vagas
          </div>
          <div className="truncate" style={{ fontSize: 11.5, color: "#667781" }}>
            Dra. Carla, Dr. Paulo, você e 45 outros
          </div>
        </div>
        <Video size={22} style={{ color: IOS_BLUE }} className="mx-1.5" />
        <Phone size={19} style={{ color: IOS_BLUE }} className="mx-1.5" />
      </div>

      {/* conversa */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 pt-3">
        <span
          className="self-center rounded-md px-2.5 py-1"
          style={{ backgroundColor: "#FFFFFFC7", fontSize: 11, fontWeight: 500, color: "#667781" }}
        >
          hoje
        </span>

        {/* o mundo velho: o post solto, sem estrutura */}
        <Bubble sender="Dra. Carla Nunes" senderColor="#DF3E7A" time="18:47">
          🚨 URGENTE amanhã ANESTESIO 19h/07h zona sul!! pgto a combinar, quem
          pegar chama no pv
        </Bubble>

        <Bubble sender="Dr. Paulo Reis" senderColor="#0C7BB3" time="18:52">
          qual hospital? tem valor??
        </Bubble>

        {/* o mundo novo: o mesmo canal, o destino estruturado */}
        <Bubble out time="18:55">
          <div
            className="-mx-1.5 mb-1 mt-0.5 flex items-center gap-2.5 rounded-md p-2"
            style={{ backgroundColor: "#CCF0C5" }}
          >
            <RevLogo size={40} />
            <div className="min-w-0 leading-snug">
              <div className="truncate" style={{ fontSize: 13, fontWeight: 600 }}>
                Anestesiologia · 12/02 · R$ 2.300,00
              </div>
              <div className="truncate" style={{ fontSize: 12, color: "#54656F" }}>
                Diurno · Centro Cirúrgico · Revoluna
              </div>
              <div style={{ fontSize: 11, color: "#8696A0" }}>revoluna.app.link</div>
            </div>
          </div>
          <span style={{ color: "#027EB5" }}>https://revoluna.app.link/v/8h2k</span>
        </Bubble>

        <Bubble sender="Dr. Paulo Reis" senderColor="#0C7BB3" time="18:58">
          abriu com tudo aqui. me candidatei
        </Bubble>
      </div>

      {/* barra de mensagem */}
      <div
        className="flex items-center gap-2.5 px-3 pb-9 pt-2"
        style={{ backgroundColor: "#F6F6F6" }}
      >
        <Plus size={24} style={{ color: IOS_BLUE }} />
        <div
          className="flex h-8.5 flex-1 items-center justify-between rounded-full border bg-white pl-3 pr-2"
          style={{ borderColor: "#D0D0D0" }}
        >
          <span style={{ fontSize: 14, color: "#8696A0" }}>Mensagem</span>
          <Smile size={20} style={{ color: "#8696A0" }} />
        </div>
        <Camera size={22} style={{ color: IOS_BLUE }} />
        <Mic size={21} style={{ color: IOS_BLUE }} />
      </div>
    </div>
  );
}
