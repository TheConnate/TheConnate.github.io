# The Connate — Site Redesign Design Spec

**Date:** 2026-05-10
**Scope:** Full visual + UX + IA redesign of `theconnate-site` (4 pages → 5 pages), plus consolidation of all open issues from `REVIEW_REPORT.md` (2026-05-03).
**Stack:** Plain HTML + CSS + vanilla JS (unchanged). No build step, no framework, GitHub Pages deploy.
**Direction:** Editorial Trust — Warm editorial flavor.

---

## 1. Goals and non-goals

### Goals

- Move the site from "generic B2B SaaS" to "premium editorial," appropriate for conservative healthcare buyers evaluating a HIPAA-grade vendor.
- Reorganize information architecture to make room for proof (testimonials, founder, case study slots, metrics) without requiring those assets to ship.
- Add the missing Privacy page that the HIPAA-adjacent positioning requires.
- Resolve every open finding from `REVIEW_REPORT.md` as part of this redesign rather than as separate work.
- Preserve the "edit files, push, deploy" velocity the README promises.

### Non-goals

- No build step, no framework, no npm.
- No analytics, no cookies, no tracking pixels (preserves the README's stance).
- No new pages beyond the five listed below (no blog, no FAQ page, no resources hub).
- No real photography or testimonials in this redesign — design supports them as slots, but ships with placeholders.
- No DNS, hosting, or Calendly-event work — those are external blockers tracked separately.

---

## 2. Design system

### 2.1 Color tokens

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#0F2A44` | Display headlines, primary text |
| `--ink-soft` | `#3A4A5C` | Body copy |
| `--ink-muted` | `#6B7787` | Meta, captions, eyebrows on dark surfaces |
| `--cream` | `#F6F1E8` | Page background |
| `--cream-deep` | `#EDE5D4` | Alternating section background, default card surface |
| `--paper` | `#FBF8F2` | Card surface lift on hover, contrast surface |
| `--sage` | `#5A7A66` | Secondary accent, links, badges, tick marks |
| `--sage-soft` | `#D8E1D8` | Sage tint for backgrounds and quote bands |
| `--clay` | `#C0532A` | Primary CTA only — used sparingly |
| `--clay-deep` | `#9E4220` | CTA hover state |
| `--rule` | `rgba(31, 41, 55, 0.10)` | Hairlines and dividers |

Restraint rule: `--clay` appears only on the primary "Book a demo" CTA. Sage carries everything else that needs accent treatment.

WCAG-AA contrast must hold for `--ink` and `--ink-soft` against `--cream`; `--sage` against `--cream` requires verification in the polish phase. If sage fails AA for body text, body text remains in `--ink-soft` and sage is used only for non-text accent (icons, dividers, tags).

### 2.2 Type system

- **Display:** Fraunces (variable, Google Fonts), weights 400/500/600, soft optical-size axis.
- **Body:** Inter (already loaded), weights 400/500/600.
- One additional font request: Fraunces. Inter request stays unchanged.

Fluid type scale (all via `clamp()`):

| Token | Range | Use |
|---|---|---|
| Display XL | `clamp(2.75rem, 6vw, 4.75rem)` | Hero `h1` only |
| Display L | `clamp(2rem, 4vw, 3rem)` | Page header `h1`, section `h2` |
| Display M | `1.5rem` | Card and section sub-heads (`h3`) |
| Display S | `1.125rem` | `h4` |
| Eyebrow | `0.75rem` | Section eyebrows, uppercase, `0.15em` tracking, sage |
| Lead | `clamp(1.125rem, 1.5vw, 1.375rem)` | Hero lead, page header lead |
| Body | `1rem` | Default body copy |
| Caption | `0.875rem` | Meta, image captions |

Display headings use Fraunces 500 with tracking `-0.025em`. Body uses Inter 400, line-height 1.65. Lead uses Inter 400, line-height 1.55.

### 2.3 Spacing

8px rhythm, rebased on existing custom properties:

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |
| `--space-xxl` | `6.5rem` |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |

`--space-section` is the vertical air between top-level sections inside a page. Editorial layout requires generous whitespace; this is non-negotiable.

### 2.4 Radius, rules, shadows

- Card radius: `12px` (consistent across all cards).
- Pill radius: `9999px` (tags, eyebrows when they need a chip treatment — most do not).
- Hairlines: `1px solid var(--rule)` for all dividers and card borders.
- **No drop shadows on cards.** Hover lift is communicated by background-color shift (`--cream-deep` → `--paper`) and a `--sage` 1px border, never by shadow.
- One shadow exception: the sticky header gets `box-shadow: 0 1px 0 var(--rule)` only after the page has been scrolled past 80px.

### 2.5 Motion

- Color transitions: `150ms ease`.
- Transform transitions: `300ms cubic-bezier(0.2, 0, 0, 1)`.
- Scroll-driven reveal on section entry: 12px upward translation + opacity fade, IntersectionObserver-based, in `script.js`.
- Full `prefers-reduced-motion` bypass: all transitions and reveals collapse to instant.
- No parallax, no carousels, no auto-rotating elements.

---

## 3. Component inventory

### 3.1 Atoms

All atoms live in `style.css`. None require JavaScript except those noted.

| Component | Purpose | Notes |
|---|---|---|
| `header.site-header` | Sticky nav | Transparent over the hero, transitions to `--cream-deep` with a hairline once `window.scrollY > 80`. Mobile drawer closes when a link inside is clicked (fixes `REVIEW_REPORT.md` finding #7). Requires `script.js`. |
| `footer.site-footer` | Site footer | 4 columns on desktop, single column on mobile. Adds a Privacy link. Includes small logomark and "Minneapolis, Minnesota" attribution. |
| `.eyebrow` | Small-caps label | Sage, `0.75rem`, `0.15em` letter-spacing. Sits above every section title. No background chip — letterforms only. |
| `.display`, `.display--xl/l/m/s` | Fraunces headings | One class, four size modifiers. |
| `.lead` | Lead paragraph | Inter 400 at lead size, `--ink-soft`, max-width ~`38em`. |
| `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--lg` | Buttons | Primary = clay fill on cream. Ghost = ink border on cream. No `translateY` on hover; editorial buttons do not bounce. Hover = deeper clay or fill on ghost. |
| `.rule` | Hairline divider | Spans inside cards and between subsections. |
| `.card`, `.card--paper` | Surface | Default `--cream-deep` background, `12px` radius, `1px solid var(--rule)`. `--paper` variant for contrast. No shadow. |
| `.stat` | Big number block | `5rem` Fraunces 500 number, Inter caption label below. Used 3-up in stats rows. |
| `.pull-quote` | Testimonial | Large Fraunces 400 with italic optical-size variant, `—Name, Role` attribution below. Lives inside a `--sage-soft` band. |
| `.step` | Numbered step | Oversized Fraunces numeral (no circle around it), step name in Display M, description in body. |
| `.compare` | Comparison table | Sage tick marks, no zebra-stripe, `tabular-nums` on number columns, wrapped in an overflow-scroll container on mobile. |
| `.disclosure` (native `<details>`) | FAQ accordion | Hairline-only rows, animated chevron via CSS `details[open]` selector, no JS. |
| `.tag` | Badge | Sage-soft background, sage text. Used for "Cloud" / "On-Premise" labels. |
| `.skip-link` | Existing | Keep, restyle to match new tokens. |
| `.sticky-cta` | Mobile sticky CTA | Slides up after the hero leaves viewport, single primary button, dismissible. Desktop hides it. Requires `script.js`. |

### 3.2 Reusable section blueprints

Compositions of atoms. Each blueprint maps to a class on a `<section>` element.

| Blueprint | Composition | Pages |
|---|---|---|
| `hero` | Eyebrow + Display XL + Lead + CTA pair + optional hero footer note | `index.html` only |
| `page-header` | Eyebrow + Display L + Lead | Services, About, Contact, Privacy |
| `pull-quote-band` | Single `.pull-quote` on a `--sage-soft` background spanning full width | Home, Services, About (1 each) |
| `stats-row` | Three `.stat` blocks in a row | Home (after hero), Services (under workflows) |
| `process` | Numbered `.step`s in a flowing grid | Home, Services |
| `deploy-grid` | Two `.card` with `.tag` (Cloud / On-Premise) | Home, Services |
| `pricing-grid` | Three `.card`, one marked `--featured` (recommended) | Services |
| `compare-table` | `.compare` inside a horizontal scroll container | Services |
| `cta-closer` | Dark `--ink` section, cream text, clay button, optional ghost button | Every page (footer-adjacent) |

The `cta-closer` is the only dark surface on the site. Its placement at the bottom of every page creates a consistent light-cream-to-dark-ink rhythm — the editorial equivalent of an end-of-article call to action.

---

## 4. Page-by-page IA

For each page below: section order, blueprints used, and labels — **(NEW)** for added sections, **(REWORKED)** for restructured ones, **(slot)** for proof-shaped placeholders that need real content before launch.

### 4.1 `index.html` — Home

1. `hero` — eyebrow "For dental & eye clinics in the Twin Cities" + Display XL "Give your front desk their afternoons back." + lead (current copy preserved) + primary "Book a 20-minute demo" + ghost "See how it works" + hero footer note ("Two deployment options. Azure private tenant or on-premise machine. You pick what fits.", current copy preserved). The pill-shaped eyebrow background from the current design is removed; letterforms carry it.
2. `stats-row` **(NEW slot)** — three placeholder stats: hours saved per week, recall rate lift, appointments auto-confirmed. Numbers are placeholders; swap when real pilot data exists.
3. **Pain points (REWORKED)** — same six items as today, but a left-aligned editorial list. Each item uses Fraunces italic emphasis on the key phrase (e.g., "*the wrong work*"). Replaces the centered → bullet list.
4. `deploy-grid` — two `.card` with `.tag`s "Cloud" and "On-Premise". Copy preserved from current site.
5. `pull-quote-band` **(NEW slot)** — placeholder is a principle statement, e.g., *"Every AI output is a draft a human signs off on. Always."* — works as a value statement before a real client quote exists. Attribution slot is empty until a real one is available; without attribution it reads as a brand principle.
6. **How it works (REWORKED)** — four `.step`s. Replaces the navy-circle numbers with oversized Fraunces numerals. Same four-step copy.
7. `cta-closer`.

### 4.2 `services.html` — Services

1. `page-header` — "Services" eyebrow + Display L + lead.
2. **Workflows (REWORKED)** — currently a flat grid; redone as five named groups: Scheduling, Intake, Recall, Insurance, Follow-ups. Each group is a sub-section with a Display M heading and a list of 2–4 workflows. Each workflow uses Fraunces for its name, Inter for description.
3. `stats-row` **(NEW slot)** — operational lift numbers (minutes saved per patient, calls reduced per week, etc.).
4. `compare-table` — deployment comparison, restyled `.compare`. Same data as current site, sage tick marks instead of generic ✓ glyphs.
5. `pricing-grid` — three `.card`, middle one `--featured`. Copy preserved.
6. **FAQ (NEW)** — six `<details>` disclosures covering the hardest objections:
   - "Is my data really private?"
   - "What if I want to cancel?"
   - "Do you integrate with Dentrix / Compulink?"
   - "Who owns the AI outputs?"
   - "What about audit trails?"
   - "What's the difference between the two deployment options for me?"
   Native `<details>` element, zero JavaScript.
7. `cta-closer`.

### 4.3 `about.html` — About

1. `page-header` — "About" eyebrow + Display L "Why we exist" + lead.
2. **Founder block (NEW slot)** — two-column layout. Left: a `4:5` portrait frame containing a placeholder image (`<img src="/founder-placeholder.svg" alt="Founder portrait — placeholder">`). Right: a two-paragraph founder bio with Inter body. Designed so dropping in a real headshot and rewriting the bio requires no layout work.
3. **Why we exist** — editorial prose, max-width `36em`, with one inline pull-quote for emphasis.
4. **Why Twin Cities** — short paragraph + one inline stat ("~1,400 independent dental practices in the Twin Cities" — verify number before publish or replace with a verified figure).
5. **What we believe** — three or four principles as a small `.card` grid. Each card: Fraunces principle name + Inter explanation, ~50 words.
6. `pull-quote-band` — value statement, one placeholder quote.
7. `cta-closer`.

### 4.4 `contact.html` — Contact

1. `page-header` — "Contact" eyebrow + Display L "Let's talk" + lead.
2. **Two-column contact** — left: contact methods (email `hello@theconnate.com`). Right: Calendly embed in a framed `.card`.
3. **What to expect (NEW)** — small editorial list of three steps: "1. We listen. 2. We sketch a pilot. 3. Day 30 you decide." Reassurance, not a sales pitch.
4. `cta-closer` — collapsed variant on this page: one line ("or email hello@theconnate.com") since the page itself is the CTA.

**Phone number decision:** drop entirely. There is no phone number in any current HTML; the README references one that doesn't exist. The redesign aligns README to reality by removing the phone references everywhere. If a real phone number is added later, it slots into the left column of the two-column contact section.

**Calendly URL:** the placeholder `calendly.com/theconnate/demo` is preserved in the redesigned `contact.html`. The redesign does not fix it; only creating the real Calendly event fixes it. Flagged as a launch-blocker in Section 8.

### 4.5 `privacy.html` — Privacy (NEW page)

A minimum-viable privacy statement, written in the same editorial voice as the rest of the site. Marked at the top: **"Draft — review with counsel before publish."**

1. `page-header` — "Privacy" eyebrow + Display L + lead.
2. **What this site collects** — nothing. No analytics, no cookies, no tracking pixels. Matches the README's stated stance.
3. **What happens when you book a demo** — Calendly handles scheduling; their privacy practices apply once you click through to their widget. Link out.
4. **What happens when you email us** — emails are kept to reply, not shared, not added to a mailing list without permission.
5. **HIPAA scope caveat** — this marketing site does not process PHI. PHI handling is governed by the deployment-specific BAA (Azure tenant) or the on-premise privacy posture, not by this page.
6. **Updates and contact** — when this page changes, when it was last updated, how to reach us with questions.
7. `cta-closer` — collapsed variant (the page is informational, not promotional).

---

## 5. File structure

```
theconnate-site/
├── index.html              (rewritten)
├── services.html           (rewritten)
├── about.html              (rewritten)
├── contact.html            (rewritten)
├── privacy.html            (NEW)
├── 404.html                (NEW)
├── style.css               (rewritten)
├── script.js               (NEW — JS extracted from inline)
├── favicon.svg             (NEW — vector monogram)
├── favicon.png             (NEW — 32×32 fallback)
├── apple-touch-icon.png    (NEW — 180×180)
├── og-image.png            (NEW — 1200×630)
├── CNAME                   (keep)
├── README.md               (updated)
├── REVIEW_REPORT.md        (keep as historical record)
└── docs/superpowers/specs/ (this spec lives here)
```

### 5.1 Shared boilerplate marking

Header and footer remain inlined per HTML file (no build step). To make hand-syncing safe, each shared chunk gets HTML comment markers:

```html
<!-- SHARED:HEADER:START — keep in sync across all pages -->
…
<!-- SHARED:HEADER:END -->

<!-- SHARED:FOOTER:START -->
…
<!-- SHARED:FOOTER:END -->

<!-- SHARED:HEAD-META:START — page-specific title/description above; everything below is shared -->
…
<!-- SHARED:HEAD-META:END -->
```

A grep for `SHARED:HEADER` lists every file that needs updating when the header changes. The README will document this convention.

### 5.2 `script.js`

A single file, ~80 lines, no dependencies. Wrapped in `DOMContentLoaded`. Each capability is feature-detected and silently degrades.

- Mobile nav toggle (currently inline in every HTML file — extracted here).
- Mobile nav drawer **closes when a link inside it is clicked**, and resets `aria-expanded` to `false`. Fixes `REVIEW_REPORT.md` finding #7.
- IntersectionObserver scroll-reveal: adds `.is-revealed` class to elements with `[data-reveal]` when they enter the viewport. `prefers-reduced-motion` short-circuits to immediate add.
- Sticky mobile CTA: monitors the exit of `.hero` (on Home) or `.page-header` (on Services and About) via IntersectionObserver, toggles `.is-visible` on `.sticky-cta`. Excluded from Contact and Privacy via a `data-no-sticky-cta` attribute on `<body>` (Contact's whole purpose is the CTA; Privacy is informational). Desktop CSS hides the element regardless of state.
- Header scroll-state: toggles `.is-scrolled` on `<header>` when `window.scrollY > 80`. Debounced with `requestAnimationFrame`.

### 5.3 Per-page `<head>` template

Every page receives the same `<head>` shape (only title/description and `og:url`/`og:title`/`og:description` vary):

- `<title>` page-specific.
- `<meta name="description">` page-specific.
- `<meta name="theme-color" content="#F6F1E8">` (matches `--cream` background).
- Full Open Graph set on every page: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`. Fixes `REVIEW_REPORT.md` finding #5.
- `twitter:card="summary_large_image"` and matching twitter meta.
- Favicon refs: SVG primary, PNG fallback, apple-touch-icon.
- `<link rel="preconnect">` for Google Fonts (unchanged).
- Inter + Fraunces stylesheet link.
- `<link rel="stylesheet" href="style.css">`.

### 5.4 External link policy

Every `target="_blank"` carries `rel="noopener noreferrer"`. Fixes `REVIEW_REPORT.md` finding #6.

The Calendly script (`https://assets.calendly.com/assets/external/widget.js`) keeps its current loading pattern. SRI hashing is impractical against their rotating CDN; this is documented as accepted risk in `REVIEW_REPORT.md` and remains an open item.

---

## 6. Accessibility

- All interactive elements receive a visible focus ring via `:focus-visible` (sage 2px outline, 2px offset).
- All landmarks present and labeled: `<header>` with `role="banner"` (implicit), `<nav aria-label="Main">`, `<main id="main">`, `<footer role="contentinfo">` (implicit).
- The existing `.skip-link` is preserved and restyled.
- Mobile nav toggle has correct `aria-expanded` state, which now flips to `false` when a link is clicked.
- All non-decorative images include `alt` text. Decorative images (placeholders, the founder portrait until a real one exists) get `alt=""`.
- Heading order is strictly hierarchical on every page: one `<h1>` per page, `<h2>` for sections, `<h3>` for sub-sections, `<h4>` for card titles.
- The Fraunces variable font is loaded with `font-display: swap` (default for Google Fonts) so initial paint is never blocked.
- `prefers-reduced-motion` collapses all transitions and disables scroll-reveal.
- Color contrast: `--ink` on `--cream` ≥ 4.5:1 (verify in polish phase). `--ink-soft` on `--cream` must hold AA for body. Sage on cream must hold for non-body use; if it fails AA for body, body never uses sage.

---

## 7. Phasing

### Phase 1 — Full visual redesign

Single feature branch, single atomic merge. Static-site reality forces this: changing `style.css` breaks any HTML page still on old class names, so the CSS rewrite and the HTML rewrites must land together.

Deliverables:

- Rewritten `style.css` with new tokens, type, atoms, blueprints.
- Rewritten `index.html`, `services.html`, `about.html`, `contact.html`.
- New `privacy.html`.
- New `script.js` with mobile nav, reveal, sticky CTA, scroll header. Inline `<script>` blocks removed from every page.
- All `REVIEW_REPORT.md` HTML/meta fixes folded in: mobile nav close-on-link (#7), `rel="noopener noreferrer"` everywhere (#6), per-page Open Graph (#5).
- Updated `README.md`: file list reflects new structure, `SHARED:` convention documented, phone references removed.
- `SHARED:HEADER` / `SHARED:FOOTER` / `SHARED:HEAD-META` comment markers in all five pages.

Verification before merge:

- Visual pass across all five pages at 360, 768, 1280, and 1920 widths.
- Keyboard tab order on each page.
- Mobile nav drawer closes when a link is clicked.
- `prefers-reduced-motion` honored.
- No console errors in any browser. The Calendly widget may log network warnings while the placeholder URL remains unresolved; these are expected and disappear once the real Calendly event is created (Phase 3).

### Phase 2 — Assets and polish

Separate branch, separate merge.

Deliverables:

- `favicon.svg` (vector monogram in `--clay` on `--cream`).
- `favicon.png` (32×32 fallback).
- `apple-touch-icon.png` (180×180).
- `og-image.png` (1200×630, Fraunces "The Connate" wordmark and short tagline on `--cream`, single `--clay` accent).
- `404.html` matching the site shell.
- WCAG-AA contrast audit on cream + sage combinations. Adjust sage hex if any body-relevant pair fails AA.
- Cross-browser pass: Safari (macOS + iOS), Firefox, Chrome at minimum.
- Final README pass.

### Phase 3 — External blockers (not Claude work)

Tracked, not executed in code.

- Real Calendly event created at the actual URL referenced in `contact.html` (or the URL is updated to match the event).
- Privacy page copy reviewed with counsel.
- Real founder headshot, bio, and (when available) real testimonials swapped into the proof slots.
- Verified Twin Cities clinic count for the About page replaces the unverified placeholder.

---

## 8. Open items at launch

Before pointing outbound traffic at the site, the following must be resolved. None are blocked by the redesign work itself.

1. **Calendly event URL** — the placeholder `calendly.com/theconnate/demo` link and embed must resolve to a real event. Today they fail silently for any real visitor.
2. **Privacy page copy** — current draft is structural and needs counsel review.
3. **Twin Cities clinic count** — number cited on About must be verified or replaced.
4. **Pull-quote attributions** — current placeholders read as principle statements; once a real client quote exists, it should be attributed.
5. **Stats row numbers** — placeholders only. Swap to real numbers once pilot data exists.

---

## 9. Out of scope

These ideas came up during brainstorming but are explicitly **not** in this redesign:

- Blog or content marketing pages.
- Case study detail pages (proof lives as inline sections instead).
- Newsletter signup.
- Live chat widget.
- Analytics of any kind (preserves the README's no-analytics stance).
- A separate FAQ page (FAQ lives inside Services).
- Server-side anything.
- A build step.

---

## 10. Success criteria

The redesign is successful if:

- A clinic owner who lands on the home page from a cold email reads the hero in under 3 seconds and reaches the "Book a demo" CTA without scrolling past four screens.
- Every page passes WCAG-AA contrast on the type that matters (body, headings, links, buttons).
- Every page renders identically on Safari, Firefox, and Chrome at desktop and mobile widths.
- Editing the headline on the home page still takes one file change and one `git push`.
- The redesign sweeps up every finding from `REVIEW_REPORT.md` in the same merge.
- The site reads as premium and editorial, distinct from the generic-B2B-SaaS look it has today.
