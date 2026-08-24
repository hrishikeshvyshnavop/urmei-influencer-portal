type ToggleProps = {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  /**
   * Visual-only lock — unlike a native `disabled` button, clicks still reach
   * `onChange` so a caller can react to an attempt to flip it (e.g. show a
   * toast) instead of the click being silently swallowed.
   */
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        'flex h-[20px] w-[36.667px] shrink-0 items-center rounded-full p-[1.667px] transition-colors',
        checked ? 'bg-surface-primary-500' : 'bg-surface-secondary-400',
        disabled ? 'cursor-not-allowed opacity-50' : '',
      ].join(' ')}
    >
      <span
        className={[
          'size-[16.667px] rounded-full bg-surface-secondary-100 transition-transform',
          checked ? 'translate-x-[16.667px]' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}
