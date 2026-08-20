import { useEffect, useRef, useState } from "react";
import { technologyRegistry, getAllProjects, getProjectBySlug, resolveDetailedTechGroups } from "../lib/data";
import { useInspect } from "../context/inspectState";
import { forceLoad } from "./Deferred";

const PROMPT = "PS C:\\wendrel>";

const HELP_LINES = [
  "help                  comandos disponíveis",
  "whoami                quem eu sou",
  "about                 resumo profissional",
  "projects              listar projetos",
  "stack <projeto>       stack técnica do projeto",
  "skills [categoria]    tecnologias por categoria",
  "inspect [on|off]      Inspect Mode",
  "open <projeto>        navega até o case",
  "visit <projeto>       abre o MVP publicado em nova aba",
  "contact               vai até o contato",
  "clear                 limpa o terminal",
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
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function attempt() {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      return;
    }
    if (performance.now() - start < 2000) setTimeout(attempt, 50);
  }
  attempt();
}

// Parser de comandos: recebe a linha crua + a API do InspectProvider (só o
// comando "inspect" usa) e devolve as linhas de saída. "clear" é tratado à
// parte pelo componente (não imprime nada, só limpa o histórico) — aqui ele
// nunca chega. Projetos/stacks/skills vêm sempre da Data Truth Layer
// (data.js) — nenhum nome, slug, status ou categoria é digitado aqui.
function runCommand(raw, inspect) {
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

    case "projects": {
      const all = getAllProjects();
      const width = Math.max(...all.map((p) => p.title.length)) + 2;
      return [
        ...all.map((p, i) => `${String(i + 1).padStart(2, "0")}  ${p.title.padEnd(width)}${p.status}`),
        "",
        "use 'stack <projeto>' ou 'open <projeto>' — ex: stack naboa",
      ];
    }

    case "stack": {
      const project = getProjectBySlug(args[0]);
      if (!project) {
        return [`projeto não encontrado: ${args[0] || ""}`, "use `projects` para listar os projetos disponíveis."];
      }
      const groups = resolveDetailedTechGroups(project);
      const lines = [project.title.toUpperCase(), `primary   ${project.stack.join(" · ")}`, ""];
      if (groups.length > 0) {
        for (const group of groups) {
          lines.push(group.label);
          lines.push(`  ${group.technologies.map((t) => t.name).join(" · ")}`);
        }
      } else {
        lines.push("detailed");
        lines.push("  Detalhamento técnico não publicado.");
      }
      return lines;
    }

    case "skills": {
      // Ordem natural: dedup preserva a primeira ocorrência de cada
      // categoria no registry, que já está agrupado por área — sem lista
      // de ordem hardcoded.
      const allCategories = [...new Set(Object.values(technologyRegistry).map((t) => t.category))];
      const namesInCategory = (cat) =>
        Object.values(technologyRegistry)
          .filter((t) => t.category === cat)
          .map((t) => t.name);

      if (!args[0]) {
        return allCategories.flatMap((cat) => [cat, `  ${namesInCategory(cat).join(" · ")}`, ""]);
      }

      const names = namesInCategory(args[0]);
      if (names.length === 0) {
        return [`categoria não encontrada: ${args[0]}`, `categorias disponíveis: ${allCategories.join(" · ")}`];
      }
      return [args[0], names.join(" · ")];
    }

    // DÍVIDA (próxima fase): com o Terminal existindo só dentro do Developer
    // Mode, `inspect on` virou permanentemente redundante (o Terminal já
    // prova que Inspect está ON) e `inspect off` na prática desliga o
    // Developer Mode inteiro, não só as anotações. Os nomes ficaram menores
    // que o efeito. Renomear/reagrupar esses comandos é refatoração própria —
    // aqui só se garante que nenhum deles produza estado paradoxal.
    case "inspect": {
      const sub = args[0];
      if (!sub) return [`Inspect Mode: ${inspect.inspectMode ? "ON" : "OFF"}`];
      if (sub === "on") {
        // Inalcançável como "ativar": o Terminal só é renderizado com
        // inspectMode ON. Fica como resposta honesta ao comando digitado.
        if (inspect.inspectMode) return ["Inspect Mode já está ativo."];
        inspect.enableInspect();
        return ["Inspect Mode ativado."];
      }
      if (sub === "off") {
        if (!inspect.inspectMode) return ["Inspect Mode já está desativado."];
        // Sai pelo Developer Mode inteiro (Terminal incluído) em vez de só
        // disableInspect() — senão sobrava um Terminal aberto com Inspect
        // desligado, exatamente o estado que o Developer Mode não admite
        // mais. requestDevModeOff dá o tempo curto pra esta linha ser lida
        // antes do Terminal recolher.
        inspect.requestDevModeOff();
        return ["Inspect Mode desativado.", "Developer Mode disabled."];
      }
      return ["uso: inspect [on|off]"];
    }

    case "contact":
      goToSection("contato");
      return ["abrindo contato..."];

    case "open": {
      const project = getProjectBySlug(args[0]);
      if (!project) {
        return [
          `projeto não encontrado: ${args[0] || ""}`,
          `use: open ${getAllProjects()
            .map((p) => p.slug)
            .join(" | ")}`,
        ];
      }
      goToSection(project.slug);
      return [`abrindo ${project.title}...`];
    }

    case "visit": {
      const project = getProjectBySlug(args[0]);
      if (!project || !project.liveUrl) {
        const withLiveUrl = getAllProjects()
          .filter((p) => p.liveUrl)
          .map((p) => p.slug);
        return [`MVP não encontrado: ${args[0] || ""}`, `use: visit ${withLiveUrl.join(" | ")}`];
      }
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
      return [`abrindo ${project.title} em nova aba...`];
    }

    default:
      return [`comando não encontrado: ${cmd}`, "digite 'help' para ver os comandos disponíveis"];
  }
}

// Console interativo do Hero — funcionalidade real, não decoração.
// Estado local simples: histórico de linhas renderizadas + input controlado.
// `open` vem de fora (terminalOpen do InspectProvider) e é read-only: o
// Terminal deixou de ser uma feature independente do Hero e passou a ser a
// camada que o Developer Mode abre. Não existe mais CTA de abrir o Terminal,
// então também não existe mais onOpenChange.
export default function Terminal({ open }) {
  const inspect = useInspect();
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [booted, setBooted] = useState(false);

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
      setLines((prev) => [...prev, ...runCommand("whoami", inspect).map((text) => ({ type: "output", text }))]);
    }, 950);
    const t3 = setTimeout(() => setBooted(true), 1050);
    return () => [t1, t2, t3].forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mantém o terminal rolado para a última linha sempre que o histórico muda.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  // Mini boot só na transição OFF → ON do Developer Mode (não no mount, não
  // ao fechar) — dá uma sensação de "abrindo", não de aparecer seco. Curto
  // de propósito: 2 linhas, 2 timers, sem loop. Reduced motion pula direto
  // pro resultado final.
  const wasInspectMode = useRef(inspect.inspectMode);
  useEffect(() => {
    const turnedOn = !wasInspectMode.current && inspect.inspectMode;
    wasInspectMode.current = inspect.inspectMode;
    if (!turnedOn) return;

    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setLines((prev) => [
        ...prev,
        { type: "input", text: "init dev-mode" },
        { type: "output", text: "Developer Mode enabled." },
      ]);
      return;
    }
    const t1 = setTimeout(() => setLines((prev) => [...prev, { type: "input", text: "init dev-mode" }]), 150);
    const t2 = setTimeout(
      () => setLines((prev) => [...prev, { type: "output", text: "Developer Mode enabled." }]),
      450
    );
    return () => [t1, t2].forEach(clearTimeout);
  }, [inspect.inspectMode]);

  function submit(raw) {
    const cmd = raw.trim().toLowerCase().split(/\s+/)[0];

    // "clear" é especial: um terminal real não deixa nem o próprio comando
    // no histórico depois de limpar a tela.
    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output = runCommand(raw, inspect).map((text) => ({ type: "output", text }));
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

  // Fechado não renderiza nada — Developer Mode OFF é um Hero limpo, sem
  // resto de Terminal recolhido. Retornar null (em vez do Hero desmontar o
  // componente) mantém a instância viva: histórico de comandos, linhas já
  // impressas e o ref de transição do boot sobrevivem ao ciclo ON → OFF → ON.
  if (!open) return null;

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
          aria-live="polite"
          className="max-h-[360px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed"
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

          {booted && (
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
                className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-faint"
                placeholder="help"
              />
              <span className="h-3.5 w-1.5 shrink-0 animate-blink bg-signal-blue" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
