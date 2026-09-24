const TOUR_REQUESTED_EVENT = "urmei:tour-requested";

/** Every screen's "How does it work?" profile-menu item calls this directly
 *  instead of navigating to `/home/tour` first — the product tour is a
 *  full-screen overlay (see `ProductTour.tsx`), not something tied to Home,
 *  so it can open on top of whichever page the creator is already on. */
export function requestProductTour() {
  window.dispatchEvent(new Event(TOUR_REQUESTED_EVENT));
}

/** `App.tsx` is the only subscriber — it owns the single `ProductTour`
 *  instance rendered above the routed screen. */
export function subscribeToTourRequests(onRequest: () => void) {
  window.addEventListener(TOUR_REQUESTED_EVENT, onRequest);
  return () => window.removeEventListener(TOUR_REQUESTED_EVENT, onRequest);
}
