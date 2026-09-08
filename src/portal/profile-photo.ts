export const PROFILE_PHOTO_KEY = "urmei.profile-photo";

export type SavedProfilePhoto = {
  src: string;
  offset: number;
  cropScale: number;
};

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
