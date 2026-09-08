import { useEffect, useState } from "react";
import Button from "./components/Button";
import OtpInput, { OTP_LENGTH } from "./components/OtpInput";
import PortalLayout from "./components/PortalLayout";
import TextField from "./components/TextField";
import { scrollToFirstError } from "@/lib/form-validation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The design captures the countdown mid-flight at "Resend OTP in 55s"
 *  (Figma `1583:87705`), so the window itself is the conventional minute. */
const RESEND_SECONDS = 60;

type LoginProps = {
  onLogIn: () => void;
  onApply: () => void;
};

/**
 * Log in — a two-step screen (Figma `1583:87563` → `1583:87642`): the creator
 * enters their email, then the one-time code sent to it. Passwords are gone
 * from the portal entirely.
 *
 * Both steps live in one component rather than behind two hashes because
 * `App` keys each route to force a remount, which would drop the email on the
 * way to the code step — and "Change" has to come back to a still-filled
 * email field.
 */
export default function Login({ onLogIn, onApply }: LoginProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [code, setCode] = useState("");
  // Bumped by "Resend OTP" to remount the boxes empty; see `OtpInput`.
  const [attempt, setAttempt] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const isEmailValid = emailPattern.test(email.trim());

  const emailError =
    showErrors && email.trim().length === 0
      ? "Email is required."
      : email.trim().length > 0 && !isEmailValid
        ? "Please enter a valid email address"
        : undefined;

  // One interval per code, restarted by `attempt` — a resend issues a new
  // code, so the window it opens is a new countdown.
  useEffect(() => {
    if (step !== "otp") return;
    const timer = window.setInterval(() => {
      setSecondsLeft((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [step, attempt]);

  if (step === "otp") {
    return (
      <PortalLayout>
        <form
          className="flex w-full max-w-[500px] flex-col items-start gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            // Prototype: any six digits are accepted — there is no OTP to
            // check against, so the code is only gated on being complete.
            if (code.length < OTP_LENGTH) return;
            onLogIn();
          }}
        >
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-start gap-3">
              <h1 className="w-full text-body-xxl text-portal-text">
                Enter OTP to log in
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-body-md text-portal-muted">
                  Sent code via email to {email.trim()}
                </p>
                <Button
                  variant="portalLink"
                  className="text-body-sm"
                  onClick={() => setStep("email")}
                >
                  Change
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-2">
              <OtpInput
                key={attempt}
                label="One-time code"
                onChange={setCode}
                autoFocus
              />
              {secondsLeft > 0 ? (
                <p className="w-full text-body-xs text-portal-muted">
                  Resend OTP in {secondsLeft}s
                </p>
              ) : (
                // The expired state isn't drawn in Figma; the countdown line
                // becomes the resend control in place so nothing shifts.
                <Button
                  variant="portalLink"
                  className="text-body-xs text-portal-text"
                  onClick={() => {
                    setCode("");
                    setSecondsLeft(RESEND_SECONDS);
                    setAttempt((count) => count + 1);
                  }}
                >
                  Resend OTP
                </Button>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="portal"
            disabled={code.length < OTP_LENGTH}
          >
            Log In
          </Button>
        </form>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <form
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        className="flex w-full max-w-[500px] flex-col items-center gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          setShowErrors(true);
          if (!isEmailValid) {
            scrollToFirstError(event.currentTarget);
            return;
          }
          setCode("");
          setSecondsLeft(RESEND_SECONDS);
          setAttempt((count) => count + 1);
          setStep("otp");
        }}
      >
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col items-start gap-[6px]">
            <p className="w-full text-body-md text-portal-muted">Welcome back!</p>
            <h1 className="w-full text-body-xxl text-portal-text">
              Log in to your account
            </h1>
          </div>

          <TextField
            label="Email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            error={emailError}
          />
        </div>

        <Button type="submit" variant="portal" className="w-full">
          Continue
        </Button>

        <div className="flex items-center justify-center gap-2">
          <p className="text-body-md whitespace-nowrap text-portal-muted">
            Need an account?
          </p>
          <Button variant="portalLink" className="text-body-sm" onClick={onApply}>
            Apply as Creator
          </Button>
        </div>
      </form>
    </PortalLayout>
  );
}
