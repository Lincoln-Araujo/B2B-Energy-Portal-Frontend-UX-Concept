type MetricTone = "ok" | "attention" | "critical";

type Metric = {
  title: string;
  value: string;
  description: string;
  tone?: MetricTone;
};

const toneStyles: Record<
  MetricTone,
  {
    card: string;
    badge: string;
    label: string;
  }
> = {
  ok: {
    card: "border-emerald-400 hover:shadow-emerald-100/50",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    label: "OK",
  },
  attention: {
    card: "border-amber-400 hover:shadow-amber-100/50",
    badge: "border-amber-200 bg-amber-50 text-amber-900",
    label: "Attention",
  },
  critical: {
    card: "border-red-200 hover:shadow-red-100/50",
    badge: "border-red-200 bg-red-50 text-red-900",
    label: "Critical",
  },
};

export function Dashboard() {
  const metrics: Metric[] = [
    {
      title: "Active Assets",
      value: "128",
      description: "Equipment currently operating normally",
      tone: "ok",
    },
    {
      title: "Service Alerts",
      value: "3",
      description: "Some require immediate attention",
      tone: "attention",
    },
    {
      title: "Assets in Critical State",
      value: "1",
      description: "Some equipment requiring immediate action",
      tone: "critical",
    },
    {
      title: "Energy Consumption",
      value: "1.24 MWh",
      description: "Total consumption in the last 24 hours",
      tone: "ok",
    },
    {
      title: "System Status",
      value: "Operational",
      description: "All platform services operational",
      tone: "ok",
    },
  ];

  return (
    <div className="space-y-6">
      <header className="enter">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-700 max-w-3xl">
          Operational overview of monitored assets and systems, highlighting
          availability, alerts, and critical operational states.
        </p>
      </header>

      <section className="enter enter-1" aria-label="Key metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {metrics.map((m) => {
            const tone: MetricTone = m.tone ?? "ok";

            return (
              <div
                key={m.title}
                className={[
                  "rounded-lg border bg-white p-4",
                  "transition-shadow transition-transform duration-700 ease-out",
                  "hover:shadow-md hover:-translate-y-[1px]",
                  toneStyles[tone].card,
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-gray-600">{m.title}</p>

                  <span
                    className={[
                      "rounded-full border px-2 py-0.5 line text-[11px] leading-relaxed font-medium",
                      toneStyles[tone].badge,
                    ].join(" ")}
                    aria-label={`Status: ${toneStyles[tone].label}`}
                  >
                    {toneStyles[tone].label}
                  </span>
                </div>

                <p className="mt-2 text-2xl font-semibold text-gray-900">{m.value}</p>

                <p className="mt-1 text-xs text-gray-500">{m.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
