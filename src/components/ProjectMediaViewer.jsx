import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const SWIPE_THRESHOLD = 60;

// Viewer de screenshots reutilizável — controla apenas o "qual índice está
// ativo" e como transicionar entre eles. A apresentação ao redor (dots vs.
// filmstrip vs. grid clicável) fica a cargo de quem usa este componente,
// via showDots/onIndexChange/ref, para não repetir o mesmo layout nos 3 projetos.
const ProjectMediaViewer = forwardRef(function ProjectMediaViewer(
  { images, projectTitle, initialIndex = 0, showDots = true, showArrows = true, aspectClassName = "aspect-[4/3]", className = "", onIndexChange },
  ref
) {
  // [índice, direção] — direção (+1/-1) só decide de que lado a próxima
  // imagem entra na animação, não é usada para nenhuma outra lógica.
  const [[index, direction], setState] = useState([initialIndex, 0]);
  const shouldReduceMotion = useReducedMotion();

  // Avisa o pai (para destacar a miniatura certa) depois do commit, nunca
  // dentro do updater do setState acima — chamar o setState de outro
  // componente ali dentro é o antipadrão que o React aponta como
  // "Cannot update a component while rendering a different component".
  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  function goTo(nextIndex) {
    setState(([current]) => {
      const clamped = ((nextIndex % images.length) + images.length) % images.length;
      if (clamped === current) return [current, 0];
      return [clamped, clamped > current ? 1 : -1];
    });
  }

  // API imperativa: quem renderiza um filmstrip/grid externo (RISK, DKastro)
  // chama viewerRef.current.goTo(i) para sincronizar o viewer com o clique.
  useImperativeHandle(ref, () => ({
    goTo,
    next: () => goTo(index + 1),
    prev: () => goTo(index - 1),
  }));

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  function handleDragEnd(_e, info) {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1);
  }

  const current = images[index];
  const multiple = images.length > 1;

  return (
    <div
      className={`group/viewer relative overflow-hidden rounded-xl border border-base-border bg-base-surface shadow-soft ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={`Screenshots de ${projectTitle}`}
      tabIndex={multiple ? 0 : -1}
      onKeyDown={multiple ? handleKeyDown : undefined}
    >
      <div className="flex items-center gap-1.5 border-b border-base-border bg-base-elevated/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/50" />
        <span className="h-2 w-2 rounded-full bg-amber-400/50" />
        <span className="h-2 w-2 rounded-full bg-signal-green/50" />
      </div>

      <div className={`relative ${aspectClassName} overflow-hidden bg-base-surface`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            decoding="async"
            custom={direction}
            drag={multiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 h-full w-full object-cover ${multiple ? "cursor-grab active:cursor-grabbing" : ""}`}
          />
        </AnimatePresence>

        {showArrows && multiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={`Imagem anterior de ${projectTitle}`}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-base-border bg-base/70 p-1.5 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-base/90 focus-visible:opacity-100 group-hover/viewer:opacity-100"
            >
              <HiChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={`Próxima imagem de ${projectTitle}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-base-border bg-base/70 p-1.5 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-base/90 focus-visible:opacity-100 group-hover/viewer:opacity-100"
            >
              <HiChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {showDots && multiple && (
        <div className="flex items-center justify-center gap-1.5 border-t border-base-border py-2.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir para imagem ${i + 1} de ${projectTitle}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-signal-blue" : "w-1.5 bg-base-border hover:bg-ink-faint"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ProjectMediaViewer;
