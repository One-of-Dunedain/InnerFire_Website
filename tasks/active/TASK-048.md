# TASK-048: GA4 + Clarity setup — replace placeholders, verify end-to-end

Status: TODO
Priority: High
Owner: Executor AI + User (account creation is manual)
Depends on: TASK-045 (DONE)

## Context

TASK-045 creates `consent.js` with placeholder IDs (`G-XXXXXXXXXX` for GA4, `XXXXXXXXXX` for Clarity). This task replaces them with real IDs and verifies the full analytics pipeline works end-to-end.

**This is a split task:**
- **User action:** Create GA4 property + Clarity project, provide real IDs
- **AI action:** Replace placeholders in code, verify integration

**This task modifies 1 file.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `consent.js` — replace GA4_ID and CLARITY_ID with real values |

## Step 1: User creates accounts (manual)

### GA4 (Google Analytics 4)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Admin" (gear icon) → "Create Property"
3. Property name: `InnerFire Website`
4. Time zone: your local timezone
5. Currency: USD (or UAH)
6. Business size: Small
7. Under "Data Streams" → "Web" → enter `innerfire.app`
8. **Copy the Measurement ID** — looks like `G-XXXXXXXXXX`

### Microsoft Clarity

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Sign in with Microsoft account
3. Click "Add new project"
4. Project name: `InnerFire`
5. Website URL: `https://innerfire.app`
6. Category: Health & Fitness
7. **Copy the Project ID** — found in Settings → Overview, looks like `abc123xyz`

### User provides IDs

Tell the AI executor:
```
GA4 ID: G-XXXXXXX
Clarity ID: XXXXXXXXX
```

## Step 2: Replace placeholders in consent.js

In `consent.js`, update these two lines:

```javascript
var GA4_ID = 'G-XXXXXXXXXX';       // ← replace with real GA4 Measurement ID
var CLARITY_ID = 'XXXXXXXXXX';     // ← replace with real Clarity Project ID
```

## Step 3: Configure GA4 custom events

In GA4 dashboard (analytics.google.com):

1. **Admin → Events → Create event** for each custom event from TASK-045:

| Event name | Description |
|------------|-------------|
| `form_submit` | Kit form submitted (already auto-tracked by consent.js) |
| `form_error` | Form validation failure |
| `scroll_depth` | User scrolled past threshold |
| `share_click` | Share button clicked |
| `cta_click` | Non-form CTA clicked |

2. **Admin → Conversions → Mark as conversion:**
   - `form_submit` → mark as conversion (this is the key business metric)

3. **Admin → Data Settings → Data Retention:**
   - Set to 14 months (maximum)

4. **Optionally enable Google Signals** (for cross-device tracking):
   - Admin → Data Settings → Data Collection → turn on

### Clarity configuration

In Clarity dashboard (clarity.microsoft.com):

1. **Settings → Setup → Custom tags:**
   - Verify `form_submit` tag appears after test submission
2. **Settings → Recording → Smart events:**
   - Turn on "Dead clicks" and "Rage clicks" detection
3. **Settings → Privacy:**
   - Mask all input fields (default — verify it's on)

## Step 4: End-to-end verification

### Basic flow

1. Open site in incognito browser
2. Consent banner appears → click "Accept"
3. Open Network tab → verify:
   - Request to `googletagmanager.com/gtag/js?id=G-XXXXX` → ✅ GA4 loaded
   - Request to `clarity.ms/tag/XXXXX` → ✅ Clarity loaded
4. Reload page → no banner, analytics load automatically

### Event verification

1. Install "Google Analytics Debugger" Chrome extension (or use GA4 DebugView)
2. Open DevTools Console → `console.log(window.dataLayer)` → see gtag calls
3. Scroll page → `scroll_depth` events at 25/50/75/100%
4. Click share button → `share_click` event
5. Click CTA button → `cta_click` event
6. Submit form → `form_submit` event

### Clarity verification

1. After browsing for 1-2 minutes, check Clarity dashboard
2. Should see recording appearing in "Recordings" tab
3. Check "Dashboard" for session count

### Consent denial

1. Clear localStorage, reload in incognito
2. Click "Decline" on consent banner
3. Network tab → NO requests to googletagmanager.com or clarity.ms
4. `console.log(window.dataLayer)` → only consent default, no config/events

## Do NOT

- Commit real GA4/Clarity IDs to public repo without user confirmation (IDs are not secrets but are identifying)
- Enable ad_storage or ad_personalization consent (InnerFire doesn't run ads)
- Add Google Tag Manager (we use direct gtag.js)
- Change consent.js logic — only replace the two ID variables

## Acceptance Criteria

- [ ] `consent.js` has real GA4 Measurement ID (not placeholder)
- [ ] `consent.js` has real Clarity Project ID (not placeholder)
- [ ] GA4 receives page_view events after consent
- [ ] GA4 receives custom events (form_submit, scroll_depth, share_click, cta_click)
- [ ] Clarity records sessions after consent
- [ ] No analytics requests when consent is declined
- [ ] GA4 property has form_submit marked as conversion
- [ ] Clarity has input masking enabled

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
