import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { SkipLink } from "./SkipLink";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileDrawer } from "./MobileDrawer";

type AppShellProps = { children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) {
      setTimeout(() => menuButtonRef.current?.focus(), 0);
    }
  }, [menuOpen]);

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <SkipLink />

      <div
        ref={(node) => {
          if (!node) return;
          menuButtonRef.current = node.querySelector("button[aria-controls='mobile-nav-drawer']");
        }}
      >
        <Header
          onOpenMenu={() => setMenuOpen(true)}
          isMenuOpen={menuOpen}
        />
      </div>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex h-[calc(100dvh-3.5rem)] w-full">
        <Sidebar />

        <main
          id="main"
          className="min-w-0 flex-1 overflow-y-auto px-6 py-6"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
