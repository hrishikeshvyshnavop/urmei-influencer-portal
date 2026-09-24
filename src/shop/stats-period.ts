import { useSyncExternalStore } from 'react'
import { STAT_PERIODS, type StatPeriodId } from './data/stats'

/**
 * The one period every stats surface reads — Home's and My Shop's stats row,
 * the five breakdown pages and a product's stats page. Kept in memory rather
 * than per screen, so "Last 30 Days" picked on Home is still selected on the
 * breakdown it links to. A reload starts again from "All time", the stats
 * row's drawn state (Figma `236:24886`).
 */
let current: StatPeriodId = STAT_PERIODS[0].id
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setStatsPeriod(next: StatPeriodId) {
  if (next === current) return
  current = next
  listeners.forEach((listener) => listener())
}

export function useStatsPeriod() {
  return useSyncExternalStore(subscribe, () => current)
}
