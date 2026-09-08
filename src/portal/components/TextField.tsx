import { useId, useState } from "react";
import { Info } from "lucide-react";
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
  /** Standing helper line below the input, drawn with the design's 12px info
   *  glyph (Figma `1583:87433`). `error` takes precedence: showing both would
   *  stack two lines of small print under one field and shift the grid. */
  hint?: string;
  /** Fixed, unselectable text ahead of the value, greyed like a placeholder —
   *  the Username field's "urmei.com/shop/" (Figma `1583:87772`). It reads as
   *  part of the value rather than as a label, so it lives inside the box. */
  prefix?: string;
  /** Draws the design's red asterisk beside the label (the bank fields,
   *  Figma `1583:88109`). Cosmetic only — validation is the caller's. */
  required?: boolean;
  /** Green tick on the trailing edge of the box, for a value the caller has
   *  confirmed good — the Username field's available handle (Figma
   *  `1583:87772`). There is no failure glyph to match: `error` already
   *  reddens the border and prints the reason underneath. */
  valid?: boolean;
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
  hint,
  prefix,
  required = false,
  valid = false,
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
      <div className="flex items-start gap-1">
        <label
          htmlFor={id}
          className="text-body-sm font-medium whitespace-nowrap text-portal-text"
        >
          {label}
        </label>
        {required ? (
          <img
            src="/urmei/icon-asterisk.svg"
            alt="required"
            className="block size-[6px]"
          />
        ) : null}
      </div>

      <div
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid px-4 py-3 transition-[border-color,background-color,box-shadow] duration-200 focus-within:ring-2 focus-within:ring-portal-surface ${
          locked
            ? "border-portal-surface bg-portal-surface"
            : error
              ? // Stays red on focus: the field is wrong, and clicking into it
                // to fix it is not a reason to stop saying so.
                "border-portal-alert focus-within:border-portal-alert"
              : "border-portal-border focus-within:border-portal-dark"
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
            <>
              {prefix ? (
                <span
                  aria-hidden="true"
                  className="shrink-0 text-body-sm text-portal-placeholder"
                >
                  {prefix}
                </span>
              ) : null}
            <input
              id={id}
              name={autoComplete}
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
              className={`w-full min-w-px bg-transparent text-body-sm text-portal-text outline-none placeholder:text-portal-placeholder ${
                locked ? "cursor-not-allowed" : ""
              }`}
            />
            </>
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

        {valid && !error ? (
          <span
            aria-hidden="true"
            className="motion-success-tick relative size-[20px] shrink-0 overflow-clip"
          >
            <img
              src="/urmei/icon-circle-check.svg"
              alt=""
              className="block size-full max-w-none"
            />
          </span>
        ) : null}
      </div>
      {error ? (
        <p className="text-body-xs text-portal-alert" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="flex items-center gap-[2px] text-body-xs text-portal-muted">
          <Info aria-hidden="true" className="size-3 shrink-0" strokeWidth={1.5} />
          {hint}
        </p>
      ) : null}
    </div>
  );
}
