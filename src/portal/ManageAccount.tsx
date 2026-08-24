import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, CreditCard, FileText, MapPin, Plus, ShieldCheck, Trash2, X } from "lucide-react";
import Button from "./components/Button";
import ProfilePhoto, { PROFILE_PHOTO_KEY } from "./components/ProfilePhoto";
import SocialAccountRow, { type SocialPlatform } from "./components/SocialAccountRow";
import { VERIFICATION_MESSAGE_TYPE, VERIFICATION_STORAGE_KEY } from "./VerificationPartner";
import { PAYMENT_MESSAGE_TYPE, PAYMENT_STORAGE_KEY } from "./PaymentPartner";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { CropModal } from "./SetProfilePhoto";
import ShopUrl from "./components/ShopUrl";

const socialPlatforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@CharlotteTan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

function isIdentityVerified() {
  try {
    const saved = window.localStorage.getItem(VERIFICATION_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as { status?: string }).status === "complete" : false;
  } catch {
    return false;
  }
}

function isPaymentConnected() {
  try {
    const saved = window.localStorage.getItem(PAYMENT_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as { status?: string }).status === "complete" : false;
  } catch {
    return false;
  }
}

export default function ManageAccount() {
  const photoInput = useRef<HTMLInputElement>(null);
  const [photoVersion, setPhotoVersion] = useState(0);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const [photoOffset, setPhotoOffset] = useState(0);
  const [photoCropScale, setPhotoCropScale] = useState(1);
  const [displayName, setDisplayName] = useState("Charlotte");
  const [bio, setBio] = useState("Beauty, skincare and everyday lifestyle creator based in Singapore.");
  const [phone, setPhone] = useState("+65 9123 4567");
  const [dob, setDob] = useState("1998-06-18");
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<"Profile" | "Social accounts" | "Identity" | "Payouts" | "Shipping addresses">("Profile");
  const [connectedSocials, setConnectedSocials] = useState(["instagram", "tiktok"]);
  const [identityVerified, setIdentityVerified] = useState(isIdentityVerified);
  const [identityPending, setIdentityPending] = useState(false);
  const [paymentConnected, setPaymentConnected] = useState(isPaymentConnected);
  const [paymentPending, setPaymentPending] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({ name: "Charlotte Tan", line1: "10 Anson Road", line2: "#12-01 International Plaza", postalCode: "079903", country: "Singapore", phone: "+65 9123 4567" });
  const [addressDraft, setAddressDraft] = useState(shippingAddress);
  const [editingAddress, setEditingAddress] = useState(false);

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
    if (!editingAddress) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [editingAddress]);

  useEffect(() => {
    const syncPayment = () => {
      if (isPaymentConnected()) {
        setPaymentConnected(true);
        setPaymentPending(false);
      }
    };
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

  const openPayoutPartner = () => {
    setPaymentPending(true);
    const partnerUrl = new URL(window.location.href);
    partnerUrl.hash = "#/payment/partner";
    const width = 520;
    const height = 720;
    const left = Math.max(0, window.screenX + (window.outerWidth - width) / 2);
    const top = Math.max(0, window.screenY + (window.outerHeight - height) / 2);
    const popup = window.open(partnerUrl, "urmei-payment-partner", `popup=yes,width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes`);
    if (popup) popup.focus();
    else {
      setPaymentPending(false);
      window.location.hash = "#/payment";
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

  return (
    <div className="motion-page min-h-screen bg-portal-surface text-portal-text">
      <AppHeader
        onShowTour={() => { window.location.hash = "#/home/tour"; }}
        onShowHelp={() => { window.location.hash = "#/help-center"; }}
      />

      <main className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-[1200px] flex-col gap-9 px-6 py-8 lg:px-0">
        <div><h1 className="text-body-xxl font-medium">Manage Account</h1><p className="text-body-sm text-portal-muted">Your profile, payouts and connected accounts.</p></div>
        <div className="flex flex-col items-start gap-10 md:flex-row">
          <nav aria-label="Account settings" className="flex w-full shrink-0 gap-1 overflow-x-auto md:w-[260px] md:flex-col">{(["Profile", "Social accounts", "Identity", "Payouts", "Shipping addresses"] as const).map((item) => <button key={item} type="button" onClick={() => setActiveSection(item)} className={`shrink-0 rounded-lg px-3 py-2.5 text-left text-body-sm ${item === activeSection ? "bg-portal-tint font-medium text-portal-text" : "text-portal-muted"}`}>{item}</button>)}</nav>
          <section className="flex min-w-0 flex-1 flex-col gap-5">
            {activeSection === "Social accounts" ? (
              <>
                <div><h2 className="track-section text-body-md font-medium uppercase">Social Accounts</h2><p className="text-body-sm text-portal-muted">Connect your social accounts so brands can discover your audience and content.</p></div>
                <div className="overflow-hidden rounded-[10px] border border-portal-border bg-white divide-y divide-portal-border">
                  {socialPlatforms.map((platform) => (
                    <SocialAccountRow
                      key={platform.id}
                      platform={platform}
                      connected={connectedSocials.includes(platform.id)}
                      onToggle={() => setConnectedSocials((current) => current.includes(platform.id) ? current.filter((id) => id !== platform.id) : [...current, platform.id])}
                    />
                  ))}
                </div>
                <div className="flex items-start gap-3 rounded-[10px] border border-portal-border bg-white p-4 text-body-sm text-portal-muted"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-portal-tint">i</span><p>Connected account usernames are displayed on your creator profile. You can disconnect an account at any time.</p></div>
              </>
            ) : activeSection === "Identity" ? (
              <>
                <div><h2 className="track-section text-body-md font-medium uppercase">Identity Verification</h2><p className="text-body-sm text-portal-muted">Verify your identity to keep your account secure and receive creator payouts.</p></div>
                {identityVerified ? (
                  <div className="flex flex-col gap-5 rounded-[10px] border border-portal-border bg-white p-6">
                    <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle2 className="size-4" strokeWidth={1.75} /></span><div><h3 className="text-body-md font-medium">Identity verified</h3><p className="text-body-sm text-portal-muted">Your identity verification is complete.</p></div></div>
                    <div className="flex flex-col gap-3 border-t border-portal-border pt-5 text-body-sm"><div className="flex justify-between gap-4"><span className="text-portal-muted">Verified name</span><span className="font-medium">Charlotte Tan</span></div><div className="flex justify-between gap-4"><span className="text-portal-muted">Country</span><span className="font-medium">Singapore</span></div><div className="flex justify-between gap-4"><span className="text-portal-muted">Document</span><span className="font-medium">Government-issued ID</span></div></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 rounded-[10px] border border-portal-border bg-white p-6">
                    <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-portal-tint"><ShieldCheck className="size-5" strokeWidth={1.5} /></span><div><h3 className="text-body-md font-medium">Verify your identity</h3><p className="text-body-sm text-portal-muted">You will complete verification securely in a separate window.</p></div></div>
                    <div className="flex flex-col gap-3 rounded-lg bg-[#f8f8f8] p-4 text-body-sm text-portal-muted"><p className="flex items-center gap-2"><FileText className="size-4" strokeWidth={1.5} />A valid government-issued photo ID</p><p className="flex items-center gap-2"><ShieldCheck className="size-4" strokeWidth={1.5} />Personal details matching your account</p></div>
                    <div><Button variant="portal" disabled={identityPending} onClick={startIdentityVerification}>{identityPending ? "Verification in progress" : "Verify identity"}</Button></div>
                  </div>
                )}
              </>
            ) : activeSection === "Payouts" ? (
              <>
                <div><h2 className="track-section text-body-md font-medium uppercase">Payouts</h2><p className="text-body-sm text-portal-muted">Manage where your creator earnings are paid.</p></div>
                {paymentConnected ? (
                  <div className="flex flex-col gap-5 rounded-[10px] border border-portal-border bg-white p-6">
                    <div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle2 className="size-4" /></span><div><h3 className="text-body-md font-medium">Payment connection completed</h3><p className="text-body-sm text-portal-muted">Your payout account is ready to receive earnings.</p></div></div>
                    <div className="grid gap-3 border-t border-portal-border pt-5 text-body-sm"><div className="flex justify-between"><span className="text-portal-muted">Account name</span><span className="font-medium">Charlotte Tan</span></div><div className="flex justify-between"><span className="text-portal-muted">Currency</span><span className="font-medium">SGD (Singapore Dollar)</span></div><div className="flex justify-between"><span className="text-portal-muted">Account number</span><span className="font-medium">•••• •••• 4829</span></div><div className="flex justify-between"><span className="text-portal-muted">Payment provider</span><span className="font-medium">HitPay</span></div></div>
                    <div><Button variant="portalOutline" disabled={paymentPending} onClick={openPayoutPartner}>{paymentPending ? "Opening HitPay" : "Manage payout account"}</Button></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 rounded-[10px] border border-portal-border bg-white p-6"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-portal-tint"><CreditCard className="size-5" strokeWidth={1.5} /></span><div><h3 className="text-body-md font-medium">Connect a payout account</h3><p className="text-body-sm text-portal-muted">Connect securely through HitPay to receive creator earnings in SGD.</p></div></div><div><Button variant="portal" disabled={paymentPending} onClick={identityVerified ? openPayoutPartner : startIdentityVerification}>{paymentPending ? "Opening HitPay" : identityVerified ? "Connect HitPay" : "Verify identity first"}</Button></div></div>
                )}
              </>
            ) : activeSection === "Shipping addresses" ? (
              <>
                <div className="flex items-start justify-between gap-4"><div><h2 className="track-section text-body-md font-medium uppercase">Shipping Addresses</h2><p className="text-body-sm text-portal-muted">Manage where campaign products and creator samples are delivered.</p></div>{!editingAddress ? <Button variant="portalOutline" onClick={() => { setAddressDraft(shippingAddress); setEditingAddress(true); }}><Plus className="size-4" /> Add address</Button> : null}</div>
                {shippingAddress.name ? (
                  <div className="flex items-start gap-4 rounded-[10px] border border-portal-border bg-white p-6"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-portal-tint"><MapPin className="size-5" strokeWidth={1.5} /></span><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="text-body-md font-medium">{shippingAddress.name}</h3><span className="rounded-md bg-portal-tint px-2 text-body-xs font-medium">Default</span></div><p className="mt-2 text-body-sm text-portal-muted">{shippingAddress.line1}<br />{shippingAddress.line2}<br />Singapore {shippingAddress.postalCode}<br />{shippingAddress.country}</p><p className="mt-2 text-body-sm text-portal-muted">{shippingAddress.phone}</p></div><div className="flex gap-2"><Button variant="portalOutline" onClick={() => { setAddressDraft(shippingAddress); setEditingAddress(true); }}>Edit</Button><button type="button" aria-label="Remove shipping address" onClick={() => setShippingAddress({ name: "", line1: "", line2: "", postalCode: "", country: "Singapore", phone: "" })} className="flex size-10 items-center justify-center rounded-lg border border-portal-border text-portal-alert"><Trash2 className="size-4" /></button></div></div>
                ) : (
                  <div className="flex flex-col items-center gap-4 rounded-[10px] border border-dashed border-portal-border bg-white p-10 text-center"><MapPin className="size-8 text-portal-muted" /><div><h3 className="text-body-md font-medium">No shipping address</h3><p className="text-body-sm text-portal-muted">Add an address to receive campaign products.</p></div><Button variant="portal" onClick={() => { setAddressDraft({ name: "", line1: "", line2: "", postalCode: "", country: "Singapore", phone: "" }); setEditingAddress(true); }}>Add address</Button></div>
                )}
              </>
            ) : (
              <>
            <div><h2 className="track-section text-body-md font-medium uppercase">Profile</h2><p className="text-body-sm text-portal-muted">This is what shoppers see on your storefront.</p></div>
            <div className="flex flex-col gap-5 rounded-[10px] border border-portal-border bg-white p-6">
              <div className="flex items-start gap-4"><span className="relative size-16 shrink-0 overflow-hidden rounded-full"><ProfilePhoto key={photoVersion} fallback="/urmei/home/profile-dropdown-avatar.png" alt="Profile photo" /></span><div><p className="text-body-sm font-medium">Profile photo</p><p className="text-body-sm text-portal-muted">Square image, at least 400×400. JPG or PNG, up to 5 MB.</p><input ref={photoInput} type="file" accept="image/jpeg,image/png" onChange={updateProfilePhoto} className="hidden" /><button type="button" onClick={() => photoInput.current?.click()} className="mt-2 rounded-lg border border-portal-border px-4 py-2 text-body-sm font-medium">Change Photo</button></div></div>
              <label className="flex flex-col gap-1.5 text-body-sm font-medium">Display name<input value={displayName} onChange={(e) => { setDisplayName(e.target.value); setSaved(false); }} className="rounded-[6px] border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>
              <label className="flex flex-col gap-1.5 text-body-sm font-medium">Username<input value="@charlotte" readOnly className="rounded-[6px] bg-[#f8f8f8] px-4 py-3 font-normal text-portal-muted outline-none" /><span className="font-normal text-portal-muted">Your storefront address and affiliate links use this username.</span></label>
              <label className="flex flex-col gap-1.5 text-body-sm font-medium"><span className="flex justify-between"><span>Bio</span><span className="font-normal text-portal-muted">{bio.length} / 160</span></span><textarea value={bio} maxLength={160} onChange={(e) => { setBio(e.target.value); setSaved(false); }} className="h-[120px] resize-none rounded-[6px] border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>
              <ShopUrl variant="field" />
            </div>
            <div><h2 className="track-section text-body-md font-medium uppercase">Personal Information</h2><p className="text-body-sm text-portal-muted">Used to verify you and to pay you. None of this appears on your storefront.</p></div>
            <div className="grid gap-5 rounded-[10px] border border-portal-border bg-white p-6 sm:grid-cols-2"><label className="flex flex-col gap-1.5 text-body-sm font-medium">Legal first name<input value="Charlotte" readOnly className="rounded-[6px] bg-[#f8f8f8] px-4 py-3 font-normal text-portal-muted" /></label><label className="flex flex-col gap-1.5 text-body-sm font-medium">Legal last name<input value="Tan" readOnly className="rounded-[6px] bg-[#f8f8f8] px-4 py-3 font-normal text-portal-muted" /></label><label className="flex flex-col gap-1.5 text-body-sm font-medium sm:col-span-2">Email address<input value="charlotte.tan@email.com" readOnly className="rounded-[6px] bg-[#f8f8f8] px-4 py-3 font-normal text-portal-muted" /></label><label className="flex flex-col gap-1.5 text-body-sm font-medium">Phone number<input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} className="rounded-[6px] border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label><label className="flex flex-col gap-1.5 text-body-sm font-medium">Date of birth<input type="date" value={dob} onChange={(e) => { setDob(e.target.value); setSaved(false); }} className="rounded-[6px] border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label></div>
            <div className="flex justify-end"><Button variant="portal" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save changes"}</Button></div>
              </>
            )}
          </section>
        </div>
      </main>
      <AppFooter />
      {editingAddress ? createPortal(
        <div onMouseDown={(event) => { if (event.target === event.currentTarget) setEditingAddress(false); }} className="motion-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.5)] p-4" role="dialog" aria-modal="true" aria-labelledby="shipping-address-title">
          <form className="motion-modal-panel my-auto w-[600px] max-w-full overflow-hidden rounded-[10px] bg-white" onMouseDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); setShippingAddress(addressDraft); setEditingAddress(false); }}>
            <div className="flex items-center justify-between border-b border-portal-border px-6 py-4"><h2 id="shipping-address-title" className="text-body-xl font-medium">{shippingAddress.name ? "Edit shipping address" : "Add shipping address"}</h2><button type="button" aria-label="Close" onClick={() => setEditingAddress(false)} className="flex size-10 items-center justify-center rounded-lg border border-portal-border"><X className="size-4" /></button></div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {([ ["name", "Full name"], ["phone", "Phone number"], ["line1", "Address line 1"], ["line2", "Unit / flat number"], ["postalCode", "Postal code"], ["country", "Country"] ] as const).map(([key, label]) => <label key={key} className={`flex flex-col gap-1.5 text-body-sm font-medium ${key === "line1" || key === "line2" ? "sm:col-span-2" : ""}`}>{label}<input required value={addressDraft[key]} inputMode={key === "postalCode" ? "numeric" : undefined} onChange={(event) => setAddressDraft((current) => ({ ...current, [key]: event.target.value }))} className="rounded-[6px] border border-portal-border px-4 py-3 font-normal outline-none focus:border-portal-dark" /></label>)}
            </div>
            <div className="flex justify-end gap-2 border-t border-portal-border p-4"><Button type="button" variant="portalOutline" onClick={() => setEditingAddress(false)}>Cancel</Button><Button type="submit" variant="portal">Save address</Button></div>
          </form>
        </div>, document.body) : null}
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
