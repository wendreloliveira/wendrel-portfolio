import { useMemo, useState } from "react";
import { InspectContext } from "./inspectState";

export function InspectProvider({ children }) {
  const [inspectMode, setInspectMode] = useState(false);
  // Só uma Detailed Stack aberta por vez, atravessando featured e secondary
  // — é um acordeão único, não um por projeto. Fica aqui (não em cada
  // TechStackInspect) porque "Inspect ligado" e "qual projeto está aberto"
  // são a mesma feature, e desligar Inspect precisa resetar os dois juntos.
  const [openProjectId, setOpenProjectId] = useState(null);
  // Terminal passou a ser controlado por aqui (não mais isOpen interno dele)
  // — é a única forma de Navbar/Bob abrirem e fecharem o Terminal sem
  // querySelector/DOM. Mesmo default que o Terminal já tinha sozinho:
  // mobile nasce recolhido, desktop nasce aberto.
  const [terminalOpen, setTerminalOpenState] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768
  );

  const value = useMemo(() => {
    function enableInspect() {
      setInspectMode(true);
    }
    function disableInspect() {
      setInspectMode(false);
      // Nunca reabre uma Detailed Stack sozinha ao ligar de novo.
      setOpenProjectId(null);
    }
    function setTerminalOpen(next) {
      setTerminalOpenState(next);
    }
    // Developer Mode = Inspect + Terminal orquestrados como uma coisa só.
    // Só as ações explícitas de UI (Navbar, botão perto do Bob) passam por
    // aqui — o comando `inspect off` digitado dentro do próprio Terminal
    // continua chamando só disableInspect() direto (Terminal.jsx), de
    // propósito: não fecha o terminal onde a pessoa acabou de digitar.
    function enableDevMode() {
      enableInspect();
      setTerminalOpenState(true);
    }
    function disableDevMode() {
      disableInspect();
      setTerminalOpenState(false);
    }
    return {
      inspectMode,
      openProjectId,
      terminalOpen,
      enableInspect,
      disableInspect,
      toggleProjectInspect: (slug) => setOpenProjectId((current) => (current === slug ? null : slug)),
      closeProjectInspect: () => setOpenProjectId(null),
      setTerminalOpen,
      enableDevMode,
      disableDevMode,
      toggleDevMode: () => (inspectMode ? disableDevMode() : enableDevMode()),
    };
  }, [inspectMode, openProjectId, terminalOpen]);

  return <InspectContext.Provider value={value}>{children}</InspectContext.Provider>;
}
