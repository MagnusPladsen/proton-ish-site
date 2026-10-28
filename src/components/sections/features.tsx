import { motion } from "motion/react"
import type { LucideIcon } from "lucide-react"
import { ArrowLeftRight, Cloud, Gamepad2, RefreshCw, Sparkles, Wrench } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Feature = { icon: LucideIcon; title: string; body: string; tint: string; wide?: boolean }

const features: Feature[] = [
  {
    icon: Gamepad2,
    title: "Your library, as it is",
    body: "Windows games sit next to your Mac games and start with Steam's own Play button. No second launcher, no second library.",
    tint: "from-steam/30",
    wide: true,
  },
  {
    icon: Cloud,
    title: "Steam keeps doing its job",
    body: "Cloud saves, sign-in, the overlay and Steam Input go through Steam as usual.",
    tint: "from-sky-400/25",
  },
  {
    icon: Sparkles,
    title: "Free to play",
    body: "Proton-ish downloads Highball's free Wine 11 engine for you. No licence needed to start.",
    tint: "from-violet/30",
  },
  {
    icon: Wrench,
    title: "Per-game fixes, built in",
    body: "Every game runs with Highball's own launch settings and the fixes from highball-db, which arrive with each update. Need more? Winetricks is built into the app.",
    tint: "from-amber-400/25",
    wide: true,
  },
  {
    icon: ArrowLeftRight,
    title: "CrossOver as well",
    body: "Own CrossOver? It becomes a Steam compatibility tool too, and you choose per game.",
    tint: "from-wine/30",
  },
  {
    icon: RefreshCw,
    title: "Updates itself",
    body: "Check for Updates in the app, or brew upgrade. Engines and game fixes arrive the same way.",
    tint: "from-emerald-400/25",
    wide: true,
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-steam">Features</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Feels like it was always there.</h2>
        <p className="mt-4 text-lg text-muted-foreground">Proton-ish works inside Steam, so there's nothing new to learn.</p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={cn(feature.wide && "lg:col-span-2")}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.06 }}
          >
            <Card className="group relative h-full gap-3 overflow-hidden border-white/8 bg-card/60 px-6 backdrop-blur-xl transition hover:border-white/15">
              <div className={cn("pointer-events-none absolute -top-24 -left-24 size-56 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl transition group-hover:opacity-100", feature.tint)} />
              <div className="relative grid size-11 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                <feature.icon className="size-5 text-foreground/90" />
              </div>
              <h3 className="relative mt-2 text-lg font-semibold">{feature.title}</h3>
              <p className="relative text-[15px] leading-relaxed text-muted-foreground">{feature.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
