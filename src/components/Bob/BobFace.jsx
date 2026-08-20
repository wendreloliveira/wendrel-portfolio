import { COLORS, EXPRESSIONS } from "./bobStates";

// Slots fixos dentro do visor — todo glifo é desenhado a partir de um desses
// dois centros, então trocar de expressão nunca desloca a composição.
// v1.1: mais espalhados (visor ficou mais largo) pra reforçar a assimetria.
const LEFT = { cx: 80, cy: 70 };
const RIGHT = { cx: 124, cy: 70 };
const MID_X = (LEFT.cx + RIGHT.cx) / 2;

const STROKE_PROPS = {
  stroke: COLORS.cyan,
  strokeWidth: 6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

// Cada "parte" é puro vetor (path/line/circle) — nada de texto/webfont, pra
// manter o glifo consistente em qualquer tamanho de render.
function Part({ id }) {
  switch (id) {
    case "chevronLeft":
      // v1.1: ~12% menor e stroke mais fino que a v1 — lê mais "técnico",
      // menos "seta grossa".
      return <path d={`M ${LEFT.cx - 8} ${LEFT.cy - 11} L ${LEFT.cx + 6} ${LEFT.cy} L ${LEFT.cx - 8} ${LEFT.cy + 11}`} {...STROKE_PROPS} />;
    case "chevronRight":
      // Segundo chevron do state "active": menor + opacity reduzida, cria
      // hierarquia com o primeiro em vez de duas setas iguais (fast-forward).
      return (
        <path
          d={`M ${RIGHT.cx - 7} ${RIGHT.cy - 9} L ${RIGHT.cx + 5} ${RIGHT.cy} L ${RIGHT.cx - 7} ${RIGHT.cy + 9}`}
          {...STROKE_PROPS}
          strokeWidth={5}
          opacity={0.75}
        />
      );
    case "dashLeft":
      return <line x1={LEFT.cx - 7} y1={LEFT.cy + 2} x2={LEFT.cx + 7} y2={LEFT.cy + 2} {...STROKE_PROPS} />;
    case "dashRight":
      return <line x1={RIGHT.cx - 7} y1={RIGHT.cy + 2} x2={RIGHT.cx + 7} y2={RIGHT.cy + 2} {...STROKE_PROPS} />;
    case "dashRightDim":
      return <line x1={RIGHT.cx - 7} y1={RIGHT.cy + 2} x2={RIGHT.cx + 7} y2={RIGHT.cy + 2} {...STROKE_PROPS} opacity={0.5} />;
    case "crossLeft":
      return (
        <path
          d={`M ${LEFT.cx - 7} ${LEFT.cy - 7} L ${LEFT.cx + 7} ${LEFT.cy + 7} M ${LEFT.cx + 7} ${LEFT.cy - 7} L ${LEFT.cx - 7} ${LEFT.cy + 7}`}
          {...STROKE_PROPS}
        />
      );
    case "bracketLeft":
      return <path d={`M ${LEFT.cx + 5} ${LEFT.cy - 12} L ${LEFT.cx} ${LEFT.cy - 12} L ${LEFT.cx} ${LEFT.cy + 12} L ${LEFT.cx + 5} ${LEFT.cy + 12}`} {...STROKE_PROPS} />;
    case "bracketRight":
      return <path d={`M ${RIGHT.cx - 5} ${RIGHT.cy - 12} L ${RIGHT.cx} ${RIGHT.cy - 12} L ${RIGHT.cx} ${RIGHT.cy + 12} L ${RIGHT.cx - 5} ${RIGHT.cy + 12}`} {...STROKE_PROPS} />;
    case "dotsThinking":
      return (
        <>
          <circle cx={LEFT.cx} cy={70} r={4} fill={COLORS.cyan} className="bob-thinking-dot" style={{ animationDelay: "0ms" }} />
          <circle cx={MID_X} cy={70} r={4} fill={COLORS.cyan} className="bob-thinking-dot" style={{ animationDelay: "160ms" }} />
          <circle cx={RIGHT.cx} cy={70} r={4} fill={COLORS.cyan} className="bob-thinking-dot" style={{ animationDelay: "320ms" }} />
        </>
      );
    default:
      return null;
  }
}

// Camada isolada do "rosto" — puramente função de state. Bob.jsx que decide
// se/como esse grupo se move (cursor-follow); aqui é só desenho.
export default function BobFace({ state }) {
  const expression = EXPRESSIONS[state] ?? EXPRESSIONS.idle;
  return (
    <g opacity={expression.faceOpacity ?? 1}>
      {expression.parts.map((part) => (
        <Part key={part} id={part} />
      ))}
    </g>
  );
}
