# InnerFire Website

Minimal static website project for InnerFire product overview.

## Run locally

From repository root:

```bash
cd InnerFire_Website
python3 -m http.server 8080
```

Open:

- http://localhost:8080

## Content source

- `content/InnerFire_Product_Overview_EN.md` (copied from `docs/ai/InnerFire_Product_Overview_EN.md`)

## Cloudflare deployment notes

- Hosting target: Cloudflare Pages
- Large full-size videos are served from Cloudflare R2 via `https://media.innerfire-app.com`
- Local `assets/videos/*-preview.mp4` files stay in the repo for inline previews
- The video modal prefers the R2 asset and falls back to the local full file if the media host is unavailable

### R2 object keys

Upload these files to the R2 bucket behind `media.innerfire-app.com`:

- `demo-1.mp4`
- `demo-2.mp4`
- `demo-3.mp4`
- `vagus-nerve-video.mp4`

### Why this split exists

Cloudflare Pages rejects individual files larger than 25 MiB. Keeping previews in the repo and moving full-size delivery to R2 preserves the current UX without blocking deploys.
