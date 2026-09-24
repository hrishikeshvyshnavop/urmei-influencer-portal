import Button from "./Button";
import { PAYMENT_STORAGE_KEY } from "../bank-account";
import { isSetupRequired } from "../setup-status";
import { navigate } from "../../router";

function hasCompletedAction(storageKey: string) {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return false;
    return (JSON.parse(value) as { status?: string }).status === "complete";
  } catch {
    return false;
  }
}

/** Skipping onboarding counts the same as never finishing it — both leave the
 *  profile incomplete, so publishing stays blocked either way. Identity is
 *  verified as part of the creator's application, so the bank account is the
 *  only thing setup still waits on. */
export function isProfileSetupComplete(): boolean {
  return hasCompletedAction(PAYMENT_STORAGE_KEY) && !isSetupRequired();
}

/** Where "Fix Issues" should send the user: Manage Account's Payouts section,
 *  rather than the standalone onboarding accordion. */
export function getSetupManageAccountRoute(): string {
  return "/manage-account/payouts";
}

/**
 * The "finish setting up your account" prompt (Figma `1602:37660`). Shown on
 * any page reachable once a user is logged in but hasn't finished onboarding
 * — including when they explicitly skipped it, since skipping doesn't make
 * the shop publishable.
 */
export default function SetupBanner() {
  if (isProfileSetupComplete()) return null;

  // The design's wording (Figma `1602:37660`). Manage Account clears the skip
  // flag as soon as a bank account is on file.
  const message = "To publish your shop, you need to add bank details";

  return (
    // The band is full-bleed; its content sits in the same centred 1440px
    // column as the header and the page, so above 1440px the message and
    // "Fix Issues" line up with them instead of hugging the window edges.
    <aside
      className="sticky top-[88px] z-20 w-full border-b border-[#e6e5e4] bg-[#fffefd]"
      aria-label="Account setup required"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-3 px-6 py-3 sm:flex-row sm:items-center lg:px-[120px]">
      <div className="flex min-w-0 items-start gap-3 sm:items-center">
        <img
          src="/urmei/icon-triangle-alert.svg"
          alt=""
          className="mt-px size-5 shrink-0 sm:mt-0"
        />
        <p className="text-body-md font-medium text-[#2d2305]">{message}</p>
      </div>
      <Button
        variant="portalLink"
        className="shrink-0 underline"
        onClick={() => {
          navigate(getSetupManageAccountRoute());
        }}
      >
        Fix Issues
      </Button>
      </div>
    </aside>
  );
}
