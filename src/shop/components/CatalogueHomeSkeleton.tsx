import { Skeleton } from './Skeleton'

/** Mirrors `CatalogueHome`'s section rhythm — search bar, categories row,
 *  promo banner, brands row, ingredients row — so the swap to real content
 *  doesn't jump the layout around. */
export function CatalogueHomeSkeleton() {
  return (
    <div className="flex w-full flex-col items-center pt-4xl-1 pb-4xl-2">
      <div className="flex h-[70px] w-full items-start justify-center px-[323px] py-md">
        <Skeleton className="h-full flex-1 !rounded-full" />
      </div>

      <section className="flex w-full flex-col items-center gap-md-2 px-[323px] py-3xl">
        <Skeleton className="h-[19px] w-[220px]" />
        <div className="flex items-center gap-md">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex flex-col items-start gap-xs">
              <Skeleton className="h-[75px] w-[100px]" />
              <Skeleton className="h-[16px] w-[70px]" />
            </div>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-start px-[323px]">
        <Skeleton className="h-[315.4px] w-[794px]" />
      </section>

      <section className="flex w-full flex-col items-center justify-center gap-md px-[323px] pt-3xl pb-md-2">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-[19px] w-[80px]" />
          <Skeleton className="h-[19px] w-[60px]" />
        </div>
        <div className="flex w-full items-center gap-[19.95px]">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="aspect-[224/172] min-w-0 flex-1" />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-md-2 px-[323px] py-3xl">
        <Skeleton className="h-[19px] w-[260px]" />
        <div className="flex w-full items-center gap-md-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex flex-1 flex-col items-start gap-sm">
              <Skeleton className="aspect-[85/122] w-full" />
              <Skeleton className="h-[16px] w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
