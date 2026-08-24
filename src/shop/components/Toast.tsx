import { Icon } from './Icon'

type ToastAction = { label: string; onClick: () => void }

type ToastProps = {
  message: string
  /**
   * Distance from the top of the viewport. The flows place the toast
   * differently: 92px inside the browse overlay, 150px on the My Shop page.
   */
  top?: number
  /** check-circle (success, default) or x-circle (blocked/error). */
  variant?: 'success' | 'error'
  /** e.g. "Manage Slot" on the featured-slots-full toast — fixes the toast at 400px wide. */
  action?: ToastAction
}

export function Toast({ message, top = 92, variant = 'success', action }: ToastProps) {
  return (
    <div
      role="status"
      className={[
        'fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-md-sm rounded-md bg-surface-primary-500 p-md-sm',
        action ? 'w-[400px] justify-between' : 'w-fit',
      ].join(' ')}
      style={{ top }}
    >
      <span className="flex items-center gap-sm">
        <Icon name={variant === 'success' ? 'check-circle' : 'x-circle'} size={22} />
        <span className="truncate text-body-sm font-medium text-text-secondary-100">
          {message}
        </span>
      </span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="flex shrink-0 items-center justify-center gap-sm rounded-md border border-border-default px-sm py-xs text-body-xs font-medium whitespace-nowrap text-text-secondary-100 capitalize"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
