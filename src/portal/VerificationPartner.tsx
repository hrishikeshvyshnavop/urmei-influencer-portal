import { useState } from "react";
import Button from "./components/Button";

export const VERIFICATION_STORAGE_KEY = "urmei:verification-result";

export default function VerificationPartner() {
  const [complete, setComplete] = useState(false);

  const verify = () => {
    localStorage.setItem(
      VERIFICATION_STORAGE_KEY,
      JSON.stringify({ status: "complete", completedAt: Date.now() }),
    );
    setComplete(true);
    window.opener?.focus();
  };

  return (
    <main className="motion-page flex min-h-screen items-center justify-center bg-portal-surface px-6 py-12">
      <section className="flex w-full max-w-[420px] flex-col items-start gap-6 rounded-[10px] border border-portal-border bg-white p-8 shadow-sm">
        <div className="flex w-full flex-col gap-2">
          <p className="text-body-xs font-medium uppercase tracking-[1.6px] text-portal-muted">
            Demo verification provider
          </p>
          <h1 className="text-body-xxl text-portal-text">
            {complete ? "Verification complete" : "Verify your identity"}
          </h1>
          <p className="text-body-sm text-portal-muted">
            {complete
              ? "Your result was sent to URMEI. You can close this tab."
              : "This is a prototype. No documents or personal information will be collected."}
          </p>
        </div>

        {complete ? (
          <Button variant="portalOutlineLg" onClick={() => window.close()}>
            Close tab
          </Button>
        ) : (
          <Button variant="portalLg" onClick={verify}>
            Complete fake verification
          </Button>
        )}
      </section>
    </main>
  );
}
