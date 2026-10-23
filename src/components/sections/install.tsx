import { Download } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { MacWindow } from "@/components/mac-window"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { brewCommand, links } from "@/lib/links"

const steps = [
  {
    title: "Open it",
    body: (
      <>
        Proton-ish isn't notarized, so macOS blocks the first launch. Open <b>System Settings → Privacy &amp; Security</b> and
        click <b>Open Anyway</b>.
      </>
    ),
  },
  {
    title: "Click Install",
    body: (
      <>
        On the Status screen, click <b>Install</b> and allow <b>App Management</b> when macOS asks: Proton-ish adds Steam
        Play to the Steam app.
      </>
    ),
  },
  {
    title: "Get an engine",
    body: (
      <>
        Click <b>Download…</b> next to Highball engine (about 440 MB). Already have CrossOver or the Highball app? Click{" "}
        <b>Set Up</b> instead.
      </>
    ),
  },
  {
    title: "Restart Steam and press Play",
    body: <>Highball's engine runs under Rosetta 2. If your Mac doesn't have it yet, Proton-ish tells you how to add it.</>,
  },
]

export function Install() {
  return (
    <section id="install" className="relative py-24">
      <div className="wallpaper pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-steam">Install</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Set up in a few steps.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            You need an Apple Silicon Mac with macOS 15 or newer and{" "}
            <a href={links.steamMac} className="text-foreground underline underline-offset-4">Steam for macOS</a>.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-steam text-sm font-semibold text-primary-foreground">1</span>
              <h3 className="text-lg font-semibold">Install Proton-ish</h3>
            </div>
            <Tabs defaultValue="brew" className="mt-4">
              <TabsList className="glass h-10 rounded-xl border border-white/10 bg-transparent p-1">
                <TabsTrigger value="brew" className="rounded-lg px-4">Homebrew</TabsTrigger>
                <TabsTrigger value="zip" className="rounded-lg px-4">Download</TabsTrigger>
              </TabsList>
              <TabsContent value="brew" className="mt-4">
                <MacWindow title="Terminal — zsh" bodyClassName="bg-[#15161b] p-5 font-mono text-[13px] leading-6">
                  <p className="text-foreground/50"># Installs, and updates with brew upgrade</p>
                  <p className="break-all">
                    <span className="text-emerald-400">~</span> <span className="text-steam">$</span> {brewCommand}
                  </p>
                  <p className="text-foreground/50">🍺 proton-ish was successfully installed!</p>
                </MacWindow>
                <CopyCommand command={brewCommand} className="mt-3" />
              </TabsContent>
              <TabsContent value="zip" className="mt-4">
                <div className="glass rounded-xl border border-white/10 p-6">
                  <p className="text-[15px] text-muted-foreground">
                    Download <code className="text-foreground">Proton-ish.zip</code>, open it, and move{" "}
                    <code className="text-foreground">Proton-ish.app</code> to Applications. The app updates itself from then on.
                  </p>
                  <Button asChild className="mt-5">
                    <a href={links.download}><Download />Download Proton-ish.zip</a>
                  </Button>
                  <Button asChild variant="link" className="mt-5 ml-2 text-muted-foreground">
                    <a href={links.releases}>All releases</a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="glass flex gap-4 rounded-xl border border-white/10 p-5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold">{index + 2}</span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground [&_b]:font-medium [&_b]:text-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="mx-auto mt-16 max-w-3xl">
          <MacWindow title="Steam — Properties">
            <img
              src="/screens/compatibility.webp"
              width={1146}
              height={796}
              loading="lazy"
              alt="A game's Compatibility settings in Steam, with a Highball Wine 11 compatibility tool chosen"
              className="block h-auto w-full"
            />
          </MacWindow>
          <figcaption className="mt-4 text-center text-sm text-muted-foreground">
            A game that also has a Mac version runs the Mac one. To play the Windows version, pick a Proton-ish tool under
            Properties → Compatibility.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
