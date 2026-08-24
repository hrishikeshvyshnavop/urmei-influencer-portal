import { useState } from "react";
import Button from "./components/Button";

export const PAYMENT_STORAGE_KEY = "urmei:payment-result";

export default function PaymentPartner() {
  const [complete, setComplete] = useState(false);

  const connect = () => {
    localStorage.setItem(
      PAYMENT_STORAGE_KEY,
      JSON.stringify({ status: "complete", completedAt: Date.now() }),
    );
    setComplete(true);
    window.opener?.focus();
  };

  return (
    <main className="motion-page flex min-h-screen items-center justify-center bg-portal-surface px-6 py-12">
      <section className="flex w-full max-w-[420px] flex-col items-start gap-6 rounded-[10px] border border-portal-border bg-white p-8 shadow-sm">
        <img src="/urmei/hitpay-logo.png" alt="HitPay" className="h-6 w-auto" />
        <div className="flex flex-col gap-2">
          <p className="track-section text-body-xs font-medium uppercase text-portal-muted">Payment provider preview</p>
          <h1 className="text-body-xxl text-portal-text">{complete ? "Payment connected" : "Connect your payout account"}</h1>
          <p className="text-body-sm text-portal-muted">{complete ? "Your connection result was sent to URMEI. You can close this tab." : "This is a prototype. No bank details or payments will be processed."}</p>
        </div>
        {complete ? <Button variant="portalOutlineLg" onClick={() => window.close()}>Close tab</Button> : <Button variant="portalLg" onClick={connect}>Complete connection</Button>}
      </section>
    </main>
  );
}
