/** The design's 16px radio mark, shared by the sort list and the period
 *  filter's list — an outlined circle with an 8px dot when selected. */
export function RadioDot({ selected }: { selected: boolean }) {
  return (
    <span className="flex size-[16px] shrink-0 items-center justify-center rounded-full border border-border-outlined">
      {selected && <span className="size-[8px] rounded-full bg-surface-primary-500" />}
    </span>
  )
}
