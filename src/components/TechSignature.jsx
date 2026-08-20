import { resolveTechNames } from "../lib/data";
import { useInspect } from "../context/inspectState";

// Assinatura técnica compacta do card recolhido (estado C) — só
// primaryTechIds resolvidos pelo technologyRegistry, nunca string matching
// nem mapa local. Some quando o projeto expande (o caller só monta isto
// fora do "Ver mais"): a stack detalhada de TechStackInspect assume ali,
// nunca as duas juntas.
export default function TechSignature({ project }) {
  const { inspectMode } = useInspect();

  if (!inspectMode) return null;

  const names = resolveTechNames(project.primaryTechIds || []);
  if (names.length === 0) return null;

  return (
    <p className="mt-3 font-mono text-[11px]">
      <span className="text-signal-blue">[ inspect ]</span>{" "}
      <span className="text-ink-muted">{names.join(" · ")}</span>
    </p>
  );
}
