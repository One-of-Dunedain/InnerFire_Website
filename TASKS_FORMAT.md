# Task Format

Use this format when assigning tasks to Executor AI.

## Rules
- One task per block.
- Start with status `TODO`.
- Keep requirements explicit and verifiable.
- If something must not be changed, list it under `Do NOT touch`.

## Template

```md
## [TASK-XXX] Short task title
Status: TODO
Priority: High | Medium | Low
Owner: Executor AI

### Goal
What must be delivered.

### Context
Relevant background, constraints, and links.

### Requirements
- Exact implementation requirements.
- Files to create/update.
- Any technical constraints.

### Do NOT touch
- file/or/area/that/must/not/change

### Acceptance Criteria
- [ ] Concrete check 1
- [ ] Concrete check 2
- [ ] Concrete check 3

### Verification
- Commands or manual steps to verify result.

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
```

## Example

```md
## [TASK-001] Add healthcheck page
Status: TODO
Priority: Medium
Owner: Executor AI

### Goal
Create `/health` page that returns "OK".

### Context
Static site project. Keep implementation minimal.

### Requirements
- Add `health.html` in project root.
- Add link to `index.html` footer.

### Do NOT touch
- styles.css
- script.js

### Acceptance Criteria
- [ ] `health.html` exists
- [ ] Opening `/health.html` shows "OK"
- [ ] Footer has a link to health page

### Verification
- Run local server
- Open `/health.html` in browser

### Reporting
- Update TASKS.md status from TODO to DONE
- Append execution report to REPORT.md using REPORTING_FORMAT.md
- Update PROJECT_STATE.md
```
