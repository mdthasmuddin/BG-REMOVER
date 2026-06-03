import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SnapCut AI" },
      { name: "description", content: "Get in touch with the SnapCut AI team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pt-16 pb-24">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">Talk to us</h1>
          <p className="mt-3 text-secondary-foreground">Questions, feedback, partnership ideas — we'd love to hear.</p>
        </div>
        <form onSubmit={onSubmit} className="glass mt-10 space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required placeholder="Your name" name="name" />
            <Input required type="email" placeholder="Email" name="email" />
          </div>
          <Input required placeholder="Subject" name="subject" />
          <Textarea required placeholder="Message" name="message" rows={5} />
          <Button type="submit" disabled={sending} className="w-full bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow">
            {sending ? "Sending..." : "Send message"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
