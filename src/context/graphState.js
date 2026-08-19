import { createContext, useContext } from "react";

// Estado mínimo pro Tech ↔ Project Graph V1: só o necessário pra Technologies
// e Projects "se enxergarem" através da Data Truth Layer, sem duplicar regra
// de relação em nenhum dos dois lados. Só um lado fica ativo por vez.
export const GraphContext = createContext(null);

export function useTechGraph() {
  return useContext(GraphContext);
}

// Só ativa a relação em dispositivos com hover/mouse de verdade — em touch,
// não simula hover (mobile fica sem essa interação, mas continua íntegro).
export function hasFineHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// idle: nada ativo. active: é o próprio item hovered/focused. related: do
// outro lado do grafo em relação ao item ativo. dimmed: algo está ativo em
// outro lugar e este item não participa da relação.
export function relationState({ isActive, isRelated, anyActive }) {
  if (isActive) return "active";
  if (isRelated) return "related";
  if (anyActive) return "dimmed";
  return "idle";
}
