# Cognitive Guardrails

`cognitive-guardrails` is an installable OpenClaw Marketplace skill and client-neutral prompt package that adds a deliberate reasoning and safety review pass to AI-assisted work.

It helps agents slow down at the right moment, challenge assumptions, and repair weak spots before handing over code, writing, plans, business proposals, or operational decisions.

## Purpose

Use this skill for planning, research synthesis, debugging hypotheses, architecture decisions, operational changes, security-sensitive work, external publication, or any high-stakes answer that needs disciplined uncertainty handling.

It helps detect:

- goal drift and unauthorized side quests;
- deletion, overwrite, permission, or external-send actions without explicit approval;
- overpromising or claiming unverified success;
- treating assumptions as facts;
- bypassing blockers instead of reporting them;
- ignoring blast radius, reversibility, privacy, security impact, and omitted stakeholders.

The skill is intentionally lightweight: it has no runtime network dependency, no credentials, and no deterministic action script. It is a reasoning protocol and safety checklist, not a tool for bypassing user authorization or platform policy.

## Checkpoints

- **First principles**: Rebuild the answer from the real goal and the facts that must be true.
- **Least certain / under-investigated**: Identify the weakest claim, dependency, or assumption.
- **Adversarial review**: Attack the output from the viewpoint of a skeptical reviewer, maintainer, buyer, user, operator, or opponent.
- **Largest omission**: Find the missing stakeholder, constraint, test, risk, dependency, approval, or next step.

## Use Cases

- Code design, implementation plans, refactors, reviews, and release checks
- Technical writing, proposals, documentation, and decision records
- Business strategy, product plans, market arguments, and operating plans
- Personal or organizational decisions where hidden assumptions and omissions matter
- Operational changes that may touch production, credentials, user data, scheduled jobs, or external publishing

## Installation

### OpenClaw Marketplace / ClawHub

After publication under the `cognitive-guardrails` slug:

```bash
openclaw skills install cognitive-guardrails
```

### OpenClaw from Git

```bash
openclaw skills install git:https://github.com/vaynebobby-crypto/cognitive-guardrails.git --as cognitive-guardrails
```

### OpenClaw local checkout

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
openclaw skills install "$(pwd)" --as cognitive-guardrails
```

If a previous local install exists:

```bash
openclaw skills install "$(pwd)" --as cognitive-guardrails --force
```

### Symlink fallback

If your OpenClaw version does not expose `openclaw skills install`, symlink the repository into the user skills directory:

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

### Claude Code

Claude Code supports project and user-level instructions, and local setups may differ. If your installation exposes a custom skills or prompts directory, copy or symlink this repository there:

```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)" ~/.claude/skills/cognitive-guardrails
```

If your setup uses project instructions instead, reference `SKILL.md` from your project-level Claude instructions and keep `references/prompt-templates.md` available for copy-ready prompts.

### Codex

For Codex-style local skills, install into the configured skills directory. The exact path depends on your Codex home:

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)" "${CODEX_HOME:-$HOME/.codex}/skills/cognitive-guardrails"
```

Restart or reload the client if it does not detect new skills automatically.

### Pi and other clients

If your client has no universal public CLI skill-install format:

1. Keep this repository cloned locally.
2. Add the contents of `SKILL.md` to the client's custom instructions, prompt library, or equivalent local configuration.
3. Use `references/prompt-templates.md` when you need a generation pass or delivery pass prompt.

## Usage

Invoke explicitly when you want an agent to run the checklist:

```text
/use cognitive-guardrails review this deployment plan
```

Agents should also use it automatically when they are about to perform or summarize work involving:

- destructive or externally visible changes;
- permissions, secrets, production, finances, compliance, safety, or user data;
- decisions based on incomplete evidence;
- completion claims that need verification.

### Generation pass

```text
Use Cognitive Guardrails while drafting a release plan for this service. Apply first principles, least certain / under-investigated, adversarial review, and largest omission before finalizing.
```

### Delivery pass

```text
Run a Cognitive Guardrails delivery pass on this proposal. Return required revisions, residual uncertainty, and a tightened final version.
```

More copy-ready prompts are in [references/prompt-templates.md](references/prompt-templates.md).

## Directory structure

```text
cognitive-guardrails/
├── SKILL.md                    # Marketplace skill definition and checklist
├── README.md                   # Purpose, installation, usage, and validation guide
├── openclaw.json               # Lightweight Marketplace/client metadata
├── meta.json                   # Simple version/dependency metadata for local checks
├── LICENSE                     # MIT license
├── references/
│   └── prompt-templates.md     # Copy-ready generation and delivery pass prompts
├── scripts/
│   └── check-skill.cjs         # Local structural/frontmatter validation helper
└── .gitignore
```

## Validation

Run the repository-local structural check:

```bash
node scripts/check-skill.cjs
```

Optional OpenClaw validation from any directory:

```bash
openclaw skills check
```

If installed locally, confirm OpenClaw can list or inspect it with the available OpenClaw skill commands in your environment.

## Marketplace Metadata

`openclaw.json` provides lightweight metadata for clients or marketplaces that can ingest a manifest. It is intentionally minimal and does not claim support for non-existent install commands.

## Publishing checklist

Before submitting to Marketplace/ClawHub:

1. Confirm `SKILL.md` is at the repository root.
2. Confirm frontmatter contains `name: cognitive-guardrails` and a quoted `description`.
3. Run `node scripts/check-skill.cjs`.
4. Run `openclaw skills check` if available.
5. Update `meta.json` / `openclaw.json` version metadata for a release.
6. Get explicit approval before pushing to GitHub or publishing to Marketplace.

## Security and privacy

This skill has no runtime network requirement and does not need credentials. It should make agents more conservative about destructive, external, or sensitive actions; it must not be used to justify bypassing safety policy, user approval, or local verification.

## Contributing

Contributions should keep the skill compact, practical, and client-neutral. Put long examples or reusable prompts in `references/` rather than expanding `SKILL.md`.

## License

MIT. See [LICENSE](LICENSE).
