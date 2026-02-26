# TASK-021: About section rewrite + UI refresh

Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-019

## Goal
Replace the "Built from the front line" section with new title "From Ukraine, with a purpose" and owner-provided body text. Improve the UI/UX of this section for better emotional impact.

## Context
The owner wants a more personal, warm tone. The section tells the story of why InnerFire was built — from the war in Ukraine. The new text is more conversational and includes a touch of humor.

## Requirements

### 1. Replace content in `index.html`

Change the about section content to:
```html
<!-- ABOUT -->
<section class="about">
  <div class="container">
    <div class="about-card">
      <div class="about-photo">
        <!-- Replace with real photo: <img src="./author.jpg" alt="Maryan Kushnir" /> -->
        <div class="photo-placeholder"></div>
        <p class="about-photo-label">Linkedin</p>
      </div>
      <div class="about-text">
        <h2>From Ukraine, with a purpose</h2>
        <p>Hi, I'm Maryan Kushnir. I live in Ukraine.</p>
        <p>When the full-scale invasion started, I, like millions of Ukrainians, needed something to cope with the stress of war, insomnia, etc.</p>
        <p>I decided to try breathing exercises.</p>
        <p>Meditation apps and breathing timers feel abstract when you're under a ballistic missile attack, trust me. 😄</p>
        <p>I needed something capable of quickly shifting my brain's attention.</p>
        <p>So I built InnerFire for myself, because I needed it to survive.</p>
        <p class="about-highlight">InnerFire - it's just a tool.<br>The solution was always in your head.</p>
        <div class="about-shelter-photo">
          <!-- Replace with real image: <img src="./bomb-shelter.jpg" alt="Bomb shelter in Ukraine" /> -->
          <div class="shelter-photo-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Note: The owner typed "Marian" in Notion but all project references use "Maryan" — use "Maryan" for consistency.

### 2. Style the closing highlight line

**In `styles.css`**, add:
```css
.about-highlight {
  color: var(--text);
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: 20px;
  padding: 16px 20px;
  border-left: 3px solid var(--accent);
  background: rgba(255,138,61,0.04);
  border-radius: 0 var(--radius) var(--radius) 0;
}
```

### 3. UI/UX improvements (executor discretion)

Consider these optional enhancements (implement if they improve the section):
- Slightly increase spacing between paragraphs for the longer text
- Ensure the emoji (😄) renders well on all platforms
- The text is longer now — verify it reads well on mobile without feeling cramped

## Do NOT touch
- Hero section
- Carousel section
- Signup section
- `script.js`
- `blog.html`, `blog/_template.html`

## Acceptance Criteria
- [ ] Section title is "From Ukraine, with a purpose"
- [ ] Body text matches the owner-provided copy exactly (with "Maryan" spelling)
- [ ] Closing highlight line ("InnerFire - it's just a tool...") has accent border styling
- [ ] Section reads well on mobile (375px) — no cramped text
- [ ] Section reads well on desktop — proper spacing
- [ ] Photo placeholders still present and styled
- [ ] Emoji renders correctly

## Verification
- Open index.html — scroll to about section
- Verify title says "From Ukraine, with a purpose"
- Verify all 7 paragraphs + highlight are present
- Resize to 375px — text wraps cleanly, no overflow
- Verify highlight line has accent left border

## Reporting
- Update TASKS.md status to DONE
- Append report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
