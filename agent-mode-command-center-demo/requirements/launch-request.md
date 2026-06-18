# Launch Request

Product wants to launch `checkout-2026.06` for the checkout platform next Friday.

The launch council must decide whether this is ready based on:

- automated test health
- unresolved incidents
- privacy review status
- target launch region
- customer impact
- rollout guardrails

## Change Request For The Live Demo

The current readiness engine treats the EU privacy review as a warning. For EU launches, unresolved privacy review must become a hard blocker because customer telemetry and checkout data may be processed in-region.

Acceptance criteria:

- If `region` is `EU` and the `privacy-review` check is `warn`, the decision is `hold`.
- The blocker or reason must mention EU privacy review.
- Tests cover the EU blocker and a non-EU privacy warning.
- `npm test` passes.
