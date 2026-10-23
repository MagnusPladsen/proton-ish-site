import type { ReactNode } from "react"
import { Check, Heart } from "lucide-react"

import { MacWindow } from "@/components/mac-window"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { links } from "@/lib/links"

function Point({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <Check className="mt-0.5 size-4 shrink-0 text-steam" />
      <span>{children}</span>
    </li>
  )
}

export function Engines() {
  return (
    <section id="engines" className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="text-sm font-medium text-steam">Engines</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Pick the engine. Steam does the rest.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Make one engine Steam's default for every Windows game, or choose per game under Properties → Compatibility.
          </p>

          <Tabs defaultValue="highball" className="mt-8">
            <TabsList className="glass h-10 rounded-xl border border-white/10 bg-transparent p-1">
              <TabsTrigger value="highball" className="rounded-lg px-4">
                Highball <Badge className="ml-1 rounded-full bg-emerald-400/15 px-1.5 text-[10px] text-emerald-300">Free</Badge>
              </TabsTrigger>
              <TabsTrigger value="crossover" className="rounded-lg px-4">CrossOver</TabsTrigger>
            </TabsList>

            <TabsContent value="highball" className="mt-5">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                A free, open-source Wine 11 engine for Apple Silicon by Gauthier Piarrette. Proton-ish downloads it for you,
                so you don't need the Highball app.
              </p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                <Point>Every game runs with Highball's own launch setup and per-game fixes from highball-db.</Point>
                <Point>D3DMetal for DirectX 12 games, once you accept Apple's licence, plus DXMT and DXVK.</Point>
                <Point>Report a game from the Status page to tell highball-db how it ran.</Point>
              </ul>
              <Button asChild variant="link" className="mt-3 h-auto px-0 text-steam">
                <a href={links.highball}>Highball on GitHub →</a>
              </Button>
            </TabsContent>

            <TabsContent value="crossover" className="mt-5">
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Already own CrossOver? Proton-ish turns each supported build into a Steam compatibility tool, next to Highball.
              </p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                <Point>Use CrossOver's Wine for the games that run best on it.</Point>
                <Point>Default Compatibility Settings per CrossOver version, right in Steam's settings.</Point>
                <Point>Mix engines freely: each game keeps its own choice.</Point>
              </ul>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-wine/30 bg-wine/10 p-4 text-sm">
                <Heart className="mt-0.5 size-4 shrink-0 text-wine" />
                <p className="text-foreground/85">
                  Buying CrossOver is the most direct way to support Wine development, which every engine builds on.{" "}
                  <a href={links.crossOver} className="font-medium text-foreground underline underline-offset-4">CrossOver at CodeWeavers</a>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <MacWindow title="Proton-ish" className="mx-auto max-w-md lg:max-w-none">
          <img
            src="/screens/status.webp"
            width={819}
            height={1116}
            loading="lazy"
            alt="Proton-ish's Status screen: Steam set up, three Highball Wine 11 engines ready, and Highball as Steam's default for Windows games"
            className="block h-auto w-full"
          />
        </MacWindow>
      </div>
    </section>
  )
}
