import Button from "./Button";
import { Icon16, StatusHeader, StepCard } from "./StepAccordion";
import type { StepStatus } from "./StepAccordion";
import { IDENTITY_REQUIREMENTS } from "../identity-verification";

/**
 * The Identity Verification block on the apply form (Figma `1583:87445` for
 * the resting state, `1583:89390` in progress, plus the failed and verified
 * variants at the same position).
 *
 * The latest design moves identity verification *into* the application, ahead
 * of approval, rather than leaving it to post-approval onboarding — so this
 * renders as a plain card in the form rather than a step in an accordion.
 *
 * `Onboarding` still carries its own copy of these four states inline, and
 * they measure identical to this design. The two should converge on this
 * component once it's settled whether the new flow keeps Onboarding's
 * identity step at all — see the note in the section 02 hand-off.
 */
export function IdentityVerificationCard({
  status,
  onStart,
  onRestart,
}: {
  status: StepStatus;
  onStart: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-[6px]">
      <StepCard>
        {status === "complete" ? (
          // The verified state collapses to a single row: the message *is* the
          // heading, so there's no body paragraph under it.
          <StatusHeader
            well="bg-portal-ok-bg"
            icon="/urmei/icon-shield-check-success.svg"
            inset="inset-[8.33%_16.67%]"
            bleed="inset-[-4.99%_-6.23%]"
            heading="Your identity has been successfully verified."
          />
        ) : null}

        {status === "pending" ? (
          <>
            <div className="flex w-full flex-col items-start gap-3">
              <StatusHeader
                well="bg-portal-info-bg"
                icon="/urmei/icon-circle-dashed.svg"
                inset="inset-[8.33%]"
                heading="Verification in progress"
              />
              <p className="w-full text-body-sm text-portal-muted">
                You&#39;re completing verification in another window. This page
                will update automatically once your identity is confirmed.
              </p>
            </div>
            <div className="flex w-full flex-col items-start gap-3">
              <Button variant="portalOutline" onClick={onStart}>
                Return to Verification Window
              </Button>
              <p className="w-full text-body-sm text-portal-muted">
                Having trouble?{" "}
                <button
                  type="button"
                  onClick={onRestart}
                  className="cursor-pointer underline"
                >
                  Restart verification
                </button>
              </p>
            </div>
          </>
        ) : null}

        {status === "failed" ? (
          <>
            <div className="flex w-full flex-col items-start gap-3">
              <StatusHeader
                well="bg-portal-warn-bg"
                icon="/urmei/icon-triangle-alert.svg"
                inset="inset-[12.44%_8.34%_12.5%_8.26%]"
                heading="Something went wrong"
              />
              <p className="w-full text-body-sm text-portal-muted">
                We couldn&#39;t verify your identity. This may be due to unclear
                photos or mismatched information. Please try again.
              </p>
            </div>
            <Button variant="portal" onClick={onStart}>
              Retry Verification
            </Button>
          </>
        ) : null}

        {status === "idle" || status === "locked" ? (
          <>
            <div className="flex w-full flex-col items-start gap-2">
              <p className="w-full text-body-sm text-portal-muted">
                You&#39;ll need the following to verify your identity to join as
                creator in URMEI
              </p>
              <div className="flex w-full flex-col items-start gap-1">
                {IDENTITY_REQUIREMENTS.map((requirement) => (
                  <div
                    key={requirement.icon}
                    className="flex w-full items-center gap-2"
                  >
                    <Icon16
                      src={`/urmei/icon-${requirement.icon}.svg`}
                      inset={requirement.inset}
                    />
                    <p className="min-w-px flex-1 text-body-sm text-portal-subtle">
                      {requirement.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="portal" onClick={onStart}>
                Start verification
              </Button>
              <p className="text-body-xs whitespace-nowrap text-portal-muted">
                Usually takes 3-5 minutes
              </p>
            </div>
          </>
        ) : null}
      </StepCard>

      {/* Only the resting state carries the partner disclaimer; once
          verification is under way the card is reporting status instead. */}
      {status === "idle" || status === "locked" ? (
        <p className="w-full text-body-xxs text-portal-muted opacity-80">
          Your documents are processed securely by our verification partner.
          URMEI only receives the verification result and required identity
          data.
        </p>
      ) : null}
    </div>
  );
}
