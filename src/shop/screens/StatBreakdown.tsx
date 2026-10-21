import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import AppShell from "../../portal/components/AppShell";
import { SearchField } from "../../portal/components/SearchField";
import { requestProductTour } from "../../portal/tour-status";
import { Breadcrumb } from "../components/Breadcrumb";
import { PeriodFilter } from "../components/PeriodFilter";
import {
  ORIGIN_CRUMBS,
  STAT_PERIODS,
  STAT_SPECS,
  productStatsHash,
  statsForProduct,
  shopTotals,
  trendFor,
  type StatMetric,
  type StatsOrigin,
} from "../data/stats";
import { loadShopItems } from "../shop-items-store";
import { useStatsPeriod } from "../stats-period";
import { navigate } from "../../router";

/**
 * One metric's breakdown: the shop's total for it, then every product in the
 * shop with its own figure and a way into that product's stats (Figma
 * `1619:39559` clicks, `1619:40010` sales, `1619:39786`/`1619:40237`/
 * `1619:40455` the three commission pages).
 *
 * One screen for all five because the frames are one template — what varies
 * per metric (label, formatting, row unit, the "nothing to report" wording,
 * and whether the trend line appears at all) lives in
 * `STAT_SPECS`.
 */
export function StatBreakdown({
  metric,
  origin,
}: {
  metric: StatMetric;
  origin: StatsOrigin;
}) {
  const spec = STAT_SPECS[metric];
  const root = ORIGIN_CRUMBS[origin];
  const [items] = useState(loadShopItems);
  const [query, setQuery] = useState("");
  const period = useStatsPeriod();

  const totals = useMemo(() => shopTotals(items), [items]);
  const total = totals[metric];

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items
      .filter((item) =>
        needle === ""
          ? true
          : `${item.product.brand} ${item.product.name}`
              .toLowerCase()
              .includes(needle),
      )
      .map((item) => ({ item, value: statsForProduct(item.product)[metric] }));
  }, [items, metric, query]);

  const { up: trendUp, percent: trendPercent } = trendFor(metric, total);
  // Null for "All Time": there is no earlier window to compare against.
  const previousLabel = STAT_PERIODS.find((row) => row.id === period)?.previous;

  return (
    <AppShell
      footerBelowFold
      className="bg-surface-secondary-100"
      onShowTour={requestProductTour}
      onShowHelp={() => {
        navigate("/help-center");
      }}
    >
      <main className="mx-auto flex flex-1 w-full max-w-[1440px] flex-col items-center px-6 pt-8 pb-16">
        <div className="flex w-full max-w-[794px] flex-col items-start">
          <div className="flex w-full items-center justify-between py-sm">
            <Breadcrumb
              items={[
                {
                  label: root.label,
                  onClick: () => {
                    navigate(root.hash);
                  },
                },
                { label: spec.crumb },
              ]}
            />
            <PeriodFilter />
          </div>

          <section className="flex h-[131px] w-full flex-col items-center justify-center gap-xs rounded-md bg-surface-secondary-300 px-md py-md-2">
            <p className="text-body-xs text-text-secondary-700 uppercase">
              {spec.label}
            </p>
            <p className="text-h4 text-text-primary-1000 uppercase">
              {spec.format(total)}
              {spec.heroSuffix ? ` ${spec.heroSuffix}` : ""}
            </p>
            {spec.trend && previousLabel && (
              <p className="flex items-center gap-1 text-body-sm font-medium text-text-secondary-700">
                <span
                  className={[
                    "flex items-center gap-[2px] font-bold",
                    trendUp
                      ? "text-border-success"
                      : "text-surface-other-alert",
                  ].join(" ")}
                >
                  {trendUp ? (
                    <ArrowUp
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={2}
                    />
                  ) : (
                    <ArrowDown
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={2}
                    />
                  )}
                  {trendPercent}%
                </span>
                vs. {previousLabel}
              </p>
            )}
          </section>

          <div className="mt-ten flex w-full justify-end py-sm">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search product"
              aria-label="Search product"
              className="w-[300px] max-w-full"
            />
          </div>

          <ul className="flex w-full flex-col items-start">
            {rows.map(({ item, value }) => (
              <li
                key={item.id}
                className="w-full border-b border-border-default"
              >
                <a
                  href={productStatsHash(item.id, origin, metric)}
                  className="flex w-full items-center gap-xs py-md"
                >
                  <span className="flex min-w-px flex-1 items-center gap-md">
                    {/* The frame's thumbnail is a square the height of the text
                        column beside it (`aspect-[65/65] h-full`, rendering
                        109px in a 141px row). Pinned rather than stretched:
                        `aspect-square` with an indefinite width sizes off the
                        image's intrinsic pixels instead. */}
                    <span className="size-[109px] shrink-0 overflow-hidden rounded-lg bg-surface-secondary-300">
                      <img
                        src={item.product.listImage}
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <span className="flex min-w-px flex-1 flex-col gap-md-sm">
                      <span className="flex flex-col gap-[2px]">
                        <span className="text-body-xs font-medium text-text-secondary-600 uppercase">
                          {item.product.brand}
                        </span>
                        <span className="truncate text-body-md font-medium text-text-secondary-1000">
                          {item.product.name}
                        </span>
                        <span className="text-body-xs text-text-secondary-700">
                          {item.variant}
                        </span>
                      </span>
                      {value > 0 ? (
                        <span className="flex items-baseline gap-[6px]">
                          <span className="text-body-xl font-semibold text-text-secondary-1000">
                            {spec.format(value)}
                          </span>
                          <span className="text-body-sm font-medium text-text-secondary-700">
                            {spec.rowUnit}
                          </span>
                        </span>
                      ) : (
                        <span className="text-body-sm font-medium text-text-secondary-700">
                          {spec.rowEmpty}
                        </span>
                      )}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-text-secondary-700"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            ))}
          </ul>

          {rows.length === 0 && (
            <p className="w-full py-3xl text-center text-body-sm text-text-secondary-700">
              {items.length === 0
                ? "Add products to your shop to see how they perform."
                : "No products match your search."}
            </p>
          )}
        </div>
      </main>
    </AppShell>
  );
}
