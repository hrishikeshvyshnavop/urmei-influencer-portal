import { ChevronRight, Megaphone } from "lucide-react";
import { ACTIVITY_LABELS, formatActivityTime, loadShopActivities } from "../../shop/activity-log";

const VISIBLE_COUNT = 3;

export default function RecentActivities() {
  const activities = loadShopActivities().slice(0, VISIBLE_COUNT);

  if (activities.length === 0) return null;

  return (
    <section className="flex w-full flex-col items-start gap-4 py-7">
      <div className="flex w-full items-center justify-between">
        <h2 className="track-section min-w-px flex-1 text-body-md font-medium uppercase text-portal-text">
          Recent Activities
        </h2>
        <button
          type="button"
          onClick={() => {
            window.location.hash = "#/recent-activities";
          }}
          className="flex shrink-0 cursor-pointer items-center gap-2 overflow-clip text-body-sm font-medium whitespace-nowrap text-portal-text"
        >
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex w-full flex-col items-start">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex w-full items-start gap-[10px] overflow-clip bg-portal-card py-4 ${
              index < activities.length - 1
                ? "border-b border-solid border-portal-border"
                : ""
            }`}
          >
            <div className="flex min-w-px flex-1 items-start gap-3">
              <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-portal-tint p-[6px]">
                <Megaphone aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </div>

              <div className="flex min-w-px flex-1 flex-col items-start gap-1">
                <p className="w-full text-body-md font-medium text-portal-text">
                  {ACTIVITY_LABELS[activity.type]}
                </p>
                {activity.detail ? (
                  <p className="w-full text-body-sm text-portal-muted">
                    {activity.detail}
                  </p>
                ) : null}
              </div>
            </div>

            <p className="shrink-0 text-right text-body-xs whitespace-nowrap text-portal-muted">
              {formatActivityTime(activity.at)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
