# TASK-050: Production QA — full site checklist before launch

Status: TODO
Priority: Critical
Owner: Executor AI + User (manual browser testing)
Depends on: TASK-045 (DONE), TASK-046 (DONE), TASK-047 (DONE), TASK-048 (DONE), TASK-049 (DONE)

## Context

Final quality gate before the site goes live on Cloudflare Pages. This is a comprehensive checklist covering every page at every breakpoint, all functionality, SEO, accessibility, performance, and security.

**This task modifies 0 files** (QA only). If issues are found, they become new tasks or inline fixes.

## QA Scope

### Pages to test

| # | Page | URL |
|---|------|-----|
| 1 | Landing page | `index.html` |
| 2 | Blog index | `blog.html` |
| 3 | Best Breathwork Apps | `blog/best-breathwork-apps.html` |
| 4 | Vagus Nerve Breathing | `blog/vagus-nerve-breathing.html` |
| 5 | Build Breathing Habit | `blog/build-breathing-habit.html` |
| 6 | Privacy Policy | `privacy.html` |

### Breakpoints to test

| Breakpoint | Width | Device reference |
|------------|-------|-----------------|
| Mobile S | 375px | iPhone SE / iPhone 12 Mini |
| Mobile L | 428px | iPhone 14 Pro Max |
| Tablet | 768px | iPad Mini |
| Desktop | 1440px | Standard laptop |
| Wide | 1920px | Full HD monitor |

---

## Checklist

### 1. Visual / Layout (every page × every breakpoint)

- [ ] No horizontal scroll on any page at any width
- [ ] No text overflow or truncation
- [ ] All images/SVGs load (no broken icons)
- [ ] Ambient embers render and animate (not frozen)
- [ ] Section transitions are smooth (no hard background breaks)
- [ ] Footer is at the bottom of every page
- [ ] Header nav links work (Blog, Get Early Access)
- [ ] Header logo links to index.html

### 2. Forms (every page with a form)

- [ ] First name + email fields visible and labeled
- [ ] Submit button clickable and styled
- [ ] Empty submission → browser validation error
- [ ] Valid submission → Kit receives data (check Kit dashboard)
- [ ] Honeypot field invisible (not visible on any device)
- [ ] Anti-spam: instant submission blocked (< 2 seconds)
- [ ] Form on mobile: inputs full width, easy to tap

### 3. Consent + Analytics

- [ ] First visit (incognito): consent banner slides up
- [ ] Banner text readable, Privacy Policy link works
- [ ] "Accept" → banner hides, GA4 + Clarity load (check Network tab)
- [ ] "Decline" → banner hides, NO analytics network requests
- [ ] Return visit (accepted): no banner, analytics load silently
- [ ] Return visit (declined): no banner, no analytics
- [ ] "Cookie Settings" footer link → clears choice, shows banner again
- [ ] Mobile 375px: banner stacks vertically, buttons tappable
- [ ] Custom events fire (scroll_depth, share_click, cta_click, form_submit)

### 4. Blog index

- [ ] All article cards render with correct titles, excerpts, dates
- [ ] Thumbnails load for all cards
- [ ] Clicking card → opens correct article
- [ ] Mobile 375px: featured card (newest) has full thumbnail, others are compact rows
- [ ] Category badges display correctly
- [ ] Share buttons on cards work (native share or clipboard)

### 5. Article pages

- [ ] Article content renders fully (no cut-off)
- [ ] Sticky ToC works on desktop (scrolls with user)
- [ ] Back-to-top button appears on scroll
- [ ] Mobile: app cards collapse/expand correctly (best-breathwork-apps)
- [ ] Mobile: filter chips work (best-breathwork-apps)
- [ ] Article CTA form visible and functional
- [ ] Author section displays
- [ ] Schema.org JSON-LD present in source (validate with Google Rich Results Test)
- [ ] Canonical URL correct
- [ ] Reading progress bar works (if present)

### 6. Landing page specific

- [ ] Hero fire animation plays (pulsing glow + floating embers)
- [ ] Video carousel: horizontal swipe on mobile, scroll on desktop
- [ ] Carousel cards display environment names + icons
- [ ] Benefits section: items expand on click/tap
- [ ] Waitlist counter loads and displays "X / 300"
- [ ] Signup form submits to Kit successfully
- [ ] Share functionality works

### 7. Privacy page specific

- [ ] Content readable at all breakpoints
- [ ] Cookie table renders correctly
- [ ] Third-party services table with working external links
- [ ] All external links open in new tab
- [ ] `noindex` meta tag present
- [ ] No signup form on privacy page

### 8. SEO

- [ ] Every page has unique `<title>` tag
- [ ] Every page has `<meta name="description">` (except privacy: noindex)
- [ ] Every page has `<link rel="canonical">`
- [ ] OG tags present on public pages (og:title, og:description, og:type)
- [ ] Schema.org JSON-LD on all article pages
- [ ] `robots.txt` exists and allows crawling (except privacy.html)
- [ ] `sitemap.xml` exists with all public URLs
- [ ] No duplicate `<title>` or `<meta description>` across pages

### 9. Performance (Lighthouse)

Run Lighthouse on each page (mobile mode):

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| index.html | ≥ 90 | ≥ 90 | ≥ 90 | ≥ 90 |
| blog.html | ≥ 90 | ≥ 90 | ≥ 90 | ≥ 90 |
| Articles | ≥ 85 | ≥ 90 | ≥ 90 | ≥ 90 |
| privacy.html | ≥ 95 | ≥ 95 | ≥ 90 | ≥ 90 |

Target: all green (≥ 90). Articles may be lower due to long content.

### 10. Accessibility

- [ ] All images have `alt` text (or `aria-hidden` if decorative)
- [ ] Color contrast ratio ≥ 4.5:1 for body text
- [ ] Focus indicators visible on interactive elements
- [ ] Keyboard navigation works (Tab through page)
- [ ] Screen reader: page structure makes sense (headings, landmarks)
- [ ] Consent banner has `role="dialog"` and `aria-label`
- [ ] No autoplay audio/video

### 11. Security

- [ ] No inline event handlers (`onclick=`, `onload=`)
- [ ] No hardcoded secrets in source code
- [ ] External links have `rel="noopener"` (or `rel="noopener noreferrer"`)
- [ ] Forms POST to HTTPS endpoints only
- [ ] No mixed content warnings (HTTP resources on HTTPS page)
- [ ] Cookie consent: no analytics before user consent

### 12. Cross-browser (optional but recommended)

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, if available)
- [ ] Edge (latest)
- [ ] iOS Safari (real device or BrowserStack)
- [ ] Android Chrome (real device or BrowserStack)

### 13. Cloudflare Pages deployment

- [ ] Site builds and deploys to Cloudflare Pages
- [ ] Custom domain `innerfire.app` configured
- [ ] HTTPS certificate active
- [ ] `www.innerfire.app` redirects to `innerfire.app` (or vice versa)
- [ ] 404 page works (navigate to non-existent URL)
- [ ] All page URLs work without `.html` extension (if configured)
- [ ] Cache headers appropriate (static assets cached, HTML fresh)

---

## Issue tracking

If issues are found during QA, document them as:

```
### Issue #N: [short description]
- Page: [which page]
- Breakpoint: [which width]
- Severity: Critical / High / Medium / Low
- Screenshot: [if applicable]
- Fix: [inline fix or new task reference]
```

**Critical** = blocks launch (broken forms, missing pages, security)
**High** = should fix before launch (layout bugs, broken features)
**Medium** = can ship, fix soon (minor visual issues)
**Low** = nice to have (polish)

## Do NOT

- Skip any page or breakpoint
- Auto-fix issues without documenting them first
- Mark QA as passed if any Critical or High issues remain open
- Test only on desktop (mobile is primary target audience)

## Acceptance Criteria

- [ ] All pages tested at all breakpoints
- [ ] Zero Critical issues
- [ ] Zero High issues (or explicitly deferred with justification)
- [ ] Lighthouse scores meet targets
- [ ] Forms submit successfully to Kit
- [ ] Analytics consent flow works end-to-end
- [ ] Waitlist counter displays correctly
- [ ] Deployed to Cloudflare Pages and accessible via custom domain

## Reporting
- Update TASKS.md status to DONE
- Append full QA report to REPORT.md (including Lighthouse scores, issues found, and resolution status)
