import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./components/Button";
import PortalLayout from "./components/PortalLayout";
import { PROFILE_PHOTO_KEY } from "./components/ProfilePhoto";

const CROP_SIZE = 298;
const CROP_BAND = 28;
const PREVIEW_SIZE = 160;
const PREVIEW_BAND = (CROP_BAND / CROP_SIZE) * PREVIEW_SIZE;

function CornerBracket({
  position,
  onPointerDown,
}: {
  position: string;
  onPointerDown: React.PointerEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      aria-label="Resize crop area"
      onPointerDown={onPointerDown}
      className={`absolute size-[24px] touch-none border-portal-light ${position}`}
    />
  );
}

type CropModalProps = {
  src: string;
  offset: number;
  onOffsetChange: (offset: number) => void;
  cropScale: number;
  onCropScaleChange: (scale: number) => void;
  onCancel: () => void;
  onApply: () => void;
};

function CropModal({
  src,
  offset,
  onOffsetChange,
  cropScale,
  onCropScaleChange,
  onCancel,
  onApply,
}: CropModalProps) {
  const cropArea = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startY: number; startOffset: number } | null>(null);
  const resize = useRef<{ startY: number; startScale: number; direction: number } | null>(null);

  const clamp = (value: number) => Math.max(-1, Math.min(1, value));
  const maxOffset = () => {
    const size = cropArea.current?.clientWidth ?? CROP_SIZE;
    return size * (CROP_BAND / CROP_SIZE + (1 - cropScale) / 2);
  };
  const startResize =
    (direction: number): React.PointerEventHandler<HTMLButtonElement> =>
    (event) => {
      event.stopPropagation();
      resize.current = { startY: event.clientY, startScale: cropScale, direction };
      event.currentTarget.setPointerCapture(event.pointerId);
    };

  return (
    <div
      className="motion-modal-backdrop fixed inset-0 z-30 flex items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.5)] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Adjust crop area"
    >
      <div className="motion-modal-panel relative my-auto flex w-[500px] max-w-full shrink-0 flex-col items-center rounded-[10px] bg-portal-light">
        <div className="flex w-full flex-col items-start gap-6 p-6">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex min-w-px flex-1 flex-col">
                <p className="w-full text-body-lg font-medium text-portal-text">
                  Adjust crop area
                </p>
                <p className="w-full text-body-sm text-portal-muted">
                  Drag to reposition: 1:1 square required
                </p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                aria-label="Close"
                className="flex w-[40px] shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-lg border border-solid border-portal-border p-3"
              >
                <span className="relative size-[16px] shrink-0 overflow-clip">
                  <span className="absolute inset-1/4">
                    <span className="absolute inset-[-8.31%]">
                      <img
                        src="/urmei/icon-x.svg"
                        alt=""
                        className="block size-full max-w-none"
                      />
                    </span>
                  </span>
                </span>
              </button>
            </div>

            <div
              ref={cropArea}
              className="relative h-[calc(min(298px,calc(100vw-80px))*354/298)] w-full overflow-hidden rounded-[4px] bg-[#b0ada9] select-none"
              onPointerDown={(event) => {
                drag.current = { startY: event.clientY, startOffset: offset };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (resize.current) {
                  const size = cropArea.current?.clientWidth ?? CROP_SIZE;
                  onCropScaleChange(
                    Math.max(
                      0.55,
                      Math.min(
                        1,
                        resize.current.startScale +
                          (resize.current.direction * 2 * (event.clientY - resize.current.startY)) / size,
                      ),
                    ),
                  );
                  return;
                }
                if (!drag.current) return;
                onOffsetChange(
                  clamp(
                    drag.current.startOffset +
                      (event.clientY - drag.current.startY) / maxOffset(),
                  ),
                );
              }}
              onPointerUp={() => {
                drag.current = null;
                resize.current = null;
              }}
            >
              <div className="absolute inset-y-0 left-1/2 aspect-[298/354] max-w-full -translate-x-1/2 cursor-grab active:cursor-grabbing">
                <img
                  src={src}
                  alt="Selected profile photo"
                  draggable={false}
                  style={{
                    transform: `translateY(calc(${offset} * (${CROP_BAND} + (1 - ${cropScale}) * ${CROP_SIZE / 2}) / 354 * 100%))`,
                  }}
                  className="pointer-events-none size-full max-w-none object-cover will-change-transform"
                />

                {/* Dimmed bands above and below the 1:1 crop window */}
                <div
                  style={{ width: `${cropScale * 100}%` }}
                  className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-portal-border shadow-[0_0_0_999px_rgba(34,34,34,0.28)]"
                >
                  <CornerBracket onPointerDown={startResize(-1)} position="-top-0.5 -left-0.5 cursor-nwse-resize border-t-2 border-l-2" />
                  <CornerBracket onPointerDown={startResize(-1)} position="-top-0.5 -right-0.5 cursor-nesw-resize border-t-2 border-r-2" />
                  <CornerBracket onPointerDown={startResize(1)} position="-bottom-0.5 -left-0.5 cursor-nesw-resize border-b-2 border-l-2" />
                  <CornerBracket onPointerDown={startResize(1)} position="-right-0.5 -bottom-0.5 cursor-nwse-resize border-b-2 border-r-2" />
                </div>

                <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-clip rounded-[6px] bg-[rgba(64,62,60,0.7)] p-1">
                  <span className="relative size-[16px] shrink-0 overflow-clip">
                    <span className="absolute inset-[8.33%]">
                      <span className="absolute inset-[-4.99%]">
                        <img
                          src="/urmei/icon-move.svg"
                          alt=""
                          className="block size-full max-w-none"
                        />
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between border-t border-solid border-portal-border p-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex cursor-pointer items-center justify-center gap-2 bg-portal-light px-4 py-2 text-body-sm font-medium uppercase text-portal-text"
          >
            Cancel
          </button>
          <Button variant="portal" onClick={onApply}>
            Apply crop
          </Button>
        </div>
      </div>
    </div>
  );
}

type SetProfilePhotoProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export default function SetProfilePhoto({
  onContinue,
  onSkip,
}: SetProfilePhotoProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [photo, setPhoto] = useState<{
    src: string;
    offset: number;
    cropScale: number;
  } | null>(
    null,
  );
  const [offset, setOffset] = useState(0);
  const [cropScale, setCropScale] = useState(1);

  const pickFile = () => fileInput.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") return;
      setPending(reader.result);
      setOffset(0);
      setCropScale(1);
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <PortalLayout
      withPanel
      offsetHeader
      headerAction={
        <Button variant="portalOutlineLg" className="w-[60px]" onClick={onSkip}>
          Skip
        </Button>
      }
    >
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <h1 className="w-full text-body-xxl text-portal-text">
            Set your profile photo
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Add a photo so brands and followers can recognize you. You can always
            change this later.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {photo ? (
            <>
              <div className="motion-feedback relative size-[160px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={photo.src}
                  alt="Your profile photo"
                  style={{
                    width: PREVIEW_SIZE / photo.cropScale,
                    height:
                      ((PREVIEW_SIZE + PREVIEW_BAND * 2) / photo.cropScale),
                    left: -((1 - photo.cropScale) * PREVIEW_SIZE) / (2 * photo.cropScale),
                    top:
                      -(
                        PREVIEW_BAND +
                        ((1 - photo.cropScale) * PREVIEW_SIZE) / 2 -
                        photo.offset *
                          (PREVIEW_BAND +
                            ((1 - photo.cropScale) * PREVIEW_SIZE) / 2)
                      ) / photo.cropScale,
                  }}
                  className="absolute max-w-none object-cover"
                />
              </div>
              <button
                type="button"
                onClick={pickFile}
                className="cursor-pointer text-body-xs whitespace-nowrap text-portal-dark underline"
              >
                Change photo
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={pickFile}
                className="relative size-[160px] shrink-0 cursor-pointer overflow-clip rounded-full border border-dashed border-portal-border"
                aria-label="Upload a profile photo"
              >
                <img
                  src="/urmei/avatar-placeholder.svg"
                  alt=""
                  className="absolute inset-[18.72%_24.38%_18.46%_24.38%] block size-auto max-w-none"
                />
              </button>
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={pickFile}
                  className="flex cursor-pointer items-center gap-1"
                >
                  <span className="relative size-[16px] shrink-0 overflow-clip">
                    <span className="absolute inset-[12.5%]">
                      <span className="absolute inset-[-5.54%]">
                        <img
                          src="/urmei/icon-upload.svg"
                          alt=""
                          className="block size-full max-w-none"
                        />
                      </span>
                    </span>
                  </span>
                  <span className="text-body-sm font-medium whitespace-nowrap text-portal-text">
                    Click to upload or drag and drop
                  </span>
                </button>
                <p className="text-body-xs whitespace-nowrap text-portal-placeholder">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full items-start justify-center">
          <Button variant="portalLg" className="w-[120px]" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/gif"
        onChange={onFileChange}
        className="hidden"
      />

      {pending
        ? createPortal(
            <CropModal
              src={pending}
              offset={offset}
              onOffsetChange={setOffset}
              cropScale={cropScale}
              onCropScaleChange={setCropScale}
              onCancel={() => setPending(null)}
              onApply={() => {
                const nextPhoto = { src: pending, offset, cropScale };
                setPhoto(nextPhoto);
                try {
                  window.localStorage.setItem(
                    PROFILE_PHOTO_KEY,
                    JSON.stringify(nextPhoto),
                  );
                } catch {
                  // The preview still works when browser storage is unavailable.
                }
                setPending(null);
              }}
            />,
            document.body,
          )
        : null}
    </PortalLayout>
  );
}
