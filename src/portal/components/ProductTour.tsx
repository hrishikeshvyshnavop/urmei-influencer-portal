import { useEffect, useRef, useState } from "react";
import Button from "./Button";

type TourStep = {
  /** Step 1 is the welcome card and shows the wordmark instead of a counter. */
  indicator?: string;
  title: string;
  body: string;
  image: string;
  back: string;
  next: string;
};

const steps: TourStep[] = [
  {
    title: "Welcome to Your Creative Stage",
    body: "We're so glad you're here. Let's take a moment to explore your new home.",
    image: "/urmei/tour/panel.jpg",
    back: "Skip Tour",
    next: "Get started",
  },
  {
    indicator: "1/3",
    title: "Monitor Everything in Real-Time",
    body: "View detailed analytics on campaign performance, audience engagement, and earnings. All in one dashboard.",
    image: "/urmei/tour/panel.jpg",
    back: "Back",
    next: "Next",
  },
  {
    indicator: "2/3",
    title: "Access Premium Brands",
    body: "Explore hand-picked products from top brands. Find items that match your style and audience.",
    image: "/urmei/tour/products.png",
    back: "Back",
    next: "Next",
  },
  {
    indicator: "3/3",
    title: "Start Your UREMI Store",
    body: "Create your personalized shop, add products you love, and start earning commissions with every sale.",
    image: "/urmei/tour/panel.jpg",
    back: "Back",
    next: "set up Your Shop",
  },
];

type ProductTourProps = {
  /** Called when the tour is dismissed, or finished from the last step. */
  onClose: () => void;
  onFinish: () => void;
};

export default function ProductTour({ onClose, onFinish }: ProductTourProps) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(
    () => new Set<string>([steps[0].image]),
  );
  // Closing (either way) plays the exit animation via `data-state` first and
  // defers the real callback — and the unmount it triggers — instead of
  // firing it immediately, so the modal fades out instead of vanishing.
  const [closing, setClosing] = useState<false | "close" | "finish">(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const step = steps[index];
  const isLast = index === steps.length - 1;

  function finishClose(kind: "close" | "finish") {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (kind === "finish") onFinish();
    else onClose();
  }

  function requestClose(kind: "close" | "finish") {
    if (closing) return;
    setClosing(kind);
    // `onAnimationEnd` normally finishes the close, but CSS animations can
    // stall while the tab is backgrounded — this guarantees it still closes.
    closeTimeoutRef.current = window.setTimeout(() => finishClose(kind), 300);
  }

  function handleExitAnimationEnd() {
    if (closing) finishClose(closing);
  }

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, []);

  const showStep = async (nextIndex: number) => {
    const source = steps[nextIndex].image;
    if (!loadedImages.has(source)) {
      const image = new Image();
      image.src = source;
      try {
        await image.decode();
      } catch {
        // If decoding is unavailable, the mounted image can still render it.
      }
      setLoadedImages((current) => new Set(current).add(source));
    }
    setIndex(nextIndex);
  };

  const back = () => (index === 0 ? requestClose("close") : void showStep(index - 1));
  const next = () => (isLast ? requestClose("finish") : void showStep(index + 1));

  return (
    <div
      className="motion-modal-backdrop fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.5)] p-4"
      data-state={closing ? "closed" : "open"}
      role="dialog"
      aria-modal="true"
      aria-label="Product tour"
    >
      <div
        onAnimationEnd={handleExitAnimationEnd}
        data-state={closing ? "closed" : "open"}
        className="motion-tour-panel relative my-auto flex h-[450px] w-[800px] max-w-full shrink-0 items-stretch overflow-clip rounded-[10px]"
      >
        <div className="flex h-full min-w-0 basis-1/2 flex-col items-start justify-between overflow-clip bg-white p-8">
          {step.indicator ? (
            <p className="track-section text-body-md font-medium whitespace-nowrap uppercase text-portal-muted">
              {step.indicator}
            </p>
          ) : (
            <img
              src="/urmei/kbeauty-logo.svg"
              alt="K.Beauty"
              className="block h-[16px] w-[108.756px] max-w-none shrink-0"
            />
          )}

          <div className="flex w-full flex-col items-start gap-4">
            <h2
              className={`w-full text-body-xxl text-portal-text ${
                step.indicator ? "font-medium" : ""
              }`}
            >
              {step.title}
            </h2>
            <p className="w-full text-body-md text-portal-muted">{step.body}</p>
          </div>

          <div className="flex w-full items-center justify-between overflow-clip bg-white">
            <Button variant="portalGhost" onClick={back}>
              {step.back}
            </Button>
            <Button variant="portal" onClick={next}>
              {step.next}
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute top-1/4 bottom-1/4 left-[37.5%] right-[37.5%]">
                  <span className="absolute inset-[-8.31%_-16.62%_-8.31%_-16.63%]">
                    <img
                      src="/urmei/icon-chevron-right.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
            </Button>
          </div>
        </div>

        <div className="relative h-full min-w-0 basis-1/2 overflow-clip bg-portal-surface">
          {steps.map((tourStep, stepIndex) => (
            <img
              key={`${tourStep.image}-${stepIndex}`}
              src={tourStep.image}
              alt=""
              aria-hidden={stepIndex !== index}
              onLoad={() =>
                setLoadedImages((current) =>
                  new Set(current).add(tourStep.image),
                )
              }
              className={`pointer-events-none absolute inset-0 size-full max-w-none object-cover ${
                stepIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute top-0 right-0 flex items-center gap-[10px] p-4">
            <button
              type="button"
              onClick={() => requestClose("close")}
              aria-label="Close tour"
              className="flex cursor-pointer items-center justify-center overflow-clip rounded-lg bg-portal-light p-3"
            >
              <span className="relative size-[16px] shrink-0 overflow-clip">
                <span className="absolute inset-1/4">
                  <span className="absolute inset-[-8.35%]">
                    <img
                      src="/urmei/icon-x.svg"
                      alt=""
                      className="block size-full max-w-none"
                    />
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
