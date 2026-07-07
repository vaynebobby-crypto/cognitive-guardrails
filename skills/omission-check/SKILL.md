---
name: omission-check
description: "Use after execution and before final delivery to identify the largest omission, blind spot, or unnoticed consequence that may affect the result."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Omission Check

Use this skill after execution and before the final response. It asks: **What is the biggest thing I may have omitted or failed to notice?** The goal is to catch missing work, blind spots, and side effects before the final answer hardens them into silence.

## Trigger

Invoke before final delivery when:

- The request had multiple required outputs, files, environments, languages, platforms, or audiences.
- Work touched shared behavior, user-visible state, external services, publication, permissions, or data.
- Some requested item was skipped, deferred, blocked, or replaced by a narrower implementation.
- The final answer could hide an important caveat by omission.

## Procedure

Answer internally:

1. **Requested outputs**: Did I cover every explicit deliverable?
2. **Implicit constraints**: Did I miss compatibility, installation, docs, tests, release, security, or rollback expectations?
3. **Blind spot**: What important thing might I not have looked at?
4. **Side effect**: What could the user notice later that I failed to mention?
5. **Final response edit**: What omission, blocker, or residual risk must be stated?

If the omission is fixable within scope, fix it before final delivery. If not, report it clearly.

## Output Guidance

Do not add a ceremonial omission section when nothing material remains. Do report skipped validation, incomplete deliverables, or important blind spots.
