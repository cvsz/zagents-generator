const fs = require('fs');
let code = fs.readFileSync('packages/create-agent-gemini/templates/catalog.def.mjs', 'utf8');

const skillRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)',\s*body:\s*'([^']+)'\s*\}/g;
let match;
const skills = {};

while ((match = skillRegex.exec(code)) !== null) {
  skills[match[1]] = match[0];
}

let skillsBlock = "\n\nexport const SKILL_CATALOG = {\n";
for (const [id, body] of Object.entries(skills)) {
  skillsBlock += `  '${id}': ${body},\n`;
}
skillsBlock += "};\n";

// Replace inline occurrences
for (const [id, body] of Object.entries(skills)) {
  code = code.replace(body, `SKILL_CATALOG['${id}']`);
}

// Now insert the block
code = code.replace('export const CATALOG = [', skillsBlock + '\nexport const CATALOG = [');

fs.writeFileSync('packages/create-agent-gemini/templates/catalog.def.mjs', code, 'utf8');
console.log('Refactored catalog.def.mjs successfully!');
