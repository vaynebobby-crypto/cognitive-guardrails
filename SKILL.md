---
name: cognitive-guardrails
description: "Compatibility entry for the split Cognitive Guardrails package; install instruction-intake-guardrails and final-response-guardrails as independent skills."
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Cognitive Guardrails Compatibility Entry

This repository used to publish one combined `cognitive-guardrails` skill. It now ships two independent installable skills:

- `instruction-intake-guardrails`: run after receiving an instruction and before execution.
- `final-response-guardrails`: run after summarizing work and before the final response.

Install the two skill directories under `skills/` rather than treating this root file as the primary skill.

## Migration

If your client already references `cognitive-guardrails`, keep this file as a compatibility pointer and update the client configuration to load:

- [skills/instruction-intake-guardrails/SKILL.md](skills/instruction-intake-guardrails/SKILL.md)
- [skills/final-response-guardrails/SKILL.md](skills/final-response-guardrails/SKILL.md)

Shared prompt examples remain in [references/prompt-templates.md](references/prompt-templates.md).
