type HeaderProps = {
  title?: string;
  onOpenMenu?: () => void;
  isMenuOpen?: boolean;
};

export function Header({
  title = "B2B Energy Portal",
  onOpenMenu,
  isMenuOpen = false,
}: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-14 w-full items-center justify-between px-4 lg:px-6 2xl:px-10">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            Menu
          </button>

          <div aria-hidden="true" className="h-8 w-8 rounded-md bg-gray-900" />

          <div className="leading-tight">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-gray-600">Frontend & UX Concept</p>
          </div>
        </div>

        <nav aria-label="Top navigation" className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
          >
            Help
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
          >
            Profile
          </button>
        </nav>
      </div>
    </header>
  );
}
