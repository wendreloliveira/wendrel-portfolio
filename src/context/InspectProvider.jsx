import { useEffect, useMemo, useRef, useState } from "react";
import { InspectContext } from "./inspectState";

export function InspectProvider({ children }) {
  const [inspectMode, setInspectMode] = useState(false);
  // Terminal não é mais uma feature independente do Hero: Developer Mode é a
  // única porta de entrada da camada técnica. terminalOpen continua existindo
  // como estado próprio (o Terminal ainda precisa saber se está aberto), mas
  // agora só enableDevMode/disableDevMode escrevem nele — não há setter
  // público, porque não existe mais nenhum CTA de "abrir terminal" na UI.
  const [terminalOpen, setTerminalOpen] = useState(false);
  // Único timer da saída deferida do comando `inspect off` (ver
  // requestDevModeOff). Ref pra poder cancelar e nunca acumular dois.
  const devModeOffTimer = useRef(null);

  useEffect(() => () => clearTimeout(devModeOffTimer.current), []);

  const value = useMemo(() => {
    function enableInspect() {
      setInspectMode(true);
    }
    function disableInspect() {
      setInspectMode(false);
    }
    // Developer Mode = Inspect + Terminal orquestrados como uma coisa só.
    // Toda entrada e saída da camada técnica passa por estas duas funções.
    function enableDevMode() {
      clearTimeout(devModeOffTimer.current);
      enableInspect();
      setTerminalOpen(true);
    }
    function disableDevMode() {
      clearTimeout(devModeOffTimer.current);
      disableInspect();
      setTerminalOpen(false);
    }
    // Saída pedida de dentro do próprio Terminal (comando `inspect off`).
    // Desligar na hora faria a resposta sumir no mesmo frame em que foi
    // impressa, então o Terminal fica aberto o tempo de ela ser lida e só
    // depois recolhe. Reduced motion desliga direto — quem pediu menos
    // movimento não deve esperar por causa de uma transição.
    function requestDevModeOff() {
      const reducedMotion =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) {
        disableDevMode();
        return;
      }
      clearTimeout(devModeOffTimer.current);
      devModeOffTimer.current = setTimeout(disableDevMode, 700);
    }
    return {
      inspectMode,
      terminalOpen,
      enableInspect,
      disableInspect,
      enableDevMode,
      disableDevMode,
      requestDevModeOff,
      toggleDevMode: () => (inspectMode ? disableDevMode() : enableDevMode()),
    };
  }, [inspectMode, terminalOpen]);

  return <InspectContext.Provider value={value}>{children}</InspectContext.Provider>;
}
