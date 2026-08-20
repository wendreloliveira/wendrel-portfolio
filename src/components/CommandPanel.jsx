import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROMPT } from "./Terminal";

// Só comandos reais do Terminal 2.0 (ver HELP_LINES em Terminal.jsx) — este
// painel é referência, nunca inventa funcionalidade.
const QUICK_COMMANDS = [
  { command: "help", description: "lista os comandos disponíveis" },
  { command: "projects", description: "explora os projetos" },
  { command: "stack naboa", description: "inspeciona a stack do projeto" },
  { command: "skills backend", description: "tecnologias de back-end" },
  { command: "open empregaai", description: "navega até o case" },
];

const LIST_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// Painel auxiliar do Hero — mesma linguagem visual do Terminal (moldura,
// prompt verde, monoespaçado), mas é só referência: clicar preenche o input
// do Terminal (onRunCommand), nunca executa nada sozinho. Remonta a cada
// ativação do Developer Mode (sem estado próprio pra preservar), por isso a
// sequência de boot roda de novo toda vez — é o efeito desejado.
export default function CommandPanel({ onRunCommand }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(reducedMotion ? "commands" : "loading");

  useEffect(() => {
    // useReducedMotion() pode resolver o valor real só depois do primeiro
    // render (default seguro pra SSR) — se virar true depois do "loading"
    // já ter sido pintado, aqui é onde se corrige pro estado final.
    if (reducedMotion) {
      setPhase("commands");
      return;
    }
    const t1 = setTimeout(() => setPhase("ready"), 220);
    const t2 = setTimeout(() => setPhase("commands"), 380);
    return () => [t1, t2].forEach(clearTimeout);
  }, [reducedMotion]);

  return (
    <div className="w-full">
      <p className="mb-2 font-mono text-xs text-ink-faint">
        Clique num comando para preenchê-lo no terminal.
      </p>

      {/* Sem backdrop-blur (restrição desta sprint): bg-base-surface quase
          opaco (/95, sem filter) substitui o efeito frosted-glass do
          Terminal por uma superfície sólida — mesma paleta, mesmo peso
          visual, sem nova superfície de filter/backdrop-filter. */}
      <div className="rounded-2xl border border-base-border bg-base-surface/95 shadow-soft">
        <div className="flex items-center gap-2 border-b border-base-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-green/70" />
          <span className="ml-2 font-mono text-xs text-ink-faint">command index</span>
        </div>

        <div className="min-h-[168px] p-3 font-mono text-[13px] leading-relaxed">
          {phase !== "commands" ? (
            <p className="px-2 py-1.5 text-ink-faint">
              {phase === "loading" ? "loading command index..." : "commands ready"}
            </p>
          ) : (
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={LIST_VARIANTS}
              className="flex flex-col gap-0.5"
            >
              {QUICK_COMMANDS.map(({ command, description }) => (
                <motion.li
                  key={command}
                  variants={{
                    hidden: { opacity: 0, y: 4 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
                  }}
                >
                  <button
                    type="button"
                    onClick={() => onRunCommand?.(command)}
                    aria-label={`Preencher "${command}" no terminal`}
                    className="group flex w-full flex-col items-start gap-0.5 rounded-lg px-2 py-1.5 text-left transition-colors duration-150 hover:bg-base-elevated/60 focus-visible:bg-base-elevated/60"
                  >
                    <span className="text-ink">
                      <span className="text-signal-green">{PROMPT}</span> {command}
                    </span>
                    <span className="pl-0.5 text-[11px] text-ink-muted">{description}</span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </div>
  );
}
