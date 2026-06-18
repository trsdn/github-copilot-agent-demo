import test from "node:test";
import assert from "node:assert/strict";
import { calculateReadiness, classifyRelease, formatCouncilBrief } from "../src/readiness.js";

test("calculates weighted readiness with warning checks counted at half weight", () => {
  const readiness = calculateReadiness({
    checks: [
      { status: "pass", weight: 50 },
      { status: "warn", weight: 30 },
      { status: "fail", weight: 20 }
    ]
  });

  assert.equal(readiness, 65);
});

test("holds a release when any check fails", () => {
  const classification = classifyRelease({
    checks: [
      { label: "Unit tests", status: "pass", weight: 40 },
      { label: "Incident watch", status: "fail", weight: 60 }
    ]
  });

  assert.equal(classification.decision, "hold");
  assert.equal(classification.failedChecks.length, 1);
});

test("uses limited rollout for warning-heavy releases", () => {
  const classification = classifyRelease({
    checks: [
      { label: "Unit tests", status: "pass", weight: 50 },
      { label: "E2E stability", status: "warn", weight: 25 },
      { label: "Privacy review", status: "warn", weight: 25 }
    ]
  });

  assert.equal(classification.decision, "limited-rollout");
});

test("formats a council brief for handoff", () => {
  const brief = formatCouncilBrief({
    release: "demo-release",
    service: "checkout",
    region: "EU",
    checks: [
      { label: "Unit tests", status: "pass", weight: 50 },
      { label: "Incident watch", status: "fail", weight: 50, note: "Open Sev 3" }
    ]
  });

  assert.equal(brief.release, "demo-release");
  assert.equal(brief.decision, "hold");
  assert.deepEqual(brief.blockers, ["Incident watch: Open Sev 3"]);
});
