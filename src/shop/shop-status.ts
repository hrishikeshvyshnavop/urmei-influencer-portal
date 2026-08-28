import { useSyncExternalStore } from "react";

const SHOP_ITEM_COUNT_KEY = "urmei.shop-item-count";
const SHOP_PUBLISHED_KEY = "urmei.shop-published";
// Mirrors `shop-items-store.ts`'s own `PUBLISH_BLOCKED_KEY` — same storage
// entry, read here too so Home's Shop URL card can react to it as well.
const SHOP_PUBLISH_BLOCKED_KEY = "urmei.shop-publish-blocked";
const SHOP_CHANGED_EVENT = "urmei:shop-changed";

function getShopItemCount() {
  try {
    return Number(window.localStorage.getItem(SHOP_ITEM_COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
}

function getIsShopPublished() {
  try {
    return window.localStorage.getItem(SHOP_PUBLISHED_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SHOP_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SHOP_CHANGED_EVENT, onChange);
  };
}

/** Called whenever the shop's item list changes, so Home's Recent
 *  Activities/Top Products — which only make sense once something has
 *  actually been added to the shop — know to hide themselves again. */
export function setShopItemCount(count: number) {
  try {
    window.localStorage.setItem(SHOP_ITEM_COUNT_KEY, String(count));
  } catch {
    // The current session still updates when storage is unavailable.
  }
  window.dispatchEvent(new Event(SHOP_CHANGED_EVENT));
}

export function useHasShopItems() {
  return useSyncExternalStore(subscribe, () => getShopItemCount() > 0, () => false);
}

/** Called once the creator publishes their shop, so Home's Shop URL card
 *  can switch from the "publish to get your URL" placeholder to the real
 *  link — same condition `StoreCard` uses inside the shop itself. */
export function setShopPublished(published: boolean) {
  try {
    if (published) window.localStorage.setItem(SHOP_PUBLISHED_KEY, "1");
    else window.localStorage.removeItem(SHOP_PUBLISHED_KEY);
  } catch {
    // The current session still updates when storage is unavailable.
  }
  window.dispatchEvent(new Event(SHOP_CHANGED_EVENT));
}

export function useIsShopPublished() {
  return useSyncExternalStore(subscribe, getIsShopPublished, () => false);
}

function getIsPublishBlocked() {
  try {
    return window.localStorage.getItem(SHOP_PUBLISH_BLOCKED_KEY) === "1";
  } catch {
    return false;
  }
}

/** Called whenever `shop/App.tsx` sets or clears the blocked-publish state
 *  (publishing with zero products), so Home's Shop URL card can show the
 *  same "Your store URL is currently disabled." copy as the shop's own
 *  StoreCard instead of the generic "not published yet" placeholder. */
export function setPublishBlocked(blocked: boolean) {
  try {
    if (blocked) window.localStorage.setItem(SHOP_PUBLISH_BLOCKED_KEY, "1");
    else window.localStorage.removeItem(SHOP_PUBLISH_BLOCKED_KEY);
  } catch {
    // The current session still updates when storage is unavailable.
  }
  window.dispatchEvent(new Event(SHOP_CHANGED_EVENT));
}

export function useIsPublishBlocked() {
  return useSyncExternalStore(subscribe, getIsPublishBlocked, () => false);
}
