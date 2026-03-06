# TASK-057: Cloudflare Pages deployment setup

## Recovery (read after context compaction)
You are executing TASK-057 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: TODO
Priority: Critical
Owner: Executor AI + Human (Cloudflare dashboard steps)
Depends on: TASK-055 (DONE), TASK-056 (DONE)

## Context

The site is ready to deploy. This task covers the Cloudflare Pages setup and the post-deployment verification checklist. The site is a static HTML/CSS/JS site — no build step needed.

**This task creates 0 new files. It's a deployment + verification task.**

## File Operations

| Action | File |
|--------|------|
| — | No files modified |

## Cloudflare Pages Setup (Human + Executor guide)

### Step 1: Connect GitHub repo to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select your account
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
4. Select GitHub → authorize → select repository `InnerFire_Website`
5. Configuration:
   - **Project name:** `innerfire`
   - **Production branch:** `main`
   - **Build command:** (leave EMPTY — no build step)
   - **Build output directory:** `/` (root — serve everything)
6. Click **Save and Deploy**

### Step 2: Custom domain

1. After first deploy succeeds, go to project **Custom domains**
2. Add `innerfire.app`
3. Add `www.innerfire.app` (redirect to apex)
4. Cloudflare will auto-configure DNS if domain is on Cloudflare DNS
5. Wait for SSL certificate (usually 1-5 minutes)

### Step 3: Enable HSTS

1. Go to **SSL/TLS** → **Edge Certificates**
2. Enable **Always Use HTTPS**
3. Enable **HSTS**:
   - Max-Age: 12 months (31536000)
   - Include subdomains: Yes
   - Preload: Yes
4. Enable **Automatic HTTPS Rewrites**

### Step 4: Configure caching

1. Go to **Caching** → **Configuration**
2. Caching Level: Standard
3. Browser Cache TTL: Respect Existing Headers
4. Always Online: On

### Step 5: Exclude unnecessary files from deployment

Create `.cfignore` in project root (if it doesn't exist) to exclude files that shouldn't be deployed:

```
# AI orchestration files
docs/
tasks/
TASKS.md
REPORT.md
PROJECT_STATE.md
CLAUDE.md
REPORTING_FORMAT.md

# Development artifacts
tmp*
nul
*.ps1
*.jsonl
.claude/

# Templates (not public pages)
blog/_template.html
blog/_listicle-template.html

# Worker source (deployed separately)
workers/
wrangler.toml

# Git
.git/
.gitignore

# Image artifacts
hero-proportion-check*.png
embers-index-mid.png
tmp-*.png
```

**Note:** If `.cfignore` doesn't work (Cloudflare Pages may not support it), use the Cloudflare Pages build output directory setting to serve from a subfolder. But for a static site with no build step, root `/` is simplest — the extra files just won't be linked from anywhere and are harmless.

## Post-Deployment Verification

After the site is live at `https://innerfire.app`:

### Quick smoke test (5 minutes)

1. **Homepage loads:** `https://innerfire.app/` → see hero, fire animation, carousel
2. **Blog loads:** `https://innerfire.app/blog.html` → see 3 article cards
3. **Article loads:** `https://innerfire.app/blog/best-breathwork-apps.html` → full article
4. **Privacy loads:** `https://innerfire.app/privacy.html` → policy text
5. **HTTPS works:** no mixed content warnings, padlock in browser
6. **No 404s:** all pages accessible

### Forms test

7. Open `https://innerfire.app/` → fill in name + email → submit
8. Check Kit dashboard → subscriber appears
9. Repeat on blog article CTA

### Consent flow

10. Open in incognito → consent banner appears
11. Click "Accept" → check Network tab → GA4 + Clarity requests fire
12. Close incognito, open new → click "Decline" → no analytics requests

### Social sharing preview

13. Go to [opengraph.xyz](https://opengraph.xyz) or Twitter Card Validator
14. Enter `https://innerfire.app/` → should show og-image with InnerFire branding
15. Enter `https://innerfire.app/blog/best-breathwork-apps.html` → should show article preview

### Security headers

16. Go to [securityheaders.com](https://securityheaders.com) → enter `https://innerfire.app`
17. Should show grade A or higher

### Mobile check

18. Open `https://innerfire.app/` on phone (or DevTools 375px)
19. Scroll through entire page — no horizontal overflow
20. Forms are usable (tap inputs, submit)

## Do NOT

- Modify any source code files
- Set up Cloudflare Workers (that's TASK-049, separate)
- Change DNS settings for other domains
- Enable Cloudflare WAF rules (not needed for static site yet)

## Acceptance Criteria

- [ ] Site deploys successfully to Cloudflare Pages
- [ ] `https://innerfire.app` loads the homepage
- [ ] `https://innerfire.app/blog.html` loads the blog
- [ ] `https://innerfire.app/privacy.html` loads privacy policy
- [ ] All 3 blog articles load
- [ ] HTTPS working with valid certificate
- [ ] Form submission works (Kit receives data)
- [ ] Consent banner appears on first visit
- [ ] OG image shows in social preview
- [ ] Security headers present (check securityheaders.com)
- [ ] No console errors on any page
- [ ] Mobile layout correct (no horizontal scroll at 375px)

## Reporting
- Update TASKS.md status to DONE
- Report any issues found during verification
