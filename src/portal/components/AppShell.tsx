import type { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

/** Full page chrome — header, page content, footer — shared by every
 *  signed-in screen (Home, Help Center, Recent Activities, My Shop). Screens
 *  only ever differ in what sits between the header and footer, plus a few
 *  callbacks the header's profile menu needs.
 *
 *  A screen's `<main>` takes `flex-1` to fill whatever height the header
 *  leaves, so a short page still ends on the footer at the bottom of the
 *  window. Don't size it off the viewport (`min-h-[calc(100vh-88px)]`): that
 *  ignores the setup banner under the header and pushes the footer below
 *  the fold. */
export default function AppShell({
  children,
  className = "",
  onShowTour,
  onShowHelp,
}: {
  children: ReactNode;
  className?: string;
  onShowTour: () => void;
  onShowHelp: () => void;
}) {
  return (
    <div className={`flex min-h-screen w-full flex-col ${className}`}>
      <AppHeader onShowTour={onShowTour} onShowHelp={onShowHelp} />
      {children}
      <AppFooter />
    </div>
  );
}
