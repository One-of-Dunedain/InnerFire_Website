# TASK-032: Collect app logos/icons for article

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Goal
Download official app icons for all apps in the breathwork comparison article. Save as optimized PNG files in the correct directory.

## Files to create

Directory: `assets/images/apps/` (create if doesn't exist)

Required icon files (match the `src` paths already in the article HTML):
1. `breathwrk.png`
2. `headspace.png`
3. `box-breathe.png`
4. `calm.png`
5. `insight-timer.png`
6. `ibreathe.png`
7. `oak.png`
8. `prana-breath.png`
9. `wim-hof-method.png`
10. `othership.png`
11. `innerfire.png` — use the InnerFire favicon/logo from the existing site assets

## Icon specifications
- **Size:** 112x112px (displays at 56x56 with 2x retina density)
- **Format:** PNG with transparency if the icon has it, otherwise solid background
- **Quality:** Optimized for web (run through compression if possible)
- **Border radius:** Don't add CSS border-radius to the image — it's handled by CSS `.app-card-icon { border-radius: 12px; }`

## Where to find icons
- **Apple App Store:** Each app's listing page has a high-res icon
- **Google Play Store:** Same
- **Alternative:** Official press kits on app websites often have higher quality versions
- For InnerFire: check existing `assets/` directory for any logo/icon file, or create a simple fire emoji on dark background

## Do NOT
- Use copyrighted screenshots (icons are generally fair use for editorial/review content)
- Modify any HTML/CSS — the `<img>` tags already have the correct paths
- Download full screenshots — only the app icon
- Use low-resolution icons (must be at least 112x112)

## Verification
- Open `blog/best-breathwork-apps.html` in browser
- All 11 app cards should show their respective icons (no broken image placeholders)
- Icons should look crisp at normal and retina resolution
- Icons should have consistent visual weight (similar size, not one tiny and one huge)

## Acceptance Criteria
- [ ] All 11 PNG files exist in `assets/images/apps/`
- [ ] All files are at least 112x112px
- [ ] All files are optimized (under 50KB each)
- [ ] Article renders all icons correctly in browser
- [ ] InnerFire icon exists and matches site branding

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md
