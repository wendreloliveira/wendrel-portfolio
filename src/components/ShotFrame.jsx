// Moldura tipo "browser" para screenshots reais — nunca usada sem uma imagem real.
export default function ShotFrame({ src, alt, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-base-border bg-base-surface shadow-soft ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-base-border bg-base-elevated/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-500/50" />
        <span className="h-2 w-2 rounded-full bg-amber-400/50" />
        <span className="h-2 w-2 rounded-full bg-signal-green/50" />
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full object-cover" />
    </div>
  );
}
