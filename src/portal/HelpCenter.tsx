import { useState } from "react";
import { Bell, ChevronDown, ChevronRight, Search } from "lucide-react";
import LanguageSelector from "./components/LanguageSelector";
import NotificationsDrawer from "./components/NotificationsDrawer";
import ProfileMenu from "./components/ProfileMenu";

const topics = [
  ["upload", "Can I upload tutorials and reviews?", "Yes. You can publish tutorials and product reviews through content linked from your shop. Use clear product information and disclose sponsored collaborations."],
  ["rewards", "How do influencers earn rewards?", "Creators earn rewards from eligible sales and campaign activities completed through their URMEI shop."],
  ["payment", "How is my payment calculated", "Your payout is based on tracked eligible sales, the product commission rate, and campaign rewards shown in your account."],
  ["campaign", "How do I join a campaign", "Open an available campaign, review its requirements, and submit your participation request before the deadline."],
  ["content", "Can I upload tutorials and reviews?", "Yes. URMEI supports creator-led tutorials, demonstrations, and honest product reviews."],
  ["performance", "Can I track my campaign performance?", "Campaign reporting shows reach, engagement, clicks, sales, and earned commission."],
  ["campaign-limit", "How many campaigns can I run?", "You can join every campaign for which your creator profile is eligible."],
  ["design", "Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you create and publish your shop."],
] as const;

const footerSocials = [
  { name: "facebook", iconClass: "h-[13.333px] w-[7.333px]" },
  { name: "instagram", iconClass: "size-[14.663px]" },
  { name: "twitter", iconClass: "h-[12.672px] w-[14.663px]" },
];

export default function HelpCenter() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(topics[0][0]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="motion-page min-h-screen bg-portal-surface text-portal-text">
      <header className="sticky top-0 z-30 flex h-[88px] items-center justify-between rounded-b-[10px] bg-portal-surface px-6 lg:px-[120px]">
        <div className="flex items-center gap-8">
          <a href="#/home" aria-label="URMEI home" className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portal-dark">
            <img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" />
          </a>
          <nav className="hidden items-center gap-4 md:flex">
            <a href="#/home" className="track-section rounded-lg px-4 py-2 text-body-sm font-medium uppercase">Home</a>
            <button type="button" className="track-section cursor-pointer rounded-lg px-4 py-2 text-body-sm font-medium uppercase">My Shop</button>
          </nav>
        </div>
        <div className="flex items-center gap-3 lg:gap-6">
          <label className="hidden w-[300px] items-center gap-2 rounded-[6px] border border-portal-border px-3 py-2 lg:flex">
            <Search aria-hidden="true" className="size-4" strokeWidth={1.5} />
            <input aria-label="Search products and brands" placeholder="Find products and brands" className="min-w-0 flex-1 bg-transparent text-body-sm outline-none placeholder:text-portal-muted" />
          </label>
          <LanguageSelector />
          <button type="button" aria-label="Notifications" onClick={() => setNotificationsOpen(true)} className="relative flex size-12 cursor-pointer items-center justify-center">
            <Bell aria-hidden="true" className="size-5" strokeWidth={1.5} />
            <span className="absolute top-[9px] right-[12px] size-[5px] rounded-full bg-portal-alert" />
          </button>
          <ProfileMenu onShowTour={() => { window.location.hash = "#/home/tour"; }} onShowHelp={() => window.scrollTo({ top: 0, behavior: "smooth" })} onLogout={() => { window.location.hash = "#/login"; }} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
          <a href="#/home">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <span className="text-portal-muted">FAQS</span>
        </nav>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <h1 className="text-body-xxl font-medium">Frequently Asked Questions</h1>
              <p className="text-body-sm text-portal-body">Your influencer support is just a click away—visit our Help Centre for tips and answers.</p>
            </div>
            <a href="#faq-list" className="w-fit text-body-sm font-medium capitalize">Help Center</a>
          </div>
          <div id="faq-list">
            {topics.map(([id, question, answer]) => {
              const expanded = openQuestion === id;
              return (
                <article key={id} className="border-b border-portal-border last:border-0">
                  <button type="button" aria-expanded={expanded} onClick={() => setOpenQuestion(expanded ? null : id)} className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-body-md font-medium">
                    <span>{question}</span>
                    <ChevronDown aria-hidden="true" className={`size-6 shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} strokeWidth={1.5} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-200 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="min-h-0 overflow-hidden"><p className="pb-6 text-body-sm text-portal-body">{answer}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="bg-[#2c2927] px-6 py-10 text-[#fdfdfd] lg:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[["URMEI", "About Us"], ["Collaborate", "Top Brands"], ["Support", "FAQs", "Contact Us"], ["Legal", "Terms of Service", "Privacy Policy", "Cookies"]].map(([title, ...links]) => <div key={title}><h2 className="track-section mb-3 text-body-md font-medium uppercase">{title}</h2>{links.map((link) => <a key={link} href="#" className="block text-body-md">{link}</a>)}</div>)}
          </div>
          <img src="/urmei/home/footer-wordmark.svg" alt="URMEI" className="my-16 w-full opacity-60" />
          <div className="flex items-center justify-between">
            <p className="text-body-md">© 2025 URMEI ®</p>
            <div className="flex gap-3">{footerSocials.map((social) => <button type="button" key={social.name} aria-label={social.name} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#f2efed]"><span className="flex size-4 items-center justify-center"><img src={`/urmei/home/${social.name}.svg`} alt="" className={`block max-w-none ${social.iconClass}`} /></span></button>)}</div>
          </div>
        </div>
      </footer>
      {notificationsOpen ? <NotificationsDrawer onClose={() => setNotificationsOpen(false)} /> : null}
    </div>
  );
}
