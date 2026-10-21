import { useState } from "react";
import Button from "./components/Button";
import PortalLayout from "./components/PortalLayout";
import { CroppedPhoto } from "./components/ProfilePhoto";
import ProfilePhotoPicker, { PHOTO_MAX_MB } from "./components/ProfilePhotoPicker";
import { SETUP_STEP_COUNT } from "./components/SetupStep";
import { readProfilePhoto } from "./profile-photo";

type SetProfilePhotoProps = {
  onContinue: () => void;
};

/** Step 1 of profile setup (Figma `1583:87931`). A photo is mandatory: there
 *  is no "Skip" here or on step 2 — only on the shipping and bank steps, where
 *  the frames draw one — and Continue stays disabled until one is applied. */
export default function SetProfilePhoto({ onContinue }: SetProfilePhotoProps) {
  // Seeded from storage so returning here — via Back from step 2, or a
  // reload — finds the photo already applied rather than an empty circle.
  const [photo, setPhoto] = useState(readProfilePhoto);

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

        <ProfilePhotoPicker onSave={setPhoto}>
          {({ pick, error }) => (
            <div className="flex flex-col items-center gap-4">
              {photo ? (
                <>
                  <div className="motion-feedback relative size-[160px] shrink-0 overflow-hidden rounded-full">
                    <CroppedPhoto photo={photo} alt="Your profile photo" />
                  </div>
                  <button
                    type="button"
                    onClick={pick}
                    className="cursor-pointer text-body-xs whitespace-nowrap text-portal-dark underline"
                  >
                    Change photo
                  </button>
                  {error ? (
                    <p className="text-body-xs text-portal-alert" role="alert">
                      {error}
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={pick}
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
                      onClick={pick}
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
                    {error ? (
                      <p className="text-body-xs text-portal-alert" role="alert">
                        {error}
                      </p>
                    ) : (
                      <p className="text-body-xs whitespace-nowrap text-portal-placeholder">
                        PNG or JPG (max. {PHOTO_MAX_MB}MB)
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </ProfilePhotoPicker>

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
    </PortalLayout>
  );
}
