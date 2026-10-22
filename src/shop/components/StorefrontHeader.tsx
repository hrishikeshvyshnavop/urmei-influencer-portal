import { Icon } from './Icon'
import { ScaledBox } from './ScaledBox'

/** Top bar of the storefront preview (`Preview header`, main file
 *  `2799:104150`): the URMEI wordmark and "Your shop preview" on a grey bar,
 *  and an outlined close button. `StorefrontPreview` is what makes this stick —
 *  see the sticky-vs-`ScaledBox` note there. The bar itself spans the window,
 *  like the portal's `AppHeader`; only its contents sit in the scaled 1440px
 *  design column, so they line up with the page below it. */
export function StorefrontHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex w-full justify-center bg-surface-secondary-300">
      <ScaledBox width={1440} className="px-margin py-md-2">
        <div className="flex w-full items-center justify-between">
          <button type="button" onClick={onClose} className="flex items-center gap-md">
            <img src="/assets/img/urmei-logo.svg" alt="URMEI" className="h-[16px] w-[108.757px]" />
            <p className="text-body-md text-text-secondary-1000">Your shop preview</p>
          </button>
          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="flex size-10 items-center justify-center overflow-clip rounded-md border border-border-default"
          >
            <Icon name="x" size={16} srcSize={24} />
          </button>
        </div>
      </ScaledBox>
    </header>
  )
}
