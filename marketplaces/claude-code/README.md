# Claude Code Adapter

This directory provides local packaging metadata for Claude Code setups that support custom skills or prompt libraries. The instruction intake skill includes a First Principles check before execution.

There is no repository-wide assumption that Claude Code exposes one universal official marketplace install command. Use the manifest here as an adapter description, or register the two skill directories manually:

```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)/skills/instruction-intake-guardrails" ~/.claude/skills/instruction-intake-guardrails
ln -s "$(pwd)/skills/final-response-guardrails" ~/.claude/skills/final-response-guardrails
```

If your environment uses project-level instructions instead of a skills directory, add the two `SKILL.md` files as separate entries.
