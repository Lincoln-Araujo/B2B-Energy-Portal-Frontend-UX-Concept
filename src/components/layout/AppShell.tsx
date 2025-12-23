import type { ReactNode } from "react";
import { SkipLink } from "./SkipLink";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <SkipLink />
      <Header />

      <div className="flex h-[calc(100dvh-3.5rem)] w-full">
        <Sidebar />

        <main id="main" className="min-w-0 flex-1 overflow-y-auto px-6 py-6" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
