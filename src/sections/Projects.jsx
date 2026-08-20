import { useState } from "react";
import Reveal from "../components/Reveal";
import ProjectPreview from "../components/ProjectPreview";
import ProjectCase from "../components/ProjectCase";
import ProjectDivider from "../components/ProjectDivider";
import ProjectDisclosure from "../components/ProjectDisclosure";
import TechSignature from "../components/TechSignature";
import TechStackInspect from "../components/TechStackInspect";
import { featuredProjects, secondaryProjects } from "../lib/data";
import { useTechGraph, hasFineHover, relationState } from "../context/graphState";

// Borda por estado do Tech ↔ Project Graph — secondary é mais discreto que
// featured, então reaproveita o mesmo tom do hover:border-signal-blue/30 já
// existente em vez de um accent novo.
const CARD_BORDER = {
  idle: "border-base-border",
  active: "border-signal-blue/40",
  related: "border-signal-blue/40",
  dimmed: "border-base-border",
};

// Mesma estrutura para todos — só conteúdo/imagem/tags/categoria/status
// mudam. Numeração continua a dos projetos em destaque (offset = quantos
// featured existem), então não precisa de ajuste manual se esse número mudar.
function SecondaryProjectCard({ project, index, numberOffset, isExpanded, onToggleExpand }) {
  const { activeProjectId, relatedProjectSlugs, projectDimmingActive, setActiveProject, clearActiveProject } =
    useTechGraph();
  // anyActive usa projectDimmingActive: um tech ativo sem projeto
  // relacionado publicado (ex.: SQL) não dimma a lista inteira de projetos.
  const state = relationState({
    isActive: activeProjectId === project.slug,
    isRelated: relatedProjectSlugs.includes(project.slug),
    anyActive: projectDimmingActive,
  });
  const panelId = `project-more-${project.slug}`;

  return (
    <Reveal delay={index * 0.06}>
      <article
        id={project.slug}
        onMouseEnter={() => {
          if (hasFineHover()) setActiveProject(project.slug, project.primaryTechIds);
        }}
        onMouseLeave={clearActiveProject}
        // Mesmo padrão do ProjectCase: sem tabIndex, onFocus/onBlur usam a
        // versão bubbling (focusin/focusout) de qualquer link já focável
        // dentro do card. Hoje nem VassVegas nem ClinicAI têm `links`
        // preenchido, então não há nó focável interno ainda — a relação por
        // teclado só passa a existir quando um link real for adicionado ao
        // projeto (ver relatório da V2.2A).
        onFocus={() => setActiveProject(project.slug, project.primaryTechIds)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) clearActiveProject();
        }}
        // Sem h-full: com só 2 secondary projects numa única linha de grid,
        // stretch faria expandir um card esticar o vizinho fechado (espaço
        // morto embaixo). items-start no grid (abaixo) + altura natural
        // aqui deixam cada card crescer sozinho quando expande.
        className={`flex scroll-mt-24 flex-col rounded-2xl border ${CARD_BORDER[state]} bg-base-surface/50 p-6 transition-[border-color,opacity] duration-150 hover:border-signal-blue/30 ${
          state === "dimmed" ? "opacity-55" : "opacity-100"
        }`}
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

        <ProjectPreview image={project.media?.cover} alt={project.media?.coverAlt} title={project.title} />

        {/* Recolhido + Developer Mode ON (estado C): assinatura compacta só
            de primaryTechIds — zero chips no modo normal (estado A). */}
        {!isExpanded && <TechSignature project={project} />}

        <ProjectDisclosure
          id={panelId}
          isExpanded={isExpanded}
          onToggle={() => onToggleExpand(project.slug)}
          wrapperClassName=""
        >
          <div className="flex flex-col gap-4">
            {project.role && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Participação</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.role}</p>
              </div>
            )}

            {/* Expandido + Developer Mode ON (estado D): stack detalhada uma
                única vez, nunca junto da assinatura compacta. */}
            <TechStackInspect project={project} />

            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-4">
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
          </div>
        </ProjectDisclosure>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const sortedFeatured = [...featuredProjects].sort((a, b) => a.order - b.order);
  // Um único "Ver mais" aberto por vez, atravessando featured e secondary —
  // menor ancestral comum de ambas as listas, sem Provider novo só pra isso.
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const toggleExpanded = (slug) => setExpandedProjectId((current) => (current === slug ? null : slug));

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
            <div key={project.slug}>
              {i > 0 && <ProjectDivider nextIndex={i} />}
              <ProjectCase
                project={project}
                index={i}
                isExpanded={expandedProjectId === project.slug}
                onToggleExpand={toggleExpanded}
              />
            </div>
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

          <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <SecondaryProjectCard
                key={project.slug}
                project={project}
                index={i}
                numberOffset={featuredProjects.length}
                isExpanded={expandedProjectId === project.slug}
                onToggleExpand={toggleExpanded}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
