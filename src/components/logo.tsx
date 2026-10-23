import { cn } from "@/lib/utils"

// The app icon itself: public/app-icon.svg, drawn by scripts/app-icon.py from Proton-ish's helpers/icon.swift
export function Logo({ className }: { className?: string }) {
  return <img src="/app-icon.svg" alt="" aria-hidden="true" className={cn("size-7 select-none", className)} draggable={false} />
}
