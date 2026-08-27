import { Skeleton } from './Skeleton'

/** Mirrors `SearchResults`' breadcrumb + search bar + filters/sort toolbar +
 *  a stack of `ResultCard`-shaped rows (image, two text lines, three
 *  divider-separated stat columns, CTA button). */
export function SearchResultsSkeleton() {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="w-full px-margin py-sm">
        <Skeleton className="h-[19px] w-[160px]" />
      </div>

      <div className="flex w-full flex-col items-start gap-fourteen px-margin pt-md-2 pb-5xl">
        <Skeleton className="h-[38px] w-[384px]" />

        <div className="flex h-[74px] w-full shrink-0 items-center justify-between border-b border-border-default">
          <Skeleton className="h-[19px] w-[80px]" />
          <Skeleton className="h-[38px] w-[140px]" />
        </div>

        <div className="flex w-full items-start">
          <div className="w-[285px] shrink-0" />

          <div className="flex min-w-0 flex-1 flex-col items-start gap-md-sm pl-xxl">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="flex w-full items-center gap-md-2 border-b border-border-default py-md-sm"
              >
                <Skeleton className="size-[105px] shrink-0" />
                <div className="flex w-[193px] shrink-0 flex-col gap-[6px]">
                  <Skeleton className="h-[15px] w-[70px]" />
                  <Skeleton className="h-[19px] w-[150px]" />
                </div>
                <div className="h-[48px] w-px shrink-0 bg-border-default" />
                <div className="flex flex-1 flex-col gap-[2px]">
                  <Skeleton className="h-[19px] w-[80px]" />
                  <Skeleton className="h-[22px] w-[100px]" />
                </div>
                <div className="h-[48px] w-px shrink-0 bg-border-default" />
                <div className="flex flex-1 flex-col gap-[2px]">
                  <Skeleton className="h-[15px] w-[90px]" />
                  <Skeleton className="h-[19px] w-[110px]" />
                </div>
                <div className="h-[48px] w-px shrink-0 bg-border-default" />
                <Skeleton className="h-[38px] w-[130px] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
