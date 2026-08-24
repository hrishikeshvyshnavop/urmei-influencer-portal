export type PerformanceData = {
  unitsSold: number
  commissionEarned: string
  linkClicks: string
  conversionRate: string
}

/** The "PERFORMACE" block on a shop item's product-detail page — kept spelled as designed. */
export function PerformanceStats({ data }: { data: PerformanceData }) {
  const stats = [
    { label: 'TOTAL UNIT SOLD', value: String(data.unitsSold), emphasised: false },
    { label: 'COMMISSION EANED', value: data.commissionEarned, emphasised: true },
    { label: 'LINK CLICKS', value: data.linkClicks, emphasised: false },
    { label: 'CONVERSION RATE', value: data.conversionRate, emphasised: false },
  ]

  return (
    <div className="flex w-full flex-col items-end gap-3xl px-margin pb-5xl">
      <div className="flex h-[52px] w-full items-center overflow-clip">
        <div className="flex flex-col gap-xs whitespace-nowrap">
          <p className="text-body-xl font-medium text-text-secondary-1000">PERFORMACE</p>
          <p className="text-body-sm text-text-secondary-700">How this product is doing in your shop</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center rounded-[24px] border border-border-muted bg-surface-tertiary-300 px-xxl py-xxl drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
        <div className="flex h-[83px] w-full items-center gap-lg">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-1 items-center gap-lg">
              {index > 0 && <div className="h-full w-px bg-border-default" />}
              <div className="flex flex-1 flex-col gap-ten py-md-sm">
                <p className="truncate text-body-xs font-medium text-text-secondary-700">
                  {stat.label}
                </p>
                {stat.emphasised ? (
                  <p className="text-h6 font-semibold text-text-secondary-1000 uppercase">
                    {stat.value}
                  </p>
                ) : (
                  <p className="text-body-xxl font-semibold text-text-secondary-1000">{stat.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
