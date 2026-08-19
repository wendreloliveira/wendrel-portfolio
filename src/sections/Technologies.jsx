import { SiPython, SiReact, SiTypescript, SiNextdotjs, SiFramer, SiFlask, SiGit, SiGithub, SiTailwindcss, SiSupabase, SiVite, SiPostgresql, SiSqlalchemy, SiPytest } from "react-icons/si";
import Reveal from "../components/Reveal";
import { technologyGroups, technologyRegistry } from "../lib/data";

// Ícone é só apoio visual, mapeado por techId — não existe entrada aqui sem
// uma linha de uso correspondente em technologyGroups (src/lib/data.js).
const ICONS = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  framermotion: SiFramer,
  python: SiPython,
  flask: SiFlask,
  sqlalchemy: SiSqlalchemy,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  git: SiGit,
  github: SiGithub,
  vite: SiVite,
  pytest: SiPytest,
};

export default function Technologies() {
  return (
    <section className="relative border-t border-base-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Stack</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Tecnologias em uso real
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            Ferramentas que aparecem no meu trabalho real — organizadas pelo contexto em que foram aplicadas.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {technologyGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.06}>
              <div className="h-full rounded-2xl border border-base-border bg-base-surface/40 p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-signal-blue">{group.category}</h3>
                <div className="mt-4 flex flex-col gap-4">
                  {group.items.map((item) => {
                    // Nome vem do registry quando há techId; "SQL" (sem
                    // tecnologia canônica confirmada) usa o `name` literal.
                    const name = item.techId ? technologyRegistry[item.techId]?.name : item.name;
                    const Icon = item.techId ? ICONS[item.techId] : null;
                    return (
                      <div key={item.techId ?? item.name} className="flex items-start gap-3">
                        {Icon ? (
                          <Icon size={18} className="mt-0.5 shrink-0 text-ink-faint" />
                        ) : (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-ink">{name}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{item.usage}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
