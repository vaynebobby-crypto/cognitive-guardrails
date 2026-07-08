#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const coreSkillNames = [
  'first-principles-prompt',
  'adversarial-prompt-review',
  'uncertainty-check',
  'omission-check'
];
const compatibilitySkillNames = [
  'instruction-intake-guardrails',
  'final-response-guardrails'
];
const requiredSkillNames = [...coreSkillNames, ...compatibilitySkillNames];
const bannedTerms = ['pony' + 'tail', 'Dietrich' + 'Gebert'];
let failed = false;

function fail(message) {
  console.error(`FAIL ${message}`);
  failed = true;
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function parseJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
    return null;
  }
}

function listFiles(dir) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];

  const out = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === '.git') continue;
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(relative));
    } else if (entry.isFile()) {
      out.push(relative);
    }
  }
  return out;
}

function parseFrontmatter(relativePath) {
  const skill = readText(relativePath);
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail(`${relativePath} must start with YAML frontmatter delimited by ---`);
    return null;
  }

  pass(`${relativePath} has frontmatter`);
  return frontmatter[1];
}

for (const file of ['README.md', 'README.en.md', 'openclaw.json', 'meta.json']) {
  if (exists(file)) {
    pass(`${file} exists`);
  } else {
    fail(`${file} is missing`);
  }
}

if (exists('SKILL.md')) {
  fail('root SKILL.md must not exist; keep installable skills under skills/<slug>/SKILL.md');
} else {
  pass('root SKILL.md is absent');
}

if (coreSkillNames.length >= 4) {
  pass('at least four core skills are configured');
} else {
  fail('at least four core skills must be configured');
}

for (const name of requiredSkillNames) {
  const relativePath = `skills/${name}/SKILL.md`;
  if (!exists(relativePath)) {
    fail(`${relativePath} is missing`);
    continue;
  }

  pass(`${relativePath} exists`);
  const yaml = parseFrontmatter(relativePath);
  if (!yaml) continue;

  if (new RegExp(`^name:\\s*${name}\\s*$`, 'm').test(yaml)) {
    pass(`${relativePath} name is ${name}`);
  } else {
    fail(`${relativePath} frontmatter must contain name: ${name}`);
  }

  if (/^description:\s*"[^"]+"\s*$/m.test(yaml)) {
    pass(`${relativePath} has quoted description`);
  } else {
    fail(`${relativePath} frontmatter must contain a quoted non-empty description`);
  }

  if (/argument-hint:/m.test(yaml)) {
    fail(`${relativePath} contains argument-hint; keep skill frontmatter minimal unless required`);
  } else {
    pass(`${relativePath} frontmatter is minimal (no argument-hint)`);
  }

  const compatPath = `.openclaw/skills/${name}/SKILL.md`;
  if (!exists(compatPath)) {
    fail(`${compatPath} is missing`);
  } else if (readText(relativePath) === readText(compatPath)) {
    pass(`${compatPath} matches ${relativePath}`);
  } else {
    fail(`${compatPath} must match ${relativePath}`);
  }
}

const skillContentChecks = {
  'first-principles-prompt': ['First Principles', '第一性原理', 'Real objective', 'Minimal sufficient action', 'Verification target'],
  'adversarial-prompt-review': ['Misread test', 'Scope attack', 'Authorization attack', 'Evidence attack', 'Failure-mode attack'],
  'uncertainty-check': ['least certain', 'Least certain item', 'Claim edit', 'Never claim completion solely from confidence'],
  'omission-check': ['biggest thing I may have omitted', 'Requested outputs', 'Blind spot', 'Side effect', 'Final response edit']
};

for (const [name, phrases] of Object.entries(skillContentChecks)) {
  const relativePath = `skills/${name}/SKILL.md`;
  const content = exists(relativePath) ? readText(relativePath) : '';
  for (const phrase of phrases) {
    if (content.includes(phrase)) {
      pass(`${name} covers ${phrase}`);
    } else {
      fail(`${name} should cover ${phrase}`);
    }
  }
}

if (exists('README.md')) {
  const readme = readText('README.md');
  const chineseChars = readme.match(/[\u4e00-\u9fff]/g) || [];
  if (chineseChars.length >= 100) {
    pass('README.md is Chinese-first');
  } else {
    fail('README.md should be Chinese-first');
  }

  for (const section of ['## 用途', '## 安装', '## 使用方式', '## 目录结构', '## 验证', '## 发布']) {
    if (readme.includes(section)) {
      pass(`README.md has ${section}`);
    } else {
      fail(`README.md missing ${section}`);
    }
  }

  for (const name of requiredSkillNames) {
    if (readme.includes(name)) {
      pass(`README.md mentions ${name}`);
    } else {
      fail(`README.md should mention ${name}`);
    }
  }
}

for (const adapter of ['marketplaces/claude-code', 'marketplaces/codex']) {
  for (const file of ['manifest.json', 'README.md']) {
    const relativePath = `${adapter}/${file}`;
    if (exists(relativePath)) {
      pass(`${relativePath} exists`);
    } else {
      fail(`${relativePath} is missing`);
    }
  }

  const manifest = exists(`${adapter}/manifest.json`) ? parseJson(`${adapter}/manifest.json`) : null;
  if (manifest && Array.isArray(manifest.skills)) {
    const names = manifest.skills.map((skill) => skill.name);
    for (const name of requiredSkillNames) {
      if (names.includes(name)) {
        pass(`${adapter}/manifest.json includes ${name}`);
      } else {
        fail(`${adapter}/manifest.json should include ${name}`);
      }
    }
  } else if (manifest) {
    fail(`${adapter}/manifest.json must contain a skills array`);
  }
}

const openclaw = exists('openclaw.json') ? parseJson('openclaw.json') : null;
if (openclaw && Array.isArray(openclaw.skills)) {
  const names = openclaw.skills.map((skill) => skill.name);
  for (const name of requiredSkillNames) {
    if (names.includes(name)) {
      pass(`openclaw.json includes ${name}`);
    } else {
      fail(`openclaw.json should include ${name}`);
    }
  }
} else if (openclaw) {
  fail('openclaw.json must contain a skills array');
}

const meta = exists('meta.json') ? parseJson('meta.json') : null;
if (meta) {
  if (typeof meta.version === 'string' && meta.version.length > 0) {
    pass(`meta.json version is ${meta.version}`);
  } else {
    fail('meta.json must contain a string version');
  }

  if (Array.isArray(meta.required_binaries)) {
    pass('meta.json required_binaries is an array');
  } else {
    fail('meta.json required_binaries must be an array');
  }

  if (Array.isArray(meta.skills)) {
    for (const name of requiredSkillNames) {
      if (meta.skills.includes(name)) {
        pass(`meta.json includes ${name}`);
      } else {
        fail(`meta.json should include ${name}`);
      }
    }
  } else {
    fail('meta.json must contain a skills array');
  }

  if (Array.isArray(meta.core_skills) && coreSkillNames.every((name) => meta.core_skills.includes(name))) {
    pass('meta.json lists the four core skills');
  } else {
    fail('meta.json must list the four core skills');
  }
}

for (const relativePath of listFiles('.')) {
  if (relativePath.startsWith('.git/')) continue;
  const absolute = path.join(root, relativePath);
  const buffer = fs.readFileSync(absolute);
  if (buffer.includes(0)) continue;
  const text = buffer.toString('utf8');
  for (const term of bannedTerms) {
    if (text.toLowerCase().includes(term.toLowerCase())) {
      fail(`${relativePath} must not mention banned reference term`);
    }
  }
}

process.exit(failed ? 1 : 0);
