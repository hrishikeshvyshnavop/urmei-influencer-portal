import { Skeleton } from './Skeleton'

/** Mirrors `ProductDetail`'s breadcrumb + image gallery + thumbnail strip +
 *  details column (title block, purchase-options box, stats box, CTA,
 *  accordion rows). */
export function ProductDetailSkeleton() {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Skeleton className="h-[19px] w-[220px]" />
      </div>

      <div className="flex w-full items-start gap-5xl px-margin pb-5xl">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-md-sm">
          <Skeleton className="aspect-[533/531.45] w-full" />
          <div className="flex w-full items-center gap-md-sm">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="aspect-square min-w-0 flex-1" />
            ))}
          </div>
        </div>

        <div className="flex w-[568px] flex-col items-start gap-xxl">
          <div className="flex w-full flex-col items-start gap-lg">
            <div className="flex w-full flex-col gap-md-sm">
              <div className="flex w-full flex-col gap-sm">
                <div className="flex w-full flex-col gap-[6px]">
                  <Skeleton className="h-[17px] w-[100px]" />
                  <Skeleton className="h-[27px] w-[380px]" />
                  <Skeleton className="h-[22px] w-[160px]" />
                </div>
              </div>
              <Skeleton className="h-[27px] w-[140px]" />
            </div>

            <div className="flex w-full flex-col items-start gap-md-2">
              <div className="flex w-full flex-col items-start gap-md">
                <div className="flex w-full flex-col gap-sm">
                  <Skeleton className="h-[19px] w-[180px]" />
                  <Skeleton className="h-[88px] w-full !rounded-[12px]" />
                </div>
                <Skeleton className="h-[74px] w-full !rounded-lg" />
              </div>

              <Skeleton className="h-[38px] w-full" />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-md-sm">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[52px] w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
