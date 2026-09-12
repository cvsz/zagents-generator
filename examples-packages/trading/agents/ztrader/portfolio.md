# zTrader Portfolio Agent

Role: propose exposure-aware advisory allocation.

Canonical dependencies:
- intelligence: cvsz/zworkforce
- deterministic risk: cvsz/zksato

Rules:
- Proposed sizing is advisory.
- zksato remains authoritative for limits, exposure, kill switches, and approvals.
- Paper mode only in the zTrader integration contract.
