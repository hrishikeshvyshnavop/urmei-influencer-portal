import { useRef, useState } from "react";

/** Six boxes, per Figma `1583:87696`. */
export const OTP_LENGTH = 6;

type OtpInputProps = {
  /** Announced on each box as "<label> digit N of 6". */
  label: string;
  /** Fires with the digits entered so far, e.g. `"2304"`. */
  onChange: (code: string) => void;
  autoFocus?: boolean;
};

/**
 * The login screen's one-time-code row (Figma `1583:87642` / `1583:87683`).
 *
 * Deliberately uncontrolled: the boxes own the digits and report the joined
 * code upwards. A controlled `value: string` would have to survive holes — a
 * backspace in the middle box leaves slot 2 empty while slot 3 is filled, and
 * a joined string can't express that without silently shifting every digit
 * left. The caller clears the row by remounting it with a new `key`, which is
 * what "Resend OTP" does.
 */
export default function OtpInput({ label, onChange, autoFocus = false }: OtpInputProps) {
  const boxes = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  );

  const focusBox = (index: number) => {
    boxes.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  };

  const commit = (next: string[]) => {
    setDigits(next);
    onChange(next.join(""));
  };

  /** Typing replaces the box's digit; a pasted code spills into the boxes
   *  after it, so the whole row can be filled from the first one. */
  const write = (index: number, typed: string) => {
    const incoming = typed.replace(/\D/g, "");
    if (!incoming) return;
    const next = [...digits];
    for (let offset = 0; offset < incoming.length && index + offset < OTP_LENGTH; offset += 1) {
      next[index + offset] = incoming[offset];
    }
    commit(next);
    focusBox(index + incoming.length);
  };

  const erase = (index: number) => {
    const next = [...digits];
    // Backspace on an empty box steps back and clears the digit behind it,
    // so holding it walks the code out one character at a time.
    const target = next[index] ? index : index - 1;
    if (target < 0) return;
    next[target] = "";
    commit(next);
    focusBox(target);
  };

  return (
    <div className="flex w-full max-w-[383px] items-start gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            boxes.current[index] = node;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          // `maxLength` would swallow a pasted six-digit code down to one
          // character, so the length is enforced in `write` instead.
          aria-label={`${label} digit ${index + 1} of ${OTP_LENGTH}`}
          autoFocus={autoFocus && index === 0}
          value={digit}
          onChange={(event) => write(index, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Backspace") {
              event.preventDefault();
              erase(index);
            } else if (event.key === "ArrowLeft") {
              event.preventDefault();
              focusBox(index - 1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              focusBox(index + 1);
            }
          }}
          onFocus={(event) => event.currentTarget.select()}
          className={`flex h-12 min-w-px flex-1 items-center justify-center rounded-[6px] border border-solid bg-portal-light px-4 py-3 text-center text-body-md font-medium text-portal-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-portal-dark focus:ring-2 focus:ring-portal-surface ${
            digit ? "border-portal-body" : "border-portal-border"
          }`}
        />
      ))}
    </div>
  );
}
