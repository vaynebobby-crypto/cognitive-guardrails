---
name: cognitive-guardrails
description: Use when an agent should add a deliberate reasoning review pass before or after producing work, especially for code, writing, strategy, plans, decisions, or any output where hidden assumptions, weak evidence, missing investigation, adversarial critique, or overlooked risks matter.
---

# Cognitive Guardrails

Run this skill as a compact review layer. It is useful in two modes:

- **Generation pass**: apply the checkpoints while forming the answer or artifact.
- **Delivery pass**: after drafting, inspect the output and revise only where the checkpoints reveal a real issue.

For copy-ready prompts, see [references/prompt-templates.md](references/prompt-templates.md).

## Workflow

1. Identify the user's goal, constraints, and success criteria.
2. Produce or review the work using the four checkpoints below.
3. Surface only actionable findings. Avoid long philosophical narration.
4. If a checkpoint exposes a material flaw, fix the work before delivery or clearly mark the remaining uncertainty.

## Four Checkpoints

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

Attack the output as a skeptical reviewer, user, maintainer, buyer, or opponent would.

- Look for false assumptions, brittle logic, edge cases, and incentives.
- For code, prioritize bugs, regressions, security, data loss, and missing tests.
- For plans or writing, prioritize unsupported claims, audience mismatch, and operational failure modes.

### Largest Omission

Ask what important factor is absent.

- Consider stakeholders, constraints, dependencies, costs, timing, reversibility, and maintenance.
- Look for the missing decision, missing test, missing evidence, or missing next step.
- Add the omission if it changes the output; otherwise mention it briefly as a residual risk.

## Output Style

Keep the guardrail pass proportional to the task.

- For small tasks: fold the result into the final answer silently unless a risk matters.
- For larger tasks: include a short "Guardrail Check" section with the most important adjustments.
- For reviews: lead with findings, then uncertainty, then summary.
