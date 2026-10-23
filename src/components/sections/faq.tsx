import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { links } from "@/lib/links"

const questions = [
  {
    q: "Is it free?",
    a: <>Yes. Proton-ish is free and open source under GPLv3, and Highball's engine is free too. CrossOver is optional and sold by CodeWeavers.</>,
  },
  {
    q: "Which Macs does it run on?",
    a: <>Apple Silicon Macs with macOS 15 or newer. Highball's engine runs x86_64 Windows games under Rosetta 2, which macOS installs on request.</>,
  },
  {
    q: "Will every Windows game work?",
    a: (
      <>
        No. Most games that run in Highball or CrossOver run through Steam with Proton-ish, but nobody can test every game.
        Look yours up in <a href={links.database} className="text-foreground underline underline-offset-4">highball-db</a> first.
        Games that use Valve Anti-Cheat can't join secure matchmaking (Proton doesn't support VAC either), and games on NTFS
        drives aren't supported.
      </>
    ),
  },
  {
    q: "Why does macOS warn me when I open it?",
    a: (
      <>
        Proton-ish isn't notarized by Apple, which needs a paid developer account. The source and every release build are
        public on GitHub. Allow it once under System Settings → Privacy &amp; Security.
      </>
    ),
  },
  {
    q: "Does it change my Steam install?",
    a: <>It adds Steam Play to the Steam app and its compatibility tools to Steam's folder. Remove Everything on the Status page puts Steam back as it was.</>,
  },
  {
    q: "A game doesn't start. Where do I report it?",
    a: (
      <>
        Open an <a href={links.issues} className="text-foreground underline underline-offset-4">issue on GitHub</a> with
        the game's <code>protonish-run.log</code>. Played a game on Highball's engine? Use Report a Game on the Status page
        to tell highball-db how it ran.
      </>
    ),
  },
]

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24">
      <div className="text-center">
        <p className="text-sm font-medium text-steam">FAQ</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Questions, answered.</h2>
      </div>
      <Accordion type="single" collapsible className="glass mt-12 rounded-2xl border border-white/10 px-6">
        {questions.map((item, index) => (
          <AccordionItem key={item.q} value={`q${index}`} className="border-white/8">
            <AccordionTrigger className="py-5 text-[15px] hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
