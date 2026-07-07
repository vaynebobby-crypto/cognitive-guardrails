# Prompt Templates

Use these templates as copy-ready prompts. Replace bracketed text with task-specific details.

## Instruction Intake Pass

```text
Use instruction-intake-guardrails before starting.

Task:
[Describe the requested work.]

Context and constraints:
[Add scope, tools, approvals already granted, known risks, deadlines, and success criteria.]

Return only material issues before execution:
- Clarified mandate
- Authorization boundary
- Goal drift risk
- Destructive/external/sensitive actions requiring approval
- Blockers or missing evidence
- Smallest safe next step
- Verification target
```

## Final Response Pass

```text
Use final-response-guardrails before sending the final answer.

Draft final response:
[Paste draft.]

Check:
- Does it match the requested outcome?
- What was actually completed?
- What evidence verifies the result?
- What remains unfinished or blocked?
- Does it overpromise future action or unverified success?
- Are residual risks or assumptions stated only when they matter?

Return a tightened final response.
```

## Compact Inline Prompt

```text
Apply instruction-intake-guardrails before acting and final-response-guardrails before answering. Stay inside explicit authorization, verify before claiming completion, and state blockers or unfinished work plainly.
```
