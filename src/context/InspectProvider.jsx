import { useMemo, useState } from "react";
import { InspectContext } from "./inspectState";

export function InspectProvider({ children }) {
  const [inspectMode, setInspectMode] = useState(false);
  // Só uma Detailed Stack aberta por vez, atravessando featured e secondary
  // — é um acordeão único, não um por projeto. Fica aqui (não em cada
  // TechStackInspect) porque "Inspect ligado" e "qual projeto está aberto"
  // são a mesma feature, e desligar Inspect precisa resetar os dois juntos.
  const [openProjectId, setOpenProjectId] = useState(null);

  const value = useMemo(
    () => ({
      inspectMode,
      openProjectId,
      toggleInspect: () => {
        const next = !inspectMode;
        setInspectMode(next);
        // Nunca reabre uma Detailed Stack sozinha ao ligar de novo.
        if (!next) setOpenProjectId(null);
      },
      toggleProjectInspect: (slug) => setOpenProjectId((current) => (current === slug ? null : slug)),
      closeProjectInspect: () => setOpenProjectId(null),
    }),
    [inspectMode, openProjectId]
  );

  return <InspectContext.Provider value={value}>{children}</InspectContext.Provider>;
}
