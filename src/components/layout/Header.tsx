type HeaderProps = {
  title?: string;
};

export function Header({ title = "B2B Energy Portal" }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex h-14 w-full items-center justify-between px-4 lg:px-6 2xl:px-10">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="h-8 w-8 rounded-md bg-gray-900"
            title="Brand mark"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-gray-600">Frontend & UX Concept</p>
          </div>
        </div>

        <nav aria-label="Top navigation" className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2"
          >
            Help
          </button>
          <button
            type="button"
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2"
          >
            Profile
          </button>
        </nav>
      </div>
    </header>
  );
}
