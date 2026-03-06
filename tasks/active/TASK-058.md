# TASK-058: Rewrite signup form copy — TestFlight + Discord explained

## Recovery (read after context compaction)
You are executing TASK-058 for InnerFire website.
Re-read this file from the top. Check Acceptance Criteria for items marked [x].
Continue from the first unchecked [ ] item.

---

Status: TODO
Priority: High
Owner: Executor AI
Depends on: none

## Context

The signup section on the landing page says "Leave your email → get free TestFlight access when I launch." Most people don't know what TestFlight is. The form copy needs to clearly explain:
1. What they get: an invite to test the iOS app via Apple TestFlight
2. What TestFlight is: Apple's official way to test apps before they're on the App Store
3. They also get access to a private Discord server for testers to share feedback

The same CTA text appears on article pages (article-cta sections). Update those too.

**This task modifies 5 files.**

## File Operations

| Action | File |
|--------|------|
| MODIFY | `index.html` |
| MODIFY | `blog/best-breathwork-apps.html` |
| MODIFY | `blog/vagus-nerve-breathing.html` |
| MODIFY | `blog/build-breathing-habit.html` |
| MODIFY | `blog.html` |

## Implementation

### index.html — Main signup section (around line 203-211)

**Find:**
```html
<h2>Be one of 300 early testers.</h2>
<p class="signup-sub">Leave your email &rarr; get free TestFlight access when I launch.</p>
<p class="signup-note">No spam. Just a beta invite when I'm ready.</p>
```

**Replace with:**
```html
<h2>Be one of 300 early testers.</h2>
<p class="signup-sub">Leave your email &rarr; get an invite to test InnerFire before it hits the App Store.</p>
<p class="signup-note">You'll get a link to <strong>Apple TestFlight</strong> (Apple's official beta testing app) + access to our private <strong>Discord</strong> for testers.</p>
```

### blog/vagus-nerve-breathing.html — Article CTA (around line 258-259)

**Find:**
```html
<h3 class="article-cta-title">Want to try InnerFire?</h3>
<p class="article-cta-sub">I'm inviting 300 early testers. Leave your email to get a free TestFlight invite.</p>
```
and further down:
```html
<p class="form-note">No spam. Just a beta invite when I'm ready.</p>
```

**Replace with:**
```html
<h3 class="article-cta-title">Want to try InnerFire?</h3>
<p class="article-cta-sub">Leave your email to get an invite via <strong>Apple TestFlight</strong> (Apple's official app for testing new apps before they launch) + access to our private <strong>Discord</strong> for early testers.</p>
```
and:
```html
<p class="form-note">No spam. Just a TestFlight invite + Discord link when I'm ready.</p>
```

### blog/build-breathing-habit.html — Same article CTA pattern

Find the same `article-cta-title`, `article-cta-sub`, and `form-note` text. Apply the same replacement as vagus-nerve-breathing.html above.

### blog/best-breathwork-apps.html — Same article CTA pattern

Find the same `article-cta-title`, `article-cta-sub`, and `form-note` text. Apply the same replacement.

### blog.html — Newsletter section

Find the newsletter section heading and subtitle. Apply similar copy:

**Find the text** like "Stay in the loop" or equivalent signup text.

**Replace** the subtitle with: the same TestFlight + Discord explanation, keeping it concise for a blog context.

## Tone guidance

- Casual, direct, human
- Assume the reader has never heard of TestFlight
- Keep it short — one sentence to explain TestFlight, one to mention Discord
- Don't say "beta" without context — say "test the app before it launches"

## Do NOT

- Change the form fields, action URL, or Kit form IDs
- Change the button text "Get Early Access"
- Change the honeypot field
- Modify styles.css or script.js
- Add new HTML elements or sections — only change text content
- Remove the `<strong>` tags around "Apple TestFlight" and "Discord"

## Acceptance Criteria

- [ ] index.html: signup section explains TestFlight + Discord
- [ ] vagus-nerve-breathing.html: article CTA explains TestFlight + Discord
- [ ] build-breathing-habit.html: article CTA explains TestFlight + Discord
- [ ] best-breathwork-apps.html: article CTA explains TestFlight + Discord
- [ ] blog.html: newsletter section explains TestFlight + Discord
- [ ] All form functionality unchanged (submit still works)
- [ ] Copy is clear to someone who doesn't know what TestFlight is
- [ ] No typos or broken HTML

## Verification

```bash
# Check new copy is present
grep -n "TestFlight" index.html blog.html blog/vagus-nerve-breathing.html blog/build-breathing-habit.html blog/best-breathwork-apps.html
grep -n "Discord" index.html blog.html blog/vagus-nerve-breathing.html blog/build-breathing-habit.html blog/best-breathwork-apps.html
```

## Reporting
- Update TASKS.md status to DONE
