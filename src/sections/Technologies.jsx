import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiCss as SiCss3,
  SiFlask,
  SiDjango,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";
import Reveal from "../components/Reveal";
import SkillBar from "../components/SkillBar";
import { skills } from "../lib/data";

const TECH_ICONS = [
  { name: "Python", Icon: SiPython, color: "#4C7CF7" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F2CC60" },
  { name: "React", Icon: SiReact, color: "#4C7CF7" },
  { name: "TypeScript", Icon: SiTypescript, color: "#4C7CF7" },
  { name: "HTML", Icon: SiHtml5, color: "#E8734A" },
  { name: "CSS", Icon: SiCss3, color: "#4C7CF7" },
  { name: "Flask", Icon: SiFlask, color: "#F3F4F6" },
  { name: "Django", Icon: SiDjango, color: "#3ECF8E" },
  { name: "SQL", Icon: SiPostgresql, color: "#4C7CF7" },
  { name: "Git", Icon: SiGit, color: "#E8734A" },
  { name: "GitHub", Icon: SiGithub, color: "#F3F4F6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#4C7CF7" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
];

export default function Technologies() {
  return (
    <section id="tecnologias" className="relative scroll-mt-24 border-t border-base-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Stack</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Tecnologias &amp; fundamentos
          </h2>
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

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:items-start">
          <div>
            <Reveal>
              <h3 className="font-display text-xl font-medium text-ink">Onde estou hoje</h3>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                Base sólida em lógica e estruturas de dados, aplicada com Python e Flask no
                dia a dia — em evolução constante rumo a automação, dados e IA.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6">
            {skills.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 0.06}>
                <SkillBar name={skill.name} level={skill.level} delay={i * 0.06} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
