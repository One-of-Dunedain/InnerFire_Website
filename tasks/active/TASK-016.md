## [TASK-016] Blog newsletter CTA + conversion nudge
Status: TODO
Priority: High
Owner: Executor AI
Depends on: TASK-013, TASK-014

### Goal
Add newsletter subscription sections to the blog index page and article pages. The UX should gently guide readers toward leaving their email for beta testing.

### Context
The landing page already has a Kit form (`action="https://app.kit.com/forms/9132207/subscriptions"`). The blog should have the same form with slightly different CTA copy that fits the blog context. Two placements: (1) bottom of blog index page, (2) end of each article, before the author card.

### Requirements

**In `blog.html` — add newsletter section BEFORE `<footer>`:**
```html
<!-- BLOG NEWSLETTER -->
<section class="blog-newsletter">
  <div class="container">
    <h2>Want to try InnerFire?</h2>
    <p class="blog-newsletter-sub">We're inviting 300 early testers. Leave your email to get a free TestFlight invite.</p>
    <form
      action="https://app.kit.com/forms/9132207/subscriptions"
      method="post"
      class="blog-newsletter-form"
      data-sv-form="9132207"
      data-uid="b081b4720d"
    >
      <input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
      <input type="text" name="fields[first_name]" placeholder="First Name" class="email-input" />
      <button class="btn-primary" type="submit">Get Early Access</button>
    </form>
    <p class="form-note">No spam. Just a beta invite when we're ready.</p>
  </div>
</section>
```

**In `blog/_template.html` — add inline CTA section AFTER the closing `</article>` tag, BEFORE `.article-author`:**
```html
<!-- Article CTA -->
<section class="article-cta">
  <div class="container article-container">
    <div class="article-cta-card">
      <h3>Feel your breath working</h3>
      <p>InnerFire turns your exhale into fire, sound, and vibration. Be one of 300 early testers.</p>
      <form
        action="https://app.kit.com/forms/9132207/subscriptions"
        method="post"
        class="article-cta-form"
        data-sv-form="9132207"
        data-uid="b081b4720d"
      >
        <input type="email" name="email_address" placeholder="Email Address" class="email-input" required />
        <button class="btn-primary" type="submit">Get Early Access</button>
      </form>
      <p class="form-note">No spam. Just a beta invite.</p>
    </div>
  </div>
</section>
```

**Add CSS to `styles.css`:**
```css
/* Blog newsletter section */
.blog-newsletter {
  padding: 80px 0;
  text-align: center;
  background:
    radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,138,61,0.06) 0%, transparent 70%),
    var(--bg);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.blog-newsletter h2 {
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 12px;
}
.blog-newsletter-sub {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 32px;
}
.blog-newsletter-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

/* Article inline CTA */
.article-cta {
  padding: 0 0 40px;
}
.article-cta-card {
  background: var(--surface);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 40px 32px;
  text-align: center;
}
.article-cta-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.article-cta-card p {
  color: var(--muted);
  font-size: 0.95rem;
  margin-bottom: 20px;
}
.article-cta-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
```

### Do NOT touch
- `index.html`
- `script.js`
- Existing signup section on landing page
- Footer HTML (except adding the new section before it in blog.html)

### Acceptance Criteria
- [ ] Blog index page has a newsletter section before the footer
- [ ] Newsletter section shows heading, subtitle, email input, first name input, submit button, and "no spam" note
- [ ] Article template has an inline CTA card after the article body
- [ ] Article CTA shows heading, description, email input, and submit button
- [ ] Both forms POST to the same Kit endpoint as the landing page
- [ ] Forms match the dark theme styling
- [ ] Inputs have the same `.email-input` styling as the landing page
- [ ] CTA card has a subtle surface background with border

### Verification
- Open `blog.html` — scroll to bottom, newsletter section is visible before footer
- Open `blog/_template.html` — CTA card appears after article text
- Submit a test email — form submits to Kit endpoint
- Check mobile (375px) — forms are usable and centered

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md

---
