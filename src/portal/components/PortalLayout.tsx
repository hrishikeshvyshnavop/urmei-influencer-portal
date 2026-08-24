import type { ReactNode } from "react";
import PortalHeader from "./PortalHeader";

type PortalLayoutProps = {
  children: ReactNode;
  /** Screens like Choose Username drop the accent photo and centre the column. */
  withPanel?: boolean;
  /** Extra control rendered in the header, left of the language picker. */
  headerAction?: ReactNode;
  /**
   * Centre the column in the space *below* the header rather than in the full
   * viewport. Set Profile Photo is laid out that way in Figma; the auth screens
   * are not. The value is the 100px page padding plus the 96px header.
   */
  offsetHeader?: boolean;
};

/** Shared chrome for the influencer portal auth screens: sticky side accent
 *  panel, sticky header, and a vertically centred content column. */
export default function PortalLayout({
  children,
  withPanel = true,
  headerAction,
  offsetHeader = false,
}: PortalLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <PortalHeader action={headerAction} />

      <div className="flex min-h-screen items-stretch bg-white">
        {withPanel ? (
          <div className="hidden w-[35%] shrink-0 lg:block">
            <div className="sticky top-0 h-screen">
              <img
                src="/urmei/side-panel.jpg"
                alt=""
                className="pointer-events-none size-full max-w-none object-cover"
              />
            </div>
          </div>
        ) : null}

        <div
          className={`motion-page flex min-w-px flex-1 items-center px-6 py-[120px] sm:px-12 lg:p-[100px] ${
            offsetHeader ? "lg:pt-[196px]" : ""
          } ${withPanel ? "" : "justify-center"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
