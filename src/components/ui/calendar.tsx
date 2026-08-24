import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        "relative w-[280px] max-w-[calc(100vw-48px)] bg-white text-body-sm text-portal-text [--cell-size:36px]",
        className,
      )}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaults.root),
        months: cn("relative flex flex-col gap-4", defaults.months),
        month: cn("flex w-full flex-col gap-3", defaults.month),
        nav: cn("absolute inset-x-0 top-0 flex h-9 w-full items-center justify-between", defaults.nav),
        button_previous: cn("flex size-9 cursor-pointer items-center justify-center rounded-md border border-portal-border bg-white disabled:cursor-not-allowed disabled:opacity-40", defaults.button_previous),
        button_next: cn("flex size-9 cursor-pointer items-center justify-center rounded-md border border-portal-border bg-white disabled:cursor-not-allowed disabled:opacity-40", defaults.button_next),
        month_caption: cn("flex h-9 w-full items-center justify-center px-10", defaults.month_caption),
        dropdowns: cn("flex h-9 w-full items-center justify-center gap-1.5 font-medium", defaults.dropdowns),
        dropdown_root: cn("relative rounded-md border border-portal-border bg-white focus-within:border-portal-dark focus-within:ring-2 focus-within:ring-portal-surface", defaults.dropdown_root),
        dropdown: cn("absolute inset-0 cursor-pointer opacity-0", defaults.dropdown),
        caption_label: cn("flex h-8 items-center gap-1 px-2 font-medium select-none [&>svg]:size-3.5 [&>svg]:text-portal-muted", defaults.caption_label),
        month_grid: cn("w-full border-collapse", defaults.month_grid),
        weekdays: cn("flex", defaults.weekdays),
        weekday: cn("flex-1 text-center text-body-xs font-medium text-portal-muted select-none", defaults.weekday),
        week: cn("mt-1 flex w-full", defaults.week),
        day: cn("group/day relative aspect-square h-full w-full p-0 text-center select-none", defaults.day),
        today: cn("rounded-md bg-portal-surface", defaults.today),
        outside: cn("text-portal-placeholder", defaults.outside),
        disabled: cn("opacity-40", defaults.disabled),
        hidden: cn("invisible", defaults.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className: iconClassName, orientation, ...iconProps }) => {
          const Icon = orientation === "left" ? ChevronLeftIcon : orientation === "right" ? ChevronRightIcon : ChevronDownIcon;
          return <Icon className={cn("size-4", iconClassName)} {...iconProps} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected || undefined}
      className={cn(
        "flex size-9 cursor-pointer items-center justify-center rounded-md font-normal transition-colors hover:bg-portal-surface focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-portal-dark disabled:cursor-not-allowed data-[selected=true]:bg-portal-dark data-[selected=true]:text-portal-light data-[selected=true]:hover:bg-portal-dark",
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
