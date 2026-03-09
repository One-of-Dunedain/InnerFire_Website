/**
 * InnerFire Waitlist Counter
 * Cloudflare Worker + KV
 *
 * Endpoints:
 *   GET  /api/waitlist-count   -> returns { count: N, limit: 300 }
 *   POST /api/waitlist-webhook -> increments count when secret is valid
 *
 * KV Namespace binding: WAITLIST
 * KV Key: "subscriber_count"
 */

const WAITLIST_LIMIT = 300;

export default {
  async fetch(request, env) {
    var url = new URL(request.url);
    var origin = request.headers.get('Origin') || '';
    var allowOrigin = origin === 'https://innerfire-app.com' ? origin : 'https://innerfire-app.com';

    var corsHeaders = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Webhook-Secret',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/waitlist-count' && request.method === 'GET') {
      var rawCount = await env.WAITLIST.get('subscriber_count');
      var count = parseInt(rawCount || '0', 10);
      if (isNaN(count) || count < 0) {
        count = 0;
      }

      return new Response(
        JSON.stringify({
          count: Math.min(count, WAITLIST_LIMIT),
          limit: WAITLIST_LIMIT,
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=60',
            ...corsHeaders,
          },
        }
      );
    }

    if (url.pathname === '/api/waitlist-webhook' && request.method === 'POST') {
      var secret = url.searchParams.get('secret') || request.headers.get('X-Webhook-Secret');
      var expectedSecret = env.WEBHOOK_SECRET;

      if (!secret || !expectedSecret || secret !== expectedSecret) {
        return new Response('Unauthorized', { status: 401, headers: corsHeaders });
      }

      var rawCurrent = await env.WAITLIST.get('subscriber_count');
      var current = parseInt(rawCurrent || '0', 10);
      if (isNaN(current) || current < 0) {
        current = 0;
      }

      var next = current + 1;
      await env.WAITLIST.put('subscriber_count', String(next));

      return new Response(
        JSON.stringify({
          count: Math.min(next, WAITLIST_LIMIT),
          limit: WAITLIST_LIMIT,
        }),
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...corsHeaders,
          },
        }
      );
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
