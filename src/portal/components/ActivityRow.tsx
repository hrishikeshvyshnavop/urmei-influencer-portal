import { ACTIVITY_ICONS, ACTIVITY_LABELS, formatActivityAmount, formatActivityTime, type ShopActivity } from "../../shop/activity-log";

/**
 * One row of the Activity Item set (Figma `1584:96889`): a 32px tinted icon
 * well, the label — with the earnings types' sum set bold beside it — the
 * product name underneath, and the timestamp on the right. Home's widget and
 * the full Recent Activities page both draw this, exactly as the design's
 * frames both instance the same component.
 *
 * Every row carries the design's bottom rule; Home's widget keeps its last
 * row bare, as it did before the two renderers shared this one.
 */
export default function ActivityRow({ activity, divider = true }: { activity: ShopActivity; divider?: boolean }) {
  const ActivityIcon = ACTIVITY_ICONS[activity.type];

  return (
    <article
      className={`flex w-full items-start gap-[10px] overflow-clip bg-portal-card py-4 ${
        divider ? "border-b border-solid border-portal-border" : ""
      }`}
    >
      <div className="flex min-w-px flex-1 items-start gap-3">
        <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-portal-tint p-[6px]">
          <ActivityIcon aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </div>

        <div className="flex min-w-px flex-1 flex-col items-start gap-1">
          <p className="flex w-full gap-1 text-body-md whitespace-nowrap">
            <span className="font-medium text-portal-text">{ACTIVITY_LABELS[activity.type]}</span>
            {activity.amount === undefined ? null : (
              <span className="font-semibold text-portal-emphasis">{formatActivityAmount(activity.amount)}</span>
            )}
          </p>
          {activity.detail ? <p className="w-full text-body-sm text-portal-muted">{activity.detail}</p> : null}
        </div>
      </div>

      <time className="shrink-0 text-right text-body-xs whitespace-nowrap text-portal-muted">
        {formatActivityTime(activity.at)}
      </time>
    </article>
  );
}
