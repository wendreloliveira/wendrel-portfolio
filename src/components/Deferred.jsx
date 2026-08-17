import { useEffect, useRef, useState } from "react";

// Loaders registrados por id — permite que código fora da árvore React (o
// Terminal, ao rodar "open empregaai") force uma seção ainda não visível a
// carregar antes de rolar até ela. Fica fora do React de propósito: não
// precisa de contexto/provider para algo tão simples quanto "carregue isso".
const loaders = new Map();

export function forceLoad(id) {
  loaders.get(id)?.();
}

// Envolve uma seção abaixo da dobra. O wrapper (com o id real, usado por
// anchors/scroll) fica sempre no DOM — só o CONTEÚDO é importado e montado
// quando o wrapper se aproxima da viewport (IntersectionObserver com
// rootMargin generoso) ou quando alguém chama forceLoad(id)/um dos
// anchorIds. Isso evita o problema de "lazy() num componente que já
// renderiza no primeiro load" — o import só dispara pela proximidade real.
export default function Deferred({ id, anchorIds, rootMargin = "400px 0px", minHeightClassName = "", importer }) {
  const [Comp, setComp] = useState(null);
  const wrapperRef = useRef(null);
  const triggeredRef = useRef(false);

  function load() {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    importer().then((mod) => setComp(() => mod.default));
  }

  // Registra esta seção sob todos os ids que devem conseguir "acordá-la"
  // (o wrapper + qualquer sub-id que viva dentro dela, ex.: os cases do
  // Projects — "empregaai"/"risk"/"dkastro" ainda não existem no DOM antes
  // do import, mas precisam conseguir disparar o mesmo load).
  useEffect(() => {
    const ids = anchorIds || [id];
    ids.forEach((aid) => loaders.set(aid, load));
    return () => ids.forEach((aid) => loaders.delete(aid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!wrapperRef.current || triggeredRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={id} ref={wrapperRef} className={`scroll-mt-24 ${Comp ? "" : minHeightClassName}`}>
      {Comp && <Comp />}
    </div>
  );
}
