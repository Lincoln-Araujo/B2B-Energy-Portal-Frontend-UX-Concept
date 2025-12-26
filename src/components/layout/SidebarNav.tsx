import { NavLink, useLocation } from "react-router-dom";
import { SidebarCallout } from "./SidebarCallout";
import { metrics } from "../../data/metrics";

type SidebarNavProps = { onNavigate?: () => void };

const items = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Assets", to: "/assets" },
];

type RouteCallout = {
  title: string;
  description: string;
  tone: "ok" | "attention" | "critical" | "neutral";
};

function deriveDashboardCallout(): RouteCallout {
  const critical = metrics.find((m) => (m.tone ?? "ok") === "critical");
  if (critical) {
    return {
      title: "Critical operational state",
      description: `${critical.value} — ${critical.description}`,
      tone: "critical",
    };
  }

  const attention = metrics.find((m) => (m.tone ?? "ok") === "attention");
  if (attention) {
    return {
      title: "Attention needed",
      description: `${attention.value} — ${attention.description}`,
      tone: "attention",
    };
  }

  return {
    title: "All clear",
    description: "No critical or attention items detected in the current overview.",
    tone: "ok",
  };
}

function getRouteCallout(pathname: string): RouteCallout {
  if (pathname.startsWith("/assets")) {
    return {
      title: "Table tips",
      description: "Use sorting + filters to narrow results. Use Actions to open details.",
      tone: "neutral",
    };
  }

  // default: dashboard
  return deriveDashboardCallout();
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const { pathname } = useLocation();
  const callout = getRouteCallout(pathname);

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

      <SidebarCallout title={callout.title} description={callout.description} tone={callout.tone} />
    </nav>
  );
}
