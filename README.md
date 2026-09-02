# relayk.it

The RelayKit marketing + documentation site — a static Astro site deployed to Nostr as an nsite (NIP-5A).

## Stack

- **[Astro 5](https://astro.build)** — static HTML output, near-zero client JS. The Rubik's cube, typewriter title and site chrome are small vanilla TS scripts; no UI framework ships anywhere.
- **TailwindCSS 3** — design tokens (lilac accents, sharp corners, light/dark) live in `src/styles/global.css`.
- **Ethnocentric** display font + **JetBrains Mono** body font.
- Content pages are Markdown in `src/content/`, organised into collections (`pages`, `features`, `services`, `apps`, `guides`) that drive the docs sidebar automatically (`src/lib/nav.ts`).

## Developing

```bash
npm run dev      # astro dev server
npm run test     # astro check + build
npm run build    # astro build → dist/
```

## Content authoring

- Add a page: drop a `.md` file into the matching `src/content/<collection>/` directory with `title`, `description`, `order` frontmatter. It appears in the sidebar.
- Screenshots/videos: put files in `public/media/`, reference from a service page's `media` frontmatter (rendered automatically) or inline in Markdown.
- The changelog (`src/content/pages/changelog.md`) is maintained by hand — copy user-facing notes from `../relaykit/app/CHANGELOG.md` when cutting a release.

## Deploying (nsite)

```bash
npm run nsite:publish
```

Builds `dist/` and uploads it with nsyte (NIP-5A). Unknown paths serve the generated `404.html`. Relays/servers are configured in `.nsite/config.json`; the publish script downloads a pinned nsyte binary into `.tools/`.

## Analytics

Plausible Analytics is wired in via build-time env vars (see `.env.example`): set `PLAUSIBLE_DOMAIN` and rebuild. The CSP allows the script origin automatically. Leave it empty to build without tracking.

