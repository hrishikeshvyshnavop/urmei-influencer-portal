import { useState, type InputHTMLAttributes } from "react";
import { Icon } from "../../shop/components/Icon";

type SearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onSubmit" | "type" | "className"
> & {
  value: string;
  onChange: (value: string) => void;
  /**
   * Makes the box a `role="search"` form that submits the trimmed query on
   * Enter. Without it the field filters as you type and has no submit.
   */
  onSubmit?: (query: string) => void;
  /** Runs after the clear button empties the field. */
  onClear?: () => void;
  /** Sizes the box — width, margins. The chrome itself is fixed. */
  className?: string;
};

/**
 * The one search box every screen uses — the header's product search, the
 * catalogue, the Brands, Sample Requests, Your Reviews and stat-page filters,
 * and the filter rail's brand search. 40px tall, the design's search glyph, a
 * border that darkens while focused or filled, and a clear button once there
 * is text. Callers only choose the width (`className`) and wire the input;
 * autocomplete lists stay with the screens that have them.
 */
export function SearchField({
  value,
  onChange,
  onSubmit,
  onClear,
  className = "",
  onFocus,
  onBlur,
  ...inputProps
}: SearchFieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const box = [
    "flex h-10 items-center gap-sm rounded-sm border bg-surface-secondary-100 px-md-sm transition-colors duration-150",
    active ? "border-surface-primary-500" : "border-border-default",
    className,
  ].join(" ");

  const contents = (
    <>
      <Icon name="search" />
      <input
        {...inputProps}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        className="min-w-0 flex-1 bg-transparent text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-700 [&::-webkit-search-cancel-button]:hidden"
      />
      {value.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          // Keep focus in the field so an open suggestion list stays put.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            onChange("");
            onClear?.();
          }}
          className="flex shrink-0 items-center justify-center rounded-sm p-xs"
        >
          <Icon name="x" srcSize={24} />
        </button>
      )}
    </>
  );

  if (!onSubmit) return <label className={box}>{contents}</label>;

  return (
    <form
      role="search"
      className={box}
      onSubmit={(event) => {
        event.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
    >
      {contents}
    </form>
  );
}
