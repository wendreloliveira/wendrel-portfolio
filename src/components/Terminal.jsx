import { useEffect, useRef, useState } from "react";
import { technologyGroups, featuredProjects } from "../lib/data";
import { forceLoad } from "./Deferred";

const PROMPT = "PS C:\\wendrel>";

// liveUrl vem de data.js (fonte única) — só quem tem MVP publicado
// (empregaai/naboa/risk/dkastro) recebe um, então "visit" só existe pra esses.
function liveUrlOf(slug) {
  return featuredProjects.find((p) => p.slug === slug)?.liveUrl;
}

const OPENABLE = [
  { slug: "empregaai", label: "EmpregaAI", type: "produto / software", liveUrl: liveUrlOf("empregaai") },
  { slug: "naboa", label: "NABOA Streetwear", type: "e-commerce / full stack", liveUrl: liveUrlOf("naboa") },
  { slug: "risk", label: "RISK", type: "projeto empresarial", liveUrl: liveUrlOf("risk") },
  { slug: "dkastro", label: "DKastro", type: "frontend / motion", liveUrl: liveUrlOf("dkastro") },
  { slug: "vassvegas", label: "VassVegas", type: "produto multidisciplinar" },
];

const HELP_LINES = [
  "help              lista os comandos",
  "whoami            quem eu sou",
  "about             resumo profissional",
  "projects          projetos reais",
  "stack             tecnologias por uso real",
  "open <projeto>    abre um case (empregaai, naboa, risk, dkastro, vassvegas)",
  "visit <projeto>   abre o MVP publicado em nova aba (empregaai, naboa, risk, dkastro)",
  "contact           vai até o contato",
  "clear             limpa o terminal",
];

// Navegação por id. As seções abaixo da dobra são deferred (Deferred.jsx):
// os wrappers ("projetos", "timeline", "tecnologias", "contato") já têm o id
// desde o primeiro render, mas ids de sub-conteúdo (ex.: "empregaai", que só
// existe depois que Projects monta de verdade) podem não estar no DOM ainda.
// forceLoad dispara o import/montagem; o polling espera o elemento aparecer
// antes de rolar — funciona tanto pros wrappers (já existem, resolve na
// primeira checagem) quanto pros sub-ids (resolve assim que montarem).
function goToSection(id) {
  forceLoad(id);
  const start = performance.now();
  function attempt() {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (performance.now() - start < 2000) setTimeout(attempt, 50);
  }
  attempt();
}

// Parser de comandos: recebe a linha crua, decide o que fazer e devolve as
// linhas de saída a exibir. "clear" é tratado à parte pelo componente (não
// imprime nada, só limpa o histórico) — aqui ele nunca chega.
function runCommand(raw) {
  const [cmd, ...args] = raw.trim().toLowerCase().split(/\s+/);

  switch (cmd) {
    case "":
      return [];

    case "help":
      return HELP_LINES;

    case "whoami":
      return ["Wendrel Oliveira", "Engenharia de Software • Produtos Digitais • Automação"];

    case "about":
      return [
        "Curso Engenharia de Software na Univassouras.",
        "Aprendo construindo — participo de projetos reais em equipe,",
        "de MVPs multidisciplinares a entregas para empresas.",
      ];

    case "projects":
      return [
        ...OPENABLE.map((p, i) => `${String(i + 1).padStart(2, "0")}  ${p.label.padEnd(14)}${p.type}`),
        "",
        "digite 'open <projeto>' para ver o case (ex: open empregaai)",
      ];

    case "stack":
      return technologyGroups.flatMap((group) => [
        group.category.toUpperCase(),
        `  ${group.items.map((i) => i.name).join(", ")}`,
        "",
      ]);

    case "contact":
      goToSection("contato");
      return ["abrindo contato..."];

    case "open": {
      const target = OPENABLE.find((p) => p.slug === args[0]);
      if (!target) {
        return [
          `projeto não encontrado: ${args[0] || ""}`,
          "use: open empregaai | naboa | risk | dkastro | vassvegas",
        ];
      }
      goToSection(target.slug);
      return [`abrindo ${target.label}...`];
    }

    case "visit": {
      const target = OPENABLE.find((p) => p.slug === args[0]);
      if (!target || !target.liveUrl) {
        return [
          `MVP não encontrado: ${args[0] || ""}`,
          "use: visit empregaai | naboa | risk | dkastro",
        ];
      }
      window.open(target.liveUrl, "_blank", "noopener,noreferrer");
      return [`abrindo ${target.label} em nova aba...`];
    }

    default:
      return [`comando não encontrado: ${cmd}`, "digite 'help' para ver os comandos disponíveis"];
  }
}

// Console interativo do Hero — funcionalidade real, não decoração.
// Estado local simples: histórico de linhas renderizadas + input controlado.
export default function Terminal() {
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [booted, setBooted] = useState(false);
  // Mobile começa recolhido (poucas linhas); desktop já nasce expandido.
  const [isOpen, setIsOpen] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  // Histórico de comandos digitados (para as setas ↑/↓) — não precisa de
  // re-render a cada tecla, por isso fica em ref e não em state.
  const commandHistory = useRef([]);
  const historyIndex = useRef(0);

  // Sequência automática de boot: digita "whoami" sozinho, mostra a saída e
  // só então libera o controle para o visitante.
  useEffect(() => {
    const t1 = setTimeout(() => setLines([{ type: "input", text: "whoami" }]), 500);
    const t2 = setTimeout(() => {
      setLines((prev) => [...prev, ...runCommand("whoami").map((text) => ({ type: "output", text }))]);
    }, 950);
    const t3 = setTimeout(() => setBooted(true), 1050);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  // Mantém o terminal rolado para a última linha sempre que o histórico muda.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  function submit(raw) {
    const cmd = raw.trim().toLowerCase().split(/\s+/)[0];

    // "clear" é especial: um terminal real não deixa nem o próprio comando
    // no histórico depois de limpar a tela.
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output = runCommand(raw).map((text) => ({ type: "output", text }));
    setLines((prev) => [...prev, { type: "input", text: raw }, ...output]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = value;
      if (raw.trim()) commandHistory.current.push(raw);
      historyIndex.current = commandHistory.current.length;
      submit(raw);
      setValue("");
      return;
    }

    // Navegação pelo histórico de comandos, como num shell de verdade.
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.current.length === 0) return;
      historyIndex.current = Math.max(0, historyIndex.current - 1);
      setValue(commandHistory.current[historyIndex.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.current.length === 0) return;
      historyIndex.current = Math.min(commandHistory.current.length, historyIndex.current + 1);
      setValue(commandHistory.current[historyIndex.current] ?? "");
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="mb-2 font-mono text-xs text-ink-faint">
        Digite <span className="text-signal-blue">help</span> para explorar o portfólio pelo terminal.
      </p>

      <div className="rounded-2xl border border-base-border bg-base-surface/80 shadow-soft backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-base-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-green/70" />
          <span className="ml-2 font-mono text-xs text-ink-faint">wendrel — powershell</span>
        </div>

        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className={`overflow-y-auto p-5 font-mono text-[13px] leading-relaxed transition-[max-height] duration-300 ${
            isOpen ? "max-h-[360px]" : "max-h-28"
          }`}
        >
          {lines.map((line, i) =>
            line.type === "input" ? (
              <div key={i} className="text-ink">
                <span className="text-signal-green">{PROMPT}</span> {line.text}
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap text-ink-muted">
                {line.text}
              </div>
            )
          )}

          {booted && isOpen && (
            <div className="flex items-center gap-2 text-ink">
              <span className="shrink-0 text-signal-green">{PROMPT}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal do portfólio — digite um comando (experimente 'help')"
                className="flex-1 bg-transparent outline-none placeholder:text-ink-faint"
                placeholder="help"
              />
              <span className="h-3.5 w-1.5 shrink-0 animate-blink bg-signal-blue" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface/60 px-4 py-2 text-xs text-ink-muted transition-colors hover:text-ink md:hidden"
        >
          Abrir terminal
        </button>
      )}
    </div>
  );
}
