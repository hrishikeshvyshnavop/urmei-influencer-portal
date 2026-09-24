import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Plus, X } from "lucide-react";
import Button from "./Button";
import TextArea from "./TextArea";
import AddressFormModal from "./AddressFormModal";
import { Toast } from "../../shop/components/Toast";
import type { Product } from "../../shop/types";
import {
  addressLines,
  defaultShippingAddress,
  readShippingAddresses,
  saveShippingAddresses,
  upsertShippingAddress,
  type ShippingAddress,
} from "../shipping-addresses";
import { createSampleRequest } from "../sample-requests";
import { navigate } from "../../router";

/** Hoisted so the toast's action doesn't assign to a global from inside render. */
function openSampleRequests() {
  navigate("/sample-requests");
}

/** "50 ML | Blue gel cream" -> "50 ml" — the size the request rows print. */
function sizeOf(product: Product) {
  return product.variant.split("|")[0]!.trim().toLowerCase();
}

type Step = "request" | "select" | "add";

/**
 * Request a sample, end to end (Figma `1030:27669` happy path, `1030:28125`
 * no address, `1030:28438` change address). Open it by passing a product; it
 * walks the request modal, the address picker and the add-address form, files
 * the request, and shows the "Sample product requested" toast itself so every
 * product page that offers "Request sample" behaves the same.
 */
export default function RequestSampleFlow({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  return (
    <>
      {product ? (
        <RequestSampleModals
          key={product.id}
          product={product}
          onClose={onClose}
          onSubmitted={() => {
            onClose();
            setToastVisible(true);
          }}
        />
      ) : null}
      {toastVisible ? (
        <Toast message="Sample product requested" action={{ label: "View Requests", onClick: openSampleRequests }} />
      ) : null}
    </>
  );
}

function RequestSampleModals({
  product,
  onClose,
  onSubmitted,
}: {
  product: Product;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const [addresses, setAddresses] = useState(readShippingAddresses);
  const [selectedId, setSelectedId] = useState(() => defaultShippingAddress(addresses)?.id ?? null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<Step>("request");
  // Where the add-address form returns to: the picker it was opened from, or
  // the request modal's "No shipping address available" state.
  const [afterAdd, setAfterAdd] = useState<Step>("request");

  const selected = addresses.find((address) => address.id === selectedId) ?? null;

  if (step === "add") {
    return (
      <AddressFormModal
        isFirst={addresses.length === 0}
        onClose={() => setStep(afterAdd)}
        onSave={(address) => {
          const { addresses: next, saved } = upsertShippingAddress(addresses, address);
          saveShippingAddresses(next);
          setAddresses(next);
          setSelectedId(saved.id);
          setStep(afterAdd);
        }}
      />
    );
  }

  if (step === "select") {
    return (
      <SelectAddressModal
        addresses={addresses}
        initialId={selectedId}
        onClose={() => setStep("request")}
        onSelect={(id) => {
          setSelectedId(id);
          setStep("request");
        }}
        onAddNew={() => {
          setAfterAdd("select");
          setStep("add");
        }}
      />
    );
  }

  return (
    <ModalShell title="Request a sample product" onClose={onClose} className="bg-portal-surface shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-5 px-6 pt-4 pb-6">
        <div className="flex items-center gap-4">
          <img src={product.heroImage} alt="" className="size-[90px] shrink-0 rounded-[10px] object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate text-body-md font-medium text-portal-text">{product.name}</p>
            <p className="flex items-center gap-2 text-body-sm text-portal-muted">
              <span>Qty 1</span>
              <span aria-hidden="true" className="size-[3px] shrink-0 rounded-full bg-portal-muted" />
              <span>{sizeOf(product)}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex min-h-8 items-center justify-between">
            <p className="text-body-md font-medium text-portal-text">Deliver to</p>
            {selected ? (
              <Button variant="portalOutline" onClick={() => setStep("select")}>
                Change
              </Button>
            ) : null}
          </div>
          {selected ? (
            <div className="bg-portal-light p-4">
              <AddressSummary address={selected} layout="delivery" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-portal-border bg-portal-light p-6 text-center">
              <span className="flex size-8 items-center justify-center rounded-full bg-portal-surface">
                <img src="/urmei/sample-requests/map-pin-plus.svg" alt="" width={16} height={16} className="block size-4" />
              </span>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-body-md font-medium text-portal-text">No shipping address available</p>
                  <p className="text-body-xs text-portal-muted">Add a delivery address to complete your sample request.</p>
                </div>
                <Button
                  variant="portal"
                  leftIcon={<img src="/urmei/sample-requests/plus-inverse.svg" alt="" width={16} height={16} className="block size-4" />}
                  onClick={() => {
                    setAfterAdd("request");
                    setStep("add");
                  }}
                >
                  Add Shipping Address
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* The no-address frame drops the message box until there is somewhere to send the sample. */}
        {selected ? (
          <TextArea
            label="Request Message"
            labelClassName="pb-1 text-body-md font-medium text-portal-text"
            value={message}
            onChange={setMessage}
            placeholder="Tell the brand why you'd like to try this product..."
            heightClassName="h-[88px]"
          />
        ) : null}

        <Button
          variant="portal"
          className="w-full disabled:bg-portal-surface disabled:text-portal-muted disabled:opacity-40"
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            createSampleRequest({
              productId: product.id,
              brand: product.brand,
              productName: product.name,
              size: sizeOf(product),
              quantity: 1,
              image: product.heroImage,
              message: message.trim(),
              shippingAddress: {
                name: selected.fields.label,
                lines: [...addressLines(selected.fields), selected.fields.phone].filter(Boolean),
              },
            });
            onSubmitted();
          }}
        >
          Submit Request
        </Button>
      </div>
    </ModalShell>
  );
}

/** "Select delivery address" (Figma `1030:28744`): radio cards over the saved
 *  addresses; the choice only lands when the creator confirms it. */
function SelectAddressModal({
  addresses,
  initialId,
  onClose,
  onSelect,
  onAddNew,
}: {
  addresses: ShippingAddress[];
  initialId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
  onAddNew: () => void;
}) {
  const [choice, setChoice] = useState(initialId);
  const groupName = useId();

  return (
    <ModalShell title="Select delivery address" onClose={onClose} className="bg-portal-light shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18)]">
      <div className="flex flex-col gap-4 bg-portal-surface px-6 pt-4 pb-6">
        <fieldset className="flex flex-col gap-3 rounded-[10px] border border-portal-border p-4">
          <legend className="float-left mb-3 w-full text-body-md font-medium text-portal-text">Deliver to</legend>
          <div className="flex max-h-[380px] flex-col gap-3 overflow-y-auto">
            {addresses.map((address) => (
              <label key={address.id} className="flex cursor-pointer items-start gap-4 rounded-[6px] bg-portal-light p-4">
                <span className="flex items-center py-[5px]">
                  <input
                    type="radio"
                    name={groupName}
                    checked={choice === address.id}
                    onChange={() => setChoice(address.id)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="flex size-[18px] items-center justify-center rounded-full border-[1.125px] border-portal-placeholder peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-portal-dark"
                  >
                    {choice === address.id ? <span className="size-[9px] rounded-full bg-portal-dark" /> : null}
                  </span>
                </span>
                <AddressSummary address={address} layout="option" />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={onAddNew}
            className="flex cursor-pointer items-center gap-2 self-start py-2 pr-4 text-body-sm font-medium capitalize text-portal-text"
          >
            <Plus aria-hidden="true" className="size-4" strokeWidth={1.5} />
            Add New Shipping Address
          </button>
        </fieldset>
        <div className="flex gap-2">
          <Button variant="portalOutline" className="min-w-0 flex-1 bg-portal-light" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="portal" className="min-w-0 flex-1" disabled={!choice} onClick={() => choice && onSelect(choice)}>
            Select Address
          </Button>
        </div>
      </div>
    </ModalShell>
  );
}

/** The address card body, both set in body-sm with 6px between rows.
 *  - `delivery` — the request modal's "Deliver to" card (Figma `1030:27963`):
 *    the label alone, the address over two lines, the phone as its own row.
 *  - `option` — a "Select delivery address" radio card (`1030:28744`): "label,
 *    postal code", the address on one line with the phone directly under it. */
function AddressSummary({ address, layout }: { address: ShippingAddress; layout: "delivery" | "option" }) {
  const { fields } = address;
  const lines = addressLines(fields);
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-[6px] text-body-sm">
      <p className="font-medium text-portal-text">
        {layout === "option" ? [fields.label, fields.postalCode].filter(Boolean).join(", ") : fields.label}
      </p>
      {layout === "option" ? (
        <div className="text-portal-muted">
          <p>{lines.join(" ")}</p>
          {fields.phone ? <p>{fields.phone}</p> : null}
        </div>
      ) : (
        <>
          <div className="text-portal-muted">
            {lines.map((line) => <p key={line}>{line}</p>)}
          </div>
          {fields.phone ? <p className="text-portal-muted">{fields.phone}</p> : null}
        </>
      )}
    </div>
  );
}

/** The 525px request-flow modal: backdrop, scroll lock, Escape, and a bordered
 *  header with the 40px close button. Surface and shadow come in through
 *  `className` — the two frames differ on both. */
function ModalShell({
  title,
  onClose,
  className,
  children,
}: {
  title: string;
  onClose: () => void;
  className: string;
  children: ReactNode;
}) {
  const titleId = useId();

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
      className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[rgba(34,34,34,0.45)] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={`motion-modal-panel my-auto flex w-[525px] max-w-full flex-col overflow-clip rounded-[10px] border border-portal-border ${className}`}>
        <div className="flex items-center justify-between border-b border-portal-border px-6 py-4">
          <h2 id={titleId} className="min-w-0 flex-1 text-body-xl text-portal-text">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-portal-border"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
