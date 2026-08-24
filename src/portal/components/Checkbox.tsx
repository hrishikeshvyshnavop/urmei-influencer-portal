import type { ReactNode } from "react";
import { useId } from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export default function Checkbox({ checked, onChange, children }: CheckboxProps) {
  const id = useId();

  return (
    <div className="flex w-full items-center gap-2">
      <button
        type="button"
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative block size-[16px] shrink-0 cursor-pointer"
      >
        <span className="absolute inset-0 rounded-[4px] border border-solid border-portal-border" />
        {checked ? (
          <span className="absolute top-1/2 left-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
            <span className="absolute inset-[22.06%_13.35%]">
              <img
                src="/urmei/icon-checkbox-check.svg"
                alt=""
                className="absolute inset-0 block size-full max-w-none"
              />
            </span>
          </span>
        ) : null}
      </button>
      <p className="text-body-sm font-medium whitespace-nowrap text-portal-text">
        {children}
      </p>
    </div>
  );
}
