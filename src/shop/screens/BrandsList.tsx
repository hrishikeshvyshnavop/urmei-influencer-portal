import { useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { Icon } from '../components/Icon'
import { BRAND_DIRECTORY_TILES } from '../data/brand-directory'

type BrandsListProps = {
  onBackToCatalogue: () => void
  onSelectBrand: (name: string) => void
}

export function BrandsList({ onBackToCatalogue, onSelectBrand }: BrandsListProps) {
  const [query, setQuery] = useState('')

  const visibleTiles = BRAND_DIRECTORY_TILES.filter((tile) =>
    tile.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Breadcrumb items={[{ label: 'Catalogue', onClick: onBackToCatalogue }, { label: 'Brands' }]} />
      </div>

      <div className="flex w-full flex-col items-start gap-md-2 px-margin pt-md-2 pb-5xl">
        <p className="track-section w-full text-body-md font-medium uppercase text-text-secondary-1000">
          Brands
        </p>

        <div className="flex w-[343px] max-w-full items-center gap-2 rounded-[6px] border border-border-default px-3 py-2">
          <Icon name="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find brands"
            aria-label="Find brands"
            className="w-full bg-transparent text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-600"
          />
        </div>

        <div className="grid w-full grid-cols-5 gap-x-5 gap-y-6 pt-2">
          {visibleTiles.map((tile, index) => (
            <button
              key={`${tile.name}-${index}`}
              type="button"
              onClick={() => onSelectBrand(tile.name)}
              aria-label={`View products from ${tile.name}`}
              className="group flex aspect-[224/172] flex-col gap-2 overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-primary-500"
            >
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg">
                <img src={tile.image} alt="" className="size-full object-cover" />
              </div>
              <div className="grid shrink-0 grid-rows-[0fr] transition-[grid-template-rows] duration-200 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="flex items-center justify-center gap-2 rounded-md border border-border-default px-4 py-2 text-body-sm font-medium text-text-secondary-1000">
                    View Products
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
