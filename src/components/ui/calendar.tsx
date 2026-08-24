import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui Calendar (react-day-picker), themed with the portal's tokens.
 * `captionLayout="dropdown"` keeps birthdays reachable without paging back
 * hundreds of months.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "relative w-[280px] max-w-[calc(100vw-48px)] text-body-sm text-portal-text",
        className,
      )}
      classNames={{
        months: "w-full",
        month: "flex w-full flex-col gap-3",
        month_caption: "flex h-9 items-center justify-center px-10",
        caption_label: "text-body-sm font-medium text-portal-text",
        dropdowns: "flex min-w-0 items-center justify-center gap-2",
        dropdown_root: "relative",
        dropdown:
          "max-w-[112px] cursor-pointer rounded-[6px] border border-solid border-portal-border bg-white px-2 py-1 text-body-sm text-portal-text outline-none",
        nav: "absolute inset-x-0 top-0 flex h-9 items-center justify-between",
        button_previous:
          "flex size-8 cursor-pointer items-center justify-center rounded-[6px] border border-solid border-portal-border text-portal-text disabled:cursor-not-allowed disabled:opacity-40",
        button_next:
          "flex size-8 cursor-pointer items-center justify-center rounded-[6px] border border-solid border-portal-border text-portal-text disabled:cursor-not-allowed disabled:opacity-40",
        month_grid: "w-full table-fixed border-collapse",
        weekdays: "grid grid-cols-7",
        weekday:
          "flex h-8 items-center justify-center text-body-xs font-medium text-portal-muted",
        week: "mt-1 grid grid-cols-7",
        day: "flex min-w-0 items-center justify-center p-0",
        day_button:
          "flex size-9 max-w-full cursor-pointer items-center justify-center rounded-[6px] text-body-sm text-portal-text hover:bg-portal-surface",
        selected:
          "[&_button]:bg-portal-dark [&_button]:text-portal-light [&_button]:hover:bg-portal-dark",
        today: "[&_button]:font-medium [&_button]:underline",
        outside: "[&_button]:text-portal-placeholder",
        disabled: "[&_button]:cursor-not-allowed [&_button]:opacity-40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...chevronProps }) =>
          orientation === "left" ? (
            <ChevronLeftIcon className="size-4" {...chevronProps} />
          ) : (
            <ChevronRightIcon className="size-4" {...chevronProps} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
