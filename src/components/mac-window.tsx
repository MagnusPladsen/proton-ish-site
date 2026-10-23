import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

// A macOS window: the traffic lights and a centred title over translucent chrome
export function MacWindow({
  title,
  children,
  className,
  bodyClassName,
}: {
  title?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div className={cn("window-shadow overflow-hidden rounded-xl bg-[#1d1e24]", className)}>
      <div className="glass relative flex h-9 items-center gap-2 border-b border-white/5 px-3.5">
        <span className="size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/20" />
        <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/20" />
        <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/20" />
        {title && (
          <span className="pointer-events-none absolute inset-x-0 text-center text-xs font-medium text-white/55">
            {title}
          </span>
        )}
      </div>
      <div className={cn("relative", bodyClassName)}>{children}</div>
    </div>
  )
}
