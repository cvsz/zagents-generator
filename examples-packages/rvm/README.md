# ZAgents × RVM deployment-target partition

> ⚠️ **Illustrative output.** Transcripts and validation/run output shown in this README are
> representative examples, not captured from a specific run — actual output depends on your
> environment, models, and inputs. Run the commands to see real results.


A minimal, opinionated agent-gemini scaffold pre-configured for the RVM deployment-target partition. This scaffold gives you a working `claude -p`-style gemini on disk in seconds: agents folder, MCP server wiring, settings.json with the RVM host conventions baked in, and a `gemini doctor` health-check pass. It is intentionally minimal — it does NOT ship a vertical multi-agent template (no pre-built researcher/coder/tester crew), and it does NOT install or configure your underlying RVM runtime. Bring your own agents, bring your own runtime; this just gets the gemini shape right.

## Quickstart

```bash
npx @zagents/rvm@latest my-bot
cd my-bot && npm install && gemini doctor
```

If `gemini doctor` returns green, you are ready to drop agents into `agents/` and run them.

## What you get

- `settings.json` — gemini configuration pre-set with the `rvm` host partition (deployment-target conventions, path layout, permission defaults).
- `agents/` — empty agent directory with the canonical layout the gemini expects (one folder per agent, `agent.json` + prompt files).
- `mcp.json` — MCP server registration stub wired against the RVM host transport defaults.
- `.gemini/` — local state directory (gitignored) for session cache, doctor reports, and routing logs.
- `package.json` — `gemini` CLI on the path via `npx`, plus a `doctor` and `validate` npm script.
- `README.md` — project-local readme stub you can overwrite.
- `.gitignore` — pre-populated with `.gemini/`, `node_modules/`, and the RVM host's local artifact paths.

## Advanced

Run the gemini health check — verifies node version, settings.json schema, MCP server reachability, and host partition match:

```bash
$ gemini doctor
[gemini] node 20.x          ok
[gemini] settings.json      ok (host=rvm, template=minimal)
[gemini] mcp.json           ok (1 server registered)
[gemini] agents/            ok (0 agents — add one to start)
[gemini] rvm partition      ok
```

Validate just the config without touching the network:

```bash
$ gemini validate
settings.json: valid
mcp.json: valid
agents: 0 (warning: no agents defined)
```

Run a one-shot prompt against the scaffold using Claude Code's plugin-dir mode (the gemini is loadable as a plugin directory):

```bash
$ claude -p --plugin-dir my-bot "list the agents wired into this gemini"
```

To re-scaffold over an existing directory (destructive — pass `--force` only if you mean it):

```bash
npx --yes zagents@latest my-bot --template minimal --host rvm --force
```

## FAQ

**Q: Do I need RVM installed before running this?**
A: No. The scaffold only writes config files and directory structure that follow the RVM host partition conventions. You install/configure the actual RVM runtime when you are ready to deploy.

**Q: Why is the `agents/` directory empty?**
A: This is the `minimal` template — the point is to give you a clean gemini shape, not opinions about which agents to run. If you want a pre-built multi-agent crew, look at the vertical templates instead of the minimal one.

**Q: Can I switch the host later without re-scaffolding?**
A: Edit `settings.json` and change the `host` field, then run `gemini doctor`. If the partition layout differs, doctor will tell you which paths to move. For non-trivial host switches, re-scaffolding into a fresh directory is usually cleaner.

## License

MIT. Built on zagents (https://www.npmjs.com/package/zagents).

## Deep-dive

Full explainer gist: https://gist.github.com/cvsz/28353c033434e68f2c853546c0f99963
