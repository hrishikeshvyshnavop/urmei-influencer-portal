import { useId } from "react";
import type { ReactNode } from "react";

type EmailFieldProps = {
  label: string;
  type: "email" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
  /** Optional control rendered at the far end of the label row. */
  trailing?: ReactNode;
};

/**
 * The portal's larger input (16px padding, body-md text) used by the login and
 * password-reset screens — distinct from the compact `TextField` on the
 * application form.
 */
export default function EmailField({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
  trailing,
}: EmailFieldProps) {
  const id = useId();

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <div className="flex w-full items-center justify-between gap-1">
        <div className="flex items-start gap-1">
          <label
            htmlFor={id}
            className="text-body-sm font-medium whitespace-nowrap text-portal-text"
          >
            {label}
          </label>
          <img
            src="/urmei/icon-asterisk.svg"
            alt="required"
            className="block size-[6px]"
          />
        </div>
        {trailing}
      </div>

      <div
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid p-4 ${
          error ? "border-portal-alert" : "border-portal-border"
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
            aria-invalid={Boolean(error)}
            className="w-full min-w-px bg-transparent text-body-md text-portal-text outline-none placeholder:text-portal-placeholder"
          />
        </div>
      </div>

      {error ? (
        <div className="flex items-center gap-1">
          <span className="relative size-[12px] shrink-0 overflow-clip">
            <span className="absolute inset-[8.33%]">
              <span className="absolute inset-[-5%]">
                <img
                  src="/urmei/icon-info.svg"
                  alt=""
                  className="block size-full max-w-none"
                />
              </span>
            </span>
          </span>
          <p className="text-body-xs whitespace-nowrap text-portal-alert">{error}</p>
        </div>
      ) : null}
    </div>
  );
}
