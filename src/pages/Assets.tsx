const mockAssets = [
  { id: "WTG-001", name: "Wind Turbine A1", site: "Helsinki", status: "Operational", updatedAt: "2025-12-22 14:10" },
  { id: "GEN-014", name: "Generator Unit 14", site: "Vaasa", status: "Maintenance", updatedAt: "2025-12-23 08:40" },
  { id: "BMS-203", name: "Battery System 203", site: "Turku", status: "Alert", updatedAt: "2025-12-23 10:05" },
];

function badgeClass(status: string) {
  if (status === "Operational") return "border bg-white";
  if (status === "Maintenance") return "border bg-white";
  return "border bg-white"; // mantém neutro por enquanto
}

export function Assets() {
  return (
    <>
      <h1 className="text-xl font-semibold">Assets</h1>
      <p className="mt-2 text-sm text-gray-700">
        Browse assets and operational status. Table supports keyboard navigation and screen readers.
      </p>

      <section className="mt-6" aria-label="Assets table">
        <div className="rounded-lg border bg-white">
          <div className="flex items-center justify-between gap-3 border-b p-4">
            <h2 className="text-sm font-semibold">Asset list</h2>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
            >
              Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">
                Assets with ID, name, site, status, and last update time.
              </caption>
              <thead className="border-b bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">ID</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">Name</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">Site</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">Last update</th>
                </tr>
              </thead>

              <tbody>
                {mockAssets.map((a) => (
                  <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{a.id}</td>
                    <td className="px-4 py-3 text-gray-800">{a.name}</td>
                    <td className="px-4 py-3 text-gray-800">{a.site}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${badgeClass(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{a.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t p-4 text-xs text-gray-600">
            Tip: use Tab to reach the table and arrow keys to scroll horizontally on small screens.
          </div>
        </div>
      </section>
    </>
  );
}
