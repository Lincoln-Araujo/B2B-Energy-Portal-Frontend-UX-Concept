import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <aside className="hidden h-full w-72 border-r bg-white md:block" aria-label="Sidebar">
      <div className="h-full overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}
