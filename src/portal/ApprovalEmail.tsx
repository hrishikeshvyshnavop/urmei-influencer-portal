import Button from "./components/Button";

export default function ApprovalEmail({
  email,
  onOpenPortal,
}: {
  email: string;
  onOpenPortal: () => void;
}) {
  return (
    <main className="min-h-screen bg-portal-surface px-4 py-12 sm:px-6">
      <div className="motion-card mx-auto w-full max-w-[640px] overflow-hidden rounded-[10px] border border-portal-border bg-portal-light shadow-[0_8px_30px_rgba(34,34,34,0.08)]">
        <div className="border-b border-portal-border px-6 py-4 text-body-sm text-portal-muted">
          <p><span className="font-medium text-portal-text">From:</span> URMEI &lt;creators@urmei.example&gt;</p>
          <p><span className="font-medium text-portal-text">To:</span> {email}</p>
          <p><span className="font-medium text-portal-text">Subject:</span> Your URMEI creator application is approved</p>
        </div>
        <div className="flex flex-col items-start gap-6 px-6 py-8 sm:px-10">
          <img src="/urmei/footer-wordmark.svg" alt="URMEI" className="h-4 w-auto" />
          <div className="flex flex-col gap-3">
            <h1 className="text-body-xxl text-portal-text">Welcome to URMEI, Charlotte!</h1>
            <p className="text-body-md text-portal-muted">
              Your creator application has been approved. You can now complete
              your profile, build your shop, and start working with brands.
            </p>
          </div>
          <Button variant="portalLg" onClick={onOpenPortal}>
            Open Creator Portal
          </Button>
          <p className="text-body-xs text-portal-muted">
            This is an approval email preview for the prototype flow.
          </p>
        </div>
      </div>
    </main>
  );
}
