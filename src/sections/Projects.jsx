import Reveal from "../components/Reveal";
import ProjectPreview from "../components/ProjectPreview";
import ProjectCase from "../components/ProjectCase";
import { featuredProjects, secondaryProjects } from "../lib/data";

// Mesma estrutura para todos — só conteúdo/imagem/tags/categoria/status
// mudam. Numeração continua a dos projetos em destaque (offset = quantos
// featured existem), então não precisa de ajuste manual se esse número mudar.
function SecondaryProjectCard({ project, index, numberOffset }) {
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <article
        id={project.slug}
        className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-base-border bg-base-surface/50 p-6 transition-colors duration-300 hover:border-signal-blue/30"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal-blue">
            {String(index + numberOffset + 1).padStart(2, "0")} / {project.category}
          </p>
          {project.status && (
            <span className="shrink-0 rounded-full border border-base-border px-2.5 py-0.5 text-[10px] font-medium text-ink-muted">
              {project.status}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold text-ink">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>

        <ProjectPreview image={project.media?.cover} title={project.title} />

        {project.role && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Participação</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.role}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-base-border bg-base-elevated px-2.5 py-1 font-mono text-[11px] text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-signal-blue hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const sortedFeatured = [...featuredProjects].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden border-t border-base-border py-28">
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
            Projetos em destaque
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-ink-muted">
            Produtos e experiências digitais que construí em contextos multidisciplinares e
            empresariais — cada um documentado como estudo de caso.
          </p>
        </Reveal>

        <div className="mt-4">
          {sortedFeatured.map((project, i) => (
            <ProjectCase key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-24 border-t border-base-border pt-20">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal-blue">Também</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Outros projetos &amp; experiências
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
              Profundidade de trajetória — projetos e experiências que também fazem parte do
              caminho, com menos destaque visual que os cases principais.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <SecondaryProjectCard key={project.slug} project={project} index={i} numberOffset={featuredProjects.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
