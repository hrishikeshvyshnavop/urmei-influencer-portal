import AppShell from '../../portal/components/AppShell'
import SetupBanner from '../../portal/components/SetupBanner'
import { requestProductTour } from '../../portal/tour-status'
import { AddProductTile } from '../components/AddProductTile'
import { Button } from '../components/Button'
import { EmptyFavorites } from '../components/EmptyFavorites'
import { EmptyShop } from '../components/EmptyShop'
import { Icon } from '../components/Icon'
import { ShopProductCard } from '../components/ShopProductCard'
import { StatsRow } from '../components/StatsRow'
import { hasLiveLink } from '../data/shop'
import { statsRowEntries } from '../data/stats'
import { StoreCard } from '../components/StoreCard'
import { Tabs } from '../components/Tabs'
import type { ShopItem } from '../types'

type MyShopProps = {
  items: ShopItem[]
  favoriteLimit: number
  activeTab: string
  onTabChange: (id: string) => void
  onBrowse: () => void
  onPreview: () => void
  onViewShop: () => void
  published: boolean
  publishedAt: number | null
  hasUnpublishedChanges: boolean
  /** Set after publishing was attempted with zero products — see `StoreCard`. */
  publishBlocked: boolean
  onPublish: () => void
  onViewDetails: (item: ShopItem) => void
  onCopyLink: (item: ShopItem) => void
  onToggleFavorite: (item: ShopItem) => void
  onRemoveFromShop: (item: ShopItem) => void
  onReorderFavorite: (id: string, direction: 'up' | 'down') => void
  onRequestSample: (item: ShopItem) => void
  requestSampleLabelFor: (productId: string) => string
}

export function MyShop({
  items,
  favoriteLimit,
  activeTab,
  onTabChange,
  onBrowse,
  onPreview,
  onViewShop,
  published,
  publishedAt,
  hasUnpublishedChanges,
  publishBlocked,
  onPublish,
  onViewDetails,
  onCopyLink,
  onToggleFavorite,
  onRemoveFromShop,
  onReorderFavorite,
  onRequestSample,
  requestSampleLabelFor,
}: MyShopProps) {
  const favoriteItems = items.filter((item) => item.favorite)
  const isEmpty = items.length === 0
  // Adding a product resolves a blocked publish attempt immediately, even
  // before the user publishes again.
  const blocked = publishBlocked && isEmpty
  const isFavoriteTab = activeTab === 'favorites'

  const tabs = isEmpty
    ? [
        { id: 'all', label: 'All Picks ' },
        { id: 'favorites', label: 'Favorites' },
      ]
    : [
        { id: 'all', label: `All Picks (${items.length})` },
        {
          id: 'favorites',
          label: favoriteItems.length > 0 ? `Favorites (${favoriteItems.length})` : 'Favorites',
        },
      ]

  const heading = isFavoriteTab ? `Favorite products (${favoriteItems.length}/${favoriteLimit})` : 'Your Picks '
  const subtitle = isFavoriteTab
    ? 'Products here appear first in your storefront'
    : 'Everything you add appears here'

  const visibleItems = isFavoriteTab ? favoriteItems : items

  return (
    <AppShell
      className="bg-surface-secondary-100"
      onShowTour={requestProductTour}
      onShowHelp={() => { window.location.hash = '#/help-center' }}
    >
      <SetupBanner />
      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1440px] flex-col items-start gap-3xl px-6 pt-8 pb-16 lg:px-[120px]">
        <section className="flex w-full flex-col items-start gap-xl">
          <div className="flex flex-col gap-xs">
            <h1 className="text-h6 font-semibold text-text-secondary-1000 uppercase">My Shop</h1>
            <p className="text-body-md text-text-secondary-700">Your curated URMEI storefront.</p>
          </div>

          <div className="flex w-full flex-col items-center overflow-clip rounded-lg bg-surface-secondary-300 shadow-store-card">
            <StoreCard
              attachedBelow
              published={published}
              publishedAt={publishedAt}
              hasUnpublishedChanges={hasUnpublishedChanges}
              publishBlocked={blocked}
              hasProducts={!isEmpty}
              onPublish={onPublish}
              onPreview={onPreview}
              onViewShop={onViewShop}
            />
            {(published || blocked) && (
              <StatsRow stats={statsRowEntries(items)} />
            )}
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-3xl">
          <Tabs tabs={tabs} activeId={activeTab} onChange={onTabChange} />

          <div className="flex w-full flex-col items-start gap-lg">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 flex-col gap-[6px]">
                <p className="text-body-xxl text-text-primary-1000">{heading}</p>
                <p className="text-body-md text-text-secondary-700">{subtitle}</p>
              </div>
              {!isFavoriteTab && (
                <Button variant="outline" onClick={onBrowse} leftIcon={<Icon name="plus" />}>
                  Add product
                </Button>
              )}
            </div>

            <div className="flex w-full flex-col items-start bg-surface-secondary-100">
              {/* Checked before `isEmpty` so the Favorite tab always shows its
                  own empty state — including when the shop has no products
                  at all — rather than falling back to `EmptyShop`. */}
              {isFavoriteTab && favoriteItems.length === 0 ? (
                <EmptyFavorites limit={favoriteLimit} onGoToAllPicks={() => onTabChange('all')} />
              ) : isEmpty ? (
                <EmptyShop onBrowse={onBrowse} />
              ) : (
                <div className="grid w-full grid-cols-4 gap-lg">
                  {visibleItems.map((item) => (
                    <ShopProductCard
                      key={item.id}
                      item={item}
                      onViewDetails={() => onViewDetails(item)}
                      // Left off entirely until the product is on the live
                      // storefront: there is no link to copy before that, and
                      // the frame's menu simply has one fewer row.
                      onCopyLink={
                        hasLiveLink(item, publishedAt) ? () => onCopyLink(item) : undefined
                      }
                      onToggleFavorite={() => onToggleFavorite(item)}
                      onRemoveFromShop={() => onRemoveFromShop(item)}
                      onRequestSample={() => onRequestSample(item)}
                      requestSampleLabel={requestSampleLabelFor(item.product.id)}
                      favoriteRank={
                        isFavoriteTab
                          ? {
                              rank: favoriteItems.findIndex((f) => f.id === item.id) + 1,
                              canMoveUp: favoriteItems.findIndex((f) => f.id === item.id) > 0,
                              canMoveDown:
                                favoriteItems.findIndex((f) => f.id === item.id) <
                                favoriteItems.length - 1,
                            }
                          : undefined
                      }
                      onReorder={
                        isFavoriteTab ? (direction) => onReorderFavorite(item.id, direction) : undefined
                      }
                    />
                  ))}
                  {/* Only All Picks gets a trailing "add" tile — the Favorite
                      tab manages its slots via each card's own menu instead. */}
                  {!isFavoriteTab && <AddProductTile onClick={onBrowse} />}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
