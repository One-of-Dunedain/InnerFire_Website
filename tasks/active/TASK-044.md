# TASK-044: Privacy Policy + Cookie Policy page

Status: TODO
Priority: Critical
Owner: Executor AI
Depends on: none

## Context

InnerFire collects personal data (email + first name via Kit) and plans to use analytics (GA4 + Microsoft Clarity). Before enabling analytics or going to production, a Privacy Policy page is legally required under GDPR (EU/UK), CalOPPA (California), and CCPA.

This task creates the privacy page with all required disclosures. The consent mechanism (TASK-045) will link to this page.

**Approach: minimal compliance** — the user wants compliance only where absolutely necessary. No overcomplicated legal jargon. Plain language, specific to what InnerFire actually does.

**This task creates 1 new file and modifies 1 existing file.**

## File Operations

| Action | File |
|--------|------|
| CREATE | `privacy.html` |
| MODIFY | Footer on ALL pages — add "Privacy" link |

Since footer modification touches multiple HTML files, budget exception is justified (cross-cutting concern).

## Privacy Page Structure

Create `privacy.html` in the project root (same level as `index.html`).

### Head

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#0a0d12" />
<meta name="author" content="Marian Kushnir" />
<title>Privacy Policy - InnerFire</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
<meta name="description" content="InnerFire privacy policy. How we handle your data, cookies, and analytics." />
<meta name="robots" content="noindex" />
<link rel="stylesheet" href="./styles.css" />
<link rel="canonical" href="https://innerfire.app/privacy.html" />
```

Note: `noindex` — privacy pages should not appear in search results.

### Page Layout

Use the same layout as other pages: site header, content, footer. Content should use `.article-container` class for consistent max-width and readability.

```html
<body>
  <!-- Ambient embers (same as other pages) -->
  <div class="ambient-embers" aria-hidden="true">
    <!-- 20 ambient-ember spans -->
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <a href="./index.html" class="header-logo">InnerFire</a>
      <nav class="header-nav">
        <a href="./blog.html">Blog</a>
        <a href="./index.html#signup" class="btn-header">Get Early Access</a>
      </nav>
    </div>
  </header>

  <section class="page-header" style="padding: 100px 0 40px;">
    <div class="container">
      <h1>Privacy Policy</h1>
      <p>Last updated: March 3, 2026</p>
    </div>
  </section>

  <article class="article">
    <div class="container article-container">
      <div class="article-body">
        <!-- CONTENT BELOW -->
      </div>
    </div>
  </article>

  <footer>
    <!-- Full footer with social links + Privacy link -->
  </footer>
</body>
```

## Privacy Policy Content

The content below is the FULL text. Place it inside `<div class="article-body">`.

---

**H2: Who We Are**

InnerFire is a mobile breathing app built by Marian Kushnir, an independent developer based in Ukraine. This website (innerfire.app) collects early access signups and provides articles about breathing and stress management.

Contact email for privacy questions: **marian@innerfire.app**

_(If this email doesn't exist yet, use a placeholder and update when ready. Format: `<a href="mailto:marian@innerfire.app">marian@innerfire.app</a>`)_

---

**H2: What We Collect**

**H3: When you sign up for early access**

We collect your **email address** and **first name** through our signup forms. This data is sent to and stored by **Kit** (formerly ConvertKit), our email service provider.

We use this information to:
- Send you a beta invite when InnerFire launches on TestFlight
- Send occasional updates about the app (no more than 1-2 emails per month)

We do not sell, rent, or share your email address or name with any third party other than Kit.

**H3: When you browse this website (with your consent)**

If you accept analytics cookies, we collect anonymous browsing data through:

- **Google Analytics 4** — pages visited, time on page, general location (country level), device type, browser type
- **Microsoft Clarity** — session recordings, heatmaps, click patterns, scroll depth

This data helps us understand how visitors use the site and improve the experience. It does not include your name, email, or any personally identifiable information.

**Analytics are only loaded after you give consent.** If you decline cookies, no analytics data is collected.

**H3: What we do NOT collect**

- Payment information (we have no paid features on the website)
- Precise location or GPS data
- Data from children under 16
- Social media profiles or login data

---

**H2: Cookies**

**H3: Essential cookies**

We do not use essential cookies. The site functions without any cookies.

**H3: Analytics cookies (consent required)**

These cookies are only set if you click "Accept" on the cookie banner:

_Use an HTML table:_

| Cookie | Service | Purpose | Duration |
|--------|---------|---------|----------|
| `_ga` | Google Analytics 4 | Distinguishes users | 2 years |
| `_ga_*` | Google Analytics 4 | Maintains session state | 2 years |
| `_clck` | Microsoft Clarity | Connects sessions | 1 year |
| `_clsk` | Microsoft Clarity | Connects pageviews in a session | 1 day |

**H3: Managing cookies**

You can change your cookie preferences at any time by clicking "Cookie Settings" in the footer of any page. You can also clear cookies through your browser settings.

---

**H2: Third-Party Services**

We use the following services, each with their own privacy policies:

_Use an HTML table:_

| Service | What it does | Privacy Policy |
|---------|-------------|----------------|
| Kit (ConvertKit) | Stores email signups, sends emails | [kit.com/privacy](https://kit.com/privacy) |
| Google Analytics 4 | Anonymous website analytics | [Google Privacy Policy](https://policies.google.com/privacy) |
| Microsoft Clarity | Session recordings and heatmaps | [Microsoft Privacy Statement](https://privacy.microsoft.com/privacystatement) |
| GitHub Pages | Hosts the website | [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) |

_(Update the hosting provider if not GitHub Pages.)_

---

**H2: Your Rights**

**H3: Everyone**

- **Unsubscribe** from emails at any time using the link at the bottom of every email
- **Opt out of analytics** via the cookie banner or "Cookie Settings" in the footer
- **Request deletion** of your data by emailing marian@innerfire.app

**H3: EU and UK residents (GDPR)**

Under the General Data Protection Regulation, you have the right to:
- Access your personal data
- Rectify inaccurate data
- Erase your data ("right to be forgotten")
- Restrict or object to processing
- Data portability

To exercise these rights, email marian@innerfire.app. We will respond within 30 days.

Legal basis for processing:
- Email signup: consent (you submitted the form)
- Analytics: consent (you accepted cookies)

**H3: California residents (CCPA)**

Under the California Consumer Privacy Act, you have the right to:
- Know what personal information we collect
- Request deletion of your personal information
- Opt out of the sale of personal information (we do not sell your data)

To exercise these rights, email marian@innerfire.app.

---

**H2: Data Retention**

- **Email and name**: stored in Kit until you unsubscribe or request deletion
- **Analytics data**: retained per Google's and Microsoft's default retention policies (Google: 14 months, Microsoft Clarity: 30 days for recordings)

---

**H2: Security**

We use HTTPS for all connections. Form data is transmitted directly to Kit's servers over encrypted connections. We do not store personal data on our own servers.

---

**H2: Children**

InnerFire is not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with their data, please contact us and we will delete it.

---

**H2: Changes to This Policy**

We may update this policy from time to time. Changes will be posted on this page with an updated "Last updated" date. We will not reduce your rights under this policy without your consent.

---

## Footer Modification

Add a "Privacy" link to the footer on ALL pages. Place it after social links, before the credit line.

**Current footer pattern (all pages):**
```html
<footer>
  <div class="container">
    <p class="footer-follow">Follow the build:</p>
    <div class="social-links">
      <a href="#" class="social-link" target="_blank" rel="noopener">TikTok</a>
      <a href="https://x.com/kushnir_marian_" class="social-link" target="_blank" rel="noopener">X</a>
      <a href="https://discord.gg/PRuveBJH" class="social-link" target="_blank" rel="noopener">Discord</a>
    </div>
    <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
  </div>
</footer>
```

**Updated footer (add Privacy link + Cookie Settings placeholder):**
```html
<footer>
  <div class="container">
    <p class="footer-follow">Follow the build:</p>
    <div class="social-links">
      <a href="#" class="social-link" target="_blank" rel="noopener">TikTok</a>
      <a href="https://x.com/kushnir_marian_" class="social-link" target="_blank" rel="noopener">X</a>
      <a href="https://discord.gg/PRuveBJH" class="social-link" target="_blank" rel="noopener">Discord</a>
    </div>
    <div class="footer-legal">
      <a href="./privacy.html">Privacy</a>
      <span class="footer-legal-sep">·</span>
      <a href="#" id="cookie-settings-link">Cookie Settings</a>
    </div>
    <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
  </div>
</footer>
```

For blog article pages, use `../privacy.html` instead of `./privacy.html`.

**CSS for footer-legal (add to styles.css):**

```css
.footer-legal {
  margin-top: 12px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.8rem;
}
.footer-legal a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-legal a:hover {
  color: var(--text);
}
.footer-legal-sep {
  color: rgba(255, 255, 255, 0.15);
}
```

### Pages to update footer

1. `index.html` — `./privacy.html`
2. `blog.html` — `./privacy.html`
3. `blog/best-breathwork-apps.html` — `../privacy.html`
4. `blog/vagus-nerve-breathing.html` — `../privacy.html`
5. `blog/build-breathing-habit.html` — `../privacy.html`
6. `blog/breathing-under-noise.html` — `../privacy.html`

Note: `breathing-under-noise.html` currently has a simplified footer. If TASK-043 has already run (adds full footer), just add the legal links. If not, add both the full footer AND legal links.

The `#cookie-settings-link` will be wired up by TASK-045 (consent mechanism). For now it's a placeholder `href="#"` — clicking it does nothing until TASK-045 adds the JS handler.

## Do NOT

- Add complex legal language — keep everything in plain, readable English
- Add cookie consent mechanism (that's TASK-045)
- Modify any article body content
- Add analytics scripts
- Include legal jargon or disclaimers beyond what's specified above

## Acceptance Criteria

- [ ] `privacy.html` exists and renders correctly at 375px, 768px, 1920px
- [ ] Page has proper site header with nav (Blog + Get Early Access)
- [ ] Content is readable and well-formatted using existing article-body styles
- [ ] Tables render correctly (cookies table, third-party services table)
- [ ] All external links in tables open in new tab
- [ ] Page has `noindex` meta tag
- [ ] Footer on ALL 6+ pages has "Privacy" and "Cookie Settings" links
- [ ] Privacy links use correct relative paths (./privacy.html or ../privacy.html)
- [ ] Footer CSS added to styles.css (.footer-legal styles)
- [ ] No console errors on any page

## Verification

1. Open `privacy.html` — renders with dark theme, readable text
2. Mobile 375px — text wraps properly, tables scroll horizontally if needed
3. Navigate from index.html footer "Privacy" link → opens privacy.html
4. Navigate from blog article footer "Privacy" link → opens privacy.html
5. "Cookie Settings" link exists but doesn't do anything yet (placeholder for TASK-045)
6. Check all 6 pages have the footer updated

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
