import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";
import Button from "./Button";
import type { SampleReview } from "../sample-requests";

const RATINGS = Array.from({ length: 10 }, (_, index) => index + 1);
const MAX_PHOTOS = 3;
/** Photos are kept as data URLs in browser storage, so they are scaled down
 *  to about thumbnail-and-a-bit before saving. */
const PHOTO_MAX_EDGE = 480;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** The ring around the chosen score picks up the scale bar's colour at that
 *  end — red at 1 (`1030:31329`), green at 8 (`1030:31023`). */
function ringClass(rating: number) {
  if (rating <= 4) return "shadow-[0_0_0_1px_white,0_0_0_2.5px_var(--color-portal-rating-low)]";
  if (rating <= 6) return "shadow-[0_0_0_1px_white,0_0_0_2.5px_var(--color-portal-star)]";
  return "shadow-[0_0_0_1px_white,0_0_0_2.5px_var(--color-portal-rating-high)]";
}

/** Unfolds its children by animating the row from 0fr to 1fr, so the modal
 *  grows smoothly instead of jumping when a score is first picked. Collapsed
 *  content stays mounted but inert, out of the tab order. */
function Reveal({ open, className = "", children }: { open: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      {/* The 4px of slack keeps a focused button's outline clear of the clip. */}
      <div className={`-mx-1 -mb-1 min-h-0 overflow-hidden px-1 pb-1 ${className}`}>{children}</div>
    </div>
  );
}

/** Low scores ask what fell short (`1030:31320`), the rest what they loved. */
function promptFor(rating: number) {
  return rating <= 5 ? "What didn't you like about it?" : "What did you love about it?";
}

function scalePhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/") || file.size > MAX_FILE_BYTES) {
      reject(new Error("unsupported"));
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable"));
    };
    image.src = url;
  });
}

/**
 * "How would you rate this product?" (Figma `1030:30661`). Opens as the bare
 * 1–10 scale (`1030:30801`); picking a score unfolds the comment box and the
 * optional photos (`1030:30831` onwards). A photo shows a spinner tile while
 * it is read (`1030:30894`), a removable thumbnail once added (`1030:31213`),
 * and "Upload failed" when the file can't be used (`1030:31106`). Submit
 * needs a score and some text; photos stay optional.
 */
export default function WriteReviewModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (review: SampleReview) => void;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  async function addPhoto(file: File | undefined) {
    if (!file) return;
    setUploadFailed(false);
    setUploading(true);
    try {
      const photo = await scalePhoto(file);
      setPhotos((current) => [...current, photo].slice(0, MAX_PHOTOS));
    } catch {
      setUploadFailed(true);
    } finally {
      setUploading(false);
    }
  }

  const canSubmit = rating !== null && text.trim().length > 0 && !uploading;

  return createPortal(
    <div
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-title"
        className="motion-modal-panel flex max-h-full w-[520px] max-w-full flex-col gap-4 overflow-y-auto rounded-[10px] bg-portal-light p-6"
      >
        <h2 id="write-review-title" className="text-body-xl font-semibold text-portal-text">
          How would you rate this product?
        </h2>

        {/* The two reveals carry their own top padding in place of the
            column gaps, so nothing is reserved before a score is picked. */}
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-4">
              <span
                aria-hidden="true"
                className="h-1.5 w-full rounded-full bg-gradient-to-r from-portal-rating-low/70 via-portal-star/70 to-portal-rating-high/70"
              />
              <div className="flex w-full flex-col gap-2">
                <div role="radiogroup" aria-label="Rating from 1 to 10" className="flex w-full items-center justify-between gap-2">
                  {RATINGS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      autoFocus={value === 1 && rating === null}
                      onClick={() => setRating(value)}
                      className={`flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-[10px] border border-portal-border bg-white text-body-md font-medium text-black transition-shadow ${
                        rating === value ? ringClass(value) : ""
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between text-body-sm font-medium text-portal-body">
                  <span>Not for me</span>
                  <span>Loved it!</span>
                </div>
              </div>
            </div>

            <Reveal open={rating !== null} className="pt-6">
              <div className="flex w-full flex-col gap-4">
                <label className="flex h-[152px] w-full flex-col gap-1">
                  {/* Keeps the last prompt while collapsed; there is none before a score. */}
                  <span className="pb-0.5 text-body-sm font-medium text-portal-text">{promptFor(rating ?? 10)}</span>
                  <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Share your thoughts about this product…"
                    className="min-h-0 w-full flex-1 resize-none rounded-[6px] border border-portal-border bg-portal-light px-3.5 py-3 text-body-sm text-portal-text outline-none placeholder:text-portal-placeholder focus:border-portal-dark"
                  />
                </label>

                <div className="flex w-full flex-col gap-2.5">
                  <div className="flex w-full flex-col">
                    <div className="flex w-full items-center justify-between text-body-sm whitespace-nowrap">
                      <p className="font-medium text-portal-text">
                        Add Photo <span className="font-normal text-portal-muted">(Optional)</span>
                      </p>
                      <p className="text-portal-muted">
                        {photos.length}/{MAX_PHOTOS}
                      </p>
                    </div>
                    <p className="text-body-sm text-portal-muted">Shoppers find images more helpful than text alone</p>
                  </div>

                  <div className="flex w-full items-center gap-3">
                    {photos.map((photo, index) => (
                      <span key={photo} className="relative size-12 shrink-0 rounded-[10px] border border-portal-border">
                        <img src={photo} alt="" className="size-full rounded-[10px] object-cover" />
                        <button
                          type="button"
                          aria-label={`Remove photo ${index + 1}`}
                          onClick={() => setPhotos((current) => current.filter((item) => item !== photo))}
                          className="absolute top-[-9px] left-[31px] flex size-6 cursor-pointer items-center justify-center overflow-clip rounded-full bg-portal-dark p-1"
                        >
                          <img src="/urmei/sample-requests/photo-remove.svg" alt="" width={16} height={16} className="block size-4" />
                        </button>
                      </span>
                    ))}
                    {uploading ? (
                      <span
                        role="status"
                        aria-label="Uploading photo"
                        className="flex shrink-0 items-center rounded-[10px] border border-dashed border-portal-border p-3"
                      >
                        <img src="/urmei/sample-requests/upload-loader.svg" alt="" width={21} height={21} className="motion-spin-soft block size-[21px]" />
                      </span>
                    ) : photos.length < MAX_PHOTOS ? (
                      <button
                        type="button"
                        aria-label="Add photo"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex shrink-0 cursor-pointer items-center rounded-[10px] border border-dashed border-portal-border p-3"
                      >
                        <Plus aria-hidden="true" className="size-[21px] text-portal-text" strokeWidth={1.5} />
                      </button>
                    ) : null}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        void addPhoto(event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                  </div>
                  {uploadFailed ? (
                    <p role="alert" className="text-body-xs text-portal-alert">Upload failed. Please try again.</p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal open={rating !== null} className="pt-4">
            <Button
              variant="portal"
              className="w-full"
              disabled={!canSubmit}
              onClick={() => rating !== null && onSubmit({ rating, text: text.trim(), photos })}
            >
              Submit Review
            </Button>
          </Reveal>
        </div>
      </div>
    </div>,
    document.body,
  );
}
