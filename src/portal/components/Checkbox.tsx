import type { ReactNode } from "react";
import { useId } from "react";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

/** Portal `checkbox-with-label`: the shadcn checkbox plus its 14px label. */
export default function Checkbox({
  checked,
  onChange,
  children,
}: CheckboxProps) {
  const id = useId();

  return (
    <div className="flex w-full items-center gap-2">
      <ShadcnCheckbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value === true)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-body-sm font-medium whitespace-nowrap text-portal-text"
      >
        {children}
      </label>
    </div>
  );
}
