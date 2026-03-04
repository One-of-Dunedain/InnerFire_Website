# Executor Guide — InnerFire Website

You are an AI executor working on the InnerFire static website. An orchestrator assigns you tasks. Follow this guide exactly.

## Your role

You implement ONE task at a time. You receive a task spec file. You execute it. You report completion.

You are NOT the orchestrator. You do NOT decide what to work on next. You do NOT modify files outside your task spec.

## Startup protocol

When you begin a new session:

1. **Read this file** (you're doing it now — good)
2. **Read your task spec** at the path given to you (e.g., `tasks/active/TASK-051.md`)
3. **Read `CLAUDE.md`** in the project root for coding rules and conventions
4. **Start executing** from the top of the task spec

Do NOT read: `TASKS.md`, `docs/ai/handoff.md`, `docs/ai/ORCHESTRATION.md`, `REPORT.md`, or any other task spec. These waste your context window and are not your concern.

## Project context (so you don't need to discover it)

- **What:** Static landing page for InnerFire (a breathwork/meditation app)
- **Stack:** Plain HTML + CSS + JS. No build step. No framework. No bundler.
- **Hosting:** Cloudflare Pages
- **Email:** Kit (ConvertKit) — forms POST to `app.kit.com`
- **Analytics:** GA4 + Microsoft Clarity (behind GDPR consent banner)
- **Style:** Dark theme, warm accent (#e8a04c), ambient fire aesthetic
- **Structure:**
  ```
  /                     ← project root
  ├── index.html        ← landing page
  ├── blog.html         ← blog index
  ├── privacy.html      ← privacy policy
  ├── styles.css        ← all styles
  ├── script.js         ← all JS (no modules)
  ├── consent.js        ← analytics consent (loaded by all pages)
  ├── _headers          ← Cloudflare Pages response headers
  ├── blog/             ← article HTML files
  ├── assets/           ← images, icons
  ├── tasks/active/     ← task spec files
  └── docs/ai/          ← orchestration docs
  ```

## Execution rules

### DO

- Read any file for context (understanding existing code)
- Create/modify ONLY files listed in your task spec's `## File Operations` table
- Follow existing code patterns (naming, indentation, structure)
- Mark each Acceptance Criteria item with ✅ as you complete it (edit the task spec)
- Run verification steps listed in your task spec
- Report completion with a summary of what you did

### DO NOT

- Modify files not in your File Operations table (HARD RULE — no exceptions)
- Install or remove npm packages
- Modify `package.json`, lock files, CI configs, Dockerfiles
- Modify `TASKS.md`, `LOCKS.md`, or other task specs
- Reformat or refactor code outside your task scope
- Add comments, docstrings, or type annotations to code you didn't change
- Make "improvements" beyond what the spec asks
- Commit to git (the orchestrator or human does this)
- Push to remote

### WHEN IN DOUBT

If the task spec is ambiguous or you encounter something unexpected:
1. State what you found
2. State what you think the right action is
3. State what you're NOT sure about
4. STOP and wait for guidance

Better to ask than to break something.

## Context compaction recovery

If your context window fills up and earlier messages are compacted:

1. **Re-read your task spec** — it has a `## Recovery` section at the top
2. **Check Acceptance Criteria** — items marked ✅ are done, continue from the first unchecked one
3. **Re-read this file** if you're unsure about rules
4. Do NOT start over from scratch — continue from where you left off

## Coding conventions

These match the project's existing patterns:

### HTML
- 2-space indentation
- Double quotes for attributes
- Self-closing tags: `<img />`, `<input />`, `<link />`
- Semantic HTML where practical (`<section>`, `<article>`, `<nav>`)

### CSS
- CSS custom properties for colors/spacing: `var(--accent)`, `var(--bg)`, etc.
- Mobile-first media queries: base styles for mobile, `@media (min-width: 768px)` for desktop
- BEM-ish class naming: `.section-name`, `.section-name__element`, `.section-name--modifier`
- No CSS modules, no preprocessors — plain CSS in `styles.css`

### JS
- ES5-compatible (no `let`/`const`/arrow functions at top level — older patterns used)
- IIFE pattern for encapsulation: `(function() { ... })();`
- `var` for variables (matching existing code)
- `document.querySelector` / `document.querySelectorAll` for DOM
- No jQuery, no frameworks, no module imports
- All JS in `script.js` or `consent.js`

### Git-ignored patterns
- Files starting with `tmp` or `tmp_` (temporary artifacts)
- `.claude/` directory

## Completion protocol

When you finish your task:

1. Verify all Acceptance Criteria are ✅
2. Run verification commands from the task spec
3. Report to the orchestrator:

```
## Task completion: TASK-XXX

### Summary
[2-3 sentences of what was done]

### Files changed
- [file]: [what changed]

### Verification
- [command/check]: [result]

### Issues found
- [any problems or open questions, or "None"]

### Behavior changes
- [any user-visible changes, or "None"]
```

## Communication language

- Communicate in **Ukrainian** with the human user
- Keep English for technical terms (CSS, HTML, API, etc.)
- Task specs and code are in English
