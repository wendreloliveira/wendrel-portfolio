import { HiOutlineLightningBolt, HiOutlineCube, HiOutlineChatAlt2 } from "react-icons/hi";
import Reveal from "../components/Reveal";
import AnimatedCounter from "../components/AnimatedCounter";
import { stats } from "../lib/data";

const VALUES = [
  {
    icon: HiOutlineLightningBolt,
    title: "Aprendizado rápido",
    description: "Absorvo tecnologias novas com agilidade e aplico na prática, sem enrolação.",
  },
  {
    icon: HiOutlineCube,
    title: "Base sólida",
    description: "Fundamentos fortes em lógica, algoritmos e boas práticas guiam cada linha de código.",
  },
  {
    icon: HiOutlineChatAlt2,
    title: "Comunicação clara",
    description: "Você entende o que está sendo feito, por quê e em quanto tempo — sem jargão.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 border-t border-base-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Sobre</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Menos enrolação, mais entrega.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Ainda estou construindo minha trajetória — e é exatamente por isso que trago
            energia, atualização constante e vontade genuína de fazer bem feito em cada projeto.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i}>
              <div className="rounded-2xl border border-base-border bg-base-surface/50 p-5">
                <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                  <AnimatedCounter value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </div>
                <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-2xl border border-base-border bg-base-surface/40 p-6 transition-colors duration-300 hover:border-signal-blue/40 hover:bg-base-surface/70">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-base-elevated text-signal-blue transition-transform duration-300 group-hover:scale-110">
                  <v.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
