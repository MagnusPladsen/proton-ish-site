import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // No clipboard access: the command stays selectable
    }
  }

  return (
    <div
      className={cn(
        "glass group flex h-11 items-center gap-3 rounded-lg border border-white/10 pr-1.5 pl-4 font-mono text-[13px]",
        className
      )}
    >
      <span className="text-steam select-none">$</span>
      <code className="min-w-0 flex-1 truncate text-foreground/90">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="grid size-8 place-items-center rounded-md text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
      >
        {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
      </button>
    </div>
  )
}
