---
name: uncertainty-check
description: "Use after execution and before final delivery to answer what you are least certain about, label its impact, and avoid overstating unverified work."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Uncertainty Check

Use this skill after execution and before the final response. It asks: **What am I least certain about right now?** The goal is not self-doubt for its own sake; it is to prevent hidden uncertainty from turning into an overstated delivery claim.

## Trigger

Invoke before final delivery when:

- You are about to claim completion, correctness, safety, deployment, publication, or verification.
- Any test, command, source, access, dependency, or environment was unavailable.
- The answer includes recommendations, estimates, risk judgments, or citations.
- The work required interpreting user intent or external/current facts.

## Procedure

Answer internally:

1. **Least certain item**: What is the single thing I am least confident about?
2. **Reason**: Is the uncertainty caused by missing evidence, stale context, ambiguous instructions, tool limits, or untested behavior?
3. **Impact**: Could this change the user's next decision or the truth of my completion claim?
4. **Mitigation**: Can I verify it now? If not, how should I label it in the final response?
5. **Claim edit**: Which sentence must be narrowed, qualified, or removed?

Never claim completion solely from confidence. Use evidence, or state the gap.

## Output Guidance

Mention uncertainty only when it materially affects the user's decision, requested validation, or confidence in the result. Be specific about what was not verified.
