import Button from "./components/Button";

export const CREATOR_APPROVAL_KEY = "urmei.creator-approval";

export default function ApprovalPreview({
  onApproved,
}: {
  onApproved: () => void;
}) {
  const approve = () => {
    try {
      window.localStorage.setItem(
        CREATOR_APPROVAL_KEY,
        JSON.stringify({ status: "approved", approvedAt: Date.now() }),
      );
    } catch {
      // Storage is optional for this local preview.
    }
    onApproved();
  };

  return (
    <main className="motion-page flex min-h-screen items-center justify-center bg-portal-surface px-6 py-12">
      <div className="flex w-full max-w-[480px] flex-col gap-6 rounded-[10px] border border-portal-border bg-white p-8 shadow-[0_8px_30px_rgba(34,34,34,0.08)]">
        <div className="flex flex-col gap-2">
          <p className="track-section text-body-xs font-medium uppercase text-portal-muted">
            Creator approval preview
          </p>
          <h1 className="text-body-xxl text-portal-text">Review complete</h1>
          <p className="text-body-md text-portal-muted">
            Simulate the URMEI team approving Charlotte&#39;s creator application.
            This will open the approval email preview.
          </p>
        </div>
        <Button variant="portalLg" onClick={approve}>
          Approve creator
        </Button>
      </div>
    </main>
  );
}
