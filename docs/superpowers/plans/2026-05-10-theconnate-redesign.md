# The Connate Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 4-page marketing site as a 5-page "Editorial Trust" experience — warm cream/sage/clay palette, Fraunces + Inter typography, restructured information architecture with proof-shaped placeholders, while preserving the plain-HTML/CSS/vanilla-JS stack and zero-build deploy story.

**Architecture:** Single shared `style.css` rewrite driven by CSS custom-property tokens. Shared boilerplate (header, footer, head meta) remains inlined per page but marked with `SHARED:*` HTML comments so hand-syncing is greppable. One small `script.js` extracted from inline scripts handles mobile nav, scroll-reveal, sticky CTA, and header scroll-state. Two-phase rollout: Phase 1 lands the full visual redesign as one atomic merge (CSS + all 5 HTML files); Phase 2 follows with favicon/OG/404/contrast polish.

**Tech Stack:** HTML5, CSS (custom properties, `clamp()`, `:focus-visible`, `<details>`), vanilla JS (`DOMContentLoaded`, `IntersectionObserver`, `requestAnimationFrame`). Inter + Fraunces variable fonts via Google Fonts. Local dev: `python3 -m http.server 8000`. Deploy: GitHub Pages auto-deploys `main`.

**Source spec:** `docs/superpowers/specs/2026-05-10-theconnate-redesign-design.md`

**Branches:**
- Phase 1: `redesign/phase-1-editorial`
- Phase 2: `redesign/phase-2-polish`

---

## Verification model

This is a static marketing site with no test runner. The "test" model is **defined criteria → implement → verify in browser → commit**. Each task that touches user-visible output ends with explicit verification steps (what to look at, at what viewport widths, what to confirm) before the commit.

Always run the local server during verification:

```bash
cd theconnate-site
python3 -m http.server 8000
# visit http://localhost:8000
```

Test viewport widths: **360px** (small mobile), **768px** (tablet), **1280px** (laptop), **1920px** (large desktop). Browser DevTools device toolbar is fine.

---

## Phase 1 — Editorial visual redesign

### Task 0: Create the phase-1 feature branch

**Files:** none.

- [ ] **Step 1: Verify clean working tree**

```bash
cd theconnate-site
git status
```

Expected: `nothing to commit, working tree clean` (or only the new `docs/superpowers/` directory from brainstorming). If there are unrelated uncommitted changes, stash or commit them first.

- [ ] **Step 2: Create and switch to the feature branch**

```bash
git checkout -b redesign/phase-1-editorial
```

Expected: `Switched to a new branch 'redesign/phase-1-editorial'`.

- [ ] **Step 3: Commit the spec + plan (if not already committed)**

```bash
git add docs/
git commit -m "docs: add editorial redesign spec and implementation plan"
```

If `docs/` was already committed on main, skip this step.

---

### Task 1: Rewrite `style.css` with the new design system

**Files:**
- Modify (full rewrite): `style.css`

**What this task does:** Replaces the entire CSS file with a token-driven design system. After this task, opening any of the existing HTML pages in a browser will look broken (old class names no longer have styles). That is expected — the HTML rewrites in later tasks bring everything back to life.

- [ ] **Step 1: Replace `style.css` with the complete file below**

Open `style.css` and replace its full contents with:

```css
/* ─── The Connate — Editorial design system ─────────────────────
   Tokens are the single source of truth. Component styles only
   reference tokens; never use raw hex values inside components. */

/* ─── Reset + base ───────────────────────────────────────────── */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
               system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink-soft);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: var(--sage);
  text-decoration: none;
  transition: color 150ms ease;
}

a:hover {
  color: var(--ink);
}

/* ─── Tokens ─────────────────────────────────────────────────── */

:root {
  /* Color */
  --ink:        #0F2A44;
  --ink-soft:   #3A4A5C;
  --ink-muted:  #6B7787;
  --cream:      #F6F1E8;
  --cream-deep: #EDE5D4;
  --paper:      #FBF8F2;
  --sage:       #5A7A66;
  --sage-soft:  #D8E1D8;
  --clay:       #C0532A;
  --clay-deep:  #9E4220;
  --rule:       rgba(31, 41, 55, 0.10);

  /* Spacing (8px rhythm) */
  --space-xs:      0.5rem;
  --space-sm:      1rem;
  --space-md:      1.5rem;
  --space-lg:      2.5rem;
  --space-xl:      4rem;
  --space-xxl:     6.5rem;
  --space-section: clamp(4rem, 8vw, 8rem);

  /* Layout */
  --container:     1120px;
  --container-narrow: 720px;

  /* Radius */
  --radius:    12px;
  --radius-sm: 6px;
  --radius-pill: 9999px;

  /* Motion */
  --t-color:     150ms ease;
  --t-transform: 300ms cubic-bezier(0.2, 0, 0, 1);
}

/* ─── Typography ─────────────────────────────────────────────── */

h1, h2, h3, h4 {
  font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
  font-weight: 500;
  font-variation-settings: 'opsz' 144, 'SOFT' 30;
  line-height: 1.15;
  color: var(--ink);
  letter-spacing: -0.025em;
}

.display--xl { font-size: clamp(2.75rem, 6vw, 4.75rem); }
.display--l  { font-size: clamp(2rem, 4vw, 3rem); }
.display--m  { font-size: 1.5rem; }
.display--s  { font-size: 1.125rem; }

h1 { font-size: clamp(2.75rem, 6vw, 4.75rem); margin-bottom: var(--space-md); }
h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: var(--space-md); }
h3 { font-size: 1.5rem; margin-bottom: var(--space-sm); }
h4 { font-size: 1.125rem; margin-bottom: var(--space-xs); }

p {
  margin-bottom: var(--space-sm);
}

.lead {
  font-size: clamp(1.125rem, 1.5vw, 1.375rem);
  line-height: 1.55;
  color: var(--ink-soft);
}

.eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: var(--space-sm);
}

.caption {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-muted);
}

/* ─── Layout ─────────────────────────────────────────────────── */

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.container--narrow {
  max-width: var(--container-narrow);
}

.section {
  padding: var(--space-section) 0;
}

.section--alt {
  background: var(--cream-deep);
}

.section-header {
  text-align: center;
  max-width: var(--container-narrow);
  margin: 0 auto var(--space-lg);
}

.section-header .lead {
  margin-top: var(--space-sm);
}

.rule {
  border: 0;
  border-top: 1px solid var(--rule);
  margin: var(--space-md) 0;
}

/* ─── Buttons ────────────────────────────────────────────────── */

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.625rem;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: background var(--t-color), color var(--t-color), border-color var(--t-color);
  text-decoration: none;
}

.btn--primary {
  background: var(--clay);
  color: #fff;
  border-color: var(--clay);
}

.btn--primary:hover {
  background: var(--clay-deep);
  border-color: var(--clay-deep);
  color: #fff;
}

.btn--ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--ink);
}

.btn--ghost:hover {
  background: var(--ink);
  color: var(--cream);
}

.btn--lg {
  padding: 1.125rem 2rem;
  font-size: 1rem;
}

/* ─── Header / nav ───────────────────────────────────────────── */

header.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background var(--t-color), box-shadow var(--t-color);
}

header.site-header.is-scrolled {
  background: var(--cream-deep);
  box-shadow: 0 1px 0 var(--rule);
}

header.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-sm);
  padding-bottom: var(--space-sm);
}

.logo {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.025em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo::before {
  content: '';
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: var(--clay);
}

nav.main-nav ul {
  display: flex;
  gap: var(--space-md);
  list-style: none;
  align-items: center;
}

nav.main-nav a {
  color: var(--ink-soft);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  position: relative;
}

nav.main-nav a:hover { color: var(--ink); }

nav.main-nav a.active { color: var(--ink); }

nav.main-nav a.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--clay);
}

nav.main-nav .btn {
  padding: 0.625rem 1.125rem;
}

.nav-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--ink);
  margin: 5px 0;
  transition: transform var(--t-color), opacity var(--t-color);
}

/* ─── Hero ───────────────────────────────────────────────────── */

.hero {
  padding: var(--space-xxl) 0 var(--space-xl);
  position: relative;
  overflow: hidden;
}

.hero .container {
  max-width: 920px;
  text-align: center;
  position: relative;
}

.hero .lead {
  max-width: 660px;
  margin: 0 auto var(--space-lg);
}

.hero-ctas {
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-footer {
  margin-top: var(--space-lg);
  font-size: 0.95rem;
  color: var(--ink-muted);
}

/* ─── Page header (inner pages) ──────────────────────────────── */

.page-header {
  padding: var(--space-xl) 0 var(--space-lg);
  text-align: center;
  border-bottom: 1px solid var(--rule);
}

.page-header .container {
  max-width: 780px;
}

.page-header .lead {
  margin-top: var(--space-sm);
}

/* ─── Card ───────────────────────────────────────────────────── */

.card {
  background: var(--cream-deep);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: var(--space-lg);
  transition: background var(--t-color), border-color var(--t-color);
}

.card:hover {
  background: var(--paper);
  border-color: var(--sage);
}

.card--paper {
  background: var(--paper);
}

.card h3 {
  margin-bottom: var(--space-sm);
}

/* ─── Tag / badge ────────────────────────────────────────────── */

.tag {
  display: inline-block;
  background: var(--sage-soft);
  color: var(--sage);
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}

/* ─── Pain list (editorial bullets) ──────────────────────────── */

.pain-list {
  list-style: none;
  max-width: 720px;
  margin: 0 auto;
}

.pain-list li {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm) 0;
  font-size: 1.075rem;
  border-bottom: 1px solid var(--rule);
}

.pain-list li:last-child { border-bottom: 0; }

.pain-list li::before {
  content: '—';
  color: var(--clay);
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 1px;
}

.pain-list em {
  font-family: 'Fraunces', Georgia, serif;
  font-style: italic;
  font-weight: 500;
  color: var(--ink);
}

/* ─── Stats row ──────────────────────────────────────────────── */

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-md);
}

.stat {
  text-align: center;
  padding: var(--space-md);
}

.stat__number {
  display: block;
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
  color: var(--ink);
  letter-spacing: -0.03em;
  margin-bottom: var(--space-xs);
  font-variant-numeric: tabular-nums;
}

.stat__label {
  color: var(--ink-muted);
  font-size: 0.95rem;
}

/* ─── Pull quote band ────────────────────────────────────────── */

.pull-quote-band {
  background: var(--sage-soft);
  padding: var(--space-xl) 0;
}

.pull-quote {
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
}

.pull-quote q {
  display: block;
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.3;
  color: var(--ink);
  font-variation-settings: 'opsz' 144, 'SOFT' 50;
  quotes: none;
}

.pull-quote q::before,
.pull-quote q::after { content: ''; }

.pull-quote cite {
  display: block;
  margin-top: var(--space-md);
  font-style: normal;
  font-size: 0.95rem;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
}

/* ─── Deploy / pricing grids ─────────────────────────────────── */

.deploy-grid,
.pricing-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.deploy-grid .card ul,
.pricing-grid .card ul {
  list-style: none;
  margin-top: var(--space-md);
}

.deploy-grid .card ul li,
.pricing-grid .card ul li {
  position: relative;
  padding: 0.5rem 0 0.5rem 1.5rem;
  font-size: 0.95rem;
  color: var(--ink-soft);
}

.deploy-grid .card ul li::before,
.pricing-grid .card ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75rem;
  width: 12px;
  height: 7px;
  border-left: 2px solid var(--sage);
  border-bottom: 2px solid var(--sage);
  transform: rotate(-45deg);
}

.price-card .price {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: var(--space-xs);
}

.price-card .price-sub {
  color: var(--ink-muted);
  font-size: 0.9rem;
  margin-bottom: var(--space-md);
}

.price-card.featured {
  position: relative;
  border-color: var(--clay);
  background: var(--paper);
}

.price-card.featured::before {
  content: 'RECOMMENDED';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--clay);
  color: #fff;
  padding: 0.25rem 0.875rem;
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

/* ─── Process (steps) ────────────────────────────────────────── */

.process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-lg);
  counter-reset: step;
}

.step {
  counter-increment: step;
}

.step::before {
  content: counter(step, decimal-leading-zero);
  display: block;
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 400;
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--clay);
  line-height: 1;
  margin-bottom: var(--space-sm);
  letter-spacing: -0.03em;
}

.step h4 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.25rem;
  margin-bottom: var(--space-xs);
}

.step p {
  color: var(--ink-soft);
  font-size: 0.95rem;
  margin-bottom: 0;
}

/* ─── Compare table ──────────────────────────────────────────── */

.compare-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
}

.compare {
  width: 100%;
  border-collapse: collapse;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  font-variant-numeric: tabular-nums;
}

.compare th,
.compare td {
  padding: var(--space-sm) var(--space-md);
  text-align: left;
  border-bottom: 1px solid var(--rule);
  font-size: 0.95rem;
}

.compare thead th {
  background: var(--cream-deep);
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--ink);
  letter-spacing: 0;
}

.compare tbody tr:last-child td { border-bottom: 0; }

.compare td:first-child {
  font-weight: 600;
  color: var(--ink);
}

/* ─── FAQ disclosures ────────────────────────────────────────── */

.faq {
  max-width: 760px;
  margin: 0 auto;
}

.disclosure {
  border-bottom: 1px solid var(--rule);
  padding: var(--space-sm) 0;
}

.disclosure:first-child {
  border-top: 1px solid var(--rule);
}

.disclosure summary {
  list-style: none;
  cursor: pointer;
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: 1.125rem;
  color: var(--ink);
  padding: var(--space-sm) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.disclosure summary::-webkit-details-marker { display: none; }

.disclosure summary::after {
  content: '+';
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  color: var(--sage);
  transition: transform var(--t-transform);
  flex-shrink: 0;
}

.disclosure[open] summary::after {
  transform: rotate(45deg);
}

.disclosure p {
  color: var(--ink-soft);
  padding: 0 0 var(--space-sm);
  margin: 0;
  font-size: 1rem;
}

/* ─── Founder block (about) ──────────────────────────────────── */

.founder {
  display: grid;
  grid-template-columns: minmax(220px, 320px) 1fr;
  gap: var(--space-lg);
  align-items: start;
  max-width: 920px;
  margin: 0 auto;
}

.founder__portrait {
  aspect-ratio: 4 / 5;
  background: var(--cream-deep);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  overflow: hidden;
}

.founder__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.founder__bio p {
  font-size: 1.075rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: var(--space-md);
}

/* ─── About prose ────────────────────────────────────────────── */

.prose {
  max-width: 36em;
  margin: 0 auto;
}

.prose h2 {
  margin-top: var(--space-lg);
}

.prose h2:first-child { margin-top: 0; }

.prose p {
  font-size: 1.075rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: var(--space-md);
}

.prose a {
  color: var(--sage);
  border-bottom: 1px solid currentColor;
}

.prose a:hover {
  color: var(--ink);
}

/* ─── Values grid (about — what we believe) ──────────────────── */

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.value-card {
  padding: var(--space-md);
  background: var(--cream-deep);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
}

.value-card h4 {
  font-family: 'Fraunces', Georgia, serif;
  color: var(--ink);
  font-size: 1.125rem;
  margin-bottom: var(--space-xs);
}

.value-card p {
  color: var(--ink-soft);
  font-size: 0.95rem;
  margin: 0;
}

/* ─── Contact two-column ─────────────────────────────────────── */

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.contact-methods .method {
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--rule);
}

.contact-methods .method:first-child { padding-top: 0; }
.contact-methods .method:last-child { border-bottom: 0; }

.contact-methods h3 {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.25rem;
  margin-bottom: var(--space-xs);
}

.contact-methods a {
  font-weight: 500;
  border-bottom: 1px solid currentColor;
}

.contact-embed {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: var(--space-sm);
  min-height: 700px;
}

.contact-embed .calendly-inline-widget {
  min-width: 280px;
  height: 680px;
}

/* ─── What-to-expect list (contact) ──────────────────────────── */

.expect-list {
  list-style: none;
  max-width: 760px;
  margin: 0 auto;
  counter-reset: expect;
}

.expect-list li {
  counter-increment: expect;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-md);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--rule);
}

.expect-list li:last-child { border-bottom: 0; }

.expect-list li::before {
  content: counter(expect, decimal-leading-zero);
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 400;
  font-size: 1.75rem;
  color: var(--clay);
  line-height: 1;
  letter-spacing: -0.03em;
}

.expect-list strong {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 500;
  font-size: 1.125rem;
  color: var(--ink);
  display: block;
  margin-bottom: 0.25rem;
}

.expect-list p {
  color: var(--ink-soft);
  margin: 0;
}

/* ─── CTA closer ─────────────────────────────────────────────── */

.cta-closer {
  background: var(--ink);
  color: var(--cream);
  padding: var(--space-xxl) 0;
  text-align: center;
}

.cta-closer .container {
  max-width: 720px;
}

.cta-closer h2 {
  color: var(--cream);
  margin-bottom: var(--space-sm);
}

.cta-closer p {
  color: rgba(246, 241, 232, 0.85);
  font-size: 1.125rem;
  margin-bottom: var(--space-lg);
}

.cta-closer .btn--ghost {
  color: var(--cream);
  border-color: rgba(246, 241, 232, 0.5);
}

.cta-closer .btn--ghost:hover {
  background: var(--cream);
  color: var(--ink);
  border-color: var(--cream);
}

.cta-closer--slim {
  padding: var(--space-xl) 0;
}

.cta-closer--slim p {
  font-size: 1rem;
  margin: 0;
}

/* ─── Sticky mobile CTA ──────────────────────────────────────── */

.sticky-cta {
  position: fixed;
  bottom: var(--space-sm);
  left: var(--space-sm);
  right: var(--space-sm);
  z-index: 90;
  display: none;
  transform: translateY(150%);
  transition: transform var(--t-transform);
}

.sticky-cta.is-visible {
  transform: translateY(0);
}

.sticky-cta .btn {
  width: 100%;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(15, 42, 68, 0.15);
}

body[data-no-sticky-cta] .sticky-cta { display: none !important; }

/* ─── Footer ─────────────────────────────────────────────────── */

footer.site-footer {
  background: var(--ink);
  color: rgba(246, 241, 232, 0.85);
  padding: var(--space-xl) 0 var(--space-md);
  margin-top: 0;
}

footer.site-footer .container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-lg);
}

footer.site-footer .logo {
  color: var(--cream);
}

footer.site-footer .logo::before {
  background: var(--clay);
}

footer.site-footer .tagline {
  color: rgba(246, 241, 232, 0.7);
  font-size: 0.95rem;
  max-width: 320px;
  margin-top: var(--space-sm);
}

footer.site-footer h4 {
  color: var(--cream);
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-sm);
}

footer.site-footer ul {
  list-style: none;
}

footer.site-footer ul li {
  padding: 0.25rem 0;
}

footer.site-footer a {
  color: rgba(246, 241, 232, 0.7);
  font-size: 0.95rem;
}

footer.site-footer a:hover { color: var(--cream); }

footer.site-footer .copyright {
  grid-column: 1 / -1;
  padding-top: var(--space-md);
  border-top: 1px solid rgba(246, 241, 232, 0.1);
  font-size: 0.85rem;
  color: rgba(246, 241, 232, 0.5);
  margin-top: var(--space-sm);
}

/* ─── Reveal-on-scroll ───────────────────────────────────────── */

[data-reveal] {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 500ms ease, transform var(--t-transform);
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Accessibility ──────────────────────────────────────────── */

:focus-visible {
  outline: 2px solid var(--sage);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.skip-link {
  position: absolute;
  top: -40px;
  left: var(--space-sm);
  background: var(--ink);
  color: var(--cream);
  padding: var(--space-sm) var(--space-md);
  z-index: 1000;
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.skip-link:focus { top: var(--space-sm); }

/* ─── Mobile ─────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .hero { padding: var(--space-xl) 0 var(--space-lg); }

  .hero-ctas { flex-direction: column; align-items: stretch; }
  .hero-ctas .btn { justify-content: center; }

  nav.main-nav ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--cream);
    flex-direction: column;
    gap: 0;
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--rule);
  }

  nav.main-nav ul.is-open { display: flex; }

  nav.main-nav a {
    display: block;
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--rule);
  }

  nav.main-nav a.active::after { display: none; }

  nav.main-nav li:last-child a {
    border-bottom: 0;
    margin-top: var(--space-sm);
  }

  .nav-toggle { display: block; }

  .sticky-cta { display: block; }

  .founder { grid-template-columns: 1fr; }
  .founder__portrait { max-width: 280px; }

  .contact-grid { grid-template-columns: 1fr; }

  footer.site-footer .container { grid-template-columns: 1fr; }
}

/* ─── Reduced motion ─────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
  [data-reveal] { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Verify the file is syntactically valid**

Open `style.css` in the browser DevTools after loading any page — Console must show no CSS parse errors. (Pages will look broken until HTML migrates, but CSS itself must parse.)

```bash
python3 -m http.server 8000
# In another terminal or browser, visit http://localhost:8000
# Open DevTools Console. Confirm no CSS parse errors.
```

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "feat(css): rewrite style.css with editorial design system"
```

---

### Task 2: Create `script.js`

**Files:**
- Create: `script.js`

- [ ] **Step 1: Create `script.js` with the complete file below**

```javascript
// The Connate — site-wide interactivity.
// All capabilities are feature-detected; the page works without JS.

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initMobileNav();
    initScrollReveal();
    initHeaderScrollState();
    initStickyCta();
  });

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.main-nav ul');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('is-open');
      setOpen(!isOpen);
    });

    // Close the drawer when any nav link is clicked.
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    targets.forEach(function (el) { io.observe(el); });
  }

  function initHeaderScrollState() {
    const header = document.querySelector('header.site-header');
    if (!header) return;

    let ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  function initStickyCta() {
    const sticky = document.querySelector('.sticky-cta');
    if (!sticky) return;
    if (document.body.hasAttribute('data-no-sticky-cta')) return;

    const trigger = document.querySelector('.hero') || document.querySelector('.page-header');
    if (!trigger || !('IntersectionObserver' in window)) {
      // Without a trigger or IO, keep the sticky CTA hidden; CSS controls visibility.
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Show the sticky CTA once the trigger has scrolled out of view.
        sticky.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    io.observe(trigger);
  }
})();
```

- [ ] **Step 2: Verify the file is syntactically valid**

```bash
node --check script.js
```

Expected: no output (exit code 0).

If `node` isn't installed, open the file in a browser via any HTML page that includes it (after the HTML migrations land) and confirm no console errors.

- [ ] **Step 3: Commit**

```bash
git add script.js
git commit -m "feat(js): extract mobile nav, add scroll reveal, sticky CTA, header state"
```

---

### Task 3: Rewrite `index.html`

**Files:**
- Modify (full rewrite): `index.html`

- [ ] **Step 1: Replace `index.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <!-- SHARED:HEAD-META:START — page-specific title/description above this block stays per-page; the rest stays in sync across all pages -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Connate — HIPAA-compliant AI workflows for Twin Cities clinics</title>
  <meta name="description" content="HIPAA-compliant AI workflow automation for independent dental and eye clinics in Minneapolis and St. Paul. Appointment reminders, intake, recall, insurance explainers — drafted by AI, reviewed by your staff.">
  <meta name="theme-color" content="#F6F1E8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <meta property="og:title" content="The Connate — AI workflows for Twin Cities clinics">
  <meta property="og:description" content="HIPAA-compliant AI workflow automation for Minneapolis/St. Paul dental and eye clinics.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://theconnate.com/">
  <meta property="og:image" content="https://theconnate.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="The Connate — AI workflows for Twin Cities clinics">
  <meta name="twitter:description" content="HIPAA-compliant AI workflow automation for Minneapolis/St. Paul dental and eye clinics.">
  <meta name="twitter:image" content="https://theconnate.com/og-image.png">
  <!-- SHARED:HEAD-META:END -->
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<!-- SHARED:HEADER:START — keep in sync across all pages -->
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>
<!-- SHARED:HEADER:END -->

<main id="main">

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <span class="eyebrow">For dental &amp; eye clinics in the Twin Cities</span>
      <h1 class="display--xl">Give your front desk their afternoons back.</h1>
      <p class="lead">
        HIPAA-compliant AI workflows that draft your appointment reminders,
        intake forms, insurance explainers, recall messages, and follow-ups —
        so your staff focuses on patients, not paperwork.
      </p>
      <div class="hero-ctas">
        <a href="contact.html" class="btn btn--primary btn--lg">Book a 20-minute demo</a>
        <a href="services.html" class="btn btn--ghost btn--lg">See how it works</a>
      </div>
      <p class="hero-footer">
        Two deployment options. Azure private tenant or on-premise machine. You pick what fits.
      </p>
    </div>
  </section>

  <!-- STATS ROW (placeholder numbers — swap when pilot data exists) -->
  <section class="section section--alt">
    <div class="container" data-reveal>
      <div class="stats-row">
        <div class="stat">
          <span class="stat__number">5+</span>
          <span class="stat__label">hours / week saved on the front desk</span>
        </div>
        <div class="stat">
          <span class="stat__number">20%+</span>
          <span class="stat__label">lift in recall reactivation</span>
        </div>
        <div class="stat">
          <span class="stat__number">10+</span>
          <span class="stat__label">no-shows recovered per month</span>
        </div>
      </div>
    </div>
  </section>

  <!-- PAIN POINTS -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">The work behind the work</span>
        <h2>Your front desk is doing <em style="font-family:'Fraunces',serif;font-style:italic;font-weight:500;">the wrong work</em>.</h2>
        <p class="lead">Here's what's probably happening in your clinic today.</p>
      </div>
      <ul class="pain-list" data-reveal>
        <li>Your front desk answers 40–50 calls a day — <em>half are just scheduling confirmations.</em></li>
        <li>Paper intake forms get retyped into Dentrix or Compulink — <em>5 minutes per patient, 100+ minutes a day.</em></li>
        <li>10–15% of patients no-show, and <em>reminder calls don't reliably bring them back.</em></li>
        <li>"Is this covered by my insurance?" gets explained verbally, <em>the same way, twenty times a day.</em></li>
        <li>Recall reminders for overdue hygiene and annual exams <em>slip through or never get sent.</em></li>
        <li>Post-visit review requests don't go out. <em>Your Google reviews are stale.</em></li>
      </ul>
    </div>
  </section>

  <!-- TWO DEPLOYMENT OPTIONS -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Deployment</span>
        <h2>Two HIPAA-compliant options. Same workflows.</h2>
        <p class="lead">Pick whichever fits your practice. Both run the same codebase.</p>
      </div>
      <div class="deploy-grid" data-reveal>
        <article class="card">
          <span class="tag">Cloud</span>
          <h3>Private Azure tenant</h3>
          <p>Runs in your own Microsoft Azure tenant under a signed Business Associate Agreement from Microsoft.</p>
          <ul>
            <li>Zero hardware to buy or install</li>
            <li>Signed Microsoft BAA included</li>
            <li>Deploys in hours, not days</li>
            <li>Tenant isolation keeps data inside your environment</li>
            <li>Scales instantly with your practice</li>
          </ul>
        </article>

        <article class="card">
          <span class="tag">On-Premise</span>
          <h3>Dedicated machine in your office</h3>
          <p>A Mac Mini we install in your office. Fully air-gapped — nothing leaves the building.</p>
          <ul>
            <li>No internet dependency for patient data</li>
            <li>No BAA needed — data never leaves the premises</li>
            <li>One-time hardware cost included in setup</li>
            <li>Works during internet outages</li>
            <li>You own the machine outright</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- PULL QUOTE BAND (placeholder principle quote — swap with a real client quote when available) -->
  <section class="pull-quote-band">
    <div class="container" data-reveal>
      <blockquote class="pull-quote">
        <q>Every AI output is a draft a human signs off on. Every time. No exceptions.</q>
        <cite>— The Connate's first principle</cite>
      </blockquote>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">How it works</span>
        <h2>Four steps from first call to running in your practice.</h2>
      </div>
      <div class="process" data-reveal>
        <div class="step">
          <h4>Discovery call</h4>
          <p>A 20-minute walkthrough of your current workflows. No slides. We listen first.</p>
        </div>
        <div class="step">
          <h4>30-day pilot</h4>
          <p>$500 flat fee. We customize 1–2 workflows for your specific practice. No contract.</p>
        </div>
        <div class="step">
          <h4>Training</h4>
          <p>30 minutes with your team. Every AI output is a draft your staff reviews before sending.</p>
        </div>
        <div class="step">
          <h4>Measure &amp; decide</h4>
          <p>At day 30 you see the real numbers. Continue, expand, or walk away with no obligation.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA CLOSER -->
  <section class="cta-closer">
    <div class="container">
      <h2>Ready to see it run on your own workflows?</h2>
      <p>A 20-minute live demo using real scenarios from your practice. Zero pitch, zero commitment.</p>
      <div class="hero-ctas">
        <a href="contact.html" class="btn btn--primary btn--lg">Book a demo</a>
        <a href="services.html" class="btn btn--ghost btn--lg">See the full service</a>
      </div>
    </div>
  </section>

</main>

<!-- SHARED:FOOTER:START -->
<footer class="site-footer">
  <div class="container">
    <div>
      <a href="index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="services.html">Services</a></li>
        <li><a href="services.html#pricing">Pricing</a></li>
        <li><a href="services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>
<!-- SHARED:FOOTER:END -->

<aside class="sticky-cta" aria-hidden="false">
  <a href="contact.html" class="btn btn--primary">Book a 20-minute demo</a>
</aside>

<script src="script.js" defer></script>

</body>
</html>
```

- [ ] **Step 2: Verify the home page in the browser**

Start the dev server (if not already running) and open `http://localhost:8000/`.

Confirm at each viewport width (360, 768, 1280, 1920):

- Hero headline renders in Fraunces (serif), body copy in Inter (sans).
- Eyebrow above hero is small-caps, sage colored, no pill background.
- Primary CTA "Book a 20-minute demo" is clay (orange-red), ghost CTA "See how it works" has ink border.
- Stats row shows three numbers in large Fraunces with labels below.
- Pain points list is left-aligned with em-dash bullets; italicized phrases are in Fraunces italic.
- Two deployment cards sit side by side desktop, stack on mobile, with sage "Cloud" / "On-Premise" tags.
- Sage band with the pull quote spans full width.
- Four numbered steps show oversized clay numerals (01, 02, 03, 04), no circles.
- Dark ink CTA closer at bottom with cream text and a clay button.
- Sticky mobile CTA appears at bottom of viewport on widths ≤ 768px after scrolling past the hero.
- Sticky header turns cream-deep with a hairline once you scroll past 80px.

Behavioral checks:

- Click the mobile nav toggle (≤ 768px): drawer opens, `aria-expanded` is `true`.
- Click any nav link inside the open drawer: drawer closes, `aria-expanded` is `false` (fixes review-report #7).
- Tab through the page with the keyboard: every link and button shows a visible sage focus ring.

System pref check:

- Enable "Reduce motion" in OS settings (or DevTools rendering tab → emulate `prefers-reduced-motion: reduce`). Reload. Confirm reveal animations are instant.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(home): rewrite index.html with editorial layout and proof slots"
```

---

### Task 4: Rewrite `services.html`

**Files:**
- Modify (full rewrite): `services.html`

- [ ] **Step 1: Replace `services.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <!-- SHARED:HEAD-META:START -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Services — The Connate</title>
  <meta name="description" content="AI workflows for dental and eye clinics: appointment reminders, intake extraction, recall reactivation, insurance explainers, post-visit follow-up. Two deployment options. Transparent pricing.">
  <meta name="theme-color" content="#F6F1E8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <meta property="og:title" content="Services — The Connate">
  <meta property="og:description" content="AI workflows for Twin Cities dental and eye clinics. Two deployment options. Transparent pricing.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://theconnate.com/services.html">
  <meta property="og:image" content="https://theconnate.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Services — The Connate">
  <meta name="twitter:description" content="AI workflows for Twin Cities dental and eye clinics. Two deployment options. Transparent pricing.">
  <meta name="twitter:image" content="https://theconnate.com/og-image.png">
  <!-- SHARED:HEAD-META:END -->
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<!-- SHARED:HEADER:START -->
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html" class="active">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>
<!-- SHARED:HEADER:END -->

<main id="main">

  <section class="page-header">
    <div class="container">
      <span class="eyebrow">What we do</span>
      <h1 class="display--l">AI workflows that draft — your staff reviews and sends.</h1>
      <p class="lead">
        The AI never sends anything on its own. Every message, every form extraction, and every draft goes through a human review step before it reaches a patient. That's how we stay HIPAA-compliant and liability-safe.
      </p>
    </div>
  </section>

  <!-- WORKFLOWS — grouped editorial layout -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Workflows</span>
        <h2>Five categories, customized to your practice.</h2>
        <p class="lead">Every workflow is shaped during the pilot — not pulled from a template library.</p>
      </div>

      <div class="deploy-grid" data-reveal>
        <article class="card">
          <span class="tag">Scheduling</span>
          <h3>Appointment reminders</h3>
          <p>Multi-step reminder sequences at 72 hours, 24 hours, and 2 hours before the visit. Patient-specific prep instructions included automatically.</p>
        </article>
        <article class="card">
          <span class="tag">Intake</span>
          <h3>Patient intake extraction</h3>
          <p>Scan or photograph an intake form. Structured data lands in your PMS in seconds. Staff reviews and confirms before it saves.</p>
        </article>
        <article class="card">
          <span class="tag">Recall</span>
          <h3>Recall reactivation</h3>
          <p>Personalized outreach for patients overdue for their 6-month hygiene or annual eye exam. Friendly, specific, never templated.</p>
        </article>
        <article class="card">
          <span class="tag">Insurance</span>
          <h3>Insurance benefit explainer</h3>
          <p>Plain-English summaries of what a patient's plan covers — coverage levels, deductibles, waiting periods — drafted in seconds.</p>
        </article>
        <article class="card">
          <span class="tag">Follow-ups</span>
          <h3>Post-visit follow-up &amp; reviews</h3>
          <p>Personalized aftercare messages, optical-capture reminders for eye clinics, and review request texts after successful visits.</p>
        </article>
        <article class="card">
          <span class="tag">Triage</span>
          <h3>Emergency triage</h3>
          <p>Urgent patient calls classified by priority with a drafted response for your staff to review before it goes out.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- STATS ROW (placeholder numbers) -->
  <section class="section section--alt">
    <div class="container" data-reveal>
      <div class="stats-row">
        <div class="stat">
          <span class="stat__number">5 min</span>
          <span class="stat__label">saved per intake form</span>
        </div>
        <div class="stat">
          <span class="stat__number">40+</span>
          <span class="stat__label">calls / week handled by reminders</span>
        </div>
        <div class="stat">
          <span class="stat__number">0</span>
          <span class="stat__label">messages sent without staff review</span>
        </div>
      </div>
    </div>
  </section>

  <!-- DEPLOYMENT COMPARISON -->
  <section class="section" id="deployment">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Deployment</span>
        <h2>Cloud or on-premise. Same workflows either way.</h2>
        <p class="lead">Both are HIPAA-compliant. Both run the exact same codebase. Pick based on your privacy preference, not on cost.</p>
      </div>
      <div class="compare-wrap" data-reveal>
        <table class="compare">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Cloud (Azure)</th>
              <th>Local (On-Premise)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Where your data lives</td>
              <td>Your private Azure tenant, US region</td>
              <td>Physical Mac Mini in your office</td>
            </tr>
            <tr>
              <td>HIPAA compliance</td>
              <td>Signed Microsoft BAA</td>
              <td>Air-gapped — no internet path for patient data</td>
            </tr>
            <tr>
              <td>Hardware cost</td>
              <td>$0 upfront</td>
              <td>Included in setup fee</td>
            </tr>
            <tr>
              <td>Deploy time</td>
              <td>Hours</td>
              <td>1–2 days (shipping + install)</td>
            </tr>
            <tr>
              <td>Works offline</td>
              <td>No — needs internet</td>
              <td>Yes — fully air-gapped</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Cloud-comfortable practices, multi-location groups</td>
              <td>Privacy-first, zero-trust, or internet-challenged locations</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- PRICING -->
  <section class="section section--alt" id="pricing">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Pricing</span>
        <h2>Transparent. No annual lock-in.</h2>
        <p class="lead">Start with a 30-day pilot. Expand only if the numbers work for you.</p>
      </div>
      <div class="pricing-grid" data-reveal>

        <div class="card price-card">
          <h3>Pilot</h3>
          <div class="price">$500</div>
          <div class="price-sub">One-time · 30 days</div>
          <ul>
            <li>1–2 workflows customized</li>
            <li>Staff training included</li>
            <li>Runs alongside current tools</li>
            <li>No contract, no risk</li>
            <li>You decide at day 30</li>
          </ul>
        </div>

        <div class="card price-card featured">
          <h3>Starter</h3>
          <div class="price">$1,500</div>
          <div class="price-sub">Setup, then $300 / month</div>
          <ul>
            <li>2 workflows</li>
            <li>Hardware or Azure tenant included</li>
            <li>Monthly check-ins</li>
            <li>Prompt tuning as you grow</li>
            <li>Email + phone support</li>
          </ul>
        </div>

        <div class="card price-card">
          <h3>Professional</h3>
          <div class="price">$3,000</div>
          <div class="price-sub">Setup, then $500 / month</div>
          <ul>
            <li>4 or more workflows</li>
            <li>Hardware or Azure tenant included</li>
            <li>Monthly workflow reviews</li>
            <li>Priority support</li>
            <li>Multilingual drafting</li>
          </ul>
        </div>

        <div class="card price-card">
          <h3>Enterprise</h3>
          <div class="price">Custom</div>
          <div class="price-sub">Multi-location &amp; integrations</div>
          <ul>
            <li>All workflows available</li>
            <li>Multi-location deployment</li>
            <li>Custom PMS/EHR integration</li>
            <li>Dedicated account management</li>
            <li>Starting at $5,000 setup + $800 / mo</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Questions</span>
        <h2>What clinics ask before signing.</h2>
      </div>
      <div class="faq" data-reveal>
        <details class="disclosure">
          <summary>Is my data really private?</summary>
          <p>Yes. With the Azure deployment, your data stays inside your own Microsoft tenant under a signed Business Associate Agreement from Microsoft — we never see it. With the on-premise deployment, your data stays inside the physical machine in your office and never touches the internet for patient information.</p>
        </details>
        <details class="disclosure">
          <summary>What if I want to cancel?</summary>
          <p>The pilot is $500 flat for 30 days with no contract. After the pilot, monthly plans are month-to-month. Cancel any time with 30 days' notice. We don't believe in annual lock-in contracts.</p>
        </details>
        <details class="disclosure">
          <summary>Do you integrate with Dentrix, Compulink, or our PMS?</summary>
          <p>Intake extraction lands structured data in the formats your PMS expects. We support Dentrix, Open Dental, Eaglesoft, Compulink, and Crystal PM out of the box. Custom integrations for other systems are part of the Professional and Enterprise tiers.</p>
        </details>
        <details class="disclosure">
          <summary>Who owns the AI outputs?</summary>
          <p>You do. Every draft message, every extracted form, every summary — those belong to your practice. We don't reuse your data to train models. Patient data stays in your environment by design.</p>
        </details>
        <details class="disclosure">
          <summary>What about audit trails?</summary>
          <p>Every AI-drafted output is logged with a timestamp, the staff member who reviewed it, what was edited, and what was sent. Audit trails are exportable as CSV or PDF on demand.</p>
        </details>
        <details class="disclosure">
          <summary>What's the actual difference between Cloud and On-Premise for me?</summary>
          <p>Cloud is faster to deploy (hours, not days), scales instantly, and requires no hardware. On-Premise is fully air-gapped, works during internet outages, and removes the need for a BAA because data never leaves your office. Cost over three years is comparable. Pick based on your privacy preference.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA CLOSER -->
  <section class="cta-closer">
    <div class="container">
      <h2>The 30-day pilot is the best way to see if this fits.</h2>
      <p>$500, no contract, runs alongside whatever you use today. If we can't save you time or recover real revenue in 30 days, you don't continue.</p>
      <div class="hero-ctas">
        <a href="contact.html" class="btn btn--primary btn--lg">Book a demo</a>
      </div>
    </div>
  </section>

</main>

<!-- SHARED:FOOTER:START -->
<footer class="site-footer">
  <div class="container">
    <div>
      <a href="index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="services.html">Services</a></li>
        <li><a href="services.html#pricing">Pricing</a></li>
        <li><a href="services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>
<!-- SHARED:FOOTER:END -->

<aside class="sticky-cta" aria-hidden="false">
  <a href="contact.html" class="btn btn--primary">Book a 20-minute demo</a>
</aside>

<script src="script.js" defer></script>

</body>
</html>
```

- [ ] **Step 2: Verify services.html in the browser**

Visit `http://localhost:8000/services.html`. Confirm at all four viewport widths:

- Page header eyebrow + display + lead render properly.
- Six workflow cards in the grid, each with a sage tag.
- Stats row alternates background and shows three placeholder metrics.
- Comparison table reads cleanly with sage tick marks (none here — just typography), tabular numerals where present, no zebra stripes.
- Pricing grid shows four cards with the "Starter" middle card having the clay "RECOMMENDED" pill.
- FAQ disclosures expand and collapse on click. The `+` icon rotates to `×` (45deg) when open. Native browser behavior; no JS required.
- CTA closer dark ink + clay button at bottom.
- All footer links work, including the new Privacy link (will 404 until Task 7 lands — note in commit).

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "feat(services): rewrite with grouped workflows, FAQ, restyled tables and pricing"
```

---

### Task 5: Rewrite `about.html`

**Files:**
- Modify (full rewrite): `about.html`

- [ ] **Step 1: Replace `about.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <!-- SHARED:HEAD-META:START -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — The Connate</title>
  <meta name="description" content="The Connate is a Minneapolis-based AI workflow automation practice helping independent dental and eye clinics in the Twin Cities automate their admin work.">
  <meta name="theme-color" content="#F6F1E8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <meta property="og:title" content="About — The Connate">
  <meta property="og:description" content="Minneapolis-based AI workflow automation built for independent Twin Cities dental and eye clinics.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://theconnate.com/about.html">
  <meta property="og:image" content="https://theconnate.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About — The Connate">
  <meta name="twitter:description" content="Minneapolis-based AI workflow automation built for independent Twin Cities dental and eye clinics.">
  <meta name="twitter:image" content="https://theconnate.com/og-image.png">
  <!-- SHARED:HEAD-META:END -->
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>

<!-- SHARED:HEADER:START -->
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html" class="active">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>
<!-- SHARED:HEADER:END -->

<main id="main">

  <section class="page-header">
    <div class="container">
      <span class="eyebrow">About</span>
      <h1 class="display--l">Why we exist.</h1>
      <p class="lead">A Minneapolis-based practice focused on the admin work that's eating your front desk's day.</p>
    </div>
  </section>

  <!-- FOUNDER BLOCK (portrait is a placeholder — swap with a real headshot before launch) -->
  <section class="section">
    <div class="container">
      <div class="founder" data-reveal>
        <div class="founder__portrait" aria-hidden="true">
          <!-- Intentionally empty solid-color portrait frame until a real headshot ships. -->
        </div>
        <div class="founder__bio">
          <span class="eyebrow">Founder</span>
          <h2 class="display--m">Building the tool I wanted clinics to have.</h2>
          <p>
            The Connate is a Minnesota LLC run out of the Twin Cities. I'm a software engineer with years of experience building production software for healthcare and enterprise clients — and I started The Connate because I kept watching small clinics get sold rigid, template-based "patient engagement" tools that didn't actually reduce their staff's workload.
          </p>
          <p>
            The best AI tools today can draft real, context-aware messages in seconds — but nobody was packaging them for independent dental and eye practices. The big platforms are either too expensive, too generic, or too tied to cloud vendors the clinic doesn't trust with patient data. The Connate fills that gap: AI workflows shipped for clinics your size, deployed the way you want, and priced so a single recovered no-show covers the monthly fee.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY WE EXIST — editorial prose -->
  <section class="section section--alt">
    <div class="container prose">
      <span class="eyebrow">Why we exist</span>
      <h2 class="display--l">Independent clinics deserve software that fits.</h2>
      <p>
        Independent dental and eye practices spend their days catching what falls through the gaps in their PMS and their phone system. Reminder calls that don't go out. Intake forms that get retyped. Insurance questions answered the same way twenty times a day. None of that work makes the practice better; all of it costs hours.
      </p>
      <p>
        The Connate isn't a "platform." It's a small set of AI workflows shipped one at a time, customized to your practice during a 30-day pilot. Every draft a human reviews. Every output stays inside your environment. The pricing is structured so a single recovered no-show pays the monthly fee.
      </p>
    </div>
  </section>

  <!-- PULL QUOTE -->
  <section class="pull-quote-band">
    <div class="container" data-reveal>
      <blockquote class="pull-quote">
        <q>We don't pitch headcount reduction. Your staff stops retyping forms and starts doing the work that grows the practice.</q>
        <cite>— A working principle, not a slogan</cite>
      </blockquote>
    </div>
  </section>

  <!-- WHAT WE BELIEVE -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Principles</span>
        <h2>What we believe.</h2>
      </div>
      <div class="values-grid" data-reveal>
        <div class="value-card">
          <h4>The AI never sends.</h4>
          <p>Every message, form extraction, and draft goes through a human review before it reaches a patient. That's how we stay HIPAA-safe and liability-safe.</p>
        </div>
        <div class="value-card">
          <h4>You pick how it runs.</h4>
          <p>Some practices want a private Azure tenant with a signed Microsoft BAA. Others want a physical machine in their office, fully air-gapped. Both are HIPAA-compliant. Neither is "the right answer" — you pick what fits.</p>
        </div>
        <div class="value-card">
          <h4>Your team stays.</h4>
          <p>We don't pitch headcount reduction. Your staff stops retyping intake forms and starts doing the work that grows the practice — recall calls, patient relationships, treatment follow-ups.</p>
        </div>
        <div class="value-card">
          <h4>The pilot is the close.</h4>
          <p>We don't sell annual contracts on promises. Every engagement starts with a 30-day pilot at $500. If it doesn't save you time or recover real revenue, you walk away with no obligation.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- WHY THE TWIN CITIES -->
  <section class="section section--alt">
    <div class="container prose">
      <span class="eyebrow">Why the Twin Cities</span>
      <h2 class="display--l">Built for clinics that still know their patients' names.</h2>
      <p>
        Minneapolis and St. Paul have an unusually strong community of independent dental and eye practices that have resisted the pull of DSOs and hospital system acquisition. Those are exactly the practices that benefit most from the right technology — where the owner still makes the decision, where the front desk still knows every patient's name, and where a single staff hire is a real business decision. The Connate is built for those practices specifically.
      </p>
    </div>
  </section>

  <!-- CTA CLOSER -->
  <section class="cta-closer">
    <div class="container">
      <h2>See it live in 20 minutes.</h2>
      <p>Book a time that works for you. Zero prep on your end.</p>
      <div class="hero-ctas">
        <a href="contact.html" class="btn btn--primary btn--lg">Book a demo</a>
      </div>
    </div>
  </section>

</main>

<!-- SHARED:FOOTER:START -->
<footer class="site-footer">
  <div class="container">
    <div>
      <a href="index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="services.html">Services</a></li>
        <li><a href="services.html#pricing">Pricing</a></li>
        <li><a href="services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>
<!-- SHARED:FOOTER:END -->

<aside class="sticky-cta" aria-hidden="false">
  <a href="contact.html" class="btn btn--primary">Book a 20-minute demo</a>
</aside>

<script src="script.js" defer></script>

</body>
</html>
```

- [ ] **Step 2: Verify about.html in the browser**

Visit `http://localhost:8000/about.html`. Confirm:

- Founder block: two columns on desktop (portrait frame left, prose right). On mobile (≤ 768px) it stacks, with the portrait centered and capped at 280px wide.
- The empty portrait frame renders as a soft cream-deep panel — placeholder ready for a real headshot to slot in via `<img>` later.
- The prose `.prose` blocks have a comfortable measure (~36em max-width) and centered alignment.
- Pull-quote band shows the principle quote in Fraunces italic on the sage-soft background.
- Four value cards in a 2×2 grid on desktop, stacked on mobile.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat(about): rewrite with founder block, editorial prose, principle cards"
```

---

### Task 6: Rewrite `contact.html`

**Files:**
- Modify (full rewrite): `contact.html`

- [ ] **Step 1: Replace `contact.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <!-- SHARED:HEAD-META:START -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact — The Connate</title>
  <meta name="description" content="Book a 20-minute demo of The Connate's AI workflows, or reach out by email. Serving dental and eye clinics in the Minneapolis / St. Paul area.">
  <meta name="theme-color" content="#F6F1E8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <meta property="og:title" content="Contact — The Connate">
  <meta property="og:description" content="Book a 20-minute demo or email hello@theconnate.com.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://theconnate.com/contact.html">
  <meta property="og:image" content="https://theconnate.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Contact — The Connate">
  <meta name="twitter:description" content="Book a 20-minute demo or email hello@theconnate.com.">
  <meta name="twitter:image" content="https://theconnate.com/og-image.png">
  <!-- SHARED:HEAD-META:END -->
</head>
<body data-no-sticky-cta>

<a class="skip-link" href="#main">Skip to content</a>

<!-- SHARED:HEADER:START -->
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html" class="active">Contact</a></li>
        <li><a href="#book" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>
<!-- SHARED:HEADER:END -->

<main id="main">

  <section class="page-header">
    <div class="container">
      <span class="eyebrow">Get in touch</span>
      <h1 class="display--l">Let's talk.</h1>
      <p class="lead">The fastest path is the 20-minute demo. No prep on your end — we run it live using real scenarios from your practice.</p>
    </div>
  </section>

  <section class="section" id="book">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-methods">
          <div class="method">
            <span class="eyebrow">Email</span>
            <h3>Direct line</h3>
            <p>For questions, pilot agreements, or referrals.</p>
            <p><a href="mailto:hello@theconnate.com">hello@theconnate.com</a></p>
          </div>
          <div class="method">
            <span class="eyebrow">Demo scheduler</span>
            <h3>Book a 20-minute walkthrough</h3>
            <p>Live demo on your own patient scenarios. Zero pitch, zero commitment.</p>
            <p><a href="https://calendly.com/theconnate/demo" target="_blank" rel="noopener noreferrer">Open Calendly in a new tab &rarr;</a></p>
          </div>
          <div class="method">
            <span class="eyebrow">Service area</span>
            <h3>Twin Cities + remote pilots</h3>
            <p>
              Based in Minneapolis, serving independent dental and eye clinics across the Twin Cities metro including Minneapolis, St. Paul, Edina, Eden Prairie, Minnetonka, Bloomington, Roseville, Maplewood, and Woodbury. For practices outside the metro, we run the pilot remotely.
            </p>
          </div>
        </div>

        <div class="contact-embed">
          <!-- Calendly inline widget — the URL is a placeholder until a real Calendly event is created. -->
          <div class="calendly-inline-widget"
               data-url="https://calendly.com/theconnate/demo"></div>
          <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          <noscript>
            <p>JavaScript is required to show the scheduler. Email <a href="mailto:hello@theconnate.com">hello@theconnate.com</a> to book directly.</p>
          </noscript>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT TO EXPECT -->
  <section class="section section--alt">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">What to expect</span>
        <h2>Three steps, no pitch.</h2>
      </div>
      <ol class="expect-list" data-reveal>
        <li>
          <div>
            <strong>We listen.</strong>
            <p>The 20-minute call is us asking questions about how your front desk actually spends its day. No slides, no demo unless you ask.</p>
          </div>
        </li>
        <li>
          <div>
            <strong>We sketch a pilot.</strong>
            <p>If there's a fit, we propose one or two workflows specific to your practice for the $500 pilot.</p>
          </div>
        </li>
        <li>
          <div>
            <strong>Day 30, you decide.</strong>
            <p>You see real numbers from your pilot. Continue, expand, or walk away. No obligation.</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- CTA CLOSER (slim variant — Contact's whole purpose is the CTA) -->
  <section class="cta-closer cta-closer--slim">
    <div class="container">
      <p>Or just email <a href="mailto:hello@theconnate.com" style="color: var(--cream); border-bottom: 1px solid currentColor;">hello@theconnate.com</a>.</p>
    </div>
  </section>

</main>

<!-- SHARED:FOOTER:START -->
<footer class="site-footer">
  <div class="container">
    <div>
      <a href="index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="services.html">Services</a></li>
        <li><a href="services.html#pricing">Pricing</a></li>
        <li><a href="services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>
<!-- SHARED:FOOTER:END -->

<script src="script.js" defer></script>

</body>
</html>
```

- [ ] **Step 2: Verify contact.html in the browser**

Visit `http://localhost:8000/contact.html`. Confirm:

- Two-column layout: contact methods on the left (email, demo scheduler link, service area), Calendly embed on the right inside a paper-colored card frame.
- On mobile, the two columns stack with contact methods first.
- The "Open Calendly in a new tab" link has `target="_blank"` and `rel="noopener noreferrer"` (inspect in DevTools — fixes review-report #6).
- The Calendly widget area may show a network error in the browser console because the placeholder URL doesn't resolve. That is expected and documented; it disappears once a real Calendly event exists (Phase 3 external blocker).
- "What to expect" list shows three steps with oversized clay numerals.
- Slim CTA closer at bottom with the "email us" line on ink background.
- `<body data-no-sticky-cta>` — sticky CTA does NOT appear on this page even on mobile. Verify by scrolling on a 360px viewport: no sticky bar at the bottom.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat(contact): rewrite with two-column layout, what-to-expect list, slim closer"
```

---

### Task 7: Create `privacy.html`

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Create `privacy.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <!-- SHARED:HEAD-META:START -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Privacy — The Connate</title>
  <meta name="description" content="What this site collects, what happens when you book a demo, and how PHI is handled. A privacy statement for The Connate's marketing site.">
  <meta name="theme-color" content="#F6F1E8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <meta property="og:title" content="Privacy — The Connate">
  <meta property="og:description" content="What this marketing site collects (nothing), what happens when you book a demo, and how PHI is handled.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://theconnate.com/privacy.html">
  <meta property="og:image" content="https://theconnate.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Privacy — The Connate">
  <meta name="twitter:description" content="What this marketing site collects (nothing), what happens when you book a demo, and how PHI is handled.">
  <meta name="twitter:image" content="https://theconnate.com/og-image.png">
  <!-- SHARED:HEAD-META:END -->
</head>
<body data-no-sticky-cta>

<a class="skip-link" href="#main">Skip to content</a>

<!-- SHARED:HEADER:START -->
<header class="site-header">
  <div class="container">
    <a href="index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="contact.html" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>
<!-- SHARED:HEADER:END -->

<main id="main">

  <section class="page-header">
    <div class="container">
      <span class="eyebrow">Privacy</span>
      <h1 class="display--l">Privacy.</h1>
      <p class="lead">What this site collects, what happens when you book a demo, and how patient data is handled.</p>
    </div>
  </section>

  <section class="section">
    <div class="container prose">
      <p class="caption" style="margin-bottom: var(--space-md);">
        Draft — review with counsel before publish. Last updated 2026-05-10.
      </p>

      <h2>What this site collects</h2>
      <p>
        Nothing. This website does not run analytics, set tracking cookies, or load tracking pixels. The only third-party request a typical page makes is to Google Fonts to render Inter and Fraunces. We have not placed any tracking script on these pages by design — it would add load time and create a cookie-consent burden we do not need for a small marketing site.
      </p>

      <h2>What happens when you book a demo</h2>
      <p>
        The scheduler embedded on our <a href="contact.html">Contact page</a> is operated by Calendly. When you select a time, your name, email address, and any optional notes you provide go to Calendly directly, not to us. Calendly forwards the meeting details so we can show up. Calendly's own privacy practices govern what they do with that information. We use the data only to run the demo you booked.
      </p>

      <h2>What happens when you email us</h2>
      <p>
        Emails sent to <a href="mailto:hello@theconnate.com">hello@theconnate.com</a> are read by The Connate. We keep them for as long as the conversation is active, plus what we need for reasonable business record-keeping. We do not share email addresses with third parties. We do not add you to a mailing list without explicit permission.
      </p>

      <h2>HIPAA and patient data</h2>
      <p>
        This website is a marketing front door. It does not process protected health information (PHI). When a clinic engages with The Connate as a client, PHI handling is governed by the deployment-specific agreement: a signed Business Associate Agreement (BAA) covers the private Azure tenant option; the on-premise option keeps PHI inside the clinic's physical premises and never transmits it over the public internet. The privacy posture of the actual product is described in the engagement contract — not on this page.
      </p>

      <h2>Updates and contact</h2>
      <p>
        If we change this page, we will update the "Last updated" date at the top. For questions, email <a href="mailto:hello@theconnate.com">hello@theconnate.com</a>.
      </p>
    </div>
  </section>

</main>

<!-- SHARED:FOOTER:START -->
<footer class="site-footer">
  <div class="container">
    <div>
      <a href="index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="services.html">Services</a></li>
        <li><a href="services.html#pricing">Pricing</a></li>
        <li><a href="services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>
<!-- SHARED:FOOTER:END -->

<script src="script.js" defer></script>

</body>
</html>
```

- [ ] **Step 2: Verify privacy.html in the browser**

Visit `http://localhost:8000/privacy.html`. Confirm:

- Page header eyebrow + display + lead render normally.
- "Draft — review with counsel before publish" caption appears before the first section.
- Prose has a comfortable measure (~36em) and centered alignment.
- All five sections present (collects nothing / demo / email / HIPAA scope / updates) with `<h2>` headings in Fraunces.
- Footer Privacy link now resolves correctly from any page.
- `data-no-sticky-cta` on body → sticky CTA hidden on mobile.

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "feat(privacy): add privacy page with draft copy for counsel review"
```

---

### Task 8: Update `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` with the complete file below**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README to reflect new pages, script.js, SHARED: convention"
```

---

### Task 9: Phase 1 pre-merge verification pass

**Files:** none (verification only).

- [ ] **Step 1: Start the local server (if not already running)**

```bash
cd theconnate-site
python3 -m http.server 8000
```

- [ ] **Step 2: Visual pass across all 5 pages at all 4 widths**

For each URL below, test at viewport widths 360, 768, 1280, 1920:

- `http://localhost:8000/index.html`
- `http://localhost:8000/services.html`
- `http://localhost:8000/about.html`
- `http://localhost:8000/contact.html`
- `http://localhost:8000/privacy.html`

Confirm at each width:

- No horizontal scroll on any page.
- Header is sticky and transitions to cream-deep with a hairline after 80px scroll.
- All headings render in Fraunces (serif), all body in Inter (sans).
- Cream background, no white anywhere except inside the dark `cta-closer` (cream text on ink).
- Clay (orange-red) appears only on the primary CTA buttons and the "RECOMMENDED" pricing pill.
- Sage appears on eyebrows, links, tags, tick marks in deploy/pricing lists.
- All four nav items in the header bar resolve correctly to their pages.
- Mobile drawer (≤ 768px): opens on toggle click, closes when any link is clicked.
- Sticky mobile CTA appears on Home/Services/About but NOT on Contact/Privacy.

- [ ] **Step 3: Keyboard tab order**

On each page, tab through with the keyboard from the top. Confirm:

- Skip link is the first focusable element and works (jumps to `#main`).
- Tab order is logical: nav → main content → footer.
- Every focusable element shows the sage focus ring.

- [ ] **Step 4: Reduced motion**

Toggle "Reduce motion" in OS preferences (macOS: System Settings → Accessibility → Display → Reduce motion). Or use DevTools rendering tab → "Emulate CSS media feature prefers-reduced-motion: reduce".

Reload each page. Confirm:

- `[data-reveal]` elements appear immediately (no fade/translate animation).
- Buttons and disclosures still respond, but with instant transitions.
- Scroll behavior is not smooth — it jumps directly to targets.

- [ ] **Step 5: Console check**

Open DevTools Console on each page. Confirm:

- No CSS parse errors.
- No JS errors.
- Calendly may log a network warning on `contact.html` (placeholder URL doesn't resolve) — this is expected and is fixed externally in Phase 3.

- [ ] **Step 6: Review-report sweep**

Confirm each of the following review-report findings is now closed:

- #5 — Open Graph tags present on all 5 pages (inspect each `<head>`).
- #6 — `rel="noopener noreferrer"` on the Calendly `target="_blank"` link in `contact.html`.
- #7 — Mobile nav drawer closes when a link is clicked (already verified Step 2).

- [ ] **Step 7: Commit any verification follow-up tweaks**

If verification surfaces a bug, fix it, run verification again, then commit:

```bash
git add <changed-files>
git commit -m "fix: <what was broken>"
```

If nothing needs fixing, skip this step.

---

### Task 10: Merge Phase 1 to `main`

**Files:** none.

- [ ] **Step 1: Confirm the branch is ready**

```bash
git log --oneline main..HEAD
git status
```

Expected: a clean working tree on `redesign/phase-1-editorial`, with a series of `feat:` / `docs:` commits ahead of `main`.

- [ ] **Step 2: Switch to `main` and merge**

```bash
git checkout main
git merge --no-ff redesign/phase-1-editorial -m "merge: editorial redesign phase 1"
```

`--no-ff` keeps the phase boundary visible in `git log`.

- [ ] **Step 3: Push to `main`**

```bash
git push origin main
```

GitHub Pages will rebuild and redeploy within a minute. Visit `https://theconnate.com` (or the GitHub Pages preview URL) to confirm the live site matches local.

- [ ] **Step 4: Delete the merged branch (local + remote, if it was pushed)**

```bash
git branch -d redesign/phase-1-editorial
git push origin --delete redesign/phase-1-editorial  # only if it was pushed earlier
```

---

## Phase 2 — Assets & polish

### Task 11: Create the Phase 2 branch and add `favicon.svg`

**Files:**
- Create: `favicon.svg`

- [ ] **Step 1: Branch from `main`**

```bash
git checkout main
git pull
git checkout -b redesign/phase-2-polish
```

- [ ] **Step 2: Create `favicon.svg`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#F6F1E8"/>
  <path d="M22.5 11.25 Q20 8.5 16 8.5 Q10 8.5 10 16 Q10 23.5 16 23.5 Q20 23.5 22.5 20.75"
        fill="none" stroke="#C0532A" stroke-width="3" stroke-linecap="round"/>
</svg>
```

This is a stylized "C" monogram — clay open-curve stroke on a cream rounded square.

- [ ] **Step 3: Verify by opening directly**

Open `http://localhost:8000/favicon.svg` in the browser. Confirm a clay "C" on a cream rounded square renders correctly.

- [ ] **Step 4: Commit**

```bash
git add favicon.svg
git commit -m "feat(favicon): add SVG monogram"
```

---

### Task 12: Generate `favicon.png` and `apple-touch-icon.png`

**Files:**
- Create: `favicon.png` (32×32)
- Create: `apple-touch-icon.png` (180×180)

These are rasterized PNGs derived from `favicon.svg`.

- [ ] **Step 1: Rasterize the SVG to PNG**

Pick whichever tool is available locally:

**Option A — `rsvg-convert` (Homebrew: `brew install librsvg`)**

```bash
rsvg-convert -w 32  -h 32  favicon.svg -o favicon.png
rsvg-convert -w 180 -h 180 favicon.svg -o apple-touch-icon.png
```

**Option B — `sips` (built into macOS, but it does not handle SVG → PNG directly).** Convert to PDF first, then PDF to PNG:

```bash
# Skip Option B unless A is unavailable; PDF round-tripping is lossy.
```

**Option C — Manual export**

Open `favicon.svg` in any vector tool (Figma, Sketch, Inkscape), export as 32×32 PNG and 180×180 PNG.

- [ ] **Step 2: Verify both files render correctly**

```bash
ls -la favicon.png apple-touch-icon.png
# both files should exist and be > 100 bytes
```

Open each in a browser at `http://localhost:8000/favicon.png` and `http://localhost:8000/apple-touch-icon.png`. Confirm the clay "C" monogram renders crisply at each size.

- [ ] **Step 3: Commit**

```bash
git add favicon.png apple-touch-icon.png
git commit -m "feat(favicon): add PNG fallback and apple-touch-icon"
```

---

### Task 13: Create `og-image.png`

**Files:**
- Create: `og-image.svg` (source — keep in repo so the PNG can be regenerated)
- Create: `og-image.png` (1200×630)

- [ ] **Step 1: Create `og-image.svg`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#F6F1E8"/>

  <!-- top hairline -->
  <line x1="80" y1="100" x2="1120" y2="100" stroke="rgba(31,41,55,0.10)" stroke-width="1"/>

  <!-- eyebrow -->
  <text x="80" y="80" font-family="Inter, system-ui, sans-serif"
        font-size="22" font-weight="600" fill="#5A7A66"
        letter-spacing="3">FOR DENTAL &amp; EYE CLINICS · TWIN CITIES</text>

  <!-- monogram block -->
  <rect x="80" y="180" width="64" height="64" rx="12" fill="#C0532A"/>

  <!-- wordmark -->
  <text x="80" y="380" font-family="Fraunces, Georgia, serif"
        font-size="110" font-weight="500" fill="#0F2A44"
        letter-spacing="-3">The Connate</text>

  <!-- tagline -->
  <text x="80" y="450" font-family="Inter, system-ui, sans-serif"
        font-size="34" font-weight="400" fill="#3A4A5C">
    HIPAA-compliant AI workflows for independent clinics.
  </text>

  <!-- bottom anchor -->
  <text x="80" y="570" font-family="Inter, system-ui, sans-serif"
        font-size="22" font-weight="500" fill="#6B7787">theconnate.com</text>
</svg>
```

- [ ] **Step 2: Rasterize to PNG**

```bash
rsvg-convert -w 1200 -h 630 og-image.svg -o og-image.png
```

(Or use the manual-export route from Task 12 Step 1 — Figma/Sketch/Inkscape.)

- [ ] **Step 3: Verify**

Open `http://localhost:8000/og-image.png`. Confirm:

- 1200×630 cream background.
- Sage eyebrow at top in letter-tracked caps.
- Clay square mark above the wordmark.
- "The Connate" wordmark in large Fraunces 500, ink color.
- Tagline below in Inter, ink-soft.
- `theconnate.com` at the bottom in muted ink.

Note: If Fraunces or Inter are not installed as system fonts where the rasterizer runs, the PNG will render with fallback fonts. Either install the fonts locally before rasterizing, or use a tool that supports web-font embedding (Figma export works without local fonts).

- [ ] **Step 4: Commit**

```bash
git add og-image.svg og-image.png
git commit -m "feat(og): add 1200×630 OG image with editorial wordmark"
```

---

### Task 14: Wire favicon + apple-touch-icon links into all 6 HTML files

**Files:**
- Modify: `index.html`, `services.html`, `about.html`, `contact.html`, `privacy.html` (will add `404.html` in next task)

The OG image references already exist in every page (set up in Phase 1). This task only adds the favicon refs.

- [ ] **Step 1: Add the favicon block to each HTML `<head>`**

In each of the 5 existing HTML files, find the line:

```html
<link rel="stylesheet" href="style.css">
```

and insert these lines IMMEDIATELY BEFORE it:

```html
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
```

Repeat in `index.html`, `services.html`, `about.html`, `contact.html`, `privacy.html`.

- [ ] **Step 2: Verify**

Reload each page in the browser. Confirm:

- The browser tab shows the clay "C" monogram favicon, not a generic globe icon.
- DevTools Network tab shows successful 200 requests for `favicon.svg` (modern browsers will use this); `favicon.png` may be requested as a fallback. Neither should 404.

- [ ] **Step 3: Commit**

```bash
git add index.html services.html about.html contact.html privacy.html
git commit -m "feat: wire favicon and apple-touch-icon into all pages"
```

---

### Task 15: Create `404.html`

**Files:**
- Create: `404.html`

GitHub Pages automatically serves `/404.html` for any unknown path. This file must live at the repo root with that exact name.

- [ ] **Step 1: Create `404.html` with the complete file below**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Not found — The Connate</title>
  <meta name="description" content="The page you were looking for has moved or never existed.">
  <meta name="theme-color" content="#F6F1E8">
  <meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="icon" href="favicon.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <link rel="stylesheet" href="style.css">
</head>
<body data-no-sticky-cta>

<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container">
    <a href="/index.html" class="logo">The Connate</a>
    <nav class="main-nav" aria-label="Main">
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul>
        <li><a href="/index.html">Home</a></li>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/contact.html" class="btn btn--primary">Book a demo</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <section class="hero">
    <div class="container">
      <span class="eyebrow">404</span>
      <h1 class="display--xl">Page not found.</h1>
      <p class="lead">
        The page you were looking for has moved or never existed. Try the home page,
        or book a demo if you got here from a cold email.
      </p>
      <div class="hero-ctas">
        <a href="/index.html" class="btn btn--ghost btn--lg">Go home</a>
        <a href="/contact.html" class="btn btn--primary btn--lg">Book a demo</a>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div>
      <a href="/index.html" class="logo">The Connate</a>
      <p class="tagline">
        HIPAA-compliant AI workflow automation for independent clinics
        in Minneapolis and St. Paul.
      </p>
    </div>
    <div>
      <h4>Product</h4>
      <ul>
        <li><a href="/services.html">Services</a></li>
        <li><a href="/services.html#pricing">Pricing</a></li>
        <li><a href="/services.html#deployment">Deployment</a></li>
      </ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="/about.html">About</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Legal</h4>
      <ul>
        <li><a href="/privacy.html">Privacy</a></li>
      </ul>
    </div>
    <p class="copyright">
      &copy; 2026 The Connate LLC. Minneapolis, Minnesota.
    </p>
  </div>
</footer>

<script src="/script.js" defer></script>

</body>
</html>
```

Note: links use absolute paths (`/index.html`) because GitHub Pages serves `404.html` from arbitrary unknown URLs, where relative links would break.

- [ ] **Step 2: Verify locally**

Visit any nonexistent URL on the local server: `http://localhost:8000/this-page-does-not-exist`.

The local Python server will respond with its own 404 page (not yours). To preview the 404 page, visit it directly: `http://localhost:8000/404.html`. Confirm:

- 404 page uses the same header, footer, hero blueprint as the rest of the site.
- "Page not found." renders in Fraunces.
- "Go home" (ghost) and "Book a demo" (clay primary) buttons.

GitHub Pages will use this 404 automatically once deployed.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "feat: add 404 page with editorial layout"
```

---

### Task 16: Contrast audit for sage/cream pairs

**Files:** potentially `style.css` (only if contrast fails).

The spec calls out one specific risk: `--sage` (#5A7A66) on `--cream` (#F6F1E8) may not pass WCAG-AA contrast for body-sized text.

- [ ] **Step 1: Check sage on cream**

Open <https://webaim.org/resources/contrastchecker/> in your browser. Enter:

- Foreground: `#5A7A66`
- Background: `#F6F1E8`

Read the result.

| Result | Action |
|---|---|
| ≥ 4.5:1 (passes AA normal text) | No change needed. Sage is safe for body and small text. Skip Step 2, go to Step 3. |
| 3.0–4.5:1 (passes AA large text only) | Acceptable for eyebrows, headings, and large links. Body text and small links must use `--ink-soft` instead. Confirm the CSS already does this (it does — body styles use `--ink-soft`). Skip Step 2, go to Step 3. |
| < 3.0:1 | Fail. Bump the sage value darker (see Step 2). |

- [ ] **Step 2: (Only if sage fails) Darken `--sage`**

Open `style.css` and find:

```css
  --sage:       #5A7A66;
```

Replace with a darker value:

```css
  --sage:       #4A6855;
```

Re-check `#4A6855` on `#F6F1E8` in the contrast checker. Iterate to find the first value passing 4.5:1.

If sage is changed, also check `--sage` on `--sage-soft` (#D8E1D8) — this pair is used inside the pull-quote band and tag chips. It needs to pass 3:1 for non-body text.

- [ ] **Step 3: Check sage-soft / pull-quote contrast**

Open the contrast checker again:

- Foreground: `--ink` (#0F2A44)
- Background: `--sage-soft` (#D8E1D8)

This pair is used for the pull-quote text inside the sage band. Must pass ≥ 4.5:1 for the pull-quote text size. Confirm.

- [ ] **Step 4: Spot-check ink-soft on cream**

- Foreground: `#3A4A5C`
- Background: `#F6F1E8`

Confirm ≥ 4.5:1 for body text.

- [ ] **Step 5: Commit any color adjustments**

If Step 2 changed sage, commit:

```bash
git add style.css
git commit -m "fix(a11y): darken sage to meet WCAG-AA contrast on cream"
```

If no changes were needed, skip the commit.

---

### Task 17: Cross-browser pass

**Files:** none (verification + possible bug fixes).

- [ ] **Step 1: Test in Safari (macOS)**

Open `http://localhost:8000/` in Safari. Click through all 5 pages + 404. Confirm:

- Fonts load (Inter + Fraunces).
- Sticky header transitions correctly on scroll.
- Mobile nav drawer (via Responsive Design Mode at 360px) opens and closes correctly.
- `<details>` FAQ disclosures expand/collapse.
- Calendly widget loads on `contact.html` (URL may still 404 — that's external).
- No layout breaks.

- [ ] **Step 2: Test in Safari (iOS Simulator or real device)**

If you have Xcode or a real iPhone, open the site in mobile Safari. Confirm:

- Sticky CTA appears at the bottom of viewport after hero scroll, on Home/Services/About.
- Tapping the sticky CTA navigates to Contact.
- Mobile nav works.
- No double-tap zoom on buttons.

- [ ] **Step 3: Test in Firefox**

Open in Firefox. Confirm all the same checks as Step 1. Pay attention to:

- `backdrop-filter` on the sticky header (not used in this build — header uses solid background after scroll, so this is moot).
- `<details>` summary chevron — Firefox renders the marker differently. Confirm our CSS hides it (`::-webkit-details-marker { display: none; }` plus `summary { list-style: none; }`).

- [ ] **Step 4: Test in Chrome**

Open in Chrome. All checks from Step 1.

- [ ] **Step 5: Fix and commit any browser-specific bugs**

If a browser shows a visible regression, fix it minimally (prefer CSS over vendor prefixes when possible), then commit:

```bash
git add <files>
git commit -m "fix: <browser>-specific <issue>"
```

If nothing is broken across all browsers, no commit needed.

---

### Task 18: Final README pass

**Files:**
- Modify: `README.md`

After Phase 2 is fully built, the README needs one last update to reflect the new assets.

- [ ] **Step 1: Open `README.md` and find the Pages table**

The current table lists 5 HTML files + style.css + script.js + CNAME. Update it to include the new assets.

Find:

```markdown
| `CNAME` | Custom domain file for GitHub Pages (`theconnate.com`) |
```

Replace that line with:

```markdown
| `404.html` | Custom 404 page served by GitHub Pages for unknown paths |
| `favicon.svg` | Vector monogram favicon (modern browsers) |
| `favicon.png` | 32×32 PNG fallback favicon |
| `apple-touch-icon.png` | 180×180 iOS home-screen icon |
| `og-image.svg` / `og-image.png` | 1200×630 social-share preview image (SVG source + rasterized PNG) |
| `CNAME` | Custom domain file for GitHub Pages (`theconnate.com`) |
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document phase 2 assets in README"
```

---

### Task 19: Merge Phase 2 to `main`

**Files:** none.

- [ ] **Step 1: Confirm Phase 2 branch is clean and ahead of main**

```bash
git log --oneline main..HEAD
git status
```

- [ ] **Step 2: Switch to main and merge**

```bash
git checkout main
git merge --no-ff redesign/phase-2-polish -m "merge: editorial redesign phase 2 (assets + polish)"
```

- [ ] **Step 3: Push**

```bash
git push origin main
```

GitHub Pages will rebuild. Within a minute, `https://theconnate.com/favicon.svg` should resolve to the clay "C", `https://theconnate.com/og-image.png` should render, and `https://theconnate.com/this-page-does-not-exist` should render the new 404.

- [ ] **Step 4: Delete the merged branch**

```bash
git branch -d redesign/phase-2-polish
git push origin --delete redesign/phase-2-polish  # only if it was pushed earlier
```

---

## Out-of-band work (Phase 3 — external blockers, not Claude work)

Tracked here for completeness; the implementation plan above does not execute these. None block the redesign merge.

1. **Create the real Calendly event** at `calendly.com/theconnate/demo` (or update both occurrences in `contact.html` to match a different URL).
2. **Counsel review of `privacy.html`**. Once approved, remove the "Draft — review with counsel before publish" caption.
3. **Verify the Twin Cities clinic count** if any specific number is added back into About. Currently the prose avoids quoting a specific number.
4. **Swap proof-slot placeholders** with real data as it lands:
   - `index.html` stats row (3 numbers)
   - `services.html` stats row (3 numbers)
   - `index.html` pull quote — replace with a real client quote + attribution
   - `about.html` founder portrait — add `<img>` inside `.founder__portrait`

---

## Self-review

Cross-check against spec sections to confirm coverage.

| Spec section | Implementation task(s) |
|---|---|
| §2.1 Color tokens | Task 1 |
| §2.2 Type system | Task 1 + font links in every HTML head (Tasks 3–7) |
| §2.3 Spacing | Task 1 |
| §2.4 Radius / rules / shadows | Task 1 |
| §2.5 Motion | Task 1 + Task 2 (scroll reveal) + reduced-motion rule in Task 1 |
| §3.1 Atoms | Task 1 (CSS) |
| §3.2 Section blueprints | Task 1 (CSS) + Tasks 3–7 (used in HTML) |
| §4.1 Home IA | Task 3 |
| §4.2 Services IA | Task 4 |
| §4.3 About IA | Task 5 |
| §4.4 Contact IA | Task 6 |
| §4.5 Privacy page | Task 7 |
| §5 File structure | All tasks; `SHARED:*` markers in HTML tasks; README in Task 8 |
| §5.2 `script.js` capabilities | Task 2 |
| §5.3 Per-page `<head>` template | Tasks 3–7 (consistent meta block in each) + Task 14 (favicon refs) |
| §5.4 External link policy | Task 6 (Calendly link with `noopener noreferrer`) |
| §6 Accessibility | Task 1 (`:focus-visible`, skip-link); Task 2 (reduced-motion handling); Tasks 3–7 (heading order, alt text on portrait, `aria-expanded`); Task 16 (contrast audit) |
| §7 Phase 1 verification | Task 9 |
| §7 Phase 2 assets | Tasks 11–15 |
| §7 Phase 2 contrast audit | Task 16 |
| §7 Phase 2 cross-browser | Task 17 |
| §8 Open items | Listed in "Out-of-band work" above + flagged in README Task 8 + commit message on Task 6 |
| §9 Out of scope | Honored — no analytics, no build step, no FAQ page, no blog |
| §10 Success criteria | Verified via Task 9 |

No gaps.
