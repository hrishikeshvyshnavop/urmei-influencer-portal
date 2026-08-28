import { useState } from "react";
import { ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import { requestProductTour } from "./tour-status";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ACTIVITY_ICONS, ACTIVITY_LABELS, formatActivityTime, loadShopActivities } from "../shop/activity-log";
import Pagination from "@/components/Pagination";

const DAY_MS = 24 * 60 * 60 * 1000;
const PAGE_SIZE = 8;

export default function RecentActivitiesPage() {
  const [period, setPeriod] = useState("7");
  const [page, setPage] = useState(1);
  const cutoff = Date.now() - Number(period) * DAY_MS;
  const activities = loadShopActivities().filter((activity) => activity.at >= cutoff);
  const pageCount = Math.max(1, Math.ceil(activities.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleActivities = activities.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <AppShell
      className="motion-page bg-portal-card text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >

      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a><ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} /><span className="text-portal-muted">Recent Activities</span>
          </nav>
          <Select value={period} onValueChange={(value) => { setPeriod(value); setPage(1); }}>
            <SelectTrigger aria-label="Activity period" className="w-[128px] whitespace-nowrap text-portal-text"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="pt-2">
          <h1 className="track-section pb-4 text-body-md font-medium uppercase">Recent Activities</h1>
          {activities.length === 0 ? (
            <p className="py-4 text-body-sm text-portal-muted">Nothing here yet — actions like adding a product or publishing your shop will show up here.</p>
          ) : (
            <div>
              {visibleActivities.map((activity, index) => {
                const ActivityIcon = ACTIVITY_ICONS[activity.type];
                return (
                <article key={activity.id} className={`flex items-start gap-2.5 py-4 ${index < visibleActivities.length - 1 ? "border-b border-portal-border" : ""}`}>
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-portal-tint">
                      <ActivityIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-body-md font-medium">{ACTIVITY_LABELS[activity.type]}</span>
                      {activity.detail ? <span className="block text-body-sm text-portal-muted">{activity.detail}</span> : null}
                    </span>
                  </div>
                  <time className="shrink-0 text-body-xs text-portal-muted">{formatActivityTime(activity.at)}</time>
                </article>
                );
              })}
              {pageCount > 1 ? <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} /> : null}
            </div>
          )}
        </section>
      </main>

    </AppShell>
  );
}
