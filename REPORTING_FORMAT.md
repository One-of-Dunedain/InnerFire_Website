# Reporting Format

After completing each task, the Executor AI must append a report to `REPORT.md` using this exact format.

---

## Template

```md
---
## [TASK-XXX] Short task title
Date: YYYY-MM-DD
Status: DONE | FAILED | PARTIAL
Executor: Executor AI

### What was done
Concise summary of actions taken. One paragraph max.

### Files changed
- `path/to/file.ext` — what changed
- `path/to/new-file.ext` — created

### Acceptance Criteria Results
- [x] Criterion 1 — passed
- [x] Criterion 2 — passed
- [ ] Criterion 3 — FAILED: reason

### Behavior changes
List any user-visible changes. If none: "Behavior changes: none."

### Verification
- PASSED / FAILED / NOT RUN
- If run: what was tested and result
- If not run: why

### Issues encountered
List any problems, unexpected behavior, or blockers.
If none: "None."

### Recommended next action
What the Orchestrator should consider doing next based on this task's outcome.
```

---

## Rules for the Executor

1. Always append — never overwrite `REPORT.md`.
2. One report block per task.
3. If a task FAILED or was PARTIAL, clearly state what was not completed and why.
4. Behavior changes section is mandatory — write "Behavior changes: none." if there are none.
5. Verification section must state whether verification was actually run, not just proposed.
6. After writing the report: update `TASKS.md` task status and update `PROJECT_STATE.md`.
