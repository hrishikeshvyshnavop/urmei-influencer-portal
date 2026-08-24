import type { ReactNode } from "react";
import PortalHeader from "./PortalHeader";

/** Shared chrome for the influencer portal auth screens: side accent panel,
 *  header, and a vertically centred content column. */
export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="portal relative min-h-screen w-full bg-white font-portal">
      <div className="flex min-h-screen items-stretch bg-white">
        <div className="relative hidden w-[500px] shrink-0 lg:block">
          <img
            src="/urmei/side-panel.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          />
        </div>

        <div className="flex min-w-px flex-1 items-center px-6 py-[120px] sm:px-12 lg:p-[100px]">
          {children}
        </div>
      </div>

      <PortalHeader />
    </div>
  );
}
