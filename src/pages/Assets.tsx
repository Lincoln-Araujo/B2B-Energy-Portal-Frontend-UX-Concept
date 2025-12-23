import { useMemo, useState } from "react";

type AssetStatus = "Operational" | "Maintenance" | "Alert";

type Asset = {
  id: string;
  name: string;
  site: string;
  status: AssetStatus;
  updatedAt: string;
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

  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function toggleSort(nextKey: SortKey) {
    setPage(1);
    setSortKey((current) => {
      if (current !== nextKey) {
        setSortDir("asc");
        return nextKey;
      }
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return current;
    });
  }

  function ariaSortFor(key: SortKey) {
    if (sortKey !== key) return "none" as const;
    return sortDir === "asc" ? "ascending" : "descending";
  }

  function isAssetStatus(value: string): value is AssetStatus {
    return value === "Operational" || value === "Maintenance" || value === "Alert";
  }


  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base = mockAssets.filter((a) => {
      const matchesQuery =
        !q ||
        a.id.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.site.toLowerCase().includes(q);

      const matchesStatus = status === "All" || a.status === status;
      return matchesQuery && matchesStatus;
    });

    return [...base].sort((a, b) => {
      const av = String(a[sortKey]);
      const bv = String(b[sortKey]);
      const cmp = av.localeCompare(bv);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [query, status, sortKey, sortDir]);

  const total = filteredAndSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredAndSorted.slice(start, start + rowsPerPage);
  }, [filteredAndSorted, page, rowsPerPage]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Assets</h1>
          <p className="mt-2 text-sm text-gray-700">
            Search, filter, sort and paginate assets.
          </p>
        </div>

        <div className="text-sm text-gray-700" aria-live="polite">
          {total} result{total === 1 ? "" : "s"}
        </div>
      </div>

      {/* Filters */}
      <section className="mt-6" aria-label="Asset filters">
        <div className="rounded-lg border bg-white p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="asset-search" className="block text-sm font-medium">
                Search
              </label>
              <input
                id="asset-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setPage(1);
                  setQuery(e.target.value);
                }}
                placeholder="ID, name or site"
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              />
            </div>

            <div>
              <label htmlFor="asset-status" className="block text-sm font-medium">
                Status
              </label>
              <select
                id="asset-status"
                value={status}
                onChange={(e) => {
                    setPage(1);
                    const v = e.target.value;
                    setStatus(v === "All" ? "All" : isAssetStatus(v) ? v : "All");
                }}
                className="mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              >
                <option value="All">All</option>
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Alert">Alert</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="mt-6" aria-label="Assets table">
        <div className="rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  {(["id", "name", "site", "status", "updatedAt"] as SortKey[]).map((key) => (
                    <th key={key} scope="col" aria-sort={ariaSortFor(key)} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                        className="font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
                      >
                        {key === "updatedAt" ? "Last update" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginated.map((a) => (
                  <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{a.id}</td>
                    <td className="px-4 py-3">{a.name}</td>
                    <td className="px-4 py-3">{a.site}</td>
                    <td className="px-4 py-3">{a.status}</td>
                    <td className="px-4 py-3">{a.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4 text-sm">
            <div className="flex items-center gap-2">
              <label htmlFor="rows-per-page">Rows per page</label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => {
                  setPage(1);
                  setRowsPerPage(Number(e.target.value));
                }}
                className="rounded-md border bg-white px-2 py-1"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border px-2 py-1 disabled:opacity-50"
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border px-2 py-1 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
