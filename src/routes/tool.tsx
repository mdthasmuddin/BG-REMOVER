import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Download, Loader2, RotateCcw, ImageIcon, History, Trash2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type HistoryItem = {
  id: string;
  originalUrl: string;
  processedUrl: string;
  fileName: string;
  timestamp: number;
};

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

const WEBHOOK_URL =
  "https://thasmu.app.n8n.cloud/webhook/snapcut-remove-bg";

type WebhookResponse = {
  success?: boolean;
  url: string;
};

function extractProcessedImageUrl(data: unknown): string {
  const item = Array.isArray(data) ? data[0] : data;
  if (!item || typeof item !== "object" || !("url" in item)) {
    throw new Error("Invalid webhook response: expected { url: string }");
  }

  const url = (item as WebhookResponse).url;
  if (typeof url !== "string" || !url.trim()) {
    throw new Error("Invalid webhook response: url is missing or empty");
  }

  return url.trim();
}

function ToolPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleFile = useCallback((file: File) => {
    if (!TYPES.includes(file.type)) {
      toast.error("Unsupported format. Use PNG, JPG or WEBP.");
      return;
    }
    if (file.size > MAX) {
      toast.error("File too large. Max 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginal(url);
    setProcessed(null);
    setLoading(false);
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

  useEffect(() => {
    const savedHistory = localStorage.getItem("bgRemoverHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (item: HistoryItem) => {
    const newHistory = [item, ...history];
    setHistory(newHistory);
    localStorage.setItem("bgRemoverHistory", JSON.stringify(newHistory));
  };

  const downloadImage = async (url: string, fileName: string = "snapcut-ai.png") => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image");
    }
  };

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

  const handleRemoveBackground = async () => {
    console.log("Remove Background button clicked!");
    console.log("originalFile:", originalFile);
    console.log("original URL:", original);

    if (!originalFile || !original) {
      console.warn("No file or URL available");
      toast.error("Please upload an image first!");
      return;
    }

    setLoading(true);
    setProgress("Sending image to server...");

    try {
      const imageBinary = await originalFile.arrayBuffer();
      console.log("Sending image as binary to webhook...", {
        name: originalFile.name,
        type: originalFile.type,
        bytes: imageBinary.byteLength,
      });

      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": originalFile.type || "application/octet-stream",
          "Content-Disposition": `inline; filename="${originalFile.name}"`,
        },
        body: imageBinary,
      });

      console.log("Webhook response status:", webhookResponse.status);
      console.log("Webhook response headers:", Object.fromEntries(webhookResponse.headers.entries()));
      const responseText = await webhookResponse.text();
      console.log("Webhook response raw text (length):", responseText.length);
      console.log("Webhook response raw text:", responseText);

      if (!webhookResponse.ok) {
        console.error("Webhook error response:", responseText);
        throw new Error(`Failed to send image to webhook: ${webhookResponse.status}`);
      }

      setProgress("Receiving processed image...");
      const result = JSON.parse(responseText) as unknown;
      console.log("Webhook response JSON:", result);

      const processedUrl = extractProcessedImageUrl(result);
      setProcessed(processedUrl);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        originalUrl: original,
        processedUrl: processedUrl,
        fileName: originalFile.name,
        timestamp: Date.now(),
      };
      saveToHistory(newHistoryItem);
      
      toast.success("Background removed!");
    } catch (e: any) {
      console.error("Error in handleRemoveBackground:", e);
      toast.error("Failed to process image. " + (e?.message ?? ""));
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  const deleteFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("bgRemoverHistory", JSON.stringify(newHistory));
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

        <Tabs defaultValue="tool" className="mt-8">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
            <TabsTrigger value="tool">
              <ImageIcon className="mr-2 h-4 w-4" />
              Tool
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tool">
            {!original && (
              <motion.label
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                htmlFor="file"
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`glass mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-16 text-center transition ${dragOver ? "border-brand-cyan bg-card/70 shadow-glow" : "border-border hover:border-white/20"}`}
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
              <div className="mt-6">
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
                  {!processed && !loading && (
                    <Button
                      onClick={handleRemoveBackground}
                      disabled={loading}
                      size="lg"
                      className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow"
                    >
                      <Upload className="mr-2 h-4 w-4" />Remove Background
                    </Button>
                  )}
                  {processed && (
                    <Button
                      onClick={() => downloadImage(processed, `snapcut-${originalFile?.name || "ai"}.png`)}
                      disabled={!processed}
                      size="lg"
                      className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow"
                    >
                      <Download className="mr-2 h-4 w-4" />Download PNG
                    </Button>
                  )}
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
          </TabsContent>

          <TabsContent value="history">
            <div className="mt-6">
              {history.length === 0 ? (
                <div className="glass flex flex-col items-center justify-center rounded-3xl p-16 text-center">
                  <History className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No history yet</h3>
                  <p className="text-muted-foreground mt-2">Your processed images will appear here</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="glass rounded-3xl p-4 shadow-glow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{item.fileName}</h4>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteFromHistory(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <BeforeAfter before={item.originalUrl} after={item.processedUrl} className="aspect-[4/3]" />
                      <div className="mt-4 flex justify-center">
                        <Button
                          onClick={() => downloadImage(item.processedUrl, `snapcut-${item.fileName}`)}
                          size="lg"
                          className="bg-brand-gradient text-white border-0 hover:opacity-90 shadow-glow"
                        >
                          <Download className="mr-2 h-4 w-4" />Download PNG
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
