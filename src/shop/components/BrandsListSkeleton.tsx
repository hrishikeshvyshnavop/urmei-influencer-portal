import { Skeleton } from './Skeleton'

/** Mirrors `BrandsList`'s breadcrumb + heading + search + 5-column tile grid. */
export function BrandsListSkeleton() {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Skeleton className="h-[19px] w-[140px]" />
      </div>

      <div className="flex w-full flex-col items-start gap-md-2 px-margin pt-md-2 pb-5xl">
        <Skeleton className="h-[19px] w-[80px]" />
        <Skeleton className="h-[38px] w-[343px] max-w-full" />

        <div className="grid w-full grid-cols-5 gap-x-5 gap-y-6 pt-2">
          {Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={index} className="aspect-[224/172]" />
          ))}
        </div>
      </div>
    </div>
  )
}
