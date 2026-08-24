import { useId } from "react";

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  /** Renders the calendar affordance from the design (Birthday field). */
  icon?: "calendar";
  autoComplete?: string;
  /** Review Details renders identity fields as read-only, filled swatches. */
  locked?: boolean;
};

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  autoComplete,
  locked = false,
}: TextFieldProps) {
  const id = useId();

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label
        htmlFor={id}
        className="text-body-sm font-medium whitespace-nowrap text-portal-text"
      >
        {label}
      </label>

      <div
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid px-4 py-3 ${
          locked
            ? "border-portal-surface bg-portal-surface"
            : "border-portal-border"
        }`}
      >
        <div className="flex min-w-px flex-1 items-center gap-1">
          <input
            id={id}
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            readOnly={locked}
            className={`w-full min-w-px bg-transparent text-body-sm outline-none placeholder:text-portal-placeholder ${
              locked ? "text-portal-placeholder" : "text-portal-text"
            }`}
          />
        </div>
        {icon === "calendar" ? (
          <span className="relative size-[20px] shrink-0 overflow-clip">
            <span className="absolute inset-[8.33%_12.5%]">
              <span className="absolute inset-[-3.99%_-4.43%]">
                <img
                  src="/urmei/icon-calendar.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
