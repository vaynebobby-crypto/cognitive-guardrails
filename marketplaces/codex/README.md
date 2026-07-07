# Codex Adapter

This directory provides local packaging metadata for Codex-style skill installations.

There is no repository-wide assumption that Codex exposes one universal official marketplace install command. For local installs, symlink or copy both skill directories into the configured skills directory:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)/skills/instruction-intake-guardrails" "${CODEX_HOME:-$HOME/.codex}/skills/instruction-intake-guardrails"
ln -s "$(pwd)/skills/final-response-guardrails" "${CODEX_HOME:-$HOME/.codex}/skills/final-response-guardrails"
```

Restart or reload the client if it does not detect new skills automatically.
