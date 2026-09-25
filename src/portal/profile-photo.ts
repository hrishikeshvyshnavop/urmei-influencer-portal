export const PROFILE_PHOTO_KEY = "urmei.profile-photo";

/**
 * The square the creator framed, as fractions of the image's *width* — `x`
 * and `y` locate its top-left corner and `size` is its side — so the crop
 * holds at any avatar size and needs no knowledge of the image's pixels.
 */
export type PhotoCrop = { x: number; y: number; size: number };

/** Photos saved before the crop could move sideways: a vertical `offset`
 *  (-1…1) and a centred `cropScale` inside the old 298×354 frame. */
export type LegacyProfilePhoto = { src: string; offset: number; cropScale: number };

export type SavedProfilePhoto = { src: string; crop: PhotoCrop } | LegacyProfilePhoto;

/**
 * The crop the creator applied on step 1, as `ProfilePhoto` and step 1 itself
 * both need it: the first to draw it anywhere in the app, the second to know a
 * photo is already on file when the step is remounted (Back, or a reload).
 */
export function readProfilePhoto(): SavedProfilePhoto | null {
  try {
    const value = window.localStorage.getItem(PROFILE_PHOTO_KEY);
    return value ? (JSON.parse(value) as SavedProfilePhoto) : null;
  } catch {
    return null;
  }
}

export function saveProfilePhoto(photo: SavedProfilePhoto) {
  try {
    window.localStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify(photo));
  } catch {
    // The in-memory photo still shows when browser storage is unavailable.
  }
}
