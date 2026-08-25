import { Button } from '../components/Button'
import { CatalogueSearch } from '../components/CatalogueSearch'
import { Icon } from '../components/Icon'
import { BRAND_LOGOS, CATEGORIES, INGREDIENTS } from '../data/catalogue'

type CatalogueHomeProps = {
  query: string
  onQueryChange: (value: string) => void
  onSearch: (query: string) => void
  onViewAllBrands: () => void
}

function SectionHeading({ children }: { children: string }) {
  return (
    <p className="w-full text-center text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
      {children}
    </p>
  )
}

export function CatalogueHome({ query, onQueryChange, onSearch, onViewAllBrands }: CatalogueHomeProps) {
  return (
    <div className="flex w-full flex-col items-center pt-4xl-1 pb-4xl-2">
      <div className="flex h-[70px] w-full items-start justify-center px-[323px] py-md">
        <CatalogueSearch
          className="flex-1"
          value={query}
          onChange={onQueryChange}
          onSubmit={onSearch}
          withSuggestions
        />
      </div>

      <section className="flex w-full flex-col items-center gap-md-2 overflow-clip px-[323px] py-3xl">
        <SectionHeading>Bestselling Categories</SectionHeading>
        <div className="flex items-center gap-md overflow-clip">
          {CATEGORIES.map((category) => (
            <button
              key={category.label}
              type="button"
              onClick={() => onSearch(category.label)}
              className="flex flex-col items-start gap-xs text-left"
            >
              <img
                src={category.image}
                alt=""
                className="h-[75px] w-[100px] rounded-sm object-cover"
              />
              <p className="w-full text-center text-body-sm font-medium text-text-secondary-800">
                {category.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-start px-[323px]">
        <div className="flex h-[315.4px] w-[794px] items-center justify-center gap-xs rounded-lg bg-surface-secondary-300 px-md py-lg">
          <div className="relative aspect-[343/242] min-w-0 flex-1">
            <img
              src="/assets/img/offer-laneige.png"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-center gap-md bg-surface-secondary-300">
            <div className="flex w-full flex-col items-center gap-sm">
              <div className="h-[24px] w-[82px] overflow-hidden">
                <img
                  src="/assets/img/brand-laneige-wordmark.png"
                  alt="LANEIGE"
                  className="relative left-[2.44%] h-[333.33%] w-[97.56%] max-w-none -translate-y-[35%]"
                />
              </div>
              <div className="flex w-full flex-col items-center gap-sm text-center text-text-tertiary-900">
                <p className="text-body-xxl font-medium">GET 15% EXTRA </p>
                <p className="text-body-xs font-medium">
                  On Your First LANEGE Campaign earn upto 15% extra commission
                </p>
              </div>
            </div>
            <Button onClick={() => onSearch('LANEIGE')}>view products</Button>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-col items-center justify-center gap-md px-[323px] pt-3xl pb-md-2">
        <div className="flex w-full items-center justify-between">
          <p className="flex-1 text-body-md leading-[22px] font-medium tracking-[1.6px] text-text-secondary-1000 uppercase">
            Brands
          </p>
          <button
            type="button"
            onClick={onViewAllBrands}
            className="flex items-center gap-sm overflow-clip"
          >
            <span className="text-body-sm font-medium text-text-secondary-1000">View All</span>
            <Icon name="chevron-right" />
          </button>
        </div>
        <div className="flex w-full items-center gap-[19.95px]">
          {BRAND_LOGOS.map((brand) => (
            <button
              key={brand.name}
              type="button"
              onClick={() => onSearch(brand.name)}
              className="relative aspect-[224/172] min-w-0 flex-1"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="absolute inset-0 size-full rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-md-2 overflow-clip px-[323px] py-3xl">
        <SectionHeading>Shoppers’ Top Ingredients</SectionHeading>
        <div className="flex w-full items-center gap-md-2">
          {INGREDIENTS.map((ingredient) => (
            <button
              key={ingredient.label}
              type="button"
              onClick={() => onSearch(ingredient.label)}
              className="flex flex-1 flex-col items-start justify-center gap-sm text-left"
            >
              <div className="relative aspect-[85/122] w-full">
                <img
                  src={ingredient.image}
                  alt=""
                  className="absolute inset-0 size-full rounded-sm object-cover"
                />
              </div>
              <p className="w-full text-center text-body-xs text-text-secondary-1000">
                {ingredient.label}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
