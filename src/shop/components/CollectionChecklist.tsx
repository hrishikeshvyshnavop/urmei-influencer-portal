import { useState } from 'react'
import { SearchField } from '../../portal/components/SearchField'
import type { Collection } from '../collections-store'
import { Checkbox } from './Checkbox'
import { Icon } from './Icon'

/** Above this many collections the list scrolls and gets a search box
 *  (Figma `1862:86318`, "Many collections"). */
const SEARCH_THRESHOLD = 5

type CollectionChecklistProps = {
  title: string
  collections: Collection[]
  selected: string[]
  onToggle: (id: string, on: boolean) => void
  /** Collections made from this dialog show "New" instead of a count. */
  newCollectionIds: string[]
  onNewCollection: () => void
  /** Add to collection draws the dashed "No collections yet" box when there
   *  are none (`1862:86156`); the optional section in Add to shop just
   *  offers New Collection. */
  emptyBox: boolean
}

/**
 * "Choose collections": checkbox rows with each collection's product count,
 * a search box for long lists, and a New Collection button. Shared by Add to
 * collection (flow 05) and Add to shop's optional section (flows 09, 19, 20).
 */
export function CollectionChecklist({
  title,
  collections,
  selected,
  onToggle,
  newCollectionIds,
  onNewCollection,
  emptyBox,
}: CollectionChecklistProps) {
  const [query, setQuery] = useState('')
  const many = collections.length > SEARCH_THRESHOLD
  const visible = query.trim()
    ? collections.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
    : collections

  return (
    <div className="flex w-full flex-col items-start gap-md-sm">
      <div className="flex flex-col gap-[2px]">
        <p className="text-body-md font-semibold text-text-secondary-1000">
          {title}
          {many ? ` (${collections.length})` : ''}
        </p>
        {collections.length > 0 && (
          <p className="text-body-sm leading-[20px] text-text-secondary-700">
            A product can be in more than one collection.
          </p>
        )}
      </div>

      {collections.length === 0 && emptyBox ? (
        <div className="flex h-[300px] w-full flex-col items-center justify-center gap-[18px] rounded-lg border-2 border-dashed border-surface-secondary-500 bg-surface-secondary-100">
          <div className="flex flex-col items-center gap-fourteen">
            <span className="flex size-[64px] items-center justify-center rounded-[100px] bg-surface-tertiary-500 p-md-sm">
              <Icon name="layout-grid" size={28} />
            </span>
            <div className="flex flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">No collections yet</p>
              <p className="text-body-xs text-text-secondary-700">
                Create a collection to group your picks. This product will be added to it.
              </p>
            </div>
          </div>
          <NewCollectionButton onClick={onNewCollection} />
        </div>
      ) : (
        <>
          {many && (
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search collections"
              className="w-full"
            />
          )}
          {collections.length > 0 && (
            <div
              className={[
                'flex w-full flex-col gap-sm',
                many ? 'max-h-[240px] overflow-y-auto pr-xs' : '',
              ].join(' ')}
            >
              {visible.map((collection) => {
                const isNew = newCollectionIds.includes(collection.id)
                const count = collection.itemIds.length
                return (
                  <div
                    key={collection.id}
                    className="flex w-full items-center gap-md-sm rounded-md border border-border-default py-xs pr-md pl-md-sm"
                  >
                    <div className="min-w-px flex-1">
                      <Checkbox
                        label={collection.name}
                        checked={selected.includes(collection.id)}
                        onChange={(on) => onToggle(collection.id, on)}
                      />
                    </div>
                    <p className="shrink-0 text-body-sm leading-[20px] text-text-secondary-700">
                      {isNew ? 'New' : `${count} ${count === 1 ? 'product' : 'products'}`}
                    </p>
                  </div>
                )
              })}
              {visible.length === 0 && (
                <p className="py-sm text-body-sm text-text-secondary-700">No collections match.</p>
              )}
            </div>
          )}
          <NewCollectionButton onClick={onNewCollection} />
        </>
      )}
    </div>
  )
}

function NewCollectionButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-sm rounded-md border border-border-default bg-surface-secondary-100 px-md py-sm text-body-sm font-medium text-text-secondary-1000 capitalize"
    >
      <Icon name="plus" />
      New Collection
    </button>
  )
}
