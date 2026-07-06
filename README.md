# Cognitive Guardrails

Cognitive Guardrails is a small AgentSkill / prompt package that adds a deliberate reasoning review pass to AI-assisted work. It helps an agent slow down at the right moment, challenge its own assumptions, and repair weak spots before handing over code, writing, plans, business proposals, or decisions.

## Checkpoints

- **First principles**: Rebuild the answer from the real goal and the facts that must be true.
- **Least certain / under-investigated**: Identify the weakest claim, dependency, or assumption.
- **Adversarial review**: Attack the output from the viewpoint of a skeptical reviewer, maintainer, buyer, user, or opponent.
- **Largest omission**: Find the missing stakeholder, constraint, test, risk, dependency, or next step.

## Use Cases

- Code design, implementation plans, refactors, reviews, and release checks
- Technical writing, proposals, documentation, and decision records
- Business strategy, product plans, market arguments, and operating plans
- Personal or organizational decisions where hidden assumptions and omissions matter

## Installation

This repository is intentionally plain text. Different agent clients use different local extension formats, and not all of them publish a single official marketplace install command. When a client has no universal install format, clone this repository and copy or symlink it into that client's custom skills, prompts, or instructions directory.

Clone the repository:

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
```

### Claude Code

Claude Code supports project and user-level instructions, and local setups may differ. If your installation exposes a custom skills or prompts directory, copy or symlink this repository there:

```bash
# Adjust the destination to your Claude Code custom skills/prompts path.
mkdir -p ~/.claude/skills
ln -s "$(pwd)" ~/.claude/skills/cognitive-guardrails
```

If your setup uses project instructions instead, reference `SKILL.md` from your project-level Claude instructions and keep `references/prompt-templates.md` available for copy-ready prompts.

### Codex

For Codex-style local skills, install into the configured skills directory. The exact path depends on your Codex home:

```bash
# Adjust CODEX_HOME if your installation uses a different location.
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)" "${CODEX_HOME:-$HOME/.codex}/skills/cognitive-guardrails"
```

Restart or reload the client if it does not detect new skills automatically.

### Pi

Pi does not have one universal public CLI skill-install format. Use the generic prompt method:

1. Keep this repository cloned locally.
2. Add the contents of `SKILL.md` to Pi's custom instructions, prompt library, or equivalent local configuration.
3. Use `references/prompt-templates.md` when you need a generation pass or delivery pass prompt.

### Copilot CLI

Copilot CLI setups vary and may not expose a standard third-party skill marketplace. Use a local prompt directory or shell-accessible prompt file:

```bash
# Adjust this placeholder path to your Copilot CLI prompt/config directory.
mkdir -p ~/.config/copilot-cli/prompts
ln -s "$(pwd)/SKILL.md" ~/.config/copilot-cli/prompts/cognitive-guardrails.md
```

If your CLI supports repository-level instructions, reference `SKILL.md` directly from that configuration.

### OpenClaw

Install as a user skill:

```bash
mkdir -p ~/.openclaw/skills
ln -s "$(pwd)" ~/.openclaw/skills/cognitive-guardrails
openclaw skills check
```

For a workspace-local install, use the workspace skills directory instead:

```bash
mkdir -p .openclaw/skills
ln -s "$(pwd)" .openclaw/skills/cognitive-guardrails
openclaw skills check
```

If you prefer copying over symlinking:

```bash
mkdir -p ~/.openclaw/skills/cognitive-guardrails
cp -R SKILL.md references openclaw.json README.md LICENSE ~/.openclaw/skills/cognitive-guardrails/
openclaw skills check
```

## Usage Examples

Generation pass:

```text
Use Cognitive Guardrails while drafting a release plan for this service. Apply first principles, least certain / under-investigated, adversarial review, and largest omission before finalizing.
```

Delivery pass:

```text
Run a Cognitive Guardrails delivery pass on this proposal. Return required revisions, residual uncertainty, and a tightened final version.
```

More copy-ready prompts are in [references/prompt-templates.md](references/prompt-templates.md).

## Marketplace Metadata

`openclaw.json` provides lightweight metadata for clients or marketplaces that can ingest a manifest. It is intentionally minimal and does not claim support for non-existent install commands.

## Contributing

Contributions should keep the skill compact, practical, and client-neutral. Put long examples or reusable prompts in `references/` rather than expanding `SKILL.md`.

## License

MIT. See [LICENSE](LICENSE).
