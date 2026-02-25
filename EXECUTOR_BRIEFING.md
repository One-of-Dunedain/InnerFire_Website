# Executor Briefing — Task Execution Model (Optimized)

## Purpose
Keep execution quality high while reducing context/token overhead.

## Source of truth
- `TASKS.md` = active task index only (short metadata + execution order)
- `tasks/active/TASK-0XX.md` = full specification for each active task
- `archive/tasks/` = completed/superseded task definitions
- `REPORT.md` = current cycle reports only
- `archive/reports/` = historical reports

## Required execution flow
1. Open `TASKS.md`.
2. Find first task with `Status: TODO`.
3. Open its `Spec` path (for example `tasks/active/TASK-013.md`).
4. Execute exactly from that spec.
5. Run verification listed in spec.
6. Update status in `TASKS.md` to `DONE`.
7. Append report in `REPORT.md` using `REPORTING_FORMAT.md`.
8. Update `PROJECT_STATE.md`.

## Why this structure
- The executor reads only one active spec instead of a monolithic file.
- Lower context load means fewer omissions and better instruction fidelity.
- Specs stay detailed; index stays fast.

## Current active queue
- TASK-013 > TASK-014 > TASK-018 > TASK-015 > TASK-016 > TASK-017

## Non-negotiables
- Do not improvise task requirements.
- Keep static architecture (no build step) unless explicitly requested.
- Respect `Do NOT touch` sections in each task spec.