import React from 'react'

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-16",
    xl: "h-24"
  }

  const textClasses = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} aspect-square relative`}>
        {/* Custom SVG Logo: A stylized "Sonic Burst" */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
          {/* Outer jagged burst (Catharsis) */}
          <path 
            d="M50 5 L58 35 L88 25 L65 45 L95 55 L65 65 L88 85 L58 75 L50 95 L42 75 L12 85 L35 65 L5 55 L35 45 L12 25 L42 35 Z" 
            fill="hsl(var(--primary))"
            className="animate-pulse"
          />
          {/* Inner core (Sound) */}
          <circle cx="50" cy="50" r="18" fill="black" />
          {/* Waveform detail */}
          <path 
            d="M38 50 Q44 35 50 50 T62 50" 
            stroke="hsl(var(--secondary))" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className={`${textClasses[size]} font-black italic tracking-tighter uppercase leading-none`}>
        SOUND<span className="text-primary glow-primary">CATHARSIS</span>
      </span>
    </div>
  )
}
