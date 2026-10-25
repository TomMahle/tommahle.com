# tommahle.com

My portfolio site: a short intro and the projects I've built, with
[Find a Park](#find-a-park) running live at `/find-a-park`.

This repo started as a copy of
[TomMahle/find-a-park](https://github.com/TomMahle/find-a-park), my take-home
submission, and keeps its history. It reuses that project's setup (Next.js,
Tailwind, accessibility tests, CI) for the whole site.

It's live at **[tommahle.com](https://www.tommahle.com)**, with Find a Park at
[tommahle.com/find-a-park](https://www.tommahle.com/find-a-park).

It's a pnpm + [Turborepo](https://turborepo.com) monorepo:

```
apps/web            the Next.js site (tommahle.com)
apps/mobile         an Expo app (checkout handoff between web and mobile)
packages/checkout   cart schema and helpers shared by both apps
```

Shared packages ship TypeScript source with no build step: Next compiles them
via `transpilePackages`, and Metro compiles workspace packages by default.

## Run it

Requirements: **Node 24** (pinned in `.nvmrc` and `.tool-versions`) and
**pnpm 10** (`corepack enable` will provide it). The Geist font is downloaded
from Google Fonts during `dev` and `build`, so those need internet access.

```bash
pnpm install                            # also installs a git pre-commit hook (Prettier)
pnpm dev                                # web, http://localhost:3000
pnpm dev:mobile                         # Expo dev server (press i / a / w)
```

Production: `pnpm build`, then `pnpm --filter @tommahle/web start`. The site
needs a Node host (Vercel works, with its Root Directory set to `apps/web`),
not a static export, because unknown park URLs return a real 404.

### Checks

```bash
pnpm check                              # types, lint, unit tests (every package), formatting
pnpm --filter @tommahle/web exec playwright install chromium   # once
pnpm test:e2e                           # end-to-end + accessibility, desktop and phone
pnpm screenshots                        # regenerates apps/web/docs/screenshots
```

The screenshots aren't shown in this README, but keep generating them: they
let AI coding agents (and reviewers) see every page in both color schemes on
desktop and phone without running the site.

CI (`.github/workflows/ci.yml`) runs the checks and browser tests on every
push and pull request.

## Adding a project

Add an entry to `apps/web/src/content/projects.ts`. Its first link is the main
button; links can be paths on this site or full `https://` URLs.

## Find a Park

An accessible park finder for New York City, at `/find-a-park`. Its full
write-up (decisions, data handling, accessibility, the AI conversation logs)
is in the [find-a-park README](https://github.com/TomMahle/find-a-park#readme).
Since the copy, it lives here (paths relative to `apps/web/`):

- Routes: `src/app/find-a-park/` (paths built by `src/lib/parks/routes.ts`)
- Code: `src/components/park-*`, `src/lib/parks/`, data in `assets/`
- Map tiles: self-hosted vector tiles in `public/tiles/`. `nyc.pmtiles`
  (26 MB) has the five boroughs' street detail; `overview.pmtiles` (10 MB)
  covers everywhere the map can be panned to at low zoom, so zoomed-out views
  are never blank. `scripts/build-tiles.sh` rebuilds both (needs
  `brew install pmtiles`).
- Fallback photos: `public/photos/`, credited in
  `src/lib/parks/fallback-photos.ts`

## Web app layout

Paths relative to `apps/web/`:

```
src/app/page.tsx                portfolio home page
src/app/layout.tsx              site header (leaf icon) and footer
src/app/icon.svg, favicon.ico, apple-icon.png   site icons
src/content/projects.ts         the projects listed on the home page
src/components/project-card.tsx a project on the home page
src/app/find-a-park/            Find a Park: layout, list + map, park pages, 404
e2e/                            Playwright tests (portfolio, Find a Park, accessibility)
scripts/screenshots.spec.ts     regenerates docs/screenshots
```
