import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui Checkbox, themed with the portal's tokens in place of shadcn's
 * default theme variables: `Type=Default` is a 1px `border/color/default`
 * outline, `Type=Selected` fills with `surface/primary/500` and tints the tick
 * `typography/color/tertiary/100`.
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-solid border-portal-border outline-none transition-colors",
        "data-[state=checked]:border-portal-dark data-[state=checked]:bg-portal-dark data-[state=checked]:text-portal-tick",
        "focus-visible:ring-[3px] focus-visible:ring-portal-dark/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
