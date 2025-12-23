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

      <div className="mx-auto flex max-w-6xl">
        <Sidebar />

        <main id="main" className="flex-1 px-4 py-6" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
