import { NavLink } from "react-router-dom";

type SidebarNavProps = {
  onNavigate?: () => void;
};

const items = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Assets", to: "/assets" },
];

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav className="p-4" aria-label="Primary">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              end
              onClick={() => onNavigate?.()}
              className={({ isActive }) =>
                [
                  "block rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2",
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
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
  );
}
