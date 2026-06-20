# ADR-147: Deep-integrate Darwin Mode into the `zagents` scaffolder

**Status**: Accepted (implemented, tested, published) — `zagents@0.2.0`
**Date**: 2026-06-18
**Project**: `ruvnet/zagents-generator`
**Related**: ADR-070…146 (Darwin Mode), ADR-145 (router proposal), the `zagents` scaffolder (`packages/create-agent-gemini`)

> Previously `zagents` (the `npx zagents` scaffolder) and `@zagents/darwin` (the evolutionary engine) were sibling packages with **no integration** — generated harnesses shipped only a stub `evolve` skill. This makes the integration real: every scaffolded gemini gets working Darwin Mode self-improvement out of the box.

## Decision

The `scaffold()` pipeline deep-integrates `@zagents/darwin` **by default** (opt out with `--no-darwin`). For each generated gemini it injects, at the single DRY post-render point in `src/index.ts` (so all 18 templates benefit, no per-template edits):

1. **Dependency** — `devDependencies["@zagents/darwin"] = "^0.2.0"`.
2. **Scripts** — `npm run evolve` (real substrate: runs the gemini's own test command per variant) and `npm run evolve:dry` (mock substrate: fast, fully offline).
3. **A real `evolve` skill** (`.claude/skills/evolve/SKILL.md`) wired to the darwin CLI, replacing the generic stub — documents the run commands and the safety model.

## Secure by default

The integration is air-gapped and key-free unless the user opts into the LLM mutator:

- The darwin **CLI defaults to the DeterministicMutator** — **no network, no API key**. (The OpenRouter/LLM mutator is library-only, not wired into the generated scripts.)
- Every mutation passes the existing **`validateGeneratedCode` gate**: no new imports, network, filesystem, shell, env, or dependencies — pure refactor/tuning.
- Mutations run in a **sandbox**; only variants that pass the gemini's tests are archived; nothing is promoted without measured improvement.

## Validation (real, this session)

- **Unit tests** (`__tests__/darwin-integration.test.ts`, 3): default-on injects dep + scripts + skill; `--no-darwin` cleanly omits all; arg parsing of `--darwin`/`--no-darwin`. **Full suite: 299/299 pass** (no regressions).
- **End-to-end:** scaffolded a minimal gemini → `npm install @zagents/darwin@0.2.0` (the published package, 57 deps, 11s) → `npm run evolve:dry` **actually evolved**: Winner `g2_v5`, lineage `baseline → g1_v0 → g2_v5`, **+0.110 over baseline**, fully offline. The integration works against the real published engine, not a mock.

## Consequences

- `npx zagents <name>` now produces a gemini that can **self-improve via real Darwin Mode** (`npm run evolve`), not a stub. The two packages are unified.
- Optionality preserved: `--no-darwin` for users who don't want it; the dep is `devDependencies` (not shipped in the gemini's runtime).
- Shipped in **`zagents@0.2.0`**.

## Validation artifacts

`src/index.ts` (scaffold integration block + `--darwin`/`--no-darwin` flag), `__tests__/darwin-integration.test.ts`, published `zagents@0.2.0`. Reproducible: `npx zagents x && cd x && npm i && npm run evolve:dry`.
