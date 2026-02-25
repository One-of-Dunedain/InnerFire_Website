## [TASK-018] GA4 + Microsoft Clarity analytics preparation
Status: TODO
Priority: Medium
Owner: Executor AI

### Goal
Add placeholder script tags for Google Analytics 4 (GA4) and Microsoft Clarity to all pages so the owner can activate tracking by replacing the measurement IDs.

### Context
The owner plans to integrate GA4 and Clarity but does not have measurement IDs yet. The placeholders should be clearly commented, easy to activate (just replace the ID and remove comment delimiters), and placed consistently across all pages: `index.html`, `blog.html`, and `blog/_template.html`. Scripts are wrapped in HTML comments so they are inactive by default.

### Requirements

**Add to `<head>` of `index.html`, `blog.html`, AND `blog/_template.html` — right after the `<meta charset>` line:**

```html
<!-- Google Analytics 4 — Remove comment delimiters and replace G-XXXXXXXXXX with your GA4 Measurement ID to activate -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->

<!-- Microsoft Clarity — Remove comment delimiters and replace XXXXXXXXXX with your Clarity Project ID to activate -->
<!--
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","XXXXXXXXXX");
</script>
-->
```

### Do NOT touch
- `styles.css`
- `script.js`
- Any HTML content/sections
- Any existing `<head>` meta tags (only add new lines after charset)

### Acceptance Criteria
- [ ] GA4 placeholder snippet is present in `index.html`, `blog.html`, and `blog/_template.html`
- [ ] Clarity placeholder snippet is present in all three pages
- [ ] Both snippets are commented out (inactive by default)
- [ ] Each snippet has clear activation instructions in the comment
- [ ] Snippets are placed consistently in the same position across all pages
- [ ] Page loads are not affected (no console errors from analytics)

### Verification
- Open each page in browser — no console errors
- View source of each page — both placeholder snippets are present and commented out

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
