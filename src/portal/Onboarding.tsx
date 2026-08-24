import { useEffect, useState } from "react";
import Button from "./components/Button";
import PortalLayout from "./components/PortalLayout";
import {
  Icon16,
  StatusHeader,
  Step,
  StepCard,
} from "./components/StepAccordion";
import type { StepStatus } from "./components/StepAccordion";
import { VERIFICATION_STORAGE_KEY } from "./VerificationPartner";
import { PAYMENT_STORAGE_KEY } from "./PaymentPartner";

const requirements = [
  {
    icon: "id-card",
    inset: "inset-[20.83%_8.33%]",
    label: "Government-issued photo ID",
  },
  {
    icon: "camera",
    inset: "inset-[16.67%_8.33%]",
    label: "Camera-enabled device",
  },
  {
    icon: "shield-check",
    inset: "inset-[8.33%_16.67%]",
    label: "Personal details matching your account",
  },
];

const payoutFacts = [
  ["You'll set up", "Payout bank details"],
  ["Payout currency", "Based on your primary market"],
  ["Platform fees", "None — payouts are free"],
];

const accountDetails = [
  ["Account Name", "Sophia Parker"],
  ["Currency", "SGD (Singapore Dollar)"],
  ["Account Number", "•••• •••• 4829"],
  ["Payment Provider", "HitPay"],
];

function ProviderCard() {
  return (
    <div className="relative flex w-full shrink-0 flex-col items-start gap-3 overflow-hidden rounded-[10px] p-4">
      <img
        src="/urmei/provider-card.png"
        alt=""
        className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[10px] object-cover"
      />
      <img
        src="/urmei/hitpay-logo.png"
        alt="HitPay"
        className="relative h-[24px] w-[96.716px] shrink-0 object-cover"
      />
      <p className="relative w-full text-body-sm text-portal-muted opacity-80">
        Get your earnings deposited straight into your bank account for easy
        access.
      </p>
    </div>
  );
}

function FactRows({ rows, gap }: { rows: string[][]; gap: string }) {
  return (
    <div className={`flex w-full flex-col items-start ${gap} text-body-sm`}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex w-full items-center justify-between">
          <p className="shrink-0 whitespace-nowrap text-portal-muted">{label}</p>
          <p className="shrink-0 whitespace-nowrap text-portal-text">{value}</p>
        </div>
      ))}
    </div>
  );
}

type OnboardingProps = {
  identityStatus?: StepStatus;
  paymentStatus?: StepStatus;
  onFinish: () => void;
  onSkip: () => void;
};

export default function Onboarding({
  identityStatus = "idle",
  paymentStatus = "locked",
  onFinish,
  onSkip,
}: OnboardingProps) {
  const [identity, setIdentity] = useState<StepStatus>(identityStatus);
  const [payment, setPayment] = useState<StepStatus>(paymentStatus);
  const [open, setOpen] = useState<1 | 2 | null>(
    identityStatus === "complete" ? 2 : 1,
  );
  useEffect(() => {
    const receiveVerification = (event: StorageEvent) => {
      if (event.key !== VERIFICATION_STORAGE_KEY || !event.newValue) return;

      try {
        const result = JSON.parse(event.newValue) as { status?: string };
        if (result.status === "complete") {
          setIdentity("complete");
          setOpen(1);
        }
      } catch {
        // Ignore malformed prototype messages from local storage.
      }
    };

    window.addEventListener("storage", receiveVerification);
    return () => window.removeEventListener("storage", receiveVerification);
  }, []);

  useEffect(() => {
    const receivePayment = (event: StorageEvent) => {
      if (event.key !== PAYMENT_STORAGE_KEY || !event.newValue) return;
      try {
        const result = JSON.parse(event.newValue) as { status?: string };
        if (result.status === "complete") {
          setPayment("complete");
          setOpen(2);
        }
      } catch {
        // Ignore malformed prototype messages from local storage.
      }
    };
    window.addEventListener("storage", receivePayment);
    return () => window.removeEventListener("storage", receivePayment);
  }, []);

  const allDone = identity === "complete" && payment === "complete";

  const toggle = (step: 1 | 2) => setOpen((current) => (current === step ? null : step));

  const connectPayment = () => {
    setPayment("pending");
    setOpen(2);
    const partnerUrl = new URL(window.location.href);
    partnerUrl.hash = "#/payment/partner";
    window.open(partnerUrl, "urmei-payment-partner");
  };

  const restartPayment = () => {
    setPayment("idle");
  };

  const startVerification = () => {
    setIdentity("pending");
    const partnerUrl = new URL(window.location.href);
    partnerUrl.hash = "#/verify/partner";
    window.open(partnerUrl, "urmei-verification-partner");
  };

  if (allDone) {
    return (
      <PortalLayout>
        <div className="motion-feedback flex w-full max-w-[375px] flex-col items-start justify-center gap-[14px]">
          <div className="flex w-full flex-col items-start justify-center gap-[6px]">
            <div className="flex size-[48px] items-center justify-center">
              <span className="motion-success-tick relative block size-[40px] shrink-0 overflow-hidden">
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
              You&#39;re all set!
            </h1>
            <p className="w-full text-body-sm text-portal-muted">
              Your identity has been verified and your payment account is
              connected. You&#39;re ready to start earning with URMEI.
            </p>
          </div>

          <Button
            variant="portalOutlineLg"
            className="bg-portal-light"
            onClick={onFinish}
          >
            Continue
          </Button>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout
      headerAction={
        <Button variant="portalOutlineLg" className="w-[60px]" onClick={onSkip}>
          Skip
        </Button>
      }
    >
      <div className="flex w-full max-w-[500px] flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start gap-[6px]">
            <h1 className="w-full text-body-xxl text-portal-text">
              You&#39;re nearly there!
            </h1>
            <p className="w-full text-body-md text-portal-muted">
              Complete these steps to verify your identity and set up payouts
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <Step
            index={1}
            title="Identity verification"
            status={identity}
            badge="Completed"
            expanded={open === 1}
            onToggle={() => toggle(1)}
          >
            {identity === "idle" ? (
              <StepCard>
                <div className="flex w-full flex-col items-start gap-2">
                  <p className="text-body-md font-medium whitespace-nowrap text-portal-text">
                    You&#39;ll need the following
                  </p>
                  <div className="flex w-full flex-col items-start gap-1">
                    {requirements.map((requirement) => (
                      <div
                        key={requirement.icon}
                        className="flex w-full items-center gap-2"
                      >
                        <Icon16
                          src={`/urmei/icon-${requirement.icon}.svg`}
                          inset={requirement.inset}
                        />
                        <p className="min-w-px flex-1 text-body-sm text-portal-subtle">
                          {requirement.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="portal"
                      onClick={startVerification}
                    >
                      Start secure verification
                    </Button>
                    <p className="text-body-xs whitespace-nowrap text-portal-muted">
                      Usually takes 3-5 minutes
                    </p>
                  </div>
                </div>
                <p className="w-full text-body-xs text-portal-muted opacity-80">
                  Your documents are processed securely by our verification
                  partner. URMEI only receives the verification result and
                  required identity data.
                </p>
              </StepCard>
            ) : null}

            {identity === "pending" ? (
              <StepCard>
                <div className="flex w-full flex-col items-start gap-3">
                  <StatusHeader
                    well="bg-portal-info-bg"
                    icon="/urmei/icon-circle-dashed.svg"
                    inset="inset-[8.33%]"
                    heading="Verification in progress"
                  />
                  <p className="w-full text-body-sm text-portal-muted">
                    You&#39;re completing verification in another window. This
                    page will update automatically once your identity is
                    confirmed.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <Button variant="portalOutline" onClick={startVerification}>
                    Return to Verification Window
                  </Button>
                  <p className="w-full text-body-sm text-portal-muted">
                    Having trouble?{" "}
                    <button
                      type="button"
                      onClick={() => setIdentity("idle")}
                      className="cursor-pointer underline"
                    >
                      Restart verification
                    </button>
                  </p>
                </div>
              </StepCard>
            ) : null}

            {identity === "failed" ? (
              <StepCard>
                <div className="flex w-full flex-col items-start gap-3">
                  <StatusHeader
                    well="bg-portal-warn-bg"
                    icon="/urmei/icon-triangle-alert.svg"
                    inset="inset-[12.44%_8.34%_12.5%_8.26%]"
                    heading="Something went wrong"
                  />
                  <p className="w-full text-body-md text-portal-muted">
                    We couldn&#39;t verify your identity. This may be due to
                    unclear photos or mismatched information. Please try again.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start">
                  <Button
                    variant="portal"
                    onClick={startVerification}
                  >
                    Retry Verification
                  </Button>
                </div>
              </StepCard>
            ) : null}

            {identity === "complete" ? (
              <StepCard>
                <div className="flex w-full flex-col items-start gap-3">
                  <StatusHeader
                    well="bg-portal-ok-bg"
                    icon="/urmei/icon-shield-check-success.svg"
                    inset="inset-[8.33%_16.67%]"
                    bleed="inset-[-4.99%_-6.23%]"
                    heading="Identity verified"
                  />
                  <p className="w-full text-body-md text-portal-muted">
                    {payment === "locked"
                      ? "Your identity has been successfully verified. You can now proceed to connect your payment method."
                      : "Your identity has been successfully verified."}
                  </p>
                </div>
                {payment === "locked" ? (
                  <div className="flex w-full flex-col items-start">
                    <Button
                      variant="portal"
                      onClick={() => {
                        setPayment("idle");
                        setOpen(2);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                ) : null}
              </StepCard>
            ) : null}
          </Step>

          <Step
            index={2}
            title="Connect your payment"
            status={payment}
            badge="Connected"
            expanded={open === 2 && payment !== "locked"}
            onToggle={() => payment !== "locked" && toggle(2)}
          >
            {payment === "idle" ? (
              <StepCard>
                <ProviderCard />
                <FactRows rows={payoutFacts} gap="gap-[10px]" />
                <div className="flex w-full flex-col items-start gap-2">
                  <Button
                    variant="portal"
                    onClick={connectPayment}
                  >
                    Connect With HitPay
                  </Button>
                  <p className="w-full text-body-xs text-portal-muted opacity-80">
                    You&#39;ll be redirected to HitPay to complete setup.
                  </p>
                </div>
              </StepCard>
            ) : null}

            {payment === "pending" ? (
              <StepCard>
                <ProviderCard />
                <div className="flex w-full flex-col items-start gap-1">
                  <StatusHeader
                    well="bg-portal-info-bg"
                    icon="/urmei/icon-circle-dashed.svg"
                    inset="inset-[8.33%]"
                    heading="Waiting for HitPay connection"
                  />
                  <p className="w-full text-body-sm text-portal-muted">
                    Complete your setup in the HitPay window. Once done, return
                    here to confirm the connection.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start gap-3">
                  <Button variant="portalOutline" onClick={connectPayment}>
                    Reopen HitPay
                  </Button>
                  <p className="w-full text-body-sm text-portal-muted">
                    Having trouble?{" "}
                    <button
                      type="button"
                      onClick={restartPayment}
                      className="cursor-pointer underline"
                    >
                      Restart connection
                    </button>
                  </p>
                </div>
              </StepCard>
            ) : null}

            {payment === "failed" ? (
              <StepCard>
                <div className="flex w-full flex-col items-start gap-3">
                  <StatusHeader
                    well="bg-portal-warn-bg"
                    icon="/urmei/icon-triangle-alert.svg"
                    inset="inset-[12.44%_8.34%_12.5%_8.26%]"
                    heading="Something went wrong"
                  />
                  <p className="w-full text-body-md text-portal-muted">
                    We couldn&#39;t connect your payment account. This may be due
                    to incorrect bank details or a temporary issue with HitPay.
                    Please try again.
                  </p>
                </div>
                <div className="flex w-full flex-col items-start">
                  <Button variant="portal" onClick={connectPayment}>
                    Retry Connection
                  </Button>
                </div>
              </StepCard>
            ) : null}

            {payment === "complete" ? (
              <StepCard>
                <ProviderCard />
                <div className="flex w-full flex-col items-start gap-1">
                  <StatusHeader
                    well="bg-portal-ok-bg"
                    icon="/urmei/icon-landmark.svg"
                    inset="inset-[8.32%_12.39%]"
                    heading="Payment connection completed"
                  />
                  <p className="w-full text-body-sm text-portal-muted">
                    Your account is now successfully connected and ready for
                    payouts.
                  </p>
                </div>
                <FactRows rows={accountDetails} gap="gap-3" />
              </StepCard>
            ) : null}
          </Step>
        </div>

      </div>
    </PortalLayout>
  );
}
