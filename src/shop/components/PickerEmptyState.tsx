import type { ReactNode } from 'react'

type PickerEmptyStateProps = {
  icon: ReactNode
  title: string
  body: string
  /** The outlined action under the text, e.g. Clear Search. */
  action?: ReactNode
}

/**
 * The empty state inside the Featured items dialog (`Picker empty state`,
 * main file `2799:104381`): a 64px icon well, a `Body/body-xl-medium` title
 * and a `Body/body-xs-regular` line, then the action 18px below.
 */
export function PickerEmptyState({ icon, title, body, action }: PickerEmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[18px] px-lg py-[19px]">
      <div className="flex w-full flex-col items-center gap-fourteen">
        <span className="flex size-[64px] items-center justify-center rounded-full bg-surface-tertiary-500">{icon}</span>
        <div className="flex w-full flex-col items-center gap-xs text-center">
          <p className="text-body-xl font-medium text-text-secondary-1000">{title}</p>
          <p className="text-body-xs text-text-secondary-700">{body}</p>
        </div>
      </div>
      {action}
    </div>
  )
}
