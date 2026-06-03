import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Upload, Wand2, Download, Zap, Shield, Image as ImageIcon, Check, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/BeforeAfter";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Remove Image Backgrounds in One Click" },
      { name: "description", content: "Professional AI-powered background removal in seconds. Upload an image, get a transparent PNG. No editing skills required." },
      { property: "og:title", content: "SnapCut AI — AI Background Remover" },
      { property: "og:description", content: "Remove image backgrounds instantly with AI. Free, fast, and pixel-perfect." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: Wand2, title: "One-Click Removal", desc: "Drop an image, AI does the rest. No selections, no masking." },
  { icon: Sparkles, title: "AI-Powered Detection", desc: "State-of-the-art segmentation handles hair, fur, edges." },
  { icon: ImageIcon, title: "Transparent PNG Export", desc: "Pixel-perfect transparent PNG ready for any design." },
  { icon: Zap, title: "Lightning Fast", desc: "Results in seconds, processed right in your browser." },
  { icon: Shield, title: "Secure & Private", desc: "Your images never leave your device unless you choose to save." },
  { icon: Check, title: "Studio Quality", desc: "Crisp edges that look hand-cut by a professional designer." },
];

const trusted = ["Shopify", "Canva", "Etsy", "WooCommerce", "Webflow", "Notion"];

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          Remove Image Backgrounds <br />
          <span className="text-brand-gradient">in One Click</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-secondary-foreground"
        >
          Professional AI-powered background removal in seconds. No editing skills required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button asChild size="lg" className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow h-12 px-7">
            <Link to="/tool"><Upload className="mr-2 h-4 w-4" />Upload Image</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-7 border-border bg-card/40 backdrop-blur hover:bg-card">
            <a href="#demo">View Demo</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="glass mx-auto max-w-3xl rounded-3xl p-3 shadow-glow">
            <BeforeAfter before={demoBefore} after={demoAfter} className="aspect-[4/3]" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Drag the slider to compare</p>
        </motion.div>
      </section>

      {/* Trusted */}
      <section className="border-y border-border/60 bg-surface/40 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by creators on</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
            {trusted.map((b) => (
              <span key={b} className="text-lg font-semibold tracking-tight text-secondary-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Everything you need, <span className="text-brand-gradient">nothing you don't</span></h2>
          <p className="mt-4 text-secondary-foreground">Focused on one job: removing backgrounds beautifully.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass group rounded-2xl p-6 transition hover:border-white/20"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Three steps to a clean cut</h2>
          <p className="mt-4 text-secondary-foreground">From upload to download in under 10 seconds.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", icon: Upload, title: "Upload Image", desc: "Drag & drop or paste your photo. PNG, JPG, WEBP up to 10MB." },
            { n: "02", icon: Wand2, title: "AI Removes Background", desc: "Our model isolates your subject with pixel precision." },
            { n: "03", icon: Download, title: "Download Result", desc: "Grab a transparent PNG ready to drop into any design." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass relative rounded-2xl p-8"
            >
              <span className="absolute right-6 top-6 text-5xl font-bold text-brand-gradient opacity-30">{s.n}</span>
              <s.icon className="h-8 w-8 text-brand-cyan" />
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">See the <span className="text-brand-gradient">magic</span></h2>
          <p className="mt-4 text-secondary-foreground">Drag the slider to reveal what SnapCut AI does for you.</p>
        </div>
        <div className="glass mt-10 rounded-3xl p-3 shadow-glow">
          <BeforeAfter before={demoBefore} after={demoAfter} className="aspect-[4/3]" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Loved by 50,000+ creators</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { q: "Replaced my Photoshop workflow entirely. The edges on hair are unreal.", a: "Maya R.", r: "Product Designer" },
            { q: "We process 200+ product photos a week. SnapCut saves us hours every day.", a: "Daniel K.", r: "E-commerce Lead" },
            { q: "Cleanest cut-outs I've ever seen from an AI tool. And it's fast.", a: "Priya S.", r: "Content Creator" },
          ].map((t) => (
            <div key={t.a} className="glass rounded-2xl p-6">
              <p className="text-secondary-foreground">"{t.q}"</p>
              <div className="mt-5">
                <div className="font-semibold">{t.a}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold tracking-tight md:text-5xl">Questions, answered</h2>
        <div className="mt-10 space-y-3">
          {[
            { q: "Is SnapCut AI free to use?", a: "Yes. The Free plan lets you process 5 images per day at standard quality." },
            { q: "What file types are supported?", a: "PNG, JPG, JPEG and WEBP — up to 10MB per image." },
            { q: "Do you store my images?", a: "No. Images are processed in your browser and never uploaded unless you choose to save them." },
            { q: "What quality can I expect?", a: "Studio-grade, with crisp handling of hair, fur, and translucent edges." },
          ].map((f) => (
            <details key={f.q} className="glass group rounded-2xl p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="glass relative overflow-hidden rounded-3xl p-12 text-center shadow-glow">
          <div className="absolute inset-0 -z-10 opacity-40 bg-brand-gradient blur-3xl" />
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Ready to make every image pop?</h2>
          <p className="mx-auto mt-4 max-w-xl text-secondary-foreground">Start removing backgrounds in your browser — no signup required.</p>
          <Button asChild size="lg" className="mt-8 bg-brand-gradient text-white border-0 hover:opacity-90 h-12 px-8">
            <Link to="/tool"><Upload className="mr-2 h-4 w-4" />Try SnapCut AI Free</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
