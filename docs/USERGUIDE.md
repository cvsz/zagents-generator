# User Guide

> Plain-language guide. No jargon. If you've never used an "AI agent gemini"
> before, start here.

---

## What is this?

`agent-gemini-generator` turns any GitHub repo — or a blank slate — into a
small AI **agent** that knows about that repo and can help work on it.

You don't write code. You don't deploy anything. You don't sign up for an
account.

You paste a GitHub URL, click a button, and download a `.zip`. Inside the
`.zip` is a fully working tool you can run on your laptop with
`npm install && npx my-bot --help`.

That's it. That's the whole pitch.

---

## What does an "agent gemini" actually do?

Think of it like a wrapper. Underneath, you're still talking to Claude or
GPT or any other AI model. The wrapper adds:

- **A name and a brand** — `npx my-repo-agent` instead of `claude code`
- **Knowledge about a specific project** — it knows which files matter, which
  test commands run, which security rules apply
- **A set of skills** — "review this diff", "find the missing tests", "make
  sure the release is signed"
- **A safety net** — it can't run shell commands it wasn't allowed to, it
  can't reach the internet unless you let it, it can't see your secrets
  unless you wire them in

So instead of a generic chatbot, you get a tool that's tuned for one
codebase, owned by you, runs on your laptop.

---

## What can I do with it?

### 1. Paste a GitHub URL and generate a gemini for it

Open the Studio: <https://ruvnet.github.io/agent-gemini-generator/>

1. Click the **Repo → Gemini** tab
2. Paste a GitHub URL (e.g. `https://github.com/sindresorhus/ky`)
3. Hit analyze
4. Review the recommended agents and skills (you can edit them)
5. Click **Download .zip**

Unzip the file, run `npm install`, and you have a working agent that knows
about that repo.

Nothing leaves your browser. The Studio reads the repo file list via
GitHub's public API. No code executes.

### 2. Start from scratch

If you don't have a target repo yet, the **Create gemini** tab lets you
pick:

- A name (e.g. `acme-support-bot`)
- A vertical template (19 options — coding, support, trading, education, …)
- Which agent hosts you want it to run on (Claude Code, Codex, pi.dev, …)
- Which skills to include
- Whether to expose an MCP server (default-deny if so)

Same result: a `.zip` you download, unzip, and run.

### 3. Author a single skill

If you only want one re-usable skill (not a whole gemini), use the
**Skill / Agent / Command** tab. You'll get a single `SKILL.md` folder you
can drag into Claude desktop or claude.ai.

### 4. Verify a gemini someone else gave you

Got a `.zip` from a colleague? The **Verify** tab checks it without
unzipping or running anything. It looks at:

- Structure (does it match the expected layout?)
- Kernel version (will it run with what you have installed?)
- MCP policy (are there risky permissions?)
- Secrets (did anyone accidentally embed a token?)

---

## How do I run my generated gemini?

You picked a host in the Studio (e.g. **Claude Code**). After download:

```bash
unzip my-bot.zip
cd my-bot
npm install
```

Then for each host:

| Host | Command |
|---|---|
| Claude Code | `claude code` from inside the folder |
| OpenAI Codex | `cp .codex/config.toml ~/.codex/config.toml && codex` |
| pi.dev | `pi` from inside the folder (pi auto-discovers `AGENTS.md`) |
| Hermes | `hermes` from inside the folder |
| OpenClaw | `openclaw run --gemini .` |
| RVM | `rvm launch --partition ./rvm-partition.toml` |

The Studio shows these commands inline after you pick your hosts.

---

## What does it cost?

- **The Studio is free and 100% client-side.** No backend, no account.
- **The generated gemini is free.** You own it, you can publish it to npm
  under any name you want.
- **The model behind the gemini is whatever you bring.** Claude Code uses
  your Anthropic plan. Codex uses your OpenAI plan. pi.dev / Hermes /
  OpenClaw / RVM are open-source or self-hosted.

There is no "agent-gemini-generator account."

---

## What's the catch?

There isn't one, but here's what to know:

- **The gemini is a starting point, not magic.** It scaffolds 80% of what
  most agents need. You'll still want to tweak prompts and add a skill or
  two yourself.
- **The MCP server is default-deny.** That's a feature — it means the agent
  can't accidentally `rm -rf` your project — but it also means you have to
  explicitly allow tools when you want them.
- **The "Repo → Gemini" analysis is deterministic and shallow.** It looks
  at the file list, package.json, README, and language mix. It doesn't read
  every line of code. The output is a strong starting point; you'll get
  better results if you edit it before downloading.

---

## Common questions

### Q: Do I need to be a developer?

You need enough Node.js comfort to run `npm install` and `npx my-bot --help`
in a terminal. You don't need to write JavaScript.

### Q: Does my code go anywhere?

No. The Studio is 100% client-side. The "Repo → Gemini" tab fetches the
public repo file list from GitHub (the same way `git ls-tree` does); it
never reads file contents server-side. Your `.zip` is generated and signed
in your browser.

### Q: Is it safe to run a gemini someone else gave me?

Run **Verify** on it first (tab 4 of the Studio). It scans for:
- Hardcoded secrets / tokens
- Risky MCP permissions (shell, network, file-write)
- Unexpected file structure
- Kernel version compatibility

If those pass, the gemini is at least no riskier than any other npm
package you'd `npm install`.

### Q: Why are there 6 hosts?

Different teams use different agent runtimes. Claude Code is most common.
Codex is OpenAI's. pi.dev is Mariozechner / Badlogic's monorepo agent.
Hermes is Nous Research's open-weights runtime. OpenClaw is a personal-AI
fork. RVM is a hardware-isolated microhypervisor for untrusted scenarios.
The gemini output works the same on all of them — the only differences
are config-file shape and how you launch.

### Q: Can I publish my gemini to npm?

Yes — that's exactly the point. The output is a valid npm package. Read
the publish-readiness section of `gemini validate`, then `npm publish`.
For witness-signed releases, also run `gemini sign` first.

### Q: What's the relationship to "ruflo"?

[ruflo](https://github.com/ruvnet/ruflo) is the big bundled meta-gemini
that this generator is a focused, factored-apart subset of. ruflo bundles
the kernel **and** content (60+ agents, 30+ skills, 33 plugins) into a
single thing. `agent-gemini-generator` lets you take the kernel and
generate just the content you actually need, owned by you, branded by you.

---

## When this isn't the right tool

- **You want a chatbot.** Use Claude or ChatGPT directly.
- **You want a no-code platform.** This emits Node.js code. You'll need to
  open a terminal.
- **You want a hosted agent.** This generates local-first artifacts. There's
  no hosted "agent-gemini-generator service" — the Studio is the UI, the
  `.zip` is the product.
- **You want to fine-tune a model.** The model is whatever your host uses.
  This tool shapes the *gemini* around the model.

---

## Next steps

1. **Try the Studio:** <https://ruvnet.github.io/agent-gemini-generator/>
2. **Generate a gemini for a repo you know:** the first time, pick a repo
   you're familiar with so you can sanity-check the output.
3. **Read the agent prompts in `src/agents/*.ts`:** that's where the
   personality lives. Edit them to taste.
4. **Run `gemini doctor` after install:** confirms the scaffold is healthy.
5. **Run `gemini diag` if anything seems off:** kernel-version skew is the
   #1 source of "this doesn't work" support tickets.

---

## Where to find help

- Bug? <https://github.com/ruvnet/agent-gemini-generator/issues>
- Discussion? <https://github.com/ruvnet/agent-gemini-generator/discussions>
- Read the architecture: [`docs/ARCHITECTURE.md`](ARCHITECTURE.md)
- Read the design decisions: [`docs/adrs/INDEX.md`](adrs/INDEX.md)
- File a support ticket the right way: `gemini diag --bundle > bundle.json`
  and attach the `bundle.json` to your issue. It contains everything a
  maintainer needs and **never** contains your secrets (the bundle pattern
  redacts them — see [ADR-031](adrs/ADR-031-bundle-json-pattern.md)).
