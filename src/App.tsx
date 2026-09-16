import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import ApplyCreator from "./portal/ApplyCreator";
import ApplyLanding from "./portal/ApplyLanding";
import ApplySuccess from "./portal/ApplySuccess";
import BankDetails from "./portal/BankDetails";
import FinishProfile from "./portal/FinishProfile";
import Login from "./portal/Login";
import ReviewDetails from "./portal/ReviewDetails";
import SetProfilePhoto from "./portal/SetProfilePhoto";
import ShippingAddress from "./portal/ShippingAddress";
import Onboarding from "./portal/Onboarding";
import VerificationPartner from "./portal/VerificationPartner";
import Home from "./portal/Home";
import ProductTour from "./portal/components/ProductTour";
import PaymentPartner from "./portal/PaymentPartner";
import ApprovalPreview from "./portal/ApprovalPreview";
import ApprovalEmail from "./portal/ApprovalEmail";
import { clearSetupRequired, markSetupRequired } from "./portal/setup-status";
import { subscribeToTourRequests, requestProductTour } from "./portal/tour-status";
import HelpCenter from "./portal/HelpCenter";
import Brands from "./portal/Brands";
import RecentActivitiesPage from "./portal/RecentActivitiesPage";
import SampleRequests from "./portal/SampleRequests";
import SampleOrderSummary from "./portal/SampleOrderSummary";
import ManageAccount from "./portal/ManageAccount";
import ShopExperience from "./shop/App";
import { ProductStats } from "./shop/screens/ProductStats";
import { StatBreakdown } from "./shop/screens/StatBreakdown";
import { metricFromSlug, parseStatsOrigin } from "./shop/data/stats";
import { StandaloneStorefront } from "./shop/screens/StandaloneStorefront";

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
 * The first arrival uses the empty Home state from Figma. The product tour
 * (`ProductTour`, rendered once at the `App` level below) is a full-screen
 * overlay reachable from any screen's profile menu, not something tied to
 * Home — `#/home/tour` remains linkable as a direct way to trigger it.
 */
/** Beat before the tour fades in after profile setup, so it reads as a
 *  deliberate welcome rather than popping in over Home's own entrance —
 *  long enough that Home's own content has settled and painted first. */
const TOUR_AFTER_LOGIN_DELAY_MS = 900;

function HomeScreen({ forceTour = false }: { forceTour?: boolean }) {
  const [pendingTourAfterLogin] = useState(
    () => !forceTour && consumeTourAfterLogin(),
  );
  const [firstVisit] = useState(() => !hasVisitedHome());

  useEffect(() => {
    try {
      window.localStorage.setItem(HOME_VISITED_KEY, "1");
    } catch {
      // Storage is optional; the first-arrival view is still fully usable.
    }
  }, []);

  useEffect(() => {
    if (forceTour) {
      requestProductTour();
      return;
    }
    if (!pendingTourAfterLogin) return;
    const timer = window.setTimeout(requestProductTour, TOUR_AFTER_LOGIN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [forceTour, pendingTourAfterLogin]);

  return <Home firstVisit={firstVisit} />;
}

function screenFor(fullHash: string) {
  // The stats pages carry their breadcrumb trail in a `?from=…&via=…` suffix
  // (see `productStatsHash`); every other route ignores it.
  const queryAt = fullHash.indexOf("?");
  const hash = queryAt === -1 ? fullHash : fullHash.slice(0, queryAt);
  const params = new URLSearchParams(queryAt === -1 ? "" : fullHash.slice(queryAt + 1));
  const origin = parseStatsOrigin(params.get("from"));

  // Longest first: `#/shop/stats/product/<id>` also matches the metric prefix.
  if (hash.startsWith("#/shop/stats/product/")) {
    return (
      <ProductStats
        itemId={decodeURIComponent(hash.slice("#/shop/stats/product/".length))}
        origin={origin}
        via={metricFromSlug(params.get("via") ?? "") ?? undefined}
      />
    );
  }
  if (hash.startsWith("#/shop/stats/")) {
    const metric = metricFromSlug(hash.slice("#/shop/stats/".length));
    // An unknown metric falls through to the shop rather than a blank page.
    if (metric) return <StatBreakdown metric={metric} origin={origin} />;
    return <ShopExperience />;
  }
  if (hash.startsWith("#/shop/search/")) {
    return <ShopExperience initialSearch={decodeURIComponent(hash.slice("#/shop/search/".length))} />;
  }
  if (hash.startsWith("#/shop/brand/")) {
    return <ShopExperience initialBrandFilter={decodeURIComponent(hash.slice("#/shop/brand/".length))} />;
  }
  if (hash.startsWith("#/shop/add/")) {
    return <ShopExperience initialAddProductId={decodeURIComponent(hash.slice("#/shop/add/".length))} />;
  }
  if (hash.startsWith("#/shop/product/")) {
    return <ShopExperience initialProductId={decodeURIComponent(hash.slice("#/shop/product/".length))} />;
  }
  if (hash.startsWith("#/samples/")) {
    return <SampleOrderSummary id={decodeURIComponent(hash.slice("#/samples/".length))} />;
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
        <ApplyCreator
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
          onOpenPortal={() => continueInOpener("#/login")}
        />
      );


    // Profile setup — four numbered steps behind an unnumbered review of what
    // the application captured (Figma `1583:87724`). Identity verification is
    // no longer part of it: that happens on the apply form now.
    case "#/profile/review":
      return <ReviewDetails onContinue={() => navigate("#/profile/photo")} />;
    case "#/profile/photo":
      return <SetProfilePhoto onContinue={() => navigate("#/profile/username")} />;
    case "#/profile/username":
      return (
        <FinishProfile
          onSubmit={() => navigate("#/profile/shipping")}
          onBack={() => navigate("#/profile/photo")}
        />
      );
    case "#/profile/shipping":
      return (
        <ShippingAddress
          onAddAddress={() => navigate("#/profile/bank")}
          onBack={() => navigate("#/profile/username")}
          // Skip on step 3 skips the step, not the flow: bank details are
          // what actually unblock publishing, so they still get asked.
          onSkip={() => navigate("#/profile/bank")}
        />
      );
    case "#/profile/bank":
      return (
        <BankDetails
          onAddAccount={finishSetup}
          onBack={() => navigate("#/profile/shipping")}
          onSkip={skipSetup}
        />
      );

    // Identity verification + payment connection are one accordion screen.
    // Outcomes decided by the verification/payment partner get their own routes
    // so they are reachable without a backend; the client-side transitions
    // (start -> pending -> restart, and step 1 -> step 2) work for real.
    // These are no longer part of first-time setup — identity is verified on
    // the apply form and payout details are step 4 — but `ManageAccount`
    // still sends the creator here to re-verify or reconnect.
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
    case "#/brands":
      return <Brands />;
    case "#/recent-activities":
      return <RecentActivitiesPage />;
    case "#/samples":
      return <SampleRequests />;
    case "#/manage-account":
      return <ManageAccount />;
    case "#/manage-account/identity":
      return <ManageAccount initialSection="Profile" />;
    case "#/manage-account/payouts":
      return <ManageAccount initialSection="Payouts" />;
    case "#/shop":
      return <ShopExperience />;
    case "#/shop/browse":
      return <ShopExperience initialBrowse />;
    case "#/shop/view":
      return <StandaloneStorefront />;

    case "#/login":
      return (
        <Login
          onLogIn={() => {
            try {
              window.sessionStorage.setItem(TOUR_AFTER_LOGIN_KEY, "1");
            } catch {
              // The login and onboarding flow still works without storage.
            }
            navigate("#/profile/review");
          }}
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
  // Owned here rather than per-screen so the tour is one overlay that can
  // open on top of whichever page requested it (see `tour-status.ts`)
  // instead of forcing a navigation to Home first.
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  useEffect(() => subscribeToTourRequests(() => setShowTour(true)), []);

  const finishTour = () => {
    setShowTour(false);
    navigate("#/shop");
  };

  return (
    <>
      {/* Keyed by route so each screen remounts on navigation. Without this
          React reuses the instance when two routes render the same component
          (e.g. the shop routes, or the verification states) and their initial
          state never re-runs. */}
      <Fragment key={hash}>
        {screenFor(hash)}
      </Fragment>
      {showTour ? <ProductTour onClose={() => setShowTour(false)} onFinish={finishTour} /> : null}
    </>
  );
}
