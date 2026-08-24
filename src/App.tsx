import { useSyncExternalStore } from "react";
import ApplyInfluencer from "./portal/ApplyInfluencer";
import ApplyLanding from "./portal/ApplyLanding";
import ApplySuccess from "./portal/ApplySuccess";
import CheckInbox from "./portal/CheckInbox";
import ForgotPassword from "./portal/ForgotPassword";
import Login from "./portal/Login";
import SetPassword, { resetPasswordCopy } from "./portal/SetPassword";

// This project has no router, so the portal screens are selected by hash.
// The Samara marketing page still lives in `./Landing`.
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function navigate(hash: string) {
  window.location.hash = hash;
  window.scrollTo(0, 0);
}

const toLogin = () => navigate("#/login");

export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);

  switch (hash) {
    // Request flow
    case "#/apply":
      return (
        <ApplyLanding
          onApply={() => navigate("#/apply/form")}
          onLogin={toLogin}
        />
      );
    case "#/apply/form":
      return (
        <ApplyInfluencer
          onBack={() => navigate("#/apply")}
          onSubmit={() => navigate("#/apply/success")}
        />
      );
    case "#/apply/success":
      return <ApplySuccess onBackToLogin={toLogin} />;

    // Registration
    case "#/set-password":
      return <SetPassword onLogIn={toLogin} />;

    // Password reset
    case "#/forgot-password":
      return (
        <ForgotPassword
          onSendResetLink={() => navigate("#/check-inbox")}
          onBackToLogIn={toLogin}
        />
      );
    case "#/check-inbox":
      return <CheckInbox onReturnToLogIn={toLogin} />;
    case "#/reset-password":
      return <SetPassword copy={resetPasswordCopy} onLogIn={toLogin} />;

    default:
      return (
        <Login
          onForgotPassword={() => navigate("#/forgot-password")}
          onApply={() => navigate("#/apply")}
        />
      );
  }
}
