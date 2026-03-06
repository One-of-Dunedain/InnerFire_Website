# TASK-060: Add Table of Contents to build-breathing-habit.html

## Recovery (read after context compaction)
You are executing TASK-060 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none

## Context

The "Build a Breathing Habit" article has 8 H2 sections but no Table of Contents. The `best-breathwork-apps.html` article already has a sticky ToC — replicate the same pattern here.

**This task modifies 1 file.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `blog/build-breathing-habit.html` |

## Current H2 sections in the article

1. Why Breathing Exercises Are Hard to Stick To
2. How Habits Actually Form
3. The Three Phases of Habit Formation
4. Five Rules for Making Breathing Stick
5. Your 21-Day Breath Map
6. Common Failure Points
7. The Bottom Line
8. Frequently Asked Questions

## Implementation

### 1. Add IDs to all H2 elements

Find each `<h2>` in the article body and add an `id` attribute:

```html
<h2 id="why-hard">Why Breathing Exercises Are Hard to Stick To</h2>
<h2 id="how-habits-form">How Habits Actually Form</h2>
<h2 id="three-phases">The Three Phases of Habit Formation</h2>
<h2 id="five-rules">Five Rules for Making Breathing Stick</h2>
<h2 id="breath-map">Your 21-Day Breath Map</h2>
<h2 id="failure-points">Common Failure Points</h2>
<h2 id="bottom-line">The Bottom Line</h2>
```

(The FAQ section already has `id="faq"` — verify and keep it.)

### 2. Add ToC nav block

Insert BEFORE the first `<h2>` inside `.article-body`:

```html
<nav class="article-toc" aria-label="Table of contents">
  <p class="article-toc-title">In this article</p>
  <ul class="article-toc-list">
    <li><a href="#why-hard">Why Breathing Exercises Are Hard to Stick To</a></li>
    <li><a href="#how-habits-form">How Habits Actually Form</a></li>
    <li><a href="#three-phases">The Three Phases of Habit Formation</a></li>
    <li><a href="#five-rules">Five Rules for Making Breathing Stick</a></li>
    <li><a href="#breath-map">Your 21-Day Breath Map</a></li>
    <li><a href="#failure-points">Common Failure Points</a></li>
    <li><a href="#bottom-line">The Bottom Line</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
</nav>
```

### 3. Verify styles apply

The `.article-toc` styles already exist in `styles.css` (used by `best-breathwork-apps.html`). Verify they apply to this article too. If styles are scoped by a page-specific class, note it and let the orchestrator know — but do NOT modify `styles.css` (that file is not in your File Operations).

## Do NOT

- Modify `styles.css` (not in File Operations — if styles don't apply, report it)
- Modify article text content
- Add JavaScript for the ToC (smooth scrolling handled by `html { scroll-behavior: smooth }` in CSS)
- Touch other articles or pages

## Acceptance Criteria

- [ ] `<nav class="article-toc">` present before the first H2
- [ ] All 8 sections linked in the ToC
- [ ] All H2 elements have `id` attributes
- [ ] Clicking ToC links scrolls to correct section
- [ ] ToC is visible on desktop (sticky or inline, matching best-breathwork-apps pattern)
- [ ] ToC stacks/collapses properly on mobile (< 768px)
- [ ] No console errors
- [ ] Article content unchanged

## Verification

1. Open blog/build-breathing-habit.html at 1440px → ToC visible
2. Click each ToC link → scrolls to section
3. Open at 375px → ToC fits, no overflow
4. Compare ToC appearance with best-breathwork-apps.html → should be consistent

## Reporting
- Update TASKS.md status to DONE
