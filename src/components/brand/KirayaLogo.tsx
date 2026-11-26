// src/components/brand/KirayaLogo.tsx
import React from "react";

export type LogoVariant = "horizontal" | "icon" | "monochrome";

interface KirayaLogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: number;
}

export function KirayaMark({
  className = "",
  size = 32,
  monochrome = false,
}: {
  className?: string;
  size?: number;
  monochrome?: boolean;
}) {
  const gradId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {!monochrome && (
          <linearGradient id={gradId} x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="55%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        )}
      </defs>

      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="14"
        fill={monochrome ? "rgba(255,255,255,0.08)" : "#1C1633"}
        stroke={monochrome ? "currentColor" : `url(#${gradId})`}
        strokeWidth="2"
      />

      <path
        d="M15 14V34M15 24L27 14M18.5 21.2L29.5 34"
        stroke={monochrome ? "currentColor" : `url(#${gradId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M34.5 11.5L35.7 14.8L39 16L35.7 17.2L34.5 20.5L33.3 17.2L30 16L33.3 14.8L34.5 11.5Z"
        fill={monochrome ? "currentColor" : "#F472B6"}
      />
    </svg>
  );
}

export function KirayaLogo({
  variant = "horizontal",
  className = "",
  size = 32,
}: KirayaLogoProps) {
  const isMono = variant === "monochrome";

  if (variant === "icon") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <KirayaMark size={size} monochrome={false} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 select-none text-white ${className}`}>
      <KirayaMark size={size} monochrome={isMono} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-base sm:text-lg font-bold tracking-wider ${
            isMono
              ? "text-white"
              : "bg-gradient-to-r from-white via-[#F472B6] to-[#8B5CF6] bg-clip-text text-transparent"
          }`}
        >
          KIRAYA Chat
        </span>
        <span
          className={`text-[10px] font-medium tracking-wide mt-0.5 ${
            isMono ? "text-white/75" : "text-[#C4B5FD]"
          }`}
        >
          Create Your Own Story
        </span>
      </span>
    </span>
  );
      }
            
