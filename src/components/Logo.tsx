export function Logo({ className = "h-8 w-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg 
        viewBox="0 0 48 48" 
        className={`${className}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D6FFF" />
            <stop offset="45%" stopColor="#20C8FF" />
            <stop offset="75%" stopColor="#C85CFF" />
            <stop offset="100%" stopColor="#F15BFF" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* Image frame (suggesting a photo) */}
        <rect x="10" y="10" width="28" height="22" rx="3" fill="white" fillOpacity="0.2" />
        
        {/* Wand/magic icon for AI */}
        <path 
          d="M34 18L38 14L42 18" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M38 14V22" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        
        {/* Cutout symbol */}
        <path 
          d="M18 28C14 32 18 36 22 32C26 28 30 32 26 36" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Magic sparkles */}
        <circle cx="40" cy="12" r="1.5" fill="white" />
        <circle cx="36" cy="10" r="1" fill="white" />
        <circle cx="40" cy="16" r="1" fill="white" />
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          SnapCut <span className="text-brand-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
