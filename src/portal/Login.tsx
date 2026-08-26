import { useState } from "react";
import Button from "./components/Button";
import EmailField from "./components/EmailField";
import PortalLayout from "./components/PortalLayout";
import { scrollToFirstError } from "@/lib/form-validation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginProps = {
  onLogIn: () => void;
  onForgotPassword: () => void;
  onApply: () => void;
};

export default function Login({
  onLogIn,
  onForgotPassword,
  onApply,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const isEmailValid = emailPattern.test(email.trim());
  const canSubmit = isEmailValid && password.length > 0;

  const emailError =
    showErrors && email.trim().length === 0
      ? "Email is required."
      : email.trim().length > 0 && !isEmailValid
        ? "Please enter a valid email address"
        : undefined;
  const passwordError =
    showErrors && password.length === 0 ? "Password is required." : undefined;

  return (
    <PortalLayout>
      <form
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        className="flex w-full max-w-[500px] flex-col items-start gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          setShowErrors(true);
          if (!canSubmit) {
            scrollToFirstError(event.currentTarget);
            return;
          }
          onLogIn();
        }}
      >
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-start gap-[6px]">
            <p className="w-full text-body-md text-portal-muted">Welcome back!</p>
            <h1 className="w-full text-body-xxl text-portal-text">
              Log in to your account
            </h1>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-4">
            <EmailField
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              error={emailError}
            />
            <EmailField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              error={passwordError}
              trailing={
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="cursor-pointer text-body-sm font-medium whitespace-nowrap text-portal-subtle"
                >
                  Forgot password?
                </button>
              }
            />
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <Button type="submit" variant="portalBlock">
              Log In
            </Button>

            <div className="flex w-full items-center justify-center gap-2">
              <p className="text-body-md whitespace-nowrap text-portal-body">
                Become a influencer?
              </p>
              <Button variant="portalLink" onClick={onApply}>
                Apply as influencer
              </Button>
            </div>
          </div>
        </div>
      </form>
    </PortalLayout>
  );
}
