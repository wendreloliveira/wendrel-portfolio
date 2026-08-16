import Reveal from "./Reveal";
import MediaPlaceholder from "./MediaPlaceholder";

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

// Estudo de caso editorial dos projetos em destaque. O layoutVariant do
// projeto decide a composição — a calibração visual final (motion, recorte
// de imagem) acontece quando as screenshots reais chegarem.
export default function ProjectCase({ project, index }) {
  const { title, tagline, context, problem, role, decisions, stack, status, statusColor, links } = project;
  const variant = project.layoutVariant || "left";
  const mediaLabel = `${title} — aguardando mídia real`;

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
        <article className="border-t border-base-border py-16 first:border-t-0 first:pt-0">
          <MediaPlaceholder className="aspect-[16/9] w-full" label={mediaLabel} />
          <div className="mt-8 max-w-2xl">{content}</div>
        </article>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <article className="grid gap-10 border-t border-base-border py-16 first:border-t-0 first:pt-0 md:grid-cols-2 md:items-center md:gap-16">
        {variant === "right" ? (
          <>
            <MediaPlaceholder className="aspect-[4/3] w-full" label={mediaLabel} />
            {content}
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{content}</div>
            <MediaPlaceholder className="order-1 aspect-[4/3] w-full md:order-2" label={mediaLabel} />
          </>
        )}
      </article>
    </Reveal>
  );
}
