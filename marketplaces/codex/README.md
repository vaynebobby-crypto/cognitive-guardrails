# Codex Adapter

This directory provides local packaging metadata for Codex-style skill installations.

Recommended core skills:

- `first-principles-prompt`
- `adversarial-prompt-review`
- `uncertainty-check`
- `omission-check`

Compatibility aggregate skills:

- `instruction-intake-guardrails`
- `final-response-guardrails`

There is no repository-wide assumption that Codex exposes one universal official marketplace install command. For local installs, symlink or copy the desired skill directories into the configured skills directory:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)/skills/first-principles-prompt" "${CODEX_HOME:-$HOME/.codex}/skills/first-principles-prompt"
ln -s "$(pwd)/skills/adversarial-prompt-review" "${CODEX_HOME:-$HOME/.codex}/skills/adversarial-prompt-review"
ln -s "$(pwd)/skills/uncertainty-check" "${CODEX_HOME:-$HOME/.codex}/skills/uncertainty-check"
ln -s "$(pwd)/skills/omission-check" "${CODEX_HOME:-$HOME/.codex}/skills/omission-check"
```

Restart or reload the client if it does not detect new skills automatically.
