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

export const PROFILE_BIO_KEY = "urmei.profile-bio";

/** The bio every creator starts with — the copy the storefront's About me
 *  strip and Manage Account's Bio field both open on (Figma `1619:36970`). */
export const DEFAULT_BIO =
  "Sharing the products I love, use and recommend. Discover my curated favorites and shop them all in one place.";

export function getSavedBio() {
  try {
    return window.localStorage.getItem(PROFILE_BIO_KEY) || DEFAULT_BIO;
  } catch {
    return DEFAULT_BIO;
  }
}

export function saveBio(bio: string) {
  try {
    window.localStorage.setItem(PROFILE_BIO_KEY, bio);
  } catch {
    // The flow remains usable when browser storage is unavailable.
  }
}
