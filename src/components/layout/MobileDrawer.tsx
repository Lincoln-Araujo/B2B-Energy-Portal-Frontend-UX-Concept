import type React from "react";
import { useEffect, useRef } from "react";
import { SidebarNav } from "./SidebarNav";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function MobileDrawer({ open, onClose, returnFocusRef }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) return;
    returnFocusRef?.current?.focus?.();
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (!open) return;

    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;

        const focusables = getFocusable(panel);
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
        else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 z-40 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={panelRef}
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] border-r bg-white shadow-xl outline-none
                   transition-transform duration-200 ease-out translate-x-0 flex flex-col"
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
        <div className="border-b p-4">
            <div className="grid gap-2">
                <button className="w-full rounded-md border px-3 py-2 text-left text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2">
                    Help
                </button>
                <button className="w-full rounded-md border px-3 py-2 text-left text-sm font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2">
                    Profile
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
