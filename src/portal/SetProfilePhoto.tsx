import { useRef, useState } from "react";
import Button from "./components/Button";
import PortalLayout from "./components/PortalLayout";

const STACK_HEIGHT = 354;
const CROP_SIZE = 298;
/** The photo is taller than the 1:1 crop window, so it drags vertically. */
const MAX_OFFSET = (STACK_HEIGHT - CROP_SIZE) / 2;

function CornerBracket({ position }: { position: string }) {
  return (
    <span
      className={`pointer-events-none absolute size-[18px] border-portal-light ${position}`}
    />
  );
}

type CropModalProps = {
  src: string;
  offsetY: number;
  onOffsetChange: (offsetY: number) => void;
  onCancel: () => void;
  onApply: () => void;
};

function CropModal({
  src,
  offsetY,
  onOffsetChange,
  onCancel,
  onApply,
}: CropModalProps) {
  const drag = useRef<{ startY: number; startOffset: number } | null>(null);

  const clamp = (value: number) =>
    Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value));

  return (
    <div
      className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.5)]"
      role="dialog"
      aria-modal="true"
      aria-label="Adjust crop area"
    >
      <div className="absolute top-1/2 left-1/2 w-[500px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[10px] bg-portal-light">
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
              className="relative h-[354px] w-full overflow-hidden rounded-[4px] bg-[#b0ada9] select-none"
              onPointerDown={(event) => {
                drag.current = { startY: event.clientY, startOffset: offsetY };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!drag.current) return;
                onOffsetChange(
                  clamp(
                    drag.current.startOffset + (event.clientY - drag.current.startY),
                  ),
                );
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
            >
              <div className="absolute inset-y-0 left-1/2 w-[298px] -translate-x-1/2 cursor-grab active:cursor-grabbing">
                <img
                  src={src}
                  alt="Selected profile photo"
                  draggable={false}
                  style={{ transform: `translateY(${offsetY}px)` }}
                  className="pointer-events-none size-full max-w-none object-cover"
                />

                {/* Dimmed bands above and below the 1:1 crop window */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[28px] bg-[rgba(34,34,34,0.28)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28px] bg-[rgba(34,34,34,0.27)]" />

                <div className="pointer-events-none absolute inset-x-0 top-[28px] size-[298px] border-2 border-solid border-portal-border">
                  <CornerBracket position="top-0 left-0 border-t-2 border-l-2" />
                  <CornerBracket position="top-0 right-0 border-t-2 border-r-2" />
                  <CornerBracket position="bottom-0 left-0 border-b-2 border-l-2" />
                  <CornerBracket position="bottom-0 right-0 border-b-2 border-r-2" />
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
  const [photo, setPhoto] = useState<{ src: string; offsetY: number } | null>(
    null,
  );
  const [offsetY, setOffsetY] = useState(0);

  const pickFile = () => fileInput.current?.click();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPending(URL.createObjectURL(file));
    setOffsetY(0);
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
              <div className="size-[160px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={photo.src}
                  alt="Your profile photo"
                  style={{
                    objectPosition: `50% ${50 - (photo.offsetY / STACK_HEIGHT) * 100}%`,
                  }}
                  className="size-full max-w-none object-cover"
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

      {pending ? (
        <CropModal
          src={pending}
          offsetY={offsetY}
          onOffsetChange={setOffsetY}
          onCancel={() => setPending(null)}
          onApply={() => {
            setPhoto({ src: pending, offsetY });
            setPending(null);
          }}
        />
      ) : null}
    </PortalLayout>
  );
}
