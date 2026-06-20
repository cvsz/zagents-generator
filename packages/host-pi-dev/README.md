# @zagents/host-pi-dev

[pi.dev coding agent](https://pi.dev/) host adapter for the [zagents-generator](https://github.com/cvsz/zagents-generator) project.

> **NOT Inflection's Pi.ai consumer chatbot.** This is the [badlogic/pi-mono](https://github.com/badlogic/pi-mono) Pi coding agent — a minimal CLI agent gemini.

Generates the host-specific files a Pi-targeted gemini needs:

- A Pi extension TypeScript source that registers each kernel tool via `pi.registerTool({...})`
- `AGENTS.md` with the gemini's agent roster
- `SYSTEM.md` with the gemini's system prompt

## Critical design note

Pi explicitly ships with **no MCP**. From the README's "What we didn't build" section: *"No MCP. Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support."*

This adapter generates a Pi extension (TypeScript module installed via `pi install npm:@your-org/your-gemini`), NOT MCP config. The kernel's MCP primitives are bypassed; the tool registry is exposed via `pi.registerTool({...})` calls.

## Usage

```js
import adapter from '@zagents/host-pi-dev';

const config = adapter.generateConfig({
  name: 'my-bot',
  tools: [{ name: 'remember', description: 'Store a memory', inputSchema: {} }],
  agents: [{ name: 'coder', systemPrompt: 'You are a coder.' }],
});
// config['pi-extension/src/index.ts'] = '<TypeScript>'
// config['AGENTS.md'] = '<markdown>'
// config['SYSTEM.md'] = '<markdown>'
```

## License

MIT
