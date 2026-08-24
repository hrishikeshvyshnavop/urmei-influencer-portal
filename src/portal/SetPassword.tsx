import { useState } from "react";
import Button from "./components/Button";
import PasswordField from "./components/PasswordField";
import PortalLayout from "./components/PortalLayout";

const requirements = [
  {
    label: "At least 8 characters",
    isMet: (value: string) => value.length >= 8,
  },
  {
    label: "One uppercase letter",
    isMet: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One number or symbol",
    isMet: (value: string) => /[^A-Za-z]/.test(value),
  },
];

function PasswordRequirements({ password }: { password: string }) {
  return (
    <ul className="flex w-full flex-col items-start gap-1">
      {requirements.map(({ label, isMet }) => {
        const met = isMet(password);
        return (
          <li key={label} className="flex items-start gap-1 transition-colors duration-200">
            <span className="flex items-center pt-1">
              <span className="relative size-[11px] shrink-0 overflow-clip">
                <span className="absolute inset-[8.33%]">
                  <span className="absolute inset-[-7.25%]">
                    <img
                      src={
                        met
                          ? "/urmei/icon-check-circle.svg"
                          : "/urmei/icon-circle.svg"
                      }
                      alt=""
                      className={`block size-full max-w-none transition-transform duration-200 ${met ? "scale-110" : "scale-100"}`}
                    />
                  </span>
                </span>
              </span>
            </span>
            <span
              className={`text-body-xs whitespace-nowrap ${
                met ? "text-portal-success" : "text-portal-subtle"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export type SetPasswordCopy = {
  title: string;
  subtitle: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
};

/** Copy for the first-time "set your password" screen (Registration flow). */
export const setPasswordCopy: SetPasswordCopy = {
  title: "Set your password",
  subtitle: "Create a secure password to access your URMEI seller account",
  submitLabel: "Set password & continue",
  successTitle: "Password set successfully",
  successBody:
    "Your password has been set successfully. You can now log in to continue your setup.",
};

/** Copy for the "create new password" screen (Password Reset flow). */
export const resetPasswordCopy: SetPasswordCopy = {
  title: "Create new password",
  subtitle: "Create a strong new password to secure your account.",
  submitLabel: "Reset Password",
  successTitle: "Password reset successfully",
  successBody:
    "Your password has been updated. You can now log in with your new password.",
};

function SuccessContent({
  copy,
  onLogIn,
}: {
  copy: SetPasswordCopy;
  onLogIn: () => void;
}) {
  return (
    <div className="motion-page flex w-full max-w-[600px] flex-col items-start justify-center gap-[14px]">
      <div className="flex w-full flex-col items-start justify-center gap-[6px]">
        <div className="flex size-[48px] flex-col items-center justify-center">
          <span className="relative size-[40px] shrink-0 overflow-clip">
            <span className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
              <span className="absolute inset-[-3.63%_-2.49%]">
                <img
                  src="/urmei/icon-check.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </span>
        </div>
        <h1 className="w-full text-h3 uppercase text-portal-text">
          {copy.successTitle}
        </h1>
        <p className="w-full text-body-sm text-portal-muted">{copy.successBody}</p>
      </div>
      <Button variant="portal" onClick={onLogIn}>
        Log In
      </Button>
    </div>
  );
}

type SetPasswordProps = {
  copy?: SetPasswordCopy;
  onLogIn: () => void;
};

export default function SetPassword({
  copy = setPasswordCopy,
  onLogIn,
}: SetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const meetsRequirements = requirements.every(({ isMet }) => isMet(password));
  const isMismatch = confirmPassword.length > 0 && confirmPassword !== password;
  const canSubmit =
    meetsRequirements && confirmPassword.length > 0 && !isMismatch;

  return (
    <PortalLayout>
      {isComplete ? (
        <SuccessContent copy={copy} onLogIn={onLogIn} />
      ) : (
        <form
          className="flex w-full max-w-[500px] flex-col items-start gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            setIsComplete(true);
          }}
        >
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex w-full flex-col items-start gap-[6px]">
              <h1 className="w-full text-body-xxl text-portal-text">
                {copy.title}
              </h1>
              <p className="w-full text-body-md text-portal-muted">
                {copy.subtitle}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-6">
              <PasswordField
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={setPassword}
              />
              <PasswordRequirements password={password} />
              <PasswordField
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={
                  isMismatch
                    ? "Those passwords didn't match, Try again"
                    : undefined
                }
              />
            </div>

            <Button type="submit" variant="portal" disabled={!canSubmit}>
              {copy.submitLabel}
            </Button>
          </div>
        </form>
      )}
    </PortalLayout>
  );
}
