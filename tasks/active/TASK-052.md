# TASK-052: Content Security Policy (CSP) — allowlist for InnerFire stack

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-045 (DONE), TASK-049 (counter Worker URL known), TASK-051 (DONE)

## Context

CSP is the most impactful security header. It controls exactly which domains can load scripts, styles, images, and make connections. Without CSP, any XSS vulnerability can load arbitrary scripts.

This task adds a CSP header to the `_headers` file created in TASK-051. It MUST be done after TASK-045 (consent.js) and TASK-049 (Worker URL) so we know all external domains the site uses.

**This task modifies 1 file.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `_headers` — append CSP header |

## External domains inventory

Before writing CSP, audit all external requests the site makes:

| Domain | Purpose | Directive |
|--------|---------|-----------|
| `self` | Own HTML/CSS/JS/images | all directives |
| `app.kit.com` | Form submission | `form-action`, `connect-src` |
| `*.kit.com` | Kit preconnect | `connect-src` |
| `www.googletagmanager.com` | GA4 gtag.js loader | `script-src` |
| `www.google-analytics.com` | GA4 data collection | `connect-src` |
| `*.google-analytics.com` | GA4 beacons | `connect-src`, `img-src` |
| `*.analytics.google.com` | GA4 measurement protocol | `connect-src` |
| `clarity.ms` | Clarity script | `script-src`, `connect-src` |
| `*.clarity.ms` | Clarity data | `connect-src`, `img-src` |
| `fonts.googleapis.com` | Google Fonts CSS (if used) | `style-src` |
| `fonts.gstatic.com` | Google Fonts files (if used) | `font-src` |
| `[worker-subdomain].workers.dev` | Waitlist counter API | `connect-src` |

### Step 1: Verify actual domains

Before writing CSP, open the site in Chrome, accept cookies, browse all pages, and check Network tab for all unique domains. Update the table above if any domain is missing.

### Step 2: Check for inline scripts/styles

Search all HTML files for:
- `<script>` without `src=` → inline script (needs `'unsafe-inline'` or nonce)
- `<style>` without external ref → inline style
- `onclick=`, `onload=`, etc. → inline event handlers
- `style="..."` → inline styles

**If inline scripts exist:**
- Prefer moving them to external files
- If not possible, use CSP nonce: `'nonce-{random}'` (requires server-side generation — complex on static site)
- Last resort: `'unsafe-inline'` for that directive only (document why)

**If inline styles exist (likely):**
- `style=` attributes on elements are very common in HTML
- Use `'unsafe-inline'` for `style-src` (acceptable tradeoff — inline styles are low risk)

### Step 3: Write CSP header

Append to `_headers`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' www.googletagmanager.com clarity.ms; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: *.google-analytics.com *.clarity.ms; connect-src 'self' app.kit.com *.kit.com www.google-analytics.com *.analytics.google.com *.clarity.ms [WORKER_URL]; form-action 'self' app.kit.com; frame-ancestors 'none'; base-uri 'self'; upgrade-insecure-requests
```

**Important:** Replace `[WORKER_URL]` with actual Worker domain from TASK-049.

### CSP directive breakdown

| Directive | Value | Rationale |
|-----------|-------|-----------|
| `default-src` | `'self'` | Block everything not explicitly allowed |
| `script-src` | `'self' www.googletagmanager.com clarity.ms` | Only our JS + GA4 + Clarity |
| `style-src` | `'self' 'unsafe-inline' fonts.googleapis.com` | Our CSS + inline styles + Fonts |
| `font-src` | `'self' fonts.gstatic.com` | Self-hosted + Google Fonts files |
| `img-src` | `'self' data: *.google-analytics.com *.clarity.ms` | Our images + analytics pixels |
| `connect-src` | `'self' app.kit.com *.kit.com *.google-analytics.com *.analytics.google.com *.clarity.ms [WORKER]` | All API/XHR targets |
| `form-action` | `'self' app.kit.com` | Forms can only POST to self or Kit |
| `frame-ancestors` | `'none'` | Same as X-Frame-Options: DENY |
| `base-uri` | `'self'` | Prevents `<base>` tag injection |
| `upgrade-insecure-requests` | (flag) | Auto-upgrade HTTP to HTTPS |

### What about `'unsafe-inline'` for scripts?

If the site has inline `<script>` blocks (e.g., Schema.org JSON-LD, inline event handlers):
- JSON-LD (`<script type="application/ld+json">`) is NOT executed as JS → CSP `script-src` doesn't block it
- If there are inline JS event handlers → move them to script.js
- If consent.js uses `document.write` or eval → refactor (it shouldn't)

**Goal: NO `'unsafe-inline'` in `script-src`.** If we must, document why.

## Testing strategy

### 1. CSP Report-Only mode (first deploy)

Start with `Content-Security-Policy-Report-Only` instead of `Content-Security-Policy`:
```
Content-Security-Policy-Report-Only: [same policy]
```

This logs violations in DevTools console without blocking anything. Browse entire site and check for violations.

### 2. Fix violations

For each violation:
- Missing domain → add to allowlist
- Inline script → move to external file or add nonce
- Inline style → already allowed via `'unsafe-inline'` in `style-src`

### 3. Switch to enforcing mode

Once zero violations in Report-Only mode, switch to:
```
Content-Security-Policy: [same policy]
```

## Do NOT

- Use `'unsafe-eval'` (no eval needed on this site)
- Use `'unsafe-inline'` in `script-src` without documenting why
- Use `*` wildcards for domains (defeats the purpose)
- Block Google Fonts if the site uses them (check first)
- Deploy enforcing CSP without testing in Report-Only mode first

## Acceptance Criteria

- [ ] CSP header present in `_headers`
- [ ] All pages load without CSP violations in DevTools console
- [ ] Forms submit successfully (Kit not blocked)
- [ ] Analytics load after consent (GA4/Clarity not blocked)
- [ ] Waitlist counter loads (Worker API not blocked)
- [ ] Google Fonts load (if used)
- [ ] No `'unsafe-eval'` anywhere in CSP
- [ ] `'unsafe-inline'` only in `style-src` (not `script-src`)
- [ ] securityheaders.com shows A or A+ grade

## Verification

1. Deploy with `Content-Security-Policy-Report-Only` → browse all pages → check console
2. Fix any violations
3. Switch to `Content-Security-Policy` → browse all pages → everything works
4. Run securityheaders.com scan → A or A+
5. Submit form → Kit receives data
6. Accept consent → GA4 + Clarity load

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
