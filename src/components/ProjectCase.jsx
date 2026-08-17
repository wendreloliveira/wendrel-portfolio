import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import MediaPlaceholder from "./MediaPlaceholder";
import ShotFrame from "./ShotFrame";

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

// EmpregaAI — composição de produto: tela principal + detalhe sobreposto.
function ProductMedia({ project }) {
  const cover = project.media?.cover;
  const secondary = (project.media?.desktop || []).find((src) => src !== cover);

  if (!cover) {
    return <MediaPlaceholder className="aspect-[4/3] w-full" label={`${project.title} — aguardando mídia real`} />;
  }

  return (
    <div className="relative pb-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ShotFrame src={cover} alt={`${project.title} — tela principal`} />
      </motion.div>
      {secondary && (
        <motion.div
          initial={{ opacity: 0, x: -20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-2 -left-6 hidden w-2/5 sm:block"
        >
          <ShotFrame src={secondary} alt={`${project.title} — detalhe de produto`} className="shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" />
        </motion.div>
      )}
    </div>
  );
}

// RISK — composição institucional: hero + filmstrip de páginas.
function InstitutionalMedia({ project }) {
  const cover = project.media?.cover;
  const rest = (project.media?.desktop || []).filter((src) => src !== cover).slice(0, 3);

  if (!cover) {
    return <MediaPlaceholder className="aspect-[4/3] w-full" label={`${project.title} — aguardando mídia real`} />;
  }

  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ShotFrame src={cover} alt={`${project.title} — página inicial`} />
      </motion.div>
      {rest.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {rest.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ShotFrame src={src} alt={`${project.title} — página ${i + 2}`} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// DKastro — composição editorial: hero com parallax discreto + grid assimétrico.
function VisualMedia({ project }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const cover = project.media?.cover;
  const rest = (project.media?.desktop || []).filter((src) => src !== cover);

  if (!cover) {
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
        className="overflow-hidden rounded-2xl border border-base-border"
      >
        <img src={cover} alt={`${project.title} — hero`} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
      </motion.div>
      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {rest.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 ? "col-span-2" : ""}
            >
              <ShotFrame src={src} alt={`${project.title} — detalhe ${i + 1}`} />
            </motion.div>
          ))}
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
  const { title, tagline, context, problem, role, decisions, stack, status, statusColor, links } = project;
  const variant = project.layoutVariant || "left";
  const Media = MEDIA_BY_VARIANT[variant] || ProductMedia;

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

  if (variant === "visual") {
    return (
      <Reveal>
        <article id={project.slug} className="scroll-mt-24 border-t border-base-border py-16 first:border-t-0 first:pt-0">
          <Media project={project} />
          <div className="mt-8 max-w-2xl">{content}</div>
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
      </article>
    </Reveal>
  );
}
