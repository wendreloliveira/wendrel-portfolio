import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import GridBackground from "../components/GridBackground";
import Terminal from "../components/Terminal";
import { profile } from "../lib/data";
import MagneticButton from "../components/MagneticButton";
import heroPhotoAvif from "../assets/hero-photo.avif";
import heroPhotoWebp from "../assets/hero-photo.webp";

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { damping: 30, stiffness: 60 });
  const springY = useSpring(my, { damping: 30, stiffness: 60 });
  const rotateX = useTransform(springY, [-40, 40], [3, -3]);
  const rotateY = useTransform(springX, [-40, 40], [-3, 3]);
  const translateBg = useTransform(springX, [-40, 40], [-14, 14]);

  const handleMouseMove = (e) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const relX = e.clientX - bounds.left - bounds.width / 2;
    const relY = e.clientY - bounds.top - bounds.height / 2;
    mx.set(Math.max(-40, Math.min(40, relX / 12)));
    my.set(Math.max(-40, Math.min(40, relY / 12)));
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="topo"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-28"
    >
      <motion.div style={{ x: translateBg }} className="absolute inset-0">
        <GridBackground />
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        {/* Três elementos claros: mensagem, fotografia, prova técnica — sem disputar espaço entre si. */}
        <div className="grid gap-14 pt-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-16">
          <div>
            {/*
              Texto crítico do Hero (H1 = LCP medido via Lighthouse) não pode
              depender de opacity:0 → 1 via JS para ficar visível — isso mede
              como "element render delay" no LCP (1,5s+ medidos). Por isso só
              a posição (y) anima aqui; opacidade fica sempre em 1, então o
              conteúdo já está pintado no primeiro paint, só se reacomodando
              alguns pixels em seguida.
            */}
            <motion.span
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface/60 px-4 py-1.5 text-xs text-ink-muted"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-green opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-green" />
              </span>
              disponível para novos projetos
            </motion.span>

            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
            >
              {profile.headline[0]}
              <br />
              <span className="text-gradient">{profile.headline[1]}</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {profile.subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projetos"
                className="group inline-flex items-center gap-2 rounded-full bg-grad-signal px-6 py-3 text-sm font-medium text-white shadow-glow transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(76,124,247,0.4)]"
              >
                Ver Projetos
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full border border-base-border bg-base-surface/40 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-faint"
              >
                Entrar em Contato
              </a>
            </motion.div>
          </div>

          {/* Fotografia — elemento editorial, não mais um card pequeno sobre o terminal. */}
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-xs md:max-w-none"
          >
            {/* DIAGNÓSTICO TEMPORÁRIO (diag/photo-zoom-blur): blur só a partir
                de lg (1024px) — isola o filter:blur(64px) do 3D do card pai
                para o teste de crash de pinch-zoom no Safari/iPhone. 3D
                (rotateX/rotateY/transformPerspective, acima) permanece o
                original de produção, intocado. NÃO É FIX — reverter para
                blur-3xl sem prefixo ao concluir o teste. */}
            <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-grad-signal opacity-[0.15] lg:blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-base-border">
              {/*
                A imagem já vem recortada exatamente em 4:5 (mesma proporção do
                container), então object-cover nunca precisa cortar mais nada —
                o enquadramento é o mesmo em qualquer breakpoint, sem depender
                de object-position "no chute".
              */}
              <picture>
                <source srcSet={heroPhotoAvif} type="image/avif" />
                <source srcSet={heroPhotoWebp} type="image/webp" />
                <img
                  src={heroPhotoWebp}
                  alt={`Foto de ${profile.name}`}
                  width={960}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover"
                />
              </picture>
              {/* Dissolve o fundo claro da foto nas bordas inferior/laterais, integrando-a ao fundo escuro do Hero. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-base/70 to-transparent sm:w-14" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-base/70 to-transparent sm:w-14" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{profile.name}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">{profile.formation}</span>
            </div>
          </motion.div>
        </div>

        {/* Prova técnica — o terminal vive na própria linha, sem disputar espaço com a foto. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 md:mt-20"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
