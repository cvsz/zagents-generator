# MetaHarness × Hermes cli-config gemini

> ⚠️ **Illustrative output.** Transcripts and validation/run output shown in this README are
> representative examples, not captured from a specific run — actual output depends on your
> environment, models, and inputs. Run the commands to see real results.


A one-shot scaffolder that drops a minimal, working Hermes-integrated agent gemini into a fresh directory. It wires up the host-specific config file Hermes expects, a baseline `gemini.json`, and the bare-minimum agent + MCP plumbing so you can run `gemini doctor` and get a green check in under a minute. It is intentionally NOT a multi-agent template, a vertical solution, or an opinionated framework — it is the smallest viable starting point for building a Hermes-driven CLI agent.

## Quickstart

```bash
npx @metaharness/hermes@latest my-bot
cd my-bot && npm install && npm run doctor
```

That sequence scaffolds the project, installs dependencies, and runs the gemini self-check. If `doctor` passes, you have a working Hermes gemini.

## What you get

- `gemini.json` — the canonical MetaHarness manifest (host: `hermes`, template: `minimal`).
- `hermes.config.json` — host-specific Hermes CLI configuration with default model + transport settings.
- `agents/` — one starter agent definition you can copy and rename.
- `mcp/` — placeholder `servers.json` listing the default MCP servers the gemini expects.
- `.gemini/settings.json` — local-only settings (gitignored) for API keys and per-machine overrides.
- `package.json` with `gemini`, `gemini doctor`, and `gemini validate` wired as scripts.
- A `README.md` stub inside the scaffold pointing at the Hermes CLI docs.

## Advanced

Run the built-in health check:

```bash
npm run doctor
```

Expected excerpt:

```
[ok] gemini.json valid
[ok] hermes.config.json present
[ok] node >= 20
[ok] mcp/servers.json parseable
```

Validate the manifest against the MetaHarness schema:

```bash
npm run validate
# manifest: ok (host=hermes, template=minimal)
```

Run the scaffold against the Claude Code CLI for a smoke test:

```bash
claude -p --plugin-dir ./my-bot "say hello as my agent"
```

You can also re-scaffold over an existing directory by passing `--force` through:

```bash
npx @metaharness/hermes@latest my-bot --force
```

## FAQ

**Q: Does this install Hermes itself?**
A: No. It scaffolds a project configured to talk to Hermes. Install the Hermes CLI separately following the upstream Hermes docs, then point `hermes.config.json` at your install.

**Q: Can I rename the project after scaffolding?**
A: Yes. Rename the directory and update the `name` field in `package.json` and `gemini.json`. Nothing else hard-codes the project name.

**Q: Why is my key not picked up?**
A: Local secrets live in `.gemini/settings.json`, which is gitignored. Add `ANTHROPIC_API_KEY` (or the relevant provider key) there, or export it in your shell before running `gemini doctor`.

## License

MIT. Built on metaharness (https://www.npmjs.com/package/metaharness).

## Deep-dive

Full explainer gist: https://gist.github.com/ruvnet/873383a86723de0d3ef54273e1ff92d1
