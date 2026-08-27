type SkeletonProps = {
  className?: string
}

/** Boneyard-style loading placeholder: a pulsing gray block standing in for
 *  content that hasn't arrived yet. Compose with layout utility classes
 *  (size, radius, flex) for shape — this only owns the fill and the pulse. */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-surface-secondary-400 ${className}`} />
}
