# TASK-055: Create og-image.png for social sharing

## Recovery (read after context compaction)
You are executing TASK-055 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: TODO
Priority: Critical (blocks deployment)
Owner: Executor AI
Depends on: none

## Context

All HTML pages reference `og-image.png` in their `<meta property="og:image">` tags, but the file doesn't exist. When someone shares the site on social media (Twitter, Discord, Slack, LinkedIn), they see a broken/empty preview image. This must be fixed before deployment.

The site's visual identity: dark background (#0a0d12), warm amber accent (#ff8a3d / #e8a04c), fire theme, the brand name "InnerFire".

**This task creates 1 file.**

## File Operations

| Action | File |
|--------|------|
| CREATE | `og-image.png` |

## Implementation

### Option A: Generate via HTML Canvas (preferred)

Create a simple, clean OG image programmatically. The image should be:
- **Size:** 1200x630 pixels (standard OG image dimensions)
- **Background:** Dark gradient (#0a0d12 to #12161e)
- **Center:** Fire emoji 🔥 or a simple flame shape, large (200px+)
- **Below flame:** "InnerFire" in white/warm text, bold, ~60px
- **Tagline:** "Breathe. Feel It." in muted color, ~24px
- **Bottom corner:** "innerfire.app" in small muted text

### Approach

Use a simple Node.js script or Python script to generate the image, OR create it manually in any image editor. The key requirements:
- 1200x630px PNG
- Dark background matching site theme
- Brand name visible
- Fire visual element
- Clean, minimal design

### If no image generation tools available

Create a minimal SVG and convert to PNG, or ask the human to provide an image. As absolute minimum, create a solid dark background with the text "InnerFire" centered — this is better than a missing image.

## Verify OG tag paths

After creating the file, verify these meta tags point to it correctly:

- `index.html`: `<meta property="og:image" content="./og-image.png" />`
- `blog.html`: `<meta property="og:image" content="./og-image.png" />`
- Blog articles: check they use `../og-image.png` (relative path from blog/ dir)

**Do NOT modify HTML files** — only verify paths are correct. The paths should already work once the file exists.

## Do NOT

- Modify any HTML files
- Use external services or APIs to generate the image
- Create an image larger than 2MB (social platforms reject large images)
- Use copyrighted images or logos

## Acceptance Criteria

- [ ] `og-image.png` exists in the project root
- [ ] Image is 1200x630 pixels
- [ ] Image file size is under 500KB (ideally under 200KB)
- [ ] Image has dark background matching site theme
- [ ] Image has "InnerFire" text visible
- [ ] Image is visually acceptable (not broken/corrupted)

## Verification

```bash
# Check file exists and size
ls -la og-image.png

# Check dimensions (if ImageMagick available)
identify og-image.png
```

## Reporting
- Update TASKS.md status to DONE
