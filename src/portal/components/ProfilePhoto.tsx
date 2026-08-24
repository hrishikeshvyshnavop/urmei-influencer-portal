export const PROFILE_PHOTO_KEY = "urmei.profile-photo";

type SavedProfilePhoto = {
  src: string;
  offset: number;
  cropScale: number;
};

function readProfilePhoto(): SavedProfilePhoto | null {
  try {
    const value = window.localStorage.getItem(PROFILE_PHOTO_KEY);
    return value ? (JSON.parse(value) as SavedProfilePhoto) : null;
  } catch {
    return null;
  }
}

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
