import Button from "./Button";
import { VERIFICATION_STORAGE_KEY } from "../VerificationPartner";
import { PAYMENT_STORAGE_KEY } from "../PaymentPartner";
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

/** Where "Complete action"/"Complete profile" should send the user: identity
 *  first, then payment, matching the order `Onboarding.tsx` presents them in. */
export function getSetupNextRoute(): string {
  return hasCompletedAction(VERIFICATION_STORAGE_KEY) ? "#/payment" : "#/verify";
}

/**
 * "Verify your identity and connect a payment method" prompt (Figma
 * `1241:72617`). Shown on any page reachable once a user is logged in but
 * hasn't finished onboarding — including when they explicitly skipped it,
 * since skipping doesn't make the shop publishable.
 */
export default function SetupBanner() {
  if (isProfileSetupComplete()) return null;

  return (
    <aside
      className="flex w-full flex-col items-start justify-between gap-3 border-b border-[#e6e5e4] bg-[#fffefd] px-6 py-3 sm:flex-row sm:items-center lg:px-[120px]"
      aria-label="Account setup required"
    >
      <div className="flex min-w-0 items-start gap-3 sm:items-center">
        <img
          src="/urmei/icon-triangle-alert.svg"
          alt=""
          className="mt-px size-5 shrink-0 sm:mt-0"
        />
        <p className="text-body-md font-medium text-[#2d2305]">
          To publish your shop, you need to verify your identity and connect
          a payment method.
        </p>
      </div>
      <Button
        variant="portalOutline"
        className="shrink-0 bg-[#fffefd]"
        onClick={() => {
          window.location.hash = getSetupNextRoute();
        }}
      >
        Complete action
      </Button>
    </aside>
  );
}
