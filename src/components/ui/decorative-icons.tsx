import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/** Hand-drawn boutique heart */
export function HeartDoodle({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** 4-point chic boutique sparkle */
export function SparkleDoodle({ className = "w-4 h-4", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

/** Charming ribbon bow illustration */
export function BowIllustration({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Central knot */}
      <ellipse cx="24" cy="14" rx="3.5" ry="4" fill="currentColor" opacity="0.15" />
      <ellipse cx="24" cy="14" rx="3.5" ry="4" />
      {/* Left loop */}
      <path d="M21 13 C14 7, 5 7, 7 15 C9 21, 16 18, 21 15 Z" fill="currentColor" opacity="0.08" />
      <path d="M21 13 C14 7, 5 7, 7 15 C9 21, 16 18, 21 15 Z" />
      <path d="M11 11 C15 13, 18 14, 20.5 14" strokeWidth="1.5" />
      {/* Right loop */}
      <path d="M27 13 C34 7, 43 7, 41 15 C39 21, 32 18, 27 15 Z" fill="currentColor" opacity="0.08" />
      <path d="M27 13 C34 7, 43 7, 41 15 C39 21, 32 18, 27 15 Z" />
      <path d="M37 11 C33 13, 30 14, 27.5 14" strokeWidth="1.5" />
      {/* Left ribbon tail */}
      <path d="M22 17 C19 23, 14 27, 10 29 C12 26, 15 23, 17 21 C19 20, 21 19, 22.5 18" />
      {/* Right ribbon tail */}
      <path d="M26 17 C29 23, 34 27, 38 29 C36 26, 33 23, 31 21 C29 20, 27 19, 25.5 18" />
    </svg>
  );
}

/** Hand-drawn playful emphasis squiggle line */
export function UnderlineSquiggle({ className = "w-24 h-3", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M2 7C22 2 42 10 62 6C82 2 102 9 118 5" />
    </svg>
  );
}
