export function Dashboard() {
  return (
    <>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">
        Welcome! This is the baseline layout for the B2B portal concept.
      </p>

      <section className="mt-6" aria-label="Key metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Active Assets", "Service Alerts", "Energy Consumption", "System Status"].map((t) => (
            <div key={t} className="rounded-lg border bg-white p-4">
              <p className="text-xs font-medium text-gray-600">{t}</p>
              <p className="mt-2 text-2xl font-semibold">—</p>
              <p className="mt-1 text-xs text-gray-600">Placeholder</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
