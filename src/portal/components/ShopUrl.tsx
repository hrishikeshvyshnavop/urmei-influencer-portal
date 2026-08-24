import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SHOP_URL } from "../../shop/data/shop";

export default function ShopUrl({
  published = true,
  variant = "compact",
}: {
  published?: boolean;
  variant?: "compact" | "field" | "shop";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHOP_URL);
    } catch {
      const input = document.createElement("textarea");
      input.value = SHOP_URL;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const content = (
    <>
      <span className="min-w-0 flex-1">
        {variant !== "field" ? <span className="block text-[10px] leading-4 text-portal-muted">Shop URL</span> : null}
        <span className={`block truncate text-body-sm font-medium ${published ? "text-portal-text" : "text-portal-placeholder"}`}>
          {published ? (copied ? "Copied" : SHOP_URL) : "Publish shop to get your URL"}
        </span>
      </span>
      {published ? (copied ? <Check aria-hidden="true" className="size-4 shrink-0 text-portal-success-text" strokeWidth={2} /> : <Copy aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.5} />) : null}
    </>
  );

  const classes = variant === "field"
    ? "flex w-full items-center rounded-[6px] bg-[#f8f8f8] px-4 py-3 text-left font-normal"
    : variant === "shop"
      ? "flex w-[297px] max-w-full items-center justify-between rounded-md border border-portal-border bg-portal-light px-3 py-1.5 text-left"
      : "flex w-[297px] max-w-full items-center justify-between rounded-lg border border-portal-border bg-[#fffefd] px-3 py-1.5 text-left";

  const control = published ? <button type="button" onClick={() => void copy()} aria-label="Copy shop URL" className={classes}>{content}</button> : <div aria-label="Shop URL: publish shop to get your URL" className={classes}>{content}</div>;

  if (variant === "field") {
    return <div className="flex flex-col gap-1.5 text-body-sm font-medium"><span>Storefront link</span>{control}{copied ? <span className="font-normal text-portal-success-text">Copied to clipboard</span> : null}</div>;
  }
  return control;
}
