import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./components/Button";
import PortalLayout from "./components/PortalLayout";
import { CroppedPhoto } from "./components/ProfilePhoto";
import { SETUP_STEP_COUNT } from "./components/SetupStep";
import { readProfilePhoto, saveProfilePhoto, type PhotoCrop } from "./profile-photo";

const MIN_CROP_SCALE = 0.55;

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
  onCancel: () => void;
  onApply: (crop: PhotoCrop) => void;
};

/**
 * The photo pans freely under a fixed square that the corners resize. The
 * photo is scaled to cover the 298×354 stage and can only travel as far as it
 * still covers the square, so a tall photo moves up and down, a wide one side
 * to side, and shrinking the square frees up both. Pan is kept in stage
 * widths so the framing survives the stage resizing with the viewport.
 */
export function CropModal({ src, onCancel, onApply }: CropModalProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const [aspect, setAspect] = useState<number | null>(null);
  const [cropScale, setCropScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ startX: number; startY: number; startPan: { x: number; y: number } } | null>(null);
  const resize = useRef<{ startY: number; startScale: number; direction: number } | null>(null);

  useLayoutEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const measure = () => setStage({ width: element.clientWidth, height: element.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Geometry in px for the current stage; the photo is cover-fitted to it.
  const geometry = (scale: number) => {
    const ratio = aspect ?? stage.width / Math.max(stage.height, 1);
    const photoWidth = Math.max(stage.width, stage.height * ratio);
    const photoHeight = photoWidth / ratio;
    const square = scale * stage.width;
    return {
      photoWidth,
      photoHeight,
      square,
      // How far the photo may travel each way and still cover the square.
      maxX: Math.max(0, (photoWidth - square) / 2),
      maxY: Math.max(0, (photoHeight - square) / 2),
    };
  };

  const clampPan = (next: { x: number; y: number }, scale: number) => {
    const { maxX, maxY } = geometry(scale);
    const width = Math.max(stage.width, 1);
    const clamp = (value: number, max: number) => Math.max(-max, Math.min(max, value * width)) / width;
    return { x: clamp(next.x, maxX), y: clamp(next.y, maxY) };
  };

  const { photoWidth, photoHeight, square } = geometry(cropScale);
  const panPx = { x: pan.x * stage.width, y: pan.y * stage.width };

  const startResize = (direction: number, event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    resize.current = { startY: event.clientY, startScale: cropScale, direction };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const endGesture = () => {
    drag.current = null;
    resize.current = null;
  };

  const apply = () => {
    onApply({
      x: ((photoWidth - square) / 2 - panPx.x) / photoWidth,
      y: ((photoHeight - square) / 2 - panPx.y) / photoWidth,
      size: square / photoWidth,
    });
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
              className="relative h-[calc(min(298px,calc(100vw-80px))*354/298)] w-full touch-none overflow-hidden rounded-[4px] bg-[#b0ada9] select-none"
              onPointerDown={(event) => {
                drag.current = { startX: event.clientX, startY: event.clientY, startPan: pan };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                const width = Math.max(stage.width, 1);
                if (resize.current) {
                  const nextScale = Math.max(
                    MIN_CROP_SCALE,
                    Math.min(
                      1,
                      resize.current.startScale +
                        (resize.current.direction * 2 * (event.clientY - resize.current.startY)) / width,
                    ),
                  );
                  setCropScale(nextScale);
                  // A bigger square leaves the photo less room to travel.
                  setPan((current) => clampPan(current, nextScale));
                  return;
                }
                if (!drag.current) return;
                const { startX, startY, startPan } = drag.current;
                setPan(
                  clampPan(
                    {
                      x: startPan.x + (event.clientX - startX) / width,
                      y: startPan.y + (event.clientY - startY) / width,
                    },
                    cropScale,
                  ),
                );
              }}
              onPointerUp={endGesture}
              onPointerCancel={endGesture}
            >
              <div
                ref={stageRef}
                className="absolute inset-y-0 left-1/2 aspect-[298/354] max-w-full -translate-x-1/2 cursor-grab active:cursor-grabbing"
              >
                <img
                  src={src}
                  alt="Selected profile photo"
                  draggable={false}
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    // An SVG without intrinsic dimensions reports 0×0.
                    setAspect(naturalWidth && naturalHeight ? naturalWidth / naturalHeight : 1);
                  }}
                  style={{
                    width: photoWidth,
                    height: photoHeight,
                    left: (stage.width - photoWidth) / 2,
                    top: (stage.height - photoHeight) / 2,
                    transform: `translate(${panPx.x}px, ${panPx.y}px)`,
                  }}
                  className={`pointer-events-none absolute max-w-none will-change-transform ${aspect ? "" : "invisible"}`}
                />

                {/* Dimmed surround outside the 1:1 crop window */}
                <div
                  style={{ width: `${cropScale * 100}%` }}
                  className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 border border-solid border-portal-light shadow-[0_0_0_999px_rgba(34,34,34,0.28)]"
                >
                  <CornerBracket onPointerDown={(event) => startResize(-1, event)} position="-top-px -left-px cursor-nwse-resize! border-t-3 border-l-3" />
                  <CornerBracket onPointerDown={(event) => startResize(-1, event)} position="-top-px -right-px cursor-nesw-resize! border-t-3 border-r-3" />
                  <CornerBracket onPointerDown={(event) => startResize(1, event)} position="-bottom-px -left-px cursor-nesw-resize! border-b-3 border-l-3" />
                  <CornerBracket onPointerDown={(event) => startResize(1, event)} position="-right-px -bottom-px cursor-nwse-resize! border-b-3 border-r-3" />
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
          <Button variant="portal" onClick={apply} disabled={!aspect || !stage.width}>
            Apply crop
          </Button>
        </div>
      </div>
    </div>
  );
}

type SetProfilePhotoProps = {
  onContinue: () => void;
};

/** Step 1 of profile setup (Figma `1583:87931`). A photo is mandatory: there
 *  is no "Skip" here or on step 2 — only on the shipping and bank steps, where
 *  the frames draw one — and Continue stays disabled until one is applied. */
export default function SetProfilePhoto({ onContinue }: SetProfilePhotoProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<string | null>(null);
  // Seeded from storage so returning here — via Back from step 2, or a
  // reload — finds the photo already applied rather than an empty circle.
  const [photo, setPhoto] = useState(readProfilePhoto);

  const pickFile = () => fileInput.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") return;
      setPending(reader.result);
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <PortalLayout withPanel offsetHeader hideLanguageSelector>
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <div className="flex w-full flex-col items-center gap-[6px]">
            <p className="w-full text-body-sm text-portal-placeholder">
              1/{SETUP_STEP_COUNT}
            </p>
            <h1 className="w-full text-body-xxl text-portal-text">
              Set your profile pic
            </h1>
          </div>
          <p className="w-full text-body-md text-portal-muted">
            Add a photo so brands and followers can recognize you. You can always
            change this later.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {photo ? (
            <>
              <div className="motion-feedback relative size-[160px] shrink-0 overflow-hidden rounded-full">
                <CroppedPhoto photo={photo} alt="Your profile photo" />
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
          <Button
            variant="portalLg"
            className="w-[120px]"
            // Nothing to continue to without a photo: the whole step is the
            // photo, so an empty circle is an incomplete step, not a skip.
            disabled={!photo}
            onClick={onContinue}
          >
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
              onCancel={() => setPending(null)}
              onApply={(crop) => {
                const nextPhoto = { src: pending, crop };
                setPhoto(nextPhoto);
                saveProfilePhoto(nextPhoto);
                setPending(null);
              }}
            />,
            document.body,
          )
        : null}
    </PortalLayout>
  );
}
