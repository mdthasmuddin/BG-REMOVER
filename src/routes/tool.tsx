import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Download, Loader2, RotateCcw, ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/BeforeAfter";
import { removeBackground } from "@/lib/bg-remover";
import { toast } from "sonner";

export const Route = createFileRoute("/tool")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Background Remover — SnapCut AI" },
      { name: "description", content: "Upload an image and remove its background instantly with AI." },
    ],
  }),
  component: ToolPage,
});

const MAX = 10 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function ToolPage() {
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!TYPES.includes(file.type)) {
      toast.error("Unsupported format. Use PNG, JPG or WEBP.");
      return;
    }
    if (file.size > MAX) {
      toast.error("File too large. Max 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginal(url);
    setProcessed(null);
    setLoading(true);
    setProgress("Loading AI model (first run downloads ~40MB)...");
    try {
      const out = await removeBackground(url);
      setProcessed(out);
      toast.success("Background removed!");
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to process image. " + (e?.message ?? ""));
    } finally {
      setLoading(false);
      setProgress("");
    }
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          if (file) handleFile(file);
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleFile]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setOriginal(null);
    setProcessed(null);
  };

  const download = () => {
    if (!processed) return;
    const a = document.createElement("a");
    a.href = processed;
    a.download = "snapcut-ai.png";
    a.click();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-12 pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-brand-gradient">AI</span> Background Remover
          </h1>
          <p className="mt-3 text-secondary-foreground">Upload an image — get a transparent PNG in seconds.</p>
        </div>

        {!original && (
          <motion.label
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            htmlFor="file"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`glass mt-12 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-16 text-center transition ${dragOver ? "border-brand-cyan bg-card/70 shadow-glow" : "border-border hover:border-white/20"}`}
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
              <Upload className="h-7 w-7 text-white" />
            </div>
            <h3 className="mt-6 text-xl font-semibold">Drag & drop, paste, or click</h3>
            <p className="mt-2 text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
            <input
              id="file"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </motion.label>
        )}

        {original && (
          <div className="mt-10">
            <div className="glass rounded-3xl p-4 shadow-glow">
              {loading ? (
                <div className="grid aspect-[4/3] place-items-center rounded-2xl bg-surface">
                  <div className="text-center">
                    <Loader2 className="mx-auto h-10 w-10 animate-spin text-brand-cyan" />
                    <p className="mt-4 font-semibold">Working AI magic...</p>
                    <p className="mt-1 text-xs text-muted-foreground">{progress || "Removing background..."}</p>
                  </div>
                </div>
              ) : processed ? (
                <BeforeAfter before={original} after={processed} className="aspect-[4/3]" />
              ) : (
                <div className="checker grid aspect-[4/3] place-items-center rounded-2xl">
                  <img src={original} alt="original" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={download} disabled={!processed} size="lg" className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow">
                <Download className="mr-2 h-4 w-4" />Download PNG
              </Button>
              <Button onClick={reset} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />Process New Image
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ImageIcon, t: "All formats", d: "PNG, JPG, WEBP" },
            { icon: Upload, t: "Up to 10MB", d: "Per image" },
            { icon: Download, t: "Transparent PNG", d: "Ready to use" },
          ].map((x) => (
            <div key={x.t} className="glass flex items-center gap-3 rounded-2xl p-4">
              <x.icon className="h-5 w-5 text-brand-cyan" />
              <div>
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="text-xs text-muted-foreground">{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
