#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const name = process.argv[2] || 'my-bot';
const extra = process.argv.slice(3);

const cmd = [
  'npx',
  '--yes',
  'zagents@latest',
  name,
  '--template',
  'vertical:trading',
  '--host',
  'claude-code',
  '--force',
  ...extra,
].join(' ');

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (err) {
  console.error(`\nzagents scaffold failed: ${err.message}`);
  process.exit(typeof err.status === 'number' ? err.status : 1);
}

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const targetRoot = join(process.cwd(), name);
const ztraderSource = join(packageRoot, 'agents', 'ztrader');
const ztraderTarget = join(targetRoot, 'agents', 'ztrader');

mkdirSync(ztraderTarget, { recursive: true });
for (const file of readdirSync(ztraderSource)) {
  if (file.endsWith('.md')) {
    copyFileSync(join(ztraderSource, file), join(ztraderTarget, file));
  }
}
copyFileSync(
  join(packageRoot, 'ZTRADER_PROFILE.md'),
  join(targetRoot, 'ZTRADER_PROFILE.md'),
);

console.log('');
console.log('Installed ZeaZ zTrader multi-agent profile (paper-only advisory handoff).');
console.log('');
console.log(`Next steps:`);
console.log(`  cd ${name} && npm install`);
console.log(`  gemini doctor   # confirm risk gate + paper-trading defaults are wired`);
