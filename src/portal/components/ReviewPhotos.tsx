/**
 * The photos attached to a review — up to three 48px thumbnails with 8px
 * corners, 8px apart (Figma `1030:29096`'s "Submitted photos row"). Every
 * place a written review is shown uses this: What Creators Say, Your Reviews
 * and a sample request's "Your review" card, each 14px under the review text.
 * Renders nothing for a review without photos.
 */
export default function ReviewPhotos({ photos }: { photos: string[] | undefined }) {
  if (!photos?.length) return null;
  return (
    <span className="flex items-center gap-2">
      {photos.slice(0, 3).map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Review photo ${index + 1}`}
          className="size-12 shrink-0 rounded-md object-cover"
        />
      ))}
    </span>
  );
}
