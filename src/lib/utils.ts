import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The theme names its font sizes `text-body-*` / `text-h*` (see `@theme` in
 * `global.css`), and its text colours `text-text-*` / `text-portal-*`. Plain
 * `twMerge` can't tell those apart — it read both as text *colours* and
 * dropped the earlier one as a conflict. Every `Button` variant sets a size
 * and a colour together, so all of them silently lost their font size and
 * fell back to the inherited 16px instead of the 14px the design specifies.
 * Declaring the size utilities here keeps both.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "body-xxs",
            "body-xs",
            "body-sm",
            "body-md",
            "body-lg",
            "body-xl",
            "body-xxl",
            "h2",
            "h3",
            "h6",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
