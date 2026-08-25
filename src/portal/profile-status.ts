export const PROFILE_NAME_KEY = "urmei.profile-name";

export function getSavedDisplayName(fallback: string) {
  try {
    return window.localStorage.getItem(PROFILE_NAME_KEY) || fallback;
  } catch {
    return fallback;
  }
}

export function saveDisplayName(name: string) {
  try {
    window.localStorage.setItem(PROFILE_NAME_KEY, name);
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}
