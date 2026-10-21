import { useRef } from 'react'
import AppShell from '../../portal/components/AppShell'
import SetupBanner from '../../portal/components/SetupBanner'
import { requestProductTour } from '../../portal/tour-status'
import { AddProductTile } from '../components/AddProductTile'
import { Button } from '../components/Button'
import { CollectionCard } from '../components/CollectionCard'
import { CollectionPage } from '../components/CollectionPage'
import { useFlip } from '../hooks/useFlip'
import { EmptyCollections } from '../components/EmptyCollections'
import { EmptyShop } from '../components/EmptyShop'
import { Icon } from '../components/Icon'
import { ShopProductCard } from '../components/ShopProductCard'
import { StatsRow } from '../components/StatsRow'
import { hasLiveLink } from '../data/shop'
import { statsRowEntries } from '../data/stats'
import { StoreCard } from '../components/StoreCard'
import { Tabs } from '../components/Tabs'
import type { Collection } from '../collections-store'
import type { ShopItem } from '../types'
import { navigate } from '../../router'

type MyShopProps = {
  items: ShopItem[]
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
  onAddToCollection: (item: ShopItem) => void
  onRemoveFromShop: (item: ShopItem) => void
  collections: Collection[]
  onNewCollection: () => void
  onMoveCollection: (id: string, direction: 'earlier' | 'later') => void
  onEditCollection: (collection: Collection) => void
  onDeleteCollection: (collection: Collection) => void
  /** The collection page open inside the Collections tab, if any (flow 08). */
  openCollectionId: string | null
  onOpenCollection: (id: string | null) => void
  onCopyCollectionLink: (collection: Collection, from: 'page' | 'board') => void
  onRemoveFromCollection: (item: ShopItem, collection: Collection) => void
  /** Opens the catalogue to fill this collection (flow 09). */
  onAddProductsToCollection: (collection: Collection) => void
  /** The last board moved with the arrows, and whether the save held: it
   *  lifts while sliding, or shakes as it snaps back. `at` restarts the
   *  animation on repeated moves of the same board. */
  boardMotion: { id: string; kind: 'moved' | 'failed'; at: number } | null
}

export function MyShop({
  items,
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
  onAddToCollection,
  onRemoveFromShop,
  collections,
  onNewCollection,
  onMoveCollection,
  onEditCollection,
  onDeleteCollection,
  openCollectionId,
  onOpenCollection,
  onCopyCollectionLink,
  onRemoveFromCollection,
  onAddProductsToCollection,
  boardMotion,
}: MyShopProps) {
  const boardsRef = useRef<HTMLDivElement>(null)
  useFlip(boardsRef, collections.map((collection) => collection.id).join('|'))
  const isEmpty = items.length === 0
  // Adding a product resolves a blocked publish attempt immediately, even
  // before the user publishes again.
  const blocked = publishBlocked && isEmpty
  // Collections replace the Favorites tab (`T-41`, Figma `1862:87949`).
  const isCollectionsTab = activeTab === 'collections'

  const tabs = [
    { id: 'all', label: isEmpty ? 'All Picks ' : `All Picks (${items.length})` },
    { id: 'collections', label: `Collections (${collections.length})` },
  ]

  const heading = isCollectionsTab ? `Collections (${collections.length})` : 'Your Picks '
  // With no boards there is nothing to reorder, so the design drops the
  // arrows hint (Figma `1862:87353`).
  const subtitle = isCollectionsTab
    ? collections.length === 0
      ? 'Group your picks into boards shoppers can browse on your storefront'
      : 'Group your picks into boards. Use the arrows to set the order shoppers see'
    : 'Everything you add appears here'
  const itemsById = new Map(items.map((item) => [item.id, item]))
  const itemsOf = (collection: Collection) =>
    collection.itemIds
      .map((id) => itemsById.get(id))
      .filter((item): item is ShopItem => item !== undefined)
  const openCollection = isCollectionsTab
    ? collections.find((collection) => collection.id === openCollectionId) ?? null
    : null

  return (
    <AppShell
      className="bg-surface-secondary-100"
      onShowTour={requestProductTour}
      onShowHelp={() => { navigate('/help-center') }}
      footerBelowFold
    >
      <SetupBanner />
      <main className="mx-auto flex flex-1 w-full max-w-[1440px] flex-col items-start gap-3xl px-6 pt-8 pb-16 lg:px-[120px]">
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
              <StatsRow
                stats={statsRowEntries(items, 'shop')}
                showPeriod
              />
            )}
          </div>
        </section>

        <section className="flex w-full flex-col items-center gap-3xl">
          <Tabs tabs={tabs} activeId={activeTab} onChange={onTabChange} />

          {openCollection ? (
            <CollectionPage
              collection={openCollection}
              items={itemsOf(openCollection)}
              publishedAt={publishedAt}
              onBack={() => onOpenCollection(null)}
              onCopyLink={() => onCopyCollectionLink(openCollection, 'page')}
              onEditDetails={() => onEditCollection(openCollection)}
              onDelete={() => onDeleteCollection(openCollection)}
              onViewDetails={onViewDetails}
              onCopyAffiliateLink={onCopyLink}
              onRemoveFromCollection={(item) => onRemoveFromCollection(item, openCollection)}
              onRemoveFromShop={onRemoveFromShop}
              onAddProducts={() => onAddProductsToCollection(openCollection)}
            />
          ) : (
          <div className="flex w-full flex-col items-start gap-lg">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-1 flex-col gap-[6px]">
                <p className="text-body-xxl text-text-primary-1000">{heading}</p>
                <p className="text-body-md text-text-secondary-700">{subtitle}</p>
              </div>
              {isCollectionsTab ? (
                <Button variant="outline" onClick={onNewCollection} leftIcon={<Icon name="plus" />}>
                  New Collection
                </Button>
              ) : (
                <Button variant="outline" onClick={onBrowse} leftIcon={<Icon name="plus" />}>
                  Add product
                </Button>
              )}
            </div>

            <div className="flex w-full flex-col items-start bg-surface-secondary-100">
              {/* Checked before `isEmpty`: collections show even when the
                  shop has no products yet (every shop starts with Favourites). */}
              {isCollectionsTab && collections.length === 0 ? (
                <EmptyCollections onNewCollection={onNewCollection} />
              ) : isCollectionsTab ? (
                // Four 282px boards fill the 1200px column exactly (24px gaps,
                // 26px between rows, as in the design).
                <div ref={boardsRef} className="flex w-full flex-wrap gap-x-lg gap-y-[26px]">
                  {collections.map((collection, index) => (
                    // The outer box slides (useFlip); the moved board sits above
                    // its neighbours while they pass each other.
                    <div
                      key={collection.id}
                      data-flip-key={collection.id}
                      className={boardMotion?.id === collection.id ? 'relative z-[1]' : undefined}
                    >
                    {/* Re-keyed on each move so the lift / shake replays. */}
                    <div
                      key={boardMotion?.id === collection.id ? boardMotion.at : 'still'}
                      className={
                        boardMotion?.id === collection.id
                          ? boardMotion.kind === 'moved'
                            ? 'motion-board-lift rounded-t-md'
                            : 'motion-board-nudge'
                          : undefined
                      }
                    >
                    <CollectionCard
                      collection={collection}
                      items={itemsOf(collection)}
                      onOpen={() => onOpenCollection(collection.id)}
                      position={index + 1}
                      canMoveEarlier={index > 0}
                      canMoveLater={index < collections.length - 1}
                      onMove={(direction) => onMoveCollection(collection.id, direction)}
                      menuActions={[
                        { label: 'Edit details', onSelect: () => onEditCollection(collection) },
                        {
                          label: 'Copy collection link',
                          disabled: publishedAt === null,
                          onSelect: () => onCopyCollectionLink(collection, 'board'),
                        },
                        {
                          label: 'Delete collection',
                          destructive: true,
                          onSelect: () => onDeleteCollection(collection),
                        },
                      ]}
                    />
                    </div>
                    </div>
                  ))}
                </div>
              ) : isEmpty ? (
                <EmptyShop onBrowse={onBrowse} />
              ) : (
                // Columns of at least 280px, as on the storefront: four across
                // the 1200px column, stepping down to three and then two as
                // the window narrows instead of squeezing four cards into it.
                <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-lg">
                  {items.map((item) => (
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
                      onAddToCollection={() => onAddToCollection(item)}
                      onRemoveFromShop={() => onRemoveFromShop(item)}
                    />
                  ))}
                  <AddProductTile onClick={onBrowse} />
                </div>
              )}
            </div>
          </div>
          )}
        </section>
      </main>
    </AppShell>
  )
}
