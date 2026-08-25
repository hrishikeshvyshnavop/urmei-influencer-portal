import { useEffect } from 'react'
import AppShell from '../../portal/components/AppShell'
import { ScaledBox } from '../components/ScaledBox'
import { ProductDetail, type ShopMode } from './ProductDetail'
import type { ShopItem } from '../types'

type ProductDetailPageProps = {
  item: ShopItem
  shopMode: ShopMode
  onBackToShop: () => void
}

/**
 * The standalone "already in my shop" product page (Figma `917:55880`) — a real
 * page with the site's own Header/Footer and a "My Shop › name" breadcrumb, not
 * an overlay. Reached by clicking a shop card or its "View product details"
 * menu action. Distinct from the transient in-overlay detail view shown right
 * after confirming "Add to shop" from the catalogue (Figma `1144:62070`), which
 * keeps the browse overlay's scrim and stays inside `BrowseOverlay`.
 */
export function ProductDetailPage({ item, shopMode, onBackToShop }: ProductDetailPageProps) {
  // This is an in-place state swap within `#/shop`, not a hash change, so
  // App.tsx's hash-based `scrollTo(0, 0)` never runs — without this, opening
  // the page keeps whatever scroll position My Shop was left at.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <AppShell
      className="bg-surface-secondary-100"
      onShowTour={() => { window.location.hash = '#/home/tour' }}
      onShowHelp={() => { window.location.hash = '#/help-center' }}
    >
      <div className="flex w-full flex-1 justify-center">
        <ScaledBox width={1440} className="flex flex-col items-start">
          <ProductDetail
            product={item.product}
            breadcrumbItems={[{ label: 'My Shop', onClick: onBackToShop }, { label: item.product.name }]}
            shopMode={shopMode}
          />
        </ScaledBox>
      </div>
    </AppShell>
  )
}
