import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

function isAssetStatus(value: string): value is AssetStatus {
  return value === "Operational" || value === "Maintenance" || value === "Alert";
}

const statusStyles: Record<
  AssetStatus,
  { badge: string; label: string }
> = {
  Operational: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    label: "Operational",
  },
  Maintenance: {
    badge: "border-amber-200 bg-amber-50 text-amber-900",
    label: "Maintenance",
  },
  Alert: {
    badge: "border-red-200 bg-red-50 text-red-900",
    label: "Alert",
  },
};

function StatusBadge({ status }: { status: AssetStatus }) {
  const s = statusStyles[status];
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium",
        s.badge,
      ].join(" ")}
      aria-label={`Asset status: ${s.label}`}
      title={`Status: ${s.label}`}
    >
      {s.label}
    </span>
  );
}

function SkeletonCell({ maxWidth = 240 }: { maxWidth?: number }) {
  return (
    <div
      className="h-4 w-full rounded bg-gray-200/80"
      style={{ maxWidth }}
    />
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b last:border-b-0">
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={120} />
      </td>
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={220} />
      </td>
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={160} />
      </td>
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={110} />
      </td>
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={180} />
      </td>
      <td className="px-4 py-3">
        <SkeletonCell maxWidth={110} />
      </td>
    </tr>
  );
}

type DetailsDialogProps = {
  asset: Asset;
  onClose: () => void;
};

function DetailsDialog({ asset, onClose }: DetailsDialogProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Asset details for ${asset.id}`}
        className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <p className="text-sm font-semibold">Asset details</p>
            <p className="mt-1 text-xs text-gray-600">{asset.id}</p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                       transition-colors duration-700 ease-out"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-gray-700">Name</dt>
              <dd className="mt-1 text-gray-900">{asset.name}</dd>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <dt className="text-xs font-semibold text-gray-700">Site</dt>
                <dd className="mt-1 text-gray-900">{asset.site}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-700">Status</dt>
                <dd className="mt-1">
                  <StatusBadge status={asset.status} />
                </dd>
              </div>
            </div>

            <div>
              <dt className="text-xs font-semibold text-gray-700">Last update</dt>
              <dd className="mt-1 text-gray-900">{asset.updatedAt}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                         transition-colors duration-700 ease-out"
              onClick={() => alert("Placeholder: navigate to Asset details page")}
            >
              Open full page
            </button>

            <button
              type="button"
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                         transition-colors duration-700 ease-out"
              onClick={() => alert("Placeholder: export asset details")}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Assets() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | AssetStatus>("All");

  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Asset | null>(null);
  const viewBtnRef = useRef<HTMLButtonElement | null>(null);

  const loadingTimerRef = useRef<number | null>(null);

  const withLoading = useCallback((fn: () => void) => {
    setIsLoading(true);

    if (loadingTimerRef.current) {
      window.clearTimeout(loadingTimerRef.current);
    }

    fn();

    loadingTimerRef.current = window.setTimeout(() => {
      setIsLoading(false);
      loadingTimerRef.current = null;
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

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
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * rowsPerPage;
    return filteredAndSorted.slice(start, start + rowsPerPage);
  }, [filteredAndSorted, page, rowsPerPage, totalPages]);

  useEffect(() => {
    if (selected !== null) return;
    viewBtnRef.current?.focus?.();
  }, [selected]);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Assets</h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-700">
            Browse monitored equipment, filter by operational status, and open details for quick triage.
          </p>
        </div>

        <div className="text-sm text-gray-700" aria-live="polite">
          {total} result{total === 1 ? "" : "s"}
        </div>
      </div>

      {/* Filters */}
      <section className="mt-6" aria-label="Asset filters">
        <div className="rounded-lg border bg-white p-4 transition-shadow duration-700 ease-out hover:shadow-sm">
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
                  withLoading(() => {
                    setPage(1);
                    setQuery(e.target.value);
                  });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setQuery("");
                }}
                placeholder="ID, name or site"
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm
                           focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
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
                  const v = e.target.value;
                  withLoading(() => {
                    setPage(1);
                    setStatus(v === "All" ? "All" : isAssetStatus(v) ? v : "All");
                  });
                }}
                className="mt-2 w-full rounded-md border bg-white px-3 py-2 text-sm
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
                withLoading(() => {
                  setQuery("");
                  setStatus("All");
                  setPage(1);
                });
              }}
              className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                         transition-colors duration-700 ease-out"
            >
              Clear filters
            </button>

            <span className="text-xs text-gray-600">Loading is simulated to showcase skeleton UI patterns.</span>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="mt-6" aria-label="Assets table">
        <div className="rounded-lg border bg-white transition-shadow duration-700 ease-out hover:shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left text-sm">
              <caption className="sr-only">Assets with sortable columns and a per-row actions column.</caption>

              <thead className="border-b bg-gray-50">
                <tr>
                  {(["id", "name", "site", "status", "updatedAt"] as SortKey[]).map((key) => (
                    <th key={key} scope="col" aria-sort={ariaSortFor(key)} className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          withLoading(() => {
                            toggleSort(key);
                          })
                        }
                        className="font-semibold hover:underline
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                                   transition-colors duration-700 ease-out"
                      >
                        {key === "updatedAt" ? "Last update" : key.charAt(0).toUpperCase() + key.slice(1)}
                        <span className="sr-only">{sortKey === key ? `, sorted ${sortDir}` : ", not sorted"}</span>
                      </button>
                    </th>
                  ))}

                  <th scope="col" className="px-4 py-3 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody aria-busy={isLoading}>
                {isLoading ? (
                  <>
                    <tr className="border-b">
                      <td colSpan={6} className="px-4 py-2">
                        <div className="h-1.5 w-full overflow-hidden rounded bg-gray-100">
                          <div className="h-full w-1/3 animate-[shimmer_1.2s_infinite] rounded bg-gray-200" />
                        </div>
                        <style>
                          {`@keyframes shimmer { 0% { transform: translateX(-120%);} 100% { transform: translateX(360%);} }`}
                        </style>
                      </td>
                    </tr>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-sm text-gray-700" colSpan={6}>
                      No results found. Try clearing filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((a, idx) => (
                    <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-700">
                      <td className="px-4 py-3 font-medium">{a.id}</td>
                      <td className="px-4 py-3">{a.name}</td>
                      <td className="px-4 py-3">{a.site}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-4 py-3">{a.updatedAt}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          ref={idx === 0 ? viewBtnRef : undefined}
                          onClick={() => setSelected(a)}
                          className="rounded-md border px-2 py-1 text-sm font-medium hover:bg-gray-50
                                     focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                                     transition-all duration-700 ease-out hover:-translate-y-[1px]"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
                  withLoading(() => {
                    setPage(1);
                    setRowsPerPage(Number(e.target.value));
                  });
                }}
                className="rounded-md border bg-white px-2 py-1
                           focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  withLoading(() => {
                    setPage((p) => Math.max(1, p - 1));
                  })
                }
                disabled={page === 1 || isLoading}
                className="rounded-md border px-2 py-1 disabled:opacity-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                           transition-colors duration-700 ease-out"
              >
                Previous
              </button>

              <span aria-live="polite">
                Page {Math.min(page, totalPages)} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  withLoading(() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                  })
                }
                disabled={page >= totalPages || isLoading}
                className="rounded-md border px-2 py-1 disabled:opacity-50
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2
                           transition-colors duration-700 ease-out"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {selected && <DetailsDialog asset={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
