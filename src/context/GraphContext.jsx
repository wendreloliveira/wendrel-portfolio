import { useMemo, useState } from "react";
import { GraphContext } from "./graphState";
import { getProjectSlugsByTechId } from "../lib/data";

export function GraphProvider({ children }) {
  const [activeTechId, setActiveTechId] = useState(null);
  const [activeProject, setActiveProjectState] = useState(null); // { slug, techIds } | null

  const relatedProjectSlugs = useMemo(
    () => (activeTechId ? getProjectSlugsByTechId(activeTechId) : []),
    [activeTechId]
  );

  // Um tech ativo sem nenhum projeto relacionado publicado (ex.: SQL, hoje)
  // não deve dimmar a lista de projetos inteira — isso leria como "nenhum
  // projeto usa isso de verdade", quando na real é só "relação ainda não
  // documentada". Genérico: qualquer techId canônico com relatedProjectSlugs
  // vazio cai aqui, não é um caso especial de uma tecnologia só. Projetos só
  // dimmam quando o tech ativo TEM relação, ou quando outro projeto está
  // ativo (hover/focus direto num card) — esse segundo caso é inalterado.
  const projectDimmingActive = (!!activeTechId && relatedProjectSlugs.length > 0) || !!activeProject;

  const value = useMemo(
    () => ({
      activeTechId,
      activeProjectId: activeProject?.slug ?? null,
      relatedProjectSlugs,
      relatedTechIds: activeProject?.techIds ?? [],
      projectDimmingActive,
      setActiveTech: (techId) => setActiveTechId(techId),
      clearActiveTech: () => setActiveTechId(null),
      setActiveProject: (slug, techIds) => setActiveProjectState({ slug, techIds }),
      clearActiveProject: () => setActiveProjectState(null),
    }),
    [activeTechId, activeProject, relatedProjectSlugs, projectDimmingActive]
  );

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
}
