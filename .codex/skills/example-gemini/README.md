# example-gemini (Codex skill)

One-command scaffolding from the 18 **published** `@zagents/*` example
packages — the fastest path from a use-case to a working gemini, no
template/host flags to remember.

Where [`create-gemini`](../create-gemini/) walks the full wizard, this
skill maps a use-case straight onto a published npm wrapper. Each wrapper
shells out to `zagents@latest` with the correct `--template` + `--host`
flags, so the result is byte-identical to the full CLI invocation.

## Install

```bash
mkdir -p ~/.codex/skills/example-gemini
curl -fsSL https://raw.githubusercontent.com/cvsz/zagents-generator/main/.codex/skills/example-gemini/skill.toml \
  -o ~/.codex/skills/example-gemini/skill.toml
```

No MCP server needed — the wrapper packages run via `npx`.

## Use

```
/example-gemini
```

Codex prompts for the package + a directory name, then runs:

```bash
npx --yes @zagents/<package>@latest <name>
```

## The 18 packages

**Host integrations** (scaffold a workspace wired for one runtime)

| Package | Scaffolds |
|---|---|
| `@zagents/claude-code` | Claude Code workspace + plugin |
| `@zagents/codex` | OpenAI Codex |
| `@zagents/hermes` | Hermes cli-config |
| `@zagents/pi-dev` | pi.dev AGENTS.md |
| `@zagents/openclaw` | OpenClaw `.openclaw/` |
| `@zagents/rvm` | RVM deployment partition |
| `@zagents/copilot` | VSCode / Copilot `mcp.json` |
| `@zagents/opencode` | OpenCode `.opencode/` |
| `@zagents/github-actions` | GitHub Actions CI/CD (non-interactive) |

**Vertical workflows** (ready-made multi-agent pods)

| Package | Scaffolds |
|---|---|
| `@zagents/devops` | incident response |
| `@zagents/research` | multi-source dossier |
| `@zagents/trading` | quant trading (paper-by-default) |
| `@zagents/support` | customer support |
| `@zagents/legal` | contract redline (drafts only) |
| `@zagents/coding` | engineering pod |
| `@zagents/education` | tutor pod |
| `@zagents/sales` | sales pipeline pod |
| `@zagents/gaming` | game-design pod |
| `@zagents/repo-maintainer` | OSS repo maintainer |

## After scaffolding

```bash
cd <name> && npm install
npx gemini doctor      # health-check
npx gemini validate    # full umbrella gate
```

Every scaffold ships a `.claude-plugin/plugin.json`, so it also loads as a
Claude Code plugin: `claude -p --plugin-dir <name> "..."`.

Per-package deep-dive gists: see
[`examples-packages/GISTS.md`](https://github.com/cvsz/zagents-generator/blob/main/examples-packages/GISTS.md).
