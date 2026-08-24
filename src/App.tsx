import { useSyncExternalStore } from "react";
import ApplyInfluencer from "./portal/ApplyInfluencer";
import ApplyLanding from "./portal/ApplyLanding";
import ApplySuccess from "./portal/ApplySuccess";
import CheckInbox from "./portal/CheckInbox";
import ChooseUsername from "./portal/ChooseUsername";
import ForgotPassword from "./portal/ForgotPassword";
import Login from "./portal/Login";
import ReviewDetails from "./portal/ReviewDetails";
import SetProfilePhoto from "./portal/SetProfilePhoto";
import SetPassword, { resetPasswordCopy } from "./portal/SetPassword";

// This project has no router, so the portal screens are selected by hash.
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

    // Profile setup
    case "#/profile/username":
      return <ChooseUsername onSubmit={() => navigate("#/profile/review")} />;
    case "#/profile/review":
      return <ReviewDetails onContinue={() => navigate("#/profile/photo")} />;
    case "#/profile/photo":
      return (
        <SetProfilePhoto
          onContinue={() => navigate("#/login")}
          onSkip={() => navigate("#/login")}
        />
      );

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
          onApply={() => navigate("#/apply/form")}
        />
      );
  }
}
