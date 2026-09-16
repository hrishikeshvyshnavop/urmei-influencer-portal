import { useState } from "react";
import { ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import { requestProductTour } from "./tour-status";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadSampleRequests, SAMPLE_REQUEST_STATUS_LABELS, type SampleRequestStatus } from "../shop/sample-requests";
import SampleRequestRow from "./components/SampleRequestRow";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 8;
const STATUS_FILTERS: Array<SampleRequestStatus | "all"> = ["all", "requested", "approved", "shipped", "rejected"];

/** The creator-facing half of the sample-request flow: monitoring status,
 *  called out explicitly alongside the request flow itself in the PRD (see
 *  docs/prd/creator-reviews-and-sample-requests.md §5.2). Requesting a
 *  sample happens from a product's own page; this page only reads what's
 *  already been submitted. */
export default function SampleRequests() {
  const [status, setStatus] = useState<SampleRequestStatus | "all">("all");
  const [page, setPage] = useState(1);
  const requests = loadSampleRequests()
    .filter((request) => status === "all" || request.status === status)
    .sort((a, b) => b.requestedAt - a.requestedAt);
  const pageCount = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleRequests = requests.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <AppShell
      className="bg-portal-card text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >
      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a><ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} /><span className="text-portal-muted">Sample Requests</span>
          </nav>
          <Select value={status} onValueChange={(value) => { setStatus(value as SampleRequestStatus | "all"); setPage(1); }}>
            <SelectTrigger aria-label="Filter by status" className="w-[160px] whitespace-nowrap text-portal-text"><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === "all" ? "All statuses" : SAMPLE_REQUEST_STATUS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <section className="pt-2">
          <h1 className="track-section pb-1 text-body-md font-medium uppercase">Sample Requests</h1>
          <p className="pb-4 text-body-sm text-portal-muted">
            Urmei reviews every request manually while campaigns are in progress — check back here for updates.
          </p>
          {requests.length === 0 ? (
            <p className="py-4 text-body-sm text-portal-muted">
              No sample requests yet — request a sample from any product page to get started.
            </p>
          ) : (
            <div>
              {visibleRequests.map((request) => (
                <SampleRequestRow key={request.id} request={request} />
              ))}
              {pageCount > 1 ? <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} /> : null}
            </div>
          )}
        </section>
      </main>
    </AppShell>
  );
}
