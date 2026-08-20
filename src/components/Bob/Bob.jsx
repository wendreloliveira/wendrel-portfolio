import { useId, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import BobFace from "./BobFace";
import { COLORS, SIZES, LAYERS, DEFAULT_STATE, DEFAULT_SIZE } from "./bobStates";

// Deslocamento máximo do rosto no cursor-follow — bem pequeno de propósito,
// Bob deve parecer que está "olhando", não perseguindo o mouse (seção 10/11
// do brief). Só roda em desktop com pointer fino; ver handlePointerMove.
const MAX_OFFSET_X = 3;
const MAX_OFFSET_Y = 2;

function canFollowPointer() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Bob — mascote/assistente do portfólio, em SVG puro controlado por React.
 * Sem filtros, sem blur, sem loop de animação contínuo — ver relatório da
 * Fase 1 pra contexto das restrições (compositing Safari/iPhone).
 */
export default function Bob({ state = DEFAULT_STATE, size = DEFAULT_SIZE, interactive = false, className = "" }) {
  const uid = useId();
  const rootRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 220, mass: 0.3 });
  const springY = useSpring(y, { damping: 20, stiffness: 220, mass: 0.3 });

  const { viewBox, width, height } = SIZES[size] ?? SIZES[DEFAULT_SIZE];
  const layers = LAYERS[size] ?? LAYERS[DEFAULT_SIZE];

  function handlePointerMove(e) {
    if (!interactive || !canFollowPointer()) return;
    const bounds = rootRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
    x.set(relX * 2 * MAX_OFFSET_X);
    y.set(relY * 2 * MAX_OFFSET_Y);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <svg
      ref={rootRef}
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
    >
      <defs>
        <linearGradient id={`${uid}-shell`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COLORS.shellTop} />
          <stop offset="1" stopColor={COLORS.shellBottom} />
        </linearGradient>
        <radialGradient id={`${uid}-visor`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor={COLORS.visorTop} />
          <stop offset="1" stopColor={COLORS.visorBottom} />
        </radialGradient>
        {/* Keyframe do state "thinking" fica embutido aqui pra não exigir
            nenhuma edição em src/index.css — Bob continua um componente
            isolado. A regra global de prefers-reduced-motion do projeto
            (seletor universal) já neutraliza essa animação. */}
        <style>{`
          @keyframes bob-thinking-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
          .bob-thinking-dot { animation: bob-thinking-pulse 1.1s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* shell — mais widescreen que a v1 (168x112 vs 160x120), raio quase
          igual em proporção (não "engordou" o squircle) */}
      <rect x={16} y={14} width={168} height={112} rx={34} fill={`url(#${uid}-shell)`} />
      {/* highlight curto, inset pra dentro da própria carcaça (não flutua
          acima da borda) — acompanha a subida da curvatura superior */}
      <path d="M 60 18 Q 100 12 140 18" fill="none" stroke={COLORS.highlight} strokeWidth={1.5} strokeLinecap="round" />

      {/* frame */}
      {layers.frame && (
        <rect x={29} y={27} width={142} height={86} rx={26} fill="none" stroke={COLORS.frameSeam} strokeWidth={2} />
      )}

      {/* visor — mais presença horizontal (margem lateral menor que a
          vertical, em vez de margem uniforme) */}
      <rect x={35} y={35} width={130} height={70} rx={22} fill={`url(#${uid}-visor)`} />

      {/* face — única camada que se move no cursor-follow */}
      <motion.g style={{ x: springX, y: springY }}>
        <BobFace state={state} />
      </motion.g>

      {/* accent violeta do frame — "canal" embutido: sombra da carcaça por
          baixo + traço violeta fino por cima, em vez de uma linha grossa
          solta sobre o material (sem blur, só duas strokes empilhadas) */}
      {layers.accentViolet && (
        <>
          <path
            d="M 55 110 C 55 116 61 120 68 120 L 132 120 C 139 120 145 116 145 110"
            fill="none"
            stroke={COLORS.shellBottom}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={0.6}
          />
          <path
            d="M 55 110 C 55 116 61 120 68 120 L 132 120 C 139 120 145 116 145 110"
            fill="none"
            stroke={COLORS.violet}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </>
      )}

      {/* side indicator */}
      {layers.sideIndicator && <rect x={180} y={48} width={6} height={20} rx={3} fill={COLORS.cyan} />}

      {/* neck — mais fino/curto, mais discreto */}
      {layers.neck && <rect x={92} y={126} width={16} height={10} rx={3} fill={COLORS.shellBottom} />}

      {/* base — mais achatada e larga, lê como dock técnico */}
      {layers.base && (
        <>
          <rect x={46} y={136} width={108} height={40} rx={20} fill={`url(#${uid}-shell)`} />
          {layers.baseAccent && (
            <>
              <path
                d="M 66 168 C 66 173 71 176 77 176 L 123 176 C 129 176 134 173 134 168"
                fill="none"
                stroke={COLORS.shellBottom}
                strokeWidth={4}
                strokeLinecap="round"
                opacity={0.6}
              />
              <path
                d="M 66 168 C 66 173 71 176 77 176 L 123 176 C 129 176 134 173 134 168"
                fill="none"
                stroke={COLORS.violet}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </>
          )}
          {layers.baseIndicators && (
            <>
              <rect x={74} y={158} width={8} height={5} rx={1.5} fill={COLORS.cyan} />
              <rect x={88} y={158} width={8} height={5} rx={1.5} fill={COLORS.cyan} opacity={0.7} />
              <rect x={102} y={158} width={8} height={5} rx={1.5} fill={COLORS.cyan} opacity={0.45} />
            </>
          )}
        </>
      )}
    </svg>
  );
}
