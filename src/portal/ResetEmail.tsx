import Button from "./components/Button";

export default function ResetEmail({
  email,
  onResetPassword,
}: {
  email: string;
  onResetPassword: () => void;
}) {
  return (
    <main className="min-h-screen bg-portal-surface px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[10px] border border-solid border-portal-border bg-portal-light shadow-[0_8px_30px_rgba(34,34,34,0.08)]">
        <div className="border-b border-solid border-portal-border px-6 py-4 text-body-sm text-portal-muted">
          <p><span className="font-medium text-portal-text">From:</span> URMEI &lt;notifications@urmei.example&gt;</p>
          <p><span className="font-medium text-portal-text">To:</span> {email}</p>
          <p><span className="font-medium text-portal-text">Subject:</span> Reset your URMEI password</p>
        </div>

        <div className="flex flex-col items-start gap-6 px-6 py-8 sm:px-10">
          <img
            src="/urmei/footer-wordmark.svg"
            alt="URMEI"
            className="h-4 w-auto"
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-body-xxl text-portal-text">Reset your password</h1>
            <p className="text-body-md text-portal-muted">
              We received a request to reset the password for your URMEI account.
              Use the button below to choose a new password.
            </p>
          </div>
          <Button variant="portalLg" onClick={onResetPassword}>
            Reset password
          </Button>
          <p className="text-body-xs text-portal-muted">
            This preview link expires in 24 hours. If you did not request a password
            reset, you can safely ignore this email.
          </p>
        </div>
      </div>
    </main>
  );
}
