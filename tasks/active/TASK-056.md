# TASK-056: Pre-deployment cleanup — Worker URL placeholder + TikTok links

## Recovery (read after context compaction)
You are executing TASK-056 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: DONE
Priority: High
Owner: Executor AI
Depends on: none

## Context

Final cleanup before deploying to Cloudflare Pages. Three small fixes across 4 files.

**This task modifies 4 files.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `script.js` |
| MODIFY | `index.html` |
| MODIFY | `blog.html` |
| MODIFY | `privacy.html` |

## Implementation

### Fix 1: Comment out Worker URL placeholder (script.js)

The waitlist counter API URL is a placeholder (`<your-subdomain>`). Until Cloudflare Workers is set up, the fetch will fail. Currently it fails silently, but the placeholder URL looks unprofessional in source code.

In `script.js`, find this block (around line 347-380, the waitlist counter section):

**Current:**
```javascript
var API_URL = 'https://innerfire-waitlist.<your-subdomain>.workers.dev/api/waitlist-count';
```

**Replace with:**
```javascript
// TODO: Replace with real Cloudflare Worker URL after TASK-049
// var API_URL = 'https://innerfire-waitlist.YOUR_SUBDOMAIN.workers.dev/api/waitlist-count';
return; // Skip counter fetch until Worker is deployed
```

This disables the counter fetch entirely until the real URL is configured, avoiding unnecessary failed network requests.

### Fix 2: TikTok links — remove or replace

In 3 files, there's a TikTok icon linking to `#` (placeholder). Since there's no TikTok profile yet, remove the TikTok link entirely to avoid a dead link.

**In each of these files, find the TikTok link in the footer and remove it:**

#### index.html (around line 243)
Find and remove the line containing:
```html
<a href="#" target="_blank" rel="noopener" aria-label="TikTok">
```
and its closing `</a>` plus the SVG icon inside.

#### blog.html (around line 106)
Same — find and remove the TikTok `<a>` with `href="#"`.

#### privacy.html (around line 233)
Same — find and remove the TikTok `<a>` with `href="#"`.

**How to identify:** Search for `aria-label="TikTok"` in each file. Remove the entire `<a>...</a>` block.

### Fix 3: Verify no other `href="#"` placeholders remain

After removing TikTok links, verify that the only remaining `href="#"` in each file are:
- `#signup` (anchor link — valid)
- `#demo` (anchor link — valid)
- `#cookie-settings-link` (JS-handled — valid)
- `#article-*` (article section anchors — valid)

Any other `href="#"` is a broken link.

## Do NOT

- Remove the X (Twitter) or Discord social links
- Change any anchor links (#signup, #demo, etc.)
- Modify the Cookie Settings link (it's handled by consent.js)
- Remove the entire social links section — only remove TikTok
- Modify consent.js or styles.css

## Acceptance Criteria

- [x] script.js: Worker URL fetch is disabled (returns early)
- [x] index.html: TikTok link removed from footer
- [x] blog.html: TikTok link removed from footer
- [x] privacy.html: TikTok link removed from footer
- [x] No broken `href="#"` links remain (except cookie-settings-link which is JS-handled)
- [x] X (Twitter) and Discord links still present and functional
- [x] No console errors on any page

## Verification

```bash
# Verify no TikTok links remain
grep -rn "TikTok" index.html blog.html privacy.html

# Verify no stray href="#" (should only see cookie-settings and anchors)
grep -n 'href="#"' index.html blog.html privacy.html

# Verify social links still exist
grep -n "twitter\|discord\|x.com" index.html blog.html privacy.html
```

## Reporting
- Update TASKS.md status to DONE
