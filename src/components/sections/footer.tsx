import { Download } from "lucide-react"

import { GitHubIcon } from "@/components/github-icon"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { links } from "@/lib/links"

const columns = [
  {
    title: "Project",
    items: [
      { label: "Source code", href: links.repo },
      { label: "Releases", href: links.releases },
      { label: "Changelog", href: links.changelog },
      { label: "Using Proton-ish", href: links.guide },
      { label: "Report a problem", href: links.issues },
    ],
  },
  {
    title: "Built on",
    items: [
      { label: "Highball", href: links.highballSite },
      { label: "highball-db", href: links.database },
      { label: "NotProton", href: links.notProton },
      { label: "Wine", href: links.wine },
      { label: "Valve's Proton", href: links.proton },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mt-12 pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 text-center">
          <div className="wallpaper pointer-events-none absolute inset-0 -z-10" />
          <Logo className="mx-auto size-16" />
          <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Your Windows games are waiting.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Free, open source, and inside the Steam you already use.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-lg px-6">
              <a href={links.download}><Download />Download for Mac</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass h-11 rounded-lg px-6">
              <a href={links.repo}><GitHubIcon className="size-4" />Star on GitHub</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2 font-semibold"><Logo className="size-6" />Proton-ish</a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Steam Play for macOS. Free and open source under GPLv3.</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {column.items.map((item) => (
                  <li key={item.label}><a href={item.href} className="transition hover:text-foreground">{item.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-white/8" />
        <p className="text-xs leading-relaxed text-muted-foreground/80">
          Proton-ish is a fork of NotProton and is not affiliated with or endorsed by NotProton, Valve, CodeWeavers or
          Highball. Steam is a trademark of Valve Corporation. Mac and macOS are trademarks of Apple Inc.
        </p>
      </div>
    </footer>
  )
}
