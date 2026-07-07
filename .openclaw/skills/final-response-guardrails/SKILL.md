---
name: final-response-guardrails
description: "Compatibility aggregate for pre-delivery cognitive guardrails; use uncertainty-check and omission-check for new installs."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Final Response Guardrails

This is a compatibility aggregate for older clients that already trigger `final-response-guardrails`. New installs should load the narrower pre-delivery skills directly:

- `uncertainty-check`: answer "what am I least certain about right now?"
- `omission-check`: answer "what is the biggest thing I may have omitted or failed to notice?"

Use this aggregate after work is complete and before sending the final response. It is a delivery review layer for making sure the response matches what was actually done, verified, and left unfinished.

This skill does not create evidence. If verification is missing or blocked, say so instead of implying completion.

## Trigger

Invoke before final delivery when any condition is true:

- You are about to claim that code, configuration, documents, research, or operational work is complete.
- The answer includes recommendations, test results, citations, risk judgments, or next steps.
- Some requested work was skipped, blocked, partially done, or changed from the original scope.
- The work involved destructive, external, credential-sensitive, production, user-data, or permission-changing actions.
- The response could overpromise future monitoring, external follow-up, deployment, or behavior that was not implemented.

## Delivery Checklist

Review the final response before sending:

1. **Requested outcome**: Does the response answer the user's actual request rather than a broader or different task?
2. **Verification evidence**: What commands, tests, inspections, citations, or artifacts prove the result?
3. **Unverified claims**: Which claims rely on inference, assumption, or stale information?
4. **Unfinished items**: What requested work remains incomplete, intentionally deferred, or out of scope?
5. **Blockers**: What access, approval, data, dependency, or environment issue prevented completion or validation?
6. **Overpromising**: Does the response imply future action, monitoring, deployment, publication, or guarantees not actually performed?
7. **User-visible effects**: Were external sends, pushes, deletes, permission changes, or publications explicitly approved and accurately reported?
8. **Residual risk**: What risk still matters to the user's next decision?
9. **Uncertainty check**: What am I least certain about right now, and does it require a narrower claim?
10. **Omission check**: What is the biggest omission, blind spot, or unnoticed consequence that should be fixed or reported?

Fix the response before delivery when the checklist exposes a material flaw.

## Evidence Buckets

Separate the response into:

- **Done**: actions actually completed.
- **Verified**: commands, tests, checks, inspected files, links, or citations.
- **Not done**: skipped, deferred, or impossible items.
- **Blocked**: missing permission, access, data, dependency, or environment.
- **Risk/uncertainty**: assumptions or limits that still matter.

Never claim completion solely from confidence.

## Common Corrections

- Replace "done" with "implemented but not tested" when validation did not run.
- Replace broad guarantees with concrete observations.
- Include the exact failed command or blocker when verification failed.
- Mention files changed and important commands run for code work.
- Avoid promising future monitoring or follow-up unless it is implemented and authorized.
- For reviews, lead with findings and severity before summary.

## Output Guidance

Keep the final response concise and useful. Include only what matters:

- Change summary.
- Validation result.
- Commit hash or publication link when relevant.
- Known unfinished work or blockers.
- Smallest useful next step, if needed.

If no issues remain after the delivery pass, do not add a ceremonial checklist. Just answer accurately.
