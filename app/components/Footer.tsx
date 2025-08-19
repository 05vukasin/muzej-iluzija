export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-primary/80">
          © {new Date().getFullYear()} Iluzionarium. Sva prava zadržana.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-accent-2 px-4 py-2 text-white text-sm hover:bg-accent-2/90"
          >
            Kontakt
          </a>
          <a
            href="/#home"
            className="rounded-full border border-black/10 px-4 py-2 text-sm text-primary hover:bg-accent-1/60"
          >
            Početna
          </a>
        </div>
      </div>
    </footer>
  );
}
