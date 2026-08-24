type Stat = { label: string; value: string }

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg border border-border-muted bg-surface-secondary-100 px-[28px] py-xxl drop-shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex h-[83px] w-full items-center gap-lg">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex h-full flex-1 items-center gap-lg">
            {index > 0 && <div className="h-full w-px bg-border-default" />}
            <div className="flex flex-1 flex-col justify-center gap-ten py-md-sm">
              <p className="truncate text-body-xs font-medium text-text-secondary-700">
                {stat.label}
              </p>
              <p className="text-body-xxl font-semibold text-text-secondary-1000">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
