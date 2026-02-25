# Orchestrator Notes — TASKS Optimization

## What was changed
1. `TASKS.md` was converted from a long monolith into an active index.
2. Full task details were split into per-task spec files:
   - `tasks/active/TASK-013.md`
   - `tasks/active/TASK-014.md`
   - `tasks/active/TASK-015.md`
   - `tasks/active/TASK-016.md`
   - `tasks/active/TASK-017.md`
   - `tasks/active/TASK-018.md`
3. Historical completed/superseded tasks remain in archive:
   - `archive/tasks/TASKS_ARCHIVE_2026-02-25.md`

## Why this improves quality
- The executor now loads one task spec at a time, not all tasks at once.
- Less context noise reduces instruction misses and accidental cross-task mixing.
- Spec fidelity is preserved because details were not deleted; only relocated.

## Measured reduction
- `TASKS.md` now: 56 lines (active index)
- Full active specs: 987 lines (kept in `tasks/active/`)
- Practical effect: routine task selection reads ~95% fewer lines from `TASKS.md`.

## Operating contract (for orchestrator)
- Add/update metadata in `TASKS.md`.
- Put full requirement text in `tasks/active/TASK-0XX.md`.
- Keep one canonical spec per active task.
- When task is done, archive spec in `archive/tasks/` and remove it from active index.

## Safety notes
- This change does not alter product code behavior.
- It changes only task governance structure and AI execution ergonomics.