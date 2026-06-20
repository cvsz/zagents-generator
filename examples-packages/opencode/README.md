# ZAgents × OpenCode .opencode/ config

> ⚠️ **Illustrative output.** Transcripts and validation/run output shown in this README are
> representative examples, not captured from a specific run — actual output depends on your
> environment, models, and inputs. Run the commands to see real results.


A minimal ZAgents scaffold wired for the OpenCode host. It drops a ready-to-edit `.opencode/` config tree into a fresh project directory so you can run agents through OpenCode without hand-building the boilerplate. This is for developers who already use OpenCode (or want to try it) and want a working starting point in one command. It is not a multi-agent vertical template — there are no pre-built domain agents, no embedded MCP server farm, and no opinionated workflow. You get the gemini skeleton; you bring the intent.

## Quickstart

```bash
npx @zagents/opencode@latest my-bot
cd my-bot
npm install
gemini doctor
```

`gemini doctor` confirms the OpenCode config loaded, the gemini CLI is on PATH, and the scaffold passes structural validation.

## What you get

- `.opencode/config.json` — OpenCode host config, pre-pointed at the gemini directory
- `.opencode/agents/` — empty agent registry with one example agent stub
- `.opencode/mcp/` — MCP server declarations (empty by default, ready for you to add servers)
- `gemini.config.mjs` — top-level gemini manifest (template: `minimal`, host: `opencode`)
- `package.json` with `gemini` CLI wired as a dev dependency and `npm run doctor` / `npm run validate` scripts
- `.gitignore` and `README.md` seeded for the project
- No example domain agents, no opinionated prompts — clean slate

## Advanced

Run the built-in health checks:

```bash
gemini doctor
# ✓ OpenCode config found at .opencode/config.json
# ✓ gemini CLI v0.x.x on PATH
# ✓ Node 20+ detected
# ✓ Scaffold structure valid
```

Validate the manifest and agent definitions without executing anything:

```bash
gemini validate
# ✓ gemini.config.mjs parsed
# ✓ 0 agents registered
# ✓ 0 MCP servers declared
# ✓ OK
```

Use the scaffold as a Claude Code plugin directory (OpenCode and Claude Code share enough of the contract that the gemini skeleton works as both):

```bash
claude -p --plugin-dir my-bot "summarize the README"
```

Re-run the generator into an existing directory (the underlying `zagents` call passes `--force`):

```bash
npx @zagents/opencode@latest my-bot
```

## FAQ

**Q: What is the difference between this and `npx zagents`?**
A: This is a pinned, one-flag wrapper. It calls `zagents@latest` with `--template minimal --host opencode --force` so you don't have to remember the flags. Use raw `zagents` if you want a different template or host.

**Q: Does this install OpenCode itself?**
A: No. It produces an `.opencode/` config tree that OpenCode (or any compatible host) reads. Install OpenCode separately per its own docs.

**Q: Can I add MCP servers after scaffolding?**
A: Yes. Drop server declarations into `.opencode/mcp/` and re-run `gemini validate` to confirm they parse. The minimal template intentionally ships zero so the surface stays clean.

## License

MIT. Built on zagents (https://www.npmjs.com/package/zagents).

## Deep-dive

Full explainer gist: https://gist.github.com/ruvnet/e620f3ee6fd0a71bb7c76237e09cb7a4
