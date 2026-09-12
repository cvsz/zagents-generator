# zTrader Multi-Agent Profile

This profile specializes the existing `vertical:trading` scaffold for the canonical ZeaZ trading architecture. It does not create a second execution engine.

## Agent responsibilities

| Agent role | Responsibility | Canonical dependency |
|---|---|---|
| Narrative / Market Watcher | attention velocity, narrative stage, market evidence | `cvsz/zworkforce` |
| On-chain Analyst | holders, transfers, liquidity, provenance | external `cvsz/zwallet` read-only evidence |
| Whale Analyst | smart-money/cluster evidence | `cvsz/zworkforce` + external `cvsz/zwallet` |
| Signal / Intelligence Agent | Opportunity/Risk/Confidence and invalidations | `cvsz/zworkforce` |
| Quant / Backtest Agent | OOS, walk-forward, costs, calibration | `cvsz/zksato` |
| Portfolio Agent | exposure-aware advisory allocation | `cvsz/zworkforce` + `cvsz/zksato` |
| Risk Officer | deterministic execution gate; non-bypassable | `cvsz/zksato` |
| Supervisor | consensus, provenance check, advisory handoff | `cvsz/zworkforce` |
| Postmortem Agent | compare signal, fills and realized outcomes | zworkforce + zksato evidence |

## Model routing

LLM calls should route through `cvsz/zaiman` where practical. Agents must not treat model output as market evidence unless the underlying source/provenance is attached.

## Execution invariant

```text
agents
  -> consensus
  -> zTrader advisory intent
  -> zksato deterministic risk
  -> paper execution or DENY
```

No agent has direct live-order authority. The zTrader advisory-intent v1.1 contract is paper-only and carries explicit side/order-type fields for the deterministic zksato boundary.

## Evidence rules

Every decision should carry:
- tenant/account scope
- unambiguous instrument identity
- source/provenance
- observed timestamp / freshness
- confidence
- invalidation conditions
- trace/request id

Unknown evidence remains unknown; it must not be converted into a safe score.

## Repository scope

`cvsz/zsme` is explicitly excluded from this consolidation program and must not be inspected or modified by generated zTrader agents.


## Installed agent specs

The trading scaffold installs specialized role files under `agents/ztrader/`:
- narrative
- onchain
- whale
- security
- quant
- portfolio
- risk-officer
- supervisor

These roles form an evidence-to-advisory pipeline only. None has live broker authority.
