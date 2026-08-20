import { SiPython, SiReact, SiTypescript, SiNextdotjs, SiFramer, SiFlask, SiGit, SiGithub, SiTailwindcss, SiSupabase, SiVite, SiPostgresql, SiSqlalchemy, SiPytest } from "react-icons/si";
import Reveal from "../components/Reveal";
import { technologyGroups, technologyRegistry, getProjectTitlesByTechId } from "../lib/data";
import { useTechGraph, hasFineHover, relationState } from "../context/graphState";
import { useInspect } from "../context/inspectState";

// Fundo por estado do Tech ↔ Project Graph — sem blur/glow, só cor e opacidade.
const ROW_BG = {
  idle: "",
  active: "bg-base-elevated/70",
  related: "bg-base-elevated/35",
  dimmed: "",
};

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
  const { activeTechId, activeProjectId, relatedTechIds, setActiveTech, clearActiveTech } = useTechGraph();
  const { inspectMode } = useInspect();

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
                    // Nome vem do registry quando há techId; "SQL" usa o
                    // `name` literal. Auditado na V2.7B: nenhum projeto tem
                    // "sql" em primaryTechIds/techGroups (Dados usa
                    // postgresql/sqlalchemy, tecnologias canônicas próprias;
                    // "SQL" só existe como frase editorial genérica aqui).
                    // Sem evidência estruturada por projeto, continua fora
                    // do registry por decisão, não por lacuna — não vira
                    // hover trigger nem ganha techId falso só pra "ativar".
                    // Ainda assim participa do ESTADO AMBIENTAL da seção:
                    // relationState() roda sempre, então "dimmed" se aplica
                    // quando algo mais está ativo — só isso já tira o item
                    // da aparência de "fora" da animação, sem fingir clique.
                    const name = item.techId ? technologyRegistry[item.techId]?.name : item.name;
                    const Icon = item.techId ? ICONS[item.techId] : null;
                    const state = relationState({
                      isActive: item.techId === activeTechId,
                      isRelated: relatedTechIds.includes(item.techId),
                      anyActive: !!activeTechId || !!activeProjectId,
                    });
                    // Duas classNames deliberadamente diferentes: o item
                    // canônico ganha a "caixa" hoverável/focável (-m-2 + p-2
                    // cancelam o deslocamento visual, só ampliam a área de
                    // toque) + fundo de estado; o item não-canônico só
                    // participa da opacidade ambiental — sem caixa, sem
                    // fundo de hover/active, sem outline de foco, pra não
                    // parecer um controle que não é.
                    const rowClassName = item.techId
                      ? `-m-2 flex items-start gap-3 rounded-lg p-2 transition-[background-color,opacity] duration-150 ${ROW_BG[state]} ${
                          state === "dimmed" ? "opacity-50" : "opacity-100"
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-blue/60 focus-visible:outline-offset-2`
                      : `flex items-start gap-3 transition-opacity duration-150 ${state === "dimmed" ? "opacity-50" : "opacity-100"}`;
                    return (
                      <div
                        key={item.techId ?? item.name}
                        tabIndex={item.techId ? 0 : undefined}
                        onMouseEnter={
                          item.techId
                            ? () => {
                                if (hasFineHover()) setActiveTech(item.techId);
                              }
                            : undefined
                        }
                        onMouseLeave={item.techId ? clearActiveTech : undefined}
                        onFocus={item.techId ? () => setActiveTech(item.techId) : undefined}
                        onBlur={item.techId ? clearActiveTech : undefined}
                        aria-label={item.techId ? `Tecnologia: ${name}` : undefined}
                        className={rowClassName}
                      >
                        {Icon ? (
                          <Icon size={18} className="mt-0.5 shrink-0 text-ink-faint" />
                        ) : (
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-ink">{name}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{item.usage}</p>
                          {inspectMode && item.techId && (() => {
                            const titles = getProjectTitlesByTechId(item.techId);
                            return titles.length > 0 ? (
                              <p className="mt-1 font-mono text-[10px] text-ink-faint">
                                Projetos: {titles.join(" · ")}
                              </p>
                            ) : null;
                          })()}
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
