import Reveal from "./Reveal";

// Separador entre projetos em destaque — cada case precisa comunicar "isto
// terminou" antes do próximo começar, mas sem competir com o header real do
// próximo projeto (que já tem número + categoria + título logo abaixo). Por
// isso o label aqui é o mínimo possível: só a linha e o número do próximo
// case, nada de nome/categoria repetido. Puramente decorativo/editorial —
// aria-hidden porque a heading real do próximo case já é anunciada normalmente
// em seguida, sem precisar de outro marco redundante pra leitor de tela.
// Reaproveita o Reveal existente (opacity + translateY, já seguro em relação
// a prefers-reduced-motion) em vez de motion/viewport próprios.
export default function ProjectDivider({ nextIndex }) {
  return (
    <Reveal y={8} duration={0.5} className="mx-auto my-2 max-w-3xl sm:my-4">
      <div aria-hidden="true" className="flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-signal-blue/30 to-transparent" />
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
          próximo case · {String(nextIndex + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-signal-blue/30 to-transparent" />
      </div>
    </Reveal>
  );
}
