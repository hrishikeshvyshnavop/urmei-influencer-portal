import { useId, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** The design writes birthdays as "15 Jan 1998". */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function parseDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

type TextFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  /** Renders the calendar affordance from the design (Birthday field). */
  icon?: "calendar";
  autoComplete?: string;
  options?: string[];
  numericOnly?: boolean;
  maxLength?: number;
  latestDate?: Date;
  error?: string;
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
  options,
  numericOnly = false,
  maxLength,
  latestDate,
  error,
  locked = false,
}: TextFieldProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const selectedDate = parseDate(value);
  const calendarMonth =
    selectedDate && (!latestDate || selectedDate <= latestDate)
      ? selectedDate
      : latestDate;

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label
        htmlFor={id}
        className="text-body-sm font-medium whitespace-nowrap text-portal-text"
      >
        {label}
      </label>

      <div
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid px-4 py-3 transition-[border-color,background-color,box-shadow] duration-200 focus-within:border-portal-dark focus-within:ring-2 focus-within:ring-portal-surface ${
          locked
            ? "border-portal-surface bg-portal-surface"
            : error
              ? "border-portal-alert"
              : "border-portal-border"
        }`}
      >
        <div className="relative flex min-w-px flex-1 items-center gap-1">
          {options ? (
            <Select
              value={value}
              onValueChange={onChange}
              disabled={locked}
            >
              <SelectTrigger
                id={id}
                aria-invalid={Boolean(error)}
                aria-label={label}
              >
                <span className={value ? "text-portal-text" : "text-portal-placeholder"}>
                  <SelectValue placeholder={placeholder} />
                </span>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <input
              id={id}
              type={type}
              value={value}
              inputMode={numericOnly ? "numeric" : type === "tel" ? "tel" : undefined}
              maxLength={maxLength}
              onClick={() => {
                if (icon === "calendar" && !locked) setOpen(true);
              }}
              onFocus={() => {
                if (icon === "calendar" && !locked) setOpen(true);
              }}
              onChange={(event) =>
                onChange(
                  numericOnly
                    ? event.target.value.replace(/\D/g, "").slice(0, maxLength)
                    : type === "tel"
                    ? event.target.value.replace(/[^\d+()\s-]/g, "")
                    : event.target.value,
                )
              }
              placeholder={placeholder}
              autoComplete={autoComplete}
              readOnly={locked}
              disabled={locked}
              aria-invalid={Boolean(error)}
              className={`w-full min-w-px bg-transparent text-body-sm outline-none placeholder:text-portal-placeholder ${
                locked
                  ? "cursor-not-allowed text-portal-placeholder"
                  : "text-portal-text"
              }`}
            />
          )}
        </div>

        {icon === "calendar" ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={locked}
                aria-label={`Choose ${label}`}
                className="relative size-[20px] shrink-0 cursor-pointer overflow-clip disabled:cursor-not-allowed"
              >
                <span className="absolute inset-[8.33%_12.5%]">
                  <span className="absolute inset-[-3.99%_-4.43%]">
                    <img
                      src="/urmei/icon-calendar.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                captionLayout="dropdown"
                startMonth={new Date(1920, 0)}
                endMonth={latestDate ?? new Date()}
                disabled={{ after: latestDate ?? new Date() }}
                defaultMonth={calendarMonth}
                selected={selectedDate}
                onSelect={(date) => {
                  if (!date) return;
                  onChange(dateFormatter.format(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
      {error ? (
        <p className="text-body-xs text-portal-alert" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
