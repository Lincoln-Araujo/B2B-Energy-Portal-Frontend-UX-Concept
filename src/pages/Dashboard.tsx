export function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="enter">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-700">
          Welcome! This is the baseline layout for the B2B portal concept.
        </p>
      </header>

      <section
        className="enter enter-1"
        aria-label="Key metrics"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {[
            "Active Assets",
            "Service Alerts",
            "Energy Consumption",
            "System Status",
          ].map((t) => (
            <div
              key={t}
              className="
                rounded-lg border bg-white p-4
                transition-shadow transition-transform
                duration-700
                ease
                hover:shadow-md hover:-translate-y-[1px]
              "
            >
              <p className="text-xs font-medium text-gray-600">{t}</p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                —
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Placeholder
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
