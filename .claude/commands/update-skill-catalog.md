---
name: update-skill-catalog
description: Workflow command scaffold for update-skill-catalog in zagents-generator.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-skill-catalog

Use this workflow when working on **update-skill-catalog** in `zagents-generator`.

## Goal

Updates or imports new skills and agents into the skill catalog definition file.

## Common Files

- `packages/create-agent-gemini/templates/catalog.def.mjs`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit packages/create-agent-gemini/templates/catalog.def.mjs to add or update skills/agents
- Commit changes with a message referencing skills or catalog

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.