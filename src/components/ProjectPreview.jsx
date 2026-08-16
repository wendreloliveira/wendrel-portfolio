const ACCENT_HEX = {
  green: "#3ECF8E",
  blue: "#4C7CF7",
  violet: "#8B6BF2",
};

/**
 * ProjectPreview — renders either a real screenshot (if `image` is provided
 * in data.js) or a lightweight abstract UI mockup in the project's accent
 * color. This keeps every card visually "alive" even before real product
 * screenshots exist — just drop an `image` path into lib/data.js later
 * and it will be used automatically.
 */
export default function ProjectPreview({ image, accent, title }) {
  if (image) {
    return (
      <div className="mb-5 -mx-1 overflow-hidden rounded-xl border border-base-border">
        <img src={image} alt={`Prévia do projeto ${title}`} className="h-40 w-full object-cover" loading="lazy" />
      </div>
    );
  }

  const hex = ACCENT_HEX[accent];

  return (
    <div
      className="relative mb-5 h-40 w-full overflow-hidden rounded-xl border border-base-border bg-base-elevated"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${hex} 0%, transparent 55%)`,
        }}
      />
      <div className="absolute inset-4 flex flex-col gap-2 rounded-lg border border-base-border/80 bg-base-surface/70 p-3">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: hex }} />
          <span className="h-1.5 w-10 rounded-full bg-base-border" />
          <span className="ml-auto h-1.5 w-4 rounded-full bg-base-border" />
        </div>
        <div className="mt-1 h-2 w-2/3 rounded-full bg-base-border" />
        <div className="h-2 w-1/2 rounded-full bg-base-border/70" />
        <div className="mt-auto flex gap-2">
          <span className="h-6 w-14 rounded-md" style={{ backgroundColor: `${hex}33` }} />
          <span className="h-6 w-6 rounded-md bg-base-border" />
        </div>
      </div>
    </div>
  );
}
