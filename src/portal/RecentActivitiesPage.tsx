import { useState } from "react";
import { ChevronRight, DollarSign, Megaphone } from "lucide-react";
import AppShell from "./components/AppShell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const activities = [
  { id: 1, type: "commission", title: "Commission Earned:", amount: "S$1.5", detail: "From ahc youth focus essence", time: "Today, 4:15 PM" },
  { id: 2, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 4:12 PM" },
  { id: 3, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 4:00 PM" },
  { id: 4, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 3:56 PM" },
  { id: 5, type: "campaign", title: "Campaign Created", detail: "Mamonde rose water toner", time: "Yesterday, 5:55 PM" },
] as const;

export default function RecentActivitiesPage() {
  const [period, setPeriod] = useState("7");

  return (
    <AppShell
      className="motion-page bg-portal-card text-portal-text"
      onShowTour={() => { window.location.hash = "#/home/tour"; }}
      onShowHelp={() => { window.location.hash = "#/help-center"; }}
    >

      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a><ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} /><span className="text-portal-muted">Recent Activities</span>
          </nav>
          <Select value={period} onValueChange={setPeriod}>
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
          <div>
            {activities.map((activity, index) => (
              <article key={activity.id} className={`flex items-start gap-2.5 py-4 ${index < activities.length - 1 ? "border-b border-portal-border" : ""}`}>
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-portal-tint">
                    {activity.type === "commission" ? <DollarSign aria-hidden="true" className="size-4" strokeWidth={1.5} /> : <Megaphone aria-hidden="true" className="size-4" strokeWidth={1.5} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-body-md"><span className="font-medium">{activity.title}</span>{"amount" in activity ? <span className="font-semibold">{activity.amount}</span> : null}</span>
                    <span className="block text-body-sm text-portal-muted">{activity.detail}</span>
                  </span>
                </div>
                <time className="shrink-0 text-body-xs text-portal-muted">{activity.time}</time>
              </article>
            ))}
          </div>
        </section>
      </main>

    </AppShell>
  );
}
