import { useState } from 'react'

/**
 * The ticked collections in a collection checklist. Collections created from
 * inside the dialog (`newIds`) arrive ticked unless unticked since, which is
 * derived here rather than synced in an effect.
 */
export function useCollectionSelection(initial: string[], newIds: string[]) {
  const [picked, setPicked] = useState<string[]>(initial)
  const [dropped, setDropped] = useState<string[]>([])
  const selected = [...new Set([...picked, ...newIds.filter((id) => !dropped.includes(id))])]

  function toggle(id: string, on: boolean) {
    setPicked((current) => (on ? [...current, id] : current.filter((x) => x !== id)))
    setDropped((current) => (on ? current.filter((x) => x !== id) : [...current, id]))
  }

  return { selected, toggle }
}
