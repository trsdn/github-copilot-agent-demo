export const releaseSignals = {
  release: "checkout-2026.06",
  service: "checkout-platform",
  region: "EU",
  checks: [
    {
      id: "unit-tests",
      label: "Unit tests",
      status: "pass",
      weight: 20
    },
    {
      id: "contract-tests",
      label: "Payment contract tests",
      status: "pass",
      weight: 20
    },
    {
      id: "flaky-e2e",
      label: "Checkout E2E stability",
      status: "warn",
      weight: 15,
      note: "One retry required in the last run."
    },
    {
      id: "privacy-review",
      label: "EU privacy review",
      status: "warn",
      weight: 25,
      note: "Reviewer requested confirmation for telemetry field retention."
    },
    {
      id: "incident-watch",
      label: "Production incident watch",
      status: "fail",
      weight: 20,
      note: "Open Sev 3 incident affects 4 percent of checkout attempts."
    }
  ]
};
