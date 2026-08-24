import { useState } from "react";
import Button from "./components/Button";
import PortalFormLayout from "./components/PortalFormLayout";
import SectionTitle from "./components/SectionTitle";
import SocialAccountRow from "./components/SocialAccountRow";
import type { SocialPlatform } from "./components/SocialAccountRow";
import TextField from "./components/TextField";

type ReviewField = {
  name: string;
  label: string;
  value: string;
  /** Identity fields come back from the application and cannot be edited here. */
  locked?: boolean;
  icon?: "calendar";
  type?: "text" | "email" | "tel";
  options?: string[];
};

const personalFields: ReviewField[] = [
  { name: "firstName", label: "Legal First Name", value: "Charlotte", locked: true },
  { name: "lastName", label: "Legal Last Name", value: "Tan", locked: true },
  { name: "displayName", label: "Display Name", value: "Charlotte Tan" },
  {
    name: "email",
    label: "Email",
    value: "charlotte.tan@email.com",
    locked: true,
    type: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    value: "+65 9123 4567",
    locked: true,
    type: "tel",
  },
  { name: "birthday", label: "Birthday", value: "15 Jan 1998", icon: "calendar" },
];

const addressFields: ReviewField[] = [
  { name: "postalCode", label: "Postal Code", value: "520101" },
  { name: "blockNo", label: "Blk / House No", value: "12A" },
  { name: "street", label: "Street Name", value: "Orchard Boulevard" },
  { name: "building", label: "Building Name", value: "Camden Medical Centre" },
  { name: "floorNo", label: "Floor No.", value: "03" },
  { name: "unitNumber", label: "Unit Number", value: "28" },
  {
    name: "country",
    label: "Country",
    value: "Singapore",
    options: ["Singapore", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam"],
  },
];

const platforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@CharlotteTan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

const initialValues = Object.fromEntries(
  [...personalFields, ...addressFields].map((field) => [field.name, field.value]),
);

function FieldGrid({
  fields,
  values,
  onChange,
}: {
  fields: ReviewField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          placeholder=""
          type={field.type}
          icon={field.icon}
          locked={field.locked}
          options={field.options}
          value={values[field.name] ?? ""}
          onChange={(value) => onChange(field.name, value)}
        />
      ))}
    </div>
  );
}

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
    <PortalFormLayout>
      <form
        className="flex w-full max-w-[940px] flex-col gap-6 px-6 pt-[96px] pb-16 sm:px-12 lg:px-[100px]"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="flex w-full max-w-[740px] flex-col items-start gap-[6px]">
          <h1 className="w-full text-body-xxl text-portal-text">
            Review your details
          </h1>
          <p className="w-full text-body-md text-portal-muted">
            Please review the information you submitted. You can update your name
            if needed.
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
            <FieldGrid fields={addressFields} values={values} onChange={setField} />
          </section>

          <section className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-2">
              <SectionTitle>Connected Socials</SectionTitle>
              <p className="w-full text-body-sm text-portal-muted">
                Your connected accounts help brands verify your reach. You can
                manage connections anytime in Settings.
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
                anything on your behalf or look at your private messages. You can
                disconnect anytime from Settings.
              </p>
            </div>
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
