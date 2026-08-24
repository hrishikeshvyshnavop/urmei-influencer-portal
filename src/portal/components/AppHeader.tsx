import { useState } from "react";
import { Bell, Search } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import NotificationsDrawer from "./NotificationsDrawer";
import ProfileMenu from "./ProfileMenu";
import { markNotificationsAsRead, useHasUnreadNotifications } from "../notification-status";

/** Shared top nav for every signed-in screen (Home, Help Center, Recent
 *  Activities, My Shop) — logo, Home/My Shop nav, search, language, and the
 *  profile menu. `onShowTour`/`onShowHelp` vary by screen (e.g. Help Center
 *  scrolls to top instead of navigating there), so those stay as props. */
export default function AppHeader({
  shadow = false,
  onShowTour,
  onShowHelp,
}: {
  shadow?: boolean;
  onShowTour: () => void;
  onShowHelp: () => void;
}) {
  const hasUnreadNotifications = useHasUnreadNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-30 flex h-[88px] items-center justify-between rounded-b-[10px] bg-portal-surface px-6 lg:px-[120px] ${
          shadow ? "shadow-[0_2px_10px_rgba(34,34,34,0.04)]" : ""
        }`}
      >
        <div className="flex items-center gap-8">
          <a
            href="#/home"
            aria-label="URMEI home"
            onClick={() => window.scrollTo(0, 0)}
            className="block shrink-0 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portal-dark"
          >
            <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#/home" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">Home</a>
            <a href="#/shop" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">My Shop</a>
          </nav>
        </div>
        <div className="flex items-center gap-3 lg:gap-6">
          <label className="hidden w-[300px] items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2 lg:flex">
            <Search size={16} />
            <input aria-label="Search products and brands" placeholder="Find products and brands" className="min-w-0 flex-1 bg-transparent text-body-sm outline-none placeholder:text-portal-muted" />
          </label>
          <LanguageSelector />
          <button
            type="button"
            aria-label={hasUnreadNotifications ? "Notifications, unread" : "Notifications"}
            onClick={() => {
              markNotificationsAsRead();
              setNotificationsOpen(true);
            }}
            className="relative flex size-12 cursor-pointer items-center justify-center"
          >
            <Bell size={20} />
            {hasUnreadNotifications ? <span aria-hidden="true" className="absolute top-[9px] right-[12px] size-[5px] rounded-full bg-portal-alert" /> : null}
          </button>
          <ProfileMenu
            onShowProfile={() => { window.location.hash = "#/manage-account"; }}
            onShowTour={onShowTour}
            onShowHelp={onShowHelp}
            onLogout={() => { window.location.hash = "#/login"; }}
          />
        </div>
      </header>

      {notificationsOpen ? (
        <NotificationsDrawer onClose={() => setNotificationsOpen(false)} />
      ) : null}
    </>
  );
}
