export const SETUP_REQUIRED_KEY = "urmei:setup-required";

export function markSetupRequired() {
  try {
    window.localStorage.setItem(SETUP_REQUIRED_KEY, "1");
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}

export function clearSetupRequired() {
  try {
    window.localStorage.removeItem(SETUP_REQUIRED_KEY);
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}

export function isSetupRequired() {
  try {
    return window.localStorage.getItem(SETUP_REQUIRED_KEY) === "1";
  } catch {
    return false;
  }
}
