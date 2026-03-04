# Multi-Executor Orchestration System

## Architecture

```
                    ┌─────────────┐
                    │   Human     │
                    │  (Owner)    │
                    └──────┬──────┘
                           │ approves / steers
                    ┌──────▼──────┐
                    │ Orchestrator│  Claude Opus — plans, specs, assigns, merges
                    │   (this)    │
                    └──┬──────┬───┘
                       │      │
              ┌────────▼┐  ┌──▼────────┐
              │Executor 1│  │Executor 2 │  Codex 5.3 — implements tasks
              │  (E1)    │  │  (E2)     │
              └──────────┘  └───────────┘
```

## Core Problem

Two executors working simultaneously on the same codebase WILL create merge conflicts and break each other's work if they touch the same files. The system must make this **impossible by design**.

## Solution: File-Zone Isolation

Every task spec has a `## File Operations` table listing EXACTLY which files it reads/creates/modifies. This is the **contract**.

### Rule 1: No Shared Files

The orchestrator NEVER assigns two tasks in parallel if their File Operations tables share any file.

**Safe parallel pair:**
```
TASK-051: CREATE _headers          ← file zone A
TASK-048: MODIFY consent.js        ← file zone B
→ No overlap → SAFE to run in parallel
```

**Unsafe parallel pair:**
```
TASK-047: MODIFY script.js, MODIFY index.html, MODIFY blog.html
TASK-049: MODIFY index.html, MODIFY script.js
→ index.html + script.js overlap → MUST be sequential
```

### Rule 2: Lock File

File `tasks/LOCKS.md` is the single source of truth for who owns what right now.

```markdown
# File Locks
Last updated: 2026-03-04T14:00Z

| File | Executor | Task | Since |
|------|----------|------|-------|
| _headers | E1 | TASK-051 | 2026-03-04T14:00Z |
| consent.js | E2 | TASK-048 | 2026-03-04T14:00Z |
```

**Protocol:**
1. Orchestrator writes locks BEFORE assigning tasks
2. Executor checks LOCKS.md at start — if their files are locked by someone else → STOP, report conflict
3. Executor NEVER modifies files not in their task spec
4. Orchestrator clears locks after task completion is verified

### Rule 3: Executor Scope Fence

Executors are FORBIDDEN from:
- Modifying files not listed in their task's `## File Operations`
- Reading or modifying `TASKS.md` (orchestrator's file)
- Reading or modifying `LOCKS.md` (orchestrator's file)
- Reading or modifying other task specs
- Installing/removing dependencies
- Modifying protected areas (see CLAUDE.md)

Executors MAY:
- Read any file for context (understanding existing patterns)
- Read their own task spec (REQUIRED at start and after compaction)
- Create files listed in their File Operations
- Run verification commands listed in their task spec

## Token Efficiency

### Problem
Codex 5.3 models have limited context windows. Reading large files wastes tokens and causes earlier compaction.

### Solutions

#### A. Self-contained task specs

Each task spec includes:
- **Inline code snippets** showing exactly what to find and what to write (before/after)
- **Exact file paths** — no searching needed
- **Line number hints** — approximate locations for edits
- No references to other task specs or handoff.md

#### B. Minimal bootstrap prompt

Each executor session starts with ONE prompt:

```
Read `docs/ai/EXECUTOR_GUIDE.md`, then read your assigned task spec at
`tasks/active/TASK-XXX.md`. Execute the task following the guide's protocol.
```

That's it. Two file reads. No TASKS.md, no handoff.md, no REPORT.md, no ORCHESTRATION.md.

#### C. Context compaction recovery

Every task spec has this section at the top:

```
## Recovery (read this after context compaction)
You are executing TASK-XXX for the InnerFire website (static HTML/CSS/JS).
Re-read this file from the top. Your progress checkpoints are marked with
✅ in the Acceptance Criteria section below.
```

Executors mark each acceptance criterion with ✅ as they complete it, so after compaction they know what's done.

#### D. Orchestrator token efficiency

The orchestrator (me) avoids:
- Re-reading files already read in this session
- Running exploratory agents for well-understood tasks
- Writing verbose explanations in task specs (code > words)
- Repeating information that's already in CLAUDE.md

## Parallel Execution Matrix

Based on File Operations of current tasks:

```
           | index | blog | articles | script | styles | consent | _headers | privacy | Worker |
TASK-048   |       |      |          |        |        |    M    |          |         |        |
TASK-049   |   M   |      |          |   M    |   M    |         |          |         |   C    |
TASK-050   |   -   |  -   |    -     |   -    |   -    |    -    |    -     |    -    |   -    |  (read-only QA)
TASK-051   |       |      |          |        |        |         |    C     |         |        |
TASK-052   |       |      |          |        |        |         |    M     |         |        |

C = CREATE, M = MODIFY, - = READ only
```

**Safe parallel pairs:**
- TASK-048 + TASK-051 ✅ (consent.js vs _headers — no overlap)
- TASK-048 + TASK-049 ✅ (consent.js vs index/script/styles/worker — no overlap)
- TASK-051 + TASK-049 ✅ (_headers vs index/script/styles/worker — no overlap)

**Unsafe pairs:**
- TASK-051 + TASK-052 ❌ (both touch _headers)
- TASK-050 with anything ❌ (QA reads everything — run last, alone)

## Assignment Protocol

### Step 1: Orchestrator selects parallel-safe pair
Check File Operations tables → find tasks with zero file overlap → assign one per executor.

### Step 2: Orchestrator writes LOCKS.md
List all files for both tasks → commit lock.

### Step 3: Orchestrator gives each executor their bootstrap prompt
```
Executor 1: Read docs/ai/EXECUTOR_GUIDE.md → execute tasks/active/TASK-051.md
Executor 2: Read docs/ai/EXECUTOR_GUIDE.md → execute tasks/active/TASK-048.md
```

### Step 4: Executors work independently
No communication between executors. Each follows their spec.

### Step 5: Orchestrator verifies
When executor reports completion:
1. Check all Acceptance Criteria are ✅
2. Verify no files outside File Operations were modified (`git diff --stat`)
3. Run any cross-task integration checks
4. Clear locks in LOCKS.md
5. Update TASKS.md status to DONE

### Step 6: Next pair
Pick next parallel-safe pair from TODO queue → repeat.

## Error handling

### Executor is stuck
- Executor should describe the blocker in their completion message
- Orchestrator reads the issue, modifies the task spec with clarification, re-assigns

### Executor modified wrong files
- Orchestrator reverts the unauthorized changes (`git checkout -- <file>`)
- Re-assigns the task with a warning

### Merge conflict after both finish
- Should NOT happen if File Operations are correct
- If it does: orchestrator resolves manually, adds the conflicting file to both specs' File Operations for future reference

### Executor's context compacted
- Executor re-reads their task spec (has Recovery section at top)
- Checks Acceptance Criteria for ✅ marks → knows what's done
- Continues from first unchecked criterion

## Future improvements

1. **Automated lock checking** — git pre-commit hook that reads LOCKS.md and rejects commits touching locked files
2. **Task dependency bot** — script that reads all task specs' File Operations and outputs the safe-parallel matrix automatically
3. **Progress webhook** — executors write to a shared `tasks/PROGRESS.md` with timestamps
