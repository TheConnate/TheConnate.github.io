# Review Report — theconnate-site (READ-ONLY)

**Date:** 2026-05-03
**Repo state at review:** dirty (uncommitted changes present — review covers both committed code and pending diff)

## Project summary

A 4-page static marketing website for "The Connate," a Minneapolis-based AI workflow automation service targeting HIPAA-regulated dental and eye clinics. Stack is plain HTML + CSS with vanilla JS for the mobile nav toggle. Deployed via GitHub Pages at `theconnate.com`. No build step, no npm, no framework.

## Pending uncommitted work (observed)

The initial commit message notes that contact info (`(612) 555-1234`, `calendly.com/theconnate/demo`, `hello@theconnate.com`) are placeholders. The uncommitted diff likely involves replacing some or all of these with real values — the contact page already has `hello@theconnate.com` present while the phone number referenced in the README is absent from all HTML footers, suggesting it was removed or never added.

## Findings

### Critical

**1. Placeholder Calendly URL is live and will silently fail for real visitors**
- **Severity:** Critical
- **Category:** Bug
- **Location:** `contact.html:55`, `contact.html:79`
- **Description:** Both the link `href="https://calendly.com/theconnate/demo"` and the inline widget `data-url="https://calendly.com/theconnate/demo"` point to a placeholder Calendly event URL. If this URL does not exist on the real Calendly account (which it won't until created), clicking "Book a demo" and the embedded calendar will both fail — the primary conversion point of the entire site is broken. The README explicitly flags this as a placeholder.
- **Suggested fix:** Create the actual Calendly event at `calendly.com/theconnate/demo` or update both occurrences to the real event URL before publishing any outbound links to the site.
- **Confidence:** High

### High

**2. README documents phone number in footers that does not exist in any HTML file**
- **Severity:** High
- **Category:** Docs / Quality
- **Location:** `README.md:106` vs. `index.html`, `services.html`, `about.html`, `contact.html` (footers)
- **Description:** `README.md` line 106 instructs editors to "search `(612) 555-1234`... Located in `contact.html` and in footers across all 4 pages." No such phone number appears anywhere in any of the 4 HTML files. The contact page also has no phone contact card. This creates two problems: (a) a prospect cannot call the business, (b) anyone following the README's editing instructions will search for a string that does not exist and may incorrectly assume phone contact was intentionally omitted.
- **Suggested fix:** Either add a real phone number to `contact.html` and all four footers, or remove the phone references from README.md to match reality.
- **Confidence:** High

**3. No privacy policy or terms of service page — significant for HIPAA-adjacent positioning**
- **Severity:** High
- **Category:** Security / Compliance
- **Location:** All four HTML pages (footer section)
- **Description:** The site prominently claims "HIPAA-compliant" multiple times. The README itself cautions against Google Analytics specifically because of "compliance overhead" and a need for a "documented privacy policy." However, no privacy policy page exists and no privacy policy link appears in any footer or page. For a service being sold to healthcare practices on HIPAA grounds, the absence of any privacy statement on the vendor's own website is a trust and legal credibility gap — prospective clients in regulated industries will notice.
- **Suggested fix:** Add a minimal `privacy.html` documenting what data the marketing site itself collects (none, per the README's no-analytics stance), and link it in all four footers.
- **Confidence:** High

**4. External Calendly script loaded without Subresource Integrity (SRI)**
- **Severity:** High
- **Category:** Security
- **Location:** `contact.html:82`
- **Description:** `<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>` loads a third-party JavaScript file with no `integrity` attribute. If Calendly's CDN is ever compromised, a malicious script would execute in the context of `theconnate.com` with no browser-side defense. For a site that positions itself around healthcare data trustworthiness, this is worth noting. The Calendly widget runs in an iframe so it has some isolation, but the loader script itself runs on the page origin.
- **Suggested fix:** Add an `integrity="sha384-..."` SRI hash to the script tag, or acknowledge this as an accepted risk given Calendly's CDN is not easily hashable (they may rotate assets). At minimum, add a `Content-Security-Policy` meta tag limiting `script-src` to known origins.
- **Confidence:** High

### Medium

**5. Open Graph tags only on `index.html`; missing from `services.html`, `about.html`, `contact.html`**
- **Severity:** Medium
- **Category:** Quality
- **Location:** `services.html` head, `about.html` head, `contact.html` head
- **Description:** `index.html` has `og:title`, `og:description`, `og:type`, and `og:url` meta tags. The other three pages have none. When any of these pages are shared on LinkedIn or other platforms (relevant for B2B outreach), the preview will display no title, no description, and no image — a poor first impression for a professional services site.
- **Suggested fix:** Add page-specific Open Graph tags to `services.html`, `about.html`, and `contact.html`. Also add `og:image` (a minimum 1200×630 branded image) to all four pages — `index.html` is missing `og:image` as well.
- **Confidence:** High

**6. `target="_blank"` link missing `noreferrer` (only has `noopener`)**
- **Severity:** Medium
- **Category:** Security
- **Location:** `contact.html:55`
- **Description:** `<a href="https://calendly.com/theconnate/demo" target="_blank" rel="noopener">` uses `rel="noopener"` but omits `noreferrer`. `noopener` prevents the opened tab from accessing `window.opener` (the main security concern). `noreferrer` additionally prevents the Referer header from being sent to Calendly and implies `noopener`. Best practice is `rel="noopener noreferrer"` for all `target="_blank"` external links.
- **Suggested fix:** Change `rel="noopener"` to `rel="noopener noreferrer"` on `contact.html:55`.
- **Confidence:** High

**7. Mobile nav toggle does not close when a nav link is clicked**
- **Severity:** Medium
- **Category:** Bug
- **Location:** `index.html:189–198`, same pattern in `services.html:260–268`, `about.html:151–159`, `contact.html:152–160`
- **Description:** The mobile nav opens when the toggle button is clicked, but there is no handler to close it when the user taps a nav link. On mobile, tapping "Services" opens the page but the nav remains `open` when navigating back. More critically, on a single-page smooth-scroll scenario (e.g., `#book` anchor in contact.html), the menu stays open after the user taps the anchor link, obscuring content.
- **Suggested fix:** Add a click listener to each nav link that removes the `open` class from the menu and sets `aria-expanded` back to `false`.
- **Confidence:** High

### Low

**8. `favicon` is missing — browser will make a failing request**
- **Severity:** Low
- **Category:** Quality
- **Location:** All four HTML pages (`<head>`)
- **Description:** No `<link rel="icon">` tag exists on any page. Every page load will generate a 404 request to `theconnate.com/favicon.ico` in the browser. This is a console noise issue and a minor professionalism signal.
- **Suggested fix:** Add a favicon (even a simple 32×32 PNG or SVG) and reference it with `<link rel="icon" href="/favicon.png">` in all four `<head>` sections.
- **Confidence:** High

**9. `comparison-table` has `border-radius` but `overflow: hidden` may clip focus ring**
- **Severity:** Low
- **Category:** Accessibility
- **Location:** `style.css:563–570`
- **Description:** `.comparison-table { border-radius: var(--radius); overflow: hidden; }` clips any `:focus-visible` outline on table cells or links within the table. If keyboard users tab to interactive elements inside the table in future, the focus indicator could be clipped at the table boundary.
- **Suggested fix:** If the table will never contain interactive elements this is not critical. If links are added inside, switch to `border-radius` on the container div only and remove `overflow: hidden` from the table itself.
- **Confidence:** Medium

## Notes

- The site is well-structured for a pure static marketing site. Accessibility foundations are solid: `skip-link`, `aria-label` on nav, `aria-expanded` on the toggle button (using `setAttribute` which correctly stringifies the boolean to `"true"`/`"false"`), `prefers-reduced-motion` media query, and `lang="en"` on all pages.
- The inline `style` attributes (e.g., `style="color: #fff;"` on footer logos) are minor but inconsistent with the CSS variable system in use. Not a bug, just a quality note.
- No secrets, API keys, or hardcoded credentials were found anywhere in the codebase.
- No JavaScript dependencies or npm packages — no supply chain risk beyond the Calendly script tag.
- The `hello@theconnate.com` email address appears real (not flagged as placeholder in the commit message), so the email contact method should work once DNS resolves.

## Summary

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High | 3 |
| Medium | 3 |
| Low | 2 |

**Top 3 most important:**
1. (Critical) Placeholder Calendly URL breaks the primary conversion CTA for real visitors — `contact.html:55,79`
2. (High) No privacy policy on a HIPAA-positioned site is a trust and compliance credibility gap — all pages
3. (High) Phone number referenced in README does not exist in any HTML file; README editing instructions are incorrect — `README.md:106`
