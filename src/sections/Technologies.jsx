import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiFramer,
  SiDjango,
  SiFlask,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";
import Reveal from "../components/Reveal";
import { technologyGroups } from "../lib/data";

const TECH_ICONS = [
  { name: "Python", Icon: SiPython, color: "#4C7CF7" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F2CC60" },
  { name: "React", Icon: SiReact, color: "#4C7CF7" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#F3F4F6" },
  { name: "TypeScript", Icon: SiTypescript, color: "#4C7CF7" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#4C7CF7" },
  { name: "Framer Motion", Icon: SiFramer, color: "#8B6BF2" },
  { name: "Django", Icon: SiDjango, color: "#3ECF8E" },
  { name: "Flask", Icon: SiFlask, color: "#F3F4F6" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Git", Icon: SiGit, color: "#E8734A" },
  { name: "GitHub", Icon: SiGithub, color: "#F3F4F6" },
];

export default function Technologies() {
  return (
    <section className="relative border-t border-base-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Stack</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Tecnologias em uso real
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Sem porcentagens. Cada tecnologia aqui foi aplicada em um projeto específico —
            veja onde na seção de projetos.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {TECH_ICONS.map((tech, i) => (
            <Reveal key={tech.name} delay={i * 0.03}>
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-base-border bg-base-surface/40 px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-signal-blue/40">
                <tech.Icon size={28} color={tech.color} className="opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="text-xs text-ink-muted">{tech.name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
          {technologyGroups.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.06}>
              <h3 className="font-display text-lg font-medium text-ink">{group.category}</h3>
              <div className="mt-4 flex flex-col gap-4">
                {group.items.map((item) => (
                  <div key={item.name} className="border-l-2 border-base-border pl-4">
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{item.usage}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
