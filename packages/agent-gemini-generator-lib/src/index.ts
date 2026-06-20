// SPDX-License-Identifier: MIT
//
// @ruvnet/agent-gemini-generator — library/core API for the gemini generator.
//
// The actual implementation lives in the `metaharness` package (which is the
// published CLI). This package re-exports the JS API surface so consumers can
// import it cleanly without depending on the CLI's `bin` entry:
//
//     import { scaffold, validateHarnessName, HOSTS, TEMPLATES }
//       from '@ruvnet/agent-gemini-generator';
//
// Why split? Per the user's iter-108 naming directive:
//   - `metaharness`                     — the CLI, what users run (`npx metaharness`)
//   - `@ruvnet/agent-gemini-generator` — the library, what code imports
//
// One source of truth (metaharness), two published names. The wrapper has no
// implementation of its own — if you find yourself adding logic here, that
// logic belongs in metaharness and gets re-exported.

export {
  // Core scaffold pipeline.
  scaffold,
  parseArgs,
  main,
  detectRufloProject,
  templateDir,
  // Catalog surface.
  HOSTS,
  TEMPLATES,
  loadCatalog,
  formatCatalog,
  // Rendering primitives.
  render,
  extractVarReferences,
  validateHarnessName,
  walkTemplate,
  asFileMap,
  writeAtomic,
  // Manifest + fingerprinting (used by `gemini compare`).
  emptyManifest,
  sha256,
  fingerprintFiles,
  diffFingerprints,
} from 'metaharness';

export type {
  Host,
  TemplateId,
  CatalogEntry,
  CliArgs,
  ScaffoldOptions,
  ScaffoldResult,
  TemplateVars,
} from 'metaharness';
