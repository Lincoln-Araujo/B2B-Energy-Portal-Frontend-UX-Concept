type NavItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "#/dashboard", isActive: true },
  { label: "Assets", href: "#/assets" },
];

export function Sidebar() {
  return (
    <aside className="hidden h-full w-72 border-r bg-white md:block" aria-label="Sidebar">
      <nav className="h-full overflow-y-auto p-4" aria-label="Primary">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={[
                  "block rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2",
                  item.isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-md border p-3">
          <p className="text-xs font-semibold text-gray-900">Accessibility</p>
          <p className="mt-1 text-xs text-gray-600">
            Keyboard-first navigation and semantic layout.
          </p>
        </div>
      </nav>
    </aside>
  );
}
