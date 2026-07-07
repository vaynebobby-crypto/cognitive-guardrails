---
name: instruction-intake-guardrails
description: "Compatibility aggregate for pre-execution cognitive guardrails; use first-principles-prompt and adversarial-prompt-review for new installs."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Instruction Intake Guardrails

This is a compatibility aggregate for older clients that already trigger `instruction-intake-guardrails`. New installs should load the narrower pre-execution skills directly:

- `first-principles-prompt`: return to the real objective and reason from first principles.
- `adversarial-prompt-review`: attack the prompt, plan, assumptions, scope, authorization, and failure modes.

This aggregate does not grant approval, override policy, or justify hidden action. If authorization, evidence, or access is missing, stop and surface the blocker.

## Trigger

Invoke before execution when any condition is true:

- The task may delete, overwrite, publish, push, send, purchase, schedule, grant access, change permissions, or affect shared systems.
- The user asked for planning, diagnosis, implementation, review, research, or a recommendation.
- The instruction has ambiguous success criteria, hidden assumptions, stale context, or multiple plausible interpretations.
- A blocker exists but it is tempting to route around it.
- The work could touch credentials, private data, production systems, legal/financial/medical claims, or externally visible state.

## Intake Checklist

Answer internally before acting:

1. **Mandate**: What exactly did the user ask for, and what did they not ask for?
2. **First Principles / 第一性原理**: Return to the user's real goal, strip away default methods and habitual paths, keep only the facts, constraints, and authorization boundaries that must hold, then choose the smallest safe action.
3. **Authorization boundary**: Which actions are explicitly approved? Which actions require separate approval?
4. **Goal drift**: Am I broadening, reframing, or inventing a side quest beyond the user's request?
5. **Risk surface**: Could this lose data, expose information, break a workflow, notify people, spend money, or change access?
6. **Evidence**: What have I directly observed versus inferred or assumed?
7. **Blockers**: What missing permission, data, tool access, or uncertainty must be reported instead of bypassed?
8. **Minimal safe step**: What read-only or reversible action advances the task with the least blast radius?
9. **Verification target**: What command, test, inspection, citation, or artifact will prove success before I claim completion?
10. **Adversarial review**: What is the most likely misread, overreach, missing permission, weak evidence, or failure mode in my current plan?

If an action is destructive, externally visible, credential-sensitive, or outside explicit scope, ask for approval or present it as a recommendation only.

## Evidence Buckets

Keep evidence separate:

- **Observed**: exact user text, file content, tool output, logs, tests, docs, citations.
- **Inferred**: conclusions drawn from observed evidence.
- **Assumed**: plausible but unverified premises.
- **Unknown**: missing facts that could change the plan.

Use the freshest directly observed evidence when sources conflict.

## Risk Patterns

- **Goal drift**: Restate the requested outcome and constrain work to it.
- **Unauthorized deletion/overwrite**: Inspect first, preserve content, and request explicit approval for destructive changes.
- **Unauthorized external send/push**: Prepare local artifacts unless the user explicitly approved publication or messaging.
- **Assumption laundering**: Label assumptions as assumptions; do not convert them into facts.
- **Ignored blockers**: Surface the blocker with the smallest next decision needed from the user.

## Output Guidance

Usually keep this check internal and proceed. Surface it only when it changes the work:

- Ask a concise clarification if the goal or authorization boundary is ambiguous.
- State the planned safe first step when risk is non-trivial.
- Identify approval needed for destructive or external actions.
- Mark unverified assumptions that materially affect the result.

For low-risk tasks, one sentence is enough: goal, main risk, and next step.
