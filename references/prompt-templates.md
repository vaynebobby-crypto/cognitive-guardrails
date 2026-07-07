# Prompt Templates

Use these templates as copy-ready prompts. Replace bracketed text with task-specific details.

## First Principles Pass

```text
Use first-principles-prompt before choosing an implementation path.

Task:
[Describe the requested work.]

Context and constraints:
[Add scope, approvals already granted, known risks, deadlines, and success criteria.]

Return only material issues before execution:
- Real objective
- First-principles facts and constraints
- Non-goals
- Assumptions or unknowns
- Minimal sufficient action
- Verification target
```

## Adversarial Review Pass

```text
Use adversarial-prompt-review before executing the plan.

Current interpretation and plan:
[Paste interpretation and plan.]

Attack:
- Most likely misread
- Scope overreach
- Missing authorization
- Weak evidence
- Failure modes
- Safer narrower plan
```

## Uncertainty Pass

```text
Use uncertainty-check before the final answer.

Draft final response:
[Paste draft.]

Answer:
- What am I least certain about right now?
- Why does that uncertainty exist?
- Does it affect the user's next decision?
- Which claim should be narrowed, qualified, or removed?
```

## Omission Pass

```text
Use omission-check before the final answer.

Requested deliverables and draft final response:
[Paste request summary and draft.]

Check:
- Explicit deliverables covered
- Compatibility, docs, tests, release, security, or rollback expectations
- Important blind spots
- Side effects the user should know
- Omission or blocker to state
```

## Compatibility Inline Prompt

```text
Apply first-principles-prompt and adversarial-prompt-review before acting. Apply uncertainty-check and omission-check before answering. Stay inside explicit authorization, verify before claiming completion, and state blockers or unfinished work plainly.
```
