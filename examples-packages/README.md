# `@zagents/*` — one-command example harnesses

Each package here is a **thin, runnable wrapper** around the
[`zagents`](https://www.npmjs.com/package/zagents) CLI. Running one
scaffolds a ready-to-edit agent gemini pre-wired for a specific host or a
specific vertical workflow — no flags to remember.

```bash
# Host integrations
npx @zagents/claude-code  my-bot   # Claude Code workspace + plugin
npx @zagents/codex        my-bot   # OpenAI Codex
npx @zagents/hermes       my-bot   # Hermes cli-config
npx @zagents/pi-dev       my-bot   # pi.dev AGENTS.md
npx @zagents/openclaw     my-bot   # OpenClaw .openclaw/
npx @zagents/rvm          my-bot   # RVM deployment partition
npx @zagents/copilot      my-bot   # VSCode / Copilot mcp.json
npx @zagents/opencode     my-bot   # OpenCode .opencode/
npx @zagents/github-actions my-bot # GitHub Actions CI/CD (non-interactive)

# Vertical workflows (ready-made multi-agent pods)
npx @zagents/devops          my-bot   # incident response
npx @zagents/legal           my-bot   # contract redline (drafts only)
npx @zagents/research        my-bot   # multi-source dossier
npx @zagents/support         my-bot   # customer support
npx @zagents/trading         my-bot   # quant trading (paper-by-default)
npx @zagents/education       my-bot   # tutor pod
npx @zagents/sales           my-bot   # sales pipeline pod
npx @zagents/gaming          my-bot   # game-design pod
npx @zagents/repo-maintainer my-bot   # OSS repo maintainer
npx @zagents/coding          my-bot   # engineering pod
```

```bash
# Third-party SDK showcases (ADR-051) — each wires a gemini to a real platform
# SDK across every host. Read-only / sandbox / test-mode by default; mutations
# need --allow-mutations. Add --host all to emit every host's config.
npx @zagents/example-aws         my-bot   # AWS (S3/EC2/Lambda/DynamoDB, dry-run)
npx @zagents/example-gcp         my-bot   # Google Cloud (Storage/BigQuery/Vertex)
npx @zagents/example-azure       my-bot   # Azure (ARM/Blob/Azure OpenAI)
npx @zagents/example-stripe      my-bot   # Stripe billing (TEST MODE by default)
npx @zagents/example-slack       my-bot   # Slack triage/notify (scoped tokens)
npx @zagents/example-github      my-bot   # GitHub PR/issue automation (Octokit)
npx @zagents/example-twilio      my-bot   # Twilio SMS/voice (magic test numbers)
npx @zagents/example-datadog     my-bot   # Datadog incident triage (read-only)
npx @zagents/example-supabase    my-bot   # Supabase RLS-aware data agent
npx @zagents/example-huggingface my-bot   # Hugging Face discovery + inference
npx @zagents/example-pinecone    my-bot   # Pinecone RAG memory
npx @zagents/example-fhir        my-bot   # Health/FHIR (sandbox EHR; not a medical device)
npx @zagents/example-ads         my-bot   # Google/Meta Ads analysis (read-only)
npx @zagents/example-web3        my-bot   # web3/viem (testnet read + simulate)
npx @zagents/example-iot         my-bot   # IoT/MQTT telemetry (guarded actuation)
npx @zagents/example-nasa        my-bot   # NASA imagery + orbital pass prediction
npx @zagents/example-qiskit      my-bot   # Quantum circuits (simulate, verify-first)
npx @zagents/example-bio         my-bot   # Bioinformatics (NCBI/Ensembl lookup)
```

Every scaffold ships:

- a `.gemini/manifest.json` (signed-shape provenance),
- host-specific config (`.claude/`, `.codex/config.toml`, `cli-config.yaml`, …),
- a `.claude-plugin/plugin.json` so `claude -p --plugin-dir <bot>` loads it as a plugin,
- and the matching `@zagents/host-<name>` adapter dependency.

After scaffolding:

```bash
cd my-bot && npm install
npx gemini doctor          # health-check the scaffold
npx gemini validate        # full umbrella: doctor + verify + path-guard + mcp
```

Each package has its own `README.md` (intro / quickstart / features / advanced
/ FAQ) and an explainer gist. They're all generated from — and stay in sync
with — the canonical [`zagents`](https://www.npmjs.com/package/zagents)
templates, so a scaffold from `@zagents/devops` is byte-identical to
`npx zagents my-bot --template vertical:devops --host claude-code`.

> These wrappers exist purely for discoverability and one-command ergonomics.
> The full CLI (20 templates × 8 hosts, plus `gemini` subcommands) lives in
> [`zagents`](https://www.npmjs.com/package/zagents).
