# Task Queue

Active task index only. Full task specifications are stored in `tasks/active/`.
Completed and superseded tasks are archived in `archive/tasks/`.
Last updated: 2026-03-01

Archived blocks:
- `archive/tasks/TASKS_ARCHIVE_2026-02-25.md`
- `archive/tasks/TASKS_ARCHIVE_2026-02-27.md`
- `archive/tasks/TASKS_ARCHIVE_2026-03-01.md`

## Execution Contract
1. Find the first section with `Status: TODO`.
2. Open the Spec file and execute from that file as source of truth.
3. After completion: set status to `DONE` here, append report in `REPORT.md`, update `PROJECT_STATE.md`.

---

## [TASK-024] GA4 + Clarity with custom event tracking
Status: TODO
Priority: Medium
Owner: Executor AI
Depends on: none
Spec: tasks/active/TASK-024.md
Goal: Add conversion event tracking (form submits, share clicks, CTA clicks) to script.js. GA4/Clarity snippets stay commented.

---

## [TASK-030] Write "Best Breathwork Apps" article + AI optimization
Status: DONE
Priority: High
Owner: Executor AI
Depends on: TASK-028, TASK-029
Spec: tasks/active/TASK-030.md
Goal: Create blog/best-breathwork-apps.html with full content, Schema.org (ItemList + FAQPage), update posts.json, create llms.txt for AI discoverability.
