import Reveal from "../components/Reveal";
import AnimatedCounter from "../components/AnimatedCounter";
import { stats } from "../lib/data";

export default function About() {
  return (
    <section id="sobre" className="relative scroll-mt-24 border-t border-base-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Sobre</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Aprendo construindo, não apenas estudando.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Curso Engenharia de Software na Univassouras e construo minha experiência
            participando de projetos reais — de plataformas em equipe multidisciplinar a
            entregas para empresas. Prefiro resolver problemas concretos a acumular teoria: os
            projetos abaixo são a prova disso, não uma lista de tecnologias.
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
      </div>
    </section>
  );
}
