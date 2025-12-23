import { useEffect, useRef } from "react";
import { SidebarNav } from "./SidebarNav";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Focus the close button when opening
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] border-r bg-white shadow-xl"
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <p className="text-sm font-semibold">Navigation</p>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
