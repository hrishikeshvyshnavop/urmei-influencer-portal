import Button from "./Button";

export type SocialPlatform = {
  id: string;
  name: string;
  /** Handle shown once the account is connected, when the design defines one. */
  handle?: string;
};

/** The Instagram glyph is three stacked vectors in the design system. */
function PlatformIcon({ id }: { id: string }) {
  if (id === "instagram") {
    return (
      <span className="relative size-[24px] shrink-0 overflow-clip">
        <span className="absolute inset-[0_0.06%_0.02%_0]">
          <img
            src="/urmei/social-instagram-frame.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
        <span className="absolute inset-[24.32%]">
          <img
            src="/urmei/social-instagram-lens.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
        <span className="absolute inset-[17.3%_17.3%_70.7%_70.7%]">
          <img
            src="/urmei/social-instagram-dot.svg"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
      </span>
    );
  }

  const insets: Record<string, string> = {
    facebook: "inset-[0_0_0.37%_0]",
    youtube: "inset-[14.82%_0_14.84%_0]",
    tiktok: "inset-[0_6.25%_0_8.33%]",
  };

  return (
    <span className="relative size-[24px] shrink-0 overflow-clip">
      <span className={`absolute ${insets[id]}`}>
        <img
          src={`/urmei/social-${id}.svg`}
          alt=""
          className="absolute inset-0 block size-full max-w-none"
        />
      </span>
    </span>
  );
}

type SocialAccountRowProps = {
  platform: SocialPlatform;
  connected: boolean;
  onToggle: () => void;
};

export default function SocialAccountRow({
  platform,
  connected,
  onToggle,
}: SocialAccountRowProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex min-w-px flex-1 items-center gap-4">
        <div className="flex size-[48px] shrink-0 flex-col items-center justify-center overflow-clip rounded-lg border border-solid border-portal-border">
          <PlatformIcon id={platform.id} />
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start gap-1 whitespace-nowrap">
          <p className="text-body-lg font-medium text-portal-text">{platform.name}</p>
          <p className="text-body-sm text-portal-muted">
            {connected ? (platform.handle ?? "Connected") : "Not connected"}
          </p>
        </div>
      </div>

      <Button
        variant={connected ? "portalMuted" : "portalOutline"}
        onClick={onToggle}
      >
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
}
