import { AnimatePresence, motion } from "framer-motion";
import { portfolioInspectNotes } from "../lib/data";
import { useInspect } from "../context/inspectState";

export default function Footer() {
  const { inspectMode } = useInspect();

  return (
    <footer className="border-t border-base-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-ink-faint sm:flex-row">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
            feito com Python, café e curiosidade — 2026
          </span>
          <span>Wendrel Oliveira</span>
        </div>

        <AnimatePresence initial={false}>
          {inspectMode && (
            <motion.p
              key="footer-inspect"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mt-6 border-t border-base-border pt-6 font-mono text-[11px] leading-relaxed text-ink-faint"
            >
              <span className="text-signal-blue">[ portfólio ]</span> {portfolioInspectNotes.engineering}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
