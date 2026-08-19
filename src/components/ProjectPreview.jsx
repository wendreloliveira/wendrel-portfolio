import MediaPlaceholder from "./MediaPlaceholder";

// Mostra o cover real do projeto quando disponível; caso contrário, um
// espaço reservado neutro — nunca um mockup que possa passar por produto real.
export default function ProjectPreview({ image, alt, title }) {
  if (image) {
    return (
      <div className="my-5 overflow-hidden rounded-xl border border-base-border">
        <img
          src={image}
          alt={alt || `Prévia do projeto ${title}`}
          width={800}
          height={450}
          className="aspect-video w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return <MediaPlaceholder className="my-5 aspect-video w-full" label={`${title} — aguardando mídia`} />;
}
