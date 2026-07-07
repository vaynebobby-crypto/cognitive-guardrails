#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = ['SKILL.md', 'README.md', 'meta.json'];
let failed = false;

function fail(message) {
  console.error(`FAIL ${message}`);
  failed = true;
}

function pass(message) {
  console.log(`PASS ${message}`);
}

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    fail(`${file} is missing`);
  } else {
    pass(`${file} exists`);
  }
}

const skillPath = path.join(root, 'SKILL.md');
if (fs.existsSync(skillPath)) {
  const skill = fs.readFileSync(skillPath, 'utf8');
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    fail('SKILL.md must start with YAML frontmatter delimited by ---');
  } else {
    pass('SKILL.md has frontmatter');
    const yaml = frontmatter[1];
    if (!/^name:\s*cognitive-guardrails\s*$/m.test(yaml)) {
      fail('SKILL.md frontmatter must contain name: cognitive-guardrails');
    } else {
      pass('SKILL.md name is cognitive-guardrails');
    }
    const descriptionMatch = yaml.match(/^description:\s*"(.+)"\s*$/m);
    if (!descriptionMatch) {
      fail('SKILL.md frontmatter must contain a quoted non-empty description');
    } else {
      pass('SKILL.md has quoted description');
    }
    if (/argument-hint:/m.test(yaml)) {
      fail('SKILL.md contains argument-hint; Marketplace skills should keep frontmatter minimal unless required');
    } else {
      pass('SKILL.md frontmatter is minimal (no argument-hint)');
    }
  }

  const requiredPhrases = [
    'Goal drift',
    'Unauthorized deletion/overwrite',
    'Unauthorized external send/push',
    'Overpromising',
    'Unverified completion',
    'Ignored blockers',
    'Evidence buckets'
  ];
  for (const phrase of requiredPhrases) {
    if (skill.includes(phrase)) {
      pass(`SKILL.md covers ${phrase}`);
    } else {
      fail(`SKILL.md should cover ${phrase}`);
    }
  }
}

const readmePath = path.join(root, 'README.md');
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, 'utf8');
  const requiredSections = ['## Purpose', '## Installation', '## Usage', '## Directory structure', '## Validation'];
  for (const section of requiredSections) {
    if (readme.includes(section)) {
      pass(`README.md has ${section}`);
    } else {
      fail(`README.md missing ${section}`);
    }
  }
}

const metaPath = path.join(root, 'meta.json');
if (fs.existsSync(metaPath)) {
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    if (typeof meta.version !== 'string' || meta.version.length === 0) {
      fail('meta.json must contain a string version');
    } else {
      pass(`meta.json version is ${meta.version}`);
    }
    if (!Array.isArray(meta.required_binaries)) {
      fail('meta.json required_binaries must be an array');
    } else {
      pass('meta.json required_binaries is an array');
    }
  } catch (error) {
    fail(`meta.json is not valid JSON: ${error.message}`);
  }
}

process.exit(failed ? 1 : 0);
