import { readProfilePhoto, type SavedProfilePhoto } from "../profile-photo";

/**
 * Draws a saved crop inside its parent.
 *
 * The image is positioned absolutely and sized past 100%, so the caller MUST
 * supply a square `relative overflow-hidden` wrapper at the size the avatar
 * should be — without it the photo escapes and lays itself over the page.
 */
export function CroppedPhoto({ photo, alt }: { photo: SavedProfilePhoto; alt: string }) {
  if ("crop" in photo) {
    const { x, y, size } = photo.crop;
    return (
      <img
        src={photo.src}
        alt={alt}
        style={{
          width: `${100 / size}%`,
          left: `${(-x / size) * 100}%`,
          // The wrapper is square, so a percentage of its height is a
          // percentage of its width — the unit `y` is stored in.
          top: `${(-y / size) * 100}%`,
        }}
        className="absolute h-auto max-w-none"
      />
    );
  }

  const band = (28 / 298) * 100;
  const extra = ((1 - photo.cropScale) * 100) / 2;
  const maxOffset = band + extra;

  return (
    <img
      src={photo.src}
      alt={alt}
      style={{
        width: `${100 / photo.cropScale}%`,
        height: `${(354 / 298) * (100 / photo.cropScale)}%`,
        left: `${-extra / photo.cropScale}%`,
        top: `${-(band + extra - photo.offset * maxOffset) / photo.cropScale}%`,
      }}
      className="absolute max-w-none object-cover"
    />
  );
}

/** Draws the saved crop, or `fallback` when there is none. The fallback
 *  branch is a plain `size-full` image, so a missing wrapper looks fine until
 *  a photo is actually saved. */
export default function ProfilePhoto({
  fallback,
  alt,
}: {
  fallback: string;
  alt: string;
}) {
  const photo = readProfilePhoto();

  if (!photo) {
    return <img src={fallback} alt={alt} className="size-full object-cover" />;
  }

  return <CroppedPhoto photo={photo} alt={alt} />;
}
