import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
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
import ApprovalPreview from "./portal/ApprovalPreview";
import ApprovalEmail from "./portal/ApprovalEmail";
import { clearSetupRequired, markSetupRequired } from "./portal/setup-status";
import HelpCenter from "./portal/HelpCenter";
import RecentActivitiesPage from "./portal/RecentActivitiesPage";
import ManageAccount from "./portal/ManageAccount";
import ShopExperience from "./shop/App";

// This project has no router, so the portal screens are selected by hash.
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function navigate(hash: string) {
  window.location.hash = hash;
  window.scrollTo(0, 0);
}

function openFlowWindow(hash: string, name: string) {
  const popupUrl = new URL(window.location.href);
  popupUrl.hash = hash;
  const width = 680;
  const height = 760;
  const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
  const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
  const popup = window.open(
    popupUrl,
    name,
    `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes`,
  );

  if (popup) popup.focus();
  else navigate(hash);
}

function continueInOpener(hash: string) {
  if (window.opener && !window.opener.closed) {
    window.opener.location.hash = hash;
    window.opener.focus();
    window.setTimeout(() => window.close(), 350);
    return;
  }
  navigate(hash);
}

const toLogin = () => navigate("#/login");
const toHome = () => navigate("#/home");
const skipSetup = () => {
  markSetupRequired();
  toHome();
};
const finishSetup = () => {
  clearSetupRequired();
  toHome();
};

/** Separates the empty first-arrival Home from the returning creator view. */
const HOME_VISITED_KEY = "urmei.home-visited";
const TOUR_AFTER_LOGIN_KEY = "urmei.tour-after-login";

function hasVisitedHome() {
  try {
    return window.localStorage.getItem(HOME_VISITED_KEY) === "1";
  } catch {
    return false;
  }
}

function consumeTourAfterLogin() {
  try {
    const shouldShow = window.sessionStorage.getItem(TOUR_AFTER_LOGIN_KEY) === "1";
    if (shouldShow) window.sessionStorage.removeItem(TOUR_AFTER_LOGIN_KEY);
    return shouldShow;
  } catch {
    return false;
  }
}

/**
 * The first arrival uses the empty Home state from Figma. The product tour is
 * opened explicitly from the profile menu; `#/home/tour` remains linkable.
 */
function HomeScreen({ forceTour = false }: { forceTour?: boolean }) {
  const [showTour, setShowTour] = useState(
    () => forceTour || consumeTourAfterLogin(),
  );
  const [firstVisit] = useState(() => !hasVisitedHome());

  useEffect(() => {
    try {
      window.localStorage.setItem(HOME_VISITED_KEY, "1");
    } catch {
      // Storage is optional; the first-arrival view is still fully usable.
    }
  }, []);

  const dismiss = () => {
    setShowTour(false);
    if (forceTour) navigate("#/home");
  };

  const finishTour = () => {
    setShowTour(false);
    navigate("#/shop");
  };

  return (
    <>
      <Home firstVisit={firstVisit} onShowTour={() => setShowTour(true)} />
      {showTour ? <ProductTour onClose={dismiss} onFinish={finishTour} /> : null}
    </>
  );
}

function screenFor(
  hash: string,
  resetEmail: string,
  setResetEmail: (email: string) => void,
) {
  if (hash.startsWith("#/shop/search/")) {
    return <ShopExperience initialSearch={decodeURIComponent(hash.slice("#/shop/search/".length))} />;
  }
  if (hash.startsWith("#/shop/add/")) {
    return <ShopExperience initialAddProductId={decodeURIComponent(hash.slice("#/shop/add/".length))} />;
  }
  if (hash.startsWith("#/shop/product/")) {
    return <ShopExperience initialProductId={decodeURIComponent(hash.slice("#/shop/product/".length))} />;
  }

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
      return (
        <ApplySuccess
          onBackToLogin={toLogin}
          onPreviewApproval={() => openFlowWindow("#/approval-preview", "urmei-application-review")}
        />
      );
    case "#/approval-preview":
      return (
        <ApprovalPreview onApproved={() => navigate("#/approval-email")} />
      );
    case "#/approval-email":
      return (
        <ApprovalEmail
          email="charlotte.tan@email.com"
          onOpenPortal={() => continueInOpener("#/set-password")}
        />
      );

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
          onSkip={toHome}
        />
      );

    // Identity verification + payment connection are one accordion screen.
    // Outcomes decided by the verification/payment partner get their own routes
    // so they are reachable without a backend; the client-side transitions
    // (start -> pending -> restart, and step 1 -> step 2) work for real.
    case "#/verify":
      return <Onboarding onFinish={finishSetup} onSkip={skipSetup} />;
    case "#/verify/partner":
      return <VerificationPartner />;
    case "#/verify/failed":
      return (
        <Onboarding identityStatus="failed" onFinish={finishSetup} onSkip={skipSetup} />
      );
    case "#/verify/verified":
      return (
        <Onboarding
          identityStatus="complete"
          onFinish={finishSetup}
          onSkip={skipSetup}
        />
      );
    case "#/payment":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="idle"
          onFinish={finishSetup}
          onSkip={skipSetup}
        />
      );
    case "#/payment/pending":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="pending"
          onFinish={finishSetup}
          onSkip={skipSetup}
        />
      );
    case "#/payment/failed":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="failed"
          onFinish={finishSetup}
          onSkip={skipSetup}
        />
      );
    case "#/payment/complete":
      return (
        <Onboarding
          identityStatus="complete"
          paymentStatus="complete"
          onFinish={finishSetup}
          onSkip={skipSetup}
        />
      );
    case "#/payment/partner":
      return <PaymentPartner />;
    case "#/home":
      return <HomeScreen />;
    case "#/home/tour":
      return <HomeScreen forceTour />;
    case "#/help-center":
      return <HelpCenter />;
    case "#/recent-activities":
      return <RecentActivitiesPage />;
    case "#/manage-account":
      return <ManageAccount />;
    case "#/manage-account/identity":
      return <ManageAccount initialSection="Identity" />;
    case "#/manage-account/payouts":
      return <ManageAccount initialSection="Payouts" />;
    case "#/shop":
      return <ShopExperience />;
    case "#/shop/browse":
      return <ShopExperience initialBrowse />;

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
          onOpenEmail={() => {
            try {
              window.localStorage.setItem("urmei.reset-email", resetEmail);
            } catch {
              // The popup still opens with the prototype fallback address.
            }
            openFlowWindow("#/reset-email", "urmei-password-reset-email");
          }}
          onReturnToLogIn={toLogin}
        />
      );
    case "#/reset-email":
      return (
        <ResetEmail
          email={resetEmail}
          onResetPassword={() => continueInOpener("#/reset-password")}
        />
      );
    case "#/reset-password":
      return <SetPassword copy={resetPasswordCopy} onLogIn={toLogin} />;

    case "#/login":
      return (
        <Login
          onLogIn={() => {
            try {
              window.sessionStorage.setItem(TOUR_AFTER_LOGIN_KEY, "1");
            } catch {
              // The login and onboarding flow still works without storage.
            }
            navigate("#/profile/username");
          }}
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
  const [resetEmail, setResetEmail] = useState(() => {
    try {
      return window.localStorage.getItem("urmei.reset-email") ?? "reset@example.com";
    } catch {
      return "reset@example.com";
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

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
