import { motion } from "motion/react"
import { Gamepad2, Layers, MousePointerClick } from "lucide-react"

import { Logo } from "@/components/logo"

const steps = [
  { icon: MousePointerClick, title: "You press Play", body: "In Steam for macOS, on any Windows game in your library." },
  { icon: null, title: "Proton-ish steps in", body: "As Steam's compatibility tool, with the game's prefix, settings and fixes." },
  { icon: Layers, title: "Wine runs it", body: "On Highball's free engine or CrossOver, with D3DMetal, DXMT or DXVK." },
  { icon: Gamepad2, title: "You play", body: "Steam Cloud saves, the overlay and Steam Input go through Steam as usual." },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-steam">How it works</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Steam Play, the Mac way.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            On Linux, Proton sits between Steam and a Windows game. Proton-ish does the same on your Mac.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div aria-hidden="true" className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-steam/0 via-steam/50 to-wine/0 md:block" />
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="glass relative mx-auto grid size-16 place-items-center rounded-2xl border border-white/10 shadow-lg">
                {step.icon ? <step.icon className="size-6 text-foreground/90" /> : <Logo className="size-9" />}
                <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-steam text-xs font-semibold text-primary-foreground">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mx-auto mt-1.5 max-w-56 text-sm text-muted-foreground">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
