import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { BACKDROPS, type Backdrop, type BackdropCategory } from '../data/backdrops'
import { Button } from './Button'
import { ConfirmDialog } from './ConfirmDialog'
import { Icon } from './Icon'
import { PillTabs } from './PillTabs'

type Filter = 'all' | BackdropCategory

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'classic', label: 'Classic' },
  { id: 'seasonal', label: 'Seasonal' },
]

type ChangeBackdropDialogProps = {
  /** The saved backdrop, ticked when the dialog opens. */
  currentId: string
  onClose: () => void
  /** Only called when the pick differs from `currentId`. */
  onSave: (id: string) => void
}

/**
 * A tile's tag never repeats the active filter (main file annotation on
 * `2799:105295`): Plain always says Default, and seasonal presets say
 * Seasonal only under All, since every tile under Seasonal is one.
 */
function noteFor(backdrop: Backdrop, filter: Filter) {
  if (backdrop.id === 'plain') return 'Default'
  if (backdrop.category === 'seasonal' && filter === 'all') return 'Seasonal'
  return null
}

function BackdropTile({
  backdrop,
  note,
  selected,
  onSelect,
}: {
  backdrop: Backdrop
  note: string | null
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex min-w-0 cursor-pointer flex-col items-start gap-sm text-left"
    >
      <span
        className={cn(
          'relative block h-[92px] w-full overflow-clip rounded-[7px] border',
          selected ? 'border-2 border-border-dark' : 'border-border-default',
        )}
      >
        <img src={backdrop.thumbnail} alt="" className="pointer-events-none size-full object-cover" />
        {note && (
          <span className="absolute top-[5px] left-[5px] rounded-[7px] border border-border-default bg-surface-secondary-100 px-md py-xs text-body-sm font-medium whitespace-nowrap text-text-secondary-1000">
            {note}
          </span>
        )}
      </span>
      <span className="w-full truncate text-body-sm font-medium text-text-secondary-1000">{backdrop.name}</span>
    </button>
  )
}

/**
 * The Change backdrop dialog (flow 01, main file `2799:105196`): All /
 * Classic / Seasonal pills over a grid of the 12 presets. Save Changes is
 * always enabled; with nothing changed it just closes. Closing (×, Cancel,
 * Escape) with an unsaved pick asks first (`2799:105436`).
 */
export function ChangeBackdropDialog({ currentId, onClose, onSave }: ChangeBackdropDialogProps) {
  const [pickedId, setPickedId] = useState(currentId)
  const [filter, setFilter] = useState<Filter>('all')
  const [confirmingDiscard, setConfirmingDiscard] = useState(false)
  const dirty = pickedId !== currentId

  const requestClose = () => {
    if (dirty) setConfirmingDiscard(true)
    else onClose()
  }

  useEffect(() => {
    // The discard confirm handles its own Escape (Keep Editing).
    if (confirmingDiscard) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  })

  const visible = BACKDROPS.filter((backdrop) => filter === 'all' || backdrop.category === filter)
  const countOf = (id: Filter) =>
    id === 'all' ? BACKDROPS.length : BACKDROPS.filter((backdrop) => backdrop.category === id).length

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-scrim px-md" role="presentation">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Change backdrop"
          className="flex max-h-[calc(100vh-80px)] w-[1120px] max-w-full flex-col overflow-clip rounded-lg bg-surface-secondary-100"
        >
          <div className="flex w-full shrink-0 items-center justify-between border-b border-border-default px-lg py-md">
            <p className="text-body-xl font-semibold text-text-secondary-1000">Change backdrop</p>
            <button
              type="button"
              aria-label="Close"
              onClick={requestClose}
              className="flex w-[40px] cursor-pointer items-center justify-center overflow-clip rounded-md border border-border-default p-md-sm"
            >
              <Icon name="x" srcSize={24} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-md p-lg">
            <PillTabs
              label="Backdrop category"
              tabs={FILTERS.map(({ id, label }) => ({ id, label: `${label} (${countOf(id)})` }))}
              activeId={filter}
              onChange={setFilter}
            />

            {/* Sized to the full 12-tile grid, so the dialog keeps its height
                under every filter; only the grid scrolls when the window is
                too short for it. */}
            <div className="grid h-[271px] min-h-0 grid-cols-[repeat(auto-fill,minmax(136px,1fr))] content-start gap-x-fourteen gap-y-md overflow-y-auto">
              {visible.map((backdrop) => (
                <BackdropTile
                  key={backdrop.id}
                  backdrop={backdrop}
                  note={noteFor(backdrop, filter)}
                  selected={backdrop.id === pickedId}
                  onSelect={() => setPickedId(backdrop.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full shrink-0 justify-end gap-md-sm border-t border-border-default px-lg py-md">
            <Button variant="outline" onClick={requestClose}>
              Cancel
            </Button>
            <Button onClick={() => (dirty ? onSave(pickedId) : onClose())}>Save Changes</Button>
          </div>
        </div>
      </div>

      {confirmingDiscard && (
        <ConfirmDialog
          title="Discard your changes?"
          message="You have changes that aren't saved yet. If you discard them, your shop stays as it is."
          cancelLabel="Keep Editing"
          confirmLabel="Discard"
          onClose={() => setConfirmingDiscard(false)}
          onConfirm={onClose}
        />
      )}
    </>
  )
}
