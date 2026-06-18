export function calculateReadiness(signals) {
  const totalWeight = signals.checks.reduce((sum, check) => sum + check.weight, 0);
  const earnedWeight = signals.checks.reduce((sum, check) => {
    if (check.status === "pass") {
      return sum + check.weight;
    }

    if (check.status === "warn") {
      return sum + check.weight * 0.5;
    }

    return sum;
  }, 0);

  return Math.round((earnedWeight / totalWeight) * 100);
}

export function classifyRelease(signals) {
  const readiness = calculateReadiness(signals);
  const failedChecks = signals.checks.filter((check) => check.status === "fail");
  const warningChecks = signals.checks.filter((check) => check.status === "warn");

  if (failedChecks.length > 0) {
    return {
      decision: "hold",
      readiness,
      reason: `Blocked by ${failedChecks.length} failed check(s).`,
      failedChecks,
      warningChecks
    };
  }

  if (readiness < 85 || warningChecks.length > 1) {
    return {
      decision: "limited-rollout",
      readiness,
      reason: "Release can proceed only with monitoring and a rollback owner.",
      failedChecks,
      warningChecks
    };
  }

  return {
    decision: "ship",
    readiness,
    reason: "Release meets the readiness threshold.",
    failedChecks,
    warningChecks
  };
}

export function formatCouncilBrief(signals) {
  const classification = classifyRelease(signals);
  const blockers = classification.failedChecks.map((check) => `${check.label}: ${check.note ?? "No note"}`);
  const warnings = classification.warningChecks.map((check) => `${check.label}: ${check.note ?? "No note"}`);

  return {
    release: signals.release,
    service: signals.service,
    region: signals.region,
    decision: classification.decision,
    readiness: classification.readiness,
    reason: classification.reason,
    blockers,
    warnings
  };
}
