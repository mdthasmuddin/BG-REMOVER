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
            <stop offset="0%" stopColor="#2EA8FF" />
            <stop offset="33%" stopColor="#6A5CFF" />
            <stop offset="66%" stopColor="#9B5CFF" />
            <stop offset="100%" stopColor="#FF5FD2" />
          </linearGradient>
          <mask id="cutMask" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
            <rect width="48" height="48" fill="white" />
            <path d="M32 16L36 20L32 24L28 20Z" fill="black" />
          </mask>
        </defs>
        
        {/* Main geometric shape with cutout - represents image frame with removed background */}
        <path 
          d="M12 12C12 8.68629 14.6863 6 18 6H30C33.3137 6 36 8.68629 36 12V36C36 39.3137 33.3137 42 30 42H18C14.6863 42 12 39.3137 14 36V12Z" 
          fill="url(#logoGradient)"
          mask="url(#cutMask)"
        />
        
        {/* Subtle AI neural node accent */}
        <circle cx="18" cy="18" r="1.5" fill="white" fillOpacity="0.8" />
        <circle cx="32" cy="32" r="1.5" fill="white" fillOpacity="0.8" />
        <line x1="18" y1="18" x2="32" y2="32" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          SnapCut <span className="text-brand-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
