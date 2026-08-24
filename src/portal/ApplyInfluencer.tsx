import { useState } from "react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import PortalFormLayout from "./components/PortalFormLayout";
import SectionTitle from "./components/SectionTitle";
import SocialAccountRow from "./components/SocialAccountRow";
import type { SocialPlatform } from "./components/SocialAccountRow";
import TextField from "./components/TextField";

type FieldSpec = {
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon?: "calendar";
  autoComplete?: string;
  options?: string[];
  numericOnly?: boolean;
  maxLength?: number;
};

const personalFields: FieldSpec[] = [
  {
    name: "firstName",
    label: "Legal First Name",
    placeholder: "e.g. Charlotte",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Legal Last Name",
    placeholder: "e.g. Charlotte",
    autoComplete: "family-name",
  },
  {
    name: "displayName",
    label: "Display name",
    placeholder: "e.g. Charlotte Tan",
    autoComplete: "nickname",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "e.g. charlotte@email.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "e.g. +65 9123 4567",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "birthday",
    label: "Birthday",
    placeholder: "e.g. 15 Jan 1998",
    icon: "calendar",
    autoComplete: "bday",
  },
];

const addressFields: FieldSpec[] = [
  {
    name: "postalCode",
    label: "Postal Code",
    placeholder: "e.g. 520101",
    autoComplete: "postal-code",
    numericOnly: true,
    maxLength: 6,
  },
  { name: "blockNo", label: "Blk / House No", placeholder: "e.g. 12A" },
  {
    name: "street",
    label: "Street Name",
    placeholder: "e.g. Orchard Boulevard",
    autoComplete: "address-line1",
  },
  {
    name: "building",
    label: "Building Name",
    placeholder: "e.g. Camden Medical Centre",
    autoComplete: "address-line2",
  },
  { name: "floorNo", label: "Floor No.", placeholder: "e.g. 03" },
  {
    name: "unitNumber",
    label: "Unit Number",
    placeholder: "e.g. 28",
    numericOnly: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "e.g. Singapore",
    autoComplete: "country-name",
    options: ["Singapore", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam"],
  },
];

const platforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@CharlotteTan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

function FieldGrid({
  fields,
  values,
  onChange,
}: {
  fields: FieldSpec[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          icon={field.icon}
          autoComplete={field.autoComplete}
          options={field.options}
          numericOnly={field.numericOnly}
          maxLength={field.maxLength}
          value={values[field.name] ?? ""}
          onChange={(value) => onChange(field.name, value)}
        />
      ))}
    </div>
  );
}

type ApplyInfluencerProps = {
  onBack: () => void;
  onSubmit: () => void;
};

export default function ApplyInfluencer({
  onBack,
  onSubmit,
}: ApplyInfluencerProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [connected, setConnected] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [consentedToData, setConsentedToData] = useState(false);

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const togglePlatform = (id: string) =>
    setConnected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const canContinue = connected.length > 0 && agreedToTerms && consentedToData;

  return (
    <PortalFormLayout>
      <form
        className="flex w-full max-w-[940px] flex-col gap-6 px-6 pt-[96px] pb-16 sm:px-12 lg:px-[100px]"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex w-full max-w-[740px] flex-col items-start gap-[6px]">
          <h1 className="w-full text-body-xxl text-portal-text">
            Apply as an influencer
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Complete your details so brands can find you and you can start
            earning on URMEI
          </p>
        </div>

        <div className="flex w-full max-w-[740px] flex-col items-start gap-[44px]">
          <section className="flex w-full flex-col items-start gap-6">
            <SectionTitle>Personal Info</SectionTitle>
            <FieldGrid
              fields={personalFields}
              values={values}
              onChange={setField}
            />
          </section>

          <section className="flex w-full flex-col items-start gap-6">
            <SectionTitle>Address</SectionTitle>
            <FieldGrid
              fields={addressFields}
              values={values}
              onChange={setField}
            />
          </section>

          <section className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-2">
              <SectionTitle>Connect Your Socials</SectionTitle>
              <p className="w-full text-body-sm text-portal-muted">
                Connecting your social accounts helps brands discover you and
                verify your reach. Your follower count and engagement metrics
                will be visible on your profile.
              </p>
              <p className="w-full text-body-sm text-portal-notice">
                At least one social account is required to continue.
              </p>
            </div>

            <div className="w-full divide-y divide-portal-border overflow-hidden rounded-lg border border-solid border-portal-border">
              {platforms.map((platform) => (
                <SocialAccountRow
                  key={platform.id}
                  platform={platform}
                  connected={connected.includes(platform.id)}
                  onToggle={() => togglePlatform(platform.id)}
                />
              ))}
            </div>

            <div className="flex w-full items-center gap-[10px]">
              <div className="flex size-[32px] shrink-0 flex-col items-center justify-center rounded-[10px] border border-solid border-portal-border bg-white">
                <span className="relative size-[16px] shrink-0 overflow-clip">
                  <span className="absolute inset-[8.33%_16.67%]">
                    <span className="absolute inset-[-4.99%_-6.23%]">
                      <img
                        src="/urmei/icon-shield.svg"
                        alt=""
                        className="block size-full max-w-none"
                      />
                    </span>
                  </span>
                </span>
              </div>
              <p className="min-w-px flex-1 text-body-sm text-portal-muted">
                We keep your accounts safe and secure. We&#39;ll never post
                anything on your behalf or look at your private messages. You
                can disconnect anytime from Settings.
              </p>
            </div>
          </section>
        </div>

        <div className="flex w-full max-w-[740px] flex-col items-start gap-8">
          <div className="flex w-full flex-col items-start gap-2">
            <Checkbox checked={agreedToTerms} onChange={setAgreedToTerms}>
              I agree to the{" "}
              <span className="underline">Terms &amp; Conditions</span> of using
              this platform
            </Checkbox>
            <Checkbox checked={consentedToData} onChange={setConsentedToData}>
              I consent to how my data is used as outlined in the{" "}
              <span className="underline">Privacy Policy</span>
            </Checkbox>
          </div>

          <div className="flex w-full items-start justify-end gap-3">
            <Button
              variant="portalOutlineLg"
              className="w-[100px]"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="portalLg"
              className="w-[120px]"
              disabled={!canContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </PortalFormLayout>
  );
}
