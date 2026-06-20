#!/usr/bin/env node
import { execSync } from 'node:child_process';
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

console.log('');
console.log(`Next steps:`);
console.log(`  cd ${name} && npm install`);
console.log(`  gemini doctor   # confirm risk gate + paper-trading defaults are wired`);
