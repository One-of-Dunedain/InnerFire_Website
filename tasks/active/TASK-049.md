# TASK-049: Waitlist counter — Cloudflare Workers + KV serverless endpoint

Status: TODO
Priority: High
Owner: Executor AI + User (Cloudflare account setup)
Depends on: TASK-045 (DONE), TASK-046 (DONE)

## Context

The landing page says "Be one of 300 early testers" but the number is static. We need a real-time counter showing "X / 300" — how many people have signed up via Kit.

**Architecture:** Cloudflare Workers + KV (key-value storage). The site is hosted on Cloudflare Pages, so Workers are natively available with zero additional infrastructure.

**How it works:**
1. Kit webhook fires on new subscriber → hits Cloudflare Worker endpoint
2. Worker increments counter in KV
3. Frontend fetches counter from Worker API on page load
4. Displayed as "X / 300" on landing page

**This task creates 1 new file (Worker), modifies 2 existing files (index.html + script.js).**

## File Operations

| Action | File |
|--------|------|
| CREATE | `workers/waitlist-counter.js` — Cloudflare Worker |
| MODIFY | `index.html` — add counter display element |
| MODIFY | `script.js` — add counter fetch logic |

## Architecture

```
Kit (new subscriber) → Webhook POST → Cloudflare Worker → KV.increment
                                                            ↓
Frontend (page load) → GET /api/waitlist-count → Worker → KV.get → JSON response
```

### Cloudflare Worker: `workers/waitlist-counter.js`

```javascript
/**
 * InnerFire Waitlist Counter
 * Cloudflare Worker + KV
 *
 * Endpoints:
 *   GET  /api/waitlist-count     → returns { count: N, limit: 300 }
 *   POST /api/waitlist-webhook   → Kit webhook, increments counter
 *
 * KV Namespace: WAITLIST (bind in wrangler.toml)
 * KV Key: "subscriber_count"
 */

const WAITLIST_LIMIT = 300;
const WEBHOOK_SECRET = ''; // Set via Cloudflare Worker env var: WEBHOOK_SECRET

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers for frontend fetch
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://innerfire.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // GET /api/waitlist-count — public, returns current count
    if (url.pathname === '/api/waitlist-count' && request.method === 'GET') {
      const count = parseInt(await env.WAITLIST.get('subscriber_count') || '0', 10);
      return new Response(
        JSON.stringify({ count: Math.min(count, WAITLIST_LIMIT), limit: WAITLIST_LIMIT }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
            ...corsHeaders,
          },
        }
      );
    }

    // POST /api/waitlist-webhook — Kit webhook
    if (url.pathname === '/api/waitlist-webhook' && request.method === 'POST') {
      // Verify webhook secret (Kit sends it as query param or header)
      const secret = url.searchParams.get('secret') || request.headers.get('X-Webhook-Secret');
      if (secret !== env.WEBHOOK_SECRET) {
        return new Response('Unauthorized', { status: 401 });
      }

      // Increment counter
      const current = parseInt(await env.WAITLIST.get('subscriber_count') || '0', 10);
      await env.WAITLIST.put('subscriber_count', String(current + 1));

      return new Response(
        JSON.stringify({ count: current + 1, limit: WAITLIST_LIMIT }),
        {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
```

### Wrangler configuration: `wrangler.toml`

```toml
name = "innerfire-waitlist"
main = "workers/waitlist-counter.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "WAITLIST"
id = ""  # User fills in after creating KV namespace

[vars]
WEBHOOK_SECRET = ""  # Set via `wrangler secret put WEBHOOK_SECRET`
```

**Note:** `wrangler.toml` is created by this task but user fills in KV namespace ID after setup.

## Frontend changes

### index.html — counter display

Add counter element in the signup section. Find the current "Be one of 300 early testers" text and replace:

**Before:**
```html
<p>Be one of 300 early testers.</p>
```

**After:**
```html
<p class="waitlist-counter">
  <span class="waitlist-count" id="waitlist-count">—</span> / 300 early testers signed up
</p>
```

The `—` is a placeholder that gets replaced by JS. If JS fails or API is down, it shows the dash.

### script.js — counter fetch

Add to script.js:

```javascript
// ── Waitlist counter ──
(function() {
  var el = document.getElementById('waitlist-count');
  if (!el) return;

  var API_URL = 'https://innerfire-waitlist.<your-subdomain>.workers.dev/api/waitlist-count';

  fetch(API_URL)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (typeof data.count === 'number') {
        el.textContent = data.count;
        // Animate if visible
        el.classList.add('counter-loaded');
      }
    })
    .catch(function() {
      // Silently fail — dash placeholder stays
    });
})();
```

### styles.css — counter styling

```css
.waitlist-counter {
  font-size: 0.95rem;
  color: var(--muted);
  margin-top: 8px;
}
.waitlist-count {
  color: var(--accent);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  transition: opacity 0.3s;
}
.waitlist-count.counter-loaded {
  animation: counterPop 0.3s ease;
}
@keyframes counterPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
```

## Cloudflare setup (user manual steps)

### 1. Create KV namespace

```bash
npx wrangler kv:namespace create "WAITLIST"
```

Copy the `id` output → paste into `wrangler.toml` under `[[kv_namespaces]]`.

### 2. Set webhook secret

```bash
npx wrangler secret put WEBHOOK_SECRET
# Enter a random string, e.g.: wh_innerfire_2026_xyz123
```

### 3. Deploy Worker

```bash
npx wrangler deploy
```

Note the Worker URL (e.g., `https://innerfire-waitlist.your-subdomain.workers.dev`).

### 4. Set initial count

If you already have subscribers in Kit, set the initial count:

```bash
npx wrangler kv:key put --namespace-id=<KV_ID> "subscriber_count" "<current_count>"
```

Get current count from Kit dashboard → Subscribers.

### 5. Configure Kit webhook

1. Go to Kit → Automations → Rules
2. Create rule: "When subscriber is added" → "Send webhook"
3. Webhook URL: `https://innerfire-waitlist.<subdomain>.workers.dev/api/waitlist-webhook?secret=<your-secret>`
4. Method: POST

### 6. Update frontend API URL

In `script.js`, replace the placeholder URL with the real Worker URL.

## Security considerations

- Webhook endpoint requires secret (prevents random POSTs from inflating count)
- CORS restricted to `innerfire.app` origin only
- Counter is capped at WAITLIST_LIMIT (300) — can't show numbers above limit
- GET endpoint is cached 60 seconds (prevents abuse + reduces KV reads)
- No PII stored — only a single integer counter
- KV increment is NOT atomic (eventual consistency) — acceptable for a waitlist counter

## Do NOT

- Use localStorage to cache counter (should always be fresh from API)
- Show exact count if above limit (cap at 300)
- Expose webhook secret in frontend code
- Use complex state management — one fetch, one DOM update
- Add loading spinners — dash placeholder is sufficient
- Commit real webhook secret or KV namespace IDs to git

## Acceptance Criteria

- [ ] Cloudflare Worker deployed and accessible
- [ ] GET /api/waitlist-count returns JSON `{ count, limit }`
- [ ] POST /api/waitlist-webhook increments counter (with valid secret)
- [ ] POST /api/waitlist-webhook returns 401 without valid secret
- [ ] Landing page shows "X / 300 early testers signed up"
- [ ] Counter loads within 1 second of page load
- [ ] If API is unreachable, page shows "— / 300" (graceful fallback)
- [ ] CORS only allows innerfire.app origin
- [ ] No secrets committed to repository
- [ ] Kit webhook fires on new subscriber → counter increments

## Verification

1. Deploy Worker → `curl https://your-worker.workers.dev/api/waitlist-count` → `{"count":0,"limit":300}`
2. Send test webhook → `curl -X POST "...?secret=<secret>"` → count increments
3. Open landing page → counter displays
4. Sign up with test email in Kit → counter increments within 60 seconds
5. Block network to Worker → page shows dash fallback

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
