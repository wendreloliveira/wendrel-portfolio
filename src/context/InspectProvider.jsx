import { useMemo, useState } from "react";
import { InspectContext } from "./inspectState";

export function InspectProvider({ children }) {
  const [inspectMode, setInspectMode] = useState(false);
  // Só uma Detailed Stack aberta por vez, atravessando featured e secondary
  // — é um acordeão único, não um por projeto. Fica aqui (não em cada
  // TechStackInspect) porque "Inspect ligado" e "qual projeto está aberto"
  // são a mesma feature, e desligar Inspect precisa resetar os dois juntos.
  const [openProjectId, setOpenProjectId] = useState(null);

  const value = useMemo(() => {
    // enable/disable são as primitivas explícitas (o Terminal precisa de
    // intenção clara pra "inspect on"/"inspect off" serem idempotentes —
    // um toggle cego ligaria/desligaria errado se o comando repetir).
    // toggleInspect (usado pela Navbar) só compõe as duas.
    function enableInspect() {
      setInspectMode(true);
    }
    function disableInspect() {
      setInspectMode(false);
      // Nunca reabre uma Detailed Stack sozinha ao ligar de novo.
      setOpenProjectId(null);
    }
    return {
      inspectMode,
      openProjectId,
      enableInspect,
      disableInspect,
      toggleInspect: () => (inspectMode ? disableInspect() : enableInspect()),
      toggleProjectInspect: (slug) => setOpenProjectId((current) => (current === slug ? null : slug)),
      closeProjectInspect: () => setOpenProjectId(null),
    };
  }, [inspectMode, openProjectId]);

  return <InspectContext.Provider value={value}>{children}</InspectContext.Provider>;
}
