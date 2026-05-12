# theconnate.com

Marketing site for **The Connate** — HIPAA-compliant AI workflow automation for Twin Cities dental and eye clinics.

Hosted on GitHub Pages. Domain served from `theconnate.com`.

---

## Stack

- Plain HTML + CSS + vanilla JS, no build step
- Inter and Fraunces via Google Fonts
- Calendly widget on the contact page
- Single shared `script.js` for mobile nav, scroll-reveal, sticky CTA, header scroll-state
- Deploys automatically via GitHub Pages on every push to `main`

No npm, no webpack, no framework. Edit files, push, site updates.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, stats, pain points, deployment options, pull quote, how it works |
| `services.html` | Services — workflows, comparison table, pricing, FAQ |
| `about.html` | About — founder, why we exist, principles, why Twin Cities |
| `contact.html` | Contact — email, Calendly embed, what to expect |
| `privacy.html` | Privacy statement (HIPAA-aware, no analytics, marketing-only) |
| `style.css` | Shared stylesheet (token-driven editorial design system) |
| `script.js` | Shared JS (mobile nav, scroll-reveal, sticky CTA, header scroll-state) |
| `404.html` | Custom 404 page served by GitHub Pages for unknown paths |
| `favicon.svg` | Vector monogram favicon (modern browsers) |
| `favicon.png` | 32×32 PNG fallback favicon |
| `apple-touch-icon.png` | 180×180 iOS home-screen icon |
| `og-image.svg` / `og-image.png` | 1200×630 social-share preview image (SVG source + rasterized PNG) |
| `CNAME` | Custom domain file for GitHub Pages (`theconnate.com`) |

## Shared boilerplate convention

The header, footer, and head meta are inlined per HTML file (no build step). To make hand-syncing safe, each shared chunk is wrapped with HTML comment markers:

```html
<!-- SHARED:HEADER:START — keep in sync across all pages -->
…
<!-- SHARED:HEADER:END -->

<!-- SHARED:FOOTER:START -->
…
<!-- SHARED:FOOTER:END -->

<!-- SHARED:HEAD-META:START -->
…
<!-- SHARED:HEAD-META:END -->
```

When editing the header, footer, or shared head meta, grep for `SHARED:HEADER` (or `SHARED:FOOTER` / `SHARED:HEAD-META`) to find every file that needs updating:

```bash
grep -rln "SHARED:HEADER" *.html
```

## Local preview

Open `index.html` in a browser, or run a local HTTP server:

```bash
cd theconnate-site
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy

Pushing to `main` deploys automatically. The repo is configured for "Deploy from a branch" (Settings → Pages, branch `main`, root).

## Editing content

Every piece of marketing copy lives in one of the five HTML files. Search for the exact text, edit it, commit, push.

Common edits:

- **Email** — search `hello@theconnate.com` — appears in `contact.html`, `privacy.html`, and the slim CTA on contact.
- **Calendly link** — search `calendly.com/theconnate/demo` — appears in `contact.html` twice (link + embed widget). Replace with your real Calendly event URL before publishing outbound links.
- **Hero headline** — `index.html`, inside the `<h1>` under the `hero` section.
- **Pricing** — `services.html`, `pricing-grid` section.
- **Pain points** — `index.html`, `pain-list` section.

## Placeholder content to swap before launch

These slots ship with placeholder copy or assets. Replace before pointing real traffic at the site:

- `index.html` stats row — three placeholder numbers (`5+`, `20%+`, `10+`). Swap with real pilot data.
- `index.html` pull quote — currently a brand principle; replace with a real client quote and attribution when one exists.
- `services.html` stats row — three operational metrics. Swap when pilot data exists.
- `about.html` founder portrait — empty cream-deep frame inside `.founder__portrait`. Add `<img src="founder.jpg" alt="…">` inside the div.
- `privacy.html` — top of page says "Draft — review with counsel before publish." Remove that line once counsel has reviewed.
- `contact.html` Calendly URL — create the real Calendly event at `calendly.com/theconnate/demo` or update both occurrences to match the real URL.

## Custom domain setup (GoDaddy DNS → GitHub Pages)

[DNS setup instructions are unchanged from before the redesign — preserved verbatim:]

1. Log in to GoDaddy → My Products → Domains → theconnate.com → DNS
2. Add four **A records** for the apex domain pointing at `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Add one **CNAME record**: `www` → `theconnate.github.io`
4. Delete any existing A/CNAME records for `@` or `www` that point at GoDaddy's website builder
5. Save, wait for DNS propagation
6. In GitHub: Settings → Pages → set Custom domain to `theconnate.com`, enable HTTPS once DNS check passes

## Content sources

Marketing copy is derived from the working content in the `ai-workflow-study-plan` repo:

- Pain points: `docs/business/pain-points/dental-clinics.md` and `pain-points/eye-clinics.md`
- Pricing: `docs/business/pricing-economics.md`
- Deployment comparison: `docs/business/local-vs-cloud-comparison.md`
- Workflows: `examples/build_pitch_decks.py` VERTICALS dict

When the underlying narrative shifts, update this site to match.

## Analytics (intentionally absent)

No analytics, no cookies, no tracking pixels — by design. This decision keeps first paint fast and removes cookie-consent overhead that a 5-page marketing site for a HIPAA-adjacent audience does not need.

When you do want analytics, lean toward privacy-first options that don't require a cookie banner:

- **Plausible** (privacy-first, no cookies)
- **Fathom** (similar to Plausible)
- **Cloudflare Web Analytics** (free, no cookies)

## License

All content © 2026 The Connate LLC. Not for redistribution.
