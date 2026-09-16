import { formatActivityTime } from "../../shop/activity-log";
import { SAMPLE_REQUEST_STATUS_LABELS, type SampleRequest } from "../../shop/sample-requests";

const STATUS_STYLES: Record<SampleRequest["status"], string> = {
  requested: "bg-portal-info-bg text-portal-text",
  approved: "bg-portal-ok-bg text-portal-success-text",
  shipped: "bg-portal-badge-bg text-portal-badge-text",
  rejected: "bg-[#fdecea] text-portal-alert",
};

/** One row of the Sample Requests list — mirrors `ActivityRow`'s layout
 *  (icon well, label, trailing timestamp) with a status pill in place of the
 *  activity feed's bold amount. Links to that request's order-summary page. */
export default function SampleRequestRow({ request, divider = true }: { request: SampleRequest; divider?: boolean }) {
  return (
    <a
      href={`#/samples/${request.id}`}
      className={`flex w-full items-start gap-[10px] overflow-clip bg-portal-card py-4 ${
        divider ? "border-b border-solid border-portal-border" : ""
      }`}
    >
      <div className="flex min-w-px flex-1 items-start gap-3">
        <img
          src={request.productImage}
          alt=""
          className="size-[48px] shrink-0 rounded-sm border border-portal-border object-cover"
        />

        <div className="flex min-w-px flex-1 flex-col items-start gap-1">
          <p className="w-full text-body-md font-medium text-portal-text">
            {request.productBrand} {request.productName}
          </p>
          {request.variant ? <p className="w-full text-body-sm text-portal-muted">{request.variant}</p> : null}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className={`rounded-full px-2 py-[3px] text-body-xxs font-medium whitespace-nowrap ${STATUS_STYLES[request.status]}`}>
          {SAMPLE_REQUEST_STATUS_LABELS[request.status]}
        </span>
        <time className="text-right text-body-xs whitespace-nowrap text-portal-muted">
          {formatActivityTime(request.requestedAt)}
        </time>
      </div>
    </a>
  );
}
