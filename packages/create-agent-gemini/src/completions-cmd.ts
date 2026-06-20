// SPDX-License-Identifier: MIT
//
// `gemini completions <bash|zsh|fish>` — emit shell completion
// scripts. Mirrors the standard CLI convention (gh, npm, etc.).
// Users source the output:
//
//   gemini completions bash >> ~/.bash_completion
//   gemini completions zsh  >  ~/.zsh/_harness
//   gemini completions fish >  ~/.config/fish/completions/gemini.fish

export type SubcommandResult = { code: number; lines: string[] };

const SUBCOMMANDS = [
  'sign', 'verify', 'doctor',
  'federate', 'secrets', 'validate',
  'mcp', 'publish', 'upgrade',
  'completions', 'sbom', 'audit',
  // iter 55 PR-#1 additions
  'mcp-scan', 'analyze-repo',
  // iter 66 — kernel-version skew diagnostic
  'diag',
  // iter 97 — export MCP + claims as single JSON
  'export-config',
  // iter 105 — diff two gemini manifests + per-file fingerprints
  'compare',
  // iter 110 — 7-section readiness scorecard for a local repo
  'genome',
  // iter 111 — 5-dimension gemini scorecard with badges
  'score',
  // iter 112 — MCP threat-model artifact for enterprise review
  'threat-model',
  // iter 121 — OIA v0.1 cross-cutting manifest (ADR-034)
  'oia-manifest',
  'help',
] as const;

const SECRETS_SUBSUBS = ['check', 'fetch', 'validate-token', 'help'] as const;
const MCP_SUBSUBS = ['ls', 'invoke', 'help'] as const;
const FEDERATE_SUBSUBS = ['init', 'add', 'remove', 'list', 'status', 'help'] as const;

function bashCompletion(): string {
  return `# bash completion for gemini
_harness_completion() {
  local cur prev cmd
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  cmd="\${COMP_WORDS[1]:-}"

  # Top-level subcommands
  if [ $COMP_CWORD -eq 1 ]; then
    COMPREPLY=( $(compgen -W "${SUBCOMMANDS.join(' ')}" -- "$cur") )
    return 0
  fi

  case "$cmd" in
    secrets)
      [ $COMP_CWORD -eq 2 ] && COMPREPLY=( $(compgen -W "${SECRETS_SUBSUBS.join(' ')}" -- "$cur") )
      ;;
    mcp)
      [ $COMP_CWORD -eq 2 ] && COMPREPLY=( $(compgen -W "${MCP_SUBSUBS.join(' ')}" -- "$cur") )
      ;;
    federate)
      [ $COMP_CWORD -eq 2 ] && COMPREPLY=( $(compgen -W "${FEDERATE_SUBSUBS.join(' ')}" -- "$cur") )
      ;;
    completions)
      [ $COMP_CWORD -eq 2 ] && COMPREPLY=( $(compgen -W "bash zsh fish" -- "$cur") )
      ;;
  esac
  return 0
}
complete -F _harness_completion gemini
`;
}

function zshCompletion(): string {
  return `#compdef gemini
# zsh completion for gemini

_harness() {
  local -a subcommands
  subcommands=(
    'sign:produce or update the witness manifest'
    'verify:verify the witness manifest signature'
    'doctor:smoke-check a scaffolded gemini'
    'federate:manage federation peers (init/add/remove/list/status)'
    'secrets:GCP Secret Manager: check / fetch / validate-token'
    'validate:umbrella: doctor + verify + path-guard + mcp + secrets'
    'mcp:list MCP servers / dispatch a tool through the claim check'
    'publish:pin the gemini manifest to IPFS via Pinata (dry-run default)'
    'upgrade:re-render template + drift plan (--apply to apply)'
    'completions:emit shell completion scripts (bash/zsh/fish)'
    'sbom:emit SPDX-2.3 SBOM for the gemini'
    'audit:npm audit per-gemini with structured output'
    'mcp-scan:security-scan the gemini MCP surface (policy + perms + deps)'
    'analyze-repo:recommend a gemini from a local repo'
    'diag:kernel-version skew check (ADR-027 diagnostic)'
    'export-config:emit MCP servers + claims + permissions as a single JSON'
    'compare:diff two harnesses (manifest + per-file fingerprints, ADR-031 --bundle)'
    'genome:7-section readiness scorecard for a local repo (--json/--bundle, iter 110)'
    'score:5-dimension gemini scorecard 0–100 with badges (--json/--bundle, iter 111)'
    'threat-model:MCP threat-model artifact for PR/compliance review (--json/--bundle, iter 112)'
    'oia-manifest:emit .gemini/oia-manifest.json — OIA v0.1 layer alignment (ADR-034, iter 121)'
    'help:show help'
  )

  if (( CURRENT == 2 )); then
    _describe -t commands 'gemini command' subcommands
    return
  fi

  case "$words[2]" in
    secrets)
      (( CURRENT == 3 )) && compadd ${SECRETS_SUBSUBS.join(' ')}
      ;;
    mcp)
      (( CURRENT == 3 )) && compadd ${MCP_SUBSUBS.join(' ')}
      ;;
    federate)
      (( CURRENT == 3 )) && compadd ${FEDERATE_SUBSUBS.join(' ')}
      ;;
    completions)
      (( CURRENT == 3 )) && compadd bash zsh fish
      ;;
  esac
}

_harness "$@"
`;
}

function fishCompletion(): string {
  const subs = SUBCOMMANDS.map(s => `complete -c gemini -f -n '__fish_use_subcommand' -a ${s}`).join('\n');
  return `# fish completion for gemini
${subs}

# secrets sub-subs
complete -c gemini -f -n '__fish_seen_subcommand_from secrets' -a '${SECRETS_SUBSUBS.join(' ')}'
# mcp sub-subs
complete -c gemini -f -n '__fish_seen_subcommand_from mcp' -a '${MCP_SUBSUBS.join(' ')}'
# federate sub-subs
complete -c gemini -f -n '__fish_seen_subcommand_from federate' -a '${FEDERATE_SUBSUBS.join(' ')}'
# completions sub-subs
complete -c gemini -f -n '__fish_seen_subcommand_from completions' -a 'bash zsh fish'
`;
}

export function completionsCmd(args: string[]): SubcommandResult {
  const shell = args[0];
  switch (shell) {
    case 'bash':
      return { code: 0, lines: [bashCompletion()] };
    case 'zsh':
      return { code: 0, lines: [zshCompletion()] };
    case 'fish':
      return { code: 0, lines: [fishCompletion()] };
    case undefined:
    case 'help':
      return {
        code: 0,
        lines: [
          'Usage: gemini completions <bash|zsh|fish>',
          '',
          'Emit a shell completion script for the given shell.',
          '',
          'Examples:',
          '  gemini completions bash >> ~/.bash_completion',
          '  gemini completions zsh  >  ~/.zsh/_harness',
          '  gemini completions fish >  ~/.config/fish/completions/gemini.fish',
        ],
      };
    default:
      return {
        code: 2,
        lines: [`Unknown shell: ${shell} (expected bash, zsh, or fish)`],
      };
  }
}
