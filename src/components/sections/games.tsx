import { motion } from "motion/react"
import { ArrowUpRight, Database, Search, ShieldAlert, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { links } from "@/lib/links"

const facts = [
  {
    icon: Database,
    title: "Open and verified",
    body: "Verified runs, player reports and community consensus, each with where it came from. CC0, so anyone can use it.",
  },
  {
    icon: Wrench,
    title: "Fixes that ship to you",
    body: "Proton-ish bundles highball-db's per-game fixes and applies them when a game launches. New ones arrive with updates.",
  },
  {
    icon: ShieldAlert,
    title: "Anti-cheat, flagged",
    body: "A Mac-aware anti-cheat map tells you up front when a game's anti-cheat will keep it from running.",
  },
]

export function Games() {
  return (
    <section id="games" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-steam">Games</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Will my game run?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check{" "}
            <a href={links.database} className="text-foreground underline underline-offset-4">highball-db</a>, Highball's open
            compatibility database for Windows games on Apple Silicon. It's the same data Proton-ish uses to set up each game.
          </p>
        </div>

        <motion.a
          href={links.database}
          className="glass group mx-auto mt-12 flex h-16 max-w-2xl items-center gap-4 rounded-2xl border border-white/12 px-5 shadow-2xl ring-1 ring-black/40 transition hover:border-white/25"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <Search className="size-6 text-foreground/60" />
          <span className="flex-1 text-left text-xl text-foreground/50 transition group-hover:text-foreground/70">
            Search your game in highball-db…
          </span>
          <span className="hidden items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-xs text-foreground/70 sm:flex">
            gethighball.com
            <ArrowUpRight className="size-3.5" />
          </span>
        </motion.a>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.title} className="glass rounded-2xl border border-white/10 p-6">
              <fact.icon className="size-5 text-steam" />
              <h3 className="mt-4 font-semibold">{fact.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{fact.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Button asChild variant="link" className="text-steam">
            <a href={links.database}>Browse the database <ArrowUpRight /></a>
          </Button>
          <Button asChild variant="link" className="text-muted-foreground">
            <a href={links.highballDb}>highball-db on GitHub <ArrowUpRight /></a>
          </Button>
          <Button asChild variant="link" className="text-muted-foreground">
            <a href={links.highballSite}>About Highball <ArrowUpRight /></a>
          </Button>
        </div>
      </div>
    </section>
  )
}
