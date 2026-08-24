type CheckboxProps = {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
}

/** The checkbox-with-label row used throughout the Search Results filters (Figma `1184:70079`). */
export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-sm overflow-clip rounded-xs py-sm"
    >
      <span
        className={[
          'flex size-[16px] shrink-0 items-center justify-center rounded-xs border',
          checked ? 'border-surface-primary-500 bg-surface-primary-500' : 'border-border-default',
        ].join(' ')}
      >
        {checked && (
          <img src="/assets/icons/checkbox-check.svg" alt="" className="h-[8px] w-[10px]" />
        )}
      </span>
      <span className="text-body-sm font-medium text-text-secondary-1000">{label}</span>
    </button>
  )
}
