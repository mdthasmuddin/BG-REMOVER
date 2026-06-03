export function Logo({ className = "h-8 w-8", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg 
        viewBox="0 0 64 64" 
        className={`${className}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1D6FFF" />
            <stop offset="45%" stopColor="#20C8FF" />
            <stop offset="75%" stopColor="#C85CFF" />
            <stop offset="100%" stopColor="#F15BFF" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />
        
        {/* Scissors icon */}
        <g transform="translate(12, 12)">
          <path
          d="M20 2C17.7909 2 16 3.79086 16 6C16 8.20914 17.7909 10 20 10C22.2091 10 24 8.20914 24 6C24 3.79086 22.2091 2 20 2Z"
          fill="white"
          />
          <path
          d="M40 20C37.7909 20 36 21.7909 36 24C36 26.2091 37.7909 28 40 28C42.2091 28 44 26.2091 44 24C44 21.7909 42.2091 20 40 20Z"
          fill="white"
          />
          <path
          d="M22.5 11L30 23.5L22.5 36"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
          <path
          d="M37.5 11L30 23.5L37.5 36"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
          <path
          d="M30 23.5L48 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
          <path
          d="M30 23.5L48 28"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
        </g>
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight">
          SnapCut <span className="text-brand-gradient">AI</span>
        </span>
      )}
    </div>
  );
}
