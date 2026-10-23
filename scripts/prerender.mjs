// Prerenders the page into dist/index.html and adds structured data and the sitemap.
// Crawlers and link previews that don't run JavaScript see the whole page this way.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = path.resolve(import.meta.dirname, "..")
const dist = path.join(root, "dist")
const ssr = path.join(root, "dist-ssr")
const site = "https://proton-ish.pladsen.dev/"
const repo = "https://github.com/MagnusPladsen/Proton-ish"

const { render, faq } = await import(pathToFileURL(path.join(ssr, "entry-server.js")).href)

// The newest release's version, when GitHub answers; the build doesn't depend on it
async function latestVersion() {
  try {
    const response = await fetch("https://api.github.com/repos/MagnusPladsen/Proton-ish/releases/latest", {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return null
    const { tag_name: tag } = await response.json()
    return typeof tag === "string" ? tag.replace(/^v/, "") : null
  } catch {
    return null
  }
}

const version = await latestVersion()
const today = new Date().toISOString().slice(0, 10)

const author = { "@type": "Person", "@id": `${site}#author`, name: "Magnus Pladsen", url: "https://github.com/MagnusPladsen" }

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site}#website`,
      url: site,
      name: "Proton-ish",
      description: "Steam Play for macOS: Windows games in the Mac Steam library.",
      inLanguage: "en",
      publisher: { "@id": `${site}#author` },
    },
    author,
    {
      "@type": "SoftwareApplication",
      "@id": `${site}#app`,
      name: "Proton-ish",
      alternateName: "Proton for Mac",
      description:
        "Proton-ish adds Steam Play to Steam for macOS, the way Proton does on Linux. Windows games in your Steam library run through Wine, with Highball's free engine or with CrossOver.",
      url: site,
      image: `${site}og.jpg`,
      screenshot: `${site}screens/library.webp`,
      applicationCategory: "GameApplication",
      applicationSubCategory: "Compatibility layer",
      operatingSystem: "macOS 15 or later, Apple Silicon",
      downloadUrl: `${repo}/releases/latest/download/Proton-ish.zip`,
      installUrl: `${repo}/releases/latest`,
      ...(version && { softwareVersion: version }),
      releaseNotes: `${repo}/blob/main/CHANGELOG.md`,
      license: "https://www.gnu.org/licenses/gpl-3.0.html",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${site}#author` },
      sameAs: [repo],
    },
    {
      "@type": "FAQPage",
      "@id": `${site}#faq`,
      mainEntity: faq().map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
}

// "<" can't close the script tag early once escaped
const jsonLd = JSON.stringify(graph).replace(/</g, "\\u003c")

const indexPath = path.join(dist, "index.html")
const template = await readFile(indexPath, "utf8")
if (!template.includes('<div id="root"></div>')) throw new Error("dist/index.html has no empty #root to fill")

const html = template
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace("</head>", `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
await writeFile(indexPath, html)

await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${site}</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${site}screens/library.webp</image:loc></image:image>
    <image:image><image:loc>${site}screens/status.webp</image:loc></image:image>
    <image:image><image:loc>${site}screens/compatibility.webp</image:loc></image:image>
  </url>
</urlset>
`,
)

await rm(ssr, { recursive: true, force: true })
console.log(`prerendered dist/index.html${version ? ` (Proton-ish ${version})` : ""} and wrote dist/sitemap.xml`)
