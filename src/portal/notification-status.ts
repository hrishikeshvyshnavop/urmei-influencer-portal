import { useSyncExternalStore } from "react";

const NOTIFICATIONS_READ_KEY = "urmei.notifications-read";
const NOTIFICATIONS_CHANGED_EVENT = "urmei:notifications-changed";

function getHasUnreadNotifications() {
  try {
    return window.localStorage.getItem(NOTIFICATIONS_READ_KEY) !== "true";
  } catch {
    return true;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(NOTIFICATIONS_CHANGED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(NOTIFICATIONS_CHANGED_EVENT, onChange);
  };
}

export function markNotificationsAsRead() {
  try {
    window.localStorage.setItem(NOTIFICATIONS_READ_KEY, "true");
  } catch {
    // The current session still updates when storage is unavailable.
  }
  window.dispatchEvent(new Event(NOTIFICATIONS_CHANGED_EVENT));
}

export function useHasUnreadNotifications() {
  return useSyncExternalStore(subscribe, getHasUnreadNotifications, () => false);
}
