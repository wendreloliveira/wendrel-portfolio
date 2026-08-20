import { resolveDetailedTechGroups } from "../lib/data";
import { useInspect } from "../context/inspectState";

// Bloco técnico detalhado — puramente apresentacional. Quem decide QUANDO
// isto existe na árvore é o card (só monta dentro do "Ver mais" expandido,
// ver ProjectDisclosure), então aqui só falta um gate: inspectMode. Antes
// isto era uma disclosure com botão/estado próprios (openProjectId no
// InspectProvider); virou redundante quando a expansão "Ver mais" passou a
// ser o único lugar onde a stack detalhada aparece — um só toggle, não dois
// competindo.
export default function TechStackInspect({ project }) {
  const { inspectMode } = useInspect();

  if (!inspectMode) return null;

  const groups = resolveDetailedTechGroups(project);

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-base-border bg-base-surface/40 p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal-blue">Stack detalhada</p>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{group.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{group.technologies.map((t) => t.name).join(" · ")}</p>
          </div>
        ))
      ) : (
        <p className="text-xs italic text-ink-faint">Detalhamento técnico não publicado.</p>
      )}
    </div>
  );
}
