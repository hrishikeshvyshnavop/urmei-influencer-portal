import { useEffect, useRef, useState } from "react";
import FieldGrid from "./components/FieldGrid";
import ProfilePhoto from "./components/ProfilePhoto";
import { readProfilePhoto } from "./profile-photo";
import SetupStep from "./components/SetupStep";
import type { FieldSpec } from "./form-fields";

/** Stand-in for the availability check the API will do. */
const takenUsernames = ["charlotte", "urmei", "admin", "rachel"];

/**
 * How long typing has to stop before the handle is judged. Only the failure
 * needs the pause — being told a name is taken while still halfway through
 * typing it is noise — so the tick returns as soon as the value settles.
 */
const SETTLE_DELAY_MS = 500;

const SHOP_URL_PREFIX = "urmei.com/shop/";

/** The verified name from the application, which the fields open on. */
const ACCOUNT = { firstName: "Charlotte", lastName: "Wong" };

/**
 * The handle the account gets by default. The design opens step 2 on a filled,
 * already-ticked username rather than an empty box (Figma `1583:87772`): the
 * creator has a working shop URL without doing anything, and editing it is a
 * choice. Suffixes a digit if the plain name is gone, so the default is always
 * one that's actually free.
 */
function defaultUsername() {
  const base = `${ACCOUNT.firstName}${ACCOUNT.lastName}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  if (!takenUsernames.includes(base)) return base;
  for (let suffix = 1; ; suffix += 1) {
    if (!takenUsernames.includes(`${base}${suffix}`)) return `${base}${suffix}`;
  }
}

const fields: FieldSpec[] = [
  {
    name: "displayName",
    label: "Display name",
    placeholder: "",
    hint: "You'll be addressed by this name",
  },
  {
    name: "username",
    label: "Username",
    placeholder: "",
    prefix: SHOP_URL_PREFIX,
    hint: "This will be your unique shop URL on URMEI",
  },
];

type FinishProfileProps = {
  onSubmit: (username: string) => void;
  onBack: () => void;
};

/**
 * Step 2 of profile setup (Figma `1583:87725`, error state `1583:87791`).
 *
 * The card above the fields is a live preview of the public profile, so it
 * reads back whatever is typed below — that is the whole point of the screen
 * ("This is how people will recognise you"). Follower and platform counts are
 * the prototype's fixed figures, as on Home.
 *
 * The username is not a blank to fill: it arrives derived from the account
 * name and already free, ticked in the box the way the design draws it, and
 * only turns into a question if the creator edits it into something taken. It
 * does not track the display name after mount — changing what people call you
 * shouldn't silently move your shop URL.
 */
export default function FinishProfile({ onSubmit, onBack }: FinishProfileProps) {
  // Read once on mount: the photo is chosen on step 1 and can't change here,
  // and its presence decides whether the holder keeps its dashed outline.
  const [savedPhoto] = useState(readProfilePhoto);
  const [values, setValues] = useState<Record<string, string>>({
    displayName: ACCOUNT.firstName,
    username: defaultUsername(),
  });
  // The default is known-free, so the field starts settled and ticked; typing
  // unsettles it until the pause above.
  const [settled, setSettled] = useState(true);
  const [showRequired, setShowRequired] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const clearPendingTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const username = (values.username ?? "").trim();
  const displayName = (values.displayName ?? "").trim();
  const isTaken = takenUsernames.includes(username.toLowerCase());

  const setField = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (name !== "username") return;
    // Editing the handle drops the verdict until the typing pause is over: no
    // tick, no error, nothing claimed about a value still being written.
    clearPendingTimers();
    setSettled(false);
    setShowRequired(false);
    timersRef.current.push(
      setTimeout(() => setSettled(true), SETTLE_DELAY_MS),
    );
  };

  const submit = () => {
    if (!username) {
      setShowRequired(true);
      return;
    }
    if (isTaken) {
      // Submitting mid-pause: show the verdict instead of acting on it.
      clearPendingTimers();
      setSettled(true);
      return;
    }
    onSubmit(username);
  };

  const usernameError = !settled
    ? undefined
    : isTaken
      ? // Verbatim from the error frame, Figma `1583:87791`.
        "Username not available. Try another"
      : showRequired && !username
        ? "Username is required."
        : undefined;

  return (
    <SetupStep
      step={2}
      title="Finish your profile"
      subtitle="This is how people will recognise you in URMEI Platform."
      submitLabel="Set Profile"
      onBack={onBack}
      onSubmit={submit}
    >
      <div className="flex w-full flex-col items-start gap-[10px] rounded-[6px] bg-portal-surface px-8 py-6">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center gap-4">
            <div
              className={`relative size-[72px] shrink-0 overflow-hidden rounded-full ${
                savedPhoto
                  ? ""
                  : "border-[1.5px] border-dashed border-portal-border"
              }`}
            >
              <ProfilePhoto
                fallback="/urmei/avatar-placeholder.svg"
                alt={displayName || "Your profile"}
              />
            </div>
            <div className="flex min-w-px flex-1 flex-col items-start gap-1">
              <div className="flex w-full items-end gap-[6px]">
                <p className="text-body-xxl font-semibold whitespace-nowrap text-portal-text">
                  {displayName || "Your name"}
                </p>
                <p className="pb-[3px] text-body-md font-medium whitespace-nowrap text-portal-muted">
                  @{username || "username"}
                </p>
              </div>
              <p className="flex items-center gap-2 text-body-sm font-medium text-portal-muted">
                <img
                  src="/urmei/home/follower.svg"
                  alt="URMEI"
                  className="h-[14px] w-[26px]"
                />
                445 Followers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-body-sm font-medium text-portal-muted">
            <span className="flex items-center gap-1">
              <img
                src="/urmei/home/tiktok-stat.svg"
                alt="TikTok"
                className="size-[14px]"
              />
              112.2K
            </span>
            <span className="flex items-center gap-1">
              <img
                src="/urmei/home/instagram-stat.svg"
                alt="Instagram"
                className="size-[14px]"
              />
              15.4K
            </span>
          </div>
        </div>

        {/* The shop URL is a preview, not a control: there is nothing to copy
            until the username is saved and the shop published. */}
        <div className="flex w-[297px] max-w-full items-center justify-between rounded-lg border border-solid border-portal-border bg-portal-light px-3 py-1.5">
          <div className="flex min-w-0 flex-col items-start">
            <span className="text-body-xxs text-portal-muted">Shop URL</span>
            <span className="block max-w-[220px] truncate text-body-sm font-medium text-portal-body">
              {SHOP_URL_PREFIX}
              {username}
            </span>
          </div>
        </div>
      </div>

      <FieldGrid
        fields={fields}
        values={values}
        onChange={setField}
        errorFor={(field) =>
          field.name === "username" ? usernameError : undefined
        }
        // The tick inside the box is the whole confirmation, as drawn: no
        // sentence underneath saying what the tick already says.
        validFor={(field, value) =>
          field.name === "username" && settled && Boolean(value.trim())
        }
      />
    </SetupStep>
  );
}
