const COUNTRY_KEY = "urmei.selected-country";
const DEFAULT_COUNTRY = "Singapore";

type Listener = () => void;

const listeners = new Set<Listener>();

function readCountry(): string {
  try {
    return window.localStorage.getItem(COUNTRY_KEY) || DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}

let current = readCountry();

/**
 * The country chosen from the header's `LanguageSelector`, shared with any
 * screen that should mirror it (e.g. the Apply form's locked Country field).
 * Plain module state + a listener set rather than React context, so it works
 * the same way for `PortalHeader` and `AppHeader`, which don't share an
 * ancestor.
 */
export function getSelectedCountry() {
  return current;
}

export function setSelectedCountry(name: string) {
  current = name;
  try {
    window.localStorage.setItem(COUNTRY_KEY, name);
  } catch {
    // The current session still works when storage is unavailable.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeToSelectedCountry(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
