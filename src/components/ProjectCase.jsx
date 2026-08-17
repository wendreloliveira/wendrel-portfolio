import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineExternalLink, HiOutlinePlay } from "react-icons/hi";
import Reveal from "./Reveal";
import MediaPlaceholder from "./MediaPlaceholder";
import ShotFrame from "./ShotFrame";
import ProjectMediaViewer from "./ProjectMediaViewer";
import LivePreviewModal from "./LivePreviewModal";

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
      <div className="mt-1.5 text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

// Filmstrip/grid de miniaturas clicáveis que pilotam um ProjectMediaViewer
// externo — é o que dá a cada projeto sua própria "cara" de navegação em
// vez de todos usarem os mesmos dots.
function ThumbnailStrip({ images, activeIndex, onSelect, projectTitle, gridClassName, firstSpansTwo = false }) {
  return (
    <div className={gridClassName}>
      {images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Ir para imagem ${i + 1} de ${projectTitle}`}
          aria-current={i === activeIndex}
          className={`overflow-hidden rounded-lg transition-opacity duration-200 ${
            i === activeIndex ? "opacity-100 ring-2 ring-signal-blue ring-offset-2 ring-offset-base" : "opacity-60 hover:opacity-90"
          } ${i === 0 && firstSpansTwo ? "col-span-2" : ""}`}
        >
          <ShotFrame src={img.src} alt={img.alt} />
        </button>
      ))}
    </div>
  );
}

// EmpregaAI — composição de produto: viewer navegável como tela principal.
function ProductMedia({ project }) {
  const images = project.media?.desktop || [];
  if (images.length === 0) {
    return <MediaPlaceholder className="aspect-[4/3] w-full" label={`${project.title} — aguardando mídia real`} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="[filter:drop-shadow(0_20px_50px_rgba(0,0,0,0.35))]"
    >
      <ProjectMediaViewer images={images} projectTitle={project.title} aspectClassName="aspect-[4/3]" />
    </motion.div>
  );
}

// RISK — composição institucional: viewer + filmstrip de páginas clicável.
function InstitutionalMedia({ project }) {
  const images = project.media?.desktop || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const viewerRef = useRef(null);

  if (images.length === 0) {
    return <MediaPlaceholder className="aspect-[4/3] w-full" label={`${project.title} — aguardando mídia real`} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3"
    >
      <ProjectMediaViewer
        ref={viewerRef}
        images={images}
        projectTitle={project.title}
        aspectClassName="aspect-[16/11]"
        showDots={false}
        onIndexChange={setActiveIndex}
      />
      {images.length > 1 && (
        <ThumbnailStrip
          images={images}
          activeIndex={activeIndex}
          onSelect={(i) => viewerRef.current?.goTo(i)}
          projectTitle={project.title}
          gridClassName="grid grid-cols-4 gap-2 sm:gap-3"
        />
      )}
    </motion.div>
  );
}

// DKastro — composição editorial: viewer grande com parallax + grid assimétrico clicável.
function VisualMedia({ project }) {
  const ref = useRef(null);
  const viewerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = project.media?.desktop || [];
  if (images.length === 0) {
    return <MediaPlaceholder className="aspect-[16/9] w-full" label={`${project.title} — aguardando mídia real`} />;
  }

  return (
    <div ref={ref}>
      <motion.div
        style={{ y }}
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProjectMediaViewer
          ref={viewerRef}
          images={images}
          projectTitle={project.title}
          aspectClassName="aspect-[16/9]"
          showDots={false}
          onIndexChange={setActiveIndex}
        />
      </motion.div>
      {images.length > 1 && (
        <div className="mt-4">
          <ThumbnailStrip
            images={images}
            activeIndex={activeIndex}
            onSelect={(i) => viewerRef.current?.goTo(i)}
            projectTitle={project.title}
            gridClassName="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          firstSpansTwo
          />
        </div>
      )}
    </div>
  );
}

const MEDIA_BY_VARIANT = {
  left: ProductMedia,
  right: InstitutionalMedia,
  visual: VisualMedia,
};

// Estudo de caso editorial dos projetos em destaque. O layoutVariant do
// projeto decide texto/mídia e qual composição visual é usada — cada um
// reflete a natureza do projeto (produto, institucional, editorial).
export default function ProjectCase({ project, index }) {
  const { title, tagline, context, problem, role, decisions, stack, status, statusColor, links, liveUrl, liveCtaLabel } = project;
  const variant = project.layoutVariant || "left";
  const Media = MEDIA_BY_VARIANT[variant] || ProductMedia;
  const [previewOpen, setPreviewOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-mono text-xs text-ink-faint">0{index + 1}</span>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h3>
        {tagline && <p className="mt-2 max-w-md text-ink-muted">{tagline}</p>}
        {status && (
          <span
            className={`mt-4 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${STATUS_STYLES[statusColor] || STATUS_STYLES.blue}`}
          >
            {status}
          </span>
        )}
      </div>

      <Field label="Contexto">{context}</Field>
      <Field label="Problema">{problem}</Field>
      <Field label="Minha participação">{role}</Field>
      <Field label="Decisões">
        {decisions?.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {decisions.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
        )}
      </Field>

      {stack?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-base-border bg-base-elevated px-2.5 py-1 font-mono text-[11px] text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {liveUrl && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
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
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-base-border px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-signal-blue/40 hover:text-ink"
          >
            Preview ao vivo
            <HiOutlinePlay size={14} />
          </button>
        </div>
      )}

      {links?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
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
  );

  const preview = liveUrl && (
    <LivePreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} url={liveUrl} title={title} />
  );

  if (variant === "visual") {
    return (
      <Reveal>
        <article id={project.slug} className="scroll-mt-24 border-t border-base-border py-16 first:border-t-0 first:pt-0">
          <Media project={project} />
          <div className="mt-8 max-w-2xl">{content}</div>
          {preview}
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <article
        id={project.slug}
        className="scroll-mt-24 grid gap-10 border-t border-base-border py-16 first:border-t-0 first:pt-0 md:grid-cols-2 md:items-center md:gap-16"
      >
        {variant === "right" ? (
          <>
            <Media project={project} />
            {content}
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{content}</div>
            <div className="order-1 md:order-2">
              <Media project={project} />
            </div>
          </>
        )}
        {preview}
      </article>
    </Reveal>
  );
}
