const topProducts = [
  { image: "/urmei/home/top-1.png", views: "2.5k Views", sales: "15 Sales" },
  { image: "/urmei/home/top-2.png", views: "2.5k Views", sales: "15 Sales" },
  { image: "/urmei/home/top-3.png", views: "2.5k Views", sales: "15 Sales" },
  { image: "/urmei/home/top-4.png", views: "2.5k Views", sales: "15 Sales" },
];

function Stat({
  icon,
  inset,
  label,
}: {
  icon: string;
  inset: string;
  label: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-[6px]">
      <span className="relative size-[16px] shrink-0 overflow-clip">
        <span className={`absolute ${inset}`}>
          <img
            src={`/urmei/home/icon-${icon}.svg`}
            alt=""
            className="block size-full max-w-none"
          />
        </span>
      </span>
      <p className="shrink-0 text-body-xs whitespace-nowrap text-portal-muted">
        {label}
      </p>
    </div>
  );
}

export default function TopProducts() {
  return (
    <section className="flex w-full flex-col items-start justify-center py-5">
      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="track-section text-body-md font-medium uppercase text-portal-text">
          Your Top-Performing Products
        </h2>

        <div className="grid w-full grid-cols-2 items-start gap-4 lg:grid-cols-4">
          {topProducts.map((product) => (
            <div
              key={product.image}
              className="flex min-w-px flex-col items-start"
            >
              <div className="relative aspect-[1080/1350] w-full shrink-0 overflow-hidden rounded-[6px]">
                <img
                  src={product.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
                />
              </div>

              <div className="flex w-full flex-col items-start gap-2 py-[14px]">
                <div className="flex w-full items-center gap-6">
                  <Stat
                    icon="eye"
                    inset="inset-[20.83%_8.33%]"
                    label={product.views}
                  />
                  <Stat
                    icon="bag"
                    inset="inset-[8.33%_12.5%]"
                    label={product.sales}
                  />
                </div>

                <div className="flex w-full flex-col items-start gap-1">
                  <p className="w-full overflow-hidden text-body-md font-medium text-ellipsis text-portal-text">
                    Water Bank Blue Hyaluronic Cream
                  </p>
                  <div className="flex shrink-0 items-center gap-2">
                    <p className="shrink-0 text-body-xl font-semibold whitespace-nowrap text-portal-text">
                      S$5.6
                    </p>
                    <p className="shrink-0 text-body-sm font-medium whitespace-nowrap text-portal-muted">
                      Commission earned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
