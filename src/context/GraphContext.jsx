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

  const value = useMemo(
    () => ({
      activeTechId,
      activeProjectId: activeProject?.slug ?? null,
      relatedProjectSlugs,
      relatedTechIds: activeProject?.techIds ?? [],
      setActiveTech: (techId) => setActiveTechId(techId),
      clearActiveTech: () => setActiveTechId(null),
      setActiveProject: (slug, techIds) => setActiveProjectState({ slug, techIds }),
      clearActiveProject: () => setActiveProjectState(null),
    }),
    [activeTechId, activeProject, relatedProjectSlugs]
  );

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
}
