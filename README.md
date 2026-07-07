# cognitive-guardrails

`cognitive-guardrails` is an installable OpenClaw Marketplace skill that gives agents a compact pre-task and pre-final reasoning checklist.

It helps agents notice common failure modes before they act or report completion:

- goal drift and unauthorized side quests;
- deletion, overwrite, permission, or external-send actions without explicit approval;
- overpromising or claiming unverified success;
- treating assumptions as facts;
- bypassing blockers instead of reporting them;
- ignoring blast radius, reversibility, privacy, or security impact.

## Purpose

Use this skill for planning, research synthesis, debugging hypotheses, architecture decisions, operational changes, security-sensitive work, external publication, or any high-stakes answer that needs disciplined uncertainty handling.

The skill is intentionally lightweight: it has no runtime network dependency, no credentials, and no deterministic action script. It is a reasoning protocol and safety checklist, not a tool for bypassing user authorization or platform policy.

## Installation

### Local checkout

```bash
openclaw skills install /home/yarrow/projects/cognitive-guardrails --as cognitive-guardrails
```

If a previous local install exists:

```bash
openclaw skills install /home/yarrow/projects/cognitive-guardrails --as cognitive-guardrails --force
```

### Git repository

After this repository is pushed to an approved remote, install with:

```bash
openclaw skills install git:<repo-url> --as cognitive-guardrails
```

### Marketplace / ClawHub

After publication under the `cognitive-guardrails` slug:

```bash
openclaw skills install cognitive-guardrails
```

> Note: publishing or pushing to a remote is intentionally not performed by this repository. Obtain explicit approval before any external push or Marketplace submission.

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

Typical output should identify what was done, what evidence was checked, what remains uncertain, what needs approval, and the smallest safe next step.

## Directory structure

```text
cognitive-guardrails/
├── SKILL.md                 # Marketplace skill definition and checklist
├── README.md                # Purpose, installation, usage, and validation guide
├── meta.json                # Version and dependency metadata
├── scripts/
│   └── check-skill.cjs      # Local structural/frontmatter validation helper
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

## Publishing checklist

Before submitting to Marketplace/ClawHub:

1. Confirm `SKILL.md` is at the repository root.
2. Confirm frontmatter contains `name: cognitive-guardrails` and a quoted `description`.
3. Run `node scripts/check-skill.cjs`.
4. Run `openclaw skills check` if available.
5. Update `meta.json` version for a release.
6. Replace `<repo-url>` in Git installation instructions after the approved remote exists.
7. Get explicit approval before pushing to GitHub or publishing to Marketplace.

## Security and privacy

This skill has no runtime network requirement and does not need credentials. It should make agents more conservative about destructive, external, or sensitive actions; it must not be used to justify bypassing safety policy, user approval, or local verification.