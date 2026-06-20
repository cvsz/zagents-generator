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
  '--host', 'github-actions',
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
console.log(`  cd ${name}`);
console.log(`  git add .github && git commit -m "add gemini workflow" && git push`);
console.log(`  # Add ANTHROPIC_API_KEY as a repo secret, then run from the Actions tab.`);
