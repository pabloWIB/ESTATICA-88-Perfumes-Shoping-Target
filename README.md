<img src="assets/img/logo/lucas-williams-emotional.png" alt="Lucas Williams Emotional mark" width="112">

# Wonderful Stories — Lucas Williams, Emotional

A single-page editorial cover: two full-height panels, one typographic and one photographic, with a staged entrance animation.

[![Live site](https://img.shields.io/badge/live-pablowib.github.io/Wonderful-Stories-Web-2ea44f)](https://pablowib.github.io/Wonderful-Stories-Web)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)

## Description

The page is built as a printed cover rather than as a website. The left panel is set on paper cream and carries the masthead, the contributor byline and the standfirst. The right panel is the same composition laid over a landscape photograph, with a flat scrim underneath the type so that cream text keeps its contrast against the sky.

Section labels are typographic marks — `Editorial —`, `Wonderful Stories — Collective ◎`, `Discover new stories — Happiness ◎` — which gives the page the cadence of a contents page. The named contributor sits inside that frame as a byline: the collective is the brand, the writer is one voice within it.

The entrance runs on CSS animations alone, so the page reads correctly even if JavaScript never executes. The only script keeps the edition year in the masthead in sync.

There is no navigation, no form and no second page. The publication is one page, and the markup says so: nothing on the page is styled to look clickable.

## Tech stack

| Layer | Technology | Role in the project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html`, no templating |
| Styling | CSS3 with custom properties | Three files: tokens, layout, components |
| Scripting | JavaScript, no framework | 20 lines in `assets/js/main.js`, loaded with `defer` |
| Typography | Google Fonts — Archivo, Libre Caslon Text | `preconnect` + `display=swap` |
| Imagery | WebP for photography, PNG for icons | Icons derived from the mark above |

No build step, no package manager and no runtime dependencies.

## Project structure

```
.
├── index.html                      # The cover. Single page of the site.
├── 404.html                        # Served on unknown paths, links back to the cover.
├── robots.txt                      # Allows everything, points at the sitemap.
├── sitemap.xml                     # One URL: the cover.
├── assets/
│   ├── css/
│   │   ├── base.css                # Tokens in :root, reset, typography.
│   │   ├── layout.css              # Cover grid, panels, breakpoints.
│   │   └── components.css          # Tags, card, keylines, motion.
│   ├── js/
│   │   └── main.js                 # Entry point. Syncs the edition year.
│   └── img/
│       ├── content/
│       │   ├── landscape-mountains.webp     # Feature panel background, 1920px.
│       │   ├── contributor-portrait.webp    # Card portrait, 400px.
│       │   └── social-card.jpg              # og:image, 1200x630.
│       └── logo/
│           ├── lucas-williams-emotional.png # Master mark, source of the icons.
│           ├── favicon-32x32.png
│           ├── icon-192.png
│           └── apple-touch-icon.png
├── docs/
│   ├── auditoria.md                # State of the project before the reorganisation.
│   └── cambios.md                  # Change log, grouped by phase.
└── LICENSE
```

Assets live under `assets/`, every path is relative and lowercase, and `404.html` is the one file that uses root-relative paths, because a host serves it from arbitrary URLs.

## Running it locally

The site is static and has no dependencies, so opening the file works:

```bash
open index.html
```

To exercise it the way a host will — clean URLs, correct MIME types, and `404.html` on unknown paths — serve the folder:

```bash
npx serve .
```

Then visit `http://localhost:3000`.

## Deployment

Static hosting, no build command and no output directory: publish the repository root as-is. `404.html` at the root is picked up automatically by Vercel, Netlify and GitHub Pages.

Currently deployed on GitHub Pages at [pablowib.github.io/Wonderful-Stories-Web](https://pablowib.github.io/Wonderful-Stories-Web).

Both `sitemap.xml` and the canonical, `og:url` and `og:image` tags in `index.html` carry that absolute domain. Deploying to a different domain means updating those four values.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
