# Examples

Real, runnable patterns showing how to use `zagents-generator`.

| Example | What it shows | Runnable? |
|---|---|---|
| [`quickstart/`](./quickstart/) | One-script zero-to-validated-gemini end-to-end demo | yes |
| [`multi-host/`](./multi-host/) | One gemini targeting Claude Code + Codex with the same kernel | docs |
| [`federation/`](./federation/) | Two gemini instances coordinating via the kernel's federation transport | yes |

### Try the quickstart first

```bash
node examples/quickstart/quickstart.mjs
```

That's the smallest possible end-to-end run — scaffold → validate → report — exit 0 if HEALTHY. Default takes ~50ms on a built checkout. If it passes locally, the rest of the pipeline is mostly automation around the same flow.

See [`quickstart/README.md`](./quickstart/README.md) for `--host`, `--template`, `--keep` flags.

### Then try the federation demo

```bash
node examples/federation/federation.mjs
```

7-step bidirectional handshake: spins up two gemini instances, has them add each other as trusted peers, round-trips the state through disk, demonstrates asymmetric demotion. ~20ms. See [`federation/README.md`](./federation/README.md) for what the script proves about the federation transport.
