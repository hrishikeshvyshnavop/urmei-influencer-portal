import { useState } from "react";
import { Bell, Search, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import NotificationsDrawer from "./NotificationsDrawer";
import ProfileMenu from "./ProfileMenu";
import { markNotificationsAsRead, useHasUnreadNotifications } from "../notification-status";
import { PRODUCTS } from "../../shop/data/catalogue";

/** Shared top nav for every signed-in screen (Home, Help Center, Recent
 *  Activities, My Shop) — logo, Home/My Shop nav, search, language, and the
 *  profile menu. `onShowTour`/`onShowHelp` vary by screen (e.g. Help Center
 *  scrolls to top instead of navigating there), so those stay as props. */
export default function AppHeader({
  onShowTour,
  onShowHelp,
}: {
  onShowTour: () => void;
  onShowHelp: () => void;
}) {
  const hasUnreadNotifications = useHasUnreadNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchSuggestions = normalizedQuery
    ? PRODUCTS.filter((product) =>
        [product.brand, product.name, ...product.keywords]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      ).slice(0, 5)
    : [];
  const showSuggestions = searchFocused && searchSuggestions.length > 0;

  const submitSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    window.location.hash = `#/shop/search/${encodeURIComponent(query)}`;
    window.scrollTo(0, 0);
    setSearchFocused(false);
  };

  const selectSuggestion = (suggestion: (typeof PRODUCTS)[number]) => {
    const query = `${suggestion.brand} ${suggestion.name}`;
    setSearchQuery(query);
    setSearchFocused(false);
    window.location.hash = `#/shop/search/${encodeURIComponent(query)}`;
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="sticky top-0 z-30 h-[88px] rounded-b-[10px] bg-portal-surface">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 lg:px-[120px]">
          <div className="flex items-center gap-8">
          <a
            href="#/home"
            aria-label="URMEI home"
            onClick={() => window.scrollTo(0, 0)}
            className="block shrink-0 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portal-dark"
          >
            <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="#/home" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">Home</a>
            <a href="#/shop" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">My Shop</a>
          </nav>
          </div>
          <div className="flex items-center gap-3 lg:gap-6">
          <div className="relative hidden w-[300px] lg:block">
            <form onSubmit={(event) => { event.preventDefault(); submitSearch(); }} className="flex items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2 focus-within:border-portal-dark" role="search">
              <Search size={16} className="shrink-0 text-portal-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => { setSearchQuery(event.target.value); setActiveSuggestion(-1); }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
                onKeyDown={(event) => {
                  if (!showSuggestions) return;
                  if (event.key === "ArrowDown") { event.preventDefault(); setActiveSuggestion((current) => (current + 1) % searchSuggestions.length); }
                  if (event.key === "ArrowUp") { event.preventDefault(); setActiveSuggestion((current) => current <= 0 ? searchSuggestions.length - 1 : current - 1); }
                  if (event.key === "Escape") { setSearchFocused(false); setActiveSuggestion(-1); }
                  if (event.key === "Enter" && activeSuggestion >= 0) { event.preventDefault(); selectSuggestion(searchSuggestions[activeSuggestion]); }
                }}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-controls="header-search-suggestions"
                aria-activedescendant={activeSuggestion >= 0 ? `header-search-suggestion-${activeSuggestion}` : undefined}
                aria-label="Search products and brands"
                placeholder="Find products and brands"
                className="min-w-0 flex-1 bg-transparent text-body-sm outline-none placeholder:text-portal-muted [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery ? <button type="button" aria-label="Clear search" onMouseDown={(event) => event.preventDefault()} onClick={() => { setSearchQuery(""); setActiveSuggestion(-1); }} className="flex size-5 items-center justify-center rounded-sm text-portal-muted"><X size={14} /></button> : null}
              <button type="submit" disabled={!searchQuery.trim()} className="sr-only">Search</button>
            </form>
            {showSuggestions ? <ul id="header-search-suggestions" role="listbox" className="absolute top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-[6px] border border-portal-border bg-white py-1 shadow-[0_8px_24px_rgba(34,34,34,0.12)]">
              {searchSuggestions.map((suggestion, index) => <li key={suggestion.id} id={`header-search-suggestion-${index}`} role="option" aria-selected={activeSuggestion === index}>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActiveSuggestion(index)} onClick={() => selectSuggestion(suggestion)} className={`flex w-full items-center gap-3 px-3 py-2 text-left ${activeSuggestion === index ? "bg-portal-tick" : "bg-white"}`}>
                  <Search className="size-4 shrink-0 text-portal-muted" />
                  <span className="min-w-0 flex-1"><span className="block truncate text-body-sm font-medium">{suggestion.name}</span><span className="block truncate text-body-xs text-portal-muted">{suggestion.brand}</span></span>
                  <img src={suggestion.listImage} alt="" className="size-10 shrink-0 rounded-[4px] object-cover" />
                </button>
              </li>)}
            </ul> : null}
          </div>
          <div className="flex items-center justify-center">
            {/* The creator's storefront region is fixed to their account, so
                this header reports it without offering to change it. The
                storefront preview and the live storefront keep the switch —
                there it's the shopper's region and it drives availability. */}
            <LanguageSelector disableCountryChange />
            <button
              type="button"
              aria-label={hasUnreadNotifications ? "Notifications, unread" : "Notifications"}
              onClick={() => {
                markNotificationsAsRead();
                setNotificationsOpen(true);
              }}
              className="relative flex size-12 cursor-pointer items-center justify-center overflow-clip rounded-[6px]"
            >
              <Bell size={20} className="text-portal-text" />
              {hasUnreadNotifications ? <span aria-hidden="true" className="absolute top-[9px] right-[15px] size-[5px] rounded-full bg-portal-alert" /> : null}
            </button>
            <ProfileMenu
              onShowProfile={() => { window.location.hash = "#/manage-account"; }}
              onShowTour={onShowTour}
              onShowHelp={onShowHelp}
              onLogout={() => { window.location.hash = "#/login"; }}
            />
            </div>
          </div>
        </div>
      </header>

      {notificationsOpen ? (
        <NotificationsDrawer onClose={() => setNotificationsOpen(false)} />
      ) : null}
    </>
  );
}
