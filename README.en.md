# Cognitive Guardrails

`cognitive-guardrails` now ships two independent installable skills:

- `instruction-intake-guardrails`: use after receiving an instruction and before execution, including a First Principles check.
- `final-response-guardrails`: use after completing work and before the final response.

The root `SKILL.md` is kept only as a compatibility and migration entry. Install the two directories under `skills/`.

## Install

Clone the repository:

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
```

Install or register these directories in your client:

```text
skills/instruction-intake-guardrails/
skills/final-response-guardrails/
```

Claude Code and Codex do not have a single universal marketplace command across all local setups. This repository provides client adaptation manifests under:

- `marketplaces/claude-code/`
- `marketplaces/codex/`

Use those manifests as packaging metadata, or symlink the two skill directories into the client-specific local skills directory.

Before execution, `instruction-intake-guardrails` returns to the user's real goal, strips away default methods and habitual paths, keeps only the facts, constraints, and authorization boundaries that must hold, then chooses the smallest safe action.

## Validate

```bash
node scripts/check-skill.cjs
```

The check validates both skill frontmatters, Chinese README coverage, client adaptation files, and repository metadata.
