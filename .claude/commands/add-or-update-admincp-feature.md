---
name: add-or-update-admincp-feature
description: Workflow command scaffold for add-or-update-admincp-feature in zagents-generator.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-admincp-feature

Use this workflow when working on **add-or-update-admincp-feature** in `zagents-generator`.

## Goal

Adds new features or updates to the Admin Control Panel in the web UI.

## Common Files

- `apps/web-ui/src/components/AdminCP.tsx`
- `apps/web-ui/src/App.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or create apps/web-ui/src/components/AdminCP.tsx
- Optionally update apps/web-ui/src/App.tsx to integrate AdminCP changes
- Commit changes with a message referencing AdminCP

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.