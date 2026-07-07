# Claude Code Adapter

This directory provides local packaging metadata for Claude Code setups that support custom skills or prompt libraries.

Recommended core skills:

- `first-principles-prompt`
- `adversarial-prompt-review`
- `uncertainty-check`
- `omission-check`

Compatibility aggregate skills:

- `instruction-intake-guardrails`
- `final-response-guardrails`

There is no repository-wide assumption that Claude Code exposes one universal official marketplace install command. Use the manifest here as an adapter description, or register the skill directories manually:

```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)/skills/first-principles-prompt" ~/.claude/skills/first-principles-prompt
ln -s "$(pwd)/skills/adversarial-prompt-review" ~/.claude/skills/adversarial-prompt-review
ln -s "$(pwd)/skills/uncertainty-check" ~/.claude/skills/uncertainty-check
ln -s "$(pwd)/skills/omission-check" ~/.claude/skills/omission-check
```

If your environment uses project-level instructions instead of a skills directory, add the four core `SKILL.md` files as separate entries. Add the two aggregate entries only when you need compatibility with older triggers.
