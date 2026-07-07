---
name: first-principles-prompt
description: "Use before execution to restate the task from first principles, separate goals from habits, and choose the smallest action that satisfies the real objective."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# First Principles Prompt

Use this skill after receiving a meaningful instruction and before choosing an implementation path. It forces the work back to first principles: what must be true, what the user is actually trying to accomplish, and what action is necessary rather than merely familiar.

## Trigger

Invoke before execution when:

- The user asks for planning, implementation, refactoring, diagnosis, research, or a recommendation.
- The task has several plausible approaches.
- The obvious path may be habitual, tool-driven, or broader than the user's real goal.
- The work could affect shared systems, data, permissions, publication, or external communication.

## Procedure

Answer internally before acting:

1. **Real objective**: What outcome does the user need, stripped of implementation habit?
2. **First principles / 第一性原理**: What facts, constraints, permissions, and success conditions must hold?
3. **Non-goals**: What did the user not ask for?
4. **Assumptions**: Which premises are observed, inferred, assumed, or unknown?
5. **Minimal sufficient action**: What is the smallest reversible or low-risk step that advances the real objective?
6. **Verification target**: What evidence will prove the action worked?

If first-principles review changes the plan, state the revised plan briefly before taking action.

## Output Guidance

Usually keep this check internal. Surface it when it reveals ambiguity, missing authorization, high risk, or a materially better narrower path.
