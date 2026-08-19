export default function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot / line grid, faded at the edges */}
      <div
        className="absolute inset-0 grid-fade opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Soft radial glows */}
      {/* DIAGNÓSTICO TEMPORÁRIO (diag/mobile-paint-stall): blur só a partir de
          lg (1024px) — testando se estes 2 elementos causam o paint stall no
          Safari/iPhone. <lg mantém tamanho/posição/cor/opacity, só sem filter.
          NÃO É FIX. Reverter para blur-[140px]/blur-[120px] sem prefixo ao
          concluir o teste. */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-signal-blue/20 lg:blur-[140px]" />
      <div className="absolute top-20 right-0 h-[360px] w-[360px] rounded-full bg-signal-violet/10 lg:blur-[120px]" />
    </div>
  );
}
