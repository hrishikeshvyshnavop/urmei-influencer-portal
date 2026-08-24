import { useState } from "react";
import Button from "./components/Button";
import EmailField from "./components/EmailField";
import PortalLayout from "./components/PortalLayout";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ForgotPasswordProps = {
  onSendResetLink: () => void;
  onBackToLogIn: () => void;
};

export default function ForgotPassword({
  onSendResetLink,
  onBackToLogIn,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");

  const isValid = emailPattern.test(email.trim());
  const showError = email.trim().length > 0 && !isValid;

  return (
    <PortalLayout>
      <form
        className="flex w-full max-w-[500px] flex-col items-start gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          onSendResetLink();
        }}
      >
        <div className="flex w-full flex-col items-start gap-[6px]">
          <h1 className="w-full text-body-xxl text-portal-text">
            Forgot your password?
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Enter your email address and we&#39;ll send you a link to reset your
            password.
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <EmailField
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            error={showError ? "Please enter a valid email address" : undefined}
          />
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <Button type="submit" variant="portalBlock" disabled={!isValid}>
            Send Reset Link
          </Button>
          <Button
            variant="portalGhostLg"
            className="w-full"
            onClick={onBackToLogIn}
          >
            Back to Log In
          </Button>
        </div>
      </form>
    </PortalLayout>
  );
}
