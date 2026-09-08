import { useState } from "react";
import { PAYMENT_MESSAGE_TYPE, saveBankAccount } from "./bank-account";
import Button from "./components/Button";

/**
 * The provider's own form is out of scope for the prototype, so a connection
 * made here lands the demo account Manage Account's bank card reads back —
 * a record with no fields at all would read as "not added" there.
 */
const DEMO_ACCOUNT = {
  accountHolderName: "Charlotte Wong",
  bankName: "DBS Bank",
  bankAccountNumber: "001-234567-8",
  bankCode: "7171",
  accountHolderType: "Individual",
  accountType: "Savings",
  payoutCurrency: "SGD - Singapore Dollar",
};

export default function PaymentPartner() {
  const [complete, setComplete] = useState(false);

  const connect = () => {
    saveBankAccount(DEMO_ACCOUNT);
    setComplete(true);
    window.opener?.postMessage(
      { type: PAYMENT_MESSAGE_TYPE, status: "complete" },
      window.location.origin,
    );
    window.opener?.focus();
    window.setTimeout(() => window.close(), 350);
  };

  return (
    <main className="motion-page flex min-h-screen items-center justify-center bg-portal-surface px-6 py-12">
      <section className="flex w-full max-w-[420px] flex-col items-start gap-6 rounded-[10px] border border-portal-border bg-white p-8 shadow-sm">
        <img src="/urmei/hitpay-logo.png" alt="HitPay" className="h-6 w-auto" />
        <div className="flex flex-col gap-2">
          <p className="track-section text-body-xs font-medium uppercase text-portal-muted">Payment provider preview</p>
          <h1 className="text-body-xxl text-portal-text">{complete ? "Payment connected" : "Connect your payout account"}</h1>
          <p className="text-body-sm text-portal-muted">{complete ? "Your connection result was sent to URMEI. This window will close automatically." : "This is a prototype. No bank details or payments will be processed."}</p>
        </div>
        {complete ? <Button variant="portalOutlineLg" onClick={() => window.close()}>Close window</Button> : <Button variant="portalLg" onClick={connect}>Complete connection</Button>}
      </section>
    </main>
  );
}
