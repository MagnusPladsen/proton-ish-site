import { Dock } from "@/components/sections/dock"
import { Engines } from "@/components/sections/engines"
import { Faq } from "@/components/sections/faq"
import { Games } from "@/components/sections/games"
import { Features } from "@/components/sections/features"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Install } from "@/components/sections/install"
import { MenuBar } from "@/components/sections/menu-bar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <a href="#features" className="sr-only focus:not-sr-only focus:fixed focus:top-14 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2">
        Skip to content
      </a>
      <MenuBar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Games />
        <Engines />
        <Install />
        <Faq />
      </main>
      <Footer />
      <Dock />
    </TooltipProvider>
  )
}
