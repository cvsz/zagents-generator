import fs from 'fs';
let content = fs.readFileSync('packages/create-agent-gemini/templates/catalog.def.mjs', 'utf8');

const skillRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)',\s*body:\s*'([^']+)'\s*\}/g;
let match;
const skills = {};

while ((match = skillRegex.exec(content)) !== null) {
  skills[match[1]] = {
    id: match[1],
    name: match[2],
    description: match[3],
    body: match[4],
  };
}

console.log("Found skills:", Object.keys(skills));
