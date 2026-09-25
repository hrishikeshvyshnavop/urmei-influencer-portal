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
 *  the fold.
 *
 *  `footerBelowFold` is the exception, for a screen whose footer should never
 *  share the first screenful (Recent Activities, My Shop, Sample Requests and a request's details page): the header and content fill
 *  at least the whole window, so the footer always starts just under it. */
export default function AppShell({
  children,
  className = "",
  onShowTour,
  onShowHelp,
  footerBelowFold = false,
}: {
  children: ReactNode;
  className?: string;
  onShowTour: () => void;
  onShowHelp: () => void;
  footerBelowFold?: boolean;
}) {
  const page = (
    <>
      <AppHeader onShowTour={onShowTour} onShowHelp={onShowHelp} />
      {children}
    </>
  );
  return (
    <div className={`flex min-h-screen w-full flex-col ${className}`}>
      {footerBelowFold ? <div className="flex min-h-screen w-full flex-col">{page}</div> : page}
      <AppFooter />
    </div>
  );
}
