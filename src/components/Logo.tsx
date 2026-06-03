export function Logo({ className = "h-8 w-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg 
        viewBox="0 0 48 48" 
        className={`${className}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with brand gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D6FFF" />
            <stop offset="45%" stopColor="#20C8FF" />
            <stop offset="75%" stopColor="#C85CFF" />
            <stop offset="100%" stopColor="#F15BFF" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* White checkmark/scissors icon for BG removal */}
        <path
          d="M12 24L20 32L36 16"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          SnapCut <span className="text-brand-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
