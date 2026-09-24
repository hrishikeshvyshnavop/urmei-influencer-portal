import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Button from "./Button";
import type { AddressDefaults, ShippingAddress } from "../shipping-addresses";

/** One "Set as default … address" row, shared by this popup and the address
 *  form. A locked row stays ticked: that default can only move elsewhere. */
export function DefaultCheckbox({
  label,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={`flex w-full items-center gap-[10px] text-body-sm text-portal-text ${disabled ? "cursor-default" : "cursor-pointer"}`}>
      {/* Locked rows keep the design's dark tick: a natively disabled
          checkbox is painted grey regardless of `accent-color`, so the lock
          is `aria-disabled` plus an ignored change instead. */}
      <input
        type="checkbox"
        checked={checked}
        aria-disabled={disabled || undefined}
        onChange={(event) => {
          if (!disabled) onChange(event.target.checked);
        }}
        className={`size-[18px] shrink-0 rounded-xs border border-portal-border accent-portal-dark ${disabled ? "cursor-default" : "cursor-pointer"}`}
      />
      {label}
    </label>
  );
}

/**
 * "Set As" (Figma `786:28154`): a 400px popup that makes one address the
 * default shipping and/or billing address. A default the address already
 * holds shows ticked and locked — it moves by setting it on another address.
 */
export default function SetDefaultsModal({
  address,
  onConfirm,
  onClose,
}: {
  address: ShippingAddress;
  onConfirm: (defaults: AddressDefaults) => void;
  onClose: () => void;
}) {
  const titleId = useId();
  const [shipping, setShipping] = useState(address.isDefaultShipping);
  const [billing, setBilling] = useState(address.isDefaultBilling);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="motion-modal-panel flex w-[400px] max-w-full flex-col overflow-clip rounded-[10px] border border-portal-border bg-portal-light">
        <div className="flex items-center justify-between border-b border-portal-border px-6 py-4">
          <h2 id={titleId} className="min-w-0 flex-1 text-body-xl font-semibold text-portal-text">
            Set As
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 pt-4 pb-6">
          <DefaultCheckbox
            label="Set as default shipping address"
            checked={shipping}
            disabled={address.isDefaultShipping}
            onChange={setShipping}
          />
          <DefaultCheckbox
            label="Set as default billing address"
            checked={billing}
            disabled={address.isDefaultBilling}
            onChange={setBilling}
          />
          <div className="flex w-full gap-2">
            <Button variant="portalOutline" className="min-w-0 flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="portal" className="min-w-0 flex-1" onClick={() => onConfirm({ shipping, billing })}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
