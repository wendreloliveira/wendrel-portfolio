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
      {/*
        Soft radial glows. Below lg (1024px), two filter:blur() surfaces this
        large (900x520 @140px, 360x360 @120px) stall paint/compositing on
        Safari/iOS — confirmed via on-device A/B (diag/mobile-paint-stall).
        Mobile/tablet uses a radial-gradient in the same hue/opacity instead
        (no filter cost); lg+ keeps the original blurred fill untouched.
      */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,124,247,0.35)_0%,rgba(76,124,247,0.15)_40%,rgba(76,124,247,0)_75%)] lg:bg-none lg:bg-signal-blue/20 lg:blur-[140px]" />
      <div className="absolute top-20 right-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(139,107,242,0.22)_0%,rgba(139,107,242,0.08)_40%,rgba(139,107,242,0)_75%)] lg:bg-none lg:bg-signal-violet/10 lg:blur-[120px]" />
    </div>
  );
}
