import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import GridBackground from "../components/GridBackground";
import { profile } from "../lib/data";
import HeroProfileCard from "../components/HeroProfileCard";
import MagneticButton from "../components/MagneticButton";

const ROLE_INTERVAL = 2200;

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length);
    }, ROLE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      {profile.roles.map((role, i) => (
        <motion.span
          key={role}
          className="absolute left-0 top-0 whitespace-nowrap text-gradient"
          initial={false}
          animate={{
            y: i === index ? 0 : i < index ? "-100%" : "100%",
            opacity: i === index ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {role}
        </motion.span>
      ))}
      {/* Reserve width for the longest role */}
      <span className="invisible whitespace-nowrap">
        {profile.roles.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </span>
  );
}

function TerminalCard() {
  const [step, setStep] = useState(0);
  const fullLines = [
    { indent: 0, content: [{ c: "kw", v: "class " }, { c: "cls", v: "Developer" }, { c: "plain", v: ":" }] },
    { indent: 1, content: [{ c: "kw", v: "def " }, { c: "fn", v: "__init__" }, { c: "plain", v: "(self):" }] },
    { indent: 2, content: [{ c: "plain", v: "self." }, { c: "attr", v: "name" }, { c: "plain", v: " = " }, { c: "str", v: '"Wendrel Oliveira"' }] },
    { indent: 2, content: [{ c: "plain", v: "self." }, { c: "attr", v: "stack" }, { c: "plain", v: " = [" }, { c: "str", v: '"Python"' }, { c: "plain", v: ", " }, { c: "str", v: '"React"' }, { c: "plain", v: ", " }, { c: "str", v: '"IA"' }, { c: "plain", v: "]" }] },
    { indent: 2, content: [{ c: "plain", v: "self." }, { c: "attr", v: "focus" }, { c: "plain", v: " = " }, { c: "str", v: '"automação + produto"' }] },
    { indent: 1, content: [{ c: "kw", v: "def " }, { c: "fn", v: "disponibilidade" }, { c: "plain", v: "(self):" }] },
    { indent: 2, content: [{ c: "kw", v: "return " }, { c: "bool", v: "True" }] },
  ];

  useEffect(() => {
    if (step >= fullLines.length) return;
    const id = setTimeout(() => setStep((s) => s + 1), 420);
    return () => clearTimeout(id);
  }, [step]);

  const colorMap = {
    kw: "text-signal-violet",
    cls: "text-signal-blue",
    fn: "text-signal-blue",
    attr: "text-ink",
    str: "text-signal-green",
    bool: "text-amber-400",
    plain: "text-ink-muted",
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-base-border bg-base-surface/80 shadow-soft backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-base-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-green/70" />
        <span className="ml-2 font-mono text-xs text-ink-faint">perfil.py</span>
      </div>
      <div className="min-h-[220px] p-5 font-mono text-[13px] leading-relaxed">
        {fullLines.slice(0, step).map((line, i) => (
          <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
            {line.content.map((tok, j) => (
              <span key={j} className={colorMap[tok.c]}>
                {tok.v}
              </span>
            ))}
          </div>
        ))}
        {step < fullLines.length && (
          <span className="inline-block h-3.5 w-1.5 animate-blink bg-signal-blue align-middle" />
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { damping: 30, stiffness: 60 });
  const springY = useSpring(my, { damping: 30, stiffness: 60 });
  const rotateX = useTransform(springY, [-40, 40], [4, -4]);
  const rotateY = useTransform(springX, [-40, 40], [-4, 4]);
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
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <motion.div style={{ x: translateBg }} className="absolute inset-0">
        <GridBackground />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            {profile.name}
            <br />
            <RotatingRole />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex justify-center md:justify-end"
        >
          <div className="relative flex flex-col items-center gap-6 sm:block sm:pl-10">
            <HeroProfileCard className="relative sm:absolute sm:-left-8 sm:-top-9 lg:-left-12" />
            <TerminalCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
