import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SnapCut AI" },
      { name: "description", content: "Simple plans for creators, teams, and businesses. Start free." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    priceM: 0, priceY: 0,
    desc: "Try SnapCut AI today.",
    features: ["5 images per day", "Standard quality", "PNG downloads", "Community support"],
    cta: "Start free",
  },
  {
    name: "Pro",
    priceM: 12, priceY: 9,
    desc: "For creators and freelancers.",
    features: ["Unlimited images", "HD quality", "Faster processing", "Priority queue", "Email support"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Business",
    priceM: 49, priceY: 39,
    desc: "For teams and businesses.",
    features: ["Everything in Pro", "Team access (5 seats)", "Bulk processing", "API access", "Dedicated support"],
    cta: "Contact sales",
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">Simple <span className="text-brand-gradient">pricing</span></h1>
          <p className="mt-4 text-secondary-foreground">Start free. Upgrade when you need more.</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 p-1 text-sm backdrop-blur">
            <button onClick={() => setYearly(false)} className={`rounded-full px-4 py-1.5 transition ${!yearly ? "bg-brand-gradient text-white" : "text-muted-foreground"}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`rounded-full px-4 py-1.5 transition ${yearly ? "bg-brand-gradient text-white" : "text-muted-foreground"}`}>Yearly <span className="ml-1 text-[10px] opacity-80">−25%</span></button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`glass relative rounded-3xl p-8 ${p.highlight ? "shadow-glow ring-1 ring-brand-cyan/40" : ""}`}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">Most popular</span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold">${yearly ? p.priceY : p.priceM}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <Button asChild className={`mt-6 w-full ${p.highlight ? "bg-brand-gradient text-white border-0 hover:opacity-90" : ""}`} variant={p.highlight ? "default" : "outline"}>
                <Link to="/tool">{p.cta}</Link>
              </Button>
              <ul className="mt-8 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                    <span className="text-secondary-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
