// SPDX-License-Identifier: MIT
//
// @zagents/vertical-code-review — standalone trading gemini pack.
//
// Lifted from create-agent-gemini/templates/vertical_trading/. The
// templates themselves ship under `templates/` in the npm tarball; this
// module just exposes the manifest + the on-disk template root so
// downstream loaders (create-agent-gemini's external template loader)
// can resolve files via @zagents/vertical-base.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readVerticalManifest, type VerticalPack } from '@zagents/vertical-base';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_ROOT = join(__dirname, '..', 'templates');

/** Load the pack's manifest + template root. */
export async function load(): Promise<VerticalPack> {
  const manifest = await readVerticalManifest(TEMPLATE_ROOT);
  return { manifest, templateRoot: TEMPLATE_ROOT };
}

/** Sync convenience for tests that need just the path. */
export const templateRoot = TEMPLATE_ROOT;

export default { load, templateRoot };
