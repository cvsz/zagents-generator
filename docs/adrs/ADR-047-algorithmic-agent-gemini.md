# ADR-047: The Algorithmic Agent Gemini — algorithms as the control plane

**Status**: Proposed
**Date**: 2026-06-16
**Project**: `ruvnet/agent-gemini-generator`
**Related**: ADR-002 (kernel boundary), ADR-006 (memory & learning), ADR-011 (witness & provenance), ADR-014 (self-evolution), ADR-022 (MCP primitive), ADR-040 (cost-optimal routing), ADR-043 (router training), `@metaharness/router`

---

## Context

A single agent fails because it folds reasoning, tool use, memory, routing, safety,
evaluation, and recovery into one fragile loop. When any sub-concern misbehaves —
a hallucinated tool call, an unbudgeted retry storm, a confident-but-wrong answer —
the whole loop is the blast radius, and nothing about the run is replayable.

The series already has the *pieces* of an answer: a router that chooses the cheapest
good-enough model (ADR-040/043), witness-bound receipts for provenance (ADR-011), a
memory bridge (ADR-006), default-deny MCP gating (ADR-022), and a self-evolution loop
(ADR-014). What is missing is the **control plane** that composes them: a deterministic
gemini that treats models as interchangeable workers and owns state, selection,
verification, cost, and governance itself.

> The model proposes. The gemini decides. The algorithms verify.

## Decision

Build an **Algorithmic Agent Gemini** — a dependency-free `@metaharness/gemini`
primitive — that wraps any model, tool, skill, or workflow with deterministic control
algorithms. The gemini, not the model, owns the run lifecycle.

### Core architecture (the execution loop)

```
User Goal → Intent Classifier → Planner → Algorithm Router → Agent Pool
          → Tool Layer → Verifier → Memory Update → Receipt Log → Result
```

### Gemini algorithms

| Module        | Algorithm                          | Purpose                          |
|---------------|------------------------------------|----------------------------------|
| Intent routing| Softmax classifier + rules         | Pick the workflow path           |
| Planning      | HTN / A\* style decomposition      | Goal → executable steps          |
| Agent select  | Contextual bandit (ε-greedy / UCB) | Choose the best worker per step  |
| Tool select   | Weighted utility scoring           | Balance cost, latency, risk      |
| Memory search | HNSW + reranker (via kernel)       | Retrieve relevant context        |
| Workflow      | DAG scheduler                      | Parallel + sequential execution  |
| Consensus     | Weighted majority / Borda count    | Merge multiple worker outputs    |
| Verification  | Property tests + critique loop     | Catch hallucinations / bad acts  |
| Safety        | Policy rules + risk scoring        | Block unsafe / costly operations |
| Learning      | Online reward update               | Improve future routing           |
| Recovery      | Circuit breaker + retry budget     | Prevent runaway loops            |
| Audit         | Hash-chained receipts              | Make every action replayable     |

### Key invariant — the decision rule

```
decision = argmax utility(action)

utility = quality_score
        − latency_cost
        − token_cost
        − risk_penalty
        + confidence_bonus
```

The gemini **never executes an action** unless **all four gates** hold:

```
confidence ≥ threshold   ∧   risk ≤ budget.risk
∧   cost ≤ budget.cost    ∧   verification == pass
```

The reference scoring weights mirror the ADR's decision logic
(`quality − 0.15·latency_s − 4.0·cost_usd − 2.5·risk`), exposed as tunable
`ScoringWeights` so a vertical can recalibrate without forking the kernel.

### Algorithm router — task type → strategy

The router maps an intent class to a deterministic strategy (an ordered set of step
kinds), e.g.:

- `coding` → planner + repo scanner + test runner + reviewer
- `research` → retrieval + source verifier + citation checker
- `security` → policy gate + sandbox + restricted tools (default-deny, ADR-022)
- `creative` → generator + critic + ranker

### Agent pool — workers, not sovereigns

Agents are specialised, replaceable workers (`planner`, `coder`, `reviewer`,
`researcher`, `tester`, `summarizer`, `security-auditor`, `cost-optimizer`). The pool
picks per step via a contextual bandit and applies an **online reward update** after
verification, so routing improves run-over-run (the ADR-014 learning loop, scoped to
worker selection).

### Verifier layer — independent of the proposer

Every meaningful output is checked by registered verifiers (syntax, unit tests, schema,
citation, policy, cost, regression). Verification is **adversarial by construction**:
the verifier is never the agent that produced the output, which is how the gemini
resists agents colluding on a bad answer.

### Receipts — hash-chained, replayable

Each step emits a receipt `{ run_id, step, input_hash, output_hash, prev_hash,
this_hash, agent, model, cost_usd, latency_ms, verdict }`. `this_hash` chains over
`prev_hash`, so `ReceiptLog.verify()` detects any tampering or reordering — the
provenance substrate from ADR-011, made first-class in the gemini.

## Consequences

- **The gemini becomes the durable asset.** Models are replaceable execution engines;
  algorithms are the reliability layer; memory is cumulative advantage; receipts are
  governance. This is the thesis of the whole series, now expressed as runnable code.
- **Determinism by default.** Given the same goal, policy, budget, and worker outputs,
  a run replays identically and the receipt chain verifies — a prerequisite for the
  ADR-007 CI guards and ADR-011 witnesses.
- **It composes, it does not replace.** `@metaharness/router` plugs in as the agent/
  model selector; the kernel memory bridge (ADR-006) backs memory search; MCP gating
  (ADR-022) is the safety layer's tool policy. The gemini is the conductor.
- **New surface to keep honest.** A control plane is a new thing to test, version, and
  document. Mitigated by strict module boundaries (one algorithm per module, no shared
  mutable state) and a London-school unit suite per module.

## Alternatives Considered

- **Smarter single agent / bigger model.** Rejected: ADR-038 measured that structure
  does not raise the quality ceiling, and a monolithic loop has no replay or governance.
- **Framework dependency (LangGraph / CrewAI / etc.).** Rejected: the series' value is a
  *dependency-free, witness-bound* kernel; importing a heavyweight orchestrator inverts
  the moat and drags in a runtime we cannot gate.
- **Fold the gemini into `@metaharness/kernel`.** Deferred: the kernel is the Rust→wasm
  cross-language core (ADR-002). The gemini is pure-TS control logic over pluggable
  workers; it ships as its own package and can be promoted into the kernel later if the
  invariants prove stable (the ADR-043 tiny-dancer pattern).

## Test Contract

For this decision to be considered shipped, `@metaharness/gemini` must ship with:

1. **Scoring** — `score()` implements the utility invariant; `canExecute()` returns
   `false` if *any* of the four gates (confidence/risk/cost/verification) fails.
2. **Receipts** — a hash-chained `ReceiptLog`; `verify()` passes for an untampered chain
   and fails when any field of any receipt is mutated.
3. **Safety** — `PolicyGate` blocks a denied tool and scores risk; a high-risk action is
   gated unless explicitly allowed.
4. **Recovery** — `CircuitBreaker` opens after the failure threshold and `RetryBudget`
   refuses spend past its cap (no runaway loops).
5. **Verifier** — a registry runs all verifiers; the critique loop repairs-then-passes
   or exhausts its budget.
6. **Consensus** — weighted majority and Borda produce the expected winner on a fixture.
7. **Agent pool** — bandit selection + online reward update shifts future picks toward
   the higher-reward worker.
8. **Kernel end-to-end** — `HarnessKernel.run(goal)` executes the 10-step loop on a
   deterministic fixture, gates an unbudgeted/unsafe action, retries-then-repairs a
   verification failure, and emits a verifiable receipt chain covering every step.

### Acceptance test (operational)

The gemini passes when a 100 mixed-task run achieves: ≥90% valid outputs, ≥95% trace
coverage, **zero** unbudgeted tool calls, <10% retry waste, all high-risk actions gated,
and a replayable receipt chain for every run.

## References

- ADR-011 (witness & provenance), ADR-014 (self-evolution), ADR-022 (MCP primitive),
  ADR-040/043 (routing) — the pieces this ADR composes.
- Auer et al., "Finite-time Analysis of the Multiarmed Bandit Problem" (UCB) — agent pool.
- de Borda, "Mémoire sur les élections au scrutin" — consensus.
- Nygard, *Release It!* (circuit breaker) — recovery.
