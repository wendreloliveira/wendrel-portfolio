export default function Footer() {
  return (
    <footer className="border-t border-base-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink-faint sm:flex-row">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-green" />
          feito com Python, café e curiosidade — 2026
        </span>
        <span>Wendrel Oliveira</span>
      </div>
    </footer>
  );
}
