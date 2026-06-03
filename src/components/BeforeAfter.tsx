import { useRef, useState } from "react";

export function BeforeAfter({ before, after, className = "" }: { before: string; after: string; className?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-2xl checker ${className}`}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* After (full) */}
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-contain" draggable={false} />
      {/* Before clipped to pos */}
      <img
        src={before}
        alt="Before"
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="absolute inset-y-0 w-0.5 bg-white/90 shadow-glow" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-white shadow-lg">
          ⇋
        </div>
      </div>
      <span className="absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-xs">Before</span>
      <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-xs">After</span>
    </div>
  );
}
