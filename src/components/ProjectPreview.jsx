import MediaPlaceholder from "./MediaPlaceholder";

// Mostra o cover real do projeto quando disponível; caso contrário, um
// espaço reservado neutro — nunca um mockup que possa passar por produto real.
export default function ProjectPreview({ image, title }) {
  if (image) {
    return (
      <div className="mb-5 -mx-1 overflow-hidden rounded-xl border border-base-border">
        <img src={image} alt={`Prévia do projeto ${title}`} className="h-40 w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <MediaPlaceholder className="mb-5 h-40 w-full" label={`${title} — aguardando mídia`} />
  );
}
