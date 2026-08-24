import Button from "./components/Button";

type ApplyLandingProps = {
  onApply: () => void;
  onLogin: () => void;
};

export default function ApplyLanding({ onApply, onLogin }: ApplyLandingProps) {
  return (
    <div className="motion-page flex min-h-screen w-full flex-col items-start bg-white">
      <div className="relative min-h-px w-full flex-1">
        <img
          src="/urmei/apply-hero.png"
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
        />
      </div>

      <div className="flex w-full items-center gap-16 rounded-bl-[10px] p-8 lg:p-16">
        <div className="flex min-w-px flex-1 flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
          <h1 className="min-w-px flex-1 text-h2 uppercase text-portal-text">
            Share the Glow.
            <br />
            Own the Story.
          </h1>

          <div className="flex shrink-0 flex-col items-start gap-5 self-stretch">
            <p className="w-[302px] max-w-full text-body-md text-portal-muted">
              Apply in minutes, connect your socials, and start earning as a URMEI
              creator.
            </p>
            <div className="flex w-full items-start gap-4">
              <Button variant="portalLg" className="min-w-px flex-1" onClick={onApply}>
                Apply now
              </Button>
              <Button
                variant="portalOutlineLg"
                className="min-w-px flex-1"
                onClick={onLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
