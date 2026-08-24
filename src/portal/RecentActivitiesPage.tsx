import { useState } from "react";
import { Bell, ChevronRight, DollarSign, Megaphone, Search } from "lucide-react";
import LanguageSelector from "./components/LanguageSelector";
import NotificationsDrawer from "./components/NotificationsDrawer";
import ProfileMenu from "./components/ProfileMenu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const activities = [
  { id: 1, type: "commission", title: "Commission Earned:", amount: "S$1.5", detail: "From ahc youth focus essence", time: "Today, 4:15 PM" },
  { id: 2, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 4:12 PM" },
  { id: 3, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 4:00 PM" },
  { id: 4, type: "commission", title: "Commission Earned:", amount: "S$1", detail: "From ahc youth focus essence", time: "Today, 3:56 PM" },
  { id: 5, type: "campaign", title: "Campaign Created", detail: "Mamonde rose water toner", time: "Yesterday, 5:55 PM" },
] as const;

const footerSocials = [
  { name: "facebook", href: "https://www.facebook.com/", iconClass: "h-[13.333px] w-[7.333px]" },
  { name: "instagram", href: "https://www.instagram.com/", iconClass: "size-[14.663px]" },
  { name: "twitter", href: "https://x.com/", iconClass: "h-[12.672px] w-[14.663px]" },
];

export default function RecentActivitiesPage() {
  const [period, setPeriod] = useState("7");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="motion-page min-h-screen bg-portal-card text-portal-text">
      <header className="sticky top-0 z-30 flex h-[88px] items-center justify-between rounded-b-[10px] bg-portal-surface px-6 lg:px-[120px]">
        <div className="flex items-center gap-8">
          <a href="#/home" aria-label="URMEI home"><img src="/urmei/home/logo.svg" alt="URMEI" className="h-4 w-[109px]" /></a>
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
          <ProfileMenu onShowTour={() => { window.location.hash = "#/home/tour"; }} onShowHelp={() => { window.location.hash = "#/help-center"; }} onLogout={() => { window.location.hash = "#/login"; }} />
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
            <a href="#/home">Home</a><ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} /><span className="text-portal-muted">Recent Activities</span>
          </nav>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger aria-label="Activity period" className="w-[128px] whitespace-nowrap text-portal-text"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="pt-2">
          <h1 className="track-section pb-4 text-body-md font-medium uppercase">Recent Activities</h1>
          <div>
            {activities.map((activity, index) => (
              <article key={activity.id} className={`flex items-start gap-2.5 py-4 ${index < activities.length - 1 ? "border-b border-portal-border" : ""}`}>
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-portal-tint">
                    {activity.type === "commission" ? <DollarSign aria-hidden="true" className="size-4" strokeWidth={1.5} /> : <Megaphone aria-hidden="true" className="size-4" strokeWidth={1.5} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 text-body-md"><span className="font-medium">{activity.title}</span>{"amount" in activity ? <span className="font-semibold">{activity.amount}</span> : null}</span>
                    <span className="block text-body-sm text-portal-muted">{activity.detail}</span>
                  </span>
                </div>
                <time className="shrink-0 text-body-xs text-portal-muted">{activity.time}</time>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#2c2927] px-6 py-10 text-[#fdfdfd] lg:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">{[["URMEI", "About Us"], ["Collaborate", "Top Brands"], ["Support", "Help Center", "Contact Us"], ["Legal", "Terms of Service", "Privacy Policy", "Cookies"]].map(([title, ...links]) => <div key={title}><h2 className="track-section mb-3 text-body-md font-medium uppercase">{title}</h2>{links.map((link) => <a key={link} href={link === "Help Center" ? "#/help-center" : "#"} className="block text-body-md">{link}</a>)}</div>)}</div>
          <img src="/urmei/home/footer-wordmark.svg" alt="URMEI" className="my-16 w-full opacity-60" />
          <div className="flex items-center justify-between"><p className="text-body-md">© 2025 URMEI ®</p><div className="flex gap-3">{footerSocials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Open URMEI on ${social.name}`} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#f2efed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-light"><span className="flex size-4 items-center justify-center"><img src={`/urmei/home/${social.name}.svg`} alt="" className={`block max-w-none ${social.iconClass}`} /></span></a>)}</div></div>
        </div>
      </footer>
      {notificationsOpen ? <NotificationsDrawer onClose={() => setNotificationsOpen(false)} /> : null}
    </div>
  );
}
