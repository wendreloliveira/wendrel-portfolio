import { AnimatePresence, motion } from "framer-motion";
import { resolveDetailedTechGroups } from "../lib/data";
import { useInspect } from "../context/inspectState";

// Disclosure inline — sem popover/portal (evita conflito com o
// LivePreviewModal já existente e qualquer dependência nova). Só existe
// quando Inspect está ligado; furniture próprio, ProjectCase/SecondaryCard
// não precisam checar inspectMode, só renderizar isto sempre.
// Acordeão: o estado de "qual projeto está aberto" vive no InspectProvider
// (openProjectId), não aqui — por isso só uma Detailed Stack fica aberta por
// vez, atravessando featured e secondary.
export default function TechStackInspect({ project }) {
  const { inspectMode, openProjectId, toggleProjectInspect } = useInspect();

  if (!inspectMode) return null;

  const open = openProjectId === project.slug;
  const groups = resolveDetailedTechGroups(project);
  const panelId = `inspect-stack-${project.slug}`;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => toggleProjectInspect(project.slug)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1 rounded-full border border-base-border px-3 py-1.5 font-mono text-[11px] text-ink-muted transition-colors duration-150 hover:border-signal-blue/40 hover:text-ink"
      >
        [ inspect stack ]
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-3 flex flex-col gap-3 rounded-xl border border-base-border bg-base-surface/40 p-4"
          >
            {groups.length > 0 ? (
              groups.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-signal-blue">{group.label}</p>
                  <p className="mt-1 text-xs text-ink-muted">{group.technologies.map((t) => t.name).join(" · ")}</p>
                </div>
              ))
            ) : (
              <p className="text-xs italic text-ink-faint">Detalhamento técnico não publicado.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
