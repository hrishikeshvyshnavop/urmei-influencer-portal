import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Button from "./components/Button";
import NotificationsDrawer from "./components/NotificationsDrawer";
import RecentActivities from "./components/RecentActivities";
import TopProducts from "./components/TopProducts";
import ProfileMenu from "./components/ProfileMenu";
import ProfilePhoto from "./components/ProfilePhoto";
import { VERIFICATION_STORAGE_KEY } from "./VerificationPartner";
import { PAYMENT_STORAGE_KEY } from "./PaymentPartner";
import LanguageSelector from "./components/LanguageSelector";
import { isSetupRequired } from "./setup-status";
import { markNotificationsAsRead, useHasUnreadNotifications } from "./notification-status";

const productImages = [
  { image: "/urmei/home/product-1.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-2.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-3.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-4.png", title: "Water Bank Blue Hyaluronic Cream" },
];

const products = [0, 1].flatMap((page) =>
  productImages.map((product, index) => ({
    ...product,
    id: `${page}-${index}`,
  })),
);

const questions = [
  ["Can I upload tutorials and reviews?", "Yes. You can add tutorials and product reviews to content linked from your shop."],
  ["Can I track my campaign performance?", "Campaign reporting will show reach, engagement, clicks, and attributed sales."],
  ["How many campaigns can I run?", "You can participate in every campaign for which your profile is eligible."],
  ["Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you publish."],
];

const footerSocials = [
  { name: "facebook", href: "https://www.facebook.com/", iconClass: "h-[13.333px] w-[7.333px]" },
  { name: "instagram", href: "https://www.instagram.com/", iconClass: "size-[14.663px]" },
  { name: "twitter", href: "https://x.com/", iconClass: "h-[12.672px] w-[14.663px]" },
];

function hasCompletedAction(storageKey: string) {
  try {
    const value = window.localStorage.getItem(storageKey);
    if (!value) return false;
    return (JSON.parse(value) as { status?: string }).status === "complete";
  } catch {
    return false;
  }
}

function ProductCard({ image, title }: { image: string; title: string }) {
  return (
    <article className="min-w-[260px] flex-1 snap-start sm:min-w-[285px]">
      <img src={image} alt={title} className="aspect-square w-full rounded-[6px] object-cover" />
      <div className="flex flex-col gap-3 pt-3">
        <div>
          <p className="text-[10px] leading-4 text-portal-muted">LANEIGE</p>
          <h3 className="text-body-sm text-portal-text">{title}</h3>
          <p className="text-[10px] leading-4 text-portal-muted">50 ML | Blue gel cream</p>
          <div className="flex items-center gap-2 text-body-sm">
            <span className="font-medium text-portal-text">S$45</span>
            <span className="text-[11px] text-portal-placeholder line-through">S$52</span>
            <span className="text-[11px] text-portal-success">SAVE 13%</span>
          </div>
        </div>
        <p className="text-[10px] leading-4 text-portal-muted">Singapore&nbsp;&nbsp;•&nbsp;&nbsp;Malaysia</p>
        <Button variant="portalOutline" className="w-full">Add to Shop</Button>
      </div>
    </article>
  );
}

export default function Home({
  firstVisit = false,
  onShowTour,
}: {
  firstVisit?: boolean;
  onShowTour?: () => void;
}) {
  const hasUnreadNotifications = useHasUnreadNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [shopUrlCopied, setShopUrlCopied] = useState(false);
  const [identityComplete] = useState(() =>
    hasCompletedAction(VERIFICATION_STORAGE_KEY),
  );
  const [paymentComplete] = useState(() =>
    hasCompletedAction(PAYMENT_STORAGE_KEY),
  );
  const [setupWasSkipped] = useState(isSetupRequired);
  const productsRef = useRef<HTMLDivElement>(null);
  const setupComplete =
    identityComplete && paymentComplete && !setupWasSkipped;

  const updateCarouselControls = () => {
    const carousel = productsRef.current;
    if (!carousel) return;
    setCanScrollBack(carousel.scrollLeft > 1);
    setCanScrollForward(
      carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1,
    );
  };

  useEffect(() => {
    const carousel = productsRef.current;
    if (!carousel) return;
    updateCarouselControls();
    const resizeObserver = new ResizeObserver(updateCarouselControls);
    resizeObserver.observe(carousel);
    return () => resizeObserver.disconnect();
  }, []);

  const scrollProducts = (direction: number) => {
    const carousel = productsRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: "smooth",
    });
  };

  const copyShopUrl = async () => {
    const shopUrl = "urmei.com/shop/charlotte";
    try {
      await navigator.clipboard.writeText(shopUrl);
    } catch {
      const input = document.createElement("textarea");
      input.value = shopUrl;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setShopUrlCopied(true);
    window.setTimeout(() => setShopUrlCopied(false), 1800);
  };

  return (
    <div className="motion-page min-h-screen bg-[#fffefd] text-portal-text">
      <header className="sticky top-0 z-30 flex h-[88px] items-center justify-between rounded-b-[10px] bg-portal-surface px-6 shadow-[0_2px_10px_rgba(34,34,34,0.04)] lg:px-[120px]">
        <div className="flex items-center gap-8">
          <a
            href="#/home"
            aria-label="URMEI home"
            onClick={() => window.scrollTo(0, 0)}
            className="block shrink-0 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portal-dark"
          >
            <img
              src="/urmei/home/logo.svg"
              alt="URMEI"
              className="h-4 w-[109px]"
            />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#/home" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">Home</a>
            <button className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">My Shop</button>
          </nav>
        </div>
        <div className="flex items-center gap-3 lg:gap-6">
          <label className="hidden w-[300px] items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2 lg:flex">
            <Search size={16} />
            <input aria-label="Search products and brands" placeholder="Find products and brands" className="min-w-0 flex-1 bg-transparent text-body-sm outline-none placeholder:text-portal-muted" />
          </label>
          <LanguageSelector />
          <button
            aria-label={hasUnreadNotifications ? "Notifications, unread" : "Notifications"}
            onClick={() => {
              markNotificationsAsRead();
              setNotificationsOpen(true);
            }}
            className="relative flex size-12 cursor-pointer items-center justify-center"
          >
            <Bell size={20} />
            {hasUnreadNotifications ? <span aria-hidden="true" className="absolute top-[9px] right-[12px] size-[5px] rounded-full bg-portal-alert" /> : null}
          </button>
          <ProfileMenu
            onShowTour={() => onShowTour?.()}
            onShowHelp={() => {
              window.location.hash = "#/help-center";
            }}
            onLogout={() => {
              window.location.hash = "#/login";
            }}
          />
        </div>
      </header>

      {!setupComplete ? (
        <aside
          className="flex w-full flex-col items-start justify-between gap-3 border-b border-[#e6e5e4] bg-[#fffefd] px-6 py-3 sm:flex-row sm:items-center lg:px-[120px]"
          aria-label="Account setup required"
        >
          <div className="flex min-w-0 items-start gap-3 sm:items-center">
            <img
              src="/urmei/icon-triangle-alert.svg"
              alt=""
              className="mt-px size-5 shrink-0 sm:mt-0"
            />
            <p className="text-body-md font-medium text-[#2d2305]">
              To publish your shop, you need to verify your identity and connect
              a payment method.
            </p>
          </div>
          <Button
            variant="portalOutline"
            className="shrink-0 bg-[#fffefd]"
            onClick={() => {
              window.location.hash = identityComplete ? "#/payment" : "#/verify";
            }}
          >
            Complete action
          </Button>
        </aside>
      ) : null}

      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-8 lg:px-[120px]">
        <section className="overflow-hidden rounded-[10px] bg-portal-surface shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
          <div className="flex min-h-[208px] flex-col gap-2.5 px-6 py-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                <ProfilePhoto fallback="/urmei/home/profile-dropdown-avatar.png" alt="Charlotte" />
              </div>
              <div>
                <div className="flex items-end gap-1.5">
                  <h1 className="text-body-xxl font-semibold">Charlotte</h1>
                  <span className="pb-1 text-body-sm font-medium text-portal-muted">@charlotte</span>
                </div>
                <p className="flex items-center gap-2 text-body-sm font-medium text-portal-muted"><img src="/urmei/home/follower.svg" alt="URMEI" className="h-[14px] w-[26px]" />445 Followers</p>
              </div>
            </div>
            <div className="flex gap-4 text-body-sm font-medium text-portal-muted">
              <span className="flex items-center gap-1"><img src="/urmei/home/tiktok-stat.svg" alt="TikTok" className="size-[14px]" />112.2K</span><span className="flex items-center gap-1"><img src="/urmei/home/instagram-stat.svg" alt="Instagram" className="size-[14px]" />15.4K</span>
            </div>
            <button
              type="button"
              onClick={() => void copyShopUrl()}
              aria-label="Copy shop URL"
              className="flex w-[297px] max-w-full items-center justify-between rounded-lg border border-portal-border bg-[#fffefd] px-3 py-1.5 text-left"
            >
              <span><span className="block text-[10px] leading-4 text-portal-muted">Shop URL</span><span className="block text-body-sm font-medium">{shopUrlCopied ? "Copied" : "urmei.com/shop/charlotte"}</span></span>
              {shopUrlCopied ? (
                <Check aria-hidden="true" className="size-4 text-portal-success-text" strokeWidth={2} />
              ) : (
                <img src="/urmei/home/copy.svg" alt="" className="size-4" />
              )}
            </button>
          </div>
          <div className="flex min-h-[128px] flex-col items-start gap-5 rounded-[10px] border border-portal-surface bg-[#f2efed] p-6 sm:flex-row sm:items-center lg:gap-10 lg:p-8">
            <img src="/urmei/home/store.svg" alt="" className="size-16" />
            <div className="min-w-0 flex-1"><h2 className="text-body-xxl font-medium">Set Up Your Shop</h2><p className="text-body-sm text-portal-muted">Curate your product collection and publish your shop to start earning</p></div>
            <Button variant="portal">Set Up Shop</Button>
          </div>
        </section>

        {!firstVisit ? (
          <>
            <RecentActivities />
            <TopProducts />
          </>
        ) : null}

        <section className="py-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="track-section text-body-md font-medium uppercase">Recommended Products</h2>
            <div className="flex gap-2">
              <Button
                variant="portalOutline"
                aria-label="Previous products"
                onClick={() => scrollProducts(-1)}
                disabled={!canScrollBack}
                className="!size-8 !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
              >
                <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Button>
              <Button
                variant="portalOutline"
                aria-label="Next products"
                onClick={() => scrollProducts(1)}
                disabled={!canScrollForward}
                className="!size-8 !p-0 disabled:!border-portal-surface disabled:!bg-portal-light disabled:!text-portal-disabled disabled:!opacity-100"
              >
                <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
          <div
            ref={productsRef}
            role="region"
            aria-label="Recommended products carousel"
            onScroll={updateCarouselControls}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </section>

        <section id="help-center" className="scroll-mt-24 py-6">
          <div className="flex items-center justify-between"><h2 className="track-section text-body-md font-medium uppercase">Help Center</h2><a href="#/help-center" className="flex items-center gap-2 text-body-sm font-medium">View All <ChevronRight size={16} /></a></div>
          <div className="mt-2">
            {questions.map(([question, answer], index) => {
              const expanded = openQuestion === index;
              return <div key={question} className="border-b border-portal-border last:border-0"><button onClick={() => setOpenQuestion(expanded ? null : index)} aria-expanded={expanded} className="flex w-full items-center justify-between py-4 text-left text-body-md font-medium"><span>{question}</span><ChevronDown size={20} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} /></button><div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="min-h-0 overflow-hidden"><p className="pb-4 text-body-sm text-portal-muted">{answer}</p></div></div></div>;
            })}
          </div>
        </section>
      </main>

      <footer className="bg-[#2c2927] px-6 py-10 text-[#fdfdfd] lg:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[ ["URMEI", "About Us"], ["Collaborate", "Top Brands"], ["Support", "Help Center", "Contact Us"], ["Legal", "Terms of Service", "Privacy Policy", "Cookies"] ].map(([title, ...links]) => <div key={title}><h3 className="track-section mb-3 text-body-md font-medium uppercase">{title}</h3>{links.map(link => <a key={link} href={link === "Help Center" ? "#/help-center" : "#"} className="block text-body-md">{link}</a>)}</div>)}
          </div>
          <img src="/urmei/home/footer-wordmark.svg" alt="URMEI" className="my-16 w-full opacity-60" />
          <div className="flex items-center justify-between"><p className="text-body-md">© 2025 URMEI ®</p><div className="flex gap-3">{footerSocials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Open URMEI on ${social.name}`} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#f2efed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-light"><span className="flex size-4 items-center justify-center"><img src={`/urmei/home/${social.name}.svg`} alt="" className={`block max-w-none ${social.iconClass}`} /></span></a>)}</div></div>
        </div>
      </footer>
      {notificationsOpen ? (
        <NotificationsDrawer onClose={() => setNotificationsOpen(false)} />
      ) : null}
    </div>
  );
}
