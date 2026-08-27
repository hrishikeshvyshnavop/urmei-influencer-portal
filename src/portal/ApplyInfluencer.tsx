import { useEffect, useState, useSyncExternalStore } from "react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import PortalFormLayout from "./components/PortalFormLayout";
import SectionTitle from "./components/SectionTitle";
import SocialAccountRow from "./components/SocialAccountRow";
import type { SocialPlatform } from "./components/SocialAccountRow";
import TextField from "./components/TextField";
import { getSelectedCountry, subscribeToSelectedCountry } from "./country-status";
import { scrollToFirstError } from "@/lib/form-validation";

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
  latestDate?: Date;
  locked?: boolean;
  optional?: boolean;
};

const MALAYSIA_STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Pulau Pinang",
  "Perak",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

function getLatestEligibleBirthday() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  date.setFullYear(date.getFullYear() - 18);
  return date;
}

const latestEligibleBirthday = getLatestEligibleBirthday();

function isValidAdultBirthday(value: string) {
  const birthday = new Date(value);
  return (
    !Number.isNaN(birthday.getTime()) && birthday <= latestEligibleBirthday
  );
}

const personalFields: FieldSpec[] = [
  {
    name: "firstName",
    label: "Legal First Name",
    placeholder: "",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Legal Last Name",
    placeholder: "",
    autoComplete: "family-name",
  },
  {
    name: "displayName",
    label: "Display name",
    placeholder: "",
    autoComplete: "nickname",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "birthday",
    label: "Birthday",
    placeholder: "Select",
    icon: "calendar",
    autoComplete: "bday",
    latestDate: latestEligibleBirthday,
  },
];

/** Always the last field in every country's address section — driven by the
 *  header's country selector rather than typed in, so it's locked here and
 *  synced from `country-status` in the component below. */
const COUNTRY_FIELD: FieldSpec = {
  name: "country",
  label: "Country",
  placeholder: "Select",
  autoComplete: "country-name",
  options: ["Singapore", "Malaysia", "Indonesia", "Thailand", "Vietnam"],
  locked: true,
};

/** Each country's address form asks for different administrative levels, so
 *  the field set itself — not just validation — changes with the header's
 *  selected country. Field names are unique per country (no shared "street"
 *  etc.) so a value typed for one country's field never bleeds into another
 *  country's field of a similar name after switching back and forth. */
const ADDRESS_FIELDS_BY_COUNTRY: Record<string, FieldSpec[]> = {
  Singapore: [
    {
      name: "postalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 6,
    },
    {
      name: "blockNo",
      label: "Blk / House No",
      placeholder: "",
      numericOnly: true,
    },
    {
      name: "street",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "building",
      label: "Building Name",
      placeholder: "",
      autoComplete: "address-line2",
      optional: true,
    },
    {
      name: "floorNo",
      label: "Floor No.",
      placeholder: "",
      numericOnly: true,
    },
    {
      name: "unitNumber",
      label: "Unit Number",
      placeholder: "",
      numericOnly: true,
    },
  ],
  Malaysia: [
    {
      name: "myPostcode",
      label: "Postcode",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
    {
      name: "myBlockNo",
      label: "Blk / House / Lot No",
      placeholder: "",
    },
    {
      name: "myStreet",
      label: "Street Name (Jalan)",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "myBuilding",
      label: "Building / Taman",
      placeholder: "",
      autoComplete: "address-line2",
    },
    {
      name: "myFloorNo",
      label: "Floor No.",
      placeholder: "",
      numericOnly: true,
      optional: true,
    },
    {
      name: "myUnitNumber",
      label: "Unit Number",
      placeholder: "",
      numericOnly: true,
      optional: true,
    },
    {
      name: "myCity",
      label: "City",
      placeholder: "",
      autoComplete: "address-level2",
    },
    {
      name: "myState",
      label: "State",
      placeholder: "Select",
      options: MALAYSIA_STATES,
      autoComplete: "address-level1",
    },
  ],
  Thailand: [
    {
      name: "thHouseNo",
      label: "House / Plot No",
      placeholder: "",
    },
    {
      name: "thMoo",
      label: "Moo / Village / Building",
      placeholder: "",
      autoComplete: "address-line2",
    },
    {
      name: "thRoad",
      label: "Road / Alley (Thanon / Soi)",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "thSubDistrict",
      label: "Sub-district (Tambon / Khwaeng)",
      placeholder: "",
    },
    {
      name: "thDistrict",
      label: "District (Amphoe / Khet)",
      placeholder: "",
    },
    {
      name: "thProvince",
      label: "Province (Changwat)",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "thPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
  Vietnam: [
    {
      name: "vnHouseNo",
      label: "House / Alley / Building No",
      placeholder: "",
    },
    {
      name: "vnStreet",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "vnWard",
      label: "Ward / Commune (Phường / Xã)",
      placeholder: "",
    },
    {
      name: "vnDistrict",
      label: "District (Quận / Huyện)",
      placeholder: "",
    },
    {
      name: "vnProvince",
      label: "Province / City (Tỉnh / Thành phố)",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "vnPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
  Indonesia: [
    {
      name: "idHouseNo",
      label: "House / Blk No",
      placeholder: "",
    },
    {
      name: "idStreet",
      label: "Street Name",
      placeholder: "",
      autoComplete: "address-line1",
    },
    {
      name: "idRtRw",
      label: "RT / RW",
      placeholder: "",
    },
    {
      name: "idVillage",
      label: "Village / Sub-district (Kelurahan / Desa)",
      placeholder: "",
    },
    {
      name: "idDistrict",
      label: "District (Kecamatan)",
      placeholder: "",
    },
    {
      name: "idCity",
      label: "City / Regency (Kota / Kabupaten)",
      placeholder: "",
      autoComplete: "address-level2",
    },
    {
      name: "idProvince",
      label: "Province",
      placeholder: "",
      autoComplete: "address-level1",
    },
    {
      name: "idPostalCode",
      label: "Postal Code",
      placeholder: "",
      autoComplete: "postal-code",
      numericOnly: true,
      maxLength: 5,
    },
  ],
};

const platforms: SocialPlatform[] = [
  { id: "instagram", name: "Instagram", handle: "@charlotte_tan" },
  { id: "facebook", name: "Facebook", handle: "@charlotte.tan" },
  { id: "youtube", name: "YouTube", handle: "@CharlotteTan" },
  { id: "tiktok", name: "TikTok", handle: "@charlotte.tan" },
];

function FieldGrid({
  fields,
  values,
  showErrors,
  onChange,
}: {
  fields: FieldSpec[];
  values: Record<string, string>;
  showErrors: boolean;
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
          latestDate={field.latestDate}
          locked={field.locked}
          value={values[field.name] ?? ""}
          error={
            showErrors && !field.optional && !(values[field.name] ?? "").trim()
              ? `${field.label} is required.`
              : showErrors &&
                  field.name === "birthday" &&
                  !isValidAdultBirthday(values[field.name] ?? "")
                ? "You must be at least 18 years old to apply."
              : showErrors && field.type === "email" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.name] ?? "")
                ? "Enter a valid email address."
                : undefined
          }
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
  const selectedCountry = useSyncExternalStore(subscribeToSelectedCountry, getSelectedCountry);
  const addressFields = [
    ...(ADDRESS_FIELDS_BY_COUNTRY[selectedCountry] ?? ADDRESS_FIELDS_BY_COUNTRY.Singapore),
    COUNTRY_FIELD,
  ];
  const [values, setValues] = useState<Record<string, string>>({ country: selectedCountry });
  const [connected, setConnected] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [consentedToData, setConsentedToData] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setValues((current) => ({ ...current, country: selectedCountry }));
  }, [selectedCountry]);

  const setField = (name: string, value: string) =>
    setValues((current) => ({ ...current, [name]: value }));

  const togglePlatform = (id: string) =>
    setConnected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const allFieldsComplete = [...personalFields, ...addressFields]
    .filter((field) => !field.optional)
    .every((field) => (values[field.name] ?? "").trim().length > 0);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "");
  const isAdult = isValidAdultBirthday(values.birthday ?? "");
  const canContinue =
    allFieldsComplete &&
    emailIsValid &&
    isAdult &&
    connected.length > 0 &&
    agreedToTerms &&
    consentedToData;

  return (
    <PortalFormLayout>
      <form
        className="flex w-full max-w-[940px] flex-col gap-6 px-6 pt-[136px] pb-16 sm:px-12 lg:px-[100px]"
        onInvalidCapture={(event) => {
          event.preventDefault();
          scrollToFirstError(event.currentTarget);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          setShowErrors(true);
          if (!canContinue) {
            scrollToFirstError(event.currentTarget);
            return;
          }
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
              showErrors={showErrors}
              onChange={setField}
            />
          </section>

          <section className="flex w-full flex-col items-start gap-6">
            <SectionTitle>Address</SectionTitle>
            <FieldGrid
              fields={addressFields}
              values={values}
              showErrors={showErrors}
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
            {showErrors && connected.length === 0 ? (
              <p className="text-body-xs text-portal-alert" role="alert" aria-invalid="true">
                Connect at least one social account.
              </p>
            ) : null}

            <div className="flex w-full items-start gap-[2px]">
              <div className="flex size-[24px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white">
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
            {showErrors && (!agreedToTerms || !consentedToData) ? (
              <p className="text-body-xs text-portal-alert" role="alert" aria-invalid="true">
                Accept both agreements to continue.
              </p>
            ) : null}
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
              disabled={!agreedToTerms || !consentedToData}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </form>
    </PortalFormLayout>
  );
}
