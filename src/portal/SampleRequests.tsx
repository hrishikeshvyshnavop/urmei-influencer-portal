import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import { SearchField } from "./components/SearchField";
import WriteReviewModal from "./components/WriteReviewModal";
import { Toast } from "../shop/components/Toast";
import { requestProductTour } from "./tour-status";
import {
  canReview,
  loadSampleRequests,
  saveSampleReview,
  STATUS_LABELS,
  type SampleRequest,
  type SampleReview,
} from "./sample-requests";
import { navigate } from "../router";

/** Sample Requests list (Figma `1030:27226`): a search box over one card per
 *  request — the product row opens its details, and the white strip under it
 *  carries the creator's review or the "Add a review" prompt, which opens the
 *  same review dialog as the details page. */
export default function SampleRequests() {
  const [query, setQuery] = useState("");
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  // Reviews written this visit, kept so they show even when a full storage
  // quota drops the write (photos are data URLs).
  const [written, setWritten] = useState<Record<string, SampleReview>>({});
  const [toastVisible, setToastVisible] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const requests = loadSampleRequests()
    .map((request) => (written[request.id] ? { ...request, review: written[request.id] } : request))
    .filter((request) => request.productName.toLowerCase().includes(normalizedQuery));

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
      <main className="mx-auto flex-1 w-full max-w-[794px] px-6 pb-14 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
          <a href="/home">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <span className="text-portal-muted">Sample Requests</span>
        </nav>

        <h1 className="sr-only">Sample Requests</h1>

        <div className="pb-4">
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Search"
            aria-label="Search sample requests"
            className="w-full sm:w-[343px]"
          />
        </div>

        {requests.length === 0 ? (
          <p className="py-4 text-body-sm text-portal-muted">
            {normalizedQuery ? `No sample requests match “${query.trim()}”.` : "You haven't requested any samples yet."}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {requests.map((request) => (
              <li key={request.id}>
                <SampleRequestCard request={request} onWriteReview={() => setReviewingId(request.id)} />
              </li>
            ))}
          </ul>
        )}
      </main>

      {reviewingId ? (
        <WriteReviewModal
          onClose={() => setReviewingId(null)}
          onSubmit={(review) => {
            saveSampleReview(reviewingId, review);
            setWritten((current) => ({ ...current, [reviewingId]: review }));
            setReviewingId(null);
            setToastVisible(true);
          }}
        />
      ) : null}
      {toastVisible ? <Toast message="Thanks for sharing your review with us!" /> : null}
    </AppShell>
  );
}

function SampleRequestCard({ request, onWriteReview }: { request: SampleRequest; onWriteReview: () => void }) {
  const star = (
    <span className="flex shrink-0 items-center rounded-full bg-portal-star p-[4.5px]">
      <img src="/urmei/sample-requests/star.svg" alt="" width={15.9091} height={15.9091} className="block size-[15.9091px]" />
    </span>
  );
  const stripClass =
    "flex w-full items-center gap-3 rounded-[10px] border border-portal-surface bg-portal-light px-4 py-3 drop-shadow-[0px_4px_10px_rgba(0,0,0,0.03)]";

  return (
    <article className="overflow-clip rounded-[10px] bg-portal-surface">
      <a
        href={`/sample-requests/${encodeURIComponent(request.id)}`}
        className="flex items-center gap-4 rounded-[10px] px-4 py-5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-portal-dark"
      >
        <img src={request.image} alt="" className="size-14 shrink-0 rounded-[10px] object-cover" />
        <span className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="truncate text-body-md font-medium text-portal-text">{request.productName}</span>
          <span className="flex items-center gap-2 text-body-sm text-portal-muted">
            <span>Qty {request.quantity}</span>
            <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-portal-muted" />
            <span>{request.size}</span>
            <StatusPill>{STATUS_LABELS[request.status]}</StatusPill>
          </span>
        </span>
        <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-portal-text" strokeWidth={1.5} />
      </a>

      {canReview(request) ? (
        <button
          type="button"
          onClick={onWriteReview}
          aria-label={`Add a review for ${request.productName}`}
          className={`${stripClass} cursor-pointer text-left hover:bg-portal-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-portal-dark`}
        >
          {star}
          <span className="min-w-0 flex-1 text-body-sm text-portal-muted">Add a review</span>
        </button>
      ) : (
        <div className={stripClass}>
          {star}
          <p className="min-w-0 flex-1 text-body-sm text-portal-muted">{request.review?.text}</p>
        </div>
      )}
    </article>
  );
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className="shrink-0 rounded-full bg-portal-pill px-3 py-0.5 text-body-sm font-medium text-portal-dark">
      {children}
    </span>
  );
}
