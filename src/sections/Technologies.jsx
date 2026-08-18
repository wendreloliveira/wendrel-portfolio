import { SiPython, SiReact, SiTypescript, SiNextdotjs, SiFramer, SiDjango, SiFlask, SiGit, SiGithub, SiTailwindcss, SiSupabase, SiVite } from "react-icons/si";
import Reveal from "../components/Reveal";
import { technologyGroups } from "../lib/data";

// Ícone é só apoio visual do nome — não existe entrada aqui sem uma linha
// de uso correspondente em technologyGroups (src/lib/data.js).
const ICONS = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Framer Motion": SiFramer,
  Python: SiPython,
  Django: SiDjango,
  Flask: SiFlask,
  Supabase: SiSupabase,
  Git: SiGit,
  GitHub: SiGithub,
  Vite: SiVite,
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
                    const Icon = ICONS[item.name];
                    return (
                      <div key={item.name} className="flex items-start gap-3">
                        {Icon ? (
                          <Icon size={18} className="mt-0.5 shrink-0 text-ink-faint" />
                        ) : (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-ink">{item.name}</p>
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
