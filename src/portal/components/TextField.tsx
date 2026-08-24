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
};

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  autoComplete,
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

      <div className="flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid border-portal-border px-4 py-3">
        <div className="flex min-w-px flex-1 items-center gap-1">
          <input
            id={id}
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="w-full min-w-px bg-transparent text-body-sm text-portal-text outline-none placeholder:text-portal-placeholder"
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
