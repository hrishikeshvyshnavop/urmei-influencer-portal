import { useEffect, useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import AppShell from "./components/AppShell";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";
import ConfirmDialog from "./components/ConfirmDialog";
import WriteReviewModal from "./components/WriteReviewModal";
import ReviewPhotos from "./components/ReviewPhotos";
import { Toast } from "../shop/components/Toast";
import { requestProductTour } from "./tour-status";
import {
  canCancel,
  canReview,
  cancelSampleRequest,
  findSampleRequest,
  formatRequestDate,
  saveSampleReview,
  timelineFor,
  type SampleRequest,
} from "./sample-requests";
import { navigate } from "../router";

/**
 * One sample request's details — Figma `1030:27259` (waiting for approval),
 * `1030:27312` (approved) and `1030:27366` (shipped) are the same page read
 * off the request's status: the step list grows with it, the carrier and
 * tracking block appears only once shipped, and Cancel Request is live until
 * then. Cancelling (`1030:27424`) confirms in a popup, then the page carries a
 * red "You cancelled" callout, the timeline ends on Cancelled and the cancel
 * panel is gone.
 *
 * Once delivered (`1030:30667`) the cancel panel gives way to a "Write a
 * Review" prompt under the timeline; submitting the review dialog swaps the
 * prompt for the review itself and a thank-you toast (`1030:31363`).
 */
export default function SampleRequestDetails({ requestId }: { requestId: string }) {
  const [request, setRequest] = useState(() => findSampleRequest(requestId));
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [writingReview, setWritingReview] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  return (
    <AppShell
      className="bg-portal-light text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { navigate("/help-center"); }}
    >
      <main className="mx-auto flex-1 w-full max-w-[994px] px-6 py-5 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 py-4 text-body-sm">
          <a href="/home" className="shrink-0">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-portal-muted" strokeWidth={1.5} />
          <a href="/sample-requests" className="shrink-0">Sample Requests</a>
          {request ? (
            <>
              <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-portal-muted" strokeWidth={1.5} />
              <span className="truncate text-portal-muted">{request.productName}</span>
            </>
          ) : null}
        </nav>

        {request ? (
          <div className="flex flex-col gap-10 pb-5 lg:flex-row lg:items-start lg:gap-16">
            <section className="flex w-full flex-col gap-4 lg:w-[545px] lg:shrink-0">
              <SectionTitle>Request summary</SectionTitle>
              <ShipmentCard request={request} />
              {request.status === "cancelled" ? <CancelledCallout /> : null}
              <Timeline request={request} />
              {request.review ? (
                <ReviewCard review={request.review} />
              ) : canReview(request) ? (
                <ReviewPrompt onWrite={() => setWritingReview(true)} />
              ) : null}
            </section>

            <aside className="flex w-full flex-col gap-4 lg:w-[385px] lg:shrink-0">
              {/* The message is optional when requesting, so it only shows when written. */}
              {request.message ? (
                <div className="flex flex-col gap-4">
                  <SectionTitle>Your message</SectionTitle>
                  <p className="text-body-sm text-portal-muted">{request.message}</p>
                </div>
              ) : null}
              <div className="flex flex-col gap-4">
                <SectionTitle>Shipping address</SectionTitle>
                <div className="flex flex-col gap-1">
                  <p className="text-body-md font-medium text-portal-text">{request.shippingAddress.name}</p>
                  <p className="text-body-sm text-portal-muted">
                    {request.shippingAddress.lines.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              </div>
              <CancelPanel request={request} onCancel={() => setConfirmCancel(true)} />
            </aside>
          </div>
        ) : (
          <p className="py-4 text-body-sm text-portal-muted">
            We couldn't find this sample request.{" "}
            <a href="/sample-requests" className="font-medium text-portal-text underline">Back to Sample Requests</a>
          </p>
        )}
      </main>

      {confirmCancel && request ? (
        <ConfirmDialog
          title="Cancel this sample request?"
          cancelLabel="Keep Request"
          confirmLabel="Cancel Request"
          onClose={() => setConfirmCancel(false)}
          onConfirm={() => {
            cancelSampleRequest(request.id);
            setRequest(findSampleRequest(request.id));
            setConfirmCancel(false);
          }}
        >
          Urmei won't fulfil {request.productName} once you cancel - you can request a new sample of it later if
          you change your mind.
        </ConfirmDialog>
      ) : null}

      {writingReview && request ? (
        <WriteReviewModal
          onClose={() => setWritingReview(false)}
          onSubmit={(review) => {
            saveSampleReview(request.id, review);
            // Read back rather than trust storage: a full quota drops the
            // write, and the review should still show for this visit.
            setRequest({ ...(findSampleRequest(request.id) ?? request), review });
            setWritingReview(false);
            setToastVisible(true);
          }}
        />
      ) : null}
      {toastVisible ? <Toast message="Thanks for sharing your review with us!" /> : null}
    </AppShell>
  );
}

function ShipmentCard({ request }: { request: SampleRequest }) {
  const { shipment } = request;
  return (
    <div className="flex w-full flex-col gap-3 bg-white">
      <div className="flex items-center gap-4">
        <img src={request.image} alt="" className="size-[90px] shrink-0 rounded-[10px] object-cover" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-body-md font-medium text-portal-text">{request.productName}</p>
          <p className="flex items-center gap-2 text-body-sm text-portal-muted">
            <span>Qty {request.quantity}</span>
            <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-portal-muted" />
            <span>{request.size}</span>
          </p>
        </div>
      </div>

      {/* Tracking and expected delivery only exist once the product ships
          (Figma dev note `1030:27423`). */}
      {shipment && request.status !== "cancelled" ? (
        <>
          <hr className="border-portal-border" />
          <div className="flex flex-col gap-1">
            <p className="text-body-sm text-portal-text">
              Expected delivery • {formatRequestDate(shipment.expectedDelivery)}
            </p>
            <p className="flex flex-wrap items-center gap-1">
              <span className="text-body-md font-medium text-portal-text">Shipped with {shipment.carrier}</span>
              <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-portal-muted" />
              <span className="text-body-sm text-portal-muted">Tracking ID:</span>
              <span className="text-body-md font-medium text-portal-text">{shipment.trackingId}</span>
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

function Timeline({ request }: { request: SampleRequest }) {
  const steps = timelineFor(request);
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li key={step.label} className="relative flex items-start gap-2 py-2">
          {/* The connector runs from this step's marker down behind the next
              one; the pending marker's light fill hides the overlap. */}
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute top-[26px] -bottom-3 left-[9px] w-px bg-portal-placeholder" />
          ) : null}
          <span className="relative flex items-center py-1">
            {step.done ? (
              <span className="flex items-center rounded-full bg-portal-text p-[3.6px]">
                <img src="/urmei/sample-requests/check-done.svg" alt="" width={10.8} height={10.8} className="block size-[10.8px]" />
              </span>
            ) : (
              // Figma draws the 0.45px stroke inside the 18px circle; browsers round
              // it to 1px, so the padding gives that back to stay level with the filled marker.
              <span className="flex items-center rounded-full border-[0.45px] border-portal-placeholder bg-portal-light p-[2.6px]">
                <img src="/urmei/sample-requests/check-pending.svg" alt="" width={10.8} height={10.8} className="block size-[10.8px]" />
              </span>
            )}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-body-md font-medium text-portal-text">
              {step.label}
              <span className="sr-only">{step.done ? " (done)" : " (pending)"}</span>
            </span>
            {step.date ? <span className="text-body-sm text-portal-muted">{formatRequestDate(step.date)}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

function CancelledCallout() {
  return (
    <p className="flex h-10 w-full items-center gap-2 overflow-clip rounded-[10px] bg-portal-alert-tint px-4 py-3 text-body-sm text-portal-alert">
      <img src="/urmei/sample-requests/circle-x.svg" alt="" width={16} height={16} className="block size-4 shrink-0" />
      <span className="min-w-0 flex-1">You cancelled this sample request.</span>
    </p>
  );
}

function StarWell({ size }: { size: "md" | "sm" }) {
  return size === "md" ? (
    <span className="flex shrink-0 items-center rounded-full bg-portal-star p-[4.545px]">
      <img src="/urmei/sample-requests/star.svg" alt="" width={15.9091} height={15.9091} className="block size-[15.9091px]" />
    </span>
  ) : (
    <span className="flex shrink-0 items-center rounded-full bg-portal-star p-1">
      <img src="/urmei/sample-requests/star-sm.svg" alt="" width={14} height={14} className="block size-[14px]" />
    </span>
  );
}

/** Shown only once the sample is delivered (dev note `1030:31426`). */
function ReviewPrompt({ onWrite }: { onWrite: () => void }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-lg border border-portal-border bg-portal-light px-5 py-4 sm:min-h-[94px]">
      <div className="flex items-center gap-4">
        <StarWell size="md" />
        <div className="flex flex-col">
          <p className="text-body-md font-medium text-portal-step">Your sample has been delivered</p>
          <p className="text-body-sm text-portal-placeholder">Tell others what you thought of it.</p>
        </div>
      </div>
      {/* The variant capitalizes every word; the design reads "Write a Review". */}
      <Button variant="portal" className="normal-case" onClick={onWrite}>
        Write a Review
      </Button>
    </div>
  );
}

/** "Your review · 8/10" (`1030:31404`) — the prompt's place once submitted. */
function ReviewCard({ review }: { review: NonNullable<SampleRequest["review"]> }) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg border border-portal-border bg-portal-light px-5 py-4">
      <div className="flex items-center gap-2">
        <StarWell size="sm" />
        <p className="text-body-sm font-medium text-portal-text">
          Your review <span className="text-portal-muted">· {review.rating}/10</span>
        </p>
      </div>
      <div className="flex flex-col gap-3.5">
        <p className="text-body-sm whitespace-pre-line text-portal-emphasis">{review.text}</p>
        <ReviewPhotos photos={review.photos} />
      </div>
    </div>
  );
}

function CancelPanel({ request, onCancel }: { request: SampleRequest; onCancel: () => void }) {
  // The cancelled page drops the panel entirely; the callout says it instead.
  // Delivered drops it too — the review prompt is that page's call to action.
  if (request.status === "cancelled" || request.status === "delivered") return null;
  const cancellable = canCancel(request);
  return (
    <div className="flex w-full flex-col gap-2.5">
      <Button variant="portalDestructive" className="h-[38px] w-full" disabled={!cancellable} onClick={onCancel}>
        Cancel Request
      </Button>
      <Disclosure>
        {cancellable ? "You can cancel before the product ships" : "You can't cancel the product as it has shipped"}
      </Disclosure>
    </div>
  );
}

function Disclosure({ children }: { children: string }) {
  return (
    <p className="flex items-center justify-center gap-2 text-center text-body-sm font-medium text-portal-text">
      <Info aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.5} />
      {children}
    </p>
  );
}
