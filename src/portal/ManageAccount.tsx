import { useEffect, useRef, useState } from "react";
import { Camera, IdCard, Landmark, MapPin, Pencil, ShieldCheck, Trash2, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import Button from "./components/Button";
import FieldGrid from "./components/FieldGrid";
import FormModal from "./components/FormModal";
import ProfilePhoto from "./components/ProfilePhoto";
import { PROFILE_PHOTO_KEY } from "./profile-photo";
import SocialAccountRow, { type SocialPlatform } from "./components/SocialAccountRow";
import { VERIFICATION_MESSAGE_TYPE, VERIFICATION_STORAGE_KEY } from "./VerificationPartner";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { CropModal } from "./SetProfilePhoto";
import TextField from "./components/TextField";
import { BANK_FIELDS, PAYMENT_MESSAGE_TYPE, readBankAccount, saveBankAccount, type BankAccount } from "./bank-account";
import { ADDRESS_MODAL_FIELDS, type FieldSpec } from "./form-fields";
import { loadShippingAddresses, saveShippingAddresses, type ShippingAddress } from "./shipping-address";
import { clearSetupRequired, isSetupRequired } from "./setup-status";
import { getSavedBio, getSavedDisplayName, saveBio, saveDisplayName } from "./profile-status";
import { requestProductTour } from "./tour-status";

const socialPlatforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@charlottetan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

const initialProfile = {
  displayName: getSavedDisplayName("Charlotte"),
  bio: getSavedBio(),
  phone: "+65 9123 4567",
  dob: "1998-01-15",
};

/**
 * The bank modal (Figma `1619:59252`) asks for exactly what profile setup asks
 * for, in its own order: holder and bank, then the numbers, then holder type
 * across the row, then account type beside the payout currency.
 */
const BANK_MODAL_FIELDS: FieldSpec[] = [
  "accountHolderName",
  "bankName",
  "bankAccountNumber",
  "bankCode",
  "accountHolderType",
  "accountType",
  "payoutCurrency",
].flatMap((name) => {
  const field = BANK_FIELDS.find((item) => item.name === name);
  if (!field) return [];
  // No asterisks in the modal — profile setup marks the same fields required,
  // this frame does not. `optional` still drives which ones must be filled.
  return [{ ...field, required: false, fullWidth: name === "accountHolderType" }];
});

const emptyAddressFields: Record<string, string> = { label: "", blockNo: "", street: "", building: "", floorNo: "", unitNumber: "", postalCode: "", country: "Singapore", phone: "" };

/**
 * The two lines the design prints under an address label: the street, then
 * everything that locates it inside the street. Both drop what is missing, so
 * an address with no floor, unit or building still reads cleanly.
 */
function addressLines(fields: Record<string, string>) {
  const street = [[fields.blockNo, fields.street].filter(Boolean).join(" "), fields.building].filter(Boolean).join(", ");
  const within = [
    fields.floorNo ? `Floor ${fields.floorNo}` : "",
    fields.unitNumber ? `Unit ${fields.unitNumber}` : "",
    [fields.country, fields.postalCode].filter(Boolean).join(" "),
  ].filter(Boolean).join(", ");
  return [street, within].filter(Boolean);
}

const latestEligibleBirthday = (() => {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  date.setFullYear(date.getFullYear() - 18);
  return date;
})();

function isIdentityVerified() {
  try {
    const saved = window.localStorage.getItem(VERIFICATION_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as { status?: string }).status === "complete" : false;
  } catch {
    return false;
  }
}

export type ManageAccountSection = "Profile" | "Social accounts" | "Payouts" | "Shipping addresses";

/** The rail's labels are the design's (Figma `1613:61946`) — "Bank details",
 *  not "Payout", though the section key stays as the routes spell it. */
const NAV_ITEMS: { key: ManageAccountSection; label: string }[] = [
  { key: "Profile", label: "Profile" },
  { key: "Shipping addresses", label: "Addresses" },
  { key: "Social accounts", label: "Social Accounts" },
  { key: "Payouts", label: "Bank details" },
];

/** Header + supporting line above each section's content. */
function SectionHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex w-full items-start justify-between gap-4">
      <div className="flex min-w-px flex-1 flex-col gap-[6px]">
        <h2 className="text-body-xxl">{title}</h2>
        <p className="text-body-sm text-portal-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}

/** The centred "nothing here yet" block both empty sections draw (Figma
 *  `1616:64619` / `1616:65119`): glyph, headline, one line, one action. */
function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-[540px] flex-col items-center gap-fourteen p-md">
        <div className="flex w-full flex-col items-center gap-ten">
          <span className="flex size-12 items-center justify-center rounded-full">{icon}</span>
          <div className="flex w-full flex-col items-center text-center">
            <p className="text-body-xxl">{title}</p>
            <p className="text-body-sm text-portal-muted">{description}</p>
          </div>
        </div>
        {action}
      </div>
    </div>
  );
}

/** The design's 40px bordered icon control (delete / edit an entry). */
function IconButton({ label, onClick, disabled, tone = "default", children }: { label: string; onClick: () => void; disabled?: boolean; tone?: "default" | "alert"; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-portal-border transition-colors disabled:cursor-not-allowed disabled:text-portal-disabled ${tone === "alert" ? "text-portal-alert" : "text-portal-text"}`}
    >
      {children}
    </button>
  );
}

export default function ManageAccount({
  initialSection = "Profile",
}: {
  initialSection?: ManageAccountSection;
} = {}) {
  const photoInput = useRef<HTMLInputElement>(null);
  const [photoVersion, setPhotoVersion] = useState(0);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [photoOffset, setPhotoOffset] = useState(0);
  const [photoCropScale, setPhotoCropScale] = useState(1);
  const [displayName, setDisplayName] = useState(initialProfile.displayName);
  const [bio, setBio] = useState(initialProfile.bio);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [dob, setDob] = useState(initialProfile.dob);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<ManageAccountSection>(initialSection);
  const [connectedSocials, setConnectedSocials] = useState(["instagram", "tiktok"]);
  const [identityVerified, setIdentityVerified] = useState(isIdentityVerified);
  const [identityPending, setIdentityPending] = useState(false);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(readBankAccount);
  const [setupRequired, setSetupRequired] = useState(isSetupRequired);
  const [shippingAddresses, setShippingAddresses] = useState(loadShippingAddresses);
  const [addressDraft, setAddressDraft] = useState<ShippingAddress | null>(null);
  const [addressErrors, setAddressErrors] = useState(false);
  const [bankDraft, setBankDraft] = useState<Record<string, string> | null>(null);
  const [bankErrors, setBankErrors] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const [stickyOffset, setStickyOffset] = useState(120);
  const paymentConnected = bankAccount !== null;
  const profileDirty = displayName !== savedProfile.displayName || bio !== savedProfile.bio || phone !== savedProfile.phone || dob !== savedProfile.dob;

  useEffect(() => {
    saveShippingAddresses(shippingAddresses);
  }, [shippingAddresses]);

  useEffect(() => {
    if (setupRequired && identityVerified && paymentConnected) {
      clearSetupRequired();
      setSetupRequired(false);
    }
  }, [setupRequired, identityVerified, paymentConnected]);

  useEffect(() => {
    const syncIdentity = () => {
      if (isIdentityVerified()) {
        setIdentityVerified(true);
        setIdentityPending(false);
      }
    };
    const receiveIdentity = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === VERIFICATION_MESSAGE_TYPE && event.data?.status === "complete") syncIdentity();
    };
    window.addEventListener("storage", syncIdentity);
    window.addEventListener("message", receiveIdentity);
    return () => {
      window.removeEventListener("storage", syncIdentity);
      window.removeEventListener("message", receiveIdentity);
    };
  }, []);

  useEffect(() => {
    const bannerEl = bannerRef.current;
    const updateOffset = () => {
      // Header (and banner, when shown) plus `main`'s py-8: where the rail
      // parks once the page title above it has scrolled away.
      setStickyOffset(88 + (bannerEl?.offsetHeight ?? 0) + 32);
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    if (bannerEl) observer.observe(bannerEl);
    return () => observer.disconnect();
  }, [setupRequired, identityVerified, paymentConnected]);

  useEffect(() => {
    // Payout details can also arrive from profile setup in another tab, or
    // from the provider popup an older account connected through.
    const syncPayment = () => setBankAccount(readBankAccount());
    const receivePayment = (event: MessageEvent) => {
      if (event.origin === window.location.origin && event.data?.type === PAYMENT_MESSAGE_TYPE && event.data?.status === "complete") syncPayment();
    };
    window.addEventListener("storage", syncPayment);
    window.addEventListener("message", receivePayment);
    return () => {
      window.removeEventListener("storage", syncPayment);
      window.removeEventListener("message", receivePayment);
    };
  }, []);

  const startIdentityVerification = () => {
    setIdentityPending(true);
    const partnerUrl = new URL(window.location.href);
    partnerUrl.hash = "#/verify/partner";
    const width = 520;
    const height = 720;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
    const popup = window.open(partnerUrl, "urmei-verification-partner", `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes`);
    if (popup) popup.focus();
    else {
      setIdentityPending(false);
      window.location.hash = "#/verify";
    }
  };

  const updateProfilePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result !== "string") return;
      setPhotoOffset(0);
      setPhotoCropScale(1);
      setPendingPhoto(reader.result);
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const openAddressModal = (address?: ShippingAddress) => {
    setAddressDraft(address ? { ...address, fields: { ...address.fields } } : { id: "", isDefault: shippingAddresses.length === 0, fields: { ...emptyAddressFields } });
    setAddressErrors(false);
  };

  const saveAddress = () => {
    if (!addressDraft) return;
    setAddressErrors(true);
    const complete = ADDRESS_MODAL_FIELDS.every((field) => field.optional || (addressDraft.fields[field.name] ?? "").trim());
    if (!complete) return;
    const nextId = addressDraft.id || `address-${Date.now()}`;
    const nextAddress = { ...addressDraft, id: nextId };
    setShippingAddresses((current) => {
      let next = addressDraft.id ? current.map((item) => (item.id === addressDraft.id ? nextAddress : item)) : [...current, nextAddress];
      if (nextAddress.isDefault || current.length === 0) next = next.map((item) => ({ ...item, isDefault: item.id === nextId }));
      return next;
    });
    setAddressDraft(null);
  };

  const saveBank = () => {
    if (!bankDraft) return;
    setBankErrors(true);
    const complete = BANK_MODAL_FIELDS.every((field) => field.optional || (bankDraft[field.name] ?? "").trim());
    if (!complete) return;
    saveBankAccount(bankDraft);
    setBankAccount(readBankAccount());
    setBankDraft(null);
  };

  const railNav = (
    <nav aria-label="Account settings" className="flex w-full shrink-0 gap-[2px] overflow-x-auto sm:flex-col">
      {NAV_ITEMS.map(({ key, label }) => <button key={key} type="button" onClick={() => setActiveSection(key)} className={`flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 text-left text-body-sm tracking-[1.4px] uppercase ${key === activeSection ? "bg-portal-tick font-medium text-portal-text" : "text-portal-muted"}`}><span className="min-w-0 flex-1">{label}</span>{(key === "Profile" && (setupRequired || !identityVerified)) || (key === "Payouts" && (setupRequired || !paymentConnected)) ? <TriangleAlert aria-label="Setup required" className="size-4 shrink-0 text-[#f59e0b]" strokeWidth={1.75} /> : null}</button>)}
    </nav>
  );

  return (
    <div className="min-h-screen bg-portal-light text-portal-text">
      <AppHeader
        onShowTour={requestProductTour}
        onShowHelp={() => { window.location.hash = "#/help-center"; }}
      />

      {setupRequired || !identityVerified || !paymentConnected ? (
        <aside
          ref={bannerRef}
          className="sticky top-[88px] z-20 flex w-full items-center justify-center gap-3 border-b border-[#e6e5e4] bg-portal-light px-6 py-3 lg:px-[120px]"
          aria-label="Account setup required"
        >
          <div className="flex items-center gap-3">
            <img src="/urmei/icon-triangle-alert.svg" alt="" aria-hidden="true" className="size-5 shrink-0" />
            <p className="text-body-md font-medium text-[#2d2305]">
              {!identityVerified && !paymentConnected
                ? "To publish your shop, you need to verify your identity and add bank details."
                : !identityVerified
                  ? "To publish your shop, you need to verify your identity."
                  : "To publish your shop, you need to add bank details."}
            </p>
          </div>
        </aside>
      ) : null}

      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1440px] flex-col gap-xl px-6 py-8 lg:px-[120px]">
        {/* The page title sits above both columns in the design, so the rail's
            first pill lines up with the section header beside it. */}
        <h1 className="text-body-xxl">Manage Your Account</h1>
        <div className="flex flex-col items-start gap-10 sm:flex-row">
          <div className="w-full shrink-0 sm:hidden">{railNav}</div>
          <div style={{ top: stickyOffset }} className="z-10 hidden w-[260px] shrink-0 flex-col sm:sticky sm:flex">
            {railNav}
          </div>
          <section className="flex min-w-0 flex-1 flex-col gap-5">
            {activeSection === "Social accounts" ? (
              <>
                <SectionHeader title="Connected Socials" description="Your connected accounts help brands see your social reach and engagement." />
                <div className="flex w-full flex-col gap-[6px]">
                  <div className="divide-y divide-portal-border overflow-hidden rounded-md border border-portal-border bg-white">
                    {socialPlatforms.map((platform) => (
                      <SocialAccountRow
                        key={platform.id}
                        platform={platform}
                        connected={connectedSocials.includes(platform.id)}
                        onToggle={() => setConnectedSocials((current) => current.includes(platform.id) ? current.filter((id) => id !== platform.id) : [...current, platform.id])}
                      />
                    ))}
                  </div>
                  <p className="w-full text-body-xxs text-portal-muted opacity-80">We keep your accounts safe and secure. We&#39;ll never post anything on your behalf or look at your private messages.</p>
                </div>
              </>
            ) : activeSection === "Payouts" ? (
              bankAccount ? (
                <>
                  <SectionHeader title="Bank details" description="Manage where URMEI send your payout." />
                  <div className="overflow-hidden rounded-lg border border-portal-border bg-portal-light">
                    <div className="flex w-full items-start gap-5 p-5">
                      <div className="flex min-w-px flex-1 flex-col items-start gap-[6px]">
                        <p className="text-body-sm font-medium">{bankAccount.accountHolderName}</p>
                        <p className="text-body-sm text-portal-muted">{[bankAccount.bankName, bankAccount.accountType].filter(Boolean).join(" | ")}</p>
                        <div className="text-body-sm text-portal-muted">
                          <p>Account number : {bankAccount.bankAccountNumber}</p>
                          {bankAccount.bankCode ? <p>Bank code : {bankAccount.bankCode}</p> : null}
                          <p>Account holder type : {bankAccount.accountHolderType}</p>
                        </div>
                        {bankAccount.payoutCurrency ? <p className="text-body-sm text-portal-muted">Payout currency : {bankAccount.payoutCurrency}</p> : null}
                      </div>
                      <IconButton label="Edit bank details" onClick={() => { setBankDraft({ ...bankAccount }); setBankErrors(false); }}>
                        <Pencil className="size-4" strokeWidth={1.5} />
                      </IconButton>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyState
                  icon={<Landmark className="size-8" strokeWidth={1.5} />}
                  title="Bank details not added"
                  description="To publish your shop, you need to add bank details"
                  action={<Button variant="portal" onClick={() => { setBankDraft({}); setBankErrors(false); }}>Add Bank Details</Button>}
                />
              )
            ) : activeSection === "Shipping addresses" ? (
              shippingAddresses.length > 0 ? (
                <>
                  <SectionHeader
                    title="Shipping address"
                    description="Manage where brands send your product samples."
                    action={<Button variant="portal" onClick={() => openAddressModal()}>Add Address</Button>}
                  />
                  <div className="overflow-hidden rounded-lg border border-portal-border bg-portal-light">
                    {shippingAddresses.map((address, index) => (
                      <div key={address.id} className={`flex w-full items-start gap-5 p-5 ${index > 0 ? "border-t border-portal-border" : ""}`}>
                        <div className="flex min-w-px flex-1 flex-col items-start gap-[6px]">
                          <div className="flex w-full flex-wrap items-center gap-2">
                            <p className="text-body-sm font-medium">{address.fields.label}</p>
                            {address.isDefault ? <span className="rounded-full bg-portal-tick px-2 py-[3px] text-body-sm font-medium">For sample shipping</span> : null}
                          </div>
                          <div className="text-body-sm text-portal-muted">
                            {addressLines(address.fields).map((line) => <p key={line}>{line}</p>)}
                          </div>
                          <p className="text-body-sm text-portal-muted">{address.fields.phone}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          {!address.isDefault ? (
                            <Button variant="portalOutline" onClick={() => setShippingAddresses((current) => current.map((item) => ({ ...item, isDefault: item.id === address.id })))}>
                              Mark as Samples Sending Address
                            </Button>
                          ) : null}
                          <IconButton
                            label="Delete address"
                            tone="alert"
                            onClick={() => setShippingAddresses((current) => {
                              const remaining = current.filter((item) => item.id !== address.id);
                              return address.isDefault && remaining.length > 0 ? remaining.map((item, itemIndex) => ({ ...item, isDefault: itemIndex === 0 })) : remaining;
                            })}
                          >
                            <Trash2 className="size-4" strokeWidth={1.5} />
                          </IconButton>
                          <IconButton label="Edit address" onClick={() => openAddressModal(address)}>
                            <Pencil className="size-4" strokeWidth={1.5} />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState
                  icon={<MapPin className="size-8" strokeWidth={1.5} />}
                  title="No address added"
                  description="Add an address for brands to send your product samples."
                  action={<Button variant="portal" onClick={() => openAddressModal()}>Add Address</Button>}
                />
              )
            ) : (
              <div className="flex w-full flex-col gap-10">
                <div className="flex w-full flex-col gap-5">
                  <SectionHeader title="Profile" description="This is what shoppers see on your storefront." />
                  <div className="flex flex-col gap-5 rounded-lg border border-portal-border bg-portal-light p-6">
                    <div className="flex items-end gap-5">
                      <span className="relative size-[88px] shrink-0 overflow-hidden rounded-full">
                        <ProfilePhoto key={photoVersion} fallback="/urmei/home/profile-dropdown-avatar.png" alt="Profile photo" />
                      </span>
                      <div className="flex flex-col items-start gap-2">
                        <input ref={photoInput} type="file" accept="image/jpeg,image/png" onChange={updateProfilePhoto} className="hidden" />
                        <Button variant="portalOutline" onClick={() => photoInput.current?.click()}>Change Photo</Button>
                        <p className="text-body-sm text-portal-muted">Square image, at least 400×400. JPG or PNG, up to 5 MB.</p>
                      </div>
                    </div>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium">Display name<input value={displayName} onChange={(e) => { setDisplayName(e.target.value); setSaved(false); }} className="rounded-sm border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium"><span className="flex justify-between"><span>About me</span><span className="font-normal text-portal-placeholder">{bio.length} / 160</span></span><textarea value={bio} maxLength={160} onChange={(e) => { setBio(e.target.value); setSaved(false); }} className="h-[120px] resize-none rounded-sm border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium">Username<input value="@charlotte" readOnly className="rounded-sm border border-portal-surface bg-portal-surface px-4 py-3 font-normal text-portal-placeholder outline-none" /><span className="font-normal text-portal-muted">Your storefront url and every affiliate link you have shared use this. It cannot be changed.</span></label>
                  </div>
                </div>

                {!identityVerified ? (
                  <div className="flex w-full flex-col gap-5">
                    <SectionHeader title="Identity" description="Verify your identity to complete your shop setup and enable payouts." />
                    <div className="flex flex-col gap-4 rounded-lg border border-portal-border bg-portal-light p-5">
                      <p className="text-body-sm text-portal-muted">You&#39;ll need the following</p>
                      <div className="flex flex-col gap-1 text-body-sm text-portal-muted"><p className="flex items-center gap-2"><IdCard className="size-4" strokeWidth={1.5} />Government-issued photo ID</p><p className="flex items-center gap-2"><Camera className="size-4" strokeWidth={1.5} />Camera-enabled device</p><p className="flex items-center gap-2"><ShieldCheck className="size-4" strokeWidth={1.5} />Personal details matching your account</p></div>
                      <div className="flex items-center gap-3"><Button variant="portal" disabled={identityPending} onClick={startIdentityVerification}>{identityPending ? "Verifying…" : "Start secure verification"}</Button><span className="text-body-xs text-portal-muted">Usually takes 3-5 minutes</span></div>
                      <p className="text-body-xs text-portal-muted opacity-80">Your documents are processed securely by our verification partner. URMEI only receives the verification result and required identity data.</p>
                    </div>
                  </div>
                ) : null}

                <div className="flex w-full flex-col gap-5">
                  <SectionHeader title="Personal Information" description="None of this appears on your storefront." />
                  <div className="grid gap-5 rounded-lg border border-portal-border bg-portal-light p-6 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium">First name<input value="Charlotte" readOnly className="rounded-sm border border-portal-surface bg-portal-surface px-4 py-3 font-normal text-portal-placeholder" /></label>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium">Last name<input value="Tan" readOnly className="rounded-sm border border-portal-surface bg-portal-surface px-4 py-3 font-normal text-portal-placeholder" /></label>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium sm:col-span-2">Email address<input value="charlotte@gmail.com" readOnly className="rounded-sm border border-portal-surface bg-portal-surface px-4 py-3 font-normal text-portal-placeholder" /><span className="font-normal text-portal-muted">Changing your email sends a confirmation link to both the old and new address.</span></label>
                    <label className="flex flex-col gap-1.5 text-body-sm font-medium">Phone number<input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} className="rounded-sm border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>
                    <TextField label="DOB" placeholder="DD MMM YYYY" value={dob} icon="calendar" latestDate={latestEligibleBirthday} onChange={(value) => { setDob(value); setSaved(false); }} />
                  </div>
                </div>

                <div className="flex w-full justify-end"><Button variant="portal" className="w-[164px]" disabled={!profileDirty || saved} onClick={() => { saveDisplayName(displayName); saveBio(bio); setSavedProfile({ displayName, bio, phone, dob }); setSaved(true); }}>{saved ? "Saved" : "Save Changes"}</Button></div>
              </div>
            )}
          </section>
        </div>
      </main>
      <AppFooter />
      {addressDraft ? (
        <FormModal
          title={addressDraft.id ? "Edit shipping address" : "Add shipping address"}
          submitLabel="Save Address"
          onSubmit={saveAddress}
          onClose={() => setAddressDraft(null)}
        >
          <FieldGrid
            fields={ADDRESS_MODAL_FIELDS}
            values={addressDraft.fields}
            showErrors={addressErrors}
            onChange={(name, value) => setAddressDraft((current) => current && { ...current, fields: { ...current.fields, [name]: value } })}
          />
          <label className="flex w-full cursor-pointer items-center gap-[10px] text-body-sm">
            <input
              type="checkbox"
              checked={addressDraft.isDefault}
              onChange={(event) => setAddressDraft((current) => current && { ...current, isDefault: event.target.checked })}
              className="size-[18px] rounded-xs border border-portal-border accent-portal-dark"
            />
            Set this as my shipping address for samples products.
          </label>
        </FormModal>
      ) : null}
      {bankDraft ? (
        <FormModal
          title={bankAccount ? "Edit bank details" : "Add bank details"}
          submitLabel={bankAccount ? "Save" : "Add"}
          onSubmit={saveBank}
          onClose={() => setBankDraft(null)}
        >
          <FieldGrid
            fields={BANK_MODAL_FIELDS}
            values={bankDraft}
            showErrors={bankErrors}
            onChange={(name, value) => setBankDraft((current) => ({ ...current, [name]: value }))}
          />
        </FormModal>
      ) : null}
      {pendingPhoto ? (
        <CropModal
          src={pendingPhoto}
          offset={photoOffset}
          onOffsetChange={setPhotoOffset}
          cropScale={photoCropScale}
          onCropScaleChange={setPhotoCropScale}
          onCancel={() => setPendingPhoto(null)}
          onApply={() => {
            try {
              window.localStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify({ src: pendingPhoto, offset: photoOffset, cropScale: photoCropScale }));
            } catch {
              // The selected photo remains optional when browser storage is unavailable.
            }
            setPendingPhoto(null);
            setPhotoVersion((current) => current + 1);
          }}
        />
      ) : null}
    </div>
  );
}
