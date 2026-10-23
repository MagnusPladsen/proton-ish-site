# proton-ish-site

The website for [Proton-ish](https://github.com/MagnusPladsen/Proton-ish), Steam Play for macOS.
Live at **https://proton-ish.pladsen.dev**.

React 19, TypeScript, Vite, Tailwind CSS 4 and [shadcn/ui](https://ui.shadcn.com) (new-york style, Radix
primitives), with [Motion](https://motion.dev) for the animations. It's one static page with no server and no analytics; the footer's
visits badge comes from [hits.sh](https://hits.sh), which counts page loads.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, builds, then prerenders the page into dist/
npm run preview  # serves dist/ the way a host would
```

More shadcn components: `npx shadcn@latest add <component>` (the config is in `components.json`).

## SEO

`npm run build` prerenders the page (`src/entry-server.tsx`, then `scripts/prerender.mjs`), so `dist/index.html`
holds the full page for crawlers and link previews; the browser then hydrates it. The prerender step also adds:

- JSON-LD structured data: the site, the app as a free `SoftwareApplication` (with the newest release's version
  when GitHub answers), and a `FAQPage` built from the FAQ section's own answers.
- `dist/sitemap.xml`, dated by the build.

Also in `public/`: `robots.txt`, `site.webmanifest`, `llms.txt` (a plain summary for AI search), the PNG icons, and
`og.jpg`, the 1200×630 social preview. The title, description, Open Graph and Twitter tags are in `index.html`.

Closed FAQ answers and inactive tabs stay in the page, hidden, so their text is prerendered too. When the hero
screenshot changes, update `og.jpg` to match.

## Deploy

`npm run build` produces a static site in `dist/`. `public/CNAME` names the domain, so it lands in `dist/` too.

- **GitHub Pages:** in the repo's Settings → Pages, choose GitHub Actions and use the "Static HTML" or Vite
  starter workflow with `npm ci && npm run build` and `dist` as the path. The custom domain is read from `CNAME`.
- **Netlify, Vercel or Cloudflare Pages:** build command `npm run build`, output directory `dist`.

Then point `proton-ish.pladsen.dev` at the host: a `CNAME` record to `<user>.github.io` for GitHub Pages, or the
record your host gives you.

## Layout

- `src/components/sections/`: the page, top to bottom: menu bar, hero, features, how it works, games (highball-db),
  engines, install, FAQ, footer, and the macOS-style dock.
- `src/components/ui/`: shadcn components.
- `src/lib/links.ts`: every outside link in one place.
- `public/screens/`: screenshots from the Proton-ish repo, as WebP. `library.webp` is the hero.
- `public/app-icon.svg` (also `favicon.svg` and, rendered at 180 px, `apple-touch-icon.png`) is the app's icon,
  a wine glass inside two orbits, drawn by `scripts/app-icon.py` from the geometry in
  Proton-ish's `helpers/icon.swift`. Rerun it if the app icon changes.

The hero's version, GitHub stars and download count (`Proton-ish.zip` across all releases) come from GitHub's public
API in the visitor's browser (`src/hooks/use-github-stats.ts`); each is left out when GitHub doesn't answer. The Download buttons always point at the newest release's `Proton-ish.zip`.

## Content

Copy follows the Proton-ish README and `docs/using-proton-ish.md`; keep the two in step when features change.
Proton-ish is not affiliated with or endorsed by NotProton, Valve, CodeWeavers or Highball.
