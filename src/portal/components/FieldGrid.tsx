import TextField from "./TextField";
import type { FieldSpec } from "../form-fields";

type FieldGridProps = {
  fields: FieldSpec[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  /** While false, no field shows an error even if it's empty. */
  showErrors?: boolean;
  /**
   * Extra per-field rules on top of the standing "required and empty" check,
   * which every screen shares. Returning a string overrides that check for
   * the field; returning `undefined` keeps it. The apply form uses this for
   * the 18-and-over birthday rule and the email format.
   */
  errorFor?: (field: FieldSpec, value: string) => string | undefined;
  /**
   * Which fields have earned the green tick. Runtime state rather than part of
   * `FieldSpec`, since it depends on the value: step 2 uses it for a username
   * confirmed available.
   */
  validFor?: (field: FieldSpec, value: string) => boolean;
};

/**
 * The two-column field grid every portal form renders (Figma `1583:88090`:
 * `grid-cols-2`, 16px gutters, single column below `sm`). Shared so the apply
 * form, Review Details and the setup steps stay one layout rather than four
 * copies that drift apart.
 */
export default function FieldGrid({
  fields,
  values,
  onChange,
  showErrors = false,
  errorFor,
  validFor,
}: FieldGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const value = values[field.name] ?? "";
        const override = errorFor?.(field, value);
        const error =
          override ??
          (showErrors && !field.optional && !value.trim()
            ? `${field.label} is required.`
            : undefined);

        return (
          // A `fullWidth` field spans the gutter instead of taking one column
          // (the account modals' Address Label, phone and holder-type rows).
          <div key={field.name} className={field.fullWidth ? "sm:col-span-2" : undefined}>
          <TextField
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            icon={field.icon}
            autoComplete={field.autoComplete}
            options={field.options}
            numericOnly={field.numericOnly}
            maxLength={field.maxLength}
            latestDate={field.latestDate}
            locked={field.locked}
            hint={field.hint}
            prefix={field.prefix}
            required={field.required}
            value={value}
            error={error}
            valid={validFor?.(field, value)}
            onChange={(next) => onChange(field.name, next)}
          />
          </div>
        );
      })}
    </div>
  );
}
