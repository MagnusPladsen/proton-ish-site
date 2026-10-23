import { useId } from "react"

import { cn } from "@/lib/utils"

// Two crossed orbits around a wine drop, as the app icon draws them
export function Logo({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-7", className)}>
      <defs>
        <linearGradient id={`${id}-drop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff6b6b" />
          <stop offset="1" stopColor="#a3123a" />
        </linearGradient>
        <linearGradient id={`${id}-orbit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cc4ff" />
          <stop offset="1" stopColor="#8b7bff" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="34" rx="27" ry="10" fill="none" stroke={`url(#${id}-orbit)`} strokeWidth="3" transform="rotate(-28 32 34)" />
      <ellipse cx="32" cy="34" rx="27" ry="10" fill="none" stroke={`url(#${id}-orbit)`} strokeWidth="3" transform="rotate(28 32 34)" opacity=".85" />
      <path d="M32 12c6 9 11 15 11 22a11 11 0 0 1-22 0c0-7 5-13 11-22z" fill={`url(#${id}-drop)`} />
      <ellipse cx="28" cy="33" rx="2.6" ry="4.2" fill="#fff" opacity=".35" transform="rotate(-18 28 33)" />
    </svg>
  )
}
