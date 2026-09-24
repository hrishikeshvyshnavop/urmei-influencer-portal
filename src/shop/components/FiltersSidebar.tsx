import type { ReactNode } from 'react'
import { COUNTRIES } from '../../portal/country-status'
import { SearchField } from '../../portal/components/SearchField'
import {
  CATEGORY_TREE,
  COMMISSION_BUCKETS,
  COMMISSION_RANGE,
  FILTER_BRANDS,
  INGREDIENTS,
  RATING_THRESHOLDS,
  categoryChipLabel,
  type ProductFilters,
} from '../data/catalogue'
import { Checkbox } from './Checkbox'
import { Icon } from './Icon'

type FiltersSidebarProps = {
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
  /** Which accordion groups are expanded, and the Brand search box's text —
   *  owned by the caller (`SearchResults`) rather than local state here. This
   *  sidebar gets re-parented into `document.body` via a portal once the
   *  scroll position makes it "stick" (see `useStickyOnScroll`), and React
   *  treats a portal's target-container change as a different portal
   *  identity — it remounts the portaled subtree rather than updating it in
   *  place. Local state here would reset (collapsing every open group) the
   *  instant that happens; state that lives in the never-unmounting caller
   *  survives it. */
  openGroups: Set<string>
  onToggleGroup: (label: string) => void
  /** Which Category departments are expanded. Several can be open at once —
   *  unlike the groups themselves — and it lives in the caller for the same
   *  reason as `openGroups`. */
  openDepartments: Set<string>
  onToggleDepartment: (department: string) => void
  brandSearch: string
  onBrandSearchChange: (value: string) => void
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value]
}

/** Brand values are stored upper-case (matching how the catalogue displays
 *  them elsewhere), but Figma's Brand filter shows them in title case —
 *  display-only, so filtering still matches on the real, stored value. */
function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

type SelectedTag = { value: string; label: string }

function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex shrink-0 items-center justify-center gap-xs rounded-sm bg-surface-tertiary-500 px-sm py-xs">
      <span className="text-body-sm font-medium whitespace-nowrap text-text-secondary-1000">{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        onClick={onRemove}
        className="flex items-center justify-center"
      >
        <Icon name="x" srcSize={24} />
      </button>
    </span>
  )
}

/** One row of a filter's list: 40px tall with its own padding and no gap to
 *  its neighbours, the way the design stacks them (Figma `1594:34897`). */
function FilterRow({ children, indent = false }: { children: ReactNode; indent?: boolean }) {
  return (
    <div
      className={[
        'flex h-[40px] w-full items-center overflow-clip rounded-xs',
        indent ? 'pl-sm' : '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function FilterGroup({
  label,
  open,
  onToggle,
  children,
  selected = [],
  onRemoveSelected,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
  /** Currently-applied values for this group, shown as removable chips
   *  whenever the group is collapsed (Figma `1594:35010`) — so a filter stays
   *  visible and editable without needing to reopen the list. */
  selected?: SelectedTag[]
  onRemoveSelected?: (value: string) => void
}) {
  const showSelected = !open && selected.length > 0

  return (
    <div
      className={[
        'flex w-full flex-col items-start border-b border-r border-border-default px-md py-lg',
        showSelected ? 'gap-md-sm' : 'gap-md',
      ].join(' ')}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full items-center justify-between"
      >
        <span className="text-body-lg text-text-secondary-1000">{label}</span>
        <Icon
          name="chevron-down"
          srcSize={24}
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>
      {showSelected && (
        <div className="flex w-full flex-wrap items-start gap-sm">
          {selected.map((tag) => (
            <Tag key={tag.value} label={tag.label} onRemove={() => onRemoveSelected?.(tag.value)} />
          ))}
        </div>
      )}
      {open && <div className="flex w-full flex-col items-start">{children}</div>}
    </div>
  )
}

/**
 * The Commission filter's two-handle range (Figma `1594:34898`): a tinted
 * panel with the current span above the track. Built from two native range
 * inputs sharing one track — the thumbs are the only part that takes pointer
 * events (`.range-thumb` in `global.css`), so a drag always grabs the handle
 * that was clicked rather than whichever input happens to sit on top.
 */
function CommissionSlider({
  range,
  onChange,
}: {
  range: [number, number] | null
  onChange: (next: [number, number] | null) => void
}) {
  const [min, max] = range ?? [COMMISSION_RANGE.min, COMMISSION_RANGE.max]
  const span = COMMISSION_RANGE.max - COMMISSION_RANGE.min
  const percent = (value: number) => ((value - COMMISSION_RANGE.min) / span) * 100

  const commit = (next: [number, number]) => {
    const isFullRange = next[0] === COMMISSION_RANGE.min && next[1] === COMMISSION_RANGE.max
    onChange(isFullRange ? null : next)
  }

  return (
    <div className="w-full py-sm">
      <div className="flex w-full flex-col justify-center gap-[2px] rounded-sm bg-surface-secondary-300 px-md py-md-sm">
        <div className="flex items-start gap-sm text-body-xs font-bold whitespace-nowrap text-text-secondary-1000">
          <span>{min}</span>
          <span>-</span>
          <span>{max}%</span>
        </div>
        <div className="relative h-[38px] w-full">
          <div className="absolute top-1/2 right-0 left-0 h-[4px] -translate-y-1/2 rounded-xs bg-surface-secondary-400" />
          <div
            className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-xs bg-surface-primary-500"
            style={{ left: `${percent(min)}%`, right: `${100 - percent(max)}%` }}
          />
          <input
            type="range"
            aria-label="Minimum commission"
            min={COMMISSION_RANGE.min}
            max={COMMISSION_RANGE.max}
            value={min}
            onChange={(event) => commit([Math.min(Number(event.target.value), max), max])}
            className="range-thumb absolute inset-x-0 top-1/2 h-[16px] w-full -translate-y-1/2"
          />
          <input
            type="range"
            aria-label="Maximum commission"
            min={COMMISSION_RANGE.min}
            max={COMMISSION_RANGE.max}
            value={max}
            onChange={(event) => commit([min, Math.max(Number(event.target.value), min)])}
            className="range-thumb absolute inset-x-0 top-1/2 h-[16px] w-full -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Search Results' left filter rail (Figma `1594:34810` expanded /
 * `1594:34922` applied). Only one group is open at a time — opening one
 * closes the previous. That's a deliberate departure from the Figma frames,
 * which show every group open at once in one and all collapsed in another; it
 * was asked for directly, and it keeps the rail close to one screen tall
 * instead of several.
 *
 * The filter TYPES, order and interactions are Figma's; the values are this
 * catalogue's real brands, departments, categories, ingredients and markets,
 * so every row actually narrows real results (the design's own lists name
 * brands and skin concerns we don't carry).
 */
export function FiltersSidebar({
  filters,
  onChange,
  openGroups,
  onToggleGroup,
  openDepartments,
  onToggleDepartment,
  brandSearch,
  onBrandSearchChange,
}: FiltersSidebarProps) {
  const visibleBrands = FILTER_BRANDS.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase()),
  )

  const commissionTags: SelectedTag[] = [
    ...(filters.commissionRange
      ? [
          {
            value: 'range',
            label: `${filters.commissionRange[0]}% - ${filters.commissionRange[1]}%`,
          },
        ]
      : []),
    ...filters.commissionBuckets.map((id) => ({
      value: id,
      label: COMMISSION_BUCKETS.find((bucket) => bucket.id === id)?.label ?? id,
    })),
  ]

  // `w-full` rather than a fixed 285px: the scrolling wrapper in
  // `SearchResults` owns the rail's width, so this shrinks into the
  // scrollbar's gutter instead of overflowing it horizontally.
  return (
    <aside className="flex w-full flex-col items-start self-start bg-surface-secondary-100">
      <FilterGroup
        label="Brand"
        open={openGroups.has('Brand')}
        onToggle={() => onToggleGroup('Brand')}
        selected={filters.brands.map((brand) => ({ value: brand, label: toTitleCase(brand) }))}
        onRemoveSelected={(brand) => onChange({ ...filters, brands: toggleInList(filters.brands, brand) })}
      >
        <SearchField
          value={brandSearch}
          onChange={onBrandSearchChange}
          placeholder="Search brands"
          aria-label="Search brands"
          className="w-full"
        />
        {visibleBrands.map((brand) => (
          <FilterRow key={brand}>
            <Checkbox
              label={toTitleCase(brand)}
              checked={filters.brands.includes(brand)}
              onChange={() => onChange({ ...filters, brands: toggleInList(filters.brands, brand) })}
            />
          </FilterRow>
        ))}
      </FilterGroup>

      <FilterGroup
        label="Commission"
        open={openGroups.has('Commission')}
        onToggle={() => onToggleGroup('Commission')}
        selected={commissionTags}
        onRemoveSelected={(value) =>
          value === 'range'
            ? onChange({ ...filters, commissionRange: null })
            : onChange({
                ...filters,
                commissionBuckets: toggleInList(filters.commissionBuckets, value),
              })
        }
      >
        <CommissionSlider
          range={filters.commissionRange}
          onChange={(commissionRange) => onChange({ ...filters, commissionRange })}
        />
        {COMMISSION_BUCKETS.map((bucket) => (
          <FilterRow key={bucket.id}>
            <Checkbox
              label={bucket.label}
              checked={filters.commissionBuckets.includes(bucket.id)}
              onChange={() =>
                onChange({
                  ...filters,
                  commissionBuckets: toggleInList(filters.commissionBuckets, bucket.id),
                })
              }
            />
          </FilterRow>
        ))}
      </FilterGroup>

      <FilterGroup
        label="Customer Rating"
        open={openGroups.has('Rating')}
        onToggle={() => onToggleGroup('Rating')}
        selected={filters.ratingThresholds.map((min) => ({
          value: String(min),
          label: RATING_THRESHOLDS.find((threshold) => threshold.min === min)?.label ?? `${min} ★ & above`,
        }))}
        onRemoveSelected={(value) => {
          const min = Number(value)
          onChange({
            ...filters,
            ratingThresholds: filters.ratingThresholds.filter((threshold) => threshold !== min),
          })
        }}
      >
        {RATING_THRESHOLDS.map((threshold) => (
          <FilterRow key={threshold.min}>
            <Checkbox
              // The design writes the rating with the star as a glyph rather
              // than the word — "4 ★ & above" (Figma `1594:34899`).
              label={`${threshold.min} ★ & above`}
              checked={filters.ratingThresholds.includes(threshold.min)}
              onChange={() =>
                onChange({
                  ...filters,
                  ratingThresholds:
                    filters.ratingThresholds.includes(threshold.min)
                      ? filters.ratingThresholds.filter((value) => value !== threshold.min)
                      : [...filters.ratingThresholds, threshold.min],
                })
              }
            />
          </FilterRow>
        ))}
      </FilterGroup>

      <FilterGroup
        label="Category"
        open={openGroups.has('Category')}
        onToggle={() => onToggleGroup('Category')}
        selected={filters.categories.map((category) => ({
          value: category,
          label: categoryChipLabel(category),
        }))}
        onRemoveSelected={(category) =>
          onChange({ ...filters, categories: toggleInList(filters.categories, category) })
        }
      >
        {CATEGORY_TREE.map(({ department, categories }) => {
          const expanded = openDepartments.has(department)
          return (
            <div key={department} className="flex w-full flex-col items-start">
              <FilterRow>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => onToggleDepartment(department)}
                  className="flex w-full items-center gap-md-sm"
                >
                  <span className="min-w-px flex-1 text-left text-body-sm text-text-secondary-1000">
                    {department}
                  </span>
                  <Icon
                    name="chevron-down"
                    srcSize={24}
                    className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'}
                  />
                </button>
              </FilterRow>
              {expanded &&
                categories.map((category) => {
                  const selected = filters.categories.includes(category)
                  return (
                    <FilterRow key={category} indent>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          onChange({
                            ...filters,
                            categories: toggleInList(filters.categories, category),
                          })
                        }
                        className={[
                          'w-full text-left text-body-sm font-medium',
                          selected ? 'text-text-secondary-1000' : 'text-text-secondary-700',
                        ].join(' ')}
                      >
                        {category}
                      </button>
                    </FilterRow>
                  )
                })}
            </div>
          )
        })}
      </FilterGroup>

      <FilterGroup
        label="Ingredients"
        open={openGroups.has('Ingredients')}
        onToggle={() => onToggleGroup('Ingredients')}
        selected={filters.ingredients.map((ingredient) => ({ value: ingredient, label: ingredient }))}
        onRemoveSelected={(ingredient) =>
          onChange({ ...filters, ingredients: toggleInList(filters.ingredients, ingredient) })
        }
      >
        {INGREDIENTS.map((ingredient) => (
          <FilterRow key={ingredient.label}>
            <Checkbox
              label={ingredient.label}
              checked={filters.ingredients.includes(ingredient.label)}
              onChange={() =>
                onChange({ ...filters, ingredients: toggleInList(filters.ingredients, ingredient.label) })
              }
            />
          </FilterRow>
        ))}
      </FilterGroup>

      <FilterGroup
        label="Country"
        open={openGroups.has('Country')}
        onToggle={() => onToggleGroup('Country')}
        selected={filters.countries.map((country) => ({ value: country, label: country }))}
        onRemoveSelected={(country) =>
          onChange({ ...filters, countries: toggleInList(filters.countries, country) })
        }
      >
        {COUNTRIES.map((country) => (
          <FilterRow key={country.id}>
            <Checkbox
              label={country.name}
              checked={filters.countries.includes(country.name)}
              onChange={() =>
                onChange({ ...filters, countries: toggleInList(filters.countries, country.name) })
              }
            />
          </FilterRow>
        ))}
      </FilterGroup>
    </aside>
  )
}
