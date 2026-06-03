import logoAsset from "@/assets/snapcut-logo.png.asset.json";

export function Logo({ className = "h-8 w-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logoAsset.url} alt="SnapCut AI logo" className={`${className} rounded-lg object-cover`} />
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          SnapCut <span className="text-brand-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
