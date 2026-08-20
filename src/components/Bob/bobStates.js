// Bob — configuração de cores, tamanhos e expressões.
// Mantido separado de Bob.jsx/BobFace.jsx pra trocar geometria/paleta sem
// mexer na lógica de render ou de interação.

export const COLORS = {
  // Ciano do rosto/indicadores — não é o mesmo tom de signal.blue do resto
  // do portfólio (mais claro/cyan), mas fica na mesma família azul-violeta.
  cyan: "#5CD9FA",
  violet: "#8B6BF2",
  shellTop: "#22252A",
  shellBottom: "#0C0D10",
  frameSeam: "rgba(255,255,255,0.08)",
  visorTop: "#0A0B0D",
  visorBottom: "#000000",
  highlight: "rgba(255,255,255,0.14)",
};

// viewBox + dimensão renderizada por tamanho. Largura/altura sempre
// derivadas da proporção do próprio viewBox — evita distorcer o SVG.
// v1.1: cabeça e base mais achatadas (mais widescreen) reduziram a altura
// total do conteúdo — viewBox/dimensões acompanham.
export const SIZES = {
  sm: { viewBox: "0 0 200 140", width: 56, height: 39 },
  md: { viewBox: "0 0 200 190", width: 104, height: 99 },
  lg: { viewBox: "0 0 200 190", width: 160, height: 152 },
};

// Quais grupos de layer aparecem em cada tamanho — simplificação
// progressiva (seção 22 do brief): sm só cabeça, md soma base simplificada,
// lg soma indicadores/side button.
export const LAYERS = {
  sm: { frame: false, accentViolet: false, neck: false, base: false, baseAccent: false, baseIndicators: false, sideIndicator: false },
  md: { frame: true, accentViolet: true, neck: true, base: true, baseAccent: true, baseIndicators: false, sideIndicator: false },
  lg: { frame: true, accentViolet: true, neck: true, base: true, baseAccent: true, baseIndicators: true, sideIndicator: true },
};

// Cada expressão é só uma lista de "partes" que o BobFace sabe desenhar.
// Symbol textual (>_ etc.) é só documentação — o glifo real é vetor, não texto.
export const EXPRESSIONS = {
  idle: { symbol: "> _", parts: ["chevronLeft", "dashRight"] },
  active: { symbol: "> >", parts: ["chevronLeft", "chevronRight"] },
  thinking: { symbol: "...", parts: ["dotsThinking"] },
  inspect: { symbol: "[ ]", parts: ["bracketLeft", "bracketRight"] },
  error: { symbol: "x _", parts: ["crossLeft", "dashRightDim"] },
  sleep: { symbol: "_ _", parts: ["dashLeft", "dashRight"], faceOpacity: 0.5 },
};

export const DEFAULT_STATE = "idle";
export const DEFAULT_SIZE = "md";
