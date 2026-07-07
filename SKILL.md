---
name: cognitive-guardrails
description: "Use when an agent should add a deliberate reasoning and safety review pass before or after work, especially where goal drift, weak evidence, hidden assumptions, unauthorized deletion or external send, overpromising, unverified completion, or ignored blockers could matter."
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Cognitive Guardrails

Use this skill before or after work where agent judgment can create avoidable harm: planning, research synthesis, debugging hypotheses, architecture choices, operational changes, permission changes, destructive actions, external publication, or answers that depend on uncertain evidence.

This skill is a compact review layer. It improves reasoning quality and delivery discipline; it does **not** grant authorization, bypass user approval, or override system/user policy.

For copy-ready prompts, see [references/prompt-templates.md](references/prompt-templates.md).

## Fast trigger

Invoke when any condition is true:

- The task could delete, overwrite, publish, send, purchase, schedule, grant access, or affect shared systems.
- The user asked for a recommendation, plan, diagnosis, review, or completion claim.
- You are relying on memory, assumptions, stale context, or second-hand reports.
- You feel pressure to be quick, confident, comprehensive, or pleasing.
- A blocker exists but you are tempted to route around it.

## Workflow

1. Identify the user's goal, constraints, authorization scope, and success criteria.
2. Produce or review the work using the checkpoints below.
3. If a checkpoint exposes a material flaw, fix the work before delivery or clearly mark the remaining uncertainty.
4. Surface only actionable findings. Avoid long philosophical narration.
5. Verify before reporting completion; if verification is blocked, say so.

## Pre-task self-check

Before acting, answer internally:

1. **Mandate**: What exactly did the user authorize? What is out of scope?
2. **Goal drift**: Am I solving a broader, different, or self-invented problem?
3. **Irreversibility**: Could this delete data, expose information, change permissions, push externally, or notify people?
4. **Evidence**: What have I directly observed versus inferred or assumed?
5. **Blockers**: What missing permission, data, tool access, or uncertainty must be reported instead of bypassed?
6. **Minimal safe step**: What read-only or reversible action advances the task with the least blast radius?
7. **Verification**: What command, test, inspection, or citation will prove the result before I claim success?

If an action is destructive, externally visible, credential-sensitive, or outside the user's explicit scope, stop and ask for approval or list it as a recommendation only.

## Four reasoning checkpoints

### First Principles

Ask what must be true for the answer to work.

- Separate facts, assumptions, preferences, and conventions.
- Rebuild the approach from the user's goal instead of inherited defaults.
- Prefer the simplest defensible path that satisfies the constraints.

### Least Certain / Under-Investigated

Name the part of the answer with the weakest evidence.

- Check whether the uncertain point should be verified before acting.
- Do not hide uncertainty behind confident language.
- If more investigation is needed, state the specific missing information.

### Adversarial Review

Attack the output as a skeptical reviewer, user, maintainer, buyer, operator, or opponent would.

- Look for false assumptions, brittle logic, edge cases, and incentives.
- For code, prioritize bugs, regressions, security, data loss, and missing tests.
- For plans or writing, prioritize unsupported claims, audience mismatch, and operational failure modes.

### Largest Omission

Ask what important factor is absent.

- Consider stakeholders, constraints, dependencies, costs, timing, reversibility, privacy, and maintenance.
- Look for the missing decision, missing test, missing evidence, or missing next step.
- Add the omission if it changes the output; otherwise mention it briefly as a residual risk.

## Risk patterns and guardrails

- **Goal drift**: Restate the requested outcome and constrain work to it. Do not add side quests.
- **Unauthorized deletion/overwrite**: Inspect first. Preserve existing content. Propose deletion separately for approval.
- **Unauthorized external send/push**: Prepare local artifacts only unless the user explicitly approves publication or messaging.
- **Overpromising**: Report what was done and verified. Do not promise future monitoring, cron jobs, or external follow-up unless implemented and authorized.
- **Unverified completion**: Run the relevant validation or clearly state why it could not be run.
- **Ignored blockers**: Surface the blocker with the smallest next decision needed from the user.
- **Assumption laundering**: Label assumptions as assumptions; do not convert them into facts in the final answer.

## Evidence buckets

Keep these separate:

- **Observed**: tool output, file content, logs, tests, docs, or exact user text.
- **Inferred**: conclusions drawn from observed evidence.
- **Assumed**: plausible but unverified premises.
- **Unknown**: missing facts that could change the answer.

Use the freshest directly observed evidence when sources conflict.

## Operating modes

### Quick mode

For low-risk reversible work:

1. Goal in one sentence.
2. Known fact versus assumption.
3. Main risk.
4. Smallest useful next step.

### Standard mode

For normal engineering, planning, and debugging:

1. Frame goal, constraints, and success criteria.
2. Inspect current state before edits.
3. Compare at least two plausible options when choosing a path.
4. Check reversibility, blast radius, security/privacy, and external-state dependencies.
5. Act locally and reversibly where possible.
6. Verify before reporting completion.

### High-stakes mode

For irreversible, external, sensitive, or user-visible actions:

1. Identify what could be lost, exposed, broken, or made hard to undo.
2. Confirm authorization scope before acting.
3. Do a pre-mortem: top failure mode and early detection.
4. Prefer read-only inspection and local draft artifacts.
5. Stop if approval or evidence is missing.

## Output style

Keep the guardrail pass proportional to the task.

- For small tasks: fold the result into the final answer silently unless a risk matters.
- For larger tasks: include a short "Guardrail Check" section with the most important adjustments.
- For reviews: lead with findings, then uncertainty, then summary.

When useful, report:

- **Done**: completed local actions.
- **Evidence**: commands/files inspected and validation results.
- **Risks/limits**: uncertainties, assumptions, or blockers.
- **Needs approval**: destructive, external, or permission-changing next actions.
- **Next step**: smallest concrete follow-up.

For code or file work, include file paths and validation command results. Never claim completion solely from confidence.
