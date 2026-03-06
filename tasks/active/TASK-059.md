# TASK-059: Vagus nerve article — add ToC, dividers, illustrations for readability

## Recovery (read after context compaction)
You are executing TASK-059 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Context

The vagus nerve article (`blog/vagus-nerve-breathing.html`) is a wall of text. It needs:
1. **Sticky Table of Contents** (like best-breathwork-apps.html has)
2. **Visual dividers** between major sections
3. **Inline SVG illustrations** to break up the text and aid understanding

The article has 8 H2 sections. Currently it's just paragraphs with no visual breaks. Compare with `best-breathwork-apps.html` which has a rich, scannable layout.

**This task modifies 2 files.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `blog/vagus-nerve-breathing.html` |
| MODIFY | `styles.css` |

## Current article structure (H2 sections)

1. What Is the Vagus Nerve?
2. The Autonomic Seesaw
3. How Breathing Activates the Vagus Nerve
4. Vagal Tone: Your Baseline Calm
5. Why "Just Think Calm Thoughts" Does Not Work
6. The Multisensory Advantage
7. How InnerFire Applies This
8. What the Evidence Says (and Does Not Say)
9. The Practical Takeaway
10. Frequently Asked Questions

## Implementation

### 1. Add sticky Table of Contents

Add a `<nav class="article-toc">` block BEFORE the first `<h2>` (before "What Is the Vagus Nerve?"), inside `.article-body`.

Reference implementation from `best-breathwork-apps.html` (around line 149):

```html
<nav class="article-toc" aria-label="Table of contents">
  <p class="article-toc-title">In this article</p>
  <ul class="article-toc-list">
    <li><a href="#vagus-nerve">What Is the Vagus Nerve?</a></li>
    <li><a href="#autonomic-seesaw">The Autonomic Seesaw</a></li>
    <li><a href="#breathing-mechanism">How Breathing Activates the Vagus Nerve</a></li>
    <li><a href="#vagal-tone">Vagal Tone: Your Baseline Calm</a></li>
    <li><a href="#why-thinking-fails">Why "Just Think Calm Thoughts" Does Not Work</a></li>
    <li><a href="#multisensory">The Multisensory Advantage</a></li>
    <li><a href="#innerfire">How InnerFire Applies This</a></li>
    <li><a href="#evidence">What the Evidence Says</a></li>
    <li><a href="#takeaway">The Practical Takeaway</a></li>
    <li><a href="#faq">FAQ</a></li>
  </ul>
</nav>
```

Then add `id` attributes to each `<h2>`:
```html
<h2 id="vagus-nerve">What Is the Vagus Nerve?</h2>
<h2 id="autonomic-seesaw">The Autonomic Seesaw</h2>
<h2 id="breathing-mechanism">How Breathing Activates the Vagus Nerve</h2>
<h2 id="vagal-tone">Vagal Tone: Your Baseline Calm</h2>
<h2 id="why-thinking-fails">Why "Just Think Calm Thoughts" Does Not Work</h2>
<h2 id="multisensory">The Multisensory Advantage</h2>
<h2 id="innerfire">How InnerFire Applies This</h2>
<h2 id="evidence">What the Evidence Says (and Does Not Say)</h2>
<h2 id="takeaway">The Practical Takeaway</h2>
```

The `.article-toc` styles already exist in `styles.css` (used by best-breathwork-apps). Verify they apply here too — if they're scoped to a specific page, generalize them.

### 2. Add section dividers

Add a horizontal divider between major topic shifts. Use this pattern:

```html
<hr class="section-divider" />
```

Place dividers BEFORE these H2s (natural topic boundaries):
- Before "How Breathing Activates the Vagus Nerve" (shifts from anatomy to mechanism)
- Before "Why 'Just Think Calm Thoughts' Does Not Work" (shifts from physiology to psychology)
- Before "How InnerFire Applies This" (shifts from science to product)
- Before "The Practical Takeaway" (shifts to conclusion)

### 3. Add inline SVG illustrations

Create simple, minimal inline SVG diagrams at key points. These should match the site's dark theme (use `var(--accent)` for highlights, `var(--muted)` for lines, `var(--text)` for labels).

#### Illustration A: Autonomic Seesaw (after "The Autonomic Seesaw" H2, before the paragraph text)

A simple seesaw/balance diagram showing:
- Left side: "Sympathetic" (fight or flight) — tilted up when stressed
- Right side: "Parasympathetic" (rest & digest) — tilted down
- Center pivot point: "Vagus Nerve"
- Warm amber accent for the parasympathetic side

```html
<figure class="article-illustration" aria-label="Autonomic nervous system seesaw diagram">
  <svg viewBox="0 0 400 200" class="illustration-svg" role="img" aria-label="Seesaw showing sympathetic vs parasympathetic balance">
    <!-- Pivot triangle -->
    <polygon points="200,180 180,140 220,140" fill="var(--muted)" opacity="0.5"/>
    <!-- Beam (tilted slightly toward parasympathetic/right) -->
    <line x1="60" y1="125" x2="340" y2="145" stroke="var(--text)" stroke-width="3" stroke-linecap="round"/>
    <!-- Left weight (sympathetic) -->
    <circle cx="80" cy="115" r="24" fill="none" stroke="var(--muted)" stroke-width="2"/>
    <text x="80" y="80" text-anchor="middle" fill="var(--muted)" font-size="13" font-family="system-ui">Sympathetic</text>
    <text x="80" y="95" text-anchor="middle" fill="var(--muted)" font-size="10" font-family="system-ui">fight or flight</text>
    <!-- Right weight (parasympathetic) — heavier/lower -->
    <circle cx="320" cy="155" r="24" fill="none" stroke="var(--accent)" stroke-width="2"/>
    <text x="320" y="120" text-anchor="middle" fill="var(--accent)" font-size="13" font-family="system-ui">Parasympathetic</text>
    <text x="320" y="135" text-anchor="middle" fill="var(--accent)" font-size="10" font-family="system-ui">rest &amp; digest</text>
    <!-- Pivot label -->
    <text x="200" y="198" text-anchor="middle" fill="var(--text)" font-size="11" font-family="system-ui">Vagus Nerve</text>
  </svg>
</figure>
```

#### Illustration B: Breathing Cycle (after "How Breathing Activates the Vagus Nerve" H2)

A simple two-phase diagram showing inhale → heart rate up vs exhale → heart rate down:

```html
<figure class="article-illustration" aria-label="Breathing cycle and heart rate diagram">
  <svg viewBox="0 0 400 160" class="illustration-svg" role="img" aria-label="Inhale raises heart rate, exhale lowers it via vagus nerve">
    <!-- Inhale box -->
    <rect x="20" y="20" width="160" height="120" rx="12" fill="none" stroke="var(--muted)" stroke-width="1.5"/>
    <text x="100" y="50" text-anchor="middle" fill="var(--text)" font-size="15" font-weight="bold" font-family="system-ui">Inhale</text>
    <text x="100" y="72" text-anchor="middle" fill="var(--muted)" font-size="11" font-family="system-ui">diaphragm contracts</text>
    <text x="100" y="96" text-anchor="middle" fill="var(--muted)" font-size="11" font-family="system-ui">heart fills with blood</text>
    <text x="100" y="122" text-anchor="middle" fill="var(--muted)" font-size="12" font-family="system-ui">HR &#x2191;</text>
    <!-- Arrow -->
    <line x1="190" y1="80" x2="215" y2="80" stroke="var(--text)" stroke-width="2" marker-end="url(#arrowhead-vagus)"/>
    <!-- Exhale box -->
    <rect x="220" y="20" width="160" height="120" rx="12" fill="none" stroke="var(--accent)" stroke-width="1.5"/>
    <text x="300" y="50" text-anchor="middle" fill="var(--accent)" font-size="15" font-weight="bold" font-family="system-ui">Exhale</text>
    <text x="300" y="72" text-anchor="middle" fill="var(--accent)" font-size="11" font-family="system-ui">vagus nerve activates</text>
    <text x="300" y="96" text-anchor="middle" fill="var(--accent)" font-size="11" font-family="system-ui">acetylcholine released</text>
    <text x="300" y="122" text-anchor="middle" fill="var(--accent)" font-size="12" font-family="system-ui">HR &#x2193;</text>
    <!-- Arrow marker definition -->
    <defs>
      <marker id="arrowhead-vagus" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="var(--text)"/>
      </marker>
    </defs>
  </svg>
</figure>
```

### 4. CSS for illustrations and dividers

Add to `styles.css`:

```css
/* ── Article illustrations ── */
.article-illustration {
  margin: 2rem 0;
  text-align: center;
}
.illustration-svg {
  width: 100%;
  max-width: 420px;
  height: auto;
  margin: 0 auto;
  display: block;
}
.section-divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 3rem 0;
  opacity: 0.5;
}
@media (max-width: 480px) {
  .illustration-svg {
    max-width: 100%;
  }
  .section-divider {
    margin: 2rem 0;
  }
}
```

**Check first:** if `.section-divider` or `.article-illustration` already exist in styles.css. If so, reuse the existing styles and don't duplicate.

## Do NOT

- Change article text content (paragraphs, headings, links)
- Remove or reorder sections
- Modify the FAQ section
- Modify the article CTA form
- Add JavaScript (ToC scrolling can be CSS-only with scroll-behavior: smooth on html)
- Add external images or assets — only inline SVGs
- Touch best-breathwork-apps.html or build-breathing-habit.html

## Acceptance Criteria

- [ ] Sticky ToC appears on desktop (positioned to the side or at the top)
- [ ] ToC links scroll to correct sections (smooth scroll)
- [ ] ToC collapses or stacks naturally on mobile (< 768px)
- [ ] 4 section dividers placed at topic transition points
- [ ] Seesaw illustration visible after "The Autonomic Seesaw" heading
- [ ] Breathing cycle illustration visible after "How Breathing Activates" heading
- [ ] Illustrations use site theme colors (--accent, --muted, --text)
- [ ] Illustrations scale correctly on mobile (no horizontal overflow)
- [ ] Article reads more easily with visual breaks
- [ ] No console errors

## Verification

1. Open blog/vagus-nerve-breathing.html at 1440px → ToC visible, illustrations render
2. Open at 375px → ToC stacks, illustrations fit, no overflow
3. Click ToC links → smooth scroll to sections
4. Check SVGs render with correct colors (amber accent for parasympathetic/exhale)

## Reporting
- Update TASKS.md status to DONE
