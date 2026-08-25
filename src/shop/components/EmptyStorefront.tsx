/** Shown instead of "Top Featured Products"/"All Picks" once every product
 *  has been removed from a published shop (Figma `1342:73280`). Shared by
 *  both the in-app storefront preview and the real public storefront page,
 *  since the design is identical between them. */
export function EmptyStorefront({ name }: { name: string }) {
  return (
    <section className="flex h-[353px] w-full flex-col items-center justify-center overflow-clip bg-surface-secondary-100 px-margin">
      <div className="flex h-[343px] w-full max-w-[1200px] flex-col items-center overflow-clip rounded-lg bg-surface-secondary-100">
        <div className="flex h-[288px] w-full flex-col items-center justify-center bg-surface-secondary-100">
          <div className="flex w-[278px] flex-col items-center gap-fourteen">
            <img src="/assets/img/store-empty.svg" alt="" className="size-[64px]" />
            <div className="flex w-full flex-col items-center gap-xs text-center">
              <p className="text-body-xl font-medium text-text-secondary-1000">{name}’s shop is empty</p>
              <p className="text-body-xs text-text-secondary-700">Products will be visible once added.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
