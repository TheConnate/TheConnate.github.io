# theconnate.com

Marketing site for **The Connate** — HIPAA-compliant AI workflow automation for Twin Cities dental and eye clinics.

Hosted on GitHub Pages. Domain served from `theconnate.com`.

---

## Stack

- Plain HTML + CSS, no build step
- Inter via Google Fonts
- Calendly widget on the contact page
- Vanilla JavaScript for the mobile nav toggle only
- Deploys automatically via GitHub Pages on every push to `main`

No npm, no webpack, no framework. Edit files, push, site updates.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, pain points, deployment options, how it works |
| `services.html` | Services — workflows grid, deployment comparison table, pricing |
| `about.html` | About — who, what we believe, why Twin Cities |
| `contact.html` | Contact — book a demo, email, phone, Calendly embed |
| `style.css` | Shared stylesheet |
| `CNAME` | Custom domain file for GitHub Pages (`theconnate.com`) |

## Local preview

Just open `index.html` in a browser. No build required.

Or run a local HTTP server for proper relative path handling:

```bash
cd theconnate-site
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to GitHub Pages

Already set up. Pushing to `main` deploys automatically.

### One-time setup (if forking)

1. Create a repo named `TheConnate.github.io` under the TheConnate GitHub org
2. Push this code to `main`
3. Go to **Settings → Pages**
4. Under "Build and deployment", set **Source** to "Deploy from a branch"
5. Under "Branch", select `main` and `/ (root)`
6. Save. Pages will build and publish within a minute.
7. Check **Settings → Pages** — the site should show a green "Your site is live at https://theconnate.com"

## Custom domain setup (GoDaddy DNS → GitHub Pages)

Because you already own `theconnate.com` on GoDaddy, you just need to point the DNS records at GitHub Pages.

### Step 1 — Disable the GoDaddy free Websites + Marketing site

1. Log in to GoDaddy
2. Go to **My Products**
3. Find the free "Websites + Marketing" product for `theconnate.godaddysites.com`
4. Either delete it or leave it running (it doesn't matter once DNS points elsewhere) — just make sure it's NOT configured to use `theconnate.com` as a domain

### Step 2 — Update DNS in GoDaddy

1. Log in to GoDaddy
2. Go to **My Products → Domains → theconnate.com → DNS**
3. Add these four **A records** for the apex domain:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | @ | 185.199.108.153 | 1 hour |
   | A | @ | 185.199.109.153 | 1 hour |
   | A | @ | 185.199.110.153 | 1 hour |
   | A | @ | 185.199.111.153 | 1 hour |

4. Add one **CNAME record** for `www`:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | CNAME | www | theconnate.github.io | 1 hour |

5. Delete any existing A records or CNAME records for `@` or `www` that point at GoDaddy's website builder (usually labeled `Parked` or `park.godaddy.com`)
6. Save

### Step 3 — Confirm in GitHub Pages

1. Repo **Settings → Pages**
2. Under **Custom domain**, enter `theconnate.com`
3. Click Save
4. GitHub will check DNS. This can take a few minutes to a few hours depending on TTL propagation.
5. Once the DNS check passes, check the **Enforce HTTPS** box. GitHub provisions a free Let's Encrypt certificate automatically.

Done. `https://theconnate.com` now serves this site, and `https://www.theconnate.com` redirects to the apex.

## Editing content

Every piece of marketing copy lives in one of the four HTML files. Search for the exact text you want to change, edit it, commit, push.

Common edits:

- **Phone and email** — search `hello@theconnate.com`, `(612) 555-1234` and replace with your real info (they're placeholders). Located in `contact.html` and in footers across all 4 pages.
- **Calendly link** — search `calendly.com/theconnate/demo` and replace with your actual Calendly event URL. Located in `contact.html` twice (link + embed widget).
- **Hero headline** — `index.html`, inside `<h1>` under the `hero` section.
- **Pricing** — `services.html`, inside the `pricing-grid` section.
- **Competitor names / pains** — `index.html` in the `pain-list` section.

Every change flows to production after `git push`. GitHub Pages rebuilds in under a minute.

## Content sources

The copy on this site is derived from the working content in the `ai-workflow-study-plan` repo:

- Hero + pain points: `docs/business/pain-points/dental-clinics.md` and `pain-points/eye-clinics.md`
- Pricing: `docs/business/pricing-economics.md`
- Deployment comparison: `docs/business/local-vs-cloud-comparison.md`
- Workflows list: `examples/build_pitch_decks.py` VERTICALS dict

If the underlying narrative shifts in those docs, update this site to match. Otherwise the story will drift between your cold emails, your pitch decks, and your website.

## Analytics (when you want it)

Not set up on purpose — analytics scripts slow down first paint and create a cookie-consent headache for HIPAA-adjacent audiences.

When you have enough traffic to care, add one of:

- **Plausible** (privacy-first, no cookies, ~1 KB script) — recommended
- **Fathom** (privacy-first, similar to Plausible)
- **Cloudflare Web Analytics** (free, no cookies, one line of code)

Avoid Google Analytics until you have a documented privacy policy and cookie banner — not worth the compliance overhead for a 4-page site.

## License

All content © 2026 The Connate LLC. Not for redistribution.
