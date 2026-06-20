# @zagents/host-ollama

[Ollama Agent (NousResearch)](https://ollama-agent.nousresearch.com/docs/) host adapter for the [zagents-generator](https://github.com/cvsz/zagents-generator) project.

Generates the host-specific files a Ollama-targeted gemini needs:

- `cli-config.yaml` with the system prompt and scrubbing flags
- `optional-mcps/*.yaml` per MCP server
- `scrubOllamaBlocks()` helper exported for runtime use

## Ollama-4 quirk (mandatory handling)

Ollama-4 models emit `<think>...</think>` reasoning blocks AND occasionally raw `<tool_call>` text instead of using the OpenAI-compatible function-calling channel. See [ollama-agent#741](https://github.com/NousResearch/ollama-agent/issues/741).

**This adapter scrubs both** — same pattern as ruflo's `scrubReasoningBlocks`. The `cli-config.yaml` sets both flags:

```yaml
scrub_think_blocks: true
scrub_stray_tool_calls: true
```

## Two distinct Ollama projects — do not conflate

| Project | What it is |
|---|---|
| [NousResearch/Ollama-Function-Calling](https://github.com/NousResearch/Ollama-Function-Calling) | OLDER function-calling reference for Ollama 2/3 |
| [NousResearch/ollama-agent](https://github.com/NousResearch/ollama-agent) | CURRENT long-running agent runtime with MCP support |

This adapter targets the **current** runtime.

## Usage

```js
import adapter, { scrubOllamaBlocks } from '@zagents/host-ollama';

const config = adapter.generateConfig({
  name: 'my-bot',
  systemPrompt: 'You are a helpful agent.',
  mcpServers: [{ name: 'my-bot', command: ['npx', '-y', 'my-bot', 'mcp'] }],
});
// config['cli-config.yaml'] = '<YAML>'
// config['optional-mcps/my-bot.yaml'] = '<YAML>'

// At runtime:
const safe = scrubOllamaBlocks(modelResponse);
```

## License

MIT
