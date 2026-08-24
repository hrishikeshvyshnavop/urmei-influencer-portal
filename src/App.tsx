import { Fragment, useState, useSyncExternalStore } from "react";
import ApplyInfluencer from "./portal/ApplyInfluencer";
import ApplyLanding from "./portal/ApplyLanding";
import ApplySuccess from "./portal/ApplySuccess";
import CheckInbox from "./portal/CheckInbox";
import ChooseUsername from "./portal/ChooseUsername";
import ForgotPassword from "./portal/ForgotPassword";
import Login from "./portal/Login";
import ReviewDetails from "./portal/ReviewDetails";
import SetProfilePhoto from "./portal/SetProfilePhoto";
import Onboarding from "./portal/Onboarding";
import SetPassword, { resetPasswordCopy } from "./portal/SetPassword";
import VerificationPartner from "./portal/VerificationPartner";
import Home from "./portal/Home";
import ProductTour from "./portal/components/ProductTour";
import PaymentPartner from "./portal/PaymentPartner";
import ResetEmail from "./portal/ResetEmail";

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
const toHome = () => navigate("#/home");

function screenFor(
  hash: string,
  resetEmail: string,
  setResetEmail: (email: string) => void,
) {
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
          onContinue={() => navigate("#/verify")}
          onSkip={() => navigate("#/verify")}
        />
      );

    // Identity verification + payment connection are one accordion screen.
    // Outcomes decided by the verification/payment partner get their own routes
    // so they are reachable without a backend; the client-side transitions
    // (start -> pending -> restart, and step 1 -> step 2) work for real.
    case "#/verify":
      return <Onboarding onFinish={toHome} onSkip={toLogin} />;
    case "#/verify/partner":
      return <VerificationPartner />;
    case "#/verify/failed":
      return (
        <Onboarding identityStatus="failed" onFinish={toHome} onSkip={toLogin} />
      );
    case "#/verify/verified":
      return (
        <Onboarding
          identityStatus="complete"
          onFinish={toHome}
          onSkip={toLogin}
        />
      );
    case "#/payment":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="idle"
          onFinish={toHome}
          onSkip={toLogin}
        />
      );
    case "#/payment/pending":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="pending"
          onFinish={toHome}
          onSkip={toLogin}
        />
      );
    case "#/payment/failed":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="failed"
          onFinish={toHome}
          onSkip={toLogin}
        />
      );
    case "#/payment/complete":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="complete"
          onFinish={toHome}
          onSkip={toLogin}
        />
      );
    case "#/payment/partner":
      return <PaymentPartner />;
    case "#/home":
      return <Home />;
    case "#/home/tour":
      return (
        <>
          <Home />
          <ProductTour
            onClose={() => navigate("#/home")}
            onFinish={() => navigate("#/home")}
          />
        </>
      );

    // Password reset
    case "#/forgot-password":
      return (
        <ForgotPassword
          onSendResetLink={(email) => {
            setResetEmail(email);
            navigate("#/check-inbox");
          }}
          onBackToLogIn={toLogin}
        />
      );
    case "#/check-inbox":
      return (
        <CheckInbox
          email={resetEmail}
          onOpenEmail={() => navigate("#/reset-email")}
          onReturnToLogIn={toLogin}
        />
      );
    case "#/reset-email":
      return (
        <ResetEmail
          email={resetEmail}
          onResetPassword={() => navigate("#/reset-password")}
        />
      );
    case "#/reset-password":
      return <SetPassword copy={resetPasswordCopy} onLogIn={toLogin} />;

    case "#/login":
      return (
        <Login
          onLogIn={() => navigate("#/profile/username")}
          onForgotPassword={() => navigate("#/forgot-password")}
          onApply={() => navigate("#/apply/form")}
        />
      );

    default:
      return (
        <ApplyLanding
          onApply={() => navigate("#/apply/form")}
          onLogin={toLogin}
        />
      );
  }
}

export default function App() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);
  const [resetEmail, setResetEmail] = useState("reset@example.com");

  // Keyed by route so each screen remounts on navigation. Without this React
  // reuses the instance when two routes render the same component (e.g. the
  // verification states, or set-password vs reset-password) and their initial
  // state never re-runs.
  return (
    <Fragment key={hash}>
      {screenFor(hash, resetEmail, setResetEmail)}
    </Fragment>
  );
}
