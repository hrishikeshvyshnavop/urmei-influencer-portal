import { useId, type ReactNode } from "react";

/**
 * The portal's multi-line input — `TextField`'s box (6px radius, 16/12px
 * padding, body-sm, dark border and soft ring on focus) for text that runs
 * over several lines. The review text, the sample request's message and
 * Manage Account's About me all use it, so they type and read the same.
 */
export default function TextArea({
  label,
  labelClassName = "text-body-sm font-medium text-portal-text",
  aside,
  value,
  onChange,
  placeholder,
  maxLength,
  heightClassName,
}: {
  label: ReactNode;
  /** The request message's label is body-md; everything else keeps body-sm. */
  labelClassName?: string;
  /** Right-aligned beside the label — About me's "12 / 160" counter. */
  aside?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  /** The box's fixed height, e.g. `h-[88px]`; the text scrolls inside it. */
  heightClassName: string;
}) {
  const id = useId();
  return (
    <div className="flex w-full flex-col items-start gap-1">
      <div className="flex w-full items-start justify-between gap-1">
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
        {aside}
      </div>
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${heightClassName} w-full resize-none rounded-[6px] border border-portal-border bg-portal-light px-4 py-3 text-body-sm text-portal-text outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-portal-placeholder focus:border-portal-dark focus:ring-2 focus:ring-portal-surface`}
      />
    </div>
  );
}
