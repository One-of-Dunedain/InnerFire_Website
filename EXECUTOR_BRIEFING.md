# Executor Briefing - Task Execution Model (Feb 26 batch)

## Source of truth
- `TASKS.md` = active task index only (short metadata + execution order)
- `tasks/active/TASK-0XX.md` = full specification for each active task
- `archive/tasks/` = completed/superseded task definitions
- `REPORT.md` = current cycle reports only
- `archive/reports/` = historical reports

## Required execution flow
1. Open `TASKS.md`.
2. Find first task with `Status: TODO`.
3. Open its `Spec` path (for example `tasks/active/TASK-019.md`).
4. Execute exactly from that spec.
5. Run verification listed in spec.
6. Update status in `TASKS.md` to `DONE`.
7. Append report in `REPORT.md` using `REPORTING_FORMAT.md`.
8. Update `PROJECT_STATE.md`.

## Current active queue (8 tasks)

| # | Task | Summary | Depends on |
|---|------|---------|------------|
| 1 | TASK-019 | Text cleanup: remove "—", fix grammar, "we"→"I" | none |
| 2 | TASK-020 | Hero: 16 embers, stronger glow, gradient tagline, "Take a look" CTA | 019 |
| 3 | TASK-021 | About: "From Ukraine, with a purpose" + new text | 019 |
| 4 | TASK-022 | Blur reveal on "Why it works" descriptions | 019 |
| 5 | TASK-023 | Ambient embers across all dark sections | 020 |
| 6 | TASK-024 | GA4/Clarity custom event tracking in script.js | none |
| 7 | TASK-025 | SEO: theme-color, preconnect, heading hierarchy, alt texts | 019, 021 |
| 8 | TASK-026 | Blog UX/UI audit + fixes | 019, 023 |

## Recommended execution order
019 → 020 → 021 → 022 → 024 → 023 → 025 → 026

(019 first because it's a prerequisite for 020/021/022/025/026. 024 is independent.)

## Non-negotiables
- Do not improvise task requirements — follow the spec exactly.
- Keep static architecture (no build step, no npm, no dependencies).
- Respect `Do NOT touch` sections in each task spec.
- All changes must work on Mobile (375px), Tablet (768px), Desktop (1024px+).
- CSS variables: `--bg`, `--surface`, `--accent`, `--accent2`, `--text`, `--muted`, `--radius`.
- Respect `@media (prefers-reduced-motion: reduce)` for all animations.

## Key files
- `index.html` — main landing page (most tasks modify this)
- `blog.html` — blog index
- `blog/_template.html` — article template
- `styles.css` — all styles
- `script.js` — all JS behavior
