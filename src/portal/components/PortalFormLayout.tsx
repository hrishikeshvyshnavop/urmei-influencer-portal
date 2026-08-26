import type { ReactNode } from "react";
import PortalHeader from "./PortalHeader";

/** Chrome for the long, scrolling portal forms (Apply, Review Details): the
 *  accent photo sticks to the viewport while the form column scrolls. */
export default function PortalFormLayout({
  children,
  hideLanguageSelector = false,
}: {
  children: ReactNode;
  /** Profile setup screens don't offer a region switch mid-flow. */
  hideLanguageSelector?: boolean;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <PortalHeader hideLanguageSelector={hideLanguageSelector} />

      <div className="flex min-h-screen items-stretch">
        <div className="hidden w-[35%] shrink-0 lg:block">
          <div className="sticky top-0 h-screen">
            <img
              src="/urmei/side-panel.jpg"
              alt=""
              className="pointer-events-none size-full max-w-none object-cover"
            />
          </div>
        </div>

        <div className="motion-page min-w-px flex-1">{children}</div>
      </div>
    </div>
  );
}
