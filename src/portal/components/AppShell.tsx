import type { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

/** Full page chrome — header, page content, footer — shared by every
 *  signed-in screen (Home, Help Center, Recent Activities, My Shop). Screens
 *  only ever differ in what sits between the header and footer, plus a few
 *  callbacks the header's profile menu needs. */
export default function AppShell({
  children,
  className = "",
  shadow = false,
  onShowTour,
  onShowHelp,
}: {
  children: ReactNode;
  className?: string;
  shadow?: boolean;
  onShowTour: () => void;
  onShowHelp: () => void;
}) {
  return (
    <div className={`flex min-h-screen w-full flex-col ${className}`}>
      <AppHeader shadow={shadow} onShowTour={onShowTour} onShowHelp={onShowHelp} />
      {children}
      <AppFooter />
    </div>
  );
}
