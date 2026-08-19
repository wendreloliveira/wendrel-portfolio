import { lazy, Suspense, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineExternalLink, HiOutlinePlay } from "react-icons/hi";
import Reveal from "./Reveal";
import MediaPlaceholder from "./MediaPlaceholder";
import ProjectMediaViewer from "./ProjectMediaViewer";

// Import dinâmico de verdade: o código do modal (portal, foco, iframe) só é
// pedido ao navegador no primeiro clique em "Preview ao vivo" — antes disso,
// zero bytes dele estão no bundle inicial, não só "não renderizado".
const LivePreviewModal = lazy(() => import("./LivePreviewModal"));

const STATUS_STYLES = {
  green: "bg-signal-green/10 text-signal-green border-signal-green/20",
  blue: "bg-signal-blue/10 text-signal-blue border-signal-blue/20",
  violet: "bg-signal-violet/10 text-signal-violet border-signal-violet/20",
  amber: "bg-amber-400/10 text-amber-400 border-amber-400/20",
};

function Field({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-signal-blue">{label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-md border border-base-border bg-base-elevated px-2.5 py-1 font-mono text-[11px] text-ink-muted">
      {children}
    </span>
  );
}

// Barra de legenda/navegação única para os projetos em destaque: contador + legenda do
// que está sendo mostrado + setas sempre visíveis (não dependem de hover,
// então funcionam em touch) + dots. Pilota o viewer via ref.
function MediaCaptionBar({ images, activeIndex, viewerRef, projectTitle }) {
  const total = images.length;
  const current = images[activeIndex];
  if (total <= 1) {
    return current?.caption ? <p className="mt-3 text-center font-mono text-xs text-ink-faint">{current.caption}</p> : null;
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => viewerRef.current?.prev()}
          aria-label={`Imagem anterior de ${projectTitle}`}
          className="rounded-full border border-base-border p-2 text-ink-muted transition-colors hover:border-signal-blue/40 hover:text-ink"
        >
          <HiChevronLeft size={16} />
        </button>
        <p className="min-w-0 font-mono text-xs text-ink-muted">
          <span className="text-ink">
            {String(activeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          {current?.caption && <span className="ml-2 text-ink-faint">— {current.caption}</span>}
        </p>
        <button
          type="button"
          onClick={() => viewerRef.current?.next()}
          aria-label={`Próxima imagem de ${projectTitle}`}
          className="rounded-full border border-base-border p-2 text-ink-muted transition-colors hover:border-signal-blue/40 hover:text-ink"
        >
          <HiChevronRight size={16} />
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => viewerRef.current?.goTo(i)}
            aria-label={`Ir para imagem ${i + 1} de ${projectTitle}`}
            aria-current={i === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-4 bg-signal-blue" : "w-1.5 bg-base-border hover:bg-ink-faint"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Estudo de caso — design system único para todos os projetos em destaque.
// A identidade de cada um vem do conteúdo (screenshots, copy, status,
// stack), não de uma estrutura de layout diferente por projeto.
export default function ProjectCase({ project, index }) {
  const {
    slug,
    title,
    category,
    tagline,
    highlights,
    context,
    problem,
    role,
    decisions,
    stack,
    status,
    statusColor,
    links,
    liveUrl,
    liveCtaLabel,
    livePreview,
  } = project;
  const images = project.media?.desktop || [];
  const viewerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  // Uma vez aberto, o modal continua montado mesmo fechado — senão a
  // animação de saída (AnimatePresence dentro do LivePreviewModal) é
  // cortada de repente ao desmontar. O que importa pro bundle inicial é só
  // não montar (e não importar) ANTES do primeiro clique.
  const [hasOpenedPreview, setHasOpenedPreview] = useState(false);

  // Contexto e problema viram um único parágrafo — mesmo significado,
  // menos títulos disputando atenção ao mesmo tempo na tela.
  const contextText = [context, problem].filter(Boolean).join(" ");

  return (
    <Reveal>
      <article id={slug} className="scroll-mt-24 border-t border-base-border py-20 first:border-t-0 first:pt-0 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-widest text-signal-blue">
              0{index + 1} — {category}
            </p>
            {status && (
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${STATUS_STYLES[statusColor] || STATUS_STYLES.blue}`}
              >
                {status}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h3>
          {tagline && <p className="mt-3 text-ink-muted">{tagline}</p>}
          {highlights?.length > 0 && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-faint">{highlights.join(" · ")}</p>
          )}

          {stack?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
          {images.length > 0 ? (
            <>
              <ProjectMediaViewer
                ref={viewerRef}
                images={images}
                projectTitle={title}
                aspectClassName="aspect-video"
                showArrows={false}
                showDots={false}
                onIndexChange={setActiveIndex}
              />
              <MediaCaptionBar images={images} activeIndex={activeIndex} viewerRef={viewerRef} projectTitle={title} />
            </>
          ) : (
            <MediaPlaceholder className="aspect-video w-full" label={`${title} — aguardando mídia real`} />
          )}
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          {liveUrl && (
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-grad-signal px-5 py-2.5 text-sm font-medium text-white shadow-glow transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(76,124,247,0.35)]"
              >
                {liveCtaLabel || "Ver MVP ao vivo"}
                <HiOutlineExternalLink className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setHasOpenedPreview(true);
                  setPreviewOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-base-border px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-signal-blue/40 hover:text-ink"
              >
                Preview ao vivo
                <HiOutlinePlay size={14} />
              </button>
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Field label="Contexto">{contextText}</Field>
            <Field label="Minha participação">{role}</Field>
          </div>

          {decisions?.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-signal-blue">Principais decisões</p>
              <ol className="mt-3 flex flex-col gap-2.5">
                {decisions.map((d, i) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="shrink-0 font-mono text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {stack?.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-signal-blue">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          )}

          {links?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-signal-blue hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {hasOpenedPreview && (
          <Suspense fallback={null}>
            <LivePreviewModal
              open={previewOpen}
              onClose={() => setPreviewOpen(false)}
              url={liveUrl}
              title={title}
              coldStartNotice={livePreview?.coldStartNotice}
            />
          </Suspense>
        )}
      </article>
    </Reveal>
  );
}
