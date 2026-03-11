# TASK-062 — Video hosting migration: R2 CDN for full-quality playback

Status: IN PROGRESS (Phase 1 + Phase 3 done by Executor; Phase 2 R2 upload pending Human)
Priority: High
Owner: Executor AI + Human (R2 upload)
Depends on: none

## Problem

Source videos are 70-147MB each (4K portrait, HEVC). Cloudflare Pages has a 25MB file limit and git repo should not store large binaries. Current videos are over-compressed (~1-4MB) and quality is unacceptable.

## Architecture

Three-tier video delivery, already supported by existing code in `script.js`:

| Tier | Purpose | Host | Quality | Size target |
|------|---------|------|---------|-------------|
| **Preview** | Autoplay muted loop | CF Pages (`assets/videos/*-preview.mp4`) | 360x640, CRF 32 | 200-500KB |
| **Full (R2)** | Modal playback with sound | R2 CDN (`media.innerfire-app.com`) | Original or 1080x1920, CRF 18 | No limit |
| **Fallback** | If R2 unreachable (1.2s timeout) | CF Pages (`assets/videos/*.mp4`) | 720x1280, CRF 25 | 3-8MB |

## Source video mapping

| Source file | Target name | Used in |
|-------------|-------------|---------|
| `Mountains.mp4` (112MB) | `demo-1` | `index.html` — carousel card-mountains |
| `Fire.mp4` (147MB, 2160x3840) | `demo-2` | `index.html` — carousel card-meditation |
| `Stick.mp4` (70MB) | `demo-3` | `index.html` — carousel card-forest |
| `Fire.mp4` (147MB, 2160x3840) | `vagus-nerve-video` | `blog/vagus-nerve-breathing.html` — article video |

> Fire.mp4 is used twice: homepage carousel (demo-2) AND vagus article. Same source, same R2 file, different preview/fallback names.

## Phase 1: Generate preview + fallback versions (Executor)

For each source video, generate 2 versions using ffmpeg:

```bash
# Preview (autoplay loop) — small, fast loading
ffmpeg -i SOURCE.mp4 -vf "scale=360:640" -c:v libx264 -preset slow -crf 32 -an -movflags +faststart -y assets/videos/NAME-preview.mp4

# Fallback (if R2 down) — medium quality, fits in CF Pages 25MB limit
ffmpeg -i SOURCE.mp4 -vf "scale=720:1280" -c:v libx264 -preset slow -crf 25 -an -movflags +faststart -y assets/videos/NAME.mp4
```

### File Operations — Phase 1

| # | File | Action |
|---|------|--------|
| 1 | `assets/videos/demo-1-preview.mp4` | OVERWRITE — Mountains.mp4 → preview |
| 2 | `assets/videos/demo-1.mp4` | OVERWRITE — Mountains.mp4 → fallback |
| 3 | `assets/videos/demo-2-preview.mp4` | OVERWRITE — Fire.mp4 → preview |
| 4 | `assets/videos/demo-2.mp4` | OVERWRITE — Fire.mp4 → fallback |
| 5 | `assets/videos/demo-3-preview.mp4` | OVERWRITE — Stick.mp4 → preview |
| 6 | `assets/videos/demo-3.mp4` | OVERWRITE — Stick.mp4 → fallback |
| 7 | `assets/videos/vagus-nerve-preview.mp4` | OVERWRITE — Fire.mp4 → preview (same source as demo-2) |
| 8 | `assets/videos/vagus-nerve-video.mp4` | OVERWRITE — Fire.mp4 → fallback (same source as demo-2) |

Source files location: `X:\Work\innerFire landing info\`

## Phase 2: Upload originals to R2 (Human)

Upload original source videos (or 1080p CRF 18 versions) to R2 bucket via Cloudflare dashboard or wrangler CLI:

```bash
# Upload originals (best quality) — R2 has no file size limits, no egress fees
wrangler r2 object put innerfire-media/demo-1.mp4 --file="X:/Work/innerFire landing info/Mountains.mp4"
wrangler r2 object put innerfire-media/demo-2.mp4 --file="X:/Work/innerFire landing info/Fire.mp4"
wrangler r2 object put innerfire-media/demo-3.mp4 --file="X:/Work/innerFire landing info/Stick.mp4"
```

> Fire.mp4 is uploaded once as `demo-2.mp4`. The vagus article's `data-r2src` will also point to `demo-2.mp4`.

Files must be accessible at:
- `https://media.innerfire-app.com/demo-1.mp4`
- `https://media.innerfire-app.com/demo-2.mp4`
- `https://media.innerfire-app.com/demo-3.mp4`

## Phase 3: Update HTML with R2 sources (Executor)

Add/restore `data-r2src` attributes to all video elements.

### File Operations — Phase 3

**index.html** — 3 carousel videos:
```html
<!-- Current (no R2): -->
<video class="card-bg-video" ... data-fullsrc="./assets/videos/demo-1.mp4">

<!-- Updated (with R2): -->
<video class="card-bg-video" ... data-fullsrc="./assets/videos/demo-1.mp4" data-r2src="https://media.innerfire-app.com/demo-1.mp4">
```

**blog/vagus-nerve-breathing.html** — 1 article video:
```html
<!-- Already has data-r2src. Update to share R2 source with demo-2: -->
<video class="video-card-player" ... data-fullsrc="../assets/videos/vagus-nerve-video.mp4" data-r2src="https://media.innerfire-app.com/demo-2.mp4">
```

### Files modified — Phase 3

| # | File | Changes |
|---|------|---------|
| 1 | `index.html` | Add `data-r2src` to 3 video elements |
| 2 | `blog/vagus-nerve-breathing.html` | Update `data-r2src` URL |

## Phase 4: Verify

1. Open homepage — preview videos autoplay (small, fast)
2. Click a video card — modal opens, loads R2 full-quality version
3. Vagus article — same behavior
4. Throttle network to Slow 3G — verify fallback kicks in after 1.2s
5. Check browser console — no CSP violations, no 404s

## What NOT to Do

- Do NOT commit original source videos (70-147MB) to git
- Do NOT modify `script.js` — the R2/fallback logic already works
- Do NOT modify `styles.css` or `_headers`
- Do NOT remove local fallback files — they're the safety net

## Acceptance Criteria

- [x] Preview videos regenerated from new sources (360x640, <500KB each)
- [x] Fallback videos regenerated (720x1280, <8MB each, fits CF Pages limit)
- [ ] Original quality videos uploaded to R2 and accessible via `media.innerfire-app.com`
- [x] `data-r2src` attributes present on all video elements
- [ ] Modal opens and plays R2 version on click (desktop + mobile)
- [ ] Fallback works when R2 is blocked/slow
- [x] No git-tracked files exceed 25MB
