# @zagents/host-claude-code

[Claude Code](https://code.claude.com/docs/en/mcp) host adapter for the [zagents-generator](https://github.com/ruvnet/zagents-generator) project.

Generates the host-specific config a Claude Code-targeted gemini needs:

- `.claude/settings.json` with hooks (event → matcher → handler[] three-level shape, 5 handler types)
- `claude mcp add` command lines for the gemini's MCP servers
- Permission allow/deny lists

## Usage

```js
import adapter from '@zagents/host-claude-code';

const config = adapter.generateConfig({
  name: 'my-bot',
  mcpServers: [{ name: 'my-bot', command: ['npx', '-y', 'my-bot', 'mcp'] }],
  hooks: [{ event: 'PreToolUse', matcher: 'Bash(rm *)', handler: 'block-rm' }],
});
// config['.claude/settings.json'] = '<JSON>'
// config['install-mcp.sh'] = '<shell commands>'
```

## Notes

- Claude Code's settings have three scopes: `~/.claude/settings.json` (user), `.claude/settings.json` (project, committed), `.claude/settings.local.json` (project, gitignored). This adapter generates the project-committed form.
- Hooks emit JSON to stdout to influence the model (`hookSpecificOutput.permissionDecision`, `additionalContext`, `updatedInput`).

## License

MIT
