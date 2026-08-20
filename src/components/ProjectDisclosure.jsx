import { motion, useReducedMotion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

// "Ver mais sobre este projeto" — botão real + região associada
// (aria-expanded/aria-controls), compartilhado entre ProjectCase e
// SecondaryProjectCard pra não duplicar a mesma lógica de disclosure/anim
// duas vezes. `isExpanded`/`onToggle` vêm de fora (expandedProjectId em
// Projects.jsx) — este componente não guarda estado próprio, então "só um
// projeto aberto por vez" é garantido pelo pai, não aqui.
// O botão fica no seu próprio wrapper max-w-3xl (alinha com a coluna de
// texto do card por cima dele); o painel em si não impõe largura — quem
// chama decide (ProjectCase precisa de um bloco de mídia mais largo que o
// texto, SecondaryProjectCard só quer a largura cheia do card).
export default function ProjectDisclosure({ id, isExpanded, onToggle, wrapperClassName = "mx-auto max-w-3xl", children }) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className={wrapperClassName}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={id}
          className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal-blue transition-colors hover:text-ink"
        >
          {isExpanded ? "Mostrar menos" : "Ver mais sobre este projeto"}
          <HiChevronDown
            size={15}
            className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Sem AnimatePresence: fechar desmonta direto (sem fade-out). Um
          fade-out dependente de exit-complete pode nunca disparar sob rAF
          throttled/parado (aba em background, dispositivo lento) e deixar o
          painel invisível mas ainda ocupando altura no layout — pior que
          fechar sem animação. Abrir continua animando (initial→animate). */}
      {isExpanded && (
        <motion.div
          id={id}
          initial={reducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
