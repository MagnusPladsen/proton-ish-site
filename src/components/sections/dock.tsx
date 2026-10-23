import { useRef } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react"
import { CircleHelp, Download, Home, Layers, Sparkles, Terminal } from "lucide-react"

import { GitHubIcon } from "@/components/github-icon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { links } from "@/lib/links"

type Item = { label: string; href: string; icon: LucideIcon | typeof GitHubIcon; tint: string }

const items: Item[] = [
  { label: "Home", href: "#top", icon: Home, tint: "from-sky-400 to-blue-600" },
  { label: "Features", href: "#features", icon: Sparkles, tint: "from-violet-400 to-fuchsia-600" },
  { label: "Engines", href: "#engines", icon: Layers, tint: "from-amber-300 to-orange-600" },
  { label: "Install", href: "#install", icon: Terminal, tint: "from-zinc-600 to-zinc-900" },
  { label: "FAQ", href: "#faq", icon: CircleHelp, tint: "from-emerald-400 to-teal-600" },
  { label: "GitHub", href: links.repo, icon: GitHubIcon, tint: "from-neutral-700 to-neutral-950" },
  { label: "Download", href: links.download, icon: Download, tint: "from-rose-400 to-red-700" },
]

function DockIcon({ item, mouseX }: { item: Item; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null)
  // The macOS magnification: icons near the pointer grow
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return x - box.x - box.width / 2
  })
  const size = useSpring(useTransform(distance, [-140, 0, 140], [44, 66, 44]), { mass: 0.1, stiffness: 170, damping: 14 })
  const Icon = item.icon

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          ref={ref}
          href={item.href}
          aria-label={item.label}
          style={{ width: size, height: size }}
          className={`grid place-items-center rounded-[22%] bg-gradient-to-b ${item.tint} shadow-lg ring-1 ring-white/15`}
        >
          <Icon className="size-[45%] text-white drop-shadow" />
        </motion.a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10} className="bg-popover/90 text-popover-foreground">
        {item.label}
      </TooltipContent>
    </Tooltip>
  )
}

export function Dock() {
  const mouseX = useMotionValue(Infinity)
  return (
    <nav aria-label="Sections" className="fixed inset-x-0 bottom-4 z-40 hidden justify-center sm:flex">
      <motion.div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass flex h-[62px] items-end gap-2.5 rounded-2xl border border-white/10 px-2.5 pb-2 shadow-2xl"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 16 }}
      >
        {items.map((item) => (
          <DockIcon key={item.label} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </nav>
  )
}
