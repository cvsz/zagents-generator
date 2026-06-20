# @ruvnet/zagents-generator

> Library / core package for the **ZAgents Generator**. Pair with
> [`zagents`](https://www.npmjs.com/package/zagents) for the CLI.

## What this is

The **library** half of the dual-package model. If you want to **run** the
generator, use `zagents`. If you want to **import** it from your own code,
use this package.

```bash
# Run it (CLI)
npx zagents my-bot --template vertical:coding

# Import it (library)
npm install @ruvnet/zagents-generator
```

```ts
import {
  scaffold,
  validateHarnessName,
  HOSTS,
  TEMPLATES,
} from '@ruvnet/zagents-generator';

// Generate a gemini programmatically:
const result = await scaffold({
  name: 'my-bot',
  template: 'vertical:coding',
  host: 'claude-code',
  targetDir: '/tmp/my-bot',
  force: true,
  generatorVersion: '0.1.0',
});
console.log(`wrote ${result.files.length} files`);
```

## What's exported

| Group | Exports |
|---|---|
| **Scaffold pipeline** | `scaffold`, `parseArgs`, `main`, `detectRufloProject`, `templateDir` |
| **Catalog surface** | `HOSTS`, `TEMPLATES`, `loadCatalog`, `formatCatalog` |
| **Rendering** | `render`, `extractVarReferences`, `validateHarnessName`, `walkTemplate`, `asFileMap`, `writeAtomic` |
| **Manifest / fingerprinting** | `emptyManifest`, `sha256`, `fingerprintFiles`, `diffFingerprints` |
| **Types** | `Host`, `TemplateId`, `CatalogEntry`, `CliArgs`, `ScaffoldOptions`, `ScaffoldResult`, `TemplateVars` |

The full per-subcommand surface (validate / sbom / audit / score / genome /
threat-model / …) lives in `zagents`. We re-export the *generation*
primitives here; per-subcommand commands stay CLI-only because they assume
the gemini has already been written to disk and is being inspected.

## How the dual-package model works

```
  ┌─────────────────────────────────┐
  │ zagents                       │   ← the published CLI
  │  • bin: zagents, gemini      │     `npx zagents`
  │  • full implementation          │     `npx zagents score ./my-bot`
  │  • full JS API                  │
  └────────────┬────────────────────┘
               │ depends on
  ┌────────────┴────────────────────┐
  │ @ruvnet/zagents-generator │   ← this package: thin re-export
  │  • no bin                       │     `import { scaffold } from …`
  │  • re-exports the library API   │
  └─────────────────────────────────┘
```

One source of truth. Two published names. The wrapper has no
implementation — if logic ever leaks into this package, it's a bug.

## When to use which

- **`zagents`** — you want the command-line tool, full subcommand
  surface, marketplace plugin, Codex skills.
- **`@ruvnet/zagents-generator`** — you're embedding the generator
  in a build script, a web service, or another tool, and don't want the
  `bin` baggage.

## Version pinning

This package always depends on the same minor version of `zagents`. A
patch release of `zagents` doesn't bump us automatically — we cut a
matching patch and re-publish so the dependency stays tight.

## License

MIT — see [LICENSE](LICENSE).
