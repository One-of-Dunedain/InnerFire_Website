# TASK-051: Security Headers — Cloudflare Pages `_headers` file

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none (can run in parallel with TASK-048/049)

## Context

The site is hosted on Cloudflare Pages. Cloudflare Pages supports a `_headers` file in the project root that applies HTTP response headers to all pages. Without security headers, the site is vulnerable to clickjacking, MIME sniffing attacks, and lacks transport security guarantees.

**This task creates 1 file.**

## File Operations

| Action | File |
|--------|------|
| CREATE | `_headers` |

No existing files are modified. Safe for parallel execution.

## Implementation

Create `_headers` in the project root with:

```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()
  X-XSS-Protection: 0
  Cross-Origin-Opener-Policy: same-origin

/privacy.html
  X-Robots-Tag: noindex
```

### Header explanations

| Header | Value | Why |
|--------|-------|-----|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing — browser trusts declared Content-Type |
| `X-Frame-Options` | `DENY` | Prevents clickjacking — site cannot be embedded in iframes |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends origin only to cross-origin requests, full URL to same-origin |
| `Permissions-Policy` | deny all sensitive APIs | Site doesn't use camera/mic/geo/payment — block them explicitly |
| `X-XSS-Protection` | `0` | Disable legacy XSS filter (causes more issues than it solves; CSP replaces it) |
| `Cross-Origin-Opener-Policy` | `same-origin` | Prevents cross-origin window references (Spectre mitigation) |
| `X-Robots-Tag: noindex` | on privacy.html only | Reinforces `<meta name="robots" content="noindex">` at HTTP level |

### What about CSP and HSTS?

**CSP (Content-Security-Policy)** — created in TASK-052 as a separate task because it requires careful allowlisting of all external domains (Kit, GA4, Clarity, Google Fonts, etc.) and testing.

**HSTS (Strict-Transport-Security)** — Cloudflare handles HSTS at the edge via dashboard settings (SSL/TLS → Edge Certificates → Always Use HTTPS + HSTS). It's better to enable it in Cloudflare dashboard than in `_headers` because:
- Cloudflare can add it to the HSTS preload list
- Dashboard gives granular control (max-age, includeSubDomains, preload)
- Avoids accidental lockout from misconfigured header

**User action:** Enable HSTS in Cloudflare dashboard:
1. SSL/TLS → Edge Certificates
2. Enable "Always Use HTTPS"
3. Enable HSTS → max-age=31536000, includeSubDomains, preload

## Do NOT

- Add CSP header here (that's TASK-052)
- Add HSTS in `_headers` (use Cloudflare dashboard)
- Add `Access-Control-Allow-Origin` (CORS is only for the Worker API in TASK-049)
- Modify any HTML files

## Acceptance Criteria

- [ ] `_headers` file exists in project root
- [ ] All pages return `X-Content-Type-Options: nosniff`
- [ ] All pages return `X-Frame-Options: DENY`
- [ ] All pages return `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] All pages return `Permissions-Policy` blocking unused APIs
- [ ] `/privacy.html` returns `X-Robots-Tag: noindex`
- [ ] User has enabled HSTS in Cloudflare dashboard

## Verification

After deploying to Cloudflare Pages:
```bash
curl -I https://innerfire.app/ | grep -iE "(x-content|x-frame|referrer|permissions|x-xss|cross-origin)"
curl -I https://innerfire.app/privacy.html | grep -i "x-robots"
```

Or use securityheaders.com → enter `https://innerfire.app` → expect A or A+ grade.

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
