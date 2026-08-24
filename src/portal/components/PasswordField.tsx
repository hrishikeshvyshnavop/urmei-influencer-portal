import { useId, useState } from "react";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
};

export default function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  error,
  autoComplete = "new-password",
}: PasswordFieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <div className="flex items-start gap-1">
        <label
          htmlFor={id}
          className="text-body-sm font-medium whitespace-nowrap text-portal-text"
        >
          {label}
        </label>
        <img src="/urmei/icon-asterisk.svg" alt="required" className="block size-[6px]" />
      </div>

      <div
        className={`flex w-full items-center gap-1 overflow-clip rounded-[6px] border border-solid px-4 py-3 ${
          error ? "border-portal-alert" : "border-portal-border"
        }`}
      >
        <div className="flex min-w-px flex-1 items-center gap-1">
          <input
            id={id}
            type={revealed ? "text" : "password"}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            aria-invalid={Boolean(error)}
            className="w-full min-w-px bg-transparent text-body-sm text-portal-text outline-none placeholder:text-portal-placeholder"
          />
        </div>
        <button
          type="button"
          onClick={() => setRevealed((shown) => !shown)}
          aria-label={revealed ? `Hide ${label}` : `Show ${label}`}
          className={`relative size-[20px] shrink-0 cursor-pointer overflow-clip transition-opacity ${
            revealed ? "opacity-100" : "opacity-60"
          }`}
        >
          <span className="absolute inset-[20.83%_8.33%]">
            <span className="absolute inset-[-5.7%_-3.99%]">
              <img src="/urmei/icon-eye.svg" alt="" className="block size-full max-w-none" />
            </span>
          </span>
        </button>
      </div>

      {error ? (
        <div className="flex items-center gap-1">
          <span className="relative size-[12px] shrink-0 overflow-clip">
            <span className="absolute inset-[8.33%]">
              <span className="absolute inset-[-6.65%]">
                <img src="/urmei/icon-info.svg" alt="" className="block size-full max-w-none" />
              </span>
            </span>
          </span>
          <p className="text-body-xs whitespace-nowrap text-portal-alert">{error}</p>
        </div>
      ) : null}
    </div>
  );
}
