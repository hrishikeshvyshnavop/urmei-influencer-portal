/**
 * Path-based routing on the History API. The portal has no router library:
 * `App.tsx` switches on `currentRoute()` and re-renders through `subscribe`.
 *
 * Routes are plain paths ("/shop/stats/clicks?from=home"). Links stay plain
 * `<a href="/…">` — `installLinkInterception` turns same-origin clicks into
 * `navigate()` so they don't reload the page. A real path reaches the server,
 * so production hosting must fall back to `index.html` for unknown paths
 * (Vite's dev and preview servers already do).
 */

const ROUTE_EVENT = "urmei:navigate";

/** The current route: path plus query, which the stats pages read. */
export function currentRoute() {
  return window.location.pathname + window.location.search;
}

export function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(ROUTE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(ROUTE_EVENT, onChange);
  };
}

/** Moves `target` (this window by default, or a same-origin opener) to `path`
 *  without reloading it. */
export function navigate(path: string, { replace = false, target = window }: { replace?: boolean; target?: Window } = {}) {
  if (target.location.pathname + target.location.search === path) return;
  if (replace) target.history.replaceState(null, "", path);
  else target.history.pushState(null, "", path);
  target.dispatchEvent(new Event(ROUTE_EVENT));
}

/** An absolute URL for `path` — for `window.open` and popup windows. */
export function routeUrl(path: string) {
  return new URL(path, window.location.origin).toString();
}

/** Old `/#/route` links and bookmarks keep working: the hash route is lifted
 *  into the path once, at startup, before the first render. */
export function upgradeLegacyHashRoute() {
  const { hash } = window.location;
  if (hash.startsWith("#/")) {
    window.history.replaceState(null, "", hash.slice(1));
  }
}

/** Routes clicks on same-origin `<a href="/…">` through `navigate()`, leaving
 *  new-tab clicks, downloads, external links and in-page anchors to the
 *  browser. Returns the cleanup. */
export function installLinkInterception() {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element | null)?.closest?.("a");
    if (!anchor || anchor.hasAttribute("download")) return;
    if (anchor.target && anchor.target !== "_self") return;
    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    event.preventDefault();
    navigate(href);
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
