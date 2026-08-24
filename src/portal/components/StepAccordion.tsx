import type { ReactNode } from "react";

export type StepStatus =
  | "locked"
  | "idle"
  | "pending"
  | "failed"
  | "complete";

export function Icon16({
  src,
  inset,
  bleed,
}: {
  src: string;
  inset: string;
  bleed?: string;
}) {
  return (
    <span className="relative block size-[16px] shrink-0 overflow-clip">
      <span className={`absolute block ${inset}`}>
        <span className={`absolute block ${bleed ?? "inset-0"}`}>
          <img src={src} alt="" className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  );
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <span
      className={`relative size-[18px] shrink-0 overflow-clip transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        expanded ? "rotate-180" : ""
      }`}
    >
      <span className="absolute top-[37.5%] bottom-[37.5%] left-1/4 right-1/4">
        <span className="absolute inset-[-14.78%_-7.39%]">
          <img
            src="/urmei/icon-chevron.svg"
            alt=""
            className="block size-full max-w-none"
          />
        </span>
      </span>
    </span>
  );
}

/** The white bordered card holding an expanded step's body. */
export function StepCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-[10px] border border-solid border-portal-border bg-white p-5">
      {children}
    </div>
  );
}

/** Icon well + heading used at the top of every status card. */
export function StatusHeader({
  well,
  icon,
  inset,
  bleed,
  heading,
}: {
  well: string;
  icon: string;
  inset: string;
  bleed?: string;
  heading: string;
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <div
        className={`flex size-[32px] shrink-0 items-center justify-center rounded-[10px] ${well}`}
      >
        <span
          className={`block size-[16px] ${
            icon.includes("circle-dashed") ? "motion-spin-soft" : ""
          }`}
        >
          <Icon16 src={icon} inset={inset} bleed={bleed} />
        </span>
      </div>
      <p className="min-w-px flex-1 text-body-md font-medium text-portal-text">
        {heading}
      </p>
    </div>
  );
}

type StepProps = {
  index: number;
  title: string;
  status: StepStatus;
  /** Badge copy once the step is done — "Completed" or "Connected". */
  badge?: string;
  expanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

export function Step({
  index,
  title,
  status,
  badge,
  expanded,
  onToggle,
  children,
}: StepProps) {
  const done = status === "complete";

  return (
    <div className="flex w-full flex-col items-start border-b border-solid border-portal-border py-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-[14px] text-left"
      >
        <span
          className={`flex size-[32px] shrink-0 flex-col items-center justify-center rounded-full p-[5.333px] transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            done || status !== "locked"
              ? "bg-portal-step"
              : "border-[1.333px] border-solid border-portal-border"
          }`}
        >
          {done ? (
            <span className="motion-feedback relative size-[18px] shrink-0 overflow-clip">
              <span className="absolute top-1/4 bottom-[29.17%] left-[16.67%] right-[16.67%]">
                <span className="absolute inset-[-8.06%_-5.54%]">
                  <img
                    src="/urmei/icon-step-check.svg"
                    alt=""
                    className="block size-full max-w-none"
                  />
                </span>
              </span>
            </span>
          ) : (
            <span
              className={`w-full text-center text-body-sm ${
                status === "locked" ? "text-portal-muted" : "text-portal-tick"
              }`}
            >
              {index}
            </span>
          )}
        </span>

        <span className="flex min-w-px flex-1 items-center gap-2">
          <span className="min-w-px flex-1 text-body-md text-portal-muted">
            {title}
          </span>
          {done && badge ? (
            <span className="flex shrink-0 items-center rounded-full bg-portal-badge-bg px-2 py-1 text-body-xs font-medium whitespace-nowrap text-portal-badge-text">
              {badge}
            </span>
          ) : null}
        </span>

        <Chevron expanded={expanded} />
      </button>

      <div
        className={`grid w-full transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 w-full overflow-hidden">
          <div
            className={`pt-4 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
              expanded
                ? "translate-y-0 opacity-100 delay-75"
                : "-translate-y-1 opacity-0 delay-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
