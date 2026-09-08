import { readProfilePhoto } from "../profile-photo";

/**
 * Draws the saved crop, or `fallback` when there is none.
 *
 * The cropped image is positioned absolutely and sized past 100%, so the
 * caller MUST supply a `relative overflow-hidden` wrapper at the size the
 * avatar should be — without it the photo escapes and lays itself over the
 * page. The fallback branch is a plain `size-full` image, so a missing
 * wrapper looks fine until a photo is actually saved.
 */
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
