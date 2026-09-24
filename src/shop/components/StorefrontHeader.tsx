import LanguageSelector from '../../portal/components/LanguageSelector'
import { Icon } from './Icon'
import { ScaledBox } from './ScaledBox'

/** The header's fixed height in design px (Figma `916:66644`). `min-h` keeps it
 *  stable even on viewports narrow enough for `LanguageSelector` to hide. */
const HEADER_HEIGHT = 88
/** `py-md-2`, top and bottom. */
const HEADER_PADDING_Y = 2 * 20

/** Top bar of the storefront preview: wordmark, country/language switcher, and
 *  a close button. `StorefrontPreview` is what makes this stick — see the
 *  sticky-vs-`ScaledBox` note there. The bar itself spans the window, like
 *  the portal's `AppHeader`; only its contents sit in the scaled 1440px design
 *  column, so they line up with the page below it. */
export function StorefrontHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex w-full justify-center rounded-b-[16px] border-b border-border-default bg-surface-secondary-100">
      <ScaledBox width={1440} className="px-margin py-md-2">
        <div
          className="flex w-full items-center justify-between"
          style={{ minHeight: HEADER_HEIGHT - HEADER_PADDING_Y }}
        >
          <button type="button" onClick={onClose} className="flex items-center gap-md-2">
            <img src="/assets/img/urmei-mark.svg" alt="" className="h-[16px] w-[29.573px]" />
            <p className="text-body-lg font-medium text-text-secondary-1000">Your shop preview</p>
          </button>
          <div className="flex items-center gap-md-2">
            <LanguageSelector />
            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="flex size-[38px] items-center justify-center overflow-clip"
            >
              <Icon name="x" size={24} />
            </button>
          </div>
        </div>
      </ScaledBox>
    </header>
  )
}
