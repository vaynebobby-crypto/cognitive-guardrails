# Cognitive Guardrails

`cognitive-guardrails` is a skill group for AI agent reasoning guardrails. It makes four checks independently installable and independently triggerable:

- `first-principles-prompt`: before execution, reason from first principles instead of following habitual implementation paths.
- `adversarial-prompt-review`: before or during execution, adversarially review the prompt, plan, assumptions, scope, authorization, evidence, and failure modes.
- `uncertainty-check`: after execution and before delivery, answer what you are least certain about.
- `omission-check`: after execution and before delivery, answer what may be the biggest omission or unnoticed blind spot.

The repository also keeps compatibility aggregate entries:

- `instruction-intake-guardrails`: pre-execution aggregate for older installs.
- `final-response-guardrails`: pre-delivery aggregate for older installs.

Install skill directories from `skills/<slug>/SKILL.md`. The repository root intentionally does not contain a `SKILL.md`, so clients do not mis-detect the whole repository as one large skill. OpenClaw-compatible copies are available under `.openclaw/skills/<slug>/SKILL.md`.

## Install

Clone the repository:

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
```

Recommended core skills:

```text
skills/first-principles-prompt/
skills/adversarial-prompt-review/
skills/uncertainty-check/
skills/omission-check/
```

Compatibility aggregate skills:

```text
skills/instruction-intake-guardrails/
skills/final-response-guardrails/
```

Claude Code and Codex adaptation manifests are provided under:

- `marketplaces/claude-code/`
- `marketplaces/codex/`

For local installs, symlink or copy the desired skill directories into the client-specific local skills directory. If the client does not auto-detect new skills, restart or reload it.

## Usage

Before execution:

```text
Use first-principles-prompt before choosing an implementation path.
Use adversarial-prompt-review before executing the plan.
```

Before final delivery:

```text
Use uncertainty-check before the final answer.
Use omission-check before the final answer.
```

Older configurations can continue to use:

```text
Use instruction-intake-guardrails before starting.
Use final-response-guardrails before the final answer.
```

## Validate

```bash
node scripts/check-skill.cjs
git diff --check
```

The check validates required skills, frontmatter, Chinese README coverage, client adaptation files, metadata, banned reference names, and `.openclaw/skills` compatibility copies.
