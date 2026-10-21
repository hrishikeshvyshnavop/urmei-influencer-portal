import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import AppShell from "./components/AppShell";
import { requestProductTour } from "./tour-status";

const topics = [
  ["upload", "Can I upload tutorials and reviews?", "Yes. You can publish tutorials and product reviews through content linked from your shop. Use clear product information and disclose sponsored collaborations."],
  ["rewards", "How do creators earn rewards?", "Creators earn rewards from eligible sales and campaign activities completed through their URMEI shop."],
  ["payment", "How is my payment calculated", "Your payout is based on tracked eligible sales, the product commission rate, and campaign rewards shown in your account."],
  ["campaign", "How do I join a campaign", "Open an available campaign, review its requirements, and submit your participation request before the deadline."],
  ["content", "Can I upload tutorials and reviews?", "Yes. URMEI supports creator-led tutorials, demonstrations, and honest product reviews."],
  ["performance", "Can I track my campaign performance?", "Campaign reporting shows reach, engagement, clicks, sales, and earned commission."],
  ["campaign-limit", "How many campaigns can I run?", "You can join every campaign for which your creator profile is eligible."],
  ["design", "Do I need design skills to start?", "No. URMEI provides product assets and guided tools to help you create and publish your shop."],
] as const;

export default function HelpCenter() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(topics[0][0]);

  return (
    <AppShell
      footerBelowFold
      className="bg-portal-light text-portal-text"
      onShowTour={requestProductTour}
      onShowHelp={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >

      <main className="mx-auto flex-1 w-full max-w-[794px] px-6 pb-12 lg:px-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 py-4 text-body-sm">
          <a href="/home">Home</a>
          <ChevronRight aria-hidden="true" className="size-4 text-portal-muted" strokeWidth={1.5} />
          <span className="text-portal-muted">Help Center</span>
        </nav>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <h1 className="text-body-xxl font-medium">Help Center</h1>
              <p className="text-body-sm text-portal-body">Your creator support is just a click away—visit our Help Center for tips and answers.</p>
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

    </AppShell>
  );
}
