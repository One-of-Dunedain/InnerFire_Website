# TASK-026: Blog UX/UI audit + fixes

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-019, TASK-023

## Goal
Thoroughly analyze the blog pages (index + article template) for UX/UI problems and fix them. Ensure the blog feels polished, modern, and consistent with the InnerFire brand.

## Context
The blog was built by executing TASK-013 through TASK-016. The owner wants a thorough UX/UI review. This task combines audit + implementation. The executor should identify issues and fix them in one pass.

## Requirements

### Mandatory fixes (identified by Orchestrator)

1. **Blog page header spacing**: The `.page-header` has `padding: 120px 0 60px` but the fixed header is ~52px tall. Verify the content doesn't overlap and there's enough visual breathing room.

2. **Blog card hover on mobile**: The `.blog-card:hover` transform (`translateY(-4px)`) and `.blog-card-share` opacity toggle don't work well on touch devices. On mobile, the share button should always be visible (not hidden behind `:hover`). Add:
```css
@media (max-width: 480px) {
  .blog-card-share { opacity: 0.7; }
}
```

3. **Blog newsletter "we" → "I"**: If TASK-019 hasn't caught all instances, verify and fix. (Cross-check.)

4. **Article template footer**: The article footer only shows "Made by an indie developer who needed to breathe." — it should also have social links consistent with the main page footer. Add the same social links:
```html
<footer>
  <div class="container">
    <p class="footer-follow">Follow the build:</p>
    <div class="social-links">
      <a href="#" class="social-link" target="_blank" rel="noopener">TikTok</a>
      <a href="https://x.com/kushnir_marian_" class="social-link" target="_blank" rel="noopener">X</a>
      <a href="https://discord.gg/PRuveBJH" class="social-link" target="_blank" rel="noopener">Discord</a>
    </div>
    <p class="footer-credit">Made by an indie developer who needed to breathe.</p>
  </div>
</footer>
```

5. **Blog page footer consistency**: `blog.html` footer also only shows the credit line — add the same social links.

6. **Empty state styling**: When blog has no posts, the "Articles are coming soon" empty state should have more visual appeal. Add a subtle fire glow or the InnerFire eyebrow label. Consider:
```html
<div id="blog-empty" class="blog-empty" style="display:none;">
  <p class="eyebrow">InnerFire</p>
  <p>Articles are coming soon. Stay tuned.</p>
  <a href="./index.html#signup" class="btn-primary">Get Early Access</a>
</div>
```

### Executor-driven audit

Beyond the mandatory fixes above, the executor should:
- Open `blog.html` and `blog/_template.html` in a browser
- Check all interactive elements work (share buttons, forms, links)
- Check responsive behavior at 375px, 768px, 1024px
- Look for visual inconsistencies with the main page style
- Verify the reading progress bar works correctly
- Check that the back-to-blog link works from the article template
- Identify and fix any additional UX issues found

Report all issues found (even if not fixed) in the execution report.

## Do NOT touch
- `index.html` (except if footer needs consistency update)
- Hero section
- `script.js` (except if bugs are found)
- Carousel or signup sections

## Acceptance Criteria
- [ ] Blog card share button visible on mobile (no hover dependency)
- [ ] Article template has full footer with social links
- [ ] Blog index has full footer with social links
- [ ] Empty state has improved styling (eyebrow + CTA button)
- [ ] No visual inconsistencies between blog pages and main page
- [ ] All interactive elements work correctly
- [ ] Responsive layout verified at 375px, 768px, 1024px
- [ ] Reading progress bar functions correctly in article template
- [ ] All links navigate correctly
- [ ] Audit findings documented in report

## Verification
- Open blog.html — verify footer has social links
- Open blog/_template.html — verify footer has social links
- Resize to 375px — share buttons on blog cards are visible without hover
- Clear blog/posts.json (set to []) — empty state shows eyebrow + CTA
- Scroll article template — progress bar works
- Click all navigation links — correct destinations

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
- Include a section: "Audit findings" listing all UX/UI issues discovered + whether they were fixed
