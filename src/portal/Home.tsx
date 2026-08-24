import { useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import Button from "./components/Button";
import NotificationsDrawer from "./components/NotificationsDrawer";
import RecentActivities from "./components/RecentActivities";
import TopProducts from "./components/TopProducts";

const products = [
  { image: "/urmei/home/product-1.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-2.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-3.png", title: "Water Bank Blue Hyaluronic Cream" },
  { image: "/urmei/home/product-4.png", title: "Water Bank Blue Hyaluronic Cream" },
];

const questions = [
  ["Can I upload tutorials and reviews?", "Yes. You can add tutorials and product reviews to content linked from your shop."],
  ["Can I track my campaign performance?", "Campaign reporting will show reach, engagement, clicks, and attributed sales."],
  ["How many campaigns can I run?", "You can participate in every campaign for which your profile is eligible."],
  ["Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you publish."],
];

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

export default function Home() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: number) =>
    productsRef.current?.scrollBy({ left: direction * 305, behavior: "smooth" });

  return (
    <div className="motion-page min-h-screen bg-[#fffefd] text-portal-text">
      <header className="sticky top-0 z-30 flex h-[88px] items-center justify-between rounded-b-[10px] bg-portal-surface px-6 shadow-[0_2px_10px_rgba(34,34,34,0.04)] lg:px-[120px]">
        <div className="flex items-center gap-8">
          <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
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
          <button
            type="button"
            className="hidden h-12 cursor-pointer items-center gap-[6px] px-2 text-body-md font-medium sm:flex"
            aria-label="Language: English"
          >
            <img
              src="/urmei/flag-en.svg"
              alt=""
              className="block size-5"
            />
            <span>EN</span>
          </button>
          <button
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(true)}
            className="relative flex size-12 cursor-pointer items-center justify-center"
          >
            <Bell size={20} />
            <span className="absolute top-[9px] right-[12px] size-[5px] rounded-full bg-portal-alert" />
          </button>
          <img src="/urmei/home/profile-menu.png" alt="Profile" className="size-9 rounded-full object-cover" />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-8 lg:px-[120px]">
        <section className="overflow-hidden rounded-[10px] bg-portal-surface shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
          <div className="flex min-h-[208px] flex-col gap-2.5 px-6 py-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-full">
                <img src="/urmei/home/avatar.png" alt="Charlotte" className="h-[150%] w-full -translate-y-[16.6%] object-cover" />
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
              onClick={() => navigator.clipboard?.writeText("urmei.com/shop/charlotte")}
              className="flex w-[297px] max-w-full items-center justify-between rounded-lg border border-portal-border bg-[#fffefd] px-3 py-1.5 text-left"
            >
              <span><span className="block text-[10px] leading-4 text-portal-muted">Shop URL</span><span className="block text-body-sm font-medium">urmei.com/shop/charlotte</span></span>
              <img src="/urmei/home/copy.svg" alt="Copy" className="size-4" />
            </button>
          </div>
          <div className="flex min-h-[128px] flex-col items-start gap-5 rounded-[10px] border border-portal-surface bg-[#f2efed] p-6 sm:flex-row sm:items-center lg:gap-10 lg:p-8">
            <img src="/urmei/home/store.svg" alt="" className="size-16" />
            <div className="min-w-0 flex-1"><h2 className="text-body-xxl font-medium">Set Up Your Shop</h2><p className="text-body-sm text-portal-muted">Curate your product collection and publish your shop to start earning</p></div>
            <Button variant="portal">Set Up Shop</Button>
          </div>
        </section>

        <RecentActivities />

        <TopProducts />

        <section className="py-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="track-section text-body-md font-medium uppercase">Recommended Products</h2>
            <div className="flex gap-2"><Button variant="portalOutline" aria-label="Previous products" onClick={() => scrollProducts(-1)} className="size-10 px-0"><ChevronLeft size={16} /></Button><Button variant="portalOutline" aria-label="Next products" onClick={() => scrollProducts(1)} className="size-10 px-0"><ChevronRight size={16} /></Button></div>
          </div>
          <div ref={productsRef} className="flex snap-x gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((product) => <ProductCard key={product.image} {...product} />)}
          </div>
        </section>

        <section className="py-6">
          <div className="flex items-center justify-between"><h2 className="track-section text-body-md font-medium uppercase">Help Center</h2><button className="flex items-center gap-2 text-body-sm font-medium">View all <ChevronRight size={16} /></button></div>
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
            {[ ["URMEI", "About Us"], ["Collaborate", "Top Brands"], ["Support", "FAQs", "Contact Us"], ["Legal", "Terms of Service", "Privacy Policy", "Cookies"] ].map(([title, ...links]) => <div key={title}><h3 className="track-section mb-3 text-body-md font-medium uppercase">{title}</h3>{links.map(link => <a key={link} href="#" className="block text-body-md">{link}</a>)}</div>)}
          </div>
          <img src="/urmei/home/footer-wordmark.svg" alt="URMEI" className="my-16 w-full opacity-60" />
          <div className="flex items-center justify-between"><p className="text-body-md">© 2025 URMEI ®</p><div className="flex gap-3">{["facebook", "instagram", "twitter"].map((network) => <button key={network} aria-label={network} className="flex size-12 items-center justify-center rounded-full bg-[#f2efed]"><img src={`/urmei/home/${network}.svg`} alt="" className="size-4" /></button>)}</div></div>
        </div>
      </footer>
      {notificationsOpen ? (
        <NotificationsDrawer onClose={() => setNotificationsOpen(false)} />
      ) : null}
    </div>
  );
}
