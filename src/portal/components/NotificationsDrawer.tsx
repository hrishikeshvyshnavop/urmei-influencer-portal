import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, Star, User, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Notification = {
  icon: LucideIcon;
  title: string;
  /** Follower notifications are a single line with no body copy. */
  body?: string;
  time: string;
  /** Unread rows sit on a tinted background in the design. */
  unread?: boolean;
};

type NotificationGroup = { date: string; items: Notification[] };

const defaultGroups: NotificationGroup[] = [
  {
    date: "Yesterday",
    items: [
      {
        icon: User,
        title: "Mei Tan started following your shop on URMEI.",
        time: "18h",
      },
    ],
  },
  {
    date: "Last week",
    items: [
      {
        icon: Star,
        title: "New from LANEIGE",
        body: "Water Bank Blue Hyaluronic Cream just launched. Add it to your shop.",
        time: "4d",
      },
    ],
  },
];

function IconWell({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[20px] bg-portal-tint">
      <Icon size={16} />
    </div>
  );
}

type NotificationsDrawerProps = {
  onClose: () => void;
  /** Pass an empty array to render the empty state from the design. */
  groups?: NotificationGroup[];
};

export default function NotificationsDrawer({
  onClose,
  groups = defaultGroups,
}: NotificationsDrawerProps) {
  const isEmpty = groups.every((group) => group.items.length === 0);

  // Closing plays the drawer's slide-out first and defers the real `onClose`
  // — and the unmount it triggers — instead of firing it immediately, so it
  // animates away instead of vanishing.
  const [closing, setClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  function finishClose() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    onClose();
  }

  function requestClose() {
    if (closing) return;
    setClosing(true);
    // `onAnimationEnd` normally finishes the close, but CSS animations can
    // stall while the tab is backgrounded — this guarantees it still closes.
    closeTimeoutRef.current = window.setTimeout(finishClose, 300);
  }

  function handleExitAnimationEnd() {
    if (closing) finishClose();
  }

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Portalled to <body>: Home's page-enter animation leaves a transform on an
  // ancestor, which would otherwise become the containing block for `fixed`.
  return createPortal(
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="Close notifications"
        onClick={requestClose}
        data-state={closing ? "closed" : "open"}
        className="motion-modal-backdrop absolute inset-0 cursor-default bg-[rgba(0,0,0,0.2)]"
      />

      <aside
        onAnimationEnd={handleExitAnimationEnd}
        data-state={closing ? "closed" : "open"}
        role="dialog"
        aria-label="Notifications"
        className="motion-drawer-right absolute top-0 right-0 flex h-full w-[440px] max-w-full flex-col items-start border-l border-solid border-portal-border bg-portal-light"
      >
        <div className="flex h-[72px] w-full shrink-0 items-center justify-between overflow-clip border-b border-solid border-portal-border bg-portal-light p-4">
          <p className="min-w-px flex-1 text-body-md font-medium tracking-[1px] uppercase text-portal-text">
            Notifications
          </p>
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="flex size-[40px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-solid border-portal-border"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">
            <div className="flex size-[48px] items-center justify-center rounded-[30px] bg-portal-tint">
              <Bell size={24} />
            </div>
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <p className="w-full text-body-xl font-semibold text-portal-text">
                No Notifications Yet!
              </p>
              <p className="w-[244px] text-body-xs text-portal-muted">
                When you have notification they will show up here.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col items-start overflow-y-auto">
            {groups.map((group) => (
              <div key={group.date} className="flex w-full flex-col items-start">
                <div className="flex w-full items-center py-2 pl-4">
                  <p className="track-section min-w-px flex-1 text-body-md font-medium uppercase text-portal-text">
                    {group.date}
                  </p>
                </div>

                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className={`flex w-full items-start gap-[10px] overflow-clip px-4 py-5 ${
                      item.unread ? "bg-portal-surface" : ""
                    }`}
                  >
                    <IconWell icon={item.icon} />
                    <div className="flex min-w-px flex-1 flex-col items-start gap-1 text-body-sm">
                      <p className="w-full font-medium text-portal-text">
                        {item.title}
                      </p>
                      {item.body ? (
                        <p className="w-full text-portal-muted">{item.body}</p>
                      ) : null}
                    </div>
                    <p className="w-[35px] shrink-0 text-right text-body-xs text-portal-muted">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>,
    document.body,
  );
}
