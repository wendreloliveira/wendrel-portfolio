import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineExternalLink, HiX } from "react-icons/hi";

// Modal grande que só monta o iframe do deploy quando o visitante pede —
// nunca no carregamento inicial, e nunca mais de um por vez (é montado sob
// demanda e desmontado ao fechar, então o iframe realmente descarrega).
//
// coldStartNotice (opcional, vem dos dados do projeto) é só um aviso
// honesto — não existe forma confiável de detectar se o app já "acordou"
// de dentro de um iframe cross-origin (o evento load do iframe dispara até
// pra própria página de "waking up" do host), então não tentamos simular
// isso. É um texto dispensável manualmente, nada mais.
export default function LivePreviewModal({ open, onClose, url, title, coldStartNotice }) {
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const [noticeDismissed, setNoticeDismissed] = useState(false);

  // Reaparece a cada abertura — o risco de cold start existe de novo toda
  // vez que o preview é reaberto depois de um tempo ocioso.
  useEffect(() => {
    if (open) setNoticeDismissed(false);
  }, [open]);

  // Foco: guarda quem abriu o modal para devolver o foco a ele ao fechar,
  // e manda o foco pro botão de fechar assim que o modal aparece.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    } else {
      triggerRef.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ao vivo de ${title}`}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-soft"
          >
            <div className="flex items-center justify-between gap-4 border-b border-base-border px-4 py-3">
              <p className="truncate font-mono text-xs text-ink-muted">{title} — preview ao vivo</p>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-base-border px-3 py-1.5 text-xs text-ink-muted transition-colors hover:text-ink"
                >
                  Abrir em nova aba
                  <HiOutlineExternalLink size={14} />
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar preview ao vivo"
                  className="rounded-full border border-base-border p-1.5 text-ink-muted transition-colors hover:text-ink"
                >
                  <HiX size={16} />
                </button>
              </div>
            </div>

            {coldStartNotice && !noticeDismissed && (
              <div className="flex items-start gap-3 border-b border-base-border bg-base-elevated/60 px-4 py-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                <div className="flex-1 text-xs">
                  <p className="font-medium text-ink">{coldStartNotice.title}</p>
                  <p className="mt-0.5 text-ink-muted">{coldStartNotice.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNoticeDismissed(true)}
                  aria-label="Dispensar aviso"
                  className="shrink-0 text-ink-faint transition-colors hover:text-ink"
                >
                  <HiX size={14} />
                </button>
              </div>
            )}

            <div className="min-h-0 flex-1 bg-white">
              {/* O iframe só existe enquanto o modal está aberto — desmonta ao fechar. */}
              <iframe
                src={url}
                title={`Preview ao vivo de ${title}`}
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
