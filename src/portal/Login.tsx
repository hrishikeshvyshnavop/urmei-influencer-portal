import { useState } from "react";
import Button from "./components/Button";
import EmailField from "./components/EmailField";
import PortalLayout from "./components/PortalLayout";

type LoginProps = {
  onForgotPassword: () => void;
  onApply: () => void;
};

export default function Login({ onForgotPassword, onApply }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.trim().length > 0 && password.length > 0;

  return (
    <PortalLayout>
      <form
        className="flex w-full max-w-[500px] flex-col items-start gap-6"
        onSubmit={(event) => event.preventDefault()}
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
            />
            <EmailField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
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
            <Button type="submit" variant="portalBlock" disabled={!canSubmit}>
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
