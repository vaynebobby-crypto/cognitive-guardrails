#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const skillNames = [
  'instruction-intake-guardrails',
  'final-response-guardrails'
];
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

for (const file of ['SKILL.md', 'README.md', 'README.en.md', 'openclaw.json', 'meta.json']) {
  if (exists(file)) {
    pass(`${file} exists`);
  } else {
    fail(`${file} is missing`);
  }
}

for (const name of skillNames) {
  const relativePath = `skills/${name}/SKILL.md`;
  if (!exists(relativePath)) {
    fail(`${relativePath} is missing`);
    continue;
  }

  pass(`${relativePath} exists`);
  const skill = readText(relativePath);
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail(`${relativePath} must start with YAML frontmatter delimited by ---`);
    continue;
  }

  pass(`${relativePath} has frontmatter`);
  const yaml = frontmatter[1];
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
}

const intake = exists('skills/instruction-intake-guardrails/SKILL.md')
  ? readText('skills/instruction-intake-guardrails/SKILL.md')
  : '';
for (const phrase of ['Authorization boundary', 'Goal drift', 'Blockers', 'Minimal safe step', 'Verification target']) {
  if (intake.includes(phrase)) {
    pass(`instruction-intake-guardrails covers ${phrase}`);
  } else {
    fail(`instruction-intake-guardrails should cover ${phrase}`);
  }
}

const finalResponse = exists('skills/final-response-guardrails/SKILL.md')
  ? readText('skills/final-response-guardrails/SKILL.md')
  : '';
for (const phrase of ['Verification evidence', 'Unfinished items', 'Blockers', 'Overpromising', 'Never claim completion solely from confidence']) {
  if (finalResponse.includes(phrase)) {
    pass(`final-response-guardrails covers ${phrase}`);
  } else {
    fail(`final-response-guardrails should cover ${phrase}`);
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

  for (const name of skillNames) {
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
    for (const name of skillNames) {
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
  for (const name of skillNames) {
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
    for (const name of skillNames) {
      if (meta.skills.includes(name)) {
        pass(`meta.json includes ${name}`);
      } else {
        fail(`meta.json should include ${name}`);
      }
    }
  } else {
    fail('meta.json must contain a skills array');
  }
}

process.exit(failed ? 1 : 0);
