import { useState } from "react";
import Button from "./components/Button";
import FieldGrid from "./components/FieldGrid";
import PortalFormLayout from "./components/PortalFormLayout";
import SectionTitle from "./components/SectionTitle";
import SocialAccountRow from "./components/SocialAccountRow";
import type { SocialPlatform } from "./components/SocialAccountRow";
import type { FieldSpec } from "./form-fields";
import { scrollToFirstError } from "@/lib/form-validation";

/**
 * Figma `1583:87857`. Name and email come back from the approved application
 * and are read-only here; phone, birthday and applying country stay editable.
 * The address block that used to sit on this screen moved to its own setup
 * step (`ShippingAddress`).
 */
const personalFields: FieldSpec[] = [
  { name: "firstName", label: "First Name", placeholder: "", locked: true },
  { name: "lastName", label: "Last Name", placeholder: "", locked: true },
  {
    name: "email",
    label: "Email",
    placeholder: "",
    type: "email",
    locked: true,
  },
  { name: "phone", label: "Phone number", placeholder: "", type: "tel" },
  { name: "dob", label: "DOB", placeholder: "Select", icon: "calendar" },
  {
    name: "applyingCountry",
    label: "Applying Country",
    placeholder: "Select",
    options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
    // Grey-filled in the frame like the other locked fields, and the chevron
    // is drawn faint: the applying country is fixed at application time, so
    // this shows the choice rather than offering it again.
    locked: true,
  },
];

const initialValues: Record<string, string> = {
  firstName: "Charlotte",
  lastName: "Wong",
  email: "charlotte@gmail.com",
  phone: "+65 9123 4567",
  dob: "15 Jan 1998",
  applyingCountry: "Singapore",
};

const platforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte" },
  { id: "facebook", name: "Facebook", handle: "@charlotte" },
  { id: "youtube", name: "YouTube", handle: "@charlotte" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte" },
];

export default function ReviewDetails({ onContinue }: { onContinue: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [connected, setConnected] = useState<string[]>(["instagram", "tiktok"]);

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const togglePlatform = (id: string) =>
    setConnected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  return (
    <PortalFormLayout hideLanguageSelector hideHeaderBackdrop>
      <form
        className="flex w-full max-w-[940px] flex-col gap-8 px-6 pt-[120px] pb-16 sm:px-12 lg:px-[100px]"
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="flex w-full max-w-[740px] flex-col items-start gap-[6px]">
          <h1 className="w-full text-body-xxl text-portal-text">
            Your personal info
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Please review the information you submitted.
          </p>
        </div>

        <div className="flex w-full max-w-[740px] flex-col items-start gap-[44px]">
          <FieldGrid fields={personalFields} values={values} onChange={setField} />

          <section className="flex w-full flex-col items-start gap-[6px]">
            <SectionTitle>Social accounts</SectionTitle>

            <div className="mt-[14px] w-full divide-y divide-portal-border overflow-hidden rounded-lg border border-solid border-portal-border">
              {platforms.map((platform) => (
                <SocialAccountRow
                  key={platform.id}
                  platform={platform}
                  connected={connected.includes(platform.id)}
                  onToggle={() => togglePlatform(platform.id)}
                />
              ))}
            </div>

            <p className="w-full text-body-xxs text-portal-muted opacity-80">
              We keep your accounts safe and secure. We&#39;ll never post
              anything on your behalf or look at your private messages.
            </p>
          </section>
        </div>

        <div className="flex w-full max-w-[740px] items-start justify-end">
          <Button type="submit" variant="portalLg" className="w-[120px]">
            Continue
          </Button>
        </div>
      </form>
    </PortalFormLayout>
  );
}
