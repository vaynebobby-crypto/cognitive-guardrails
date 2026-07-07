---
name: adversarial-prompt-review
description: "Use before or during execution to adversarially review the prompt, plan, assumptions, scope, and failure modes before committing to an answer or action."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Adversarial Prompt Review

Use this skill before execution or when the plan starts to harden. It treats the current interpretation as a hypothesis and attacks it before action creates cost, risk, or misleading confidence.

## Trigger

Invoke when:

- The instruction is ambiguous, high-impact, or easy to over-scope.
- The plan depends on stale context, assumptions, permissions, or inferred intent.
- A proposed action deletes, overwrites, publishes, pushes, sends, buys, schedules, grants access, or changes shared state.
- The answer will make a recommendation, risk judgment, or completion claim.

## Procedure

Run an adversarial pass:

1. **Misread test**: What is the most likely way I am misunderstanding the user's request?
2. **Scope attack**: Am I adding work, risk, or claims beyond the request?
3. **Authorization attack**: Which step might require explicit permission I do not have?
4. **Evidence attack**: Which key claim lacks direct evidence?
5. **Failure-mode attack**: What could break, leak, notify, overwrite, or mislead?
6. **Counter-plan**: What safer, narrower plan would still satisfy the request?

If the attack finds a material issue, adjust the plan, ask for approval, or report the blocker.

## Output Guidance

Do not print a long adversarial checklist unless the user asked for one. Surface only the issue that changes execution: clarification needed, approval needed, safer path chosen, or residual risk.
