import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import Button from "./components/Button";
import OtpInput, { OTP_LENGTH } from "./components/OtpInput";
import PortalLayout from "./components/PortalLayout";
import TextField from "./components/TextField";
import { hasAccount, saveVerifiedApplyEmail } from "./apply-email";
import { scrollToFirstError } from "@/lib/form-validation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Resend OTP in 55s" (Figma `2660:54060`) — the conventional minute. */
const RESEND_SECONDS = 60;
/** "Too many incorrect attempts. Try again in 10 minutes." (`2660:54371`). */
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 10 * 60 * 1000;
/**
 * Prototype: there is no code to check against, so any six digits verify
 * except this one, which stands in for a wrong code and makes the incorrect
 * (`2660:54268`) and too-many-attempts (`2660:54371`) states reachable.
 */
const WRONG_CODE = "000000";

function ErrorLine({ children }: { children: string }) {
  return (
    <p className="flex w-full items-center gap-1 text-body-xs text-portal-alert" role="alert">
      <Info aria-hidden="true" className="size-3 shrink-0" strokeWidth={1.5} />
      {children}
    </p>
  );
}

type ApplyVerifyEmailProps = {
  onVerified: () => void;
  onLogin: () => void;
};

/**
 * Verify email before applying — the request flow's step between the landing
 * page and the form (Figma `00.2`–`00.5`, `00.9`–`00.13` in `2660:53392`).
 *
 * Like `Login`, both steps live in one component so "Change" returns to a
 * still-filled email field. The verified address is saved for the form, which
 * shows it locked.
 */
export default function ApplyVerifyEmail({ onVerified, onLogin }: ApplyVerifyEmailProps) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");
  // Bumped to remount the boxes empty; see `OtpInput`.
  const [attempt, setAttempt] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [wrongCount, setWrongCount] = useState(0);
  const [codeWrong, setCodeWrong] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  // The address the current code went to: a lockout belongs to it, so
  // "Change" and resubmitting the same email can't clear one.
  const [sentTo, setSentTo] = useState("");

  const trimmed = email.trim();
  const isEmailValid = emailPattern.test(trimmed);
  const emailError = !submitted
    ? undefined
    : !isEmailValid
      ? "Please enter a valid email address"
      : hasAccount(trimmed)
        ? "This email already has an account. Log in instead."
        : undefined;

  const locked = lockedUntil !== null;

  // One countdown per code, restarted by `attempt`.
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

  // The lockout lifts on its own; the creator gets a fresh code and count.
  useEffect(() => {
    if (lockedUntil === null) return;
    const timer = window.setTimeout(() => {
      setLockedUntil(null);
      setWrongCount(0);
      setCodeWrong(false);
      setCode("");
      setSecondsLeft(RESEND_SECONDS);
      setAttempt((count) => count + 1);
    }, Math.max(0, lockedUntil - Date.now()));
    return () => window.clearTimeout(timer);
  }, [lockedUntil]);

  const sendCode = () => {
    setCode("");
    setCodeWrong(false);
    setSecondsLeft(RESEND_SECONDS);
    setAttempt((count) => count + 1);
  };

  if (step === "otp") {
    return (
      <PortalLayout>
        <form
          className="flex w-full max-w-[500px] flex-col items-start gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (locked || code.length < OTP_LENGTH) return;
            if (code === WRONG_CODE) {
              const wrong = wrongCount + 1;
              setWrongCount(wrong);
              if (wrong >= MAX_ATTEMPTS) {
                // The design shows the row emptied under the lockout message.
                setLockedUntil(Date.now() + LOCKOUT_MS);
                setCodeWrong(false);
                setCode("");
                setAttempt((count) => count + 1);
              } else {
                setCodeWrong(true);
              }
              return;
            }
            saveVerifiedApplyEmail(trimmed);
            onVerified();
          }}
        >
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-3">
              <h1 className="w-full text-body-xxl text-portal-text">
                Enter OTP to verify your email
              </h1>
              <div className="flex flex-wrap items-center gap-x-2">
                <p className="text-body-md text-portal-muted">
                  Sent code via email to {trimmed}
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
                onChange={(next) => {
                  setCode(next);
                  setCodeWrong(false);
                }}
                error={codeWrong}
                disabled={locked}
                autoFocus={!locked}
              />
              {locked ? (
                <ErrorLine>Too many incorrect attempts. Try again in 10 minutes.</ErrorLine>
              ) : (
                <>
                  {codeWrong ? <ErrorLine>Incorrect code. Please try again.</ErrorLine> : null}
                  {secondsLeft > 0 ? (
                    <p className="w-full text-body-xs text-portal-muted">
                      Resend OTP in {secondsLeft}s
                    </p>
                  ) : (
                    <p className="w-full text-body-xs text-portal-muted">
                      Didn&#39;t get the code?{" "}
                      <button
                        type="button"
                        onClick={sendCode}
                        className="cursor-pointer text-portal-dark underline"
                      >
                        Resend OTP
                      </button>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="portal"
            disabled={locked || code.length < OTP_LENGTH}
          >
            Verify Email
          </Button>
        </form>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <form
        noValidate
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        className="flex w-full max-w-[500px] flex-col items-center gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          if (!isEmailValid || hasAccount(trimmed)) {
            scrollToFirstError(event.currentTarget);
            return;
          }
          if (trimmed !== sentTo) {
            setSentTo(trimmed);
            setWrongCount(0);
            setLockedUntil(null);
            sendCode();
          } else if (!locked) {
            sendCode();
          }
          setStep("otp");
        }}
      >
        <div className="flex w-full flex-col items-center gap-6">
          <h1 className="w-full text-body-xxl text-portal-text">
            To apply as creators, first verify your email
          </h1>

          <TextField
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(next) => {
              setEmail(next);
              setSubmitted(false);
            }}
            autoComplete="email"
            hint="We'll send a one-time code to this email."
            error={emailError}
          />
        </div>

        <Button
          type="submit"
          variant="portal"
          className="w-full"
          disabled={trimmed.length === 0}
        >
          Continue
        </Button>

        <div className="flex items-center justify-center gap-2">
          <p className="text-body-md whitespace-nowrap text-portal-muted">
            Already have an account?
          </p>
          <Button variant="portalLink" className="text-body-sm" onClick={onLogin}>
            Log In
          </Button>
        </div>
      </form>
    </PortalLayout>
  );
}
