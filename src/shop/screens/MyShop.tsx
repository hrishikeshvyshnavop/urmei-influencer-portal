import AppShell from '../../portal/components/AppShell'
import SetupBanner from '../../portal/components/SetupBanner'
import { AddProductTile } from '../components/AddProductTile'
import { Button } from '../components/Button'
import { EmptyShop } from '../components/EmptyShop'
import { Icon } from '../components/Icon'
import { ShopProductCard } from '../components/ShopProductCard'
import { StatsRow } from '../components/StatsRow'
import { StoreCard } from '../components/StoreCard'
import { Tabs } from '../components/Tabs'
import type { ShopItem } from '../types'

type MyShopProps = {
  items: ShopItem[]
  featuredLimit: number
  activeTab: string
  onTabChange: (id: string) => void
  onBrowse: () => void
  onPreview: () => void
  onViewShop: () => void
  published: boolean
  publishedAt: string | null
  hasUnpublishedChanges: boolean
  onPublish: () => void
  onViewDetails: (item: ShopItem) => void
  onCopyLink: (item: ShopItem) => void
  onToggleFeatured: (item: ShopItem) => void
  onRemoveFromShop: (item: ShopItem) => void
  onReorderFeatured: (id: string, direction: 'up' | 'down') => void
}

export function MyShop({
  items,
  featuredLimit,
  activeTab,
  onTabChange,
  onBrowse,
  onPreview,
  onViewShop,
  published,
  publishedAt,
  hasUnpublishedChanges,
  onPublish,
  onViewDetails,
  onCopyLink,
  onToggleFeatured,
  onRemoveFromShop,
  onReorderFeatured,
}: MyShopProps) {
  const featuredItems = items.filter((item) => item.featured)
  const isEmpty = items.length === 0
  const isFeaturedTab = activeTab === 'featured'

  const tabs = isEmpty
    ? [
        { id: 'all', label: 'All Picks ' },
        { id: 'featured', label: 'Featured' },
      ]
    : [
        { id: 'all', label: `All Picks (${items.length})` },
        { id: 'featured', label: `Featured (${featuredItems.length})` },
      ]

  const heading = isFeaturedTab ? `Featured products (${featuredItems.length}/${featuredLimit})` : 'Your Picks '
  const subtitle = isFeaturedTab
    ? 'Products here appears first in your storefront'
    : 'Everything you add appears here'

  const visibleItems = isFeaturedTab ? featuredItems : items

  return (
    <AppShell
      className="bg-surface-secondary-100"
      onShowTour={() => { window.location.hash = '#/home/tour' }}
      onShowHelp={() => { window.location.hash = '#/help-center' }}
    >
      <SetupBanner />
      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1440px] flex-col items-start gap-3xl px-6 pt-8 pb-16 lg:px-[120px]">
        <section className="flex w-full flex-col items-start gap-xl">
          <div className="flex flex-col gap-xs">
            <h1 className="text-h6 font-semibold text-text-secondary-1000 uppercase">My Shop</h1>
            <p className="text-body-md text-text-secondary-700">Your curated URMEI storefront.</p>
          </div>

          {isEmpty ? (
            <StoreCard />
          ) : (
            <div className="flex w-full flex-col items-center overflow-clip rounded-lg bg-surface-secondary-300 shadow-store-card">
              <StoreCard
                attachedBelow
                canPublish
                published={published}
                publishedAt={publishedAt}
                hasUnpublishedChanges={hasUnpublishedChanges}
                onPublish={onPublish}
                onPreview={onPreview}
                onViewShop={onViewShop}
              />
              {published && (
                <StatsRow
                  stats={[
                    { label: 'TOTAL PRODUCTS', value: String(items.length) },
                    { label: 'FEATURED PRODUCTS', value: String(featuredItems.length) },
                    { label: 'CLICKS', value: '0%' },
                    { label: 'SALES', value: '0' },
                    { label: 'COMMISSION EARNED', value: 'S$0' },
                  ]}
                />
              )}
            </div>
          )}
        </section>

        <section className="flex w-full flex-col items-center gap-3xl">
          <Tabs tabs={tabs} activeId={activeTab} onChange={onTabChange} />

          <div className="flex w-full flex-col items-start gap-lg">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 flex-col gap-[6px]">
                <p className="text-body-xxl text-text-primary-1000">{heading}</p>
                <p className="text-body-md text-text-secondary-700">{subtitle}</p>
              </div>
              {!isFeaturedTab && (
                <Button variant="outline" onClick={onBrowse} leftIcon={<Icon name="plus" />}>
                  Add product
                </Button>
              )}
            </div>

            <div className="flex w-full flex-col items-start bg-surface-secondary-100">
              {isEmpty ? (
                <EmptyShop onBrowse={onBrowse} />
              ) : (
                <div className="grid w-full grid-cols-4 gap-lg">
                  {visibleItems.map((item) => (
                    <ShopProductCard
                      key={item.id}
                      item={item}
                      onViewDetails={() => onViewDetails(item)}
                      onCopyLink={() => onCopyLink(item)}
                      onToggleFeatured={() => onToggleFeatured(item)}
                      onRemoveFromShop={() => onRemoveFromShop(item)}
                      featuredRank={
                        isFeaturedTab
                          ? {
                              rank: featuredItems.findIndex((f) => f.id === item.id) + 1,
                              canMoveUp: featuredItems.findIndex((f) => f.id === item.id) > 0,
                              canMoveDown:
                                featuredItems.findIndex((f) => f.id === item.id) <
                                featuredItems.length - 1,
                            }
                          : undefined
                      }
                      onReorder={
                        isFeaturedTab ? (direction) => onReorderFeatured(item.id, direction) : undefined
                      }
                    />
                  ))}
                  {/* All Picks has no cap, so its "add" tile always trails the grid. The
                      Featured tab caps at `featuredLimit` — one trailing tile to add the
                      next one while there's room, none once full. */}
                  {!isFeaturedTab && <AddProductTile onClick={onBrowse} />}
                  {isFeaturedTab && featuredItems.length < featuredLimit && (
                    <AddProductTile onClick={onBrowse} height={468} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  )
}
