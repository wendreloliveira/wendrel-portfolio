import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import ProjectPreview from "../components/ProjectPreview";
import { projects } from "../lib/data";

const ACCENTS = {
  green: {
    ring: "hover:border-signal-green/40",
    dot: "bg-signal-green",
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(62,207,142,0.35)]",
    tag: "bg-signal-green/10 text-signal-green border-signal-green/20",
  },
  blue: {
    ring: "hover:border-signal-blue/40",
    dot: "bg-signal-blue",
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(76,124,247,0.35)]",
    tag: "bg-signal-blue/10 text-signal-blue border-signal-blue/20",
  },
  violet: {
    ring: "hover:border-signal-violet/40",
    dot: "bg-signal-violet",
    glow: "group-hover:shadow-[0_0_40px_-12px_rgba(139,107,242,0.35)]",
    tag: "bg-signal-violet/10 text-signal-violet border-signal-violet/20",
  },
};

function ProjectCard({ project, index }) {
  const accent = ACCENTS[project.accent];

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative flex h-full flex-col rounded-2xl border border-base-border bg-base-surface/50 p-7 transition-all duration-300 ${accent.ring} ${accent.glow}`}
      >
        <ProjectPreview image={project.image} accent={project.accent} title={project.title} />

        <div className="mb-4 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${accent.tag}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
            {project.status}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-ink">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-base-border bg-base-elevated px-2.5 py-1 font-mono text-[11px] text-ink-muted transition-colors duration-200 group-hover:border-base-border hover:!border-signal-blue/40 hover:!text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="relative scroll-mt-24 overflow-hidden border-t border-base-border py-28">
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-signal-violet/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Portfólio</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Projetos reais
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Uma combinação de projetos em equipe, sob pressão de tempo e com decisões de produto reais.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
