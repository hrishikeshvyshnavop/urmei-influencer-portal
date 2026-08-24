import { ChevronRight } from "lucide-react";

type Activity = {
  icon: "dollar" | "megaphone";
  /** Icon inset from the design; each glyph sits in an 8px box. */
  inset: string;
  label: string;
  /** Bold trailing amount, present only on commission rows. */
  amount?: string;
  detail: string;
  time: string;
};

const activities: Activity[] = [
  {
    icon: "dollar",
    inset: "bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]",
    label: "Commission earned:",
    amount: "S$15",
    detail: "From Laneige water sleeping mask",
    time: "Today, 4:15 PM",
  },
  {
    icon: "dollar",
    inset: "bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]",
    label: "Commission earned:",
    amount: "S$91",
    detail: "From Sulwhasoo first care serum",
    time: "Today, 4:15 PM",
  },
  {
    icon: "megaphone",
    inset: "bottom-[20.8%] left-[12.5%] right-[12.5%] top-1/4",
    label: "Product added to shop",
    detail: "Mamonde rose water toner",
    time: "Yesterday, 5:55 PM",
  },
];

export default function RecentActivities() {
  return (
    <section className="flex w-full flex-col items-start gap-4 py-7">
      <div className="flex w-full items-center justify-between">
        <h2 className="track-section min-w-px flex-1 text-body-md font-medium uppercase text-portal-text">
          Recent Activities
        </h2>
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 overflow-clip text-body-sm font-medium whitespace-nowrap text-portal-text"
        >
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex w-full flex-col items-start">
        {activities.map((activity, index) => (
          <div
            key={`${activity.label}-${activity.detail}`}
            className={`flex w-full items-start gap-[10px] overflow-clip bg-portal-card py-4 ${
              index < activities.length - 1
                ? "border-b border-solid border-portal-border"
                : ""
            }`}
          >
            <div className="flex min-w-px flex-1 items-start gap-3">
              <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-portal-tint p-[6px]">
                <span className="relative size-[8px] shrink-0 overflow-clip">
                  <span className={`absolute ${activity.inset}`}>
                    <img
                      src={`/urmei/home/icon-${activity.icon}.svg`}
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </div>

              <div className="flex min-w-px flex-1 flex-col items-start gap-1">
                <div className="flex w-full items-start gap-1 text-body-md whitespace-nowrap">
                  <p className="shrink-0 font-medium text-portal-text">
                    {activity.label}
                  </p>
                  {activity.amount ? (
                    <p className="shrink-0 font-semibold text-portal-text">
                      {activity.amount}
                    </p>
                  ) : null}
                </div>
                <p className="w-full text-body-sm text-portal-muted">
                  {activity.detail}
                </p>
              </div>
            </div>

            <p className="shrink-0 text-right text-body-xs whitespace-nowrap text-portal-muted">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
