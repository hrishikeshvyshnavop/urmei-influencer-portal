import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";

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
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid p-4 transition-[border-color,box-shadow] duration-200 focus-within:border-portal-dark focus-within:ring-2 focus-within:ring-portal-surface ${
          error ? "border-portal-alert" : "border-portal-border"
        }`}
      >
        <div className="flex min-w-px flex-1 items-center gap-1">
          <input
            id={id}
            name={autoComplete}
            type={isPassword && revealed ? "text" : type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            className="w-full min-w-px bg-transparent text-body-md text-portal-text outline-none placeholder:text-portal-placeholder"
          />
        </div>
        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((shown) => !shown)}
            aria-label={revealed ? `Hide ${label}` : `Show ${label}`}
            aria-pressed={revealed}
            className="relative size-[20px] shrink-0 cursor-pointer overflow-hidden rounded-sm text-portal-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-dark"
          >
            {revealed ? (
              <EyeOff aria-hidden="true" className="size-5" strokeWidth={1.5} />
            ) : (
              <Eye aria-hidden="true" className="size-5" strokeWidth={1.5} />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="motion-feedback flex items-center gap-1">
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
