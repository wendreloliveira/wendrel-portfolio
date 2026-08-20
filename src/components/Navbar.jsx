import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import avatarAvif from "../assets/avatar.avif";
import avatarWebp from "../assets/avatar.webp";
import { useInspect } from "../context/inspectState";

const LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Trajetória", href: "#timeline" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Contato", href: "#contato" },
];

// Atalho compacto do Developer Mode — "abrir o capô", não "ligar um painel
// de debug". Mesma fonte de estado (toggleDevMode) do botão maior perto do
// Bob no Hero, então os dois nunca divergem. Só existe no desktop agora —
// no mobile o controle principal fica junto do Bob, onde o efeito acontece
// (menos descoberta perdida do que dentro do menu). aria-pressed carrega o
// estado pra leitor de tela; o dot + cor carregam pra quem enxerga.
function DevModeToggle() {
  const { inspectMode, toggleDevMode } = useInspect();
  return (
    <button
      type="button"
      onClick={toggleDevMode}
      aria-pressed={inspectMode}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs transition-colors duration-150 ${
        inspectMode
          ? "border-signal-blue/50 bg-signal-blue/10 text-signal-blue"
          : "border-base-border text-ink-muted hover:border-ink-faint hover:text-ink"
      }`}
    >
      <span aria-hidden="true">{"</>"}</span>
      Dev Mode
      {inspectMode && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal-blue" />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-base-border bg-base/70 backdrop-blur-xl py-3"
          : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#topo" className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight">
          <span className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-grad-signal p-[2px] shadow-soft transition-transform duration-300 hover:scale-105">
            <picture>
              <source srcSet={avatarAvif} type="image/avif" />
              <source srcSet={avatarWebp} type="image/webp" />
              <img
                src={avatarWebp}
                alt="Wendrel Oliveira"
                width={256}
                height={256}
                className="h-full w-full rounded-full border-2 border-base object-cover"
              />
            </picture>
          </span>
          <span className="hidden sm:inline">Wendrel Oliveira</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <DevModeToggle />
          <a
            href="#contato"
            className="rounded-full border border-base-border bg-base-elevated px-4 py-2 text-sm font-medium text-ink transition-all hover:border-signal-blue/50 hover:bg-base-elevated/80"
          >
            Entrar em contato
          </a>
        </div>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-base-border bg-base/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-ink-muted transition-colors hover:bg-base-elevated hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
