import { ChevronRight } from "lucide-react";
import { loadShopActivities } from "../../shop/activity-log";
import ActivityRow from "./ActivityRow";

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
          <ActivityRow key={activity.id} activity={activity} divider={index < activities.length - 1} />
        ))}
      </div>
    </section>
  );
}
