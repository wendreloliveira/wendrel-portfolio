import { createContext, useContext } from "react";

// Liga/desliga a camada técnica opcional do portfólio ("abrir o capô").
// Separado do GraphContext de propósito — são responsabilidades diferentes
// (hover/relação vs. visibilidade de anotações técnicas), mesmo os dois
// sendo estados pequenos.
export const InspectContext = createContext(null);

export function useInspect() {
  return useContext(InspectContext);
}
