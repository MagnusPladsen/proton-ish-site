import { useEffect, useState } from "react"
import { Download } from "lucide-react"

import { GitHubIcon } from "@/components/github-icon"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { links } from "@/lib/links"

const menu = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Games", href: "#games" },
  { label: "Engines", href: "#engines" },
  { label: "Install", href: "#install" },
  { label: "FAQ", href: "#faq" },
]

// Starts empty so the prerendered page and the first render in the browser match
function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    // The clock is the outside system here; reading it during render would differ from the prerendered page
    // oxlint-disable-next-line react/set-state-in-effect
    setNow(new Date())
    const timer = setInterval(() => setNow(new Date()), 15_000)
    return () => clearInterval(timer)
  }, [])
  return now
}

// The macOS menu bar: the app's name in bold, its menus, and the clock on the right
export function MenuBar() {
  const now = useClock()
  const clock = now?.toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/5">
      <div className="mx-auto flex h-11 max-w-6xl items-center gap-5 px-4 text-[13px]">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <Logo className="size-5" />
          Proton-ish
        </a>
        <nav aria-label="Main" className="hidden items-center gap-4 text-foreground/75 md:flex">
          {menu.map((item) => (
            <a key={item.href} href={item.href} className="rounded px-1 transition hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden tabular-nums text-foreground/70 sm:inline">{clock}</span>
          <a href={links.repo} aria-label="Proton-ish on GitHub" className="text-foreground/75 transition hover:text-foreground">
            <GitHubIcon className="size-4" />
          </a>
          <Button asChild size="sm" className="h-7 rounded-md px-3 text-xs">
            <a href={links.download}>
              <Download />
              Download
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
