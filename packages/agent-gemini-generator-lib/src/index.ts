// SPDX-License-Identifier: MIT
//
// @cvsz/zagents-generator — library/core API for the gemini generator.
//
// The actual implementation lives in the `zagents` package (which is the
// published CLI). This package re-exports the JS API surface so consumers can
// import it cleanly without depending on the CLI's `bin` entry:
//
//     import { scaffold, validateHarnessName, HOSTS, TEMPLATES }
//       from '@cvsz/zagents-generator';
//
// Why split? Per the user's iter-108 naming directive:
//   - `zagents`                     — the CLI, what users run (`npx zagents`)
//   - `@cvsz/zagents-generator` — the library, what code imports
//
// One source of truth (zagents), two published names. The wrapper has no
// implementation of its own — if you find yourself adding logic here, that
// logic belongs in zagents and gets re-exported.

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
} from 'zagents';

export type {
  Host,
  TemplateId,
  CatalogEntry,
  CliArgs,
  ScaffoldOptions,
  ScaffoldResult,
  TemplateVars,
} from 'zagents';
