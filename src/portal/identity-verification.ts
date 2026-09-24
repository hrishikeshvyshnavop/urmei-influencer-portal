import { useEffect, useState } from "react";
import type { StepStatus } from "./components/StepAccordion";
import {
  VERIFICATION_MESSAGE_TYPE,
  VERIFICATION_STORAGE_KEY,
} from "./VerificationPartner";

/** What the creator needs to hand over, per Figma `1583:87450`. The `inset`
 *  values position each raw Figma vector fragment inside its 16px box — see
 *  the note in CLAUDE.md about keeping exported icon wrappers intact. */
export const IDENTITY_REQUIREMENTS = [
  {
    icon: "id-card",
    inset: "inset-[20.83%_8.33%]",
    label: "Government-issued photo ID",
  },
  {
    icon: "camera",
    inset: "inset-[16.67%_8.33%]",
    label: "Camera-enabled device",
  },
  {
    icon: "shield-check",
    inset: "inset-[8.33%_16.67%]",
    label: "Personal details matching your account",
  },
];

/**
 * Drives identity verification: the status, the partner popup, and the two
 * channels the popup reports back on.
 *
 * The partner runs in a separate window, so completion can arrive either as a
 * `postMessage` (same tab tree) or as a `storage` event (the popup wrote the
 * result and something else is listening) — both are handled, because which
 * one fires depends on how the popup was opened and whether it was blocked.
 *
 * `onComplete` exists for callers that need to react beyond the status itself
 * — `Onboarding` reopens its accordion on the identity step, for instance.
 */
export function useIdentityVerification({
  initialStatus = "idle",
  onComplete,
}: {
  initialStatus?: StepStatus;
  onComplete?: () => void;
} = {}) {
  const [status, setStatus] = useState<StepStatus>(initialStatus);

  useEffect(() => {
    const complete = () => {
      setStatus("complete");
      onComplete?.();
    };

    const receiveStorage = (event: StorageEvent) => {
      if (event.key !== VERIFICATION_STORAGE_KEY || !event.newValue) return;
      try {
        const result = JSON.parse(event.newValue) as { status?: string };
        if (result.status === "complete") complete();
      } catch {
        // Ignore malformed prototype messages from local storage.
      }
    };

    const receiveMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data?.type === VERIFICATION_MESSAGE_TYPE &&
        event.data?.status === "complete"
      ) {
        complete();
      }
    };

    window.addEventListener("storage", receiveStorage);
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("storage", receiveStorage);
      window.removeEventListener("message", receiveMessage);
    };
    // `onComplete` is intentionally excluded: callers pass an inline closure,
    // so depending on it would tear down and re-attach both listeners on
    // every render — and the popup could report back in the gap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Opens (or re-focuses) the partner window. Doubles as "Return to
   *  Verification Window" and "Retry Verification": the window name is fixed,
   *  so a second call re-uses the same popup rather than stacking another. */
  const startVerification = () => {
    setStatus("pending");
    const partnerUrl = new URL("/verify/partner", window.location.origin);
    const width = 520;
    const height = 720;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
    const verificationWindow = window.open(
      partnerUrl,
      "urmei-verification-partner",
      `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes`,
    );
    verificationWindow?.focus();
  };

  const restartVerification = () => setStatus("idle");

  return { status, startVerification, restartVerification };
}
