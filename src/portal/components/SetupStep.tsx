import type { ReactNode } from "react";
import Button from "./Button";
import PortalFormLayout from "./PortalFormLayout";
import { scrollToFirstError } from "@/lib/form-validation";

/** Profile setup is four numbered steps: profile pic, profile, shipping
 *  address, bank details (Figma `1583:87724`). Review Details precedes them
 *  and is deliberately unnumbered. */
export const SETUP_STEP_COUNT = 4;

type SetupStepProps = {
  /** 1-based, rendered as "2/4" above the heading. */
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Label on the primary button — each step names its own action
   *  ("Set Profile", "Add Address", "Add Account"). */
  submitLabel: string;
  onSubmit: () => void;
  /** Drawn on every step after the first. The design labels this button
   *  "bank", which is a typo for "Back": it also appears on the bank step
   *  itself, where a shortcut to the bank step could not mean anything. */
  onBack?: () => void;
  /** Header control. Steps 3 and 4 offer it; steps 1 and 2 don't. */
  onSkip?: () => void;
};

/**
 * The shared chrome of the wide profile-setup steps (Figma `1583:87728`,
 * `1583:88082`): 940px form column, 100px gutters, 120px top padding, the
 * step counter above a 24px heading, then the step's fields, then a
 * right-aligned Back/primary pair.
 */
export default function SetupStep({
  step,
  title,
  subtitle,
  children,
  submitLabel,
  onSubmit,
  onBack,
  onSkip,
}: SetupStepProps) {
  return (
    <PortalFormLayout
      hideLanguageSelector
      hideHeaderBackdrop
      headerAction={
        onSkip ? (
          <Button variant="portalOutlineLg" onClick={onSkip}>
            Skip
          </Button>
        ) : undefined
      }
    >
      <form
        className="flex w-full max-w-[940px] flex-col gap-8 px-6 pt-[120px] pb-16 sm:px-12 lg:px-[100px]"
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex w-full flex-col items-start gap-10">
          <div className="flex w-full flex-col items-start gap-[6px]">
            <p className="w-full text-body-sm text-portal-placeholder">
              {step}/{SETUP_STEP_COUNT}
            </p>
            <h1 className="w-full text-body-xxl text-portal-text">{title}</h1>
            <p className="w-full text-body-md text-portal-muted">{subtitle}</p>
          </div>

          <div className="flex w-full max-w-[740px] flex-col items-start gap-4">
            {children}
          </div>

          <div className="flex w-full max-w-[740px] items-start justify-end gap-3">
            {onBack ? (
              <Button
                variant="portalOutlineLg"
                className="w-[120px]"
                onClick={onBack}
              >
                Back
              </Button>
            ) : null}
            <Button type="submit" variant="portalLg" className="w-[120px]">
              {submitLabel}
            </Button>
          </div>
        </div>
      </form>
    </PortalFormLayout>
  );
}
