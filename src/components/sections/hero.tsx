import { motion } from "motion/react"
import { Apple, Download, Gamepad2, Sparkles } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { Logo } from "@/components/logo"
import { MacWindow } from "@/components/mac-window"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLatestRelease } from "@/hooks/use-latest-release"
import { brewCommand, links } from "@/lib/links"

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function Hero() {
  const version = useLatestRelease()

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
      <div className="wallpaper pointer-events-none absolute inset-0 -z-10" />
      <div className="grid-fade pointer-events-none absolute inset-0 -z-10" />

      <motion.div
        className="mx-auto max-w-6xl px-4 text-center"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div variants={rise} className="mb-6 flex justify-center">
          <a href={links.latest} className="glass inline-flex items-center gap-2 rounded-full border border-white/10 py-1 pr-3 pl-1 text-xs text-foreground/80 transition hover:border-white/20">
            <Badge className="rounded-full bg-steam/20 text-steam">New</Badge>
            {version ? `Version ${version} is out` : "See what's new"}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.h1 variants={rise} className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Windows games, <span className="text-gradient">in the Steam you already use.</span>
        </motion.h1>

        <motion.p variants={rise} className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted-foreground">
          Proton-ish brings Steam Play to Steam for macOS, the way Proton does on Linux. Pick a Windows game, press Play,
          and it runs through Wine, with Highball's free engine or with CrossOver.
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-11 rounded-lg px-6 text-[15px] shadow-[0_8px_30px_-6px] shadow-steam/50">
            <a href={links.download}>
              <Download />
              Download for Mac
            </a>
          </Button>
          <CopyCommand command={brewCommand} className="w-full max-w-md sm:w-[30rem] sm:max-w-none" />
        </motion.div>

        <motion.ul variants={rise} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5"><Apple className="size-4" />macOS 15+ on Apple Silicon</li>
          <li className="flex items-center gap-1.5"><Sparkles className="size-4" />Free and open source</li>
          <li className="flex items-center gap-1.5"><Gamepad2 className="size-4" />Steam Cloud, overlay and Steam Input</li>
        </motion.ul>
      </motion.div>

      <motion.div
        className="relative mx-auto mt-16 max-w-5xl px-4"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <MacWindow title="Steam">
          <img
            src="/screens/game.webp"
            width={1720}
            height={1408}
            alt="Emberward, a Windows game, running from the macOS Steam library through Proton-ish and Highball's Wine 11 engine"
            className="block h-auto w-full"
          />
        </MacWindow>

        <motion.div
          className="glass absolute top-12 right-0 hidden w-80 rounded-2xl border border-white/10 p-3.5 text-left shadow-2xl sm:right-[-1rem] md:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-gradient-to-b from-[#2a2d3a] to-[#14151b] ring-1 ring-white/10">
              <Logo className="size-7" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span className="font-medium text-foreground/80">Now playing</span>
              </div>
              <p className="mt-0.5 text-sm font-semibold">Emberward</p>
              <p className="text-xs text-foreground/70">Windows game · Highball Wine 11</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
