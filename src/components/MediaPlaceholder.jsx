// Espaço reservado neutro — usado até screenshots reais serem adicionados.
// Nunca deve simular uma interface real (sem dashboards ou UI fictícia).
export default function MediaPlaceholder({ label = "Aguardando mídia real", className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-xl border border-dashed border-base-border bg-base-surface/30 ${className}`}
    >
      <span className="px-6 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint">
        {label}
      </span>
    </div>
  );
}
