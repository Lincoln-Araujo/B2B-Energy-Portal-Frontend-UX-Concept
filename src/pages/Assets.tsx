import { useMemo, useState } from "react";

type AssetStatus = "Operational" | "Maintenance" | "Alert";

type Asset = {
  id: string;
  name: string;
  site: string;
  status: AssetStatus;
  updatedAt: string; // YYYY-MM-DD HH:mm (lexicographic sort works)
};

type SortKey = "id" | "name" | "site" | "status" | "updatedAt";
type SortDir = "asc" | "desc";

const mockAssets: Asset[] = [
  { id: "WTG-001", name: "Wind Turbine A1", site: "Helsinki", status: "Operational", updatedAt: "2025-12-22 14:10" },
  { id: "GEN-014", name: "Generator Unit 14", site: "Vaasa", status: "Maintenance", updatedAt: "2025-12-23 08:40" },
  { id: "BMS-203", name: "Battery System 203", site: "Turku", status: "Alert", updatedAt: "2025-12-23 10:05" },
  { id: "INV-088", name: "Inverter 88", site: "Helsinki", status: "Operational", updatedAt: "2025-12-23 09:12" },
  { id: "HMI-007", name: "HMI Panel 7", site: "Turku", status: "Maintenance", updatedAt: "2025-12-21 16:02" },
];

export function Assets() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | AssetStatus>("All");

  // Default: most recent first
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function toggleSort(nextKey: SortKey) {
    setSortKey((currentKey) => {
      if (currentKey !== nextKey) {
        setSortDir("asc");
        return nextKey;
      }
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return currentKey;
    });
  }

  function ariaSortFor(key: SortKey) {
    if (sortKey !== key) return "none" as const;
    return sortDir === "asc" ? ("ascending" as const) : ("descending" as const);
  }

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = mockAssets.filter((a) => {
      const matchesQuery =
        q.length === 0 ||
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.site.toLowerCase().includes(q);

      const matchesStatus = status === "All" || a.status === status;

      return matchesQuery && matchesStatus;
    });

    const sorted = [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      // Strings only in our model; keep robust anyway
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return sorted;
  }, [query, status, sortKey, sortDir]);

  const resultsCount = filteredAndSorted.length;

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Assets</h1>
          <p className="mt-2 text-sm text-gray-700">
            Search, filter, and sort operational assets. Keyboard-first and screen-reader friendly.
          </p>
        </div>

        <div className="text-sm text-gray-700" aria-live="polite">
          {resultsCount} result{resultsCount === 1 ? "" : "s"}
        </div>
      </div>

      {/* Filters */}
      <section className="mt-6" aria-label="Asset filters">
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="asset-search" className="block text-sm font-medium text-gray-900">
                Search
              </label>
              <p id="asset-search-hint" className="mt-1 text-xs text-gray-600">
                Filter by ID, name, or site.
              </p>
              <input
                id="asset-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                }}
                aria-describedby="asset-search-hint"
                placeholder="e.g., WTG-001, Turku..."
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none placeholder:text-gray-400
                           focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              />
            </div>

            <div className="min-w-0">
              <label htmlFor="asset-status" className="block text-sm font-medium text-gray-900">
                Status
              </label>
              <p className="mt-1 text-xs text-gray-600">Filter assets by status.</p>
              <select
                id="asset-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "All" | AssetStatus)}
                className="mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none
                           focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              >
                <option value="All">All</option>
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Alert">Alert</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStatus("All");
              }}
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
            >
              Clear filters
            </button>

            <span className="text-xs text-gray-600">
              Tip: Press <kbd className="rounded border px-1">Esc</kbd> in the search field to clear.
            </span>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="mt-6" aria-label="Assets table">
        <div className="rounded-lg border bg-white">
          <div className="flex items-center justify-between gap-3 border-b p-4">
            <h2 className="text-sm font-semibold">Asset list</h2>
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
            >
              Export
            </button>
          </div>

          {filteredAndSorted.length === 0 ? (
            <div className="p-6">
              <p className="text-sm font-medium text-gray-900">No results found.</p>
              <p className="mt-1 text-sm text-gray-700">
                Try a different search term or reset the filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setStatus("All");
                }}
                className="mt-4 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <caption className="sr-only">
                  Assets with ID, name, site, status, and last update time. Column headers are sortable.
                </caption>

                <thead className="border-b bg-gray-50">
                  <tr>
                    <th scope="col" aria-sort={ariaSortFor("id")} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort("id")}
                        className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        ID
                        <span className="sr-only">
                          {sortKey === "id" ? `, sorted ${sortDir}` : ", not sorted"}
                        </span>
                      </button>
                    </th>

                    <th scope="col" aria-sort={ariaSortFor("name")} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort("name")}
                        className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        Name
                        <span className="sr-only">
                          {sortKey === "name" ? `, sorted ${sortDir}` : ", not sorted"}
                        </span>
                      </button>
                    </th>

                    <th scope="col" aria-sort={ariaSortFor("site")} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort("site")}
                        className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        Site
                        <span className="sr-only">
                          {sortKey === "site" ? `, sorted ${sortDir}` : ", not sorted"}
                        </span>
                      </button>
                    </th>

                    <th scope="col" aria-sort={ariaSortFor("status")} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort("status")}
                        className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        Status
                        <span className="sr-only">
                          {sortKey === "status" ? `, sorted ${sortDir}` : ", not sorted"}
                        </span>
                      </button>
                    </th>

                    <th scope="col" aria-sort={ariaSortFor("updatedAt")} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort("updatedAt")}
                        className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        Last update
                        <span className="sr-only">
                          {sortKey === "updatedAt" ? `, sorted ${sortDir}` : ", not sorted"}
                        </span>
                      </button>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAndSorted.map((a) => (
                    <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{a.id}</td>
                      <td className="px-4 py-3 text-gray-800">{a.name}</td>
                      <td className="px-4 py-3 text-gray-800">{a.site}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{a.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="border-t p-4 text-xs text-gray-600">
            On small screens, this table scrolls horizontally. Use Tab to reach column headers and Enter to sort.
          </div>
        </div>
      </section>
    </>
  );
}
