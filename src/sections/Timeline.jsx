import Reveal from "../components/Reveal";
import { timeline } from "../lib/data";

export default function Timeline() {
  return (
    <section className="relative border-t border-base-border py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Trajetória</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Da formação aos projetos reais
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Uma trajetória construída enquanto estudo — levando conhecimento da sala de aula
            para projetos, pesquisa, produto e contextos reais.
          </p>
        </Reveal>

        {/* Sem linha vertical nem bolinhas — a numeração e a borda superior
            discreta já comunicam sequência, sem competir visualmente com Projects. */}
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04} className="border-t border-base-border pt-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-signal-blue">{item.tag}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
