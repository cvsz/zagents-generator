#!/usr/bin/env node
import { execSync } from 'node:child_process';
import process from 'node:process';

const name = process.argv[2] || 'my-bot';
const extraArgs = process.argv.slice(3);

const cmd = [
  'npx',
  '--yes',
  'zagents@latest',
  JSON.stringify(name),
  '--template', 'minimal',
  '--host', 'opencode',
  '--force',
  ...extraArgs.map((a) => JSON.stringify(a)),
].join(' ');

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (err) {
  console.error('zagents scaffold failed.');
  process.exit(typeof err?.status === 'number' ? err.status : 1);
}

console.log('');
console.log(`Next steps:`);
console.log(`  cd ${name} && npm install`);
console.log(`  gemini doctor   # verify OpenCode config + CLI are wired`);
