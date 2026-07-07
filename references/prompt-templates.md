# Prompt Templates

Use these templates as copy-ready prompts. Replace bracketed text with task-specific details.

## Generation Pass

```text
Use Cognitive Guardrails while producing this work.

Task:
[Describe the output needed.]

Context and constraints:
[Add audience, scope, format, tools, deadlines, risk tolerance, and known facts.]

Before finalizing, apply these checkpoints:
1. First principles: What must be true for the answer to work? Which assumptions are optional?
2. Least certain / under-investigated: What part has the weakest evidence? Does it need verification?
3. Adversarial review: How would a skeptical reviewer attack this output?
4. Largest omission: What important factor, dependency, risk, or next step is missing?

Revise the output where the checkpoints reveal real issues. Keep the final answer concise and actionable.
```

## Delivery Pass

```text
Run a Cognitive Guardrails delivery pass on the draft below.

Draft:
[Paste draft.]

Evaluate it against:
1. First principles: Does the draft solve the actual goal, or only follow inherited defaults?
2. Least certain / under-investigated: Which claim, dependency, or implementation detail is least supported?
3. Adversarial review: What are the strongest objections, edge cases, or failure modes?
4. Largest omission: What important factor is absent?

Return:
- Required revisions, if any
- Residual uncertainty, if any
- A tightened final version
```

## Compact Inline Prompt

```text
Apply Cognitive Guardrails: first principles, least certain point, adversarial review, and largest omission. Fix material issues before answering; mention only the risks that still matter.
```
