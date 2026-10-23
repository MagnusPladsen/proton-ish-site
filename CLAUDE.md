# proton-ish-site

The website for Proton-ish (https://proton-ish.pladsen.dev). It retells `MagnusPladsen/Proton-ish`, so that repo is
the source of truth:

- Copy, requirements, install steps and FAQ follow Proton-ish's `README.md` and `docs/using-proton-ish.md`.
- `public/app-icon.svg`, `public/favicon.svg` and `public/apple-touch-icon.png` come from `scripts/app-icon.py`,
  which mirrors Proton-ish's `helpers/icon.swift`. Change the icon there first, then here.
- Screenshots in `public/screens/` come from Proton-ish's `docs/screenshots/`.

Proton-ish's own CLAUDE.md asks for a matching change here whenever user-facing text, links, the icon or screens
change there. Run `npm run build` before pushing.
