import { useState } from 'react'
import { SEARCH_SUGGESTIONS } from '../data/catalogue'
import { Icon } from './Icon'

type CatalogueSearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (query: string) => void
  placeholder?: string
  /** Autocomplete only appears on the catalogue landing screen. */
  withSuggestions?: boolean
  className?: string
}

export function CatalogueSearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search brands and products',
  withSuggestions = false,
  className = '',
}: CatalogueSearchProps) {
  const [focused, setFocused] = useState(false)

  const matches = SEARCH_SUGGESTIONS.filter((suggestion) =>
    suggestion.text.toLowerCase().includes(value.trim().toLowerCase()),
  )
  const showSuggestions = withSuggestions && focused && value.trim().length > 0 && matches.length > 0
  const isActive = focused || value.length > 0

  return (
    <div className={`relative flex flex-col gap-sm ${className}`}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (value.trim()) onSubmit(value.trim())
        }}
        className={[
          'flex h-[40px] w-full items-center gap-sm rounded-sm border bg-surface-secondary-100 px-md-sm py-sm',
          isActive ? 'border-surface-primary-500' : 'border-border-default',
        ].join(' ')}
      >
        <Icon name="search" />
        <input
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          /* Delay so a suggestion click lands before the list unmounts. */
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          className="min-w-0 flex-1 bg-transparent text-body-sm text-text-secondary-1000 outline-none placeholder:text-text-secondary-700 [&::-webkit-search-cancel-button]:hidden"
        />
        {value.length > 0 && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange('')}
            className="flex items-center justify-center overflow-clip rounded-sm p-xs"
          >
            <Icon name="x" srcSize={24} />
          </button>
        )}
      </form>

      {showSuggestions && (
        <ul className="absolute top-[48px] z-10 w-full overflow-clip rounded-sm border border-border-default bg-surface-secondary-100 shadow-ds-sm">
          {matches.map((suggestion) => (
            <li key={suggestion.text}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onChange(suggestion.text)
                  onSubmit(suggestion.text)
                }}
                className="flex w-full items-center gap-sm bg-surface-secondary-300 p-md text-left"
              >
                <span className="flex flex-1 items-center gap-md">
                  <Icon name="search" />
                  <span className="flex-1 truncate text-body-sm font-medium text-text-secondary-1000">
                    {suggestion.text}
                  </span>
                </span>
                <img
                  src={suggestion.thumbnail}
                  alt=""
                  className="size-[48px] rounded-xs object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
