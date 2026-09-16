import { ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import { requestProductTour } from "./tour-status";
import { formatAddress } from "./shipping-address";
import { formatActivityTime } from "../shop/activity-log";
import {
  SAMPLE_REQUEST_STATUS_LABELS,
  loadSampleRequests,
  type SampleRequestStatus,
} from "../shop/sample-requests";

/** The happy-path order of a sample request. `rejected` is a separate
 *  terminal outcome shown as its own banner instead of a step on this line —
 *  a request that's been rejected didn't "get partway" through shipping. */
const STEP_ORDER: SampleRequestStatus[] = ["requested", "approved", "shipped"];

function StepIcon({ done }: { done: boolean }) {
  return (
    <span
      className={`flex size-[24px] shrink-0 items-center justify-center rounded-full p-[4px] ${
        done ? "bg-portal-step" : "border border-solid border-portal-border"
      }`}
    >
      {done && (
        <span className="relative block size-[12px] shrink-0 overflow-clip">
          <img src="/urmei/icon-step-check.svg" alt="" className="block size-full max-w-none" />
        </span>
      )}
    </span>
  );
}

/**
 * A single sample request's order-summary page, reached from the Samples
 * list (`#/samples/<id>`). Adapted from the K-Beauty order-summary design
 * (Figma `15287:38983`) to what a free sample request actually has — no
 * pricing, invoice or "buy again", since nothing was purchased: just the
 * product, a status timeline, and where it's shipping.
 */
export default function SampleOrderSummary({ id }: { id: string }) {
  const request = loadSampleRequests().find((item) => item.id === id) ?? null;

  if (!request) {
    return (
      <AppShell
        className="bg-portal-card text-portal-text"
        onShowTour={requestProductTour}
        onShowHelp={() => { window.location.hash = "#/help-center"; }}
      >
        <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[994px] px-6 pb-12 lg:px-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a><ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} /><a href="#/samples">Samples</a>
          </nav>
          <p className="py-4 text-body-sm text-portal-muted">This sample request no longer exists.</p>
        </main>
      </AppShell>
    );
  }

  const currentStepIndex = STEP_ORDER.indexOf(request.status);

  return (
    <AppShell
      className="bg-portal-card text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >
      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[994px] px-6 pb-12 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
          <a href="#/home">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <a href="#/samples">Samples</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <span className="text-portal-muted">
            {request.productBrand} {request.productName}
          </span>
        </nav>

        <div className="flex w-full flex-col items-start gap-3xl pb-8 lg:flex-row">
          <div className="flex w-full flex-col items-start gap-lg lg:w-[545px]">
            <h1 className="track-section text-body-md font-medium uppercase">Order summary</h1>

            <div className="flex w-full flex-col items-start gap-md-sm">
              <div className="flex w-full items-center gap-md">
                <img
                  src={request.productImage}
                  alt=""
                  className="size-[90px] shrink-0 rounded-lg border border-portal-border object-cover"
                />
                <div className="flex min-w-px flex-1 flex-col gap-1">
                  <p className="text-body-xxs font-medium text-portal-muted">{request.productBrand}</p>
                  <p className="text-body-md font-medium text-portal-text">{request.productName}</p>
                  {request.variant && <p className="text-body-sm text-portal-muted">{request.variant}</p>}
                </div>
              </div>

              <div className="h-px w-full bg-portal-border" />

              <p className="text-body-sm text-portal-text">
                Requested {formatActivityTime(request.requestedAt)}
              </p>
            </div>

            {request.status === "rejected" ? (
              <div className="flex w-full items-center gap-sm rounded-md border border-portal-alert bg-[#fdecea] px-md-sm py-sm">
                <p className="text-body-sm font-medium text-portal-alert">
                  Urmei wasn't able to approve this request.
                </p>
              </div>
            ) : (
              <div className="flex w-full flex-col items-start">
                {STEP_ORDER.map((step, index) => {
                  const done = index <= currentStepIndex;
                  return (
                    <div key={step} className="flex w-full items-start gap-sm py-sm">
                      <div className="flex flex-col items-center self-stretch">
                        <StepIcon done={done} />
                        {index < STEP_ORDER.length - 1 && (
                          <div className={`w-px flex-1 ${done ? "bg-portal-step" : "bg-portal-border"}`} />
                        )}
                      </div>
                      <div className="flex min-w-px flex-1 flex-col gap-[2px] pt-[2px]">
                        <p className="text-body-md font-medium text-portal-text">
                          {SAMPLE_REQUEST_STATUS_LABELS[step]}
                        </p>
                        <p className="text-body-sm text-portal-muted">
                          {done ? formatActivityTime(request.updatedAt) : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex min-w-px flex-1 flex-col items-start gap-md">
            <h2 className="track-section text-body-md font-medium uppercase">Shipping address</h2>
            <div className="flex w-full flex-col items-start gap-1">
              <p className="text-body-md font-medium text-portal-text">
                {request.shippingAddress.label || "Address"}
              </p>
              <p className="text-body-sm text-portal-muted">{formatAddress(request.shippingAddress)}</p>
            </div>

            <a
              href="#/samples"
              className="flex w-full items-center justify-center gap-sm rounded-lg border border-portal-border px-4 py-2 text-body-sm font-medium text-portal-text"
            >
              Back to Samples
            </a>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
