# Task Queue

Active task index only. Full task specifications are stored in tasks/active/.
Completed and superseded tasks are archived in archive/tasks/TASKS_ARCHIVE_2026-02-25.md.
Last optimized: 2026-02-25

## Execution Contract
1. Find the first section with Status: TODO.
2. Open the Spec file and execute from that file as source of truth.
3. After completion: set status to DONE here, append report in REPORT.md, update PROJECT_STATE.md, then archive finished task spec when instructed.

---

## [TASK-013] Blog index page — manifest system + article grid
Status: DONE
Priority: High
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-013.md
Goal: Transform `blog.html` from a "coming soon" shell into a dynamic blog index that reads posts from a JSON manifest and renders them as a responsive card grid. Create the manifest file and directory structure.

---

## [TASK-014] Blog article template with rich media support
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-013
Spec: tasks/active/TASK-014.md
Goal: Create a complete, reusable blog article HTML template (`blog/_template.html`) with support for optional vertical/horizontal videos, images, and audio players. Add all necessary article typography and media styles to `styles.css`.

---

## [TASK-015] Blog sharing buttons + social meta
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-013, TASK-014
Spec: tasks/active/TASK-015.md
Goal: Add share buttons to blog article pages and blog index cards so any article can be easily shared to all modern social platforms.

---

## [TASK-016] Blog newsletter CTA + conversion nudge
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-013, TASK-014
Spec: tasks/active/TASK-016.md
Goal: Add newsletter subscription sections to the blog index page and article pages. The UX should gently guide readers toward leaving their email for beta testing.

---

## [TASK-017] Site-wide SEO enhancements
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: TASK-014
Spec: tasks/active/TASK-017.md
Goal: Add structured data (JSON-LD), `sitemap.xml`, `robots.txt`, and canonical URLs to improve search engine optimization across the entire site.

---

## [TASK-018] GA4 + Microsoft Clarity analytics preparation
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-018.md
Goal: Add placeholder script tags for Google Analytics 4 (GA4) and Microsoft Clarity to all pages so the owner can activate tracking by replacing the measurement IDs.
