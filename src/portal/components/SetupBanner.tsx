import Button from "./Button";
import { VERIFICATION_STORAGE_KEY } from "../VerificationPartner";
import { PAYMENT_STORAGE_KEY } from "../bank-account";
import { isSetupRequired } from "../setup-status";

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
 *  profile incomplete, so publishing stays blocked either way. */
export function isProfileSetupComplete(): boolean {
  return (
    hasCompletedAction(VERIFICATION_STORAGE_KEY) &&
    hasCompletedAction(PAYMENT_STORAGE_KEY) &&
    !isSetupRequired()
  );
}

/** Where "Fix Issues" should send the user: identity
 *  first, then payment, matching the order `Onboarding.tsx` presents them in.
 *  Deep-links into Manage Account's matching section rather than the
 *  standalone onboarding accordion, so verifying happens from the user's
 *  profile. */
export function getSetupManageAccountRoute(): string {
  return hasCompletedAction(VERIFICATION_STORAGE_KEY)
    ? "#/manage-account/payouts"
    : "#/manage-account/identity";
}

/**
 * The "finish setting up your account" prompt (Figma `1602:37660`). Shown on
 * any page reachable once a user is logged in but hasn't finished onboarding
 * — including when they explicitly skipped it, since skipping doesn't make
 * the shop publishable.
 */
export default function SetupBanner() {
  if (isProfileSetupComplete()) return null;

  const identityVerified = hasCompletedAction(VERIFICATION_STORAGE_KEY);
  const bankAdded = hasCompletedAction(PAYMENT_STORAGE_KEY);
  // The design words the bank-only case exactly this way; the other two follow
  // its phrasing and name only what is actually still missing, so the banner
  // never asks for something the user has already done. (Skipping setup shows
  // the both-missing line, and Manage Account clears the skip flag as soon as
  // identity and bank are both on file.)
  const message = identityVerified
    ? "To publish your shop, you need to add bank details"
    : bankAdded
      ? "To publish your shop, you need to verify your identity"
      : "To publish your shop, you need to verify your identity and add bank details";

  return (
    <aside
      className="sticky top-[88px] z-20 flex w-full flex-col items-start justify-between gap-3 border-b border-[#e6e5e4] bg-[#fffefd] px-6 py-3 sm:flex-row sm:items-center lg:px-[120px]"
      aria-label="Account setup required"
    >
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
          window.location.hash = getSetupManageAccountRoute();
        }}
      >
        Fix Issues
      </Button>
    </aside>
  );
}
